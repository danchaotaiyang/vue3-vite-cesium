<script setup>
import { ref } from 'vue';


const code01 = ref({
    js: `tileset.pointCloudShading.attenuation = true;
tileset.pointCloudShading.eyeDomeLighting = true;`
});

const code02 = ref({
    js: `tileset.style = new Cesium.Cesium3DTileStyle({
    color: 'rgb(\${Intensity}, \${Intensity}, \${Intensity})'
});`
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>点云瓦片生成<span>Tiling Point Clouds</span></h1>
        <p>Cesium ion允许对大规模的点云进行瓦片生成，并进行点的分类，将其分享到网络上，并与其他类型的内容（如3D地形和卫星影像）在同一场景中进行组合。</p>
        <p>本指南将阐述详细方法。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-point-cloud-indoor.jpg"><em><a href="https://cesium.com/blog/2018/02/05/historic-pharsalia-cabin-point-cloud/" target="_blank">弗吉尼亚州历史悠久的Pharsalia小屋</a>亚厘米级精度点云</em></p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <p>需要一个Cesium ion账户才能进行这个教程。</p>
        <p><a class="btn-sandcastle" href="https://cesium.com/ion/signup/" target="_blank">免费注册</a></p>
        <div class="note">
            <p>Cesium ion是一个用于瓦片生成和托管的开放平台。它将把点云作为3D瓦片提供给任何兼容的客户端，例如CesiumJS。</p>
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
                    <td>LASer LAS</td>
                    <td>.las</td>
                </tr>
                <tr>
                    <td>LASer LAZ (压缩LAS)</td>
                    <td>.laz</td>
                </tr>
            </tbody>
        </table>
        <ul>
            <li>文件可以进行压缩。</li>
            <li>支持强度、分类和RGB颜色作为每个点的属性。</li>
            <li>如果所有点的某个属性都具有值为<span class="code">0</span>，则该属性将被视为“no data”值并被忽略。</li>
            <li>强度值在0到255之间进行规范化。</li>
            <li>如果点云已地理参考处理，则它将自动放置在全球正确的位置。Cesium ion会将点云重新投影为EPSG:4326投影方式。</li>
        </ul>
        <h2>导入<span>Importing</span></h2>
        <p>当上传点云时，Cesium ion会将其生成为3D瓦片。<a download href="https://cesium.com/public/learn/House.laz">这是一个示例的LAZ文件</a>，可以下载并尝试使用。</p>
        <ol>
            <li>在Cesium ion的<a href="https://cesium.com/ion/assets" target="_blank">My Assets</a>选项卡上，点击<strong>Add Data</strong>来上传模型。</li>
            <li>选择<strong>Point Cloud</strong>。</li>
        </ol>
        <p>同时添加多个文件以合并它们成为一个单一的3D瓦片集。</p>
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
            <li>预览面板显示了资产的ID，这是在CesiumJS或其他引擎中加载此资产所需的信息。</li>
            <li>在预览面板的底部，会找到一个加载此资产在CesiumJS中的代码片段。</li>
            <li>点击<strong>Open complete code example</strong>以在<a href="https://cesium.com/docs/code-examples/" target="_blank">Sandcastle</a>中查看资产。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-data-import-asset-preview.jpg"><em>在资产预览窗口的底部，会找到一个将此资产添加到CesiumJS应用程序中的代码示例。</em></p>
        <p>通过<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门指南</router-link>学习如何设置CesiumJS应用程序。</p>
        <h3>样式<span>Styling</span></h3>
        <p>在CesiumJS中，有几种方式可以对点云进行样式化。如果点云没有颜色，则打开点衰减和照明可以使它更容易观察到：</p>
        <monaco-editor v-model="code01" />
        <p>使用<router-link :to="{ name: 'Style-&-Filter-3D-Tiles' }" target="_blank">3D瓦片样式语言</router-link>可以根据每个点的属性或位置来为其着色或隐藏。以下是一个示例，演示如何基于强度属性为点云应用样式进行着色：</p>
        <monaco-editor v-model="code02" />
        <p>请查看这个<a href="https://sandcastle.cesium.com/index.html?src=3D%20Tiles%20Point%20Cloud%20Styling.html" target="_blank">代码示例</a>，了解在CesiumJS中如何使用样式对点云进行其他操作。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/ion-tile-point-clouds/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
