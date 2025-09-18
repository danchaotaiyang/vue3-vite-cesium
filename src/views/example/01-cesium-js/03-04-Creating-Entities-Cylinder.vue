<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-100, 40, 200000),
        cylinder: {
            length: 400000,
            topRadius: 200000,
            bottomRadius: 200000,
            outline: true,
            outlineColor: Cesium.Color.DARK_GREEN,
            material: Cesium.Color.GREEN.withAlpha(.5)
        }
    });

    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-105, 40, 200000),
        cylinder: {
            length: 400000,
            topRadius: 0,
            bottomRadius: 200000,
            material: Cesium.Color.RED
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
