<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                -115, 37,
                -115, 32,
                -107, 33,
                -102, 31,
                -102, 35
            ]),
            material: Cesium.Color.RED
        }
    });

    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                -108, 42,
                -100, 42,
                -104, 40
            ]),
            extrudedHeight: 500000,
            closeTop: false,
            closeBottom: false,
            material: Cesium.Color.GREEN
        }
    });

    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
                -118.4, 40.4, 50000,
                -118.4, 37, 30000,
                -114.2, 38, 35000,
                -108, 37, 30000,
                -108, 40.4, 50000
            ]),
            textureCoordinates: {
                positions: [
                    new Cesium.Cartesian2(0, 1),
                    new Cesium.Cartesian2(0, 0),
                    new Cesium.Cartesian2(.5, 0),
                    new Cesium.Cartesian2(1, 0),
                    new Cesium.Cartesian2(1, 1)
                ]
            },
            extrudedHeight: 0,
            perPositionHeight: true,
            material: '/static/img/tutorial/cesium-js/Cesium_Logo_Color.jpg'
        }
    });

    viewer.entities.add({
        polygon: {
            hierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                    -130, 40, 50000,
                    -130, 36, 30000,
                    -125, 37, 35000,
                    -120, 36, 30000,
                    -120, 40, 50000
                ]),
                holes: [
                    {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                            -128, 39.2, 46000,
                            -128, 38.6, 42000,
                            -127, 38.6, 42000,
                            -127, 39.2, 46000
                        ])
                    }
                ]
            },
            textureCoordinates: {
                positions: [
                    new Cesium.Cartesian2(0, 1),
                    new Cesium.Cartesian2(0, 0),
                    new Cesium.Cartesian2(.5, 0),
                    new Cesium.Cartesian2(1, 0),
                    new Cesium.Cartesian2(1, 1)
                ],
                holes: [
                    {
                        positions: [
                            new Cesium.Cartesian2(0.2, 0.8),
                            new Cesium.Cartesian2(0.2, 0.6),
                            new Cesium.Cartesian2(0.4, 0.6),
                            new Cesium.Cartesian2(0.4, 0.8)
                        ]
                    }
                ]
            },
            perPositionHeight: true,
            material: '/static/img/tutorial/cesium-js/Cesium_Logo_Color.jpg'
        }
    });

    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
                -108, 25, 100000,
                -100, 25, 100000,
                -100, 30, 100000,
                -108, 30, 300000
            ]),
            extrudedHeight: 0,
            perPositionHeight: true,
            outline: true,
            outlineColor: Cesium.Color.BLUE,
            material: Cesium.Color.ORANGE.withAlpha(.5)
        }
    });

    viewer.entities.add({
        polygon: {
            hierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray([
                    -99, 30,
                    -85, 30,
                    -85, 40,
                    -99, 40
                ]),
                holes: [
                    {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            -97, 31,
                            -97, 39,
                            -87, 39,
                            -87, 31
                        ]),
                        holes: [
                            {
                                positions: Cesium.Cartesian3.fromDegreesArray([
                                    -95, 33,
                                    -89, 33,
                                    -89, 37,
                                    -95, 37
                                ]),
                                holes: [
                                    {
                                        positions: Cesium.Cartesian3.fromDegreesArray([
                                            -93, 34,
                                            -91, 34,
                                            -91, 36,
                                            -93, 36
                                        ])
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            height: 0,
            outline: true,
            material: Cesium.Color.BLUE.withAlpha(.5)
        }
    });

    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
                -90, 41, 0,
                -85, 41, 500000,
                -80, 41, 0
            ]),
            perPositionHeight: true,
            outline: true,
            material: Cesium.Color.CYAN.withAlpha(.5)
        }
    });

    viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                -120, 45,
                -80, 45,
                -80, 55,
                -120, 55
            ]),
            extrudedHeight: 500000,
            outline: true,
            outlineColor: Cesium.Color.MAGENTA,
            arcType: Cesium.ArcType.RHUMB,
            material: Cesium.Color.PURPLE
        }
    });

    viewer.zoomTo(viewer.entities);
};

onMounted(() => {
    createCesium();
});
</script>

<template>
<div id="cesium-container" class="fullscreen"></div>
</template>
