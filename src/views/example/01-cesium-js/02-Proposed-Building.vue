<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';
import { cesiumAccessTokenDefault } from '@/config.js';


Cesium.Ion.defaultAccessToken = cesiumAccessTokenDefault;

const visible = ref(true);
const toggle = ref();

const createCesium = async () => {
    const viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false,
        terrain: Cesium.Terrain.fromWorldTerrain()
    });

    const buildings = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildings);

    const addBuildingGeoJSON = async () => {
        const __geo__json__url__ = await Cesium.IonResource.fromAssetId(1683409);
        const __geo__json__ = await Cesium.GeoJsonDataSource.load(__geo__json__url__, { clampToGround: true });
        const __data__source__ = await viewer.dataSources.add(__geo__json__);
        for (const entity of __data__source__.entities.values) {
            entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
        }
        // await viewer.flyTo(__data__source__);
    };

    await addBuildingGeoJSON();

    buildings.style = new Cesium.Cesium3DTileStyle({
        show: {
            conditions: [
                [ '${elementId} === 332469316', false ],
                [ '${elementId} === 332469317', false ],
                [ '${elementId} === 235368665', false ],
                [ '${elementId} === 530288180', false ],
                [ '${elementId} === 530288179', false ],
                [ '${elementId} === 532245203', false ],
                [ true, true ]
            ]
        },
        color: 'Boolean(${feature[ "cesium#color" ]}) ? color(${feature[ "cesium#color" ]}) : color("#ffffff")'
    });

    const building = await Cesium.Cesium3DTileset.fromIonAssetId(1687327, null);
    viewer.scene.primitives.add(building);

    await viewer.flyTo(building);

    toggle.value = () => {
        visible.value = !visible.value;
        building.show = visible.value;
    };
};

onMounted(() => {
    createCesium();
});
</script>

<template>
<div id="cesium-container" class="fullscreen"></div>
<el-button v-if="toggle" :icon="visible ? 'Hide' : 'View'" :type="visible ? 'warning' : 'success'" class="toggle-building" @click="toggle">{{ visible ? '隐藏' : '显示' }}建筑</el-button>
</template>

<style lang="scss" scoped>
.toggle-building {
    position: absolute;
    top: 8px;
    left: 8px;
}
</style>
