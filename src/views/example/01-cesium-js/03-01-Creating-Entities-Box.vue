<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-114, 40, 300000),
        box: {
            dimensions: new Cesium.Cartesian3(400000, 300000, 500000),
            material: Cesium.Color.BLUE
        }
    });

    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-107, 40, 300000),
        box: {
            dimensions: new Cesium.Cartesian3(400000, 300000, 500000),
            outline: true,
            outlineColor: Cesium.Color.BLACK,
            material: Cesium.Color.RED.withAlpha(.5)
        }
    });

    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-100, 40, 300000),
        box: {
            dimensions: new Cesium.Cartesian3(400000, 300000, 500000),
            fill: false,
            outline: true,
            outlineColor: Cesium.Color.YELLOW
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
