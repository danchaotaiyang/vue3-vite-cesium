<script setup>
import { ref } from 'vue';


const code01 = ref({
    shell: `bin/asset-server -d Data`
});

const code02 = ref({
    shell: `bin/asset-server -d Directory1 Directory2 Directory3`
});

const code03 = ref({
    shell: `npm install`
});

const code04 = ref({
    shell: `npm run minifyRelease`
});

const code05 = ref({
    shell: `npm run start`
});

const code06 = ref({
    html: `<body>
    <div id="cesium-container"></div>
    <script>
        const viewer = new Cesium.Viewer('cesium-container');
        const tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            // 从‘启动服务器’部分获取 URL。
            url : 'http://localhost:8002/3DTileset/tileset.json'
        }));
        viewer.zoomTo(tileset);
    <\/script>
</body>`
});

const code07 = ref({
    html: `<body>
    <div id="cesium-container"></div>
    <script>
        var viewer = new Cesium.Viewer('cesium-container', {
        imageryProvider : new Cesium.TileMapServiceImageryProvider({
            // 从‘启动服务器’部分获取 URL。
            url : 'http://localhost:8002/static/Data/ImageryTileset'
        }),
        baseLayerPicker : false
      });
    <\/script>
</body>`
});

const code08 = ref({
    html: `<body>
    <div id="cesium-container"></div>
    <script>
        var viewer = new Cesium.Viewer('cesium-container', {
            terrainProvider : new Cesium.CesiumTerrainProvider({
            // 从‘启动服务器’部分获取 URL。
                url : 'http://localhost:8002/WorldTerrain'
            })
        });
    <\/script>
</body>`
});
</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>托管3D内容<span>Hosting 3D Content</span></h1>
        <h2>安装<span>Setup</span></h2>
        <p>解压<span class="code">Cesium-ion-3D-Tiling-Pipeline.zip</span>文件。主要的可执行文件可以在解压后的目录中的<span class="code">bin/asset-server</span>下找到。</p>
        <h2>启动服务器<span>Starting the server</span></h2>
        <p>在解压后的目录中运行这个命令：</p>
        <monaco-editor v-model="code01" />
        <p>它会在<span class="code">8002</span>端口启动服务器，并在<span class="code">Data</span>目录中提供所有的3D瓦片、地形和影像数据。还可以指定多个目录来提供服务。</p>
        <monaco-editor v-model="code02" />
        <p>所有指定的目录也会以静态方式提供在<span class="code">http://localhost:8002/static/&lt;directoryName&gt;</span>。这能提供诸如glTF模型、GeoJSON文件或其他任何内容的文件。</p>
        <p>以下是提供不同类型内容的示例。</p>
        <h3><strong class="code">.3dtiles</strong>数据库文件中的3D瓦片<span>3D Tiles from .3dtiles database file</span></h3>
        <p>放置在<span class="code">Data/3DTileset.3dtiles</span>的3D瓦片数据库文件可以通过<span class="code">http://localhost:8002/3DTileset/tileset.json</span>访问。</p>
        <h3>其他文件和目录中的3D瓦片<span>3D Tiles from a pile of files and directories</span></h3>
        <p>3D瓦片集目录位于<span class="code">Data/3DTilesetFiles</span>，可以通过<span class="code">http://localhost:8002/static/Data/3DTilesetFiles/tileset.json</span>访问。</p>
        <h3><strong class="code">.terraindb</strong>数据库文件中的地形<span>Terrain from .terraindb database file</span></h3>
        <p><span class="code">Data/WorldTerrain.terraindb</span>中的地形数据库文件可通过<span class="code">http://localhost:8002/WorldTerrain</span>访问。</p>
        <h3>瓦片目录的影像瓦片集<span>Imagery tileset from a directory of tiles</span></h3>
        <p>位于<span class="code">Data/ImageryTileset</span>的影像瓦片集可以通过<span class="code">http://localhost:8002/static/Data/ImageryTileset</span>访问。</p>
        <h3>其他文件<span>Other files</span></h3>
        <p><span class="code">Data</span>目录中的其他文件（如glTF模型、GeoJSON文件等）将静态地提供在<span class="code">http://localhost:8002/static/Data/path/to/file</span>。</p>
        <h3>可用选项<span>Available options</span></h3>
        <p>以下是配置瓦片生成器的所有命令行选项的完整列表。</p>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>说明</th>
                    <th>默认</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--help</span>,<span class="code">-h</span></td>
                    <td>显示帮助信息。</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--version</span>,<span class="code">-v</span></td>
                    <td>显示版本号。</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--data</span>,<span class="code">-d</span></td>
                    <td>包含<span class="code">.terraindb</span>、<span class="code">.3dtiles</span>、<span class="code">图像</span>或<span class="code">3D瓦片</span>文件的一个或多个目录的路径。</td>
                    <td>当前目录</td>
                </tr>
                <tr>
                    <td><span class="code">--port</span></td>
                    <td>设置要监听的端口。</td>
                    <td>8002</td>
                </tr>
            </tbody>
        </table>
        <h2>流数据传输给 CesiumJS<span>Streaming Data to CesiumJS</span></h2>
        <p>本节介绍如何设置CesiumJS并在浏览器中流式传输3D内容。</p>
        <h3>安装<span>Setup</span></h3>
        <p>安装<a href="https://nodejs.org/en/download/" target="_blank">Node.js（版本8.9.0或更高版本）</a>，然后下载并解压缩<a href="https://cesium.com/downloads/" target="_blank">CesiumJS库</a>。</p>
        <p>在<span class="code">cesium</span>目录中打开一个终端窗口，并安装所需的依赖项：</p>
        <monaco-editor v-model="code03" />
        <p>运行构建过程：</p>
        <monaco-editor v-model="code04" />
        <p>最后，启动服务器以提供 CesiumJS 服务：</p>
        <monaco-editor v-model="code05" />
        <p>打开网址 http://localhost:8080/Apps/HelloWorld.html 运行简单的 Hello World 示例。</p>
        <h3>添加3D瓦片<span>Adding 3D Tiles</span></h3>
        <p>要将<span class="code">.3dtiles</span>文件的 3D瓦片 添加到 Hello World 演示中，在代码编辑器中打开文件<span class="code">cesium/Apps/HelloWorld.html</span>。将<span class="code">&lt;body&gt;</span>标签之间的代码更改为：</p>
        <monaco-editor v-model="code06" height="250px" />
        <p>请确保在上面的<span class="code">url</span>字段中使用本地服务器的链接。现在，如果重新运行“Hello World”演示，应该能够从本地服务器流式传输3D瓦片，并在浏览器中进行可视化显示！</p>
        <h3>添加图像<span>Adding Imagery</span></h3>
        <p>要向“Hello World”演示添加影像瓦片，打开代码编辑器中的<span class="code">cesium/Apps/HelloWorld.html</span>文件。将<span class="code">&lt;body&gt;</span>标签之间的代码更改为：</p>
        <monaco-editor v-model="code07" height="270px" />
        <p>这将加载来自<span class="code">Data/ImageryTileset</span>的 TMS 图像，并关闭基础图层。</p>
        <h3>添加地形<span>Adding Terrain</span></h3>
        <p>要向“Hello World”演示添加地形，打开代码编辑器中的<span class="code">cesium/Apps/HelloWorld.html</span>文件。将<span class="code">&lt;body&gt;</span>标签之间的代码更改为：</p>
        <monaco-editor v-model="code08" height="260px" />
        <p>这将从<span class="code">Data/WorldTerrain.terraindb</span>提供地形服务。</p>
        <h2>下一步<span>Next steps</span></h2>
        <p>查看 <router-link :to="{ name: 'Quickstart' }" target="_blank">CesiumJS 教程</router-link>以获取更详尽的信息。</p>
        <el-affix position="bottom">
<!--            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/3d-tiling/on-prem/hosting-3d-content/" target="_blank">原文</a></div>-->
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/on-prem/hosting-3d-content/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style lang="scss" scoped>

</style>
