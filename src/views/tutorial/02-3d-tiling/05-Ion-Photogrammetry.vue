<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>摄影测绘模型瓦片生成<span>Tiling Photogrammetry Models</span></h1>
        <p>Cesium ion允许将大型摄影测绘或LiDAR导出的网格模型进行瓦片生成，生成3D瓦片格式，以便在Web上共享，而无需简化模型。本指南将详细解释如何进行操作。</p>
        <div class="note">
            <p>如果有其他的三维模型，比如BIM/CAD模型，请参考<router-link :to="{ name: '3D-Tiling-Ion-3D-Models' }" target="_blank">3D模型上传指南</router-link>。</p>
        </div>
        <p><img alt="" src="/static/img/tutorial/cesium-js/bfaeb3a7-d319-4590-969f-fbe2fa23db51_independence-hall.jpg"><em>在CesiumJS中可视化的费城独立厅的摄影测量模型</em></p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <p>需要一个Cesium ion账户才能进行这个教程。</p>
        <p><a class="btn-sandcastle" href="https://cesium.com/ion/signup/" target="_blank">免费注册</a></p>
        <div class="note">
            <p>Cesium ion是一个用于瓦片生成和托管的开放平台。它将摄影测绘模型作为3D瓦片提供给任何兼容的客户端，例如CesiumJS。</p>
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
                    <td>Wavefront OBJ</td>
                    <td>.obj</td>
                </tr>
                <tr>
                    <td>Filmbox</td>
                    <td>.fbx</td>
                </tr>
                <tr>
                    <td>Digital Asset Exchange（数字资产交易平台）</td>
                    <td>.dae</td>
                </tr>
                <tr>
                    <td>glTF</td>
                    <td>.gltf</td>
                </tr>
                <tr>
                    <td>二进制 glTF</td>
                    <td>.glb</td>
                </tr>
            </tbody>
        </table>
        <ul>
            <li>文件可以进行压缩。</li>
            <li>模型必须使用<strong>本地坐标</strong>（几何形状必须以原点为中心）。</li>
            <li>单位假定为米。</li>
        </ul>
        <h2>导入<span>Importing</span></h2>
        <p>当上传模型到Cesium ion时，它会将模型切片成3D瓦片格式。这里提供一个样例<a download href="https://cesium.com/public/learn/AGI_HQ.zip">摄影测绘模型</a>供下载以尝试该功能。</p>
        <ol>
            <li>在Cesium ion的<a href="https://cesium.com/ion/assets" target="_blank">My Assets</a>选项卡上，点击<strong>Add Data</strong>来上传模型。</li>
            <li>选择<strong>3D Capture</strong>。</li>
        </ol>
        <p>同时添加多个模型，并将它们合并成一个单一的3D瓦片集。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-my-assets-import.jpg"><em>点击<strong>Add Data</strong>按钮来上传和瓦片化3D建筑模型<br>在资产预览窗口的底部，会找到一个将此资产添加到CesiumJS应用程序中的代码示例。</em></p>
        <p>通过<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门指南</router-link>学习如何设置CesiumJS应用程序。</p>
        <h2>地理定位<span>Geolocating</span></h2>
        <p>如果模型没有地理参考信息，有几种方法可以将其放置在地球的正确位置。</p>
        <ul>
            <li>手动进行地理定位，请在<a href="https://cesium.com/ion/assets" target="_blank">My Assets</a>中的资产预览上方点击<span class="code">Adjust Tileset Location</span>。更多详细信息请参考<router-link :to="{ name: '3D-Tiling-Set-Location-For-Data' }" target="_blank">地理位置编辑器指南</router-link>。</li>
            <li><router-link :to="{ name: '3D-Tiling-Set-Location-For-Data' }" target="_blank">使用REST API</router-link>自动将模型精确地放置在一个位置。</li>
            <!--  https://cesium.com/learn/ion/integrations-learn/  -->
            <li>如果导出模型的软件具有Cesium ion集成，它将自动将其放置在正确的位置。请参见<router-link to="" target="_blank">Cesium ion集成列表</router-link>。</li>
        </ul>
        <h2>提示<span>Tips</span></h2>
        <ul>
            <li>使用 LZW 或其他压缩方法对 GeoTIFF 文件进行压缩，会以更快的速度上传。</li>
            <li>瓦片处理时间将根据数据的大小、分辨率和投影而变化。已经使用EPSG:3857投影的影像将更快地进行瓦片处理。</li>
        </ul>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/ion-tile-photogrammetry/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
