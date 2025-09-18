<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer.entities.add({
        corridor: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -100, 40,
                -105, 40,
                -105, 35
            ]),
            width: 200000,
            material: Cesium.Color.RED.withAlpha(.5)
        }
    });

    viewer.entities.add({
        corridor: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -90, 40,
                -95, 40,
                -95, 35
            ]),
            width: 200000,
            height: 100000,
            outline: true,
            cornerType: Cesium.CornerType.MITERED,
            material: Cesium.Color.GREEN
        }
    });

    viewer.entities.add({
        corridor: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -80, 40,
                -85, 40,
                -85, 35
            ]),
            width: 200000,
            height: 100000,
            extrudedHeight: 250000,
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            cornerType: Cesium.CornerType.BEVELED,
            material: Cesium.Color.BLUE.withAlpha(.5)
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
