<script setup>
import { ref } from 'vue';
import { VERSION } from 'cesium';


const code01 = ref({
    html: `<script src="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Cesium.js"><\/script>
<link href="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
<script src="https://unpkg.com/@esri/arcgis-rest-request@4.0.0/dist/bundled/request.umd.js"><\/script>
<script src="https://unpkg.com/@esri/arcgis-rest-routing@4.0.0/dist/bundled/routing.umd.js"><\/script>`
});

const code02 = ref({
    js: `Cesium.Ion.defaultAccessToken = 'YOUR_CESIUM_ACCESS_TOKEN';

const viewer = new Cesium.Viewer('cesium-container', {
    timeline: false,
    animation: false,
    globe: false,
});`
});

const code03 = ref({
    js: `  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);
} catch (error) {
    console.log(\`Failed to load tileset: \${ error }\`);
}`
});

const code04 = ref({
    js: `const authentication = arcgisRest.ApiKeyManager.fromKey('YOUR_ARCGIS_API_KEY');

const getServiceArea = async (cartographic) => {
    const coordinates = [
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude),
    ];

    let geojson;
    try {
        const response = await arcgisRest.serviceArea({
            facilities: [coordinates],
            authentication,
        });

        geojson = response.saPolygons.geoJson;
    } catch (error) {
        console.log(\`Failed to load service area: \${error}\`);
    }

    if (!Cesium.defined(geojson)) {
        return;
    }

    let dataSource;
    try {
        dataSource = await Cesium.GeoJsonDataSource.load(geojson, {
            clampToGround: true,
        });
        viewer.dataSources.add(dataSource);
    } catch (error) {
        console.log(\`Failed to load geojson: \${error}\`);
    }

    if (!Cesium.defined(dataSource)) {
        return;
    }
};`
});

const code05 = ref({
    js: `viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-122.38329, 37.74015, 16000),
    orientation: {
        pitch: Cesium.Math.toRadians(-70.0),
    },
});

const cartesian = Cesium.Cartesian3.fromDegrees(-122.39429, 37.78988);
getServiceArea(Cesium.Cartographic.fromCartesian(cartesian));`
});

const code06 = ref({
    js: `const entities = dataSource.entities.values;

for (let i = 0; i < entities.length; i++) {
    const feature = entities[i];
    feature.polygon.outline = false;

    if (feature.properties.FromBreak == 0) {
        feature.polygon.material = Cesium.Color.fromHsl(
            0.5833,
            0.8,
            0.9,
            0.5
        );
    } else if (feature.properties.FromBreak == 5) {
        feature.polygon.material = Cesium.Color.fromHsl(
            0.5833,
            0.9,
            0.7,
            0.5
        );
    } else {
        feature.polygon.material = Cesium.Color.fromHsl(
            0.5833,
            1.0,
            0.4,
            0.5
        );
    }
}`
});

const code07 = ref({
    js: `const scene = viewer.scene;
scene.invertClassification = true;
scene.invertClassificationColor = new Cesium.Color(0.4, 0.4, 0.4, 1.0);`
});

const code08 = ref({
    js: `const marker = viewer.entities.add({
    name: 'start',
    billboard: {
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        image: "./marker.svg",
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        scale: 0.5,
    },
});

marker.position = cartesian;`
});

const code09 = ref({
    js: `viewer.screenSpaceEventHandler.setInputAction((movement) => {
    viewer.dataSources.removeAll();
    viewer.scene.invertClassification = false;
    marker.show = false;

    const pickedPosition = viewer.scene.pickPosition(movement.position);

    if (!Cesium.defined(pickedPosition)) {
        return;
    }

    marker.position = pickedPosition;
    marker.show = true;
    viewer.scene.invertClassification = true;

    const cartographic = Cesium.Cartographic.fromCartesian(pickedPosition);
    getServiceArea(cartographic);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);`
});


</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>在CesiumJS中使用来自Google Maps平台和Esri ArcGIS位置服务的实境3D瓦片来可视化旅行时间。<span>Visualize Travel Time in CesiumJS with Photorealistic 3D Tiles from Google Maps Platform and Esri ArcGIS Location Services</span></h1>
        <p>通过结合Esri的ArcGIS位置服务的地理空间分析能力、CesiumJS的交互功能，以及Google Maps Platform的实境3D瓦片技术，开发者可以轻松快速地创建具有沉浸式环境的强大3D地理空间可视化效果。</p>
        <p>在这个教程中，我们将构建一个Cesium应用程序，突出显示从选定位置通过五分钟、十分钟和十五分钟车程可以到达的区域。将学习如何：</p>
        <ul>
            <li>在CesiumJS中流式传输实境3D瓦片。</li>
            <li>通过REST API查询ArcGIS位置服务进行地理空间分析。</li>
            <li>使用多边形对3D瓦片进行分类并添加样式设置。</li>
            <li>添加拾取功能来实现交互性。</li>
        </ul>
        <p><img src="/static/img/tutorial/photorealistic-3d-tiling/f5d4baea-6ccf-4f4d-8548-29235aea21f5_00_Travel_Time_San_Francisco.png" alt=""><em>在美国加利福尼亚州旧金山，通过ArcGIS位置服务查询的出行时间，并在CesiumJS中使用实境3D瓦片进行可视化。</em></p>
        <h2>步骤 1：加载实境3D瓦片作为全球基础图层<span>Step 1: Load Photorealistic 3D Tiles as a global base layer</span></h2>
        <p>谷歌提供了一个覆盖范围广泛的全球数据集，包含高分辨率的影像，涵盖了众多国家和成千上万的城市。谷歌地图平台的地图瓦片API提供了3D Tiles流服务，这是一种用于流式传输三维地理空间数据的开放标准，它允许开发者轻松地将谷歌庞大的数据集集成到CesiumJS应用中，为用户提供必要的背景和真实感，使我们的出行时间数据栩栩如生。</p>
        <p>首先，我们将使用<router-link :to="{ name: 'Quickstart' }" target="_blank">CesiumJS快速入门</router-link>作为我们的基础。将以下脚本标签添加到HTML文档中，以加载CesiumJS和ArcGIS REST API库。</p>
        <monaco-editor v-model="code01" height="120px" />
        <p>在设置了我们的Cesium ion访问Token之后，创建一个简单的Cesium视图器。为此，请将以下JavaScript代码添加到一个脚本标签中，并将<span class="code">YOUR_CESIUM_ACCESS_TOKEN</span>替换为自己的Cesium ion访问Token。</p>
        <monaco-editor v-model="code02" height="165px" />
        <p>现在，使用Google Maps平台地图瓦片API作为3D瓦片集，添加一个全局基础图层：</p>
        <monaco-editor v-model="code03" height="150px" />
        <p><img src="/static/img/tutorial/photorealistic-3d-tiling/56015908-7b08-4858-8a95-e04e2b10b6bf_Google_Tiles_Globe.png" alt=""></p>
        <div class="note">
            <p>如需更详细的教程，请参阅<router-link :to="{ name: 'Photorealistic-3D-Tiles-In-CesiumJS' }" target="_blank">CesiumJS中使用Google Maps平台实境3D瓦片</router-link>。</p>
        </div>
        <h2>步骤 2：查询ArcGIS位置服务以获取表示出行时间的GeoJSON数据<span>Step 2: Query ArcGIS location services for GeoJSON representing travel time</span></h2>
        <p>根据<a href="https://developers.arcgis.com/cesiumjs/route-and-directions/find-service-areas/" target="_blank">ArcGIS开发者文档</a>，服务区域或等时线代表通过驾车或步行在街道网络上可以到达的地理范围。服务区域的形状和大小由时间或距离限制确定。计算服务区域的能力对于各种应用非常宝贵。它有助于优化路径、评估可达性、进行人口统计分析，并在物流、交通规划和应急响应等领域促进决策制定。</p>
        <p>为了计算和检索服务区域，我们将通过REST API使用ArcGIS位置服务。我们将查询服务区域的GeoJSON数据，其中包含代表从指定位置内15分钟可达范围的多边形，并在CesiumJS中将结果进行可视化。</p>
        <p>创建了一个<a href="https://developers.arcgis.com/cesiumjs/authentication/create-an-api-key/" target="_blank">ArcGIS位置服务API密钥</a>之后，让我们创建一个名为<span class="code">getServiceArea</span>的新函数。在下面的示例中，将<span class="code">YOUR_ARCGIS_API_KEY</span>替换为自己的ArcGIS API密钥。</p>
        <monaco-editor v-model="code04" height="665px" />
        <p>然后，在旧金山的一个位置调用该函数。</p>
        <monaco-editor v-model="code05" height="200px" />
        <p>应该会看到以下结果：</p>
        <p><img src="/static/img/tutorial/photorealistic-3d-tiling/8339ce88-2c88-4779-bec3-96cb87dcdbd5_GeoJSON_Serive_Area.png" alt=""></p>
        <h2>步骤 3：对结果进行样式设置<span>Step 3: Style the results</span></h2>
        <p>为了使这些结果更有用和视觉上更吸引人，我们将使用CesiumJS应用样式技术，以便一目了然地提供有价值的洞察。</p>
        <p>GeoJSON数据中有三个多边形，分别代表通过五分钟、十分钟和十五分钟车程可达的区域。根据每个多边形关联的旅行时间元数据，我们将分配不同深浅的蓝色来代表不同的时间间隔。这种颜色渐变使用户能够快速识别出旅行时间较短或较长的区域。</p>
        <p>在我们的<span class="code">getServiceArea</span>函数中，添加以下代码块来根据<span class="code">FromBreak</span>属性设置多边形的颜色：</p>
        <monaco-editor v-model="code06" height="525px" />
        <p><img src="/static/img/tutorial/photorealistic-3d-tiling/51658358-e386-48fe-8ee8-df9b339bd0cc_Styled_GeoJSON.png" alt=""></p>
        <p>接下来，我们将使用反向分类来调暗服务区域之外的区域。这种调暗效果有助于用户专注于相关信息。</p>
        <p>在我们的<span class="code">getServiceArea</span>函数的结尾处，添加以下几行代码：</p>
        <monaco-editor v-model="code07" />
        <p><img src="/static/img/tutorial/photorealistic-3d-tiling/c938f06e-e789-4951-a9c2-2138b351f644_Inverse_Classification.png" alt=""></p>
        <p>最后，让我们标记一下输入使用的位置。我使用了一个名为<span class="code">marker.svg</span>的<a href="https://labs.mapbox.com/maki-icons/" target="_blank">maki图标</a>，但可以使用其它任何图片</p>
        <p>创建一个广告牌（billboard），然后将位置设置为第2步中使用的位置。</p>
        <monaco-editor v-model="code08" height="250px" />
        <p><img src="/static/img/tutorial/photorealistic-3d-tiling/2afdc7a0-a083-4456-adb0-5b9daaa3c6ba_Marker_Position.png" alt=""></p>
        <h2>步骤 4：使用拾取功能添加交互性<span>Step 4: Use picking to add interactivity</span></h2>
        <p>最后，让我们通过允许用户选择用作空间查询输入的位置来为我们的应用程序增加实用性。可以使用<span class="code">Scene.pickPosition</span>在按下鼠标时获取光标下的位置，然后我们可以将该结果作为输入传递给我们在前面步骤中编写的<span class="code">getServiceArea</span>函数。</p>
        <monaco-editor v-model="code09" height="350px" />
        <p>完成了！这个应用程序可以在地球上的任何地方使用，所以请确保使用地理编码器来搜索您特定的区域。</p>
        <p><img src="/static/img/tutorial/photorealistic-3d-tiling/91e4ea3a-0983-4cae-b725-6d7e98a2aa6f_Travel_Time_Cesium_HQ.png" alt=""><em>从美国宾夕法尼亚州费城的Cesium总部出发的旅行时间。</em></p>
        <h2>下一步<span>Next steps</span></h2>
        <p>这里提供的示例只是众多可能用例中的其中之一。ArcGIS位置服务提供了广泛的附加数据层、地图和空间分析功能。结合Google Maps平台的全球范围内的逼真三维瓦片，现在可以通过Cesium的所有运行时引擎进行访问，为地理空间领域内的轻松协作和创新创造了前所未有的潜力。</p>
        <p>请在开发者文档中了解更多信息：</p>
        <ul>
            <li><a href="https://developers.arcgis.com/cesiumjs/" target="_blank">ArcGIS开发人员CesiumJS文档</a></li>
            <li><a href="https://developers.google.com/maps/documentation/tile/3d-tiles-overview" target="_blank">Google Maps平台实境3D瓦片概述</a></li>
        </ul>
        <p>最后，我们鼓励您探索这些技术的全部潜力。您可以在社区论坛上与更广泛的社区分享您的创作和经验。我们迫不及待地想看到您的成就！</p>
        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/cesiumjs-learn/travel-time-cesiumjs-photorealistic-3d-tiles-arcgis/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>