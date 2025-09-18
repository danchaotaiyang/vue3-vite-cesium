// noinspection DuplicatedCode

import * as Cesium from 'cesium';
import { cloneDeep } from 'lodash';
import { usePickStore } from '@/stores/example/PickingCollecting.js';
import { addPoint, cartesianToDegrees, getHalfCartesian, waiting } from '@/assets/js/utl.js';
import { graphicFill, modifyAlpha, pointPixelSize } from './index.js';


let pickStore = usePickStore();

let screenEvent = null;
let positionsBackup = null;
let graphicBackup = null;
let editorBackup = null;
let entityMoveEnable = false;
let entityMovingNode = null;
let pickEntity = null;

let time = new Cesium.JulianDate();

let editNodes = [];
let editNodeIds = [];
let editNodeIdIndex = -1;
let editHalfNodeIdIndex = -1;
let editHalfNodeIds = [];
let editHalfNextEntity = null;
let editHalfPrevEntity = null;
let editPolygon = null;
let eventKeyup;

export const entityCreate = () => {

    let { viewer, category: categoryRef, entities, editor, setTooltip } = pickStore;

    editor.adding = !editor.adding;

    if (editor.adding) {

        let { value: category, label } = categoryRef;
        let addPolygon = null;
        let addPoints = [];
        let addPointIds = [];

        screenEvent = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

        screenEvent.setInputAction((__event__) => {

            if (editor.creating) {
                return;
            }

            editor.creating = true;
            editor.wating = true;

            setTooltip(`按退格键重新拾取，鼠标右键结束拾取，按Esc键取消拾取。`);

            let ray = viewer.camera.getPickRay(__event__.position);
            let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

            if (!Cesium.defined(cartesian)) {
                editor.creating = false;
                return;
            }

            let point = addPoint(viewer, cartesian, '', {
                color: Cesium.Color.ORANGE.toCssColorString()
            });

            addPointIds.push(point.id);
            addPoints.push(cartesian);

            if (addPoints.length > 2 && !addPolygon) {
                addPolygon = viewer.entities.add({
                    name: `${ label }-${ entities.length + 1 }`,
                    polygon: {
                        hierarchy: new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(addPoints, null), false),
                        material: Cesium.Color.fromCssColorString(graphicFill),
                        clampToGround: true
                    },
                    __graphic__: category
                });
            }

            if (!eventKeyup) {

                let cancel = () => {

                    setTooltip();

                    for (const id of addPointIds) {
                        viewer.entities.removeById(id);
                    }

                    addPointIds = [];
                    addPoints = [];
                    viewer.entities.remove(addPolygon);
                    addPolygon = null;
                    editor.wating = true;
                    editor.creating = false;
                    eventKeyup = null;

                    cancel = null;
                };

                eventKeyup = (e) => {

                    switch (e.keyCode) {
                        case 8: {

                            let item = addPointIds.pop();
                            viewer.entities.removeById(item);
                            addPoints.pop();
                            if (addPointIds.length < 1) {
                                cancel();
                            }
                            item = null;

                            break;
                        }
                        case 27: {

                            cancel();

                            break;
                        }
                    }

                };
            }

            editor.creating = false;

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        screenEvent.setInputAction(async () => {

            if (editor.creating || addPointIds.length === 1) {
                return;
            }

            setTooltip();

            editor.creating = true;

            for (const id of addPointIds) {
                viewer.entities.removeById(id);
            }

            if (Cesium.defined(addPolygon)) {

                addPolygon.polygon.hierarchy = addPoints.map(d => {
                    return new Cesium.Cartesian3(d.x, d.y, d.z);
                });

                entities.push({ id: addPolygon.id, name: addPolygon.name, graphicFill, category });

                addPolygon = null;
            }

            addPoints = [];
            addPointIds = [];
            editor.creating = false;
            editor.wating = false;
            eventKeyup = null;

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    } else {

        if (screenEvent) {

            screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            screenEvent.destroy();
            screenEvent = null;

        }

    }

};

export const entityModify = async (item) => {

    let { viewer, setExclude, editor, setTooltip } = pickStore;

    editPolygon = viewer.entities.getById(item.id);

    if (editor.adding || editor.modifying || editor.flying || !Cesium.defined(editPolygon)) {
        return;
    }

    setTooltip(`节点上右键删除点，中点上右键转为节点。`);
    setExclude(item);

    await entityAim(editPolygon);

    let { __graphic__, name } = editPolygon;
    let graphic = editPolygon[ __graphic__ ];
    graphicBackup = graphic.clone();

    editor.category = __graphic__;
    editor.id = editPolygon.id;
    editor.name = name;
    editor.graphicFill = graphic.material.color.getValue(time).toCssColorString();
    let { degrees } = entityDegrees(editPolygon);
    editor.coordinates = degrees;
    editor.description = editPolygon.description;
    editor.modifying = true;
    editorBackup = cloneDeep(editor);

    entityCode();

    let cartesianCollection = editPolygon.polygon.hierarchy.getValue(time).positions;
    let cartesianLength = cartesianCollection.length;
    positionsBackup = cartesianCollection.map(d => d.clone());

    for (let i = 0; i < cartesianLength; i++) {

        let current = cartesianCollection[ i ];
        let point = addPoint(viewer, current, 'polygon-edit-point', {
            color: Cesium.Color.ORANGE.toCssColorString()
        });
        editNodeIds.push(point.id);
        editNodes.push(point.position.getValue(time));

        if (i < cartesianLength) {
            let index = i + 1;
            if (index === cartesianLength) {
                index = 0;
            }
            let next = cartesianCollection[ index ];
            let cartesianHalf = getHalfCartesian(current, next);
            let pointHalf = addPoint(viewer, cartesianHalf, 'polygon-edit-point-midpoint');
            editHalfNodeIds.push(pointHalf.id);

            pointHalf = null;
            cartesianHalf = null;
            next = null;

        }

        point = null;
        current = null;

    }

    editPolygon.polygon.hierarchy = new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(editNodes), false);

    cartesianCollection = null;

    screenEvent = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

    screenEvent.setInputAction((__event__) => {

        let graphic = viewer.scene.pick(__event__.position);

        if (!Cesium.defined(graphic)) {
            return;
        }

        editPolygon.polygon.hierarchy = new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(editNodes), false);
        pickEntity = graphic.id;

        if (!entityMoveEnable && !entityMovingNode) {

            if (pickEntity.name === 'polygon-edit-point') {

                entityMovingNode = pickEntity;
                entityMoveEnable = true;
                editNodeIdIndex = editNodeIds.findIndex(d => d === pickEntity.id);

                let prevIndex = editNodeIdIndex - 1;

                if (editNodeIdIndex === 0) {
                    prevIndex = editHalfNodeIds.length - 1;
                }

                if (editHalfNodeIds[ prevIndex ]) {
                    if (!editHalfPrevEntity || editHalfPrevEntity.id !== editHalfNodeIds[ prevIndex ]) {
                        editHalfPrevEntity = viewer.entities.getById(editHalfNodeIds[ prevIndex ]);
                    }
                }

                let nextIndex = editNodeIdIndex;

                if (editHalfNodeIds[ nextIndex ]) {
                    if (!editHalfNextEntity || editHalfNextEntity.id !== editHalfNodeIds[ nextIndex ]) {
                        editHalfNextEntity = viewer.entities.getById(editHalfNodeIds[ nextIndex ]);
                    }
                }

                pickEntity.point.pixelSize = pointPixelSize * 2;
                viewer.scene.screenSpaceCameraController.enableRotate = false;
                viewer.scene.screenSpaceCameraController.enableZoom = false;
                editor.moving = true;

            }

        }

        graphic = null;

    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    screenEvent.setInputAction((__event__) => {

        if (!entityMovingNode || !editor.modifying || !entityMoveEnable) {
            return;
        }

        if (entityMovingNode.name === 'polygon-edit-point') {

            let ray = viewer.camera.getPickRay(__event__.endPosition);
            let cartesian = viewer.scene.globe.pick(ray, viewer.scene);

            if (!Cesium.defined(cartesian)) {
                return;
            }

            editNodes[ editNodeIdIndex ] = cartesian;
            editor.coordinates[ editNodeIdIndex ] = cartesianToDegrees(cartesian);
            entityMovingNode.position = cartesian;

            if (Cesium.defined(editHalfPrevEntity)) {

                let prevIndex = editNodeIdIndex - 1;
                if (editNodeIdIndex === 0) {
                    prevIndex = editHalfNodeIds.length - 1;
                }

                let currPrev = editNodes[ prevIndex ];
                if (currPrev) {
                    editHalfPrevEntity.position = getHalfCartesian(cartesian, currPrev);
                }

                currPrev = null;

            }

            if (Cesium.defined(editHalfNextEntity)) {

                let nextIndex = editNodeIdIndex + 1;
                if (nextIndex === editNodeIds.length) {
                    nextIndex = 0;
                }

                let currNext = editNodes[ nextIndex ];
                if (currNext) {
                    editHalfNextEntity.position = getHalfCartesian(cartesian, currNext);
                }

                currNext = null;

            }

            cartesian = null;
            ray = null;

        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    screenEvent.setInputAction(() => {

        if (pickEntity && pickEntity.name === 'polygon-edit-point') {
            pickEntity.point.pixelSize = pointPixelSize;
            pickEntity = null;
        }

        entityMovingNode = null;
        entityMoveEnable = false;
        editNodeIdIndex = -1;
        editHalfNodeIdIndex = -1;
        editHalfNextEntity = null;
        editHalfPrevEntity = null;

        viewer.scene.screenSpaceCameraController.enableRotate = true;
        viewer.scene.screenSpaceCameraController.enableZoom = true;
        editor.moving = false;

        entityCode();

    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    screenEvent.setInputAction((__event__) => {

        let graphic = viewer.scene.pick(__event__.position);

        if (!Cesium.defined(graphic)) {
            return;
        }

        pickEntity = graphic.id;

        if (pickEntity.name === 'polygon-edit-point') {

            if (editNodeIds.length < 4) {
                return;
            }

            editNodeIdIndex = editNodeIds.findIndex(d => d === pickEntity.id);

            let prevIndex = editNodeIdIndex - 1;
            if (prevIndex < 0) {
                prevIndex = editNodeIds.length - 1;
            }
            let prevNodeId = editNodeIds[ prevIndex ];

            let nextIndex = editNodeIdIndex + 1;
            if (nextIndex === editNodeIds.length) {
                nextIndex = 0;
            }
            let nextNodeId = editNodeIds[ nextIndex ];

            editNodes.splice(editNodeIdIndex, 1);
            editNodeIds.splice(editNodeIdIndex, 1);
            editor.coordinates.splice(editNodeIdIndex, 1);
            viewer.entities.removeById(pickEntity.id);

            let halfIndex = editNodeIdIndex;
            let halfNodeId = editHalfNodeIds[ halfIndex ];
            viewer.entities.removeById(halfNodeId);
            editHalfNodeIds.splice(halfIndex, 1);

            let prevNodeIndex = editNodeIds.findIndex(d => d === prevNodeId);
            let nextNodeIndex = editNodeIds.findIndex(d => d === nextNodeId);

            let setHalfNodeIndex = halfIndex - 1;
            if (setHalfNodeIndex < 0) {
                setHalfNodeIndex = editHalfNodeIds.length - 1;
            }
            let setHalfNodeId = editHalfNodeIds[ setHalfNodeIndex ];

            let ppi = editNodes[ prevNodeIndex ];
            let pni = editNodes[ nextNodeIndex ];

            if (ppi && pni) {

                let editHalfEntity = viewer.entities.getById(setHalfNodeId);
                editHalfEntity.position = getHalfCartesian(ppi, pni);
                editHalfEntity = null;

            }

        }

        if (pickEntity.name === 'polygon-edit-point-midpoint') {

            pickEntity.name = 'polygon-edit-point';
            pickEntity.point.color = Cesium.Color.ORANGE;

            let cartesian = pickEntity.position.getValue(time);
            editHalfNodeIdIndex = editHalfNodeIds.findIndex(d => d === pickEntity.id);
            editNodeIdIndex = editHalfNodeIdIndex + 1;

            editNodes.splice(editNodeIdIndex, 0, cartesian);
            editNodeIds.splice(editNodeIdIndex, 0, pickEntity.id);
            editHalfNodeIds.splice(editHalfNodeIdIndex, 1);

            editor.coordinates.splice(editNodeIdIndex, 0, cartesianToDegrees(cartesian));

            let prevIndex = editNodeIdIndex - 1;

            if (prevIndex < 0) {
                prevIndex = editNodeIds.length - 1;
            }

            if (editNodeIds[ prevIndex ]) {

                let pe = viewer.entities.getById(editNodeIds[ prevIndex ]);
                let pp = pe.position.getValue(time);
                let ph = getHalfCartesian(cartesian, pp);

                editHalfPrevEntity = addPoint(viewer, ph, 'polygon-edit-point-midpoint');
                editHalfNodeIds.splice(editHalfNodeIdIndex, 0, editHalfPrevEntity.id);

            }

            let nextIndex = editNodeIdIndex + 1;

            if (nextIndex === editNodeIds.length) {
                nextIndex = 0;
            }

            if (editNodeIds[ nextIndex ]) {

                let ne = viewer.entities.getById(editNodeIds[ nextIndex ]);
                let np = ne.position.getValue(time);
                let nh = getHalfCartesian(cartesian, np);

                editHalfNextEntity = addPoint(viewer, nh, 'polygon-edit-point-midpoint');
                editHalfNodeIds.splice(editHalfNodeIdIndex + 1, 0, editHalfNextEntity.id);

            }

        }

        entityCode();

        pickEntity = null;
        entityMoveEnable = false;
        entityMovingNode = null;
        editNodeIdIndex = -1;
        editHalfNodeIdIndex = -1;
        editHalfNextEntity = null;
        editHalfPrevEntity = null;

    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    degrees = null;
    graphic = null;

};

export const entityModifyPosition = (index) => {

    let { viewer, editor } = pickStore;

    let editNodeId = editNodeIds[ index ];
    let degrees = editor.coordinates[ index ];
    let cartesian = Cesium.Cartesian3.fromDegrees(degrees.longitude, degrees.latitude);

    if (!Cesium.defined(cartesian)) {
        return;
    }

    if (editHalfNodeIds[ index - 1 ]) {
        editHalfPrevEntity = viewer.entities.getById(editHalfNodeIds[ index - 1 ]);
    }

    if (editHalfNodeIds[ index ]) {
        editHalfNextEntity = viewer.entities.getById(editHalfNodeIds[ index ]);
    }

    if (Cesium.defined(editHalfPrevEntity)) {

        let currPrev = editNodes[ index - 1 ];

        if (currPrev) {
            editHalfPrevEntity.position = getHalfCartesian(cartesian, currPrev);
            editHalfPrevEntity = null;
            currPrev = null;
        }

    }

    if (Cesium.defined(editHalfNextEntity)) {

        let currNext = editNodes[ index + 1 ];

        if (currNext) {
            editHalfNextEntity.position = getHalfCartesian(cartesian, currNext);
            editHalfNextEntity = null;
            currNext = null;
        }

    }

    entityMovingNode = viewer.entities.getById(editNodeId);

    if (Cesium.defined(entityMovingNode)) {
        entityMovingNode.position = cartesian;
    }

    editNodes[ index ] = cartesian;

    entityCode();

    cartesian = null;
    degrees = null;
    entityMovingNode = null;
};

export const entityModifyConfirm = async () => {

    let { entity, editor } = pickStore;

    if (entity) {

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
        editNodeIdIndex = -1;

        for (const id of editNodeIds) {
            viewer.entities.removeById(id);
        }

        editNodeIds = [];
        editHalfNodeIdIndex = -1;

        for (const id of editHalfNodeIds) {
            viewer.entities.removeById(id);
        }

        editHalfNodeIds = [];
        editNodes = [];

        let cartesianCollection = positionsBackup.map(d => d.clone());
        let cartesianLength = cartesianCollection.length;

        for (let i = 0; i < cartesianLength; i++) {

            let current = cartesianCollection[ i ];
            let point = addPoint(viewer, current, 'polygon-edit-point', {
                color: Cesium.Color.ORANGE.toCssColorString()
            });

            editNodeIds.push(point.id);
            editNodes.push(point.position.getValue(time));

            if (i < cartesianLength - 1) {

                let next = cartesianCollection[ i + 1 ];
                let cartesianHalf = getHalfCartesian(current, next);
                let pointHalf = addPoint(viewer, cartesianHalf, 'polygon-edit-point-midpoint');

                editHalfNodeIds.push(pointHalf.id);
                pointHalf = null;
                cartesianHalf = null;
                next = null;

            }

            point = null;
            current = null;

        }

        graphic.hierarchy = positionsBackup.map((d, i) => {

            let cloned = d.clone();

            editor.coordinates[ i ] = cartesianToDegrees(cloned);
            editNodes[ i ] = cloned;

            return cloned;

        });

        for (let i = 0; i < editNodes.length; i++) {
            entityModifyPosition(i);
        }

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

    let { viewer, setRestore, setTooltip } = pickStore;

    for (let i = 0; i < editNodeIds.length; i++) {

        viewer.entities.removeById(editNodeIds[ i ]);

        if (editHalfNodeIds[ i ]) {
            viewer.entities.removeById(editHalfNodeIds[ i ]);
        }

    }

    editPolygon.polygon.hierarchy = editNodes.map(d => {
        return new Cesium.Cartesian3(d.x, d.y, d.z);
    });

    if (screenEvent) {

        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN);
        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP);
        screenEvent.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        screenEvent.destroy();
        screenEvent = null;

    }

    setTooltip();
    setRestore();

    viewer.scene.screenSpaceCameraController.enableRotate = true;
    viewer.scene.screenSpaceCameraController.enableZoom = true;

    editNodes = [];
    editNodeIds = [];
    editNodeIdIndex = -1;
    editHalfNodeIds = [];
    editPolygon = null;
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

    let cartesian = entity.polygon.hierarchy.getValue(time).positions;
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

    let positions = editor.coordinates.map(d => {
        return `${ d.longitude }, ${ d.latitude }`;
    }).join(', \n            ');

    editor.code = {
        js: `const viewer = new Cesium.Viewer('cesium-container');

viewer.entities.add({
    name: '${ editor.name }',
    ${ editor.category }: {
        hierarchy: [
            ${ positions }
        ],
        material: Cesium.Color.fromCssColorString(${ editor.graphicFill }),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
});`,
        json: `{
    "name": "${ editor.name }",
    "${ editor.category }": {
        "hierarchy": [
            ${ positions }
        ],
        "material": "${ editor.graphicFill }",
        "heightReference": "CLAMP_TO_GROUND"
    }
}`
    };
};

window.addEventListener('keyup', (e) => {

    if (typeof eventKeyup === 'function') {
        eventKeyup(e);
    }

}, false);