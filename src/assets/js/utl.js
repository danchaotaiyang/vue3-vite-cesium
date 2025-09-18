import * as Cesium from 'cesium';
import { graphicFill, graphicStroke, graphicStrokeWidth, heightReference, pointPixelSize } from '@/views/example/Blog/PickingCollecting/index.js';


export const waiting = (time = 32) => {

    return new Promise((resolve) => {

        let timerCallback = null;
        let timerWait = null;

        timerCallback = () => {
            resolve();
            clearTimeout(timerWait);
            timerCallback = null;
            timerWait = null;
        };

        timerWait = setTimeout(timerCallback, time);
    });

};

export const cartesianToDegrees = (cartesian) => {

    if (!Cesium.defined(cartesian)) {
        return null;
    }

    let { longitude, latitude } = Cesium.Cartographic.fromCartesian(cartesian);

    return {
        longitude: Cesium.Math.toDegrees(longitude),
        latitude: Cesium.Math.toDegrees(latitude)
    };
};

export const getHalfCartesian = (c1, c2) => {

    try {

        if (!c1 instanceof Cesium.Cartesian3) {
            console.warn('c1 is not an instance of Cartesian');
            return null;
        }

        if (!c2 instanceof Cesium.Cartesian3) {
            console.warn('c2 is not an instance of Cartesian');
            return null;
        }

        let x = (c1.x + c2.x) / 2;
        let y = (c1.y + c2.y) / 2;
        let z = (c1.z + c2.z) / 2;

        return new Cesium.Cartesian3(x, y, z);

    } catch (e) {
        console.warn(e);
    }

};

export const addPoint = (viewer, position, name = '', option) => {

    if (!position instanceof Cesium.Cartesian3) {
        console.warn('position is not an instance of Cartesian');
        return null;
    }

    let pixelSize = pointPixelSize;
    let color = graphicFill;
    let outlineWidth = graphicStrokeWidth;
    let outlineColor = graphicStroke;

    if (Cesium.defined(option)) {
        if (!isNaN(Number(option.pixelSize))) {
            pixelSize = option.pixelSize;
        }
        if (typeof option.color === 'string' && option.color !== '') {
            color = option.color;
        }
        if (!isNaN(Number(option.outlineWidth))) {
            outlineWidth = option.outlineWidth;
        }
        if (option.outlineColor) {
            outlineColor = option.outlineColor;
        }
    }

    let options = {
        position,
        point: {
            pixelSize,
            color: Cesium.Color.fromCssColorString(color),
            outlineWidth,
            outlineColor: Cesium.Color.fromCssColorString(outlineColor),
            heightReference
        }
    };

    if (typeof name === 'string' && name !== '') {
        options.name = name;
    }

    let entity = viewer.entities.add(options);

    entity.__graphic__ = 'point';

    return entity;

};