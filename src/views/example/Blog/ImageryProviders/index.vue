<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import * as Cesium from 'cesium';
import { ImageryProviderBaidu } from '@/assets/lib/ImageryProviderBaidu.js';
import { cameraView, cesiumAccessTokenDefault } from '@/config.js';

//■■■  Cesium  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
Cesium.Ion.defaultAccessToken = cesiumAccessTokenDefault;

let viewer;

const cesiumCreate = async () => {

    viewer = new Cesium.Viewer('cesium-container', {
        infoBox: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        homeButton: false,
        fullscreenButton: false,
        sceneModePicker: false,
        timeline: false,
        animation: false
    });

    viewer[ '_cesiumWidget' ][ '_creditContainer' ][ 'style' ][ 'display' ] = 'none';

    viewer[ '_toolbar' ][ 'style' ][ 'display' ] = 'none';

    /*
    1.61 - 2019-09-03

    Fixes - Disable FXAA by default. To re-enable, set scene.postProcessStages.fxaa.enabled = true #7875
    // viewer.scene.postProcessStages.fxaa.enabled = false;

    Fixes - Disabled HDR by default to improve visual quality in most standard use cases. Set viewer.scene.highDynamicRange = true to re-enable. #7966
    // viewer.scene.highDynamicRange  = true;

    */

    /*
    1.49 - 2018-09-04

    Breaking Changes - Removed Scene.fxaa. Use Scene.postProcessStages.fxaa.enabled instead. #6980
    // viewer.scene.fxaa = false;

    */

    // viewer.scene.globe.maximumScreenSpaceError = 4 / 3;
    // viewer.scene.postProcessStages.fxaa.enabled = true;

    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(cameraView.longitude, cameraView.latitude, cameraView.height)
    });

    setLighting();

    setProvider(imageryTypeTable.value[ 0 ]);

};

let lighting = ref(true);

const setLighting = () => {
    viewer.scene.globe.enableLighting = lighting.value;
};

const setProvider = (item) => {
    typeChoosing.value = false;
    if (!item) {
        return;
    }
    currentMapType.value = item;
    viewer.scene.imageryLayers.removeAll(true);
    switch (item.value) {
        case 'Grid': {
            imageryGrid();
            break;
        }
        case 'Ion': {
            imageryIon();
            break;
        }
        case 'Mapbox': {
            imageryMapbox();
            break;
        }
        case 'OSM': {
            imageryOSM();
            break;
        }
        case 'ArcGIS': {
            imageryArcGIS();
            break;
        }
        case 'Bing': {
            imageryBing();
            break;
        }
        case 'Google': {
            imageryGoogle();
            break;
        }
        case 'Sky': {
            imagerySkyMap();
            break;
        }
        case 'QQ': {
            imageryQQ();
            break;
        }
        case 'GaoDe': {
            imageryGaoDe();
            break;
        }
        case 'BaiDu': {
            imageryBaiDu();
            break;
        }
        default: {
        }
    }
    setPanelHeight();
};

const providerAsync = (provider) => new Promise((resolve) => {
    resolve(provider);
});

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗

    影像瓦片

╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

let datetime = '2024年10月30日 14:53:51';
let imageryTypeTable = ref([
    {
        label: '无地图',
        value: 'none'
    },
    {
        label: 'GridImageryProvider',
        value: 'Grid'
    },
    {
        label: 'IonImageryProvider',
        value: 'Ion'
    },
    {
        label: 'Mapbox',
        value: 'Mapbox'
    },
    {
        label: 'OpenStreetMap（OSM）',
        value: 'OSM'
    },
    {
        label: 'ArcGIS',
        value: 'ArcGIS'
    },
    {
        label: '必应地图',
        value: 'Bing'
    },
    {
        label: '谷歌地图',
        value: 'Google'
    },
    {
        label: '天地图',
        value: 'Sky'
    },
    {
        label: '腾讯地图',
        value: 'QQ'
    },
    {
        label: '高德地图',
        value: 'GaoDe'
    },
    {
        label: '百度地图',
        value: 'BaiDu'
    }
]);
let currentMapType = ref(null);

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    none
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const codeNone = ref({
    js: `new Cesium.Viewer('cesium-container', {
    infoBox: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    homeButton: false,
    fullscreenButton: false,
    sceneModePicker: false,
    timeline: false,
    animation: false
});`
});

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    Grid
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const stateGrid = reactive({
    cells: 8,
    color: '#ffffff66',
    glowColor: '#00ff000c',
    glowWidth: 6,
    backgroundColor: '#00800033',
    tileWidth: 256,
    tileHeight: 256,
    canvasSize: 256
});
const codeGrid = computed(() => {
    return {
        js: `const provider = new Cesium.GridImageryProvider({
    color: Cesium.Color.fromCssColorString('${ stateGrid.color }'),
    cells: ${ stateGrid.cells },
    glowColor: Cesium.Color.fromCssColorString('${ stateGrid.glowColor }'),
    glowWidth: ${ stateGrid.glowWidth },
    backgroundColor: Cesium.Color.fromCssColorString('${ stateGrid.backgroundColor }'),
    tileWidth: ${ stateGrid.tileWidth },
    tileHeight: ${ stateGrid.tileHeight },
    canvasSize: ${ stateGrid.canvasSize }
});
viewer.scene.imageryLayers.addImageryProvider(provider, null);`
    };
});
const codeGrid2 = computed(() => {
    return {
        js: `const provider = new Cesium.GridImageryProvider({
    color: Cesium.Color.fromCssColorString('${ stateGrid.color }'),
    cells: ${ stateGrid.cells },
    glowColor: Cesium.Color.fromCssColorString('${ stateGrid.glowColor }'),
    glowWidth: ${ stateGrid.glowWidth },
    backgroundColor: Cesium.Color.fromCssColorString('${ stateGrid.backgroundColor }'),
    tileWidth: ${ stateGrid.tileWidth },
    tileHeight: ${ stateGrid.tileHeight },
    canvasSize: ${ stateGrid.canvasSize }
});
const providerAsync = new Promise((resolve) => {
    resolve(provider);
});
const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync, null);
viewer.scene.imageryLayers.add(layer);`
    };
});

const imageryGrid = () => {
    viewer.scene.imageryLayers.removeAll(true);
    eval(codeGrid2.value.js);
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    Ion
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const stateIon = reactive({
    show: true,
    // 亮度
    brightness: Cesium.ImageryLayer.DEFAULT_BRIGHTNESS,
    // 色相
    hue: Cesium.ImageryLayer.DEFAULT_HUE,
    // 饱和度
    saturation: Cesium.ImageryLayer.DEFAULT_SATURATION,
    // 伽玛校正
    gamma: Cesium.ImageryLayer.DEFAULT_GAMMA,
    // 透明度
    alpha: 1,
    // 日区透明度
    dayAlpha: 0,
    // 夜区透明度
    nightAlpha: 1
});
let blackMarble;
const codeIon = computed(() => {
    return {
        js: `//=--  卫星图  --=//
const providerAsync = Cesium.IonImageryProvider.fromAssetId(3954, null);
const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync, null);
viewer.scene.imageryLayers.add(layer);

//=--  夜图  --=//
const providerNight = Cesium.IonImageryProvider.fromAssetId(3812, null);
blackMarble = Cesium.ImageryLayer.fromProviderAsync(providerNight, null);

blackMarble.show       = ${ stateIon.show };
blackMarble.brightness = ${ stateIon.brightness };
blackMarble.hue        = ${ stateIon.hue };
blackMarble.saturation = ${ stateIon.saturation };
blackMarble.gamma      = ${ stateIon.gamma };
blackMarble.alpha      = ${ stateIon.alpha };
blackMarble.dayAlpha   = ${ stateIon.dayAlpha };
blackMarble.nightAlpha = ${ stateIon.nightAlpha };

viewer.scene.imageryLayers.add(blackMarble);`
    };
});

const imageryIon = () => {
    viewer.scene.imageryLayers.removeAll(true);
    eval(codeIon.value.js);
};

const setIonBlackMarble = () => {
    blackMarble.show = stateIon.show;
    blackMarble.brightness = stateIon.brightness;
    blackMarble.hue = stateIon.hue;
    blackMarble.saturation = stateIon.saturation;
    blackMarble.gamma = stateIon.gamma;
    blackMarble.alpha = stateIon.alpha;
    blackMarble.dayAlpha = stateIon.dayAlpha;
    blackMarble.nightAlpha = stateIon.nightAlpha;
};

const resetIonBlackMarble = () => {
    stateIon.show = true;
    stateIon.brightness = Cesium.ImageryLayer.DEFAULT_BRIGHTNESS;
    stateIon.hue = Cesium.ImageryLayer.DEFAULT_HUE;
    stateIon.saturation = Cesium.ImageryLayer.DEFAULT_SATURATION;
    stateIon.gamma = Cesium.ImageryLayer.DEFAULT_GAMMA;
    stateIon.alpha = 1;
    stateIon.dayAlpha = 0;
    stateIon.nightAlpha = 1;
    setIonBlackMarble();
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    Mapbox
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const stateMapbox = reactive({
    id: 'mapbox.satellite',
    user: 'mapbox',
    styles: [
        {
            label: '卫星',
            value: 'satellite-v9'
        },
        {
            label: '街道',
            value: 'streets-v12'
        },
        {
            label: '户外',
            value: 'outdoors-v12'
        },
        {
            label: '亮色',
            value: 'light-v11'
        },
        {
            label: '暗色',
            value: 'dark-v11'
        },
        {
            label: '卫星街道',
            value: 'satellite-streets-v12'
        },
        {
            label: '日间导航',
            value: 'navigation-day-v1'
        },
        {
            label: '夜间导航',
            value: 'navigation-night-v1'
        }
    ],
    style: 'satellite-v9',
    size: '256',
    formats: [
        {
            label: 'png',
            value: 'png'
        },
        {
            label: '32色png',
            value: 'png32'
        },
        {
            label: '64色png',
            value: 'png64'
        },
        {
            label: '128色png',
            value: 'png128'
        },
        {
            label: '256色png',
            value: 'png256'
        },
        {
            label: 'JPG',
            value: 'jpg'
        },
        {
            label: '70%质量JPG',
            value: 'jpg70'
        },
        {
            label: '80%质量JPG',
            value: 'jpg80'
        },
        {
            label: '90%质量JPG',
            value: 'jpg90'
        },
        {
            label: '80%质量WebP',
            value: 'webp'
        }
    ],
    format: 'jpg',
    token: 'pk.eyJ1IjoieXV4aWFvbG9uZzAyMSIsImEiOiJja3d6dWx2eDUwcmV6MndseXl0YmQ2MTlpIn0.WvRhm1tiC-EeSedjEY8BAA'
});
const codeMapbox = computed(() => {
    return {
        js: `const provider = new Cesium.MapboxImageryProvider({
    mapId: '<瓦片集ID>',
    accessToken: '<TOKEN>'
});
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeMapbox2 = computed(() => {
    let { user, style, size } = stateMapbox;
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://api.mapbox.com/styles/v1/${ user }/${ style }/tiles/${ size }/{z}/{x}/{y}@2x?access_token=<TOKEN>'
});
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeMapbox3 = computed(() => {
    let { user, style, size } = stateMapbox;
    return {
        js: `const providerAsync = (option) => new Promise((resolve) => {
        resolve(new Cesium.UrlTemplateImageryProvider(option));
    });

const option = {
    url: 'https://api.mapbox.com/styles/v1/${ user }/${ style }/tiles/${ size }/{z}/{x}/{y}@2x?access_token=<TOKEN>'
};
const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(option), null);
viewer.scene.imageryLayers.add(layer);`
    };
});

const imageryMapbox = () => {
    viewer.scene.imageryLayers.removeAll(true);
    const code = codeMapbox2.value.js.replace('<TOKEN>', stateMapbox.token);
    eval(code);
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    OpenStreetMap
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const stateOSM = reactive({
    key: '6e5478c8a4f54c779f85573c0e399391',
    key2: '383118983d4a867dd2d367451720d724',
    categories: [
        {
            label: '标准',
            value: 0,
            option: {
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
        },
        {
            label: '自行车',
            value: 1,
            option: {
                url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
                subdomains: [ 'a', 'b', 'c' ]
            }
        },
        {
            label: '骑行运动',
            value: 2,
            option: {
                url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=<KEY>',
                subdomains: [ 'a', 'b', 'c' ]
            }
        },
        {
            label: '交通运输',
            value: 3,
            option: {
                url: 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=<KEY>',
                subdomains: [ 'a', 'b', 'c' ]
            }
        },
        {
            label: '地形地貌',
            value: 4,
            disabled: true,
            option: {
                url: 'https://tile.tracestrack.com/topo__/{z}/{x}/{y}.png?key=<KEY>'
            }
        },
        {
            label: '公共交通',
            value: 5,
            disabled: true,
            option: {
                url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png'
            }
        },
        {
            label: '人道救援',
            value: 6,
            option: {
                url: 'https://{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                subdomains: [ 'tile-a', 'tile-b', 'tile-c' ]
            }
        }
    ],
    category: 0
});
const optionOSM = computed(() => {
    let { categories, category } = stateOSM;
    let { option } = categories[ category ];
    let temp = `url: '${ option.url }'`;
    if (option.subdomains) {
        temp += `,
    subdomains: [ ${ option.subdomains.map(d => `'${ d }'`).join(', ') } ]`;
    }
    return `{
    ${ temp }
}`;
});
const codeOpenStreetMap = computed(() => {
    return {
        js: `const provider = new Cesium.OpenStreetMapImageryProvider({
    url: 'https://tile.openstreetmap.org/'
});
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeOpenStreetMap2 = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider(${ optionOSM.value });
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeOpenStreetMap3 = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider(${ optionOSM.value });
const layer = Cesium.ImageryLayer.fromProviderAsync(provider);
viewer.scene.imageryLayers.add(layer);`
    };
});

const imageryOSM = (category = 0) => {
    stateOSM.category = category;
    viewer.scene.imageryLayers.removeAll(true);
    const code = codeOpenStreetMap3.value.js.replace('<KEY>', stateOSM.key);
    eval(code);
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    ArcGIS
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const ApiKeyArcGIS = 'AAPKd57e641f86f6410892fd1b6914a8beceypQuii5c7-qrr9Q_Iof0B5wgXPO28T-qoSqj2b3QV2BcvN0eZNiAYfA2rgwpf17g';

const codeArcGIS = computed(() => {
    return {
        js: `Cesium.ArcGisMapService.cesiumAccessTokenDefault = '<ArcGIS Access Token>';
const layer = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.ArcGisMapServerImageryProvider.fromBasemapType(
        Cesium.ArcGisBaseMapType.SATELLITE
    )
);
viewer.scene.imageryLayers.add(layer);`
    };
});
const codeArcGIS2 = computed(() => {
    return {
        js: `const provider = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
    'https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer',
    {
        token: '<ArcGIS Access Token>'
    }
);
viewer.scene.imageryLayers.addImageryProvider(provider);
};`
    };
});
const codeArcGIS3 = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=<ArcGIS Access Token>',
    maximumLevel: 19
});
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeArcGIS4 = computed(() => {
    return {
        js: `const providerAsync = (option) => new Promise((resolve) => {
    resolve(new Cesium.UrlTemplateImageryProvider(option));
});

const option = {
    url: 'https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=<ArcGIS Access Token>',
    maximumLevel: 19
};

const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(option), null);
viewer.scene.imageryLayers.add(layer);`
    };
});
const codeArcGIS5 = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maximumLevel: 19
});
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeArcGIS6 = computed(() => {
    return {
        js: `const providerAsync = (option) => new Promise((resolve) => {
    resolve(new Cesium.UrlTemplateImageryProvider(option));
});

const option = {
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maximumLevel: 19
};

const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(option), null);
viewer.scene.imageryLayers.add(layer);`
    };
});

const imageryArcGIS = async () => {
    viewer.scene.imageryLayers.removeAll(true);
    const code = codeArcGIS6.value.js.replace('<ArcGIS Access Token>', ApiKeyArcGIS);
    eval(code);
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    必应地图
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const codeBing = computed(() => {
    return {
        js: `const providerAsync = Cesium.BingMapsImageryProvider.fromUrl(
    'https://dev.virtualearth.net',
    {
        key: '<KEY>',
        mapStyle: Cesium.BingMapsStyle.AERIAL
    }
);
const provider = Cesium.ImageryLayer.fromProviderAsync(providerAsync);
viewer.scene.imageryLayers.add(provider);`
    };
});

const imageryBing = () => {
    viewer.scene.imageryLayers.removeAll(true);
    const code = codeBing.value.js.replace('<KEY>', 'Av23FaXmQ1LMWZRsegJHGq1iFEYr8Y1WFMR1SM0Q7RyRPPcogT17-bdpEsJL2aVI');
    eval(code);
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    谷歌地图
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/

const codeGoogle = ref({
    js: `const provider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://{s}.google.com/kh/v=962?x={x}&y={y}&z={z}',
    subdomains: [ 'khms0', 'khms1' ]
});
viewer.scene.imageryLayers.addImageryProvider(provider);`
});
const codeGoogle2 = ref({
    js: `const provider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://{s}.google.com/kh/v=962?x={x}&y={y}&z={z}',
    subdomains: [ 'khms0', 'khms1' ]
});
const providerAsync = new Promise((resolve) => {
    resolve(provider);
});
const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync, null);
viewer.scene.imageryLayers.add(layer);`
});

const imageryGoogle = async () => {
    viewer.scene.imageryLayers.removeAll(true);
    eval(codeGoogle2.value.js);
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    天地图
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/

const stateSkyMap = reactive({
    key: '8be99cbd594e82d9d4118f9e7983d9b7',
    matrix: {
        c: '经纬度',
        w: '球面墨卡托'
    },
    tiles: [
        {
            label: '影像',
            value: 'img'
        },
        {
            label: '矢量',
            value: 'vec'
        },
        {
            label: '地形晕渲',
            value: 'ter'
        }
    ],
    tile: 'img',
    layers: [
        {
            label: '无',
            value: '',
            parent: 'img'
        },
        {
            label: '中文',
            value: 'cia',
            parent: 'img'
        },
        /*{
            label: '英文',
            value: 'eia',
            parent: 'img'
        },*/
        {
            label: '无',
            value: '',
            parent: 'vec'
        },
        {
            label: '中文',
            value: 'cva',
            parent: 'vec'
        },
        /*{
            label: '英文',
            value: 'eva',
            parent: 'vec'
        },*/
        {
            label: '无',
            value: '',
            parent: 'ter'
        },
        {
            label: '注记',
            value: 'cta',
            parent: 'ter'
        }
    ],
    layer: '',
    frontiers: [
        {
            label: '全球境界',
            value: 'ibo'
        }
    ],
    frontier: false
});
const skyMapLayers = computed(() => {
    return stateSkyMap[ 'layers' ].filter(d => d[ 'parent' ] === stateSkyMap.tile);
});
let skyTile = null;
let skyLayer = null;
let skyFrontier = null;

const codeSkyMap = computed(() => {
    const __tile__ = stateSkyMap.tile;

    const __layer__ = stateSkyMap.layer;
    let layer = '';
    if (__layer__) {
        layer = `
//  注记
const providerLayer = new Cesium.WebMapTileServiceImageryProvider({
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/${ __layer__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __layer__ }&STYLE={style}&TILEMATRIXSET={TileMatrixSet}&FORMAT=tile&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=<KEY>'
});
viewer.imageryLayers.addImageryProvider(providerLayer);`;
    }

    const __frontier__ = stateSkyMap.frontier;
    let frontier = '';
    if (__frontier__) {
        frontier = `
//  全球境界
const providerFrontier = new Cesium.WebMapTileServiceImageryProvider({
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE={style}&TILEMATRIXSET={TileMatrixSet}&FORMAT=tile&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=<KEY>'
});
viewer.imageryLayers.addImageryProvider(providerFrontier);`;
    }

    return {
        js: `const optionDefault = {
    layer: 'tdtBasicLayer',
    style: 'default',
    tileMatrixSetID: 'w',
    subdomains: [ 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7' ],
    maximumLevel: 18
};

//  地图类型
const providerTile = new Cesium.WebMapTileServiceImageryProvider({
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/${ __tile__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __tile__ }&STYLE={style}&TILEMATRIXSET={TileMatrixSet}&FORMAT=tile&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=<KEY>'
});

viewer.imageryLayers.addImageryProvider(providerTile);
${ layer }
${ frontier }`
    };
});
const codeSkyMap2 = computed(() => {
    const __tile__ = stateSkyMap.tile;

    const __layer__ = stateSkyMap.layer;
    let layer = '';
    if (__layer__) {
        layer = `
//  注记
const optionLayer = {
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/${ __layer__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __layer__ }&STYLE={style}&TILEMATRIXSET={TileMatrixSet}&FORMAT=tile&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=<KEY>'
};
let layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionLayer), null);
viewer.scene.imageryLayers.add(layer)`;
    }

    const __frontier__ = stateSkyMap.frontier;
    let frontier = '';
    if (__frontier__) {
        frontier = `
//  全球境界
const optionFrontier = {
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE={style}&TILEMATRIXSET={TileMatrixSet}&FORMAT=tile&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=<KEY>'
};
let frontier = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionFrontier), null);
viewer.scene.imageryLayers.add(frontier)`;
    }

    return {
        js: `const optionDefault = {
    layer: 'tdtBasicLayer',
    style: 'default',
    tileMatrixSetID: 'w',
    subdomains: [ 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7' ],
    maximumLevel: 18
};

const providerAsync = (option) => new Promise((resolve) => {
    resolve(new Cesium.WebMapTileServiceImageryProvider(option));
});

//  地图类型
let optionTile = {
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/${ __tile__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __tile__ }&STYLE={style}&TILEMATRIXSET={TileMatrixSet}&FORMAT=tile&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=<KEY>'
};
let tile = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionTile), null);
viewer.scene.imageryLayers.add(tile);
${ layer }
${ frontier }`
    };
});
const codeSkyMap3 = computed(() => {
    const __tile__ = stateSkyMap.tile;

    const __layer__ = stateSkyMap.layer;
    let layer = '';
    if (__layer__) {
        layer = `
//  注记
let providerLayer = new Cesium.UrlTemplateImageryProvider({
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/${ __layer__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __layer__ }&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=<KEY>'
});
viewer.scene.imageryLayers.addImageryProvider(providerLayer);`;
    }

    const __frontier__ = stateSkyMap.frontier;
    let frontier = '';
    if (__frontier__) {
        frontier = `
//  全球境界
let providerFrontier = new Cesium.UrlTemplateImageryProvider({
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=<KEY>'
});
viewer.scene.imageryLayers.addImageryProvider(providerFrontier);`;
    }

    return {
        js: `const optionDefault = {
    subdomains: [ 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7' ],
    maximumLevel: 18
};

//  地图类型
let providerTile = new Cesium.UrlTemplateImageryProvider({
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/${ __tile__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __tile__ }&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=<KEY>'
});

viewer.scene.imageryLayers.addImageryProvider(providerTile);
${ layer }
${ frontier }`
    };
});
const codeSkyMap4 = computed(() => {
    const __tile__ = stateSkyMap.tile;

    const __layer__ = stateSkyMap.layer;
    let layer = '';
    if (__layer__) {
        layer = `
//  全球境界
let optionLayer = {
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/${ __layer__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __layer__ }&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=<KEY>'
};
let layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionLayer), null);
viewer.scene.imageryLayers.add(layer);`;
    }

    const __frontier__ = stateSkyMap.frontier;
    let frontier = '';
    if (__frontier__) {
        frontier = `
//  注记
let optionFrontier = {
    ...optionDefault,
    url: 'https://{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=<KEY>'
};
let frontier = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionFrontier), null);
viewer.scene.imageryLayers.add(frontier);`;
    }

    return {
        js: `const optionDefault = {
    subdomains: [ 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7' ],
    maximumLevel: 18
};

const providerAsync = (option) => new Promise((resolve) => {
    resolve(new Cesium.UrlTemplateImageryProvider(option));
});

//  地图类型
let optionTile = {
    ...optionDefault,
    url: "https://{s}.tianditu.gov.cn/${ __tile__ }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ __tile__ }&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=<KEY>"
};
let tile = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionTile), null);
viewer.scene.imageryLayers.add(tile);
${ layer }
${ frontier }`
    };
});

const imagerySkyMap = () => {
    viewer.scene.imageryLayers.removeAll(true);
    stateSkyMap.layer = '';
    stateSkyMap.frontier = false;
    const tile = stateSkyMap.tile;
    const provider = new Cesium.UrlTemplateImageryProvider({
        url: `https://{s}.tianditu.gov.cn/${ tile }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ tile }&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${ stateSkyMap.key }`,
        subdomains: [ 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7' ],
        maximumLevel: 18
    });
    skyTile = Cesium.ImageryLayer.fromProviderAsync(providerAsync(provider), null);
    viewer.scene.imageryLayers.add(skyTile);
    viewer.scene.imageryLayers.lowerToBottom(skyTile);
};

const eventChangeSkyLayer = () => {
    if (skyLayer) {
        viewer.scene.imageryLayers.remove(skyLayer, true);
        skyLayer = null;
    }
    const layer = stateSkyMap.layer;
    if (layer) {
        const provider = new Cesium.UrlTemplateImageryProvider({
            url: `https://{s}.tianditu.gov.cn/${ layer }_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${ layer }&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${ stateSkyMap.key }`,
            subdomains: [ 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7' ],
            maximumLevel: 18
        });
        skyLayer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(provider), null);
        viewer.scene.imageryLayers.add(skyLayer);
    }
};

const eventChangeSkyFrontier = () => {
    if (skyFrontier) {
        viewer.scene.imageryLayers.remove(skyFrontier, true);
        skyFrontier = null;
    }
    if (stateSkyMap.frontier) {
        const provider = new Cesium.UrlTemplateImageryProvider({
            url: `https://{s}.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${ stateSkyMap.key }`,
            subdomains: [ 't0', 't1', 't2', 't3', 't4', 't5', 't6', 't7' ],
            maximumLevel: 18
        });
        skyFrontier = Cesium.ImageryLayer.fromProviderAsync(providerAsync(provider), null);
        viewer.scene.imageryLayers.add(skyFrontier);
    }
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    腾讯地图
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const codeQQ = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://{s}.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400',
    subdomains: [ 'p0', 'p1', 'p2', 'p3' ],
    minimumLevel: 1,
    maximumLevel: 18,
    customTags: {
        // 回调参数包含：imageryProvider, x, y, level
        sx(imageryProvider, x) {
            return x >> 4;
        },
        sy(imageryProvider, x, y, level) {
            return ((1 << level) - y) >> 4;
        }
    }
});
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeQQ2 = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://{s}.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400',
    subdomains: [ 'p0', 'p1', 'p2', 'p3' ],
    minimumLevel: 1,
    maximumLevel: 18,
    customTags: {
        // 回调参数包含：imageryProvider, x, y, level
        sx(imageryProvider, x) {
            return x >> 4;
        },
        sy(imageryProvider, x, y, level) {
            return ((1 << level) - y) >> 4;
        }
    }
});
const providerAsync = new Promise((resolve) => {
    resolve(provider);
});
const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync, null);
viewer.scene.imageryLayers.add(layer);`
    };
});

const imageryQQ = () => {
    viewer.scene.imageryLayers.removeAll(true);
    eval(codeQQ2.value.js);
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    高德地图
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
// 矢量地图带注记：https://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}
// 矢量地图不带注记：https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=1&ltype=3
// 影像不带注记：https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}
// 道路带注记：https://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8
// 道路不带注记：https://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11
// 移动端矢量带注记：https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}

const stateGaoDe = reactive({
    tiles: [
        {
            label: '影像',
            value: 'imagery'
        },
        {
            label: '矢量',
            value: 'vector'
        }
    ],
    tile: 'imagery',
    layers: [
        {
            label: '无',
            value: '',
            parent: 'imagery'
        },
        {
            label: '路网',
            value: 'road',
            parent: 'imagery'
        },
        {
            label: '注记',
            value: 'road-zh-cn',
            parent: 'imagery'
        },
        {
            label: '无',
            value: '',
            parent: 'vector'
        },
        {
            label: '中文',
            value: 'zh-cn',
            parent: 'vector'
        },
        {
            label: '英文',
            value: 'en',
            parent: 'vector'
        }
    ],
    layer: '',
    options: {
        'imagery': `{
    url: "https://{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=6",
    subdomains: [ "webst01", "webst02", "webst03", "webst04" ],
    maximumLevel: 18
}`,
        'imagery-road': `{
    url: "https://{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11",
    subdomains: [ "wprd01", "wprd02", "wprd03", "wprd04" ],
    maximumLevel: 18
}`,
        'imagery-road-zh-cn': `{
    url: "https://{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    subdomains: [ "webst01", "webst02", "webst03", "webst04" ],
    maximumLevel: 18
}`,
        'vector': `{
    url: "https://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=1&ltype=3",
    subdomains: [ "wprd01", "wprd02", "wprd03", "wprd04" ],
    maximumLevel: 18
}`,
        'vector-zh-cn': `{
    url: "https://{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    subdomains: [ "webrd01", "webrd02", "webrd03", "webrd04" ],
    maximumLevel: 18
}`,
        'vector-en': `{
    url: "https://{s}.is.autonavi.com/appmaptile?lang=en&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    subdomains: [ "webrd01", "webrd02", "webrd03", "webrd04" ],
    maximumLevel: 18
}`
    },
    currentRoadNet: false
});
const gaoDeLayers = computed(() => {
    return stateGaoDe[ 'layers' ].filter(d => d[ 'parent' ] === stateGaoDe[ 'tile' ]);
});
const gaoDeOption = computed(() => {
    let tile = `${ stateGaoDe[ 'tile' ] }`;
    if (stateGaoDe[ 'layer' ]) {
        tile += `-${ stateGaoDe[ 'layer' ] }`;
    }
    return stateGaoDe[ 'options' ][ tile ];
});
const codeGaoDe = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider(${ gaoDeOption.value });
viewer.scene.imageryLayers.addImageryProvider(provider);`
    };
});
const codeGaoDe2 = computed(() => {
    return {
        js: `const provider = new Cesium.UrlTemplateImageryProvider(${ gaoDeOption.value });
const providerAsync = new Promise((resolve) => {
    resolve(provider);
});
const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync, null);
viewer.scene.imageryLayers.add(layer);`
    };
});

const imageryGaoDe = () => {
    eval(codeGaoDe2.value.js);
};

const eventChangeGaoDeTile = () => {
    viewer.scene.imageryLayers.removeAll(true);
    stateGaoDe.layer = '';
    imageryGaoDe();
};

const eventChangeGaoDeLayer = () => {
    viewer.scene.imageryLayers.removeAll(true);
    imageryGaoDe();
};

/*
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    百度地图
══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
*/
const stateBaidu = reactive({
    tiles: [
        {
            label: '影像',
            value: 'imagery'
        },
        {
            label: '矢量',
            value: 'vector'
        }
    ],
    tile: 'imagery',
    annotation: false
});

const codeBaiDu = ref({
    js: `var mapOption   = {
    //host
    url: 'https://maponline0.bdimg.com/starpic/'
};
var imgProvider = new BaiduImageryProvider(mapOption);

var viewerOption = {
    // ...
    imageryProvider: imgProvider
};

var viewer = new Cesium.Viewer('map', viewerOption);`
});
const codeBaiDu2 = computed(() => {
    let road = '';
    if (stateBaidu.annotation) {
        road = `
const providerRoad = new ImageryProviderBaidu({
    type: "${ stateBaidu.tile }",
    url: "https://{s}.bdimg.com/",
    subdomains: [ "maponline0", "maponline1", "maponline2", "maponline3" ],
    udt: "20231125",
    annotation: ${ stateBaidu.annotation }
});
viewer.scene.imageryLayers.addImageryProvider(providerRoad);`;
    }
    return {
        js: `const providerTile = new ImageryProviderBaidu({
    type: "${ stateBaidu.tile }",
    url: "https://{s}.bdimg.com/",
    subdomains: [ "maponline0", "maponline1", "maponline2", "maponline3" ],
    udt: "20231125",
    annotation: ${ stateBaidu.annotation }
});
viewer.scene.imageryLayers.addImageryProvider(providerTile);
${ road }`
    };
});
const codeBaiDu3 = computed(() => {
    let road = '';
    if (stateBaidu.tile === 'imagery' && stateBaidu.annotation) {
        road = `
const optionRoad = {
    type: "road",
    url: "https://{s}.bdimg.com/",
    subdomains: [ "maponline0", "maponline1", "maponline2", "maponline3" ],
    udt: "20231125",
    annotation: ${ stateBaidu.annotation }
};
let layerRoad = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionRoad), null);
viewer.scene.imageryLayers.add(layerRoad);`;
    }
    return {
        js: `const providerAsync = (option) => new Promise((resolve) => {
    resolve(new ImageryProviderBaidu(option));
});

const optionTile = {
    type: "${ stateBaidu.tile }",
    url: "https://{s}.bdimg.com/",
    subdomains: [ "maponline0", "maponline1", "maponline2", "maponline3" ],
    udt: "20231125",
    annotation: ${ stateBaidu.annotation }
};
const layer = Cesium.ImageryLayer.fromProviderAsync(providerAsync(optionTile), null);
viewer.scene.imageryLayers.add(layer);
${ road }`
    };
});

const imageryBaiDu = () => {
    viewer.scene.imageryLayers.removeAll(true);
    eval(codeBaiDu3.value.js);
};

//■■■  Panel  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

const panelBodyRef = ref();
const panelView = ref(false);
const panelHeight = ref(0);
const clientHeight = ref(window.innerHeight);
const panelBodyStyle = computed(() => {
    let height = `auto`;
    if (panelHeight.value >= clientHeight.value - 60) {
        height = `${ clientHeight.value - 60 }px`;
    }
    return {
        height
    };
});
const typeChoosing = ref(false);

const setPanelHeight = () => {
    clientHeight.value = window.innerHeight;
    panelHeight.value = 0;
    nextTick(() => {
        panelHeight.value = panelBodyRef.value.clientHeight;
    });
};

const eventClickPanel = () => {
    typeChoosing.value = false;
};

const eventChooseType = () => {
    typeChoosing.value = !typeChoosing.value;
};

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗

    说明

╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
const eventToggleDescription = () => {
    typeChoosing.value = false;
    if (currentMapType.value) {
        panelView.value = !panelView.value;
    }
    setPanelHeight();
};

onMounted(() => {
    cesiumCreate();
});

window.addEventListener('resize', () => {
    setPanelHeight();
}, false);

</script>

<template>
<div id="cesium-container" :class="{ 'padding-view': panelView }" class="fullscreen"></div>
<div class="panel" @click.stop="eventClickPanel">
    <div class="panel-head">
        <div v-if="currentMapType" class="type-current">
            <div class="type-icon" @click.stop="eventChooseType"><img :src="`/static/img/example/${ currentMapType[ 'value' ] }.png`" alt=""></div>
            <div class="type-label" @click.stop="eventToggleDescription">{{ currentMapType[ 'label' ] }}</div>
        </div>
    </div>
    <div class="panel-body" ref="panelBodyRef">
        <el-scrollbar :style="panelBodyStyle" always>
            <div v-if="currentMapType" v-show="panelView" class="description">
                <!--  none  -->
                <div v-if="currentMapType.value === 'none'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3>地球</h3>
                    <p>如果需要离线使用 cesium，可以通过以下几个步骤：</p>
                    <p>第一：<span class="code">baseLayerPicker</span>参数设置为<span class="code">false</span>，关闭<span class="code">baseLayerPicker</span>组件；</p>
                    <p>第二：<strong>baseLayer</strong>或<strong>imageryProvider</strong>参数设置为<span class="code">false</span>，再或者调用<span class="code">viewer.scene.imageryLayers.removeAll(true);</span>来阻止加载影像图层。如此也就不会请求验证<span class="code">token</span>，因此无需设置<span class="code">Cesium.Ion.defaultAccessToken</span>;
                    </p>
                    <p>也可以设置</p>
                    <p>可以加载
                        <router-link :to="{ name: 'Cesium-Ion-Self-Hosted' }" target="_blank">自主托管</router-link>
                        资源或其它平台地图资源。
                    </p>
                    <monaco-editor :model-value="codeNone" height="200px" />
                    <p>需要注意的是，<span class="code">globe</span>选项值是场景中的地球，<strong>需要保持默认值</strong>，如果设置为<span class="code">false</span>，则不会添加地球，并且默认将天空大气隐藏。所有对<span class="code">viewer</span>的操作都将抱错。
                    </p>
                    <div class="warn">
                        <p>文章内容需根据实际使用Cesium版本进行对比理解！</p>
                    </div>
                    <dl>
                        <dt>参阅：</dt>
                        <dd><a href="//bzdt.ch.mnr.gov.cn/" target="_blank">标准地图服务</a></dd>
                        <dd>
                            <a href="//blog.csdn.net/hopetomorrow/article/details/131113406?spm=1001.2014.3001.5506" target="_blank">学习路之Cesium--离线环境下使用 cesium</a>
                        </dd>
                        <dd><a href="//www.xjx100.cn/news/308206.html?action=onClick" target="_blank">Cesium加载影像图层</a></dd>
                        <dd><a href="//blog.csdn.net/m0_60387551/article/details/123728112" target="_blank">cesium接入高德、osm、谷歌、arcgis、mapbox地图</a></dd>
                    </dl>
                </div>
                <!--  Grid  -->
                <div v-if="currentMapType.value === 'Grid'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="//cesium.com/learn/cesiumjs/ref-doc/GridImageryProvider.html" target="_blank">new Cesium.GridImageryProvider(options)</a></h3>
                    <p><span class="code">GridImageryProvider</span>用来在瓦片上绘制线框，并且能够控制背景和发光效果，可以用于定制的渲染效果或地形调试。</p>
                    <table>
                        <thead>
                        <tr>
                            <th>属性</th>
                            <th>类型</th>
                            <th>默认</th>
                            <th>说明</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span>tilingScheme</span></td>
                            <td><a href="//cesium.com/learn/cesiumjs/ref-doc/TilingScheme.html" target="_blank">tilingScheme</a></td>
                            <td><span>new GeographicTilingScheme()</span></td>
                            <td>瓦片绘制方案。</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><span>ellipsoid</span></td>
                            <td><a href="//cesium.com/learn/cesiumjs/ref-doc/Ellipsoid.html" target="_blank">Ellipsoid</a></td>
                            <td><span>new GeographicTilingScheme()</span></td>
                            <td colspan="2">椭球体。如果指定了tilingScheme参数，则会忽略此参数，并改用tilingScheme的椭球体。如果两个参数都没有被指定，那么会使用WGS84椭球体。</td>
                        </tr>
                        <tr>
                            <td><span>cells</span></td>
                            <td>number</td>
                            <td>8</td>
                            <td>网格单元的数量。</td>
                            <td>
                                <el-input-number v-model="stateGrid.cells" :min="1" controls-position="right" @change="imageryGrid" />
                            </td>
                        </tr>
                        <tr>
                            <td><span>color</span></td>
                            <td><a href="//cesium.com/learn/cesiumjs/ref-doc/Color.html" target="_blank">Cesium.Color</a></td>
                            <td>Color(1.0, 1.0, 1.0, 0.4)</td>
                            <td>网格线的颜色。</td>
                            <td>
                                <el-color-picker v-model="stateGrid.color" show-alpha @change="imageryGrid" />
                            </td>
                        </tr>
                        <tr>
                            <td><span>glowColor</span></td>
                            <td><a href="//cesium.com/learn/cesiumjs/ref-doc/Color.html" target="_blank">Cesium.Color</a></td>
                            <td>Color(0.0, 1.0, 0.0, 0.05)</td>
                            <td>网格线的颜色。</td>
                            <td>
                                <el-color-picker v-model="stateGrid.glowColor" show-alpha @change="imageryGrid" />
                            </td>
                        </tr>
                        <tr>
                            <td><span>glowWidth</span></td>
                            <td>number</td>
                            <td>6</td>
                            <td>网格线的颜色。</td>
                            <td>
                                <el-input-number v-model="stateGrid.glowWidth" :min="1" controls-position="right" @change="imageryGrid" />
                            </td>
                        </tr>
                        <tr>
                            <td><span>backgroundColor</span></td>
                            <td><a href="//cesium.com/learn/cesiumjs/ref-doc/Color.html" target="_blank">Cesium.Color</a></td>
                            <td>Color(0.0, 0.5, 0.0, 0.2)</td>
                            <td>背景填充颜色。</td>
                            <td>
                                <el-color-picker v-model="stateGrid.backgroundColor" show-alpha @change="imageryGrid" />
                            </td>
                        </tr>
                        <tr>
                            <td><span>tileWidth</span></td>
                            <td>number</td>
                            <td>256</td>
                            <td>层次细节的瓦片宽度。</td>
                            <td>
                                <el-input-number v-model="stateGrid.tileWidth" :min="1" controls-position="right" @change="imageryGrid" />
                            </td>
                        </tr>
                        <tr>
                            <td><span>tileHeight</span></td>
                            <td>number</td>
                            <td>256</td>
                            <td>层次细节的瓦片高度。</td>
                            <td>
                                <el-input-number v-model="stateGrid.tileHeight" :min="1" controls-position="right" @change="imageryGrid" />
                            </td>
                        </tr>
                        <tr>
                            <td><span>canvasSize</span></td>
                            <td>number</td>
                            <td>256</td>
                            <td>用于渲染的画布尺寸。</td>
                            <td>
                                <el-input-number v-model="stateGrid.canvasSize" :min="1" controls-position="right" @change="imageryGrid" />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeGrid" height="225px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeGrid2" height="290px" />
                </div>
                <!--  Ion  -->
                <div v-if="currentMapType.value === 'Ion'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="//cesium.com/learn/cesiumjs/ref-doc/IonImageryProvider.html" target="_blank">new Cesium.IonImageryProvider(options)</a></h3>
                    <p>使用<a href="//ion.cesium.com/assets" target="_blank">Cesium ion REST API</a>提供影像瓦片</p>
                    <div class="warn">
                        <p>要构建一个<strong>IonImageryProvider</strong>，调用<a href="//cesium.com/learn/cesiumjs/ref-doc/IonImageryProvider.html#.fromAssetId" target="_blank">IonImageryProvider.fromAssetId</a>方法。不要直接调用构造函数。
                        </p>
                        <p>要设置<strong>Cesium.Ion.defaultAccessToken</strong></p>
                    </div>
                    <h4>
                        <a href="//cesium.com/learn/cesiumjs/ref-doc/IonImageryProvider.html#.fromAssetId" target="_blank">Cesium.IonImageryProvider.fromAssetId(assetId, options)</a>
                    </h4>
                    <table>
                        <thead>
                        <tr>
                            <th>属性</th>
                            <th>类型</th>
                            <th>说明</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span>assetId</span></td>
                            <td>number</td>
                            <td>Ion 中的影像资源ID。</td>
                        </tr>
                        <tr>
                            <td><span>options</span></td>
                            <td>
                                <a href="//cesium.com/learn/cesiumjs/ref-doc/IonImageryProvider.html#.ConstructorOptions" target="_blank">IonImageryProvider.ConstructorOptions</a>
                            </td>
                            <td>描述初始化选项的对象。</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="example">
                        <el-form label-width="7em">
                            <el-form-item label="夜间卫星图：">
                                <el-switch v-model="stateIon.show" @change="setIonBlackMarble" />
                            </el-form-item>
                            <div v-show="stateIon.show">
                                <el-form-item label="亮度：">
                                    <el-slider v-model="stateIon.brightness" :max="10" :min="0" :step=".01" @input="setIonBlackMarble" />
                                </el-form-item>
                                <el-form-item label="色相：">
                                    <el-slider v-model="stateIon.hue" :max="Math.PI * 2" :min="0" :step=".01" @input="setIonBlackMarble" />
                                </el-form-item>
                                <el-form-item label="饱和度：">
                                    <el-slider v-model="stateIon.saturation" :max="30" :min="0" :step=".01" @input="setIonBlackMarble" />
                                </el-form-item>
                                <el-form-item label="伽玛校正：">
                                    <el-slider v-model="stateIon.gamma" :max="10" :min="0" :step=".1" @input="setIonBlackMarble" />
                                </el-form-item>
                                <el-form-item label="透明度：">
                                    <el-slider v-model="stateIon.alpha" :max="1" :min="0" :step=".01" @input="setIonBlackMarble" />
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="example">
                        <el-form label-width="7em">
                            <el-form-item label="日区透明度：">
                                <el-slider v-model="stateIon.dayAlpha" :disabled="!lighting" :max="1" :min="0" :step=".01" @input="setIonBlackMarble" />
                            </el-form-item>
                            <el-form-item label="夜区透明度：">
                                <el-slider v-model="stateIon.nightAlpha" :disabled="!lighting" :max="1" :min="0" :step=".01" @input="setIonBlackMarble" />
                            </el-form-item>
                        </el-form>
                    </div>
                    <p>
                        <el-button type="warning" @click.stop="resetIonBlackMarble">默认</el-button>
                    </p>
                    <monaco-editor :model-value="codeIon" height="353px" />
                </div>
                <!--  Mapbox  -->
                <div v-if="currentMapType.value === 'Mapbox'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="//cesium.com/learn/cesiumjs/ref-doc/MapboxImageryProvider.html" target="_blank">new Cesium.MapboxImageryProvider(options)</a></h3>
                    <p>提供<a href="//www.mapbox.com/" target="_blank">Mapbox</a>托管的影像瓦片，瓦片仅支持<span class="code">22</span>级，<span class="code">maximumLevel</span>建议最大值为<span class="code">22</span>。按量计费，默认静态瓦片API有<strong>200000</strong>个免费请求额度。
                    </p>
                    <div class="warn">
                        <p>注意请求配额使用情况。</p>
                    </div>
                    <monaco-editor :model-value="codeMapbox" height="130px" />
                    <h4><a href="//cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">new Cesium.UrlTemplateImageryProvider(options)</a>
                    </h4>
                    <div class="warn">
                        <p>https://api.mapbox.com/styles/v1/<strong>&lt;用户名&gt;</strong>/<strong>&lt;瓦片样式ID&gt;</strong>/tiles/<strong>&lt;瓦片尺寸&gt;</strong>/{z}/{x}/{y}@2x?access_token=<strong>&lt;TOKEN&gt;</strong></p>
                    </div>
                    <div class="warn">
                        <p>https://api.mapbox.com/v4/<strong>&lt;瓦片集ID&gt;</strong>/{zoom}/{x}/{y}{@2x}.<strong>&lt;瓦片格式&gt;</strong>?access_token=<strong>&lt;token&gt;</strong>?access_token=<strong>&lt;TOKEN&gt;</strong></p>
                    </div>
                    <div class="example">
                        <el-form>
                            <el-form-item label="瓦片样式：">
                                <el-radio-group v-model="stateMapbox.style" @change="imageryMapbox">
                                    <el-radio-button :label="item.label" :value="item.value" v-for="(item, index) in stateMapbox.styles" :key="index"></el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeMapbox2" height="120px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeMapbox3" height="130px" />
                    <dl>
                        <dt>参阅：</dt>
                        <dd><a href="//docs.mapbox.com/api/maps/static-tiles/" target="_blank">Static Tiles API</a></dd>
                    </dl>
                </div>
                <!--  OpenStreetMap  -->
                <div v-if="currentMapType.value === 'OSM'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3>
                        <a href="//cesium.com/learn/cesiumjs/ref-doc/OpenStreetMapImageryProvider.html" target="_blank">new Cesium.OpenStreetMapImageryProvider(options)</a>
                    </h3>
                    <p>提供<a href="//www.openstreetmap.org/" target="_blank">OpenStreetMap</a>或其他托管的影像瓦片，默认连接到OpenStreetMap服务器，因此必须遵守他们的<strong>使用策略</strong>。
                    </p>
                    <monaco-editor :model-value="codeOpenStreetMap" />
                    <table>
                        <thead>
                        <tr>
                            <th>属性</th>
                            <th>类型</th>
                            <th>默认</th>
                            <th>说明</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span>url</span></td>
                            <td>string</td>
                            <td><span>'https://tile.openstreetmap.org'</span></td>
                            <td>OpenStreetMap服务器url。</td>
                        </tr>
                        <tr>
                            <td><span>fileExtension</span></td>
                            <td>string</td>
                            <td><span>'png'</span></td>
                            <td>服务器上图像文件的文件扩展名。</td>
                        </tr>
                        <tr>
                            <td><span>retinaTiles</span></td>
                            <td>boolean</td>
                            <td><span>false</span></td>
                            <td>如果设置为true，则会针对Retina显示屏请求2倍分辨率的瓦片。</td>
                        </tr>
                        <tr>
                            <td><span>rectangle</span></td>
                            <td><a href="//cesium.com/learn/cesiumjs/ref-doc/Rectangle.html" target="_blank">Rectangle</a></td>
                            <td><span>Rectangle.MAX_VALUE</span></td>
                            <td>图层的矩形区域范围。</td>
                        </tr>
                        <tr>
                            <td><span>minimumLevel</span></td>
                            <td>number</td>
                            <td><span>0</span></td>
                            <td>影像提供支持的最低细节级别。</td>
                        </tr>
                        <tr>
                            <td><span>maximumLevel</span></td>
                            <td>number</td>
                            <td><span></span></td>
                            <td>影像提供支持的最高细节级别，如果没有限制，则未定义。</td>
                        </tr>
                        <tr>
                            <td><span>ellipsoid</span></td>
                            <td><a href="//cesium.com/learn/cesiumjs/ref-doc/Ellipsoid.html" target="_blank">Ellipsoid</a></td>
                            <td><span></span></td>
                            <td>椭球体。如果未指定，则使用WGS84椭球体。</td>
                        </tr>
                        <tr>
                            <td><span>credit</span></td>
                            <td><span><a href="//cesium.com/learn/cesiumjs/ref-doc/Credit.html" target="_blank">Credit</a> | string</span></td>
                            <td>'MapQuest, Open Street Map and contributors, CC-BY-SA'</td>
                            <td>数据来源的署名，将显示在画布上。</td>
                        </tr>
                        </tbody>
                    </table>
                    <h4><a href="//cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">new Cesium.UrlTemplateImageryProvider(options)</a>
                    </h4>
                    <p>OpenStreetMap提供了<a href="//www.openstreetmap.org/#map=13/38.8813/121.5248" target="_blank">标准地图</a>，<a href="//www.openstreetmap.org/#map=13/38.8813/121.5248&layers=Y" target="_blank">自行车地图</a>，<a href="//www.openstreetmap.org/#map=13/38.8813/121.5248&layers=C" target="_blank">骑行运动地图</a>，<a href="//www.openstreetmap.org/#map=13/38.8813/121.5248&layers=T" target="_blank">交通运输地图</a>，<a href="//www.openstreetmap.org/#map=13/38.8813/121.5248&layers=P" target="_blank">地形地貌地图</a>，<a href="//www.openstreetmap.org/#map=13/38.8813/121.5248&layers=O" target="_blank">公共交通地图</a>，<a href="//www.openstreetmap.org/#map=13/38.8813/121.5248&layers=H" target="_blank">人道救援地图</a>，其中<strong>地形地貌地图</strong>与<strong>公共交通地图</strong>瓦片请求跨域
                    </p>
                    <div class="example">
                        <el-form label-width="6em">
                            <el-form-item label="地图类型：">
                                <el-radio-group v-model="stateOSM.category" @change="imageryOSM">
                                    <el-radio-button :value="item.value" v-for="(item, index) in stateOSM.categories" :key="index" :disabled="item.disabled">{{ item.label }}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeOpenStreetMap2" height="116px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeOpenStreetMap3" height="130px" />
                </div>
                <!--  ArcGIS  -->
                <div v-if="currentMapType.value === 'ArcGIS'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3>
                        <a href="//cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html" target="_blank">new Cesium.ArcGisMapServerImageryProvider(options)</a>
                    </h3>
                    <div class="warn">
                        <p>通常不直接实例化此对象，请使用<a href="//cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html#.fromBasemapType" target="_blank">ArcGisMapServerImageryProvider.fromBasemapType</a>或<a href="//cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html#.fromUrl" target="_blank">ArcGisMapServerImageryProvider.fromUrl</a>。
                        </p>
                    </div>
                    <p>提供<a href="//developers.arcgis.com/documentation/mapping-apis-and-services/maps/basemap-layers/" target="_blank">ArcGIS MapServer</a>托管的影像瓦片。默认情况下，如果可用，将使用服务器的预缓存瓦片。
                    </p>
                    <p>访问ArcGIS影像瓦片服务需要一个<a href="//developers.arcgis.com/documentation/mapping-apis-and-services/security/" target="_blank"> ArcGIS Access Token</a>进行身份验证。要访问安全的ArcGIS资源，需要创建一个ArcGIS开发者帐户或ArcGIS在线帐户，通过身份验证后获取<strong>Access Token</strong>。
                    </p>
                    <div class="warn">
                        <p>注意请求配额使用情况。</p>
                    </div>
                    <h4>
                        <a href="//cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html#.fromBasemapType" target="_blank">Cesium.ArcGisMapServerImageryProvider.fromBasemapType(style, options)</a>
                    </h4>
                    <monaco-editor :model-value="codeArcGIS" height="155px" />
                    <h4>
                        <a href="//cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html#.fromUrl" target="_blank">Cesium.ArcGisMapServerImageryProvider.fromUrl(url, options)</a>
                    </h4>
                    <monaco-editor :model-value="codeArcGIS2" height="155px" />
                    <h4><a href="//cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">new Cesium.UrlTemplateImageryProvider(options)</a>
                    </h4>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeArcGIS3" height="115px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeArcGIS4" height="180px" />
                    <p>最后一种方式，在<a href="//maps.arcgis.com/apps/mapviewer/index.html" target="_blank">ArcGIS的地图</a>中找到<strong>
                        <el-tooltip content="底图内容去决于网络环境">底图</el-tooltip>
                    </strong>，选择<span class="code">Imagery</span>，然后在控制台的<strong>Network</strong>中找到URL。这个URL的速度比ArcGIS的安全资源稍慢一些，但不需要<strong>Access Token</strong>，也就不需要关心使用配额问题。
                    </p>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeArcGIS5" height="115px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeArcGIS6" height="180px" />
                    <dl>
                        <dt>参阅：</dt>
                        <dd>
                            <a href="//developers.arcgis.com/documentation/mapping-apis-and-services/maps/services/basemap-layer-service/#how-the-basemap-styles-service-works" target="_blank">How the basemap styles service works</a>
                        </dd>
                    </dl>
                </div>
                <!--  Bing  -->
                <div v-if="currentMapType.value === 'Bing'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="//cesium.com/learn/cesiumjs/ref-doc/BingMapsImageryProvider.html" target="_blank">new Cesium.BingMapsImageryProvider(options)</a></h3>
                    <div class="warn">
                        <p>要构建一个<strong>BingMapsImageryProvider</strong>，调用<a href="//cesium.com/learn/cesiumjs/ref-doc/BingMapsImageryProvider.html#.fromUrl" target="_blank">BingMapsImageryProvider.fromUrl</a>方法。不要直接调用构造函数。
                        </p>
                    </div>
                    <p>使用<a href="//www.bingmapsportal.com/" target="_blank">Bing Maps Imagery REST API</a>提供影像瓦片。</p>
                    <div class="warn">
                        <p>注意请求配额使用情况。</p>
                    </div>
                    <monaco-editor :model-value="codeBing" height="195px" />
                    <dl>
                        <dt>参阅：</dt>
                        <dd>
                            <a href="//learn.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/?redirectedfrom=MSDN" target="_blank">Bing Maps Dev Center Help</a>
                        </dd>
                        <dd><a href="//www.bingmapsportal.com/DataSource/PublicDataSources" target="_blank">Bing Map Public data sources</a></dd>
                    </dl>
                </div>
                <!--  google  -->
                <div v-if="currentMapType.value === 'Google'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3>谷歌地图</h3>
                    <div class="warn">
                        <p>需要绑定信用卡才能"免费"使用╮(╯▽╰)╭所以直接抓数据。</p>
                    </div>
                    <h4><a href="//cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">new Cesium.UrlTemplateImageryProvider(options)</a>
                    </h4>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeGoogle" height="130px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeGoogle2" height="190px" />
                    <dl>
                        <dt>参阅：</dt>
                        <dd><a href="https://developers.google.com/maps?hl=zh-cn" target="_blank">Google Maps Platform</a></dd>
                        <dd><a href="https://developers.google.com/maps/documentation/tile/satellite?hl=zh-cn" target="_blank">卫星瓦片 API</a></dd>
                    </dl>
                </div>
                <!--  天地图  -->
                <div v-if="currentMapType.value === 'Sky'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="//lbs.tianditu.gov.cn/server/MapService.html" target="_blank">天地图</a></h3>
                    <p>天地图地图服务支持HTTP和HTTPS协议，采用<span class="code">OGC WMTS</span>标准，具体使用方法请参考<span class="code">OGC WMTS</span>标准中<span class="code">GetCapabilities</span>和<span class="code">GetTile</span>。瓦片仅支持<span class="code">18</span>级，<span class="code">maximumLevel</span>建议最大值为<span class="code">18</span>。
                    </p>
                    <div class="warn">
                        <p>https://<strong>&lt;subdomains&gt;</strong>.tianditu.gov.cn/<strong>&lt;layer&gt;</strong>_<strong>&lt;matrix&gt;</strong>/wmts?SERVICE=WMTS<span>&</span>REQUEST=GetTile<span>&</span>VERSION=1.0.0<span>&</span>LAYER=<strong>&lt;layer&gt;</strong><span>&</span>STYLE=default<span>&</span>TILEMATRIXSET=<strong>&lt;matrix&gt;</strong><span>&</span>FORMAT=tiles<span>&</span>TILEMATRIX=<strong>&lt;z&gt;</strong><span>&</span>TILEROW=<strong>&lt;y&gt;</strong><span>&</span>TILECOL=<strong>&lt;x&gt;</strong><span>&</span>tk=<strong>&lt;key&gt;</strong>
                        </p>
                    </div>
                    <p>在URL中要注意<span class="code">x y z</span>的位置顺序为<span class="code">z y x</span>，避免出错，同时除了位置信息以外，还包含以下字段：</p>
                    <ul>
                        <li>
                            <strong>subdomains</strong> - 服务二级域名包括<span class="code">t0~t7</span>，可以随机选择其中一个固定到URL中，也可以在<span class="code">option.subdomains</span>配置多个或全部，来扩展并发数量。
                        </li>
                        <li><strong>layer</strong> - 包含影像瓦片，矢量瓦片
                            <el-tooltip content="晕渲法是地图上表示地貌的一种方法，应用阴影原理，以色调的阴暗、冷暖变化表现地形立体起伏的一种方法。也叫“阴影法”。" placement="top-start">地形晕渲</el-tooltip>
                            。
                        </li>
                        <li><strong>matrix</strong> - 有经纬度投影和球面墨卡托投影两种类型。Cesium中默认建议使用<span class="code">球面墨卡托投影</span>。</li>
                    </ul>
                    <p>天地图对所有用户开放。使用务之前需要<a href="https://www.tianditu.gov.cn/" target="_blank">申请KEY</a>。接口调用实行配额管理，如果服务调用需求较高，请尽快<a href="//lbs.tianditu.gov.cn/authorization/authorization.html" target="_blank">升级开发者权限</a>。
                    </p>
                    <div class="warn">
                        <p>注意请求配额使用情况。</p>
                    </div>
                    <div class="example">
                        <el-form label-width="6em">
                            <el-form-item label="地图类型：">
                                <el-radio-group v-model="stateSkyMap.tile" @change="imagerySkyMap">
                                    <el-radio-button v-for="(item, index) in stateSkyMap[ 'tiles' ]" :key="index" :value="item[ 'value' ]">{{ item[ 'label' ] }}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="注记：">
                                <el-radio-group v-model="stateSkyMap.layer" @change="eventChangeSkyLayer">
                                    <el-radio-button v-for="(item, index) in skyMapLayers" :key="index" :value="item[ 'value' ]">{{ item[ 'label' ] }}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="全球境界：">
                                <el-switch v-model="stateSkyMap.frontier" @change="eventChangeSkyFrontier" />
                            </el-form-item>
                        </el-form>
                    </div>
                    <h4>
                        <a href="//cesium.com/learn/cesiumjs/ref-doc/WebMapTileServiceImageryProvider.html" target="_blank">new Cesium.WebMapTileServiceImageryProvider(options)</a>
                    </h4>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeSkyMap" height="395px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeSkyMap2" height="460px" />
                    <h4><a href="//cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">new Cesium.UrlTemplateImageryProvider(options)</a>
                    </h4>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeSkyMap3" height="350px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeSkyMap4" height="410px" />
                </div>
                <!--  腾讯地图  -->
                <div v-if="currentMapType.value === 'QQ'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="https://lbs.qq.com/" target="_blank">腾讯地图</a></h3>
                    <p>腾讯地图服务二级域名包括<span class="code">p0~p3</span>，可以随机选择其中一个固定到URL中，也可以在<span class="code">option.subdomains</span>配置多个或全部，来扩展并发数量。
                    </p>
                    <p>腾讯地图影像瓦片仅支持<span class="code">18</span>级，<span class="code">maximumLevel</span>为<span class="code">18</span></p>
                    <h4><a href="//cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">new Cesium.UrlTemplateImageryProvider(options)</a>
                    </h4>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeQQ" height="305px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeQQ2" height="370px" />
                </div>
                <!--  高德地图  -->
                <div v-if="currentMapType.value === 'GaoDe'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="https://lbs.amap.com/" target="_blank">高德地图</a></h3>
                    <p>高德地图服务二级域名包括<span class="code">webst01~webst04</span>，可以随机选择其中一个固定到URL中，也可以在<span class="code">option.subdomains</span>配置多个或全部，来扩展并发数量。
                    </p>
                    <p>高德地图瓦片仅支持<span class="code">18</span>级，<span class="code">maximumLevel</span>建议最大值为<span class="code">18</span></p>
                    <h4><a href="//cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">new Cesium.UrlTemplateImageryProvider(options)</a>
                    </h4>
                    <div class="example">
                        <el-form label-width="6em">
                            <el-form-item label="地图类型：">
                                <el-radio-group v-model="stateGaoDe.tile" @change="eventChangeGaoDeTile">
                                    <el-radio-button v-for="(item, index) in stateGaoDe[ 'tiles' ]" :key="index" :value="item[ 'value' ]">{{ item[ 'label' ] }}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="注记：">
                                <el-radio-group v-model="stateGaoDe.layer" @change="eventChangeGaoDeLayer">
                                    <el-radio-button v-for="(item, index) in gaoDeLayers" :key="index" :value="item[ 'value' ]">{{ item[ 'label' ] }}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeGaoDe" height="150px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeGaoDe2" height="215px" />
                    <h5>路网</h5>
                    <p>高德路网的配置与影像瓦片相同，仅URL上的参数区别
                        <br> 影像：https://{s}.is.autonavi.com/appmaptile?x={x}<span>&</span>y={y}<span>&</span>z={z}<span>&</span>style=<strong>6</strong>
                        <br> 路网：https://{s}.is.autonavi.com/appmaptile?x={x}<span>&</span>y={y}<span>&</span>z={z}<span>&</span>style=<strong>8</strong><span><span>&</span></span>ltype=11<span>&</span>lang=zh_cn<span>&</span>size=1<span>&</span>scl=1
                    </p>
                </div>
                <!--  百度地图  -->
                <div v-if="currentMapType.value === 'BaiDu'">
                    <div class="date-time"><span>{{ datetime }}</span></div>
                    <h3><a href="https://lbsyun.baidu.com/" target="_blank">百度地图</a></h3>
                    <p>自定义provider加载百度影像瓦片，原方法是<a href="//blog.csdn.net/m0_60387551?type=blog" target="_blank">GIS之家家长</a>的<a href="//blog.csdn.net/m0_60387551/article/details/123812381" target="_blank">cesium接入百度影像地图</a>，使用的Cesium的版本为<span class="code">1.74</span>。
                    </p>
                    <monaco-editor :model-value="codeBaiDu" height="245px" />
                    <h4>new ImageryProviderBaidu(option)</h4>
                    <p>百度地图卫星图<span class="code">maximumLevel</span>仅支持<span class="code">19</span>级，矢量图<span class="code">maximumLevel</span>支持<span class="code">20</span>级。
                    </p>
                    <p>这里对原方法做了一些改造：</p>
                    <ul>
                        <li>增加：<span class="code">subdomains</span>选项，包含<span class="code">maponline0~maponline3</span>。</li>
                        <li>增加：卫星图与矢量图，支持注记。</li>
                        <li>支持：<span class="code">Cesium.ImageryLayer.fromProviderAsync</span>方式添加。</li>
                        <li>支持：路网png图片的。</li>
                        <li>移除：在原方法中<span class="code">Cesium.ImageryProviders.loadImage</span>重写部分。</li>
                    </ul>
                    <div class="example">
                        <el-form label-width="6em">
                            <el-form-item label="地图类型：">
                                <el-radio-group v-model="stateBaidu.tile" @change="imageryBaiDu">
                                    <el-radio-button v-for="(item, index) in stateBaidu[ 'tiles' ]" :key="index" :value="item[ 'value' ]">{{ item[ 'label' ] }}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="注记：">
                                <el-switch v-model="stateBaidu.annotation" @change="imageryBaiDu" />
                            </el-form-item>
                        </el-form>
                    </div>
                    <h5>Provider</h5>
                    <monaco-editor :model-value="codeBaiDu2" height="257px" />
                    <h5>Layer</h5>
                    <monaco-editor :model-value="codeBaiDu3" height="275px" />
                    <dl>
                        <dt>参阅：</dt>
                        <dd><a href="//blog.csdn.net/m0_60387551/article/details/123728083" target="_blank">Cesium加载接入百度地图</a></dd>
                        <dd><a href="//blog.csdn.net/m0_60387551/article/details/124312774" target="_blank">百度地图瓦片数据获取</a></dd>
                        <dd><a href="//blog.csdn.net/m0_60387551/article/details/124337229" target="_blank">百度午夜蓝地图瓦片数据爬取</a></dd>
                        <dd>
                            <a href="//blog.csdn.net/m0_60387551/article/details/124337165" target="_blank">百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换</a>
                        </dd>
                    </dl>
                </div>
            </div>
        </el-scrollbar>
    </div>
    <div v-show="typeChoosing" class="map-types">
        <div v-for="(item, index) in imageryTypeTable" :key="index" class="type-item" @click.stop="setProvider(item)">
            <el-tooltip :content="item[ 'label' ]" placement="left">
                <div class="type-icon"><img :src="`/static/img/example/${ item[ 'value' ] }.png`" alt=""></div>
            </el-tooltip>
        </div>
    </div>
    <div class="panel-toggle">
        <span class="lighting"><el-checkbox v-model="lighting" @change="setLighting">光源</el-checkbox></span>
        <el-icon class="toggle" size="16" @click.stop="eventToggleDescription">
            <component :is="panelView ? 'Fold' : 'Expand'" />
        </el-icon>
    </div>
</div>
</template>

<style lang="scss" scoped>
@use "index";
</style>
