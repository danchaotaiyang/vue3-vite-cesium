<!--suppress JSUnresolvedLibraryURL, HtmlUnknownTarget, HtmlRequiredTitleElement, JSUnresolvedReference -->
<script setup>
import { ref }     from 'vue';
import { VERSION } from 'cesium';


const html = '<div id="cesium-container"></div>';

const code01 = ref({
    html: `<script src="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Cesium.js"><\/script>
<link href="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Widgets/widgets.css" rel="stylesheet" \/>`
});

const code02 = ref(`<div id="cesium-container"><\/div>`);

const code03 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');`
});

const codeStep02 = ref({
    js: `// 注意：要保留 Cesium.Ion.defaultAccessToken = '访问Token'
// 步骤 2 代码
// 使用 Cesium World Terrain 初始化视图
const viewer = new Cesium.Viewer('cesium-container', {
    infoBox: false,
    terrain: Cesium.Terrain.fromWorldTerrain()
});

// 将相机按给定的经度、纬度和高度，飞行到丹佛（科罗拉多州）的位置。
viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
});

// 添加 Cesium OSM Buildings。
const buildingsTileSet = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingsTileSet);`,
    html
});

const code04 = ref(`<!DOCTYPE html>
<html lang="en">
<head>
${ code01.value.html }
<link href="style.css" rel="stylesheet">
</head>
<body>
<div id="cesium-container"></div>
<script type="module">
// 访问Token可以在以下位置找到: https://ion.cesium.com/tokens.
// 用 Cesium ion 访问Token替换 '访问Token'。
Cesium.Ion.defaultAccessToken = '访问Token';

${ codeStep02.value.js }

/*  TODO
─────────────────────────────────────────────────────────────────────────────────────────*/

<\/script>
</body>
</html>`);

const codeStep03 = ref({
    js: `// 步骤 3 代码
const addBuildingGeoJSON = async () => {
    // 从 Cesium ion 加载 GeoJSON 文件.
    const __geo__json__url__ = await Cesium.IonResource.fromAssetId('资产ID');
    // 根据 GeoJSON 创建几何体，并将其贴附到地面。
    const geoJSON = await Cesium.GeoJsonDataSource.load(__geo__json__url__, { clampToGround: true });
    // 将其添加到场景中。
    const dataSource = await viewer.dataSources.add(geoJSON);
    // 默认情况下，CesiumJS 中的多边形将覆盖场景中的所有三维内容。
    // 修改多边形，使其只应用于地形，而不是三维建筑物。
    for (const entity of dataSource.entities.values) {
        entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
    }
    // 移动相机，使多边形可见。
    viewer.flyTo(dataSource);
};
addBuildingGeoJSON();`
});

const code05 = ref({
    js: `${ codeStep02.value.js }

// 步骤 3 代码
const addBuildingGeoJSON = async () => {
    // 从 Cesium ion 加载 GeoJSON 文件.
    const __geo__json__url__ = await Cesium.IonResource.fromAssetId(1683409);
    // 根据 GeoJSON 创建几何体，并将其贴附到地面。
    const geoJSON = await Cesium.GeoJsonDataSource.load(__geo__json__url__, { clampToGround: true });
    // 将其添加到场景中。
    const dataSource = await viewer.dataSources.add(geoJSON);
    // 默认情况下，CesiumJS 中的多边形将覆盖场景中的所有三维内容。
    // 修改多边形，使其只应用于地形，而不是三维建筑物。
    for (const entity of dataSource.entities.values) {
        entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
    }
    // 移动相机，使多边形可见。
    viewer.flyTo(dataSource);
};
addBuildingGeoJSON();`,
    html
});

const codeStep04 = ref({
    js: `// 步骤 4 代码
// 使用3D瓦片样式语言隐藏这个区域内的个别建筑物。
buildingsTileSet.style = new Cesium.Cesium3DTileStyle({
    // 创建一个样式规则来控制每个建筑物的 "show" 属性。
    show: {
        conditions: [
            // 任何具有此 elementId 的建筑物都将设置 show = false。
            [ '\${elementId} === 332469316', false ],
            [ '\${elementId} === 332469317', false ],
            [ '\${elementId} === 235368665', false ],
            [ '\${elementId} === 530288180', false ],
            [ '\${elementId} === 530288179', false ],
            [ '\${elementId} === 532245203', false ],
            // 如果一个建筑物没有这些 elementId 中的任何一个，将其设置为 show = true。
            [true, true]
        ]
    },
    // 设置这个特定的 3D瓦片集 的默认颜色样式。
    // 对于具有 cesium#color 属性的任何建筑物，使用该颜色，否则将其设置为白色。
    color: 'Boolean(\${feature[ "cesium#color" ]}) ? color(\${feature[ "cesium#color" ]}) : color("#ffffff")'
});`
});

const code06 = ref({
    js: `${ code05.value.js }

${ codeStep04.value.js }`,
    html
});

const codeStep06 = ref({
    js: `// 步骤 6 代码
// 将从 Cesium ion 账户创建的 3D瓦片集 添加进来。
const newBuildingTileset = await Cesium.Cesium3DTileset.fromIonAssetId('资产ID');
viewer.scene.primitives.add(newBuildingTileset);

// 把相机移动到新的建筑物位置。
viewer.flyTo(newBuildingTileset);`
});

const code07 = ref({
    js: `${ code06.value.js }

// 步骤 6 代码
// 将从 Cesium ion 账户创建的 3D瓦片集 添加进来。
const newBuildingTileset = await Cesium.Cesium3DTileset.fromIonAssetId(1687327);
viewer.scene.primitives.add(newBuildingTileset);

// 把相机移动到新的建筑物位置。
viewer.flyTo(newBuildingTileset);`,
    html
});

const code08 = ref({
    html: `<button id="toggle-building">切换显示</button>`
});

const code09 = ref({
    html: `<style>
#toggle-building { z-index: 1; position: fixed; top: 5px; left: 5px; }
</style>`
});

const codeStep07 = ref({
    js: `// 步骤 7 代码
// 在按钮被点击时切换瓦片集的 show 属性。
document.querySelector('#toggle-building').onclick = () => {
    newBuildingTileset.show = !newBuildingTileset.show;
};`
});

const code10 = ref({
    js: `${ code07.value.js }

${ codeStep07.value.js }`,
    html: `${ code09.value.html }

${ code09.value.html }

${ code08.value.html }

${ code02.value }
`
});

const code11 = ref({
    html: `<!DOCTYPE html>
<html lang="en">
<head>
${ code01.value.html }
<link href="style.css" rel="stylesheet">
${ code09.value.html }
</head>
<body type="module">
${ code02.value }
${ code08.value.html }

<script>
// 访问Token可以在以下位置找到: https://ion.cesium.com/tokens.
// 用 Cesium ion 访问Token替换 '访问Token'。
Cesium.Ion.defaultAccessToken = '访问Token';

${ code10.value.js }
<\/script>
<\/body>
</html>`
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>在3D城市中可视化一个建议的建筑物<span>Visualize a Proposed Building in a 3D City</span></h1>
        <p>在这个教程中，将学习如何使用Cesium创建一个应用程序，用自己的3D模型替换真实城市中的建筑物。</p>
        <p>可以使用此方法来可视化拟建建筑的影响。它是如何改变天际线的？从特定的楼层或房间看，景色会是什么样子？</p>
        <p>下面介绍如何实现：</p>
        <ul>
            <li>搭建并在Web上部署Cesium应用程序。</li>
            <li>添加全球3D建筑、地形和影像的基础图层。</li>
            <li>隐藏个别建筑物，并用自己的3D模型替换它们。</li>
        </ul>
        <h2>开始之前<span>Before you get started</span></h2>
        <p>我们将从Cesium ion获取全球卫星影像、3D建筑和地形数据，Cesium ion是一个用于流式传输和托管3D内容的开放平台。</p>
        <p>如果还没有，请<a href="https://ion.cesium.com/signup" target="_blank">注册</a>一个免费的Cesium ion账户。</p>
        <p>登录成功后：</p>
        <ol>
            <li>前往<a href="https://ion.cesium.com/tokens" target="_blank">Access Tokens</a>选项卡。</li>
            <li>请注意默认Token旁边的复制按钮。我们将在下一步中使用这个Token。</li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-quickstart-token.jpeg"></p>
        <h2>步骤 1：设置Cesium应用程序<span>Step 1: Set up your Cesium app</span></h2>
        <p>我们将使用CesiumJS（一个开源的JavaScript引擎）创建我们的应用程序。我们将使用Glitch（一个在线的IDE）来托管我们的应用程序。</p>
        <ol>
            <li>使用我们准备的基本模板<a href="https://glitch.com/edit/#!/remix/cesium-template" target="_blank">创建一个新的Glitch项目</a>。</li>
            <li>点击左侧面板中的<strong>index.html</strong>，查看应用程序的代码。</li>
            <li>从<a href="https://ion.cesium.com/tokens" target="_blank">Token页面</a>获取的访问Token，替换<span class="code">访问Token</span>。</li>
            <li>通过点击顶部的<strong>Show</strong> 按钮并选择 <strong>Next to The Code</strong> 来运行应用程序。</li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-building-proposal-show_app.png"></p>
        <p>到目前为止，<strong>index.html</strong>中的代码执行了三个操作：</p>
        <ul>
            <li>
                <p>导入CesiumJS库。JavaScript和CSS文件在以下两行中加载：</p>
                <monaco-editor v-model="code01" />
            </li>
            <li>
                <p>添加了一个用于场景的HTML容器：</p>
                <monaco-editor v-model="code02" />
            </li>
            <li>
                <p>使用以下代码初始化场景视图器：</p>
                <monaco-editor v-model="code03" />
            </li>
        </ul>
        <p>现在在浏览器中运行了一个基本的CesiumJS应用程序，并使用了来自Cesium ion的全球卫星影像。</p>
        <h2>配置自动刷新<span>Configure auto-refresh</span></h2>
        <p>Glitch会在代码发生更改时自动刷新页面。可以通过点击左上角的项目名称并取消选中此框来切换此功能：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-flight-tracker-auto_refresh.png"></p>
        <p>使用应用程序窗口顶部的刷新按钮重新运行应用程序：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-flight-tracker-refresh.png"></p>
        <h2>步骤 2：添加3D建筑和地形<span>Step 2: Add Cesium OSM Buildings and Cesium World Terrain</span></h2>
        <div class="note">
            <p><a href="https://cesium.com/platform/cesium-ion/content/cesium-osm-buildings/" target="_blank">Cesium OSM Buildings</a>是一个全球基础图层，拥有超过 3.5 亿个建筑物，这些数据来源于 OpenStreetMap。它以 3D瓦片集 的形式提供，这是 Cesium 创建的一种开放标准，可以将 3D 内容流式传输到任何兼容的客户端。</p>
        </div>
        <p>让我们添加这些图层，然后将相机移动到我们假设的新建筑所在的城市——美国科罗拉多州丹佛市。</p>
        <ol>
            <li>请将<strong>index.html</strong>中的 JavaScript 代码替换为下面的代码，同时保留之前的访问Token行。</li>
            <li>点击并拖动以移动相机。在拖动时按住CTRL键以倾斜相机。</li>
            <li>点击任意建筑物以查看其元数据。</li>
        </ol>
        <cesium-example v-model="codeStep02" height="340px"></cesium-example>
        <p>此时，完整<strong>index.html</strong>文件将如下所示（除了访问Token部分）。在未来的步骤中，将在<span class="code">&lt;script&gt;</span>标签内的<span class="code">TODO</span>标记处添加新的代码。</p>
        <monaco-editor v-model="code04" height="670px" />
        <div class="note">
            <p>Cesium OSM Buildings 的高度数据是基于全球高分辨率三维地形数据集<a href="https://cesium.com/platform/cesium-ion/content/cesium-world-terrain/" target="_blank">Cesium World Terrain</a>计算得出的，因此它非常适用于需要准确建筑高度信息的应用场景，例如洪水分析工具。</p>
        </div>
        <h2>步骤 3：识别新建筑区域<span>Step 3: Identify the new building area</span></h2>
        <p>在我们添加新建筑之前，让我们先添加一个 GeoJSON 文件来标记其轮廓。这将告诉我们哪些现有建筑物需要被移除。</p>
        <ol>
            <li><a download href="https://cesium.com/public/learn/new_building_denver.geojson">下载 GeoJSON</a>文件。</li>
            <li>将 GeoJSON 文件拖放到<a href="https://ion.cesium.com/" target="_blank">Cesium ion仪表板</a>。</li>
            <li>点击<strong>Upload</strong>。</li>
        </ol>
        <h2>步骤 4：上传完成后，在预览窗口下方注意到资产 ID<span>Step 4: After uploading, note the asset ID under the preview window</span></h2>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-building-proposal-asset_id.jpeg"></p>
        <p>将以下代码添加到<strong>index.html</strong>文件中</p>
        <p>将<span class="code">资产ID</span>替换为资产 ID。ID 是一个数字，所以不需要加引号。</p>
        <monaco-editor v-model="codeStep03" height="355px" />
        <p>现在可以在地面上看到建筑物的轮廓了。使用鼠标滚轮放大或右键单击并拖动以进行近距离查看。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-building-proposal-building_footprint.jpeg"></p>
        <cesium-example v-model="code05" height="630px"></cesium-example>
        <h2>步骤 5：隐藏现有的建筑物<span>Step 5: Hide the existing 3D buildings on the site</span></h2>
        <p>现在我们已经确定了新建筑物的位置，我们可以看到当前存在哪些建筑物。我们将使用<a href="https://github.com/CesiumGS/3d-tiles/tree/main/specification/Styling#overview" target="_blank">3D瓦片样式语言</a>来隐藏它们。</p>
        <p>在上面的占地图中，我们可以看到在我们新建筑物的场地上有六座建筑物 —— 一座大型建筑和五座较小的建筑物。</p>
        <ol>
            <li>
                <p>请添加以下代码。它将隐藏所有较小的三维建筑物。</p>
                <monaco-editor v-model="codeStep04" height="420px" />
            </li>
            <li>
                <p>将代码扩展以隐藏剩余的3D建筑物。</p>
                <ul>
                    <li>点击建筑物以查找其<span class="code">elementId</span>。</li>
                    <li>添加另一行代码类似于：<span class="code">[ '${elementId} === 建筑元素ID', false ]</span>。</li>
                </ul>
            </li>
        </ol>
        <cesium-example v-model="code06" height="980px"></cesium-example>
        <h2>步骤 6：上传并定位新建筑物<span>Step 6: Upload and position the new building</span></h2>
        <p>让我们上传提议的建筑模型</p>
        <ol>
            <li><p><a download href="https://cesium.com/public/learn/PSFS.glb">下载这个 glTF 模型</a>。</p></li>
            <li><p>将其拖放到<a href="https://ion.cesium.com/" target="_blank">Cesium ion仪表板</a>中。</p></li>
            <li><p>选择<strong>3D Model (tile as 3D Tiles)</strong>并点击<strong>Upload</strong>。</p></li>
            <li>
                <p>在切片完成后，点击资产预览窗口顶部的<strong>Adjust Tileset Location</strong>按钮。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-building-proposal-adjust_tileset_location.jpeg"></p>
            </li>
            <li><p>在搜索框中输入建筑物的地址，<strong>1250 Cherokee Street</strong>，并点击<strong>Next</strong>。</p></li>
            <li><p>使用查看器上的控件，通过视觉定位和旋转建筑物，使其与下面的卫星影像对齐。最终的设置应该大致如下：</p>
                <ul>
                    <li><strong>Longitude</strong>: -104.9909</li>
                    <li><strong>Latitude</strong>: 39.73579</li>
                    <li><strong>Height</strong>: 1577</li>
                    <li><strong>Heading</strong>: -8</li>
                </ul>
            </li>
            <li><p>点击<strong>Save</strong>按钮。</p></li>
        </ol>
        <div class="note">
            <p><strong>确保地理定位准确性</strong></p>
            <p>在本教程中，手动定位了一个新建筑物。如果一个建筑物已经进行了地理参考，Cesium ion会自动将其放置在正确的位置。也可以使用REST API对其进行地理定位。请通过<router-link :to="{ name: '3D-Tiling-Set-Location-For-Data' }" target="_blank">地理定位指南了</router-link>解更多信息。</p>
        </div>
        <h2>步骤 7：将新建筑物添加到场景中<span>Step 7: Add the new building to the scene</span></h2>
        <p>现在让我们将新的建筑物添加到场景中。</p>
        <p>1.在资产预览窗口下，获取我们刚刚地理定位的建筑物模型的资产ID。</p>
        <div>
            <p>2.在<strong>index.html</strong>中添加下面的代码。</p>
            <ul>
                <li>
                    <p>将<span class="code">资产ID</span>替换为真实资产ID。</p>
                    <monaco-editor v-model="codeStep06" height="200px" />
                </li>
            </ul>
        </div>
        <cesium-example v-model="code07" height="1110px"></cesium-example>
        <h2>步骤 8：添加一个按钮来切换新建筑物的显示<span>Step 8: Add a button to toggle the new building </span></h2>
        <ol>
            <li>
                <p>在<strong>index.html</strong>中，在<span class="code">&lt;body&gt;</span>标签内的<span class="code">&lt;script&gt;</span>之前，右边添加一个按钮。</p>
                <monaco-editor v-model="code08" />
            </li>
            <li>
                <p>在<span class="code">&lt;head&gt;</span>标签内添加以下CSS<span class="code">style</span>代码。</p>
                <monaco-editor v-model="code09" />
            </li>
            <li>
                <p>在<strong>index.html</strong>中添加以下 JavaScript 代码。</p>
                <monaco-editor v-model="codeStep07" height="160px" />
            </li>
        </ol>
        <cesium-example v-model="code10" height="1210px"></cesium-example>
        <h2>步骤 9：考虑建筑物对周围环境的影响<span>Step 9: Consider the building’s impact on its surroundings</span></h2>
        <p>现在可以将这个场景与没有这座新建筑的场景进行比较了！</p>
        <p>丹佛的全景山景非常有价值。这座建筑会如何影响其他位置（比如科罗拉多州议会大厦）的视野？</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-building-proposal-denver-skyline.gif"><em>从科罗拉多州议会大厦俯瞰。<br>要复现这一效果，请搜索<strong>State Capitol Building, Denver, CO, USA</strong>，并调整摄像头位置。</em></p>
        <p>我们甚至可以探索从议会大厦入口处看，视野将如何发生变化。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-building-proposal-denver-skyline-from-ground.gif"><em>靠近地面水平的视角</em></p>
        <h2>完整的教程源代码<span>Complete tutorial source code</span></h2>
        <p>这里是完整的应用程序源代码，其中包含了<span class="code">访问Token</span>和<span class="code">资产ID</span>的占位符。</p>
        <monaco-editor v-model="code11" height="1550px" />
        <h2>下一步<span>Next steps</span></h2>
        <p>如果有自己的建筑模型，可以尝试使用它来代替提供的示例 - glTF，OBJ 和 FBX 格式都支持。或者将该建筑放置在自己的城市中。</p>
        <p>请查看 <router-link :to="{ name: '3D-Tiling-Ion-3D-Models' }" target="_blank">3D模型导入指南</router-link> 以了解更多信息。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-interactive-building/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
  </div>
</div>
</template>
