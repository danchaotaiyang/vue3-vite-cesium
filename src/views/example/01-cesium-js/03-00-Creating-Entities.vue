<script setup>
import { onMounted } from 'vue';
import * as Cesium   from 'cesium';


const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    const wyoming = viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                -109.080842, 45.002073,
                -105.91517, 45.002073,
                -104.058488, 44.996596,
                -104.053011, 43.002989,
                -104.053011, 41.003906,
                -105.728954, 40.998429,
                -107.919731, 41.003906,
                -109.04798, 40.998429,
                -111.047063, 40.998429,
                -111.047063, 42.000709,
                -111.047063, 44.476286,
                -111.05254, 45.002073,
            ]),
            height: 100000,
            outline: true,
            outlineColor: Cesium.Color.BLACK,
            material: Cesium.Color.RED.withAlpha(.5)
        }
    });

    viewer.zoomTo(wyoming);
};

onMounted(() => {
    createCesium();
});
</script>

<template>
<div id="cesium-container" class="fullscreen"></div>
</template>
