<template>
<div id="cesium-container" class="fullscreen"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import { cesiumAccessTokenDefault } from '@/config.js';

/*  Cesium
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/

Cesium.Ion.defaultAccessToken = cesiumAccessTokenDefault;

const createCesium = async () => {

    const viewer = new Cesium.Viewer('cesium-container', {

        homeButton: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        baseLayerPicker: false,
        animation: false,
        timeline: false,
        sceneModePicker: false,

        baseLayer: Cesium.ImageryLayer.fromProviderAsync(
            Cesium.ArcGisMapServerImageryProvider.fromUrl('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'), {}
        ),

        terrain: Cesium.Terrain.fromWorldTerrain({
            requestWaterMask: true,
            requestVertexNormals: true
        })
    });

    /*  设置相机位置
    ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/
    viewer.camera.setView({
        destination: new Cesium.Cartesian3(1333761, -4661999, 4138088),
        orientation: {
            heading: Cesium.Math.toRadians(36),
            pitch: Cesium.Math.toRadians(-45)
        }
    });

    try {

        /*  添加建筑
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/

        const Tileset = viewer.scene.primitives.add(
            await Cesium.Cesium3DTileset.fromIonAssetId(75343, {})
        );

        Tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    [ '${Height} >= 300', 'rgba(45, 0, 75, .9)' ],
                    [ '${Height} >= 200', 'rgba(102, 71, 151, .9)' ],
                    [ '${Height} >= 100', 'rgba(170, 162, 204, .9)' ],
                    [ '${Height} >= 50', 'rgba(224, 226, 238, .9)' ],
                    [ '${Height} >= 25', 'rgba(252, 230, 200, .9)' ],
                    [ '${Height} >= 10', 'rgba(248, 176, 87, .9)' ],
                    [ '${Height} >= 5', 'rgba(198, 106, 11, .9)' ],
                    [ 'true', 'rgba(127, 59, 8, 1)' ]
                ]
            },
            show: '${Height} > 0',
            meta: {
                description: '"Building id ${id} has height ${Height}."'
            }
        });

        /*  行政区域划分
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/

        let neighborhoods = await Cesium.GeoJsonDataSource.load('/static/sampleData/BiliBili/sampleNeighborhoods.geojson');

        let { values } = neighborhoods[ 'entities' ];

        await viewer.dataSources.add(neighborhoods);

        values.map((entity) => {
            if (Cesium.defined(entity[ 'polygon' ])) {

                entity.name = entity.properties[ 'neighborhood' ];

                entity.polygon.material = Cesium.Color.fromRandom({
                    red: .1,
                    maximumGreen: .5,
                    minimumBlue: .5,
                    alpha: .5
                });

                entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;

                let { positions } = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now());
                let center = Cesium.BoundingSphere.fromPoints(positions).center;
                center = Cesium.Ellipsoid.WGS84.scaleToGeocentricSurface(center);
                entity.position = center;

                entity.label = {
                    text: entity.name,
                    showBackground: true,
                    scale: .6,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10, 8000),
                    disableDepthTestDistance: 100000
                };
            }
        });

        /*  公园标注
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/

        const kmlOptions = {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
            clampToGround: true
        };

        const geocache = await Cesium.KmlDataSource.load('/static/sampleData/BiliBili/sampleGeocacheLocations.kml', kmlOptions);
        await viewer.dataSources.add(geocache);
        geocache.entities.values.map((entity) => {
            if (Cesium.defined(entity.billboard)) {

                entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;

                entity.billboard.image = '/static/img/example/BiliBili/tagPark.png';

                entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10, 20000);

                entity.label = undefined;

                const position = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
                const latitude = Cesium.Math.toDegrees(position.latitude);
                const longitude = Cesium.Math.toDegrees(position.longitude);

                entity.description = `<table>
    <tr>
        <th>经度</th>
        <td>${ longitude }</td>
    </tr>
    <tr>
        <th>维度</th>
        <td>${ latitude }</td>
    </tr>
    <tr>
        <th>实时人流</th>
        <td>${ Math.floor(Math.random() * 20000) }</td>
    </tr>
    <tr>
        <th>安全等级</th>
        <td>${ Math.floor(Math.random() * 5) }</td>
    </tr>
</table>`;
            }
        });
    } catch (e) {
        console.warn(e);
    }
};

//■■■  Cesium  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ End

onMounted(() => {
    createCesium();
});

</script>
