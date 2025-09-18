import * as Cesium from 'cesium';
import { usePickStore } from '@/stores/example/PickingCollecting.js';
import { addPoint } from '@/assets/js/utl.js';
import { graphicFill, graphicStroke, graphicStrokeWidth, heightReference, labelBackgroundColor, labelBackgroundPadding, labelFill, labelFont, labelShowBackground, labelStroke, labelStrokeWidth, pointPixelSize, style, verticalOrigin } from '@/views/example/Blog/PickingCollecting/index.js';


const pickStore = usePickStore();

let screenEvent = null;

export const entityCreate = () => {

    let { viewer, category: categoryRef, entities, editor } = pickStore;

    editor.adding = !editor.adding;

    if (editor.adding) {

        let { value: category, label } = categoryRef;

        let nodePoint = null;

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
            nodePoint = addPoint(viewer, cartesian, name);
            let entity = {};

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
