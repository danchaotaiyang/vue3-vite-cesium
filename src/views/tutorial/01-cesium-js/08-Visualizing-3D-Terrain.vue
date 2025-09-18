<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const code01 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    terrain: Cesium.Terrain.fromWorldTerrain()
});`,
    html
});

const code02 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    terrain: Cesium.Terrain.fromWorldTerrain({
        requestVertexNormals: true
    })
});

// 球体上启用灯光
viewer.scene.global.enableLighting = true`,
    html
});

const code03 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    terrain: Cesium.Terrain.fromWorldTerrain({
        requestWaterMask: true
    })
});`,
    html
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>可视化3D地形<span>Visualizing 3D Terrain</span></h1>
        <p>CesiumJS支持实时流式传输和可视化全球高分辨率地形和水体效果，包括海洋、湖泊和河流。可以查看山峰、山谷和其他地形特征，并且可以体验3D地球。可以使用<a href="https://ion.cesium.com/" target="_blank">Cesium ion</a>来流传输自己的瓦片地形数据或高分辨率的固定地形数据，例如<a href="https://cesium.com/platform/cesium-ion/content/cesium-world-terrain/" target="_blank">Cesium World Terrain</a>。</p>
        <div class="note">
            <p>拥有自己的地形数据？请参阅<router-link :to="{ name: '3D-Tiling-Ion-Terrain' }" target="_blank">从高程图创建3D地形</router-link>"教程。</p>
        </div>
        <h2>快速入门<span>Quickstart</span></h2>
        <p>在Sandcastle中打开<a href="https://sandcastle.cesium.com/?src=Hello%20World.html" target="_blank">Hello World</a>示例。默认情况下，地球是<a href="http://earth-info.nga.mil/GandG/publications/tr8350.2/wgs84fin.pdf" target="_blank">WGS84椭球体</a>。通过将<span class="code">terrainProvider</span>选项传递给<span class="code">Viewer</span>来指定不同的地形提供程序。让我们使用Cesium World Terrain：</p>
        <cesium-example v-model="code01" height="150px" />
        <div class="note">
            <p><strong>创建一个Cesium ion账户</strong></p>
            <p>本教程使用来自Cesium ion的地形数据。请<a href="https://ion.cesium.com/signup/" target="_blank">创建一个账户</a>以获取访问Token，以便在本教程中使用地形数据。在此处注册，并且上述示例代码将自动更新Token。如果已经有一个帐户，<a href="https://ion.cesium.com/" target="_blank">请登录</a>。</p>
        </div>
        <p>在修改示例后，按F8以运行它。缩放到一个多山的地区，并按住中间鼠标按钮并拖动来倾斜到地平线视图。这是珠穆朗玛峰的样子：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-terrain-everest.png"></p>
        <p>当我们缩放更近时，CesiumJS根据可见的地球部分和其与观察者之间的距离请求更高分辨率的地形数据。</p>
        <p>地形和影像是分别处理的，任何影像提供程序都可以与任何地形提供程序一起使用。请参阅<router-link :to="{ name: 'Visualizing-Imagery' }" target="_blank">可视化影像</router-link>教程了解如何管理影像。</p>
        <h2>启用地形照明和水体效果<span>Enabling terrain lighting and water effects</span></h2>
        <p>Cesium World Terrain还包括地形照明和用于水体效果的海岸线数据。默认情况下，此数据不会随着地形切片一起发送。要启用地形照明，需要在请求地形数据时设置<span class="code">requestVertexNormals</span>，并在球体上启用灯光。</p>
        <cesium-example v-model="code02" height="210px" />
        <p>这是基于太阳位置的地形照明下的珠穆朗玛峰相同视图。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-terrain-everest_lighting.png"></p>
        <p>启用水体效果也是类似的，需要使用<span class="code">requestWaterMask</span>选项：</p>
         <cesium-example v-model="code03" height="190px" />
        <p>缩放到一个有水体的区域以查看效果。这里是旧金山湾的景象：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-terrain-sanfranciscobay.png"></p>
        <p>波浪会随时间推移进行动画，并且明亮的镜面高光显示了阳光和月亮的反射。可以通过更改用于创建波浪的法线贴图（<a href="https://cesium.com/learn/cesiumjs/ref-doc/Globe.html" target="_blank">Globe.oceanNormalMapUrl</a>）来自定义水效果。更改影像提供程序也会影响水的外观，因为水色与底层影像进行混合。</p>
        <p>请在Sandcastle中查看<a href="https://sandcastle.cesium.com/?src=Terrain.html" target="_blank">地形示例</a>，探索一些具有有趣地形和水体的选择区域。</p>
        <h2>流式传输的地形数据<span>Ready-to-stream terrain</span></h2>
        <p><a href="https://cesium.com/platform/cesium-ion/content/cesium-world-terrain/" target="_blank">Cesium World Terrain</a>是高分辨率的全球地形数据，支持地形照明和水体效果。它可以通过Cesium ion进行托管，也可以购买用于离线使用。在CesiumJS应用程序中添加它，可以实现快速高效的地形可视化。Cesium World Terrain也可以在本地部署后使用。</p>
        <h2>地形提供商<span>Terrain providers</span></h2>
        <p>Cesium支持多种使用地形提供商请求地形数据的方法。大多数地形提供商使用基于HTTP的<a href="http://rest.elkstein.org/" target="_blank">REST接口</a>来请求地形瓦片。不同的地形提供商根据请求格式和地形数据组织方式而有所不同。 CesiumJS支持以下几个地形提供商：</p>
        <ul>
            <li><span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/CesiumTerrainProvider.html" target="_blank">CesiumTerrainProvider</a></span>：支持<a href="https://github.com/CesiumGS/quantized-mesh" target="_blank">quantized-mesh</a>地形瓦片，专为地形流媒体优化。与由Cesium ion提供或从[3D tiling pipeline]（/ 3d-tiling-pipeline / terrain /）输出的地形兼容。</li>
            <li><span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/GoogleEarthEnterpriseTerrainProvider.html" target="_blank">GoogleEarthEnterpriseTerrainProvider</a></span>：支持由<a href="https://github.com/google/earthenterprise" target="_blank">Google Earth Enterprise</a>服务器生成的高程图地形。</li>
            <li><span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/VRTheWorldTerrainProvider.html" target="_blank">VRTheWorldTerrainProvider</a></span>：支持从<a href="https://www.mak.com/mak-one/tools/vr-theworld-server" target="_blank">VT MAK VR-TheWorld Server</a>请求的高度图地形瓦片。</li>
            <li><span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/EllipsoidTerrainProvider.html" target="_blank">EllipsoidTerrainProvider</a></span>：以程序方式创建椭球体表面。虽然缺乏真实的地形外观，但不需要向服务器请求数据。</li>
        </ul>
        <p>地形提供商的构建方式类似于影像提供商，通常包括地形服务器的URL和一个可选的代理（如果服务器不支持<a href="https://enable-cors.org/" target="_blank">跨源资源共享</a>(CORS)）。</p>
        <h2>资源<span>Resources</span></h2>
        <p>请在Sandcastle中查看<a href="https://sandcastle.cesium.com/?src=Terrain.html" target="_blank">地形示例</a>和所有<a href="https://cesium.com/learn/cesiumjs/ref-doc/?classFilter=TerrainProvider" target="_blank">地形提供商</a>的参考文档。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-terrain/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
   </div>
</div>
</template>
