<script setup>
import { ref }                 from 'vue';
import { sourceSampleDataUrl } from '@/config.js';


const code01 = ref({
    shell: `3d-buildings-tiler -I <input-type> -i <input-directory> -o <output-directory>`
});

const code02 = ref({
    shell: `3d-buildings-tiler -I CityGML -i SampleData/Reichstag -o Reichstag_Tiles`
});

const code03 = ref({
    shell: `3d-buildings-tiler -I CityGML -i SampleData/Reichstag/Reichstag.gml -o Reichstag_Tiles`
});

const code04 = ref({
    shell: `3d-buildings-tiler -I KML -i SampleData/AGI_HQ_KML -o AGI_HQ_KML_Tiles`
});

const code05 = ref({
    shell: `3d-buildings-tiler -I <input-type> -i <input-directory> -o <output-directory> --ion-terrain <asset-id> --ion-access-token <access-token>`
});

const code06 = ref({
    shell: `3d-buildings-tiler -I <input-type> -i <input-directory> -o <output-directory> -g WorldTerrain.terraindb`
});

const code07 = ref({
    shell: `3d-buildings-tiler -I <input-type> -i <input-directory> -o <output-directory> -g http://localhost:8002/WorldTerrain`
});

const code08 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');

const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: '<tileset.json数据的URL>'
    })
);

viewer.zoomTo(tileset);`
});

const code09 = ref({
    js: `viewer.terrainProvider = await Cesium.createWorldTerrainAsync();`
});

const code10 = ref({
    js: `viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    url: '<地形托管服务器的UTL>'
});`
});
</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>本地使用3D建筑瓦片生成器<span>Using the 3D Buildings Tiler On-Premises</span></h1>
        <div class="note">
            <p>寻找本地部署的3D瓦片？请联系销售进行评估。<a href="https://cesium.com/contact/" target="_blank">联系销售</a>。</p>
        </div>
        <h2>安装<span>Setup</span></h2>
        <p>解压缩<span class="code">Cesium-ion-3D-Tiling-Pipeline.zip</span>的内容。</p>
        <p>主要的可执行文件是<span class="code">3d-buildings-tiler</span>，可以在<span class="code">bin</span>目录下找到。</p>
        <p>如果希望运行示例，请下载并将<a :href="sourceSampleDataUrl" download>SampleData.zip</a>解压缩到一个名为<strong>SampleData</strong>的新目录中。</p>
        <h2>Windows<span>Windows</span></h2>
        <p>Windows二进制文件需要安装<span class="code">Visual Studio 2017</span>的<span class="code">Visual C++ Redistributable</span>组件。请<a download href="https://aka.ms/vs/15/release/vc_redist.x64.exe">下载</a>并运行该安装程序。</p>
        <h2>使用瓦片生成器<span>Using the tiler</span></h2>
        <p>瓦片生成器常用命令参照以下格式：</p>
        <monaco-editor v-model="code01" />
        <p>例如，一个德国议会大厦的<span class="code">CityGML</span>模型位于<strong>SampleData/Reichstag</strong>目录中。通过运行以下命令对其进行瓦片生成：</p>
        <monaco-editor v-model="code02" />
        <p>这将把<strong>SampleData/Reichstag</strong>目录中的所有有效<span class="code">CityGML</span>文件（.gml，.citygml和.xml）转换为3D瓦片格式。最终的瓦片集将被放置在一个名为<strong>Reichstag_Tiles</strong>的新目录中。</p>
        <p>也可以直接指定单个文件：</p>
        <monaco-editor v-model="code03" />
        <p><span class="code">KML</span>的处理方式也是相同的。在<strong>SampleData/AGI_HQ_KML</strong>目录中包含了一个<span class="code">KML</span>建筑模型，可以通过运行以下命令将其转换为3D瓦片格式：</p>
        <monaco-editor v-model="code04" />
        <h3>对地形进行约束<span>Clamping to terrain</span></h3>
        <p>3D建筑瓦片生成器支持将建筑物与底层地形进行对齐，这在需要考虑建筑物高度的应用中非常有用，例如城市规划或洪水建模等。</p>
        <p>地形可以通过<a href="https://cesium.com/ion/" target="_blank">ion资产ID</a>提供，如下所示。需要提供一个<a href="https://cesium.com/ion/tokens" target="_blank">访问Token</a>。</p>
        <monaco-editor v-model="code05" />
        <p>地形也可以作为<span class="code">.terraindb</span>文件提供，如下所示。<span class="code">.terraindb</span>文件可以由Cesium ion的<router-link target="_blank" :to="{ name: '3D-Tiling-On-Prem-Terrain' }">地形瓦片生成器</router-link>生成。</p>
        <monaco-editor v-model="code06" />
        <p>另外，还可以传递一个托管<router-link target="_blank" :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }">地形服务器</router-link>的URL。</p>
        <monaco-editor v-model="code07" />
        <p>请参阅下面的<strong>添加地形</strong>部分，其中包含一个将建筑物与地形一起流式传输的示例。</p>
        <h3>可用选项<span>Available options</span></h3>
        <p>以下是配置瓦片生成器的所有命令行选项的完整列表。</p>
        <h4>基础选项<span>Basic options</span></h4>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>说明</th>
                    <th>必须</th>
                    <th>默认</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--help</span>,<span class="code">-h</span></td>
                    <td>显示帮助信息。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--version</span>,<span class="code">-v</span></td>
                    <td>显示版本号。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input</span>,<span class="code">-i</span></td>
                    <td>一个或多个文件或目录，用于递归搜索<span class="code">CityGML</span>或<span class="code">KML</span>文件。如果未提供<span class="code">--input-list</span>参数，则此参数是必需的。不能与<span class="code">--input-list</span>参数同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input-list</span></td>
                    <td>一个文本文件，其中包含要处理的文件列表，每行一个文件。如果未提供--input参数，则此参数是必需的。不能与<span class="code">--input</span>参数同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input-type</span>,<span class="code">-I</span></td>
                    <td>要转换为瓦片的输入类型。选项为<span class="code">CityGML</span>或<span class="code">KML</span>。</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--output</span>,<span class="code">-o</span></td>
                    <td>输出目录或<span class="code">.3dtiles</span>数据库文件的路径。如果找到现有目录，则会覆盖该目录，否则会创建一个新目录。</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--database</span>,<span class="code">-d</span></td>
                    <td>用于临时数据库的路径。当提供多个输入路径时，这是必需的。</td>
                    <td></td>
                    <td><span class="code">[--input]/../[inputDirectory].sqlite3</span></td>
                </tr>
                <tr>
                    <td><span class="code">--quiet</span></td>
                    <td>在生成瓦片期间禁止输出。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--verbose</span></td>
                    <td>显示详细输出。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--concurrency</span>,<span class="code">-x</span></td>
                    <td>用于CPU处理的最大核心数。实际利用取决于系统资源。在Docker中运行时，建议手动设置此选项，因为容器化会阻止瓦片生成器查询系统资源。</td>
                    <td></td>
                    <td>系统可用</td>
                </tr>
                <tr>
                    <td><span class="code">--per-feature-properties</span>,<span class="code">-r</span></td>
                    <td>对于<span class="code">KML</span>输入，传递一个以空格分隔的属性名称列表，从输入数据中保存为输出瓦片集中的元数据。属性名称区分大小写。对于<span class="code">CityGML</span>输入，所有属性都会自动包含在内。</td>
                    <td></td>
                    <td>Longitude, Latitude, Height</td>
                </tr>
                <tr>
                    <td><span class="code">--tileset-version</span></td>
                    <td>要分配给瓦片集的版本号或字符串。这将被写入<span class="code">tileset.json</span>，并可用作元数据以跟踪更改。</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <h4>地形约束选项<span>Terrain clamping options</span></h4>
        <p>请参阅上面的<strong class="code">对地形进行约束</strong>部分以获取示例。</p>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>说明</th>
                    <th>必须</th>
                    <th>默认</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--terrain</span>,<span class="code">-g</span></td>
                    <td>地形数据库（.terraindb文件）的路径或用于将模型约束到地形的地形服务器的URL。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--ion-terrain</span></td>
                    <td>用于将模型约束到地形的Ion资产的ID。对于Cesium World Terrain，请使用1。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--ion-access-token</span></td>
                    <td>用于检索指定ion地形的访问Token。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--ion-server</span></td>
                    <td>ion REST API的终端URL</td>
                    <td></td>
                    <td><span class="code">https://api.cesium.com</span></td>
                </tr>
            </tbody>
        </table>
        <h4>几何体和压缩选项<span>Geometry and compression options</span></h4>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>说明</th>
                    <th>必须</th>
                    <th>默认</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--disable-geometry-compression</span></td>
                    <td>禁用Draco几何压缩。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--compression-level</span></td>
                    <td>Draco压缩级别介于0和10之间。一般而言，最高设置10将具有最高的压缩率，但解压速度最慢。0将具有最低的压缩率，但解压速度最快。压缩级别不影响精度。</td>
                    <td></td>
                    <td><span class="code">7</span></td>
                </tr>
                <tr>
                    <td><span class="code">--compression-precision-meters</span></td>
                    <td>Draco压缩的精度，以米为单位。默认为毫米级精度。设置为0以实现无损压缩，但会导致较大的瓦片尺寸。</td>
                    <td></td>
                    <td><span class="code">0.001</span></td>
                </tr>
                <tr>
                    <td><span class="code">--gzip</span></td>
                    <td>使用<span class="code">gzip</span>压缩保存瓦片。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--clear-normals</span></td>
                    <td>清除现有的法线并重新生成它们。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--face-normals</span></td>
                    <td>生成面法线。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--smooth-normals</span></td>
                    <td>生成平滑（顶点）法线。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--single-sided</span></td>
                    <td>生成单面几何。默认情况下，双面几何用于改善未封闭几何和建筑内部的渲染，但可能会在CesiumJS中造成性能损失。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
            </tbody>
        </table>
        <p>可以在博客上了解更多关于<a href="https://cesium.com/blog/2018/04/09/draco-compression/" target="_blank">Draco压缩</a>的内容。</p>
        <h4>高级选项<span>Advanced options</span></h4>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>说明</th>
                    <th>必须</th>
                    <th>默认</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--progress-percent</span></td>
                    <td>显示总体进度百分比，而不是每个阶段单独的进度条。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--tiler</span>,<span class="code">-q</span></td>
                    <td>设置瓦片策略。选项包括自适应、均匀网格、非均匀网格、TMS大地测量、TMS WGS84、TMS WebMercator。带有TMS前缀的选项需要设置内容级别选项。请阅读有关不同瓦片方案的文档。</td>
                    <td></td>
                    <td>自适应</td>
                </tr>
                <tr>
                    <td><span class="code">--content-level</span></td>
                    <td>设置最大级别。如果使用--tiler选项的TMS选项，则必须设置该选项。</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <h4>CityGML选项<span>CityGML options</span></h4>
        <p>这些选项是特定于CityGML数据的。</p>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>说明</th>
                    <th>必须</th>
                    <th>默认</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--citygml.sourceSRS</span></td>
                    <td>设置空间参考系统（Spatial Reference System，SRS）以覆盖在输入数据中找到的SRS，例如EPSG、WKT、OGC、URN等。如果CityGML数据没有SRS或存在SRS错误，请使用此选项。</td>
                    <td></td>
                    <td>使用输入数据中的SRS。</td>
                </tr>
                <tr>
                    <td><span class="code">--citygml.levelOfDetail</span></td>
                    <td>仅使用每个对象指定的细节级别（Level of Detail，LOD），忽略其他细节级别。没有指定细节级别的对象将被跳过。</td>
                    <td></td>
                    <td>使用每个对象的最大细节级别（Level of Detail，LOD）。</td>
                </tr>
                <tr>
                    <td><span class="code">--citygml.useKnownMaterials</span></td>
                    <td>对于没有定义颜色的几何体，使用已知材料的颜色。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--citygml.disableColors</span></td>
                    <td>禁用所有颜色，并将白色作为基本颜色。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--citygml.disableTextures</span></td>
                    <td>禁用CityGML数据集中的纹理，并仅使用颜色。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--citygml.enableVertexColors</span></td>
                    <td>使用存储每个顶点的颜色来代替独立的材质。这样做可以在CesiumJS中提高性能，特别是对于包含多种颜色的数据，通过减少绘制调用次数。然而，由于存储了更多的数据，也会占用更多的内存空间。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--citygml.setGroundZero</span></td>
                    <td>如果确定建筑物位于地面上，将建筑物的高度设置为0。当提供地形数据时，此选项将自动设置为true。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
            </tbody>
        </table>
        <h2>下一步<span>Next steps</span></h2>
        <p>现在，我们已经将建筑数据生成为3D瓦片，下一步是将其流式传输到CesiumJS中。要实现这一步，我们需要一个web服务器来托管我们的瓦片，然后我们可以通过将tileset的URL传递给CesiumJS来完成。</p>
        <monaco-editor v-model="code08" height="220px" />
        <p><router-link :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }" target="_blank">托管3D内容</router-link>教程将引导设置Cesium ion资产服务器，并使用CesiumJS来流式传输3D瓦片和地形数据。</p>
        <h3>添加地形<span>Adding terrain</span></h3>
        <p>如果瓦片几是紧贴在<a href="https://cesium.com/content/cesium-world-terrain/" target="_blank">Cesium World Terrain</a>上的，按照下面的示例将其添加到viewer中：</p>
        <monaco-editor v-model="code09" />
        <p>如果正在托管自己的地形数据，可以将URL传递给地形服务器：</p>
        <monaco-editor v-model="code10" />
        <p>请阅读关于<router-link :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }" target="_blank">托管3D内容</router-link>的教程，来提供更多地形服务的信息。</p>
        <h2>许可<span>License</span></h2>
        <p>第三方授权的瓦片生成器可以在<span class="code">ThirdParty.pdf</span>中找到。</p>
        <el-affix position="bottom">
<!--  <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-3d-buildings/" target="_blank">原文</a></div>-->
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/on-prem/on-prem-3d-buildings/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style lang="scss" scoped>
.table-01 tr {

    td:nth-child(2) {
        font-size: 12px;
    }

    th:nth-child(3),
    th:nth-child(4) {
        text-align: center;
    }

    td:nth-child(3) {
        width: 36px;
        text-align: center;
        font-size: 16px;
        line-height: 1;
        color: #14838d;
    }

    td:nth-child(4) {
        min-width: 36px;
    }
}
</style>
