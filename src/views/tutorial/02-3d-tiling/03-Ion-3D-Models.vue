<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>BIM、CAD或其他3D模型瓦片生成<span>Tiling BIM, CAD, or other 3D Models</span></h1>
        <p>Cesium ion允许对大型模型（如BIM或CAD）进行瓦片生成，在地理空间上可视化它们，并在Web上共享。</p>
        <div class="note">
            <p>如果有来自扫描（例如摄影测绘或LiDAR）的3D模型，请参阅<a href="https://cesium.com/learn/3d-tiling/ion-tile-photogrammetry/" target="_blank">摄影测绘指南</a>。</p>
        </div>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-cad.jpeg"><em>在CesiumJS中，将金门大桥的3D模型放置在准确的全球3D地形和卫星影像之上进行可视化。</em></p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <p>需要一个Cesium ion账户才能进行这个教程。</p>
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
        <p>当上传模型到Cesium ion时，它会将模型切片成3D瓦片格式。在这里，我们提供了一个<a download href="https://cesium.com/public/learn/OfficePlan.zip">样例办公室模型</a>下载，以便可以尝试这一功能。</p>
        <ol>
            <li>在Cesium ion的<a href="https://cesium.com/ion/assets" target="_blank">My Assets</a>选项卡上，点击<strong>Add Data</strong>来上传模型。</li>
            <li>选择<strong>3D Model (tile as 3D Tiles)</strong>。</li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-my-assets-import.jpg"><em>点击<strong>Add Data</strong>按钮来上传和瓦片化3D建筑模型</em></p>
        <h2>地理定位<span>Geolocating</span></h2>
        <p>有几种方法可以将模型放置在地球上的某个位置。</p>
        <ul>
            <li>手动进行地理定位，请在<a href="https://cesium.com/ion/assets" target="_blank">My Assets</a>中的资产预览上方点击<span class="code">Adjust Tileset Location</span>。更多详细信息请参考 <router-link :to="{ name: '3D-Tiling-Set-Location-For-Data' }" target="_blank">地理位置编辑器指南</router-link>。</li>
            <li><router-link :to="{ name: '3D-Tiling-Set-Location-For-Data' }" target="_blank">使用REST API</router-link>自动将模型精确地放置在一个位置。</li>
            <!--  https://cesium.com/learn/ion/integrations-learn/  -->
            <li>如果使用的软件具有Cesium ion集成功能，它可以自动将模型放置在正确的位置上。请参见<router-link to="" target="_blank">Cesium ion集成列表</router-link>。</li>
        </ul>
        <h2>将模型以glTF格式进行托管<span>Hosting your models as glTF</span></h2>
        <p>对于小型模型，选择<strong>3D Model (convert to glTF)</strong>以将其转换并托管为glTF模型。可以选择在此上传步骤中应用压缩，例如<a href="https://google.github.io/draco/" target="_blank">Draco</a>压缩。</p>
        <p>使用这种方法将模型附加到CesiumJS中的时间动态数据上。请参阅<router-link :to="{ name: 'Flight-Tracker' }" target="_blank">构建飞行追踪器教程</router-link>了解详细信息。</p>
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
            <li>预览面板显示了资产的ID，这是在CesiumJS或其他引擎中加载此资产所需的信息。</li>
            <li>在预览面板的底部，会找到一个加载此资产在CesiumJS中的代码片段。</li>
            <li>点击<strong>Open complete code example</strong>以在<a href="https://cesium.com/docs/code-examples/" target="_blank">Sandcastle</a>中查看资产。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-asset-preview.jpg"><em>在资产预览窗口的底部，会找到一个将此资产添加到CesiumJS应用程序中的代码示例。</em></p>
        <p>通过<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门指南</router-link>学习如何设置CesiumJS应用程序。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/ion-tile-3d-models/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
