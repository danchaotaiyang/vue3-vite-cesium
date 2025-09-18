<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const code01 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    globe: false
});`
});

const code02 = ref({
    js: `try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);
} catch (e) {
    console.warn(\`加载瓦片失败: \${ e }\`);
}`
});

const code03 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    globe: false
});

try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);
} catch (e) {
    console.warn(\`加载瓦片失败: \${ e }\`);
}`,
    html
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>CesiumJS中使用Google Maps平台实境3D瓦片<span>Photorealistic 3D Tiles from Google Maps Platform in CesiumJS</span></h1>
        <p>这是一个将照片级真实感3D瓦片内容加载到CesiumJS的快速入门指南。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/a7f3d3d9-78b4-4413-833b-fe3d88d6a1dc_cesium-js_denver_attribution.png"><em>使用CesiumJS中的照片级真实感3D瓦片来展示美国科罗拉多州丹佛市。</em></p>
        <p>将学习如何：</p>
        <ul>
            <li>使用Google Maps平台地图瓦片API和3D瓦片添加一个照片级真实感的全局基础图层。</li>
            <li>使用地理编码器定位感兴趣的区域。</li>
        </ul>
        <h2>前提条件<span>Prerequisites</span></h2>
        <ul>
            <li>一个基本的CesiumJS应用程序。请参阅<router-link :to="{ name: 'Quickstart' }" target="_blank">CesiumJS快速入门教程</router-link>以启动并运行CesiumJS应用程序。为了获得最佳效果，请确保应用程序目标是<strong>CesiumJS 1.110</strong>或更高版本。</li>
            <li>一个具有地理编码权限的<a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/#step-1-create-an-account-and-get-a-token" target="_blank">Cesium ion 账户和Token</a>。</li>
        </ul>
        <h2>步骤 1：加载真实3D瓦片<span>Step 1: Load Photorealistic 3D Tiles</span></h2>
        <ol>
            <li><p>在<a href="https://sandcastle.cesium.com/" target="_blank">Sandcastle 中打开 Hello World 示例</a>，或者基于<router-link :to="{ name: 'Quickstart' }" target="_blank">CesiumJS快速入门教程</router-link>开始一个基于CesiumJS的应用程序。</p></li>
            <li><p>将<span class="code">Cesium.Ion.defaultAccessToken</span>设置为 Cesium ion 访问Token。在下面的代码片段中，用 Cesium ion 访问Token替换 YOUR_ACCESS_TOKEN。<br><span class="code">Cesium.Ion.defaultAccessToken = "&lt;YOUR_ACCESS_TOKEN&gt;";</span></p></li>
            <li>
                <p>创建一个<span class="code">Cesium Viewer</span>。由于<span class="code">Google Maps API</span>提供了覆盖全球范围的瓦片，因此通过向 Viewer 提供<span class="code">globe: false</span>选项来关闭默认的地形和影像图层。</p>
                <monaco-editor v-model="code01" />
            </li>
            <li>
                <p>使用 Google Maps API 创建一个 3D瓦片集。</p>
                <p>让我们在场景中添加一个全局的真实3D瓦片图层。在 CesiumJS 中，真实3D瓦片可以作为<span class="code">Cesium3DTileset</span>进行流式传输。</p>
                <monaco-editor v-model="code02" height="180px" />
            </li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/cesium-js/4f465237-c57f-4764-8078-a2a0e063a8c4_01_Google_Tiles_Globe.png"></p>
        <p><a href="https://sandcastle.cesium.com/?src=Google%20Photorealistic%203D%20Tiles.html" target="_blank">完整的Sandcastle示例</a></p>
        <cesium-example v-model="code03" height="240px" />
        <h2>步骤 2：使用地理编码器来定位关注的区域<span>Step 2: Use the geocoder to locate areas of interest</span></h2>
        <ol>
            <li>
                <p>点击右上角的放大镜图标打开地理编码器。</p>
            </li>
            <li>
                <p>在搜索栏中输入感兴趣的区域名称，例如“Philadelphia, PA”，然后按下回车键。Cesium Viewer 将会缩放到该位置。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-js/cd7d255f-039f-42cf-8e36-1f7604cbf087_03_Google_Tiles_Geocoder_Search.png"></p>
            </li>
            <li>
                <p>使用鼠标和键盘进行缩放、平移和倾斜，以全方位探索完整的 3D 场景。右键点击并拖动进行缩放。左键点击并拖动进行平移。通过按住 CTRL 键并拖动来倾斜相机。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-js/04_Google_Tiles_Philadelphia.png"></p>
            </li>
        </ol>
        <h2>下一步<span>Next steps</span></h2>
        <p>尝试通过来从 Cesium ion <a href="https://sandcastle.cesium.com/?src=3D%20Models.html" target="_blank">添加3D模型</a>或<router-link :to="{ name: 'Flight-Tracker' }" target="_blank">构建飞行追踪器</router-link>来扩展此应用程序。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/439d3ffd-884b-471f-8f7b-c84d6e42bebc_cesium-js_cal_coast_attribution.png"><em>在美国加利福尼亚北部的海岸线上，使用 CesiumJS 中的真实3D瓦片。</em></p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-photorealistic-3d-tiles/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
