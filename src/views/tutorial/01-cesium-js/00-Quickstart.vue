<script setup>
import { ref }     from 'vue';
import { VERSION } from 'cesium';

const affix = ref();

const code01 = ref({
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title></title>
<!-- 引入 CesiumJS 的 JavaScript 和 CSS 文件 -->
<script src="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Cesium.js"><\/script>
<link href="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
</head>
<body>
<div id="cesium-container"></div>
<script type="module">
// 访问Token可以在以下网址找到：https://ion.cesium.com/tokens
// 这是 ion 账户的默认的访问Token

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDExMzYxOS01MjkwLTQwNTItYmRlNS0xYTdkOTFmMzI2ZGIiLCJpZCI6MTIwNzIxLCJpYXQiOjE2NzMyNDU5Nzl9.w6KLKikDPU6InwqCbqmxeA0AE8h8WP2lfk5cQgXHG00';

// 在 #cesium-container 中初始化 Cesium 视图器
const viewer = new Cesium.Viewer('cesium-container', {
    terrain: Cesium.Terrain.fromWorldTerrain()
});

// 将相机飞行到给定经度、纬度和高度
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch  : Cesium.Math.toRadians(-15.0)
    }
});

// 添加 Cesium OSM Buildings 全球 3D 建筑层
const buildingTileset = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);
<\/script>
</div>
</body>
</html>`
});

const code02 = ref({
    js: `// 服务器上托管CesiumJS静态文件的目录URL
window.CESIUM_BASE_URL = '/';

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

// 访问Token可以在以下网址找到：https://ion.cesium.com/tokens
// 这是 ion 账户的默认的访问Token

defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDExMzYxOS01MjkwLTQwNTItYmRlNS0xYTdkOTFmMzI2ZGIiLCJpZCI6MTIwNzIxLCJpYXQiOjE2NzMyNDU5Nzl9.w6KLKikDPU6InwqCbqmxeA0AE8h8WP2lfk5cQgXHG00';

// 在 #cesium-container 中初始化 Cesium 视图器
const viewer = new Viewer('cesium-container', {
    terrain: Terrain.fromWorldTerrain(),
});

// 将相机飞行到给定经度、纬度和高度
viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-15.0),
    }
});

// 添加 Cesium OSM Buildings 全球 3D 建筑层
const buildingTileset = await createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);`
});

const code03 = ref({
    js: `window.CESIUM_BASE_URL = '/static/Cesium/';`
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>CesiumJS快速入门<span>CesiumJS Quickstart</span></h1>
        <p>这是一个使用真实世界数据在 Cesium 中构建 3D 应用程序的快速入门指南。将学习如何在网页上设置一个类似这样的 Cesium 应用程序：</p>
        <h2>步骤 1：创建帐户并获取Token<span>Step 1: Create an account and get a token</span></h2>
        <p><strong>Cesium ion 是一个用于流式传输和托管3D内容的开放平台。</strong></p>
        <p><a href="https://ion.cesium.com/signup" target="_blank">注册</a>一个免费的 Cesium ion 账户，以获取全球卫星影像和真实世界的3D内容，用于应用程序。</p>
        <p>登录后：</p>
        <ol>
            <li>前往<a href="https://ion.cesium.com/tokens?" target="_blank">Access Tokens</a>选项卡。</li>
            <li>请注意默认Token旁边的复制按钮。我们将在下一步中使用该Token。</li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/cesium-js/1fcdabeb-87c6-4715-9c10-ec7488f8df7f_token.jpeg"></p>
        <h2>步骤 2：设置 CesiumJS 客户端<span>Step 1: Set up the CesiumJS client</span></h2>
        <p><strong>CesiumJS 是一个开源的 JavaScript 引擎。我们将使用它来可视化从 Cesium ion 加载的内容。</strong></p>
        <p>本指南涵盖了两种设置 CesiumJS 的方法：</p>
        <ul>
            <li>从 CDN 导入</li>
            <li>使用 NPM 安装</li>
        </ul>
        <h3>从 CDN 导入<span>Import from CDN</span></h3>
        <p>以下是一个完整的 HTML 页面，它会加载所需的 JavaScript 和 CSS 文件，并在旧金山初始化场景。如果没有开发环境，可以创建一个包含此 HTML 的文件，并在浏览器中查看它。</p>
        <p>为了方便起见，我们在下面的代码片段中包含了账户的默认的访问Token。</p>
        <monaco-editor v-model="code01" height="660px" />
        <p><a class="btn-sandcastle" href="https://sandcastle.cesium.com/#c=dVNdbxoxEPwrK15ykYgPQtJILUFNQVEjBSEV1L7cQ4y93Fn1rZG9B6JV/nt9X2lF23u583h2djzrS1N4IsNGWvMDgQuEOQZTlfDV4BE9GGrAz5vlM6DFEonhaLho0BfVcOeOWBpC/wJPC5GRchQYDq3APRAeO1HRiiYXZ3UXQ/iZEQCj9xF439M37VrsvCu/OW91BySXw4xeLz9AfDLKKE3h0Z4aS0qW6CWwg7UkePSSlAnKgeRmOzcHJLCOcsOVxiFYyd2XJA0FmrzgeITWvGjVxM6eNi5pLGoMbCgWOYI3n3PpOX5JmjRWF5h7xJBcja+vxc347nYIkzvx7ja+b0aj2juA8yZG2es00hDbS20o/y28lFwIdl8iLCkkI9FVA+wNq+K/xKvxbU99bZLqUnrQup/var2ET5WxdcMQTw+5dVtpYbKAbQ/HdE4xhX6iPb4xFgNyHK08SsO9B+VRMq5C+Sb7EE6kkrp7l2dQSCj23pTxyh0wCKl1cibbjHUwHEwDnyzO2uMCfDTl3nmGyttEiJSx3MfZYUi3lfqOLFQIdaOaOk3/LJ1qcwCj77PB2a3LBqCsDCHu7Cpr1/EHyAazaRr5f5Va10xmdUAfM6lpxXj23IJCiGkal/+uZOfsVvoz5V8" target="_blank">在Sandcastle中打开</a></p>
        <div class="note">
            <p>由于Sandcastle不需要Token进行身份验证，并且它会自动创建高级别的HTML标记，因此Sandcastle中的代码略有不同。</p>
        </div>
        <h3>使用 NPM 安装<span>Install with NPM</span></h3>
        <p>如果正在使用像 Webpack、Parcel 或 Rollup 这样的模块打包工具构建应用程序，可以通过运行以下命令来安装 CesiumJS：</p>
        <p>npm install cesium</p>
        <p>以下代码加载所需的 JavaScript 和 CSS 文件。</p>
        <p>为了方便起见，我们在下面的代码片段中包含了账户的默认的访问Token。</p>
        <monaco-editor v-model="code02" height="500px" />
        <h4>配置CESIUM_BASE_URL<span>Configuring CESIUM_BASE_URL</span></h4>
        <p>CesiumJS需要一些静态文件托管在服务器上，例如Web Workers和SVG图标。请配置模块打包工具，将以下四个目录复制并作为静态文件进行服务：</p>
        <ul>
            <li><span class="code">node_modules/cesium/Build/Cesium/Workers</span></li>
            <li><span class="code">node_modules/cesium/Build/Cesium/ThirdParty</span></li>
            <li><span class="code">node_modules/cesium/Build/Cesium/Assets</span></li>
            <li><span class="code">node_modules/cesium/Build/Cesium/Widgets</span></li>
        </ul>
        <p>在导入CesiumJS之前，必须设置<span class="code">window.CESIUM_BASE_URL</span>全局变量。它必须指向托管这四个目录URL。</p>
        <p>例如，如果位于<span class="code">Assets/Images/cesium_credit.png</span>的图像在<span class="code">http://localhost:8080/static/Cesium/Assets/Images/cesium_credit.png</span>下，以<span class="code">static/Cesium/</span>前缀进行服务，则应设置基本URL如下：</p>
        <monaco-editor v-model="code03" />
        <p>请参考<a href="https://github.com/CesiumGS/cesium-webpack-example#cesium-webpack-example" target="_blank">Cesium Webpack示例</a>，了解完整的Webpack配置。</p>
        <h2>下一步<span>Next steps</span></h2>
        <p>现在已经设置好了Cesium应用程序，有整个世界等待被探索！看看通过这些教程可以构建什么吧：</p>
        <p><router-link :to="{ name: 'Flight-Tracker' }" target="_blank">构建一个飞行跟踪器</router-link>：使用FlightRadar24收集的雷达数据，将从旧金山到哥本哈根的真实航班可视化。</p>
        <p><router-link :to="{ name: 'Proposed-Building' }" target="_blank">可视化一个拟建建筑物</router-link>：用自己的3D模型替换真实城市中的建筑物，看看它如何改变景观。</p>
    </div>
</div>
<el-affix position="bottom">
    <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/" target="_blank">原文</a></div>
</el-affix>
</template>
