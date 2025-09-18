// noinspection DuplicatedCode

import * as Cesium from 'cesium';
import { cloneDeep } from 'lodash';
import { usePickStore } from '@/store/example/PickingCollecting.js';
import { addPoint, cartesianToDegrees, waiting } from '@/assets/js/utl.js';
import { graphicFill, modifyAlpha, pointPixelSize } from './index.js';


let pickStore = usePickStore();

let screenEvent = null;
let positionsBackup = null;
let graphicBackup = null;
let editorBackup = null;
let entityMoveEnable = false;
let entityMovingPoint = null;
let pickEntity = null;

let time = new Cesium.JulianDate();

let editNodeIds = [];
let editRectangle;
let coordinates;
let eventKeyup;

let aspects = [ 'west-north', 'west-south', 'east-south', 'east-north' ];

export const entityCreate = () => {

    let { viewer, category: categoryRef, entities, editor, setTooltip } = pickStore;

    editor.adding = !editor.adding;

    if (editor.adding) {

        let { value: category, label } = categoryRef;
        let addRectangle = null;
        let addPoints = [];

        screenEvent = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

        screenEvent.setInputAction((__event__) => {

            editor.creating = !editor.creating;

            if (!editor.wating) {

                editor.wating = true;

                setTooltip(`鼠标左键结束拾取，按Esc键取消拾取。`);

                let ray = viewer.camera.getPickRay(__event__.position);
                let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

                if (!Cesium.defined(cartesian)) {
                    editor.creating = false;
                    return;
                }

                addPoints = [ cartesian, cartesian ];

                if (!addRectangle) {

                    addRectangle = viewer.entities.add({
                        name: `${ label }-${ entities.length + 1 }`,
                        rectangle: {
                            coordinates: new Cesium.CallbackProperty(() => Cesium.Rectangle.fromCartesianArray(addPoints), false),
                            material: Cesium.Color.fromCssColorString(graphicFill)
                        },
                        __graphic__: category
                    });

                }

                if (!eventKeyup) {

                    let cancel = () => {

                        setTooltip();

                        viewer.entities.removeById(addRectangle.id);

                        addPoints = [];
                        addRectangle = null;
                        editor.wating = false;
                        editor.creating = false;
                        eventKeyup = null;
                        cancel = null;
                    };

                    eventKeyup = (e) => {

                        switch (e.keyCode) {
                            case 27: {

                                cancel();

                                break;
                            }
                        }

                    };
                }

            } else {

                setTooltip();

                if (Cesium.defined(addRectangle)) {

                    addRectangle.rectangle.coordinates = Cesium.Rectangle.fromCartesianArray(addPoints);
                    entities.push({ id: addRectangle.id, name: addRectangle.name, graphicFill, graphicWidth: 0, category });
                    addRectangle = null;

                }

                editor.wating = false;

            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        screenEvent.setInputAction((__event__) => {

            if (!addRectangle) {
                return;
            }

            let ray = viewer.camera.getPickRay(__event__.endPosition);
            let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

            if (!Cesium.defined(cartesian)) {
                return;
            }

            addPoints[ 1 ] = cartesian;

            cartesian = null;

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    } else {

        if (screenEvent) {

            screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            screenEvent.destroy();
            screenEvent = null;

        }

    }

};

export const entityModify = async (item) => {

    let { viewer, setExclude, editor } = pickStore;

    editRectangle = viewer.entities.getById(item.id);

    if (editor.adding || editor.modifying || editor.flying || !Cesium.defined(editRectangle)) {
        return;
    }

    setExclude(item);

    await entityAim(editRectangle);

    let { __graphic__, name } = editRectangle;
    let graphic = editRectangle[ __graphic__ ];
    graphicBackup = graphic.clone();
    coordinates = editRectangle.rectangle.coordinates.getValue(time);
    editor.category = __graphic__;
    editor.id = editRectangle.id;
    editor.name = name;
    editor.graphicFill = graphic.material.color.getValue(time).toCssColorString();
    // let { degrees } = entityDegrees(editRectangle);
    let { west, south, east, north } = coordinates;
    editor.coordinates = { west, south, east, north };
    editor.description = editRectangle.description;
    editor.modifying = true;
    editorBackup = cloneDeep(editor);

    entityCode();

    positionsBackup = coordinates.clone();

    for (let i = 0; i < aspects.length; i++) {
        let aspect = aspects[ i ];
        let [ a1, a2 ] = aspect.split('-');
        let point = addPoint(viewer, new Cesium.CallbackProperty(() => Cesium.Cartesian3.fromRadians(editor.coordinates[ a1 ], editor.coordinates[ a2 ]), false), 'rectangle-edit-point', {
            color: Cesium.Color.ORANGE.toCssColorString()
        });
        point.index = i;
        point.aspect = aspect;
        editNodeIds.push(point.id);
        point = null;
    }

    let point = addPoint(viewer, new Cesium.CallbackProperty(() => Cesium.Cartesian3.fromRadians((editor.coordinates.west + editor.coordinates.east) / 2, (editor.coordinates.north + editor.coordinates.south) / 2), false), 'rectangle-edit-point-center', {
        color: Cesium.Color.ORANGE.toCssColorString()
    });
    point.aspect = 'center';
    editNodeIds.push(point.id);
    point = null;

    editRectangle.rectangle.coordinates = new Cesium.CallbackProperty(() => new Cesium.Rectangle(editor.coordinates.west, editor.coordinates.south, editor.coordinates.east, editor.coordinates.north), false);

    screenEvent = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

    screenEvent.setInputAction((__event__) => {

        let graphic = viewer.scene.pick(__event__.position);

        if (!Cesium.defined(graphic)) {
            return;
        }

        editRectangle.rectangle.coordinates = new Cesium.CallbackProperty(() => new Cesium.Rectangle(editor.coordinates.west, editor.coordinates.south, editor.coordinates.east, editor.coordinates.north), false);
        pickEntity = graphic.id;

        if (!entityMoveEnable && !entityMovingPoint) {

            if (pickEntity.name === 'rectangle-edit-point' || pickEntity.name === 'rectangle-edit-point-center') {

                entityMovingPoint = pickEntity;
                entityMoveEnable = true;

                pickEntity.point.pixelSize = pointPixelSize * 2;
                viewer.scene.screenSpaceCameraController.enableRotate = false;
                viewer.scene.screenSpaceCameraController.enableZoom = false;
                editor.moving = true;

            }

        }

        graphic = null;

    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    screenEvent.setInputAction((__event__) => {

        if (!entityMovingPoint || !editor.modifying || !entityMoveEnable) {
            return;
        }

        if (entityMovingPoint.name === 'rectangle-edit-point' || entityMovingPoint.name === 'rectangle-edit-point-center') {

            let ray = viewer.camera.getPickRay(__event__.endPosition);
            let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

            if (!Cesium.defined(cartesian)) {
                return;
            }

            if (entityMovingPoint.name === 'rectangle-edit-point' && entityMovingPoint.index > -1) {

                let [ a1, a2 ] = pickEntity.aspect.split('-');
                let { longitude, latitude } = Cesium.Cartographic.fromCartesian(cartesian);
                let changed = false;
                if (a1 === 'west' && longitude > editor.coordinates[ 'east' ]) {
                    a1 = 'east';
                    changed = true;
                }
                if (a2 === 'south' && latitude > editor.coordinates[ 'north' ]) {
                    a2 = 'north';
                    changed = true;
                }
                if (a1 === 'east' && longitude < editor.coordinates[ 'west' ]) {
                    a1 = 'west';
                    changed = true;
                }
                if (a2 === 'north' && latitude < editor.coordinates[ 'south' ]) {
                    a2 = 'south';
                    changed = true;
                }
                if (!changed) {
                    pickEntity.aspect = `${ a1 }-${ a2 }`;
                }
                editor.coordinates[ a1 ] = longitude;
                editor.coordinates[ a2 ] = latitude;
            }

            // let { west, south, east, north } = coordinates;
            // editor.coordinates = { west, south, east, north };

            entityCode();

            cartesian = null;
            ray = null;

        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    screenEvent.setInputAction(() => {

        if (pickEntity && (pickEntity.name === 'rectangle-edit-point' || pickEntity.name === 'rectangle-edit-point-center')) {
            pickEntity.point.pixelSize = pointPixelSize;
            pickEntity = null;
        }

        entityMovingPoint = null;
        entityMoveEnable = false;

        viewer.scene.screenSpaceCameraController.enableRotate = true;
        viewer.scene.screenSpaceCameraController.enableZoom = true;
        editor.moving = false;

        entityCode();

    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    graphic = null;

};

export const entityModifyPosition = () => {

    entityCode();

};

export const entityModifyConfirm = async () => {

    let { entity, editor } = pickStore;

    if (entity) {

        editRectangle.rectangle.coordinates = new Cesium.Rectangle(editor.coordinates.west, editor.coordinates.south, editor.coordinates.east, editor.coordinates.north);
        entity.graphicFill = editor[ 'graphicFill' ];
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

        graphic.material = backupGraphic.material;

        for (const id of editNodeIds) {
            viewer.entities.removeById(id);
        }

        editNodeIds = [];

        coordinates = positionsBackup.clone();
        editRectangle.rectangle.coordinates = new Cesium.CallbackProperty(() => new Cesium.Rectangle(coordinates.west, coordinates.south, coordinates.east, coordinates.north), false);
        for (let i = 0; i < aspects.length; i++) {
            let aspect = aspects[ i ];
            let [ a1, a2 ] = aspect.split('-');
            let point = addPoint(viewer, new Cesium.CallbackProperty(() => Cesium.Cartesian3.fromRadians(coordinates[ a1 ], coordinates[ a2 ]), false), 'rectangle-edit-point', {
                color: Cesium.Color.ORANGE.toCssColorString()
            });
            point.index = i;
            point.aspect = aspect;
            editNodeIds.push(point.id);
            point = null;
        }

        let point = addPoint(viewer, new Cesium.CallbackProperty(() => Cesium.Cartesian3.fromRadians((coordinates.west + coordinates.east) / 2, (coordinates.north + coordinates.south) / 2), false), 'rectangle-edit-point-center', {
            color: Cesium.Color.ORANGE.toCssColorString()
        });
        point.aspect = 'center';
        editNodeIds.push(point.id);
        point = null;

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

    let { viewer, setRestore } = pickStore;

    for (let i = 0; i < editNodeIds.length; i++) {

        viewer.entities.removeById(editNodeIds[ i ]);

    }
    // editRectangle.rectangle.coordinates = Cesium.Rectangle.fromRadians(editNodeCenter.west, editNodeCenter.south, editNodeCenter.east, editNodeCenter.north);

    if (screenEvent) {

        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        screenEvent.destroy();
        screenEvent = null;

    }

    setRestore();

    viewer.scene.screenSpaceCameraController.enableRotate = true;
    viewer.scene.screenSpaceCameraController.enableZoom = true;

    editNodeIds = [];
    editRectangle = null;
    graphicBackup = null;
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

    if (Cesium.defined(sourceGraphic) && Cesium.defined(targetGraphic)) {

        let color = sourceGraphic.material.color.getValue(time);
        target[ '__graphic__color__' ] = color.toCssColorString();

        if (editor.modifying) {
            targetGraphic.material = new Cesium.ColorMaterialProperty(color.withAlpha(modifyAlpha));
        } else {
            targetGraphic.material = new Cesium.ColorMaterialProperty(color);
        }

    }

    item.graphicFill = targetGraphic.material.color.getValue(time).clone().withAlpha(1).toCssColorString();

    targetGraphic = null;
    sourceGraphic = null;
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
    let { east, south, west, north } = entity.rectangle.coordinates.getValue(time);
    let westNorth = Cesium.Cartesian3.fromRadians(west, north);
    westNorth.aspect = 'westNorth';
    let eastNorth = Cesium.Cartesian3.fromRadians(east, north);
    eastNorth.aspect = 'eastNorth';
    let eastSouth = Cesium.Cartesian3.fromRadians(east, south);
    eastSouth.aspect = 'eastSouth';
    let westSouth = Cesium.Cartesian3.fromRadians(west, south);
    westSouth.aspect = 'westSouth';
    let cartesian = [
        westNorth,
        eastNorth,
        eastSouth,
        westSouth
    ];
    let ds = cartesian.map(d => cartesianToDegrees(d));
    let longitude = ds.map(d => d.longitude);
    let maxLongitude = Math.max.apply(null, longitude);
    let minLongitude = Math.min.apply(null, longitude);

    let latitude = ds.map(d => d.latitude);
    let maxLatitude = Math.max.apply(null, latitude);
    let minLatitude = Math.min.apply(null, latitude);

    longitude = null;
    latitude = null;
    cartesian = null;

    return {
        degrees: ds,
        center: {
            longitude: (maxLongitude + minLongitude) / 2,
            latitude: (maxLatitude + minLatitude) / 2
        }
    };

};

export const entityCode = () => {
    let { editor } = pickStore;
    editor.code = {
        js: `const viewer = new Cesium.Viewer('cesium-container');

viewer.entities.add({
    name: '${ editor.name }',
    ${ editor.category }: {
        coordinates: [
            // west: ${ Cesium.Math.toDegrees(editor.coordinates.west) }
            // south: ${ Cesium.Math.toDegrees(editor.coordinates.south) }
            // east: ${ Cesium.Math.toDegrees(editor.coordinates.east) }
            // north: ${ Cesium.Math.toDegrees(editor.coordinates.north) }
            new Cesium.Rectangle(
                ${ editor.coordinates.west }, 
                ${ editor.coordinates.south },
                ${ editor.coordinates.east },
                ${ editor.coordinates.north }
            )
        ],
        material: Cesium.Color.fromCssColorString(${ editor.graphicFill })
    }
});`,
        json: `{
    "name": "${ editor.name }",
    "${ editor.category }": {
        "coordinates": [
            ${ editor.coordinates.west }, ${ editor.coordinates.south }, ${ editor.coordinates.east }, ${ editor.coordinates.north }
        ],
        "material": "${ editor.graphicFill }"
    }
}`
    };
};

window.addEventListener('keyup', (e) => {

    if (typeof eventKeyup === 'function') {
        eventKeyup(e);
    }

}, false);