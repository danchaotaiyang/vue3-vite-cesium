<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>通过高程图创建3D地形<span>Create 3D Terrain from Heightmaps</span></h1>
        <p>Cesium ion允许从栅格高程图创建3D地形，并在网络上高效地流式传输。可以将其与<a href="https://cesium.com/platform/cesium-ion/content/cesium-world-terrain/" target="_blank">Cesium World Terrain</a>融合，或在CesiumJS的自定义应用程序中使用它。</p>
        <p>本指南将阐述详细方法。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-terrain.jpg"><em>在CesiumJS中可视化的Cesium World Terrain，上覆盖着来自Bing地图的卫星影像。位于亚利桑那州的格伦峡谷。</em></p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <p>需要一个Cesium ion账户才能进行这个教程。</p>
        <p><a class="btn-sandcastle" href="https://cesium.com/ion/signup/" target="_blank">免费注册</a></p>
        <div class="note">
            <p>Cesium ion是一个用于瓦片生成和托管的开放平台。它将地形作为3D瓦片提供给任何兼容的客户端，例如CesiumJS。</p>
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
                    <td>GeoTIFF</td>
                    <td>.tiff, .tif</td>
                </tr>
                <tr>
                    <td>Floating Point Raster（浮点栅格数据）</td>
                    <td>.flt</td>
                </tr>
                <tr>
                    <td>Arc/Info ASCII Grid</td>
                    <td>.asc</td>
                </tr>
                <tr>
                    <!--  有待验证：Source Map是一种用于调试和错误追踪的文件格式。它通常与JavaScript文件一起使用，用于将压缩后的代码映射回原始的未压缩的源代码。
Source Map文件提供了一个映射表，其中包含了每个压缩过的代码片段与原始源代码之间的对应关系。这样，当出现错误或调试时，开发人员可以使用Source Map文件将错误定位到原始源代码的准确位置。
Source Map格式主要是基于JSON的格式，具体而言是符合Source Map规范（Source Map Revision 3）的JSON文件。该规范定义了Source Map文件的结构和字段，包括了原始文件路径、行列号映射关系、源代码内容等信息。
通过使用Source Map文件，开发人员可以更轻松地进行调试和错误追踪，从而提高开发效率和代码质量。  -->
                    <td>Source Map（源映射）</td>
                    <td>.src</td>
                </tr>
                <tr>
                    <td>Erdas Imagine（遥感数据）</td>
                    <td>.img</td>
                </tr>
                <tr>
                    <td>USGS ASCII DEM 与 CDED</td>
                    <td>.dem</td>
                </tr>
                <tr>
                    <td>Cesium 地形数据库</td>
                    <td>.terraindb</td>
                </tr>
                <tr>
                    <td>其他常见的栅格格式</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <ul>
            <li>地形数据文件在被加载到Cesium ion之前必须进行地理参考（Georeference）处理。</li>
            <li>GeoTIFF的输入必须是浮点数或整数高程的单波段数据。</li>
            <li>文件可以被压缩为zip格式。</li>
            <li>上传数据时请包含任何相关的附属文件（如 .aux, .xml, .tab, .tfw, .wld, .prj, .ovr, .rrd 等）。</li>
            <li>上传的地形数据会在瓦片化之前自动转换映射为 EPSG:4326。</li>
        </ul>
        <h2>导入<span>Importing</span></h2>
        <p>上传完成后，Cesium ion会对高程图进行瓦片生成，确保在 CesiumJS 中以 3D 地形的形式高效地流式传输。这里有一个<a download href="https://cesium.com/public/learn/ZionNationalPark.tiff">示例地形文件</a>供下载，以便尝试使用。该地形数据中的高度值是相对于平均海平面的，以米为单位。</p>
        <ol>
            <li>在Cesium ion的<a href="https://cesium.com/ion/assets" target="_blank">My Assets</a>选项卡上，点击<strong>Add Data</strong>来上传模型。</li>
            <li>选择<strong>Raster Terrain</strong>。</li>
            <li>选择 base terrain（基本地形）, height unit（高度单位）, 和 height reference（高度参考）。</li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-my-assets-import.jpg"><em>点击<strong>Add Data</strong>按钮来上传和瓦片化3D建筑模型</em></p>
        <h3>选择基础地形图层<span>Choosing a base terrain layer</span></h3>
        <p>为了将地形与全局基础图层结合呈现，请选择<strong>Cesium World Terrain</strong>作为基础地形。这将创建一个新的全局图层，在数据定义高度的区域使用数据高度，在其他区域则使用基础图层的高度。</p>
        <h3>选择正确的高度<span>Choosing the right height</span></h3>
        <p>在Cesium ion中，高度是相对于椭球体存储的。如果栅格文件中的高度是相对于平均海平面的话，选择<strong>Mean Sea Level</strong>（平均海平面）将会转换高度值，确保在CesiumJS中正确可视化地形。</p>
        <p>如果高度不是以米为单位的话，请选择适当的单位，Cesium ion 将会按比例将其转换为米。</p>
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
        <h3>结合地形和影像<span>Combining terrain and imagery</span></h3>
        <p>CesiumJS在运行时将卫星影像与3D地形结合起来，因此可以动态更改影像或添加自己的影像。</p>
        <h3>查询高度值<span>Querying height values</span></h3>
        <p>可以在运行时使用<a href="https://cesium.com/docs/cesiumjs-ref-doc/global.html?classFilter=sampleT#sampleTerrainMostDetailed" target="_blank">Cesium.sampleTerrainMostDetailed</a>函数查询单个点或点列表（例如沿路径）的地形高度。</p>
        <p>请查看<a href="https://sandcastle.cesium.com/?src=Terrain.html" target="_blank">代码示例</a>。单击“Sample Most Detailed Everest Terrain”按钮，可以在网格上获取高度，并将高度值显示在场景中。</p>
        <h3>地形贴合<span>Clamping to terrain</span></h3>
        <p>除了在CesiumJS中将卫星或无人机影像覆盖到3D地形上，还可以将矢量数据（如GeoJSON和KML）贴合到地形上。请参考<a href="https://sandcastle.cesium.com/?src=Clamp%20to%20Terrain.html" target="_blank">此代码示例</a>，了解各种几何类型如何与地形贴合。</p>
        <p>也可以动态创建新的几何图形，并将其贴合到地形上。请参考<a href="https://sandcastle.cesium.com/?src=Drawing%20on%20Terrain.html" target="_blank">在地形上绘制</a>示例。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/ion-tile-terrain/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
