<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer.entities.add({
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(-110, 20, -80, 25),
            material: Cesium.Color.RED.withAlpha(.5)
        }
    });

    viewer.entities.add({
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(-110, 30, -100, 40),
            height: 800000,
            extrudedHeight: 1200000,
            rotation: Cesium.Math.toRadians(45),
            outline: true,
            material: Cesium.Color.GREEN.withAlpha(.5)
        }
    });

    let rotation = Cesium.Math.toRadians(30);

    const setRotation = () => {
        rotation += .0005;
        return rotation;
    };

    viewer.entities.add({
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(-92, 30, -76, 40),
            rotation: new Cesium.CallbackProperty(setRotation, false),
            stRotation: new Cesium.CallbackProperty(setRotation, false),
            material: '/static/img/tutorial/cesium-js/Cesium_Logo_Color.jpg',
            classificationType: Cesium.ClassificationType.TERRAIN
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

<style lang="scss" scoped>

</style>
