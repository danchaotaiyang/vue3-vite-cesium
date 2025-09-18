import * as Cesium from 'cesium';
import { cloneDeep } from 'lodash';
import { usePickStore } from '@/stores/example/PickingCollecting.js';
import { addPoint, cartesianToDegrees, waiting } from '@/assets/js/utl.js';
import { graphicFill, graphicStroke, graphicStrokeWidth, heightReference, labelBackgroundColor, labelBackgroundPadding, labelFill, labelFont, labelShowBackground, labelStroke, labelStrokeWidth, modifyAlpha, pointPixelSize, style, verticalOrigin } from './index.js';


let pickStore = usePickStore();

let screenEvent = null;
let positionBackup = null;
let graphicBackup = null;
let editorBackup = null;
let entityMoveEnable = false;
let entityMovingPoint = null;
let labelBackup = null;
let pickEntity = null;

let time = new Cesium.JulianDate();

export const entityCreate = () => {

    let { viewer, category: categoryRef, entities, editor } = pickStore;

    editor.adding = !editor.adding;

    if (editor.adding) {

        let { value: category, label } = categoryRef;

        screenEvent = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

        screenEvent.setInputAction((__event__) => {

            if (editor.creating) {
                return;
            }

            editor.creating = true;

            let ray = viewer.camera.getPickRay(__event__.position);
            let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

            if (!Cesium.defined(cartesian)) {
                editor.creating = false;
                return;
            }

            let name = `${ label }-${ entities.length + 1 }`;
            let entity = addPoint(viewer, cartesian, name);

            entity.label = {
                text: name,
                font: labelFont,
                style,
                outlineWidth: labelStrokeWidth,
                outlineColor: Cesium.Color.fromCssColorString(labelStroke),
                fillColor: Cesium.Color.fromCssColorString(labelFill),
                showBackground: labelShowBackground,
                backgroundPadding: new Cesium.Cartesian3(labelBackgroundPadding[ 0 ], labelBackgroundPadding[ 1 ]),
                backgroundColor: Cesium.Color.fromCssColorString(labelBackgroundColor),
                verticalOrigin,
                pixelOffset: new Cesium.Cartesian2(0, pointPixelSize / 2 + labelStrokeWidth + 2),
                heightReference
            };

            entities.push({ id: entity.id, name, graphicFill, graphicStroke, graphicStrokeWidth, category });

            editor.creating = false;
            entity = null;
            cartesian = null;
            ray = null;

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    } else {

        if (screenEvent) {

            screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            screenEvent.destroy();
            screenEvent = null;

        }

    }

};

export const entityModify = async (item) => {

    let { viewer, setExclude, editor } = pickStore;

    let entity = viewer.entities.getById(item.id);

    if (editor.adding || editor.modifying || editor.flying || !Cesium.defined(entity)) {
        return;
    }

    setExclude(item);

    await entityAim(entity);

    let { __graphic__, name, label } = entity;
    let graphic = entity[ __graphic__ ];
    positionBackup = entity.position.getValue(time).clone();
    graphicBackup = graphic.clone();
    labelBackup = label.clone();

    editor.category = __graphic__;
    editor.id = entity.id;
    editor.name = name;
    editor.graphicPixelSize = graphic.pixelSize.getValue(time);
    editor.graphicFill = graphic.color.getValue(time).toCssColorString();
    editor.graphicStrokeWidth = graphic.outlineWidth.getValue(time);
    editor.graphicStroke = graphic.outlineColor.getValue(time).toCssColorString();

    editor.labelText = label.text.getValue(time);
    editor.labelShowBackground = label.showBackground.getValue(time);
    const { x, y } = label.backgroundPadding.getValue(time);
    editor.labelBackgroundPadding = [ x, y ];
    editor.labelBackgroundColor = label.backgroundColor.getValue(time).toCssColorString();
    editor.labelFill = label.fillColor.getValue(time).toCssColorString();
    editor.labelStrokeWidth = label.outlineWidth.getValue(time);
    editor.labelStroke = label.outlineColor.getValue(time).toCssColorString();
    const [ fontWeight, fontSize, ...fontFamily ] = label.font.getValue(time).split(' ');
    editor.labelFontWeight = Number(fontWeight);
    editor.labelFontSize = Number(fontSize.match(/\d+/));
    editor.labelFontFamily = fontFamily.join(' ');

    let { degrees } = entityDegrees(entity);
    editor.coordinates = degrees;
    editor.description = entity.description;
    editor.modifying = true;
    editorBackup = cloneDeep(editor);

    entityCode();

    screenEvent = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

    screenEvent.setInputAction((__event__) => {

        let graphic = viewer.scene.pick(__event__.position);

        if (!Cesium.defined(graphic)) {
            return;
        }

        pickEntity = graphic.id;

        if (!entityMoveEnable && pickEntity.id === editor.id) {

            entityMovingPoint = pickEntity;
            entityMoveEnable = true;

            viewer.scene.screenSpaceCameraController.enableRotate = false;
            viewer.scene.screenSpaceCameraController.enableZoom = false;
            editor.moving = true;

        }

        pickEntity = null;
        graphic = null;

    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    screenEvent.setInputAction((__event__) => {

        if (!entityMovingPoint || !editor.modifying || !entityMoveEnable) {
            return;
        }

        let ray = viewer.camera.getPickRay(__event__.endPosition);
        let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

        if (!Cesium.defined(cartesian)) {
            return;
        }

        editor.coordinates[ 0 ] = cartesianToDegrees(cartesian);
        entityMovingPoint.position = cartesian;

        cartesian = null;
        ray = null;

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    screenEvent.setInputAction(() => {

        entityMovingPoint = null;
        entityMoveEnable = false;

        viewer.scene.screenSpaceCameraController.enableRotate = true;
        viewer.scene.screenSpaceCameraController.enableZoom = true;
        editor.moving = false;

        entityCode();

    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    degrees = null;
    graphic = null;
    label = null;
    entity = null;

};

export const entityModifyPosition = () => {

    entityCode();

};

export const entityModifyConfirm = async () => {

    let { entity, editor } = pickStore;

    if (entity) {

        entity.graphicFill = editor[ 'graphicFill' ];
        entity.graphicStroke = editor[ 'graphicStroke' ];
        entity.graphicStrokeWidth = editor[ 'graphicStrokeWidth' ];
        entity.name = editor[ 'name' ];
        entity = null;

    }

    await waiting();
    entityModifyReset();

};

export const entityModifyCancel = async () => {

    await entityModifyRestore();
    await waiting();
    entityModifyReset();

};

export const entityModifyRestore = () => new Promise((resolve, reject) => {

    let { viewer, editor } = pickStore;

    try {

        let entity = viewer.entities.getById(editor.id);
        let graphic = entity[ editor.category ];
        let backupGraphic = graphicBackup.clone();

        for (let key in backupGraphic) {
            graphic[ key ] = backupGraphic[ key ];
        }

        let label = entity.label;
        let backupLabel = labelBackup.clone();

        for (let key in backupLabel) {
            label[ key ] = backupLabel[ key ];
        }

        entity.position = positionBackup.clone();

        for (let key in editorBackup) {
            editor[ key ] = editorBackup[ key ];
        }

        resolve();

        entityCode();

    } catch (e) {
        console.warn(e);
        reject(e);
    }
});

export const entityModifyReset = () => {

    let { setRestore } = pickStore;

    if (screenEvent) {

        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        screenEvent.destroy();
        screenEvent = null;

    }

    setRestore();

    graphicBackup = null;
    labelBackup = null;
    editorBackup = null;

};

export const entityCopy = (item) => {
    pickStore.editor.copySource = item.id;
};

export const entityCopyApply = (item) => {

    let { viewer, editor } = pickStore;

    if (!editor.copySource || editor.copySource === item.id) {
        return;
    }

    let source = viewer.entities.getById(editor.copySource);
    let target = viewer.entities.getById(item.id);
    let sourceGraphic = source[ source[ '__graphic__' ] ];
    let targetGraphic = target[ target[ '__graphic__' ] ];
    let sourceLabel = source.label;
    let targetLabel = target.label;

    if (Cesium.defined(sourceGraphic) && Cesium.defined(targetGraphic)) {

        target[ '__graphic__size__' ] = sourceGraphic.pixelSize.getValue(time);
        targetGraphic.pixelSize = target[ '__graphic__size__' ];

        target[ '__graphic__stroke__width__' ] = sourceGraphic.outlineWidth.getValue(time);
        targetGraphic.outlineWidth = target[ '__graphic__stroke__width__' ];

        let color = sourceGraphic.color.getValue(time);
        target[ '__graphic__color__' ] = color.toCssColorString();

        let outlineColor = sourceGraphic.outlineColor.getValue(time);
        target[ '__graphic__stroke__' ] = outlineColor.toCssColorString();

        if (editor.modifying) {

            targetGraphic.color = color.withAlpha(modifyAlpha);
            targetGraphic.outlineColor = outlineColor.withAlpha(modifyAlpha);

        } else {

            targetGraphic.color = color;
            targetGraphic.outlineColor = outlineColor;

        }

    }

    if (Cesium.defined(sourceLabel) && Cesium.defined(targetLabel)) {

        for (let key in sourceLabel) {

            if (key === '_text') {
                continue;
            }

            targetLabel[ key ] = sourceLabel[ key ];

            if (editor.modifying) {

                if (key === '_backgroundColor' && target[ '__label__background__' ]) {

                    let backgroundColor = targetLabel.backgroundColor.getValue(time);

                    target[ '__label__background__' ] = backgroundColor.toCssColorString();
                    targetLabel.backgroundColor = backgroundColor.withAlpha(modifyAlpha);

                }

                if (key === '_outlineColor' && target[ '__label__stroke__' ]) {

                    let outlineColor = targetLabel.outlineColor.getValue(time);

                    target[ '__label__stroke__' ] = outlineColor.toCssColorString();
                    targetLabel.outlineColor = outlineColor.withAlpha(modifyAlpha);

                }

                if (key === '_fillColor' && target[ '__label__fill__color__' ]) {

                    let fillColor = targetLabel.fillColor.getValue(time);

                    target[ '__label__fill__color__' ] = fillColor.toCssColorString();
                    targetLabel.color = fillColor.withAlpha(modifyAlpha);

                }

            }

        }

    }

    item.graphicFill = targetGraphic.color.getValue(time).clone().withAlpha(1).toCssColorString();
    item.graphicStroke = targetGraphic.outlineColor.getValue(time).clone().withAlpha(1).toCssColorString();
    item.graphicStrokeWidth = targetGraphic.outlineWidth.getValue(time);

    targetGraphic = null;
    sourceGraphic = null;
    targetLabel = null;
    sourceLabel = null;
    target = null;
    source = null;
    viewer = null;
    editor = null;

};

export const entityCopyApplyAll = () => {

    let { entities, editor } = pickStore;

    editor.copySource = editor.id;

    for (let item of entities) {
        entityCopyApply(item);
    }

    editor.copySource = '';

};

export const entityAim = async (entity) => {

    let { center } = entityDegrees(entity);

    if (center) {
        await pickStore.flyTo(center);
    }

    center = null;
};

export const entityDegrees = (entity) => {

    let cartesian = entity.position.getValue(time);
    let ds = [ cartesianToDegrees(cartesian) ];

    cartesian = null;

    return {
        degrees: ds,
        center: ds[ 0 ]
    };

};

export const entityCode = () => {

    let { editor } = pickStore;
    let degrees = editor.coordinates[ 0 ];
    let backgroundJS = ``;
    let backgroundJSON = ``;

    if (editor.labelShowBackground) {

        backgroundJS = `
        showBackground: ${ editor.labelShowBackground },
        backgroundPadding: new Cesium.Cartesian3(${ editor.labelBackgroundPadding[ 0 ] }, ${ editor.labelBackgroundPadding[ 1 ] }),
        backgroundColor: Cesium.Color.fromCssColorString(${ editor.labelBackgroundColor }),
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(0, ${ editor.graphicPixelSize / 2 + editor.graphicStrokeWidth + 2 }),`;

        backgroundJSON = `
        "showBackground": ${ editor.labelShowBackground },
        "backgroundPadding": [ ${ editor.labelBackgroundPadding[ 0 ] }, ${ editor.labelBackgroundPadding[ 1 ] } ],
        "backgroundColor": "${ editor.labelBackgroundColor }",
        "verticalOrigin": "TOP",
        "pixelOffset": [ 0, ${ editor.graphicPixelSize / 2 + editor.graphicStrokeWidth + 2 } ],`;

    }

    editor.code = {
        js: `const viewer = new Cesium.Viewer('cesium-container');

viewer.entities.add({
    name: '${ editor.name }',
    position: Cesium.Cartesian3.fromDegrees(${ degrees.longitude }, ${ degrees.latitude }),
    ${ editor.category }: {
        pixelSize: ${ editor.graphicPixelSize },
        color: Cesium.Color.fromCssColorString(${ editor.graphicFill }),
        outlineWidth: ${ editor.graphicStrokeWidth },
        outlineColor: Cesium.Color.fromCssColorString(${ editor.graphicStroke }),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
        text: '${ editor.labelText }',
        font: '${ editor.labelFontWeight } ${ editor.labelFontSize }px ${ editor.labelFontFamily }',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: ${ editor.labelStrokeWidth },
        outlineColor: Cesium.Color.fromCssColorString(${ editor.labelStroke }),
        fillColor: Cesium.Color.fromCssColorString(${ editor.labelFill }), ${ backgroundJS }
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
});`,
        json: `{
    "name": "${ editor.name }",
    "position": [ ${ degrees.longitude }, ${ degrees.latitude } ],
    "${ editor.category }": {
        "pixelSize": ${ editor.graphicPixelSize },
        "color": "${ editor.graphicFill }",
        "outlineWidth": ${ editor.graphicStrokeWidth },
        "outlineColor": "${ editor.graphicStroke }",
        "heightReference": "CLAMP_TO_GROUND"
    },
    "label": {
        "text": "${ editor.labelText }",
        "font": "${ editor.labelFontWeight } ${ editor.labelFontSize }px ${ editor.labelFontFamily }",
        "style": "FILL_AND_OUTLINE",
        "outlineWidth": ${ editor.labelStrokeWidth },
        "outlineColor": "${ editor.labelStroke }",
        "fillColor": "${ editor.labelFill }", ${ backgroundJSON }
        "heightReference": "CLAMP_TO_GROUND"
    }
}`
    };
};
