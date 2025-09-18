<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';


const computedCircle = (radius) => {
    const positions = [];

    for (let i = 0; i < 360; i++) {
        const radian = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(radius * Math.cos(radian), radius * Math.sin(radian)));
    }

    return positions;
};

const computedStar = (arms, outer, inner) => {
    const positions = [];
    const angle = Math.PI / arms;
    const length = arms * 2;

    for (let i = 0; i < length; i++) {
        const radius = i % 2 === 0 ? outer : inner;
        positions.push(new Cesium.Cartesian2(radius * Math.cos(i * angle), radius * Math.sin(i * angle)))
    }

    return positions;
};

const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer.entities.add({
        polylineVolume: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -85, 32,
                -85, 36,
                -89, 36
            ]),
            shape: computedCircle(60000),
            material: Cesium.Color.RED.withAlpha(.5)
        }
    });

    viewer.entities.add({
        polylineVolume: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -90, 32, 0,
                -90, 36, 100000,
                -94, 36, 0
            ]),
            shape: [
                new Cesium.Cartesian2(-50000, -50000),
                new Cesium.Cartesian2(50000, -50000),
                new Cesium.Cartesian2(50000, 50000),
                new Cesium.Cartesian2(-50000, 50000)
            ],
            outline: true,
            cornerType: Cesium.CornerType.BEVELED,
            material: Cesium.Color.GREEN.withAlpha(.5)
        }
    });

    viewer.entities.add({
        polylineVolume: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -95, 32, 0,
                -95, 36, 100000,
                -99, 36, 200000
            ]),
            shape: computedStar(5, 80000, 30000),
            cornerType: Cesium.CornerType.MITERED,
            outline: true,
            material: Cesium.Color.BLUE.withAlpha(.5)
        }
    });

    viewer.zoomTo(viewer.entities);
};

onMounted(() => {
    createCesium();
})
</script>

<template>
<div id="cesium-container" class="fullscreen"></div>
</template>

<style scoped lang="scss">

</style>
