<script setup>
import { ref }                 from 'vue';
import { sourceSampleDataUrl } from '@/assets/js/cfg';


const code01 = ref({
    shell: `point-cloud-tiler -i <input.las> -o <output-directory>`
});

const code02 = ref({
    shell: `point-cloud-tiler -i SampleData/House.laz -o House_Tiles`
});

const code03 = ref({
    shell: `point-cloud-tiler -i SampleData -o House_Tiles`
});

const code04 = ref({
    shell: `point-cloud-tiler -i SampleData/House.laz -o House_Tiles --longitude=-105.290735 --latitude=40.040382 --height=1680.034796`
});

const code05 = ref({
    shell: `point-cloud-tiler -i SampleData/House.laz -o Tileset --draco-precision-meters=0.005`
});

const code06 = ref({
    shell: `point-cloud-tiler -i SampleData/House.laz -o Tileset --compression=NONE`
});

const code07 = ref({
    shell: `point-cloud-tiler -i SampleData/House.laz -o House_Tiles --discard-color --discard-classification --discard-intensity`
});

const code08 = ref({
    shell: `point-cloud-tiler -i SampleData/House.laz -o House_Tiles --memory=16000 --concurrency=8`
});

const code09 = ref({
    js: `var viewer = new Cesium.Viewer('cesiumContainer');

var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : '<tileset.json的URL>'
}));

viewer.zoomTo(tileset);`
});
</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>本地使用点云瓦片生成器<span>Using the Point Cloud Tiler On-Premises</span></h1>
        <div class="note">
            <p>寻找本地部署的3D瓦片？请联系销售进行评估。<a href="https://cesium.com/contact/" target="_blank">联系销售</a>。</p>
        </div>
        <h2>安装<span>Setup</span></h2>
        <p>解压缩<span class="code">Cesium-ion-3D-Tiling-Pipeline.zip</span>文件的内容。</p>
        <p>主要的可执行文件是<span class="code">point-cloud-tiler</span>，可以在<span class="code">bin</span>目录下找到。</p>
        <p>如果希望运行示例，请下载并将<a :href="sourceSampleDataUrl" download>SampleData.zip</a>解压缩到一个名为<strong>SampleData</strong>的新目录中。</p>
        <h2>Windows<span>Windows</span></h2>
        <p>Windows二进制文件需要安装<span class="code">Visual Studio 2017</span>的<span class="code">Visual C++ Redistributable</span>组件。请<a download href="https://aka.ms/vs/15/release/vc_redist.x64.exe">下载</a>并运行该安装程序。</p>
        <h2>使用瓦片生成器<span>Using the tiler</span></h2>
        <p>瓦片生成器常用命令参照以下格式：</p>
        <monaco-editor v-model="code01" />
        <p>例如，<span class="code">SampleData/House.laz</span>中包含了一个简单的LAZ点云房屋。通过运行以下命令生成瓦片：</p>
        <monaco-editor v-model="code02" />
        <p>这将在<span class="code">House_Tiles</span>目录中生成一个3D瓦片数据集。</p>
        <p>也可以转换目录及其子目录中的所有LAS文件。</p>
        <monaco-editor v-model="code03" />
        <p>如果输入的点云没有地理参考，可以提供如下所示的WGS84椭球体上的经度、纬度和高度。</p>
        <monaco-editor v-model="code04" />
        <p>瓦片生成器内置了对<a href="https://github.com/google/draco" target="_blank">Draco压缩</a>的支持，该功能默认是启用的。可以通过以下方式配置精度：</p>
        <monaco-editor v-model="code05" />
        <p>要禁用压缩，请使用以下命令。</p>
        <monaco-editor v-model="code06" />
        <p>默认情况下，瓦片生成器会保留每个点的<span class="code">颜色</span>、<span class="code">分类</span>和<span class="code">强度</span>属性。使用以下选项可以丢弃这些属性，从而减小瓦片集的大小。</p>
        <monaco-editor v-model="code07" />
        <p>可以提供内存使用量和并发性，以精细控制系统资源。在Docker内运行时，建议手动设置这些参数，因为容器化阻止了瓦片生成器查询系统资源。</p>
        <monaco-editor v-model="code08" />
        <p>注意：处理大点云时，请确保磁盘上有足够的空间用于生成期间使用的临时文件。通常，所需的临时空间量不会超过输入点云的大小。切片器完成后，临时文件将被删除。</p>
        <h3>可用选项<span>Available options</span></h3>
        <p>以下是用于配置瓦片生成工具的命令行选项列表。</p>
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
                    <td>一个或多个输入文件或目录（递归）。支持的类型：<span class="code">.las</span>、<span class="code">.laz</span>。如果没有提供<span class="code">--input-list</span>，则<span class="code">必须</span>提供此参数。不能与<span class="code">--input-list</span>同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input-list</span></td>
                    <td>一个文本文件，其中包含要处理的文件列表，每行一个文件。支持的类型：<span class="code">.las</span>、<span class="code">.laz</span>。如果没有提供<span class="code">--input</span>，则<span class="code">必须</span>提供此参数。不能与<span class="code">--input</span>同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--output</span>,<span class="code">-o</span></td>
                    <td>输出目录的路径。如果存在该目录，则会覆盖现有目录；否则将创建一个新目录。</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--quiet</span></td>
                    <td>在生成瓦片期间禁止输出。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--verbose</span></td>
                    <td>显示详细输出。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--show-statistics-only</span></td>
                    <td>显示输入点云的统计信息。不会运行瓦片生成器。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--memory</span>,<span class="code">-m</span></td>
                    <td>限制瓦片生成器在兆字节中使用的最大内存。默认情况下，瓦片生成器将使用可用的系统内存。如果输入点云超过此限制，瓦片生成器将以外部存储模式运行。在Docker内运行时，建议手动设置此参数，因为容器化阻止了瓦片生成器查询系统资源。</td>
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
                    <td><span class="code">--io-concurrency</span></td>
                    <td>I/O处理的最大并发线程数。默认为并发值。建议将此设置为1，以便在较慢的存储设备（如硬盘驱动器）上使用。</td>
                    <td></td>
                    <td><span class="code">concurrency</span></td>
                </tr>
                <tr>
                    <td><span class="code">--compression</span></td>
                    <td>使用的点压缩类型。选项包括<span class="code"><a href="https://github.com/google/draco" target="_blank">DRACO</a></span>、<span class="code"><a href="https://github.com/CesiumGS/3d-tiles/tree/master/specification/TileFormats/PointCloud#quantized-positions" target="_blank">QUANTIZE</a></span>和<span class="code">NONE</span>。</td>
                    <td></td>
                    <td><span class="code">DRACO</span></td>
                </tr>
                <tr>
                    <td><span class="code">--gzip</span></td>
                    <td>使用gzip压缩保存瓦片。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
            </tbody>
        </table>
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
                    <td><span class="code">--working-directory</span></td>
                    <td>用于在瓦片生成过程中保存临时文件的工作目录。默认为系统的临时目录。通常所需的临时空间不超过输入点云的大小。当瓦片生成完成后，此目录将被删除。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--draco-compression-level</span></td>
                    <td>Draco压缩级别在0到10之间。一般来说，最高设置10，将具有最大的压缩效果但解压速度最慢。0将具有最小的压缩效果但解压速度最快。这并不影响精度。</td>
                    <td></td>
                    <td><span class="code">7</span></td>
                </tr>
                <tr>
                    <td><span class="code">--draco-precision-meters</span></td>
                    <td>Draco压缩的精度，以米为单位。默认为毫米精度。设置为0表示无损压缩，这将产生更大的瓦片集大小。</td>
                    <td></td>
                    <td><span class="code">0.001</span></td>
                </tr>
                <tr>
                    <td><span class="code">--quadtree</span></td>
                    <td>是否构建四叉树而不是八叉树。这通常适用于较平坦的点云，例如由航空激光雷达产生的点云。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--input-crs</span></td>
                    <td>要应用于数据的坐标参考系统。它会覆盖数据本身内嵌的任何坐标参考系统（CRS）。可以使用<span class="code">WKT</span>、<span class="code">proj.4</span>或<span class="code">EPSG字符串</span>来明确指定。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--longitude</span></td>
                    <td>在点云未进行地理参照时，以<span class="code">EPSG:4326</span>坐标（度）表示的<span class="code">经度</span>，用于设定点云的原点位置。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--latitude</span></td>
                    <td>在点云未进行地理参照时，以<span class="code">EPSG:4326</span>坐标（度）表示的<span class="code">纬度</span>，用于设定点云的原点位置。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--height</span></td>
                    <td>在点云未经地理参考时，以相对于<span class="code">WGS84</span>椭球体的高度（米）来确定点云原点的位置。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--heading</span></td>
                    <td>将以度（弧度）为单位的本地正北方向Y轴旋转角度：偏航角（其中正角度向东递增）。只在点云未进行地理参照时适用。</td>
                    <td></td>
                    <td><span class="code">0, 0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--pitch</span></td>
                    <td>从当地东北平面开始的旋转角度（弧度）。正的仰角在平面上方，负的俯仰角在平面下方。只在点云未进行地理参照时适用。</td>
                    <td></td>
                    <td><span class="code">0, 0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--roll</span></td>
                    <td>应用于当地Z轴的旋转角度（弧度）。只在点云未进行地理参照时适用。</td>
                    <td></td>
                    <td><span class="code">0, 0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--scale-x</span></td>
                    <td>在x方向上的缩放比例。如果点云进行了地理参照，那么将不会应用缩放。</td>
                    <td></td>
                    <td><span class="code">1.0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--scale-y</span></td>
                    <td>在y方向上的缩放比例。如果点云进行了地理参照，那么将不会应用缩放。</td>
                    <td></td>
                    <td><span class="code">1.0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--scale-z</span></td>
                    <td>在z方向上的缩放比例。如果点云进行了地理参照，那么将不会应用缩放。</td>
                    <td></td>
                    <td><span class="code">1.0</span></td>
                </tr>
                <tr>
                    <td><span class="code">--minimum-height</span></td>
                    <td>相对于WGS84椭球体的高度（以米为单位），<span class="code">低</span>于此高度的点将被移除。这是一种简单的去除异常值的指标。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--maximum-height</span></td>
                    <td>相对于WGS84椭球体的高度（以米为单位），<span class="code">高</span>于此高度的点将被移除。这是一种简单的去除异常值的指标。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--keep-outliers</span></td>
                    <td>绕过检测和移除异常值的逻辑。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--outlier-sigma-count</span></td>
                    <td>用于异常值检测，标准差与均值相差多少被认为是异常值。</td>
                    <td></td>
                    <td><span class="code">15</span></td>
                </tr>
                <tr>
                    <td><span class="code">--outlier-sweep-count</span></td>
                    <td>用于异常值检测，限制执行多少次迭代以确定最佳拟合边界体。</td>
                    <td></td>
                    <td><span class="code">2</span></td>
                </tr>
                <tr>
                    <td><span class="code">--discard-color</span></td>
                    <td>丢弃点的颜色属性。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--discard-intensity</span></td>
                    <td>丢弃点的强度属性。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--discard-classification</span></td>
                    <td>丢弃点的分类属性。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--pretty-json</span></td>
                    <td>用可读的格式编写tileset.json。</td>
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
        <p>现在我们已经将点云生成3D瓦片集，下一步是将它们流式传输到CesiumJS中。我们只需要一个web服务器来托管我们的瓦片，然后就可以像下面所示传递瓦片集的URL了。</p>
        <monaco-editor v-model="code09" height="180px" />
        <p><router-link :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }" target="_blank">托管3D内容</router-link>将引导设置Cesium ion资产服务器并使用CesiumJS流式传输图像。</p>
        <h2>许可<span>License</span></h2>
        <p>第三方授权的瓦片生成器可以在<span class="code">ThirdParty.pdf</span>中找到。</p>
        <p>专利: US10438092</p>
        <p>专利 Pending: US17/100,522 US63/052,864</p>
        <el-affix position="bottom">
<!--            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-point-clouds/" target="_blank">原文</a></div>-->
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/on-prem/on-prem-point-clouds/" target="_blank">原文</a></div>
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
