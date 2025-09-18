<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>无人机或卫星影像瓦片处理<span>Tiling Drone or Satellite Imagery</span></h1>
        <p>Cesium ion 允许对无人机或卫星影像进行瓦片处理，将它们组合拼接，并将其覆盖在全球 3D 地形上。</p>
        <p>本指南将阐述详细方法。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-satellite-imagery.jpg"><em>在亚利桑那州格伦峡谷，将必应地图的卫星影像覆盖在Cesium World Terrain上。</em></p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <p>需要一个Cesium ion账户才能进行这个教程。</p>
        <p><a class="btn-sandcastle" href="https://cesium.com/ion/signup/" target="_blank">免费注册</a></p>
        <div class="note">
            <p>Cesium ion是一个用于瓦片处理和托管的开放平台。</p>
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
                    <td>JPEG</td>
                    <td>.jpg, .jpeg</td>
                </tr>
                <tr>
                    <td>PNG</td>
                    <td>.png</td>
                </tr>
                <tr>
                    <td>其他常见的栅格格式</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <p>在将影像加载到Cesium ion之前，需要使用专业的遥感影像处理软件（如Erdas Imagine、ENVI等）对影像进行地理参考处理，以确保其与Cesium ion的坐标系统和投影方式一致。</p>
        <ul>
            <li>文件可以进行压缩。</li>
            <li>在上传时，需要包括任何相关的辅助文件（例如.aux，.xml，.tab，.tfw，.wld，.prj，.ovr，.rrd等）。</li>
            <li>上传的影像会自动转换为EPSG:3857投影坐标系统。</li>
        </ul>
        <h2>导入<span>Importing</span></h2>
        <p>Cesium ion将影像转换为WMTS/TMS格式的瓦片。可以下载一个<a download href="https://cesium.com/public/learn/Courtyard.tif">示例GeoTIFF文件</a>来尝试这个功能。</p>
        <ol>
            <li>在Cesium ion的<a href="https://cesium.com/ion/assets" target="_blank">My Assets</a>选项卡上，点击<strong>Add Data</strong>来上传模型。</li>
            <li>选择<strong>Raster Imagery</strong>。</li>
        </ol>
        <ul>
            <li>在将影像加载到Cesium ion之前，需要使用专业的遥感影像处理软件（如Erdas Imagine、ENVI等）对影像进行地理参考处理，以确保其与Cesium ion的坐标系统和投影方式一致。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-my-assets-import.jpg"><em>点击<strong>Add Data</strong>按钮来上传和瓦片化3D建筑模型</em></p>
        <h2>可视化<span>Visualizing</span></h2>
        <p>使用Cesium Stories是最简单的可视化和共享资产的方法。</p>
        <ol>
            <li>在<a href="https://cesium.com/ion/stories/" target="_blank">Stories标签页</a>中，点击<strong>New Story</strong>。</li>
            <li>在<strong>Assets</strong>下，点击<strong>Add asset</strong>按钮，然后选择资产。</li>
            <li>点击放大按钮（放大镜图标）以在场景中查看资产。并根据喜好调整视图。</li>
            <li>点击<strong>Capture view</strong>以保存当前视图。</li>
            <li>点击<strong>Share</strong>并为故事命名。</li>
        </ol>
        <!--  https://cesium.com/learn/ion/stories-introduction/  -->
        <p>现在可以分享数据并将其制作成互动场景了！请参考<router-link to="" target="_blank">本教程</router-link>了解更多有关故事功能的信息。</p>
        <h3>在自定义应用程序中使用资产<span>Use your asset in a custom app</span></h3>
        <p>在<a href="https://cesium.com/ion/assets" target="_blank"><strong>My Assets</strong></a>中单击一个资产时，将会在屏幕右侧看到一个预览面板。</p>
        <ul>
            <li>预览面板显示了资产的ID，这是在CesiumJS或其他引擎中加载此资产所需的信息。</li>
            <li>在预览面板的底部，会找到一个加载此资产在CesiumJS中的代码片段。</li>
            <li>点击<strong>Open complete code example</strong>以在<a href="https://cesium.com/docs/code-examples/" target="_blank">Sandcastle</a>中查看资产。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-asset-preview.jpg"><em>在资产预览窗口的底部，会找到一个将此资产添加到CesiumJS应用程序中的代码示例。</em></p>
        <p>通过<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门指南</router-link>学习如何设置CesiumJS应用程序。</p>
        <h3>关于影像的代码示例<span>Live code examples for imagery</span></h3>
        <p>请参考以下代码示例，了解如何处理影像：</p>
        <ul>
            <li><a href="https://sandcastle.cesium.com/?src=Imagery%20Layers%20Manipulation.html" target="_blank">添加多个图层</a></li>
            <li><a href="https://sandcastle.cesium.com/?src=Imagery%20Adjustment.html" target="_blank">调整亮度/色相/对比度</a></li>
            <li><a href="https://sandcastle.cesium.com/?src=Web%20Map%20Tile%20Service%20with%20Time.html" target="_blank">时间动态影像</a></li>
            <li><a href="https://sandcastle.cesium.com/?src=Imagery%20Layers%20Split.html" target="_blank">前后对比滑块</a></li>
        </ul>
        <h2>提示<span>Tips</span></h2>
        <ul>
            <li>使用 LZW 或其他压缩方法对 GeoTIFF 文件进行压缩，会以更快的速度上传。</li>
            <li>瓦片处理时间将根据数据的大小、分辨率和投影而变化。已经使用EPSG:3857投影的影像将更快地进行瓦片处理。</li>
        </ul>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/ion-tile-imagery/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
