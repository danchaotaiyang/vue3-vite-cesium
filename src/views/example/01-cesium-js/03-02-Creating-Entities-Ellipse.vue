<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-111, 40, 150000),
        ellipse: {
            semiMajorAxis: 300000,
            semiMinorAxis: 300000,
            height: 200000,
            outline: true,
            material: Cesium.Color.GREEN
        }
    });
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-103, 40),
        ellipse: {
            semiMajorAxis: 400000,
            semiMinorAxis: 250000,
            material: Cesium.Color.RED
        }
    });
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-95, 40, 100000),
        ellipse: {
            semiMajorAxis: 400000,
            semiMinorAxis: 150000,
            extrudedHeight: 200000,
            rotation: Cesium.Math.toRadians(45),
            outline: true,
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
