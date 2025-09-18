<script setup>
import { ref }                 from 'vue';
import { sourceSampleDataUrl } from '@/config.js';


const code01 = ref({
    shell: `model-tiler -I <input-type> -i <input1.obj> <input2.dae> -o <output-directory>`
});

const code02 = ref({
    shell: `model-tiler -I BIM -i SampleData/OfficePlan/OfficePlan.obj -o OfficePlan_Tiles`
});

const code03 = ref({
    shell: `model-tiler -I PHOTOGRAMMETRY -i SampleData/AGI_HQ/AGI_HQ.obj -o AGI_HQ_Tiles`
});

const code04 = ref({
    shell: `model-tiler -I PHOTOGRAMMETRY -i SampleData/AGI_HQ/AGI_HQ.obj -o AGI_HQ_Tiles --longitude=-75.5967013459 --latitude=40.0386977494 --height=50`
});

const code05 = ref({
    shell: `model-tiler -I PHOTOGRAMMETRY -i Model.obj -o Tileset --concurrency=4`
});

const code06 = ref({
    shell: `model-tiler -I PHOTOGRAMMETRY -i Model.obj -o Tileset --compression-level=5`
});

const code07 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');
const tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: '<tileset.json>的URL'
    })
);

viewer.zoomTo(tileset);`
});

const code08 = ref({
    shell: `# house.obj - OBJ文件使用“v”来指定位置，并使用“#”来进行内联注释。

# 烟囱顶端
v 0 0 0

# 烟囱顶端下方的第二层（美国/加拿大习惯）
v 0 0 -6

# 烟囱顶端下方的地面层
v 0 0 -9`
});

const code09 = ref({
    shell: `model-tiler -I PHOTOGRAMMETRY -i Model.obj -o Tileset --memory=8192 --input-up-axis=Y`
});
</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>本地使用模型瓦片生成器<span>Using the Model Tiler On-Premises</span></h1>
        <div class="note">
            <p>寻找本地部署的3D瓦片？请联系销售进行评估。<a href="https://cesium.com/contact/" target="_blank">联系销售</a>。</p>
        </div>
        <h2>安装<span>Setup</span></h2>
        <p>解压缩<span class="code">Cesium-ion-3D-Tiling-Pipeline.zip</span>文件的内容。</p>
        <p>主要的可执行文件是<span class="code">model-tiler</span>，可以在<span class="code">bin</span>目录下找到。</p>
        <p>如果希望运行示例，请下载并将<a :href="sourceSampleDataUrl" download>SampleData.zip</a>解压缩到一个名为<strong>SampleData</strong>的新目录中。</p>
        <h2>Windows<span>Windows</span></h2>
        <p>Windows二进制文件需要安装<span class="code">Visual Studio 2017</span>的<span class="code">Visual C++ Redistributable</span>组件。请<a download href="https://aka.ms/vs/15/release/vc_redist.x64.exe">下载</a>并运行该安装程序。</p>
        <h2>使用瓦片生成器<span>Using the tiler</span></h2>
        <p>瓦片生成器常用命令参照以下格式：</p>
        <monaco-editor v-model="code01" />
        <p>其中<span class="code">&lt;input-type&gt;</span>必须是以下类型之一：</p>
        <ul>
            <li><span class="code">PHOTOGRAMMETRY</span>: 由摄影测绘软件生成的网格模型。</li>
            <li><span class="code">3DSCAN</span>: 由3D扫描仪或LiDAR捕捉的网格模型。</li>
            <li><span class="code">CAD</span>：计算机辅助设计模型。</li>
            <li><span class="code">BIM</span>: 建筑信息模型。包括建筑设计模型和城市模型。</li>
            <li><span class="code">OTHER</span>：所有其他类型的3D模型。如果不确定，可以选择此选项。</li>
        </ul>
        <p>在<span class="code">SampleData/OfficePlan</span>目录中提供了一个BIM示例模型。通过运行以下命令将其转换为3D瓦片格式的瓦片：</p>
        <monaco-editor v-model="code02" />
        <p>这将在<span class="code">OfficePlan_Tiles</span>目录中生成一个3D瓦片数据集。</p>
        <p>摄影测绘工作方式相同。在<span class="code">SampleData/AGI_HQ</span>目录中提供了一个示例的摄影测绘模型。运行以下命令来对其进行瓦片生成：</p>
        <monaco-editor v-model="code03" />
        <p>在合并多个文件时，重要的是验证模型是否使用相同的原点，并且不占用相同的3D空间。</p>
        <p>我们还可以以度为单位指定经度和纬度，并以相对于WGS84参考椭球体的米为单位指定高度，这样在CesiumJS中流式传输时，瓦片集将出现在正确的位置。</p>
        <monaco-editor v-model="code04" />
        <p>这些坐标指定了模型在地图上的原点位置。有关更多详细信息，请参阅下面的<strong>定位输出</strong>部分。</p>
        <p>模型瓦片生成器可以利用多核系统，通过<strong>同时对输入模型的不同空间区域进行瓦片生成</strong>来提高效率。默认情况下，根据可用的系统资源，自动设置并发级别。可以使用<span class="code">--concurrency</span>选项进行手动配置。</p>
        <p>下面的示例启用了最多四路并发。</p>
        <monaco-editor v-model="code05" />
        <p>在Docker容器内运行时，建议手动设置这一选项，因为容器化会阻止瓦片生成器查询系统资源。</p>
        <h3>压缩<span>Compression</span></h3>
        <p>可以使用无损gzip压缩通过<span class="code">--gzip</span>选项来压缩瓦片。这要求在服务器上将HTTP头中的<span class="code">content-encoding</span>设置为<span class="code">gzip</span>。</p>
        <p><a href="https://github.com/google/draco" target="_blank">Draco</a>压缩用于网格，默认情况下启用，并且在最小精度损失下大大优化了流式传输速度。请查看<a href="https://cesium.com/blog/2018/04/09/draco-compression/" target="_blank">博客文章</a>了解更多信息。使用<span class="code">--compression-level</span>选项来设置压缩级别，范围从0（最低压缩）到10（最高压缩），如下所示。</p>
        <monaco-editor v-model="code06" />
        <p>可以使用<span class="code">--disable-geometry-compression</span>选项来禁用Draco压缩。</p>
        <h3>可用选项<span>Available options</span></h3>
        <p>以下是用于配置瓦片生成工具的命令行选项列表。</p>
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
                    <td>需要瓦片的OBJ和/或DAE文件的路径。如果没有提供<span class="code">--input-list</span>，则为必需项。不能与<span class="code">--input</span>参数同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input-list</span></td>
                    <td>一个文本文件，其中包含要处理的文件列表，每行一个文件，用于指定要处理的文件列表。如果没有提供<span class="code">--input</span>参数，则此参数是必需的。不能与<span class="code">--input</span>参数同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input-type</span></td>
                    <td>需要进行瓦片的输入类型。选项包括<span class="code">PHOTOGRAMMETRY</span>、<span class="code">3DSCAN</span>、<span class="code">CAD</span>、<span class="code">BIM</span>和<span class="code">OTHER</span>。更多详情请参阅下面的使用瓦片生成工具部分。</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--output</span>,<span class="code">-o</span></td>
                    <td>输出目录或<span class="code">.3dtiles</span>数据库文件的路径。如果该目录已存在，将覆盖现有目录；否则将创建一个新目录。</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
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
                    <td><span class="code">--memory</span>,<span class="code">-m</span></td>
                    <td>用于瓦片生成过程中可使用的内存量，单位为<span class="code">megabytes</span>。在Docker内运行时，建议手动设置此项，因为容器化会阻止瓦片生成器查询系统资源。</td>
                    <td></td>
                    <td>系统可用</td>
                </tr>
                <tr>
                    <td><span class="code">--concurrency</span>,<span class="code">-x</span></td>
                    <td>同时进行瓦片处理的最大处理器数量。实际利用情况取决于系统资源。在Docker环境中运行时，建议手动设置此值，因为容器化会阻止瓦片生成器查询系统资源。</td>
                    <td></td>
                    <td>系统可用</td>
                </tr>
                <tr>
                    <td><span class="code">--input-up-axis</span></td>
                    <td>当设置时，将覆盖模型的默认向上轴，并将给定的轴视为向上轴。默认情况下，对于<span class="code">PHOTOGRAMMETRY</span>（摄影测绘）和<span class="code">3DSCAN</span>（三维扫描），obj 被视为 z-up，对于<span class="code">BIM</span>（建筑信息模型）、<span class="code">CAD</span>（计算机辅助设计）和<span class="code">OTHER</span>（其他情况下），被视为 y-up；gltf 始终为 y-up，dae 使用<span class="code">&lt;asset&gt;&lt;up_axis&gt;</span>中指定的向上轴。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--longitude</span></td>
                    <td>在<span class="code">EPSG:4326</span>坐标系中（单位为度），用于放置模型原点的经度。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--latitude</span></td>
                    <td>在<span class="code">EPSG:4326</span>坐标系中（单位为度），用于放置模型原点的纬度。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--height</span></td>
                    <td>以米为单位相对于WGS84椭球体的高度，用于放置模型原点。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--heading</span></td>
                    <td>将以度（弧度）为单位的本地正北方向Y轴旋转角度：偏航角（其中正角度向东递增）。</td>
                    <td></td>
                    <td><span class="code">0, 0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--pitch</span></td>
                    <td>从当地东北平面开始的旋转角度（弧度）。正的仰角在平面上方，负的俯仰角在平面下方。</td>
                    <td></td>
                    <td><span class="code">0, 0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--roll</span></td>
                    <td>应用于当地Z轴的旋转角度（弧度）。</td>
                    <td></td>
                    <td><span class="code">0, 0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--scale</span>,<span class="code">-s</span></td>
                    <td>应用于模型的均匀缩放比例。瓦片生成器假设输入模型的单位为米。</td>
                    <td></td>
                    <td><span class="code">1.0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--texture-format</span></td>
                    <td>编码纹理时要使用的图像格式。当设置为<span class="code">AUTO</span>时，它会根据输入选择最佳格式。选项包括<span class="code">PNG</span>、<span class="code">JPEG</span>、<span class="code">WEBP</span>、<span class="code">WEBPLOSSLESS</span>和<span class="code">AUTO</span>。</td>
                    <td></td>
                    <td><span class="code">AUTO</span></td>
                </tr>
                <tr>
                    <td><span class="code">--texture-quality</span></td>
                    <td>编码纹理时要使用的图像质量。范围是从<span class="code">0</span>（最差质量，最小文件大小）到<span class="code">100</span>（最佳质量，最大文件大小）。仅在<span class="code">--texture-format</span>为<span class="code">JPEG</span>或<span class="code">WEBP</span>时有效。</td>
                    <td></td>
                    <td><span class="code">80</span></td>
                </tr>
                <tr>
                    <td><span class="code">--compression-level</span></td>
                    <td>Draco压缩级别介于0和10之间。一般来说，最高设置10会有最多的压缩，但解压速度最慢。0会有最少的压缩，但解压速度最快。压缩级别不影响精度。</td>
                    <td></td>
                    <td><span class="code">7</span></td>
                </tr>
                <tr>
                    <td><span class="code">--compression-precision-meters</span></td>
                    <td>Draco压缩的精度单位为米，默认为毫米级精度。设置为0可实现无损压缩，但会产生更大的瓦片尺寸。</td>
                    <td></td>
                    <td><span class="code">0.001</span></td>
                </tr>
                <tr>
                    <td><span class="code">--disable-geometry-compression</span></td>
                    <td>禁用Draco几何压缩。有关更多详细信息，请参阅<strong>压缩</strong>部分。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--gzip</span></td>
                    <td>使用gzip压缩保存瓦片。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--double-sided</span></td>
                    <td>当为true时，将生成双面几何体。当几何体不是封闭的，或者需要能够从CesiumJS内部查看它时使用。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--tileset-version</span></td>
                    <td>要分配给瓦片集的版本号或字符串。这将被写入<span class="code">tileset.json</span>，并可用作元数据以跟踪更改。</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <h2>下一步<span>Next steps</span></h2>
        <p>现在已将模型生成3D瓦片，接下来的步骤是将它们流式传输到CesiumJS中。我们只需要一个web服务器来托管我们的瓦片，然后我们可以像下面展示的那样将URL传递给我们的瓦片集。</p>
        <monaco-editor v-model="code07" height="210px" />
        <p><router-link :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }" target="_blank">托管3D内容</router-link>教程将指导设置Cesium ion资产服务器，并使用CesiumJS流式传输3D内容。</p>
        <h2>定位输出<span>Positioning the output</span></h2>
        <p><span class="code">longitude</span>、<span class="code">latitude</span>和<span class="code">height</span>选项允许控制模型原点的位置，我们将其定义为模型空间中的笛卡尔坐标(0, 0, 0)。在指定的OBJ文件中的所有位置（或者在指定的COLLADA或glTF文件中的所有转换后的位置）都是相对于这个原点的以米为单位的笛卡尔偏移量。例如，如果一个房屋模型的原点是烟囱的顶端，那么大部分的房屋坐标将会是负数，因为它们指定的点位于烟囱下方，因此位于(0, 0, 0)之下。</p>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/on-premise-models-house.png"></p>
        <monaco-editor v-model="code08" height="240px" />
        <p>当对数据集进行瓦片生成时，输入的坐标应该是模型原点的<span class="code">经度</span>、<span class="code">纬度</span>和<span class="code">高度</span>，其中高度相对于WGS84参考椭球体。</p>
        <p>所以，如果烟囱顶端（模型的原点）离地面层有9米高，且目标的CesiumJS应用没有使用地形，那么输入<span class="code">高度</span>为<span class="code">9</span>将会使模型的地面层直接放置在椭球表面上。</p>
        <p>如果应用程序使用地形，我们在放置模型时需要考虑这一点。假设我们希望房屋位于比WGS84参考椭球体高10米的山上。我们将10米（地形高度）加到模型原点高度的9米上。提供一个输入<span class="code">高度</span>为<span class="code">19</span>将使房屋数据集与模型的地面楼层放置在地形上。</p>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/on-premise-models-heights.png"></p>
        <p>如果我们仅考虑模型的原始位置，并提供一个输入<span class="code">高度</span>为<span class="code">9</span>的参数，那么在CesiumJS中，这个房子将会出现在地形之下。因为输入的<span class="code">高度</span>是相对于WGS84椭球体，而不是相对于地形。换句话说，瓦片集是在椭球体表面上，但椭球体表面被埋在了地形之下。</p>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/on-premise-models-wrongHeightTerrain.png"></p>
        <p>同样，如果我们提供一个输入<span class="code">高度</span>为<span class="code">10</span>的参数，那么在CesiumJS中，这个房子将会出现在地形之下。因为我们考虑了地形，但没有考虑模型原始位置的高度。</p>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/on-premise-models-wrongHeightOrigin.png"></p>
        <p>以上的例子主要关注于<span class="code">高度</span>，但<span class="code">经度</span>和<span class="code">纬度</span>也是以相同的方式相对于模型的原始位置。</p>
        <p>如这个<a href="https://sandcastle.cesium.com/?src=3D%20Tiles%20Adjust%20Height.html&label=3D%20Tiles" target="_blank">Sandcastle示例</a>所示，生成的瓦片集的位置也可以在CesiumJS中进行偏移。</p>
        <h2>故障排除<span>Troubleshooting</span></h2>
        <h3>在CesiumJS中，瓦片集是横向的<span>Tileset is sideways in CesiumJS</span></h3>
        <p>请检查输入<span class="code">input-up-axis</span>（上轴）选项，默认情况下，对于OBJ文件来说这个选项是<span class="code">Z</span>。瓦片集被横置可能表明需要将此选项改为<span class="code">input-up-axis=Y</span>，如下图所示。</p>
        <monaco-editor v-model="code09" />
        <h3>在CesiumJS中，瓦片集的位置不正确<span>Tileset isn't in the right location in CesiumJS</span></h3>
        <p>在运行瓦片生成器时，请确保指定了<span class="code">--longitude</span>（经度）、<span class="code">--latitude</span>（纬度）和<span class="code">--height</span>（高度）。<span class="code">经度</span>和<span class="code">纬度</span>以度为单位，<span class="code">经度</span>范围在(-180, 180)之间，<span class="code">纬度</span>范围在(-90, 90)之间。<span class="code">高度</span>以米为单位。</p>
        <p>请注意，这些选项区分大小写。请参阅上面的<strong>定位输出</strong>部分获取更多详细信息。</p>
        <h3>在 CesiumJS 中，瓦片集太小或太大<span>Tileset is too small or too large in CesiumJS</span></h3>
        <p>瓦片生成器假定输入模型的单位为米。可以使用<span class="code">--scale</span>选项进行调整。</p>
        <h3>在CesiumJS中，输出模型中没有纹理<span>No textures in the output model in CesiumJS</span></h3>
        <p>如果使用OBJ文件，请确保纹理可以通过<span class="code">.mtl</span>文件访问，并且<span class="code">.obj</span>文件可以访问<span class="code">.mtl</span>文件。瓦片生成器支持<span class="code">.jpeg/.jpg</span>和<span class="code">.png</span>类型的纹理。</p>
        <p>为达到最佳效果，请使用二次幂大小的纹理。</p>
        <h3>瓦片集中缺少一些三角形<span>Some triangles are missing from the tileset</span></h3>
        <p>输入模型可能没有使用一致的绕序方式，因此一些三角形可能朝内部方向，导致它们在错误的一侧呈现。使用<span class="code">--double-sided</span>选项生成一个强制所有三角形双面朝向的瓦片集。但这可能会在CesiumJS中稍微影响性能。</p>
        <h2>许可<span>License</span></h2>
        <p>第三方授权的瓦片生成器可以在<span class="code">ThirdParty.pdf</span>中找到。</p>
        <p>专利: US10878613 US10878628 US10872469</p>
        <el-affix position="bottom">
<!--  <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-models/" target="_blank">原文</a></div>-->
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/on-prem/on-prem-models/" target="_blank">原文</a></div>
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
        min-width: 60px;
    }
}
</style>
