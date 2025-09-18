<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import { cesiumAccessTokenDefault } from '@/config.js';


Cesium.Ion.defaultAccessToken = cesiumAccessTokenDefault;

const createCesium = () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false
    });

    viewer[ '_cesiumWidget' ][ '_creditContainer' ][ 'style' ][ 'display' ] = 'none';
    viewer[ '_toolbar' ][ 'style' ][ 'display' ] = 'none';
};

onMounted(() => {
    createCesium();
});
</script>

<template>
<div id="cesium-container" class="fullscreen"></div>
</template>
