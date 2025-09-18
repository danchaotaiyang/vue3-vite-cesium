<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>3D建筑瓦片生成<span>Tiling 3D Buildings</span></h1>
        <p>Cesium ion允许将3D建筑进行瓦片生成来可视化整个城市，或像Cesium OSM Buildings一样可视化全球。</p>
        <p>本指南解释了如何将3D建筑上传到Cesium ion。</p>
        <div class="note">
            <p>如需上传其他类型的3D模型，请参阅<a href="https://cesium.com/learn/3d-tiling/ion-tile-3d-models/" target="_blank">3D模型指南</a>。</p>
        </div>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-3d-buildings-nyc.jpg"><em>使用高度进行着色的纽约市建筑在CesiumJS中可视化</em></p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <p>需要一个Cesium ion账户才能进行本教程。</p>
        <p><a class="btn-sandcastle" href="https://cesium.com/ion/signup/" target="_blank">免费注册</a></p>
        <div class="note">
            <p>Cesium ion是一个用于瓦片生成和托管的开放平台。它将以3D瓦片的形式向任何兼容的客户端（如CesiumJS）提供建筑数据服务。</p>
        </div>
        <h2>支持的格式<span>Supported formats</span></h2>
        <table>
            <thead>
                <tr>
                    <th>格式</th>
                    <th>文件扩展名</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CityGML</td>
                    <td>.citygml, .xml, .gml</td>
                </tr>
                <tr>
                    <td>KML/COLLADA</td>
                    <td>.kml, .kmz, .dae</td>
                </tr>
            </tbody>
        </table>
        <ul>
            <li>文件可以进行压缩。</li>
            <li>源数据中的每个建筑物属性将包含在3D瓦片输出中。</li>
            <li>对于KML/COLLADA格式的输入，每个建筑都应该是一个单独的COLLADA模型。应该有一个或多个KML文件，其中指定了每个建筑物在地球上的位置和任何相关属性。</li>
        </ul>
        <h2>导入<span>Importing</span></h2>
        <p>当上传建筑物时，Cesium ion将它们转换为3D瓦片。以下是可供下载的示例文件进行尝试：</p>
        <ul>
            <li><a download href="https://cesium.com/public/learn/AGI_HQ.kmz">KML/COLLADA</a></li>
            <li><a download href="https://cesium.com/public/learn/Reichstag.zip">CityGML</a></li>
        </ul>
        <ol>
            <li>在Cesium ion的<a href="https://cesium.com/ion/assets" target="_blank"><strong>My Assets</strong></a>标签页上，点击<strong>Add Data</strong>上传模型。</li>
            <li>选择<strong>KML/COLLADA (tile as 3D Tiles)</strong>或<strong>CityGML</strong>。</li>
            <li>选择要应用的选项，包括将建筑物贴附到地形上。</li>
        </ol>
        <p><strong>Reichstag.zip</strong>为<strong>CityGML</strong>类型，需要选择<strong>Clamp to terrain</strong>选项，以在切片过程中将单个建筑物向下移动到底部地形高度。如果需要准确的实际建筑物高度，或者正在将建筑物可视化到3D地形层之上，则可以使用此选项。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-my-assets-import.jpg"><em>点击<strong>Add Data</strong>按钮来上传和瓦片化3D建筑模型</em></p>
        <h2>可视化<span>Visualizing</span></h2>
        <p>使用Cesium Stories是最简单的可视化和共享资产的方法。</p>
        <ol>
            <li>在<a href="https://cesium.com/ion/stories/" target="_blank">Stories标签页</a>中，点击<strong>New Story</strong>。</li>
            <li>在<strong>Assets</strong>下，点击<strong>Add asset</strong>按钮，然后选择资产。</li>
            <li>点击放大按钮（放大镜图标）以在场景中查看资产。根据喜好调整视图。</li>
            <li>点击<strong>Capture view</strong>以保存当前视图。</li>
            <li>点击<strong>Share</strong>并为故事命名。</li>
        </ol>
        <!--  https://cesium.com/learn/ion/stories-introduction/  -->
        <p>现在可以分享数据并将其制作成互动场景了！请参考<router-link to="" target="_blank">本教程</router-link>了解更多有关故事功能的信息。</p>
        <h3>在自定义应用程序中使用资产<span>Use your asset in a custom app</span></h3>
        <p>在<a href="https://cesium.com/ion/assets" target="_blank"><strong>My Assets</strong></a>中单击一个资产时，将会在屏幕右侧看到一个预览面板。</p>
        <ul>
            <li>预览面板显示了资产的ID，这将是CesiumJS或其他引擎中加载此资产所需的信息。</li>
            <li>在预览面板的底部，会找到一个加载此资产在CesiumJS中的代码片段。</li>
            <li>点击<strong>Open complete code example</strong>以在<a href="https://cesium.com/docs/code-examples/" target="_blank">Sandcastle</a>中查看资产。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-asset-preview.jpg"><em>在资产预览窗口的底部，会找到一个将此资产添加到CesiumJS应用程序中的代码示例。</em></p>
        <p>通过<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门指南</router-link>学习如何设置CesiumJS应用程序。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/ion-tile-3d-buildings/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
