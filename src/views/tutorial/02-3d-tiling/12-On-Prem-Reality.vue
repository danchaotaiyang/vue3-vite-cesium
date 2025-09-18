<script setup>
import { ref } from 'vue';


const code01 = ref({
    shell: `./bin/tilers --help`
});

const code02 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json`
});

const code03 = ref({
    shell: `npm install -g http-server`
});

const code04 = ref({
    shell: `cd directory/with/tilesets/
http-server --port 8002 --cors`
});

const code05 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');

const createTileset = async () => {

    // 这个瓦片集没有地理参考，因此我们必须在运行时提供一个模型矩阵。
    // 将瓦片集放置在经度和纬度坐标 (0, 0)，并且距离椭球体表面10米的位置。
    const tilesetPosition = Cesium.Cartesian3.fromRadians(0, 0, 10);
    const modelMatrix = Cesium.Transform.eastNorthUpToFixedFrame(tilesetPosition);

    // 创建瓦片集图元。
    const tileset = await Cesium.Cesium3DTileset.fromUrl(
        'http://localhost:8002/output/tileset.json',
        { modelMatrix }
    );

    // 把它添加到场景中。
    viewer.scene.primitives.add(tileset);

    // 将相机拉到到瓦片集。
    await viewer.zoomTo(tileset);
};

createTileset().catch(console.error);`
});

const code06 = ref({
    shell: `./bin/tilers -i path/to/model.obj -o output/tileset.json`
});

const code07 = ref({
    shell: `# 将模型放置在芝加哥市中心上方。
# 经度和纬度以度为单位。
# 高度以米为单位，相对于WGS84椭球体而言。
./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --longitude -87.6298 --latitude 41.8781 --height 100`
});

const code08 = ref({
    shell: `# 将模型定位在费城中心上空，使用
# 宾夕法尼亚南部州平面坐标系统（EPSG:2272）
./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --input-crs EPSG:2272 --input-crs-origin-x 2693526.706772 --input-crs-origin-y 236133.329462 --input-crs-origin-z 100`
});

const code09 = ref({
    xml: `<?xml version="1.0" encoding="utf-8"?>
<ModelMetadata version="1">
    <!--Spatial Reference System-->
    <SRS>EPSG:28355+5773</SRS>
    <!--Origin in Spatial Reference System-->
    <SRSOrigin>319000,5813000,0</SRSOrigin>
    <!-- ... -->
</ModelMetadata>`
});

const code10 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --input-crs EPSG:28355+5773 --input-crs-origin-x 319000 --input-crs-origin-y 5813000 --input-crs-origin-z 0`
});

const code11 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --gzip`
});

const code12 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --geometric-compression DRACO`
});

const code13 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --geometric-compression DRACO --compression-precision-meters 0.01`
});

const code14 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --geometric-compression MESHOPT`
});

const code15 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --geometric-compression MESHOPT --compression-precision-meters 0.01`
});

const code16 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --geometric-compression QUANTIZATION --compression-precision-meters 0.01`
});

const code17 = ref({
    shell: `# 使用KTX2进行纹理压缩
./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --color-texture-compression KTX2`
});

const code18 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --color-texture-compression JPEG`
});

const code19 = ref({
    shell: `./bin/tilers -i example/data/duck/duck.obj -o output/duck/tileset.json --color-texture-compression PNG  `
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>Cesium 3D实境瓦片生成器<span>Cesium 3D Tiling Pipeline Reality Tiler</span></h1>
        <p>实境瓦片生成器将摄影测绘与现实模型瓦片化，生成优化的<a href="https://github.com/CesiumGS/3d-tiles/tree/draft-1.1/specification" target="_blank">3D Tiles 1.1</a>瓦片集，用于运行时流式传输和可视化。</p>
        <h2>快速指南<span>Quickstart guide</span></h2>
        <h3>前提条件<span>Prerequisites</span></h3>
        <h4>Linux系统<span>Linux</span></h4>
        <ul>
            <li>支持glibc 2.28的操作系统，例如：
                <ul>
                    <li>AlmaLinux 8.8 或更高版本</li>
                    <li>Ubuntu 18.10 或更高版本</li>
                </ul>
            </li>
        </ul>
        <h4>Windows系统<span>Windows</span></h4>
        <ul>
            <li>最低操作系统要求：Windows 10 或 Windows Server 2019</li>
            <li>Visual Studio 2022的Visual C++可再发行组件。<a download href="https://aka.ms/vs/17/release/vc_redist.x64.exe">下载</a>并运行安装程序。</li>
        </ul>
        <h4>安装许可证<span>Installing the license</span></h4>
        <p>运行瓦片生成器需要许可证。许可文件将与此打包构建分开提供。</p>
        <p>将许可证复制到与瓦片生成器可执行文件相同的目录中。默认情况下，可执行文件位于bin/tilers目录下，因此许可证必须保存为bin/license。</p>
        <h3>使用<span>Usage</span></h3>
        <h4>打印帮助<span>Print help</span></h4>
        <monaco-editor v-model="code01" />
        <h4>运行实境瓦片生成器<span>Run the Reality Tiler</span></h4>
        <monaco-editor v-model="code02" />
        <h3>查看瓦片集<span>Viewing tilesets</span></h3>
        <p>要查看输出的瓦片集，需要一个支持<a href="https://github.com/CesiumGS/3d-tiles/tree/draft-1.1/specification" target="_blank">3D Tiles 1.1</a>的渲染引擎，例如以下之一。</p>
        <ul>
            <li><a href="https://github.com/CesiumGS/cesium" target="_blank">CesiumJS</a> 1.108.1 或更高版本</li>
            <li><a href="https://github.com/CesiumGS/cesium-unreal" target="_blank">Cesium for Unreal</a> 1.25.0 或更高版本</li>
            <li><a href="https://github.com/CesiumGS/cesium-unity" target="_blank">Cesium for Unity</a> 1.1.0 或更高版本</li>
            <li><a href="https://github.com/CesiumGS/cesium-omniverse" target="_blank">Cesium for Omniverse</a> 0.7.0 或更高版本</li>
        </ul>
        <h4>在CesiumJS中查看瓦片集<span>Viewing tilesets in CesiumJS</span></h4>
        <p><span class="code">tilers</span>（瓦片生成器）生成的瓦片集可以通过静态服务器在<a href="https://github.com/CesiumGS/cesium" target="_blank">CesiumJS</a>中查看。</p>
        <h4>建立本地开发的静态服务器<span>Setting up a static server for local development</span></h4>
        <p>对于本地开发，有很多静态服务器可供选择。下面的示例将使用第三方的npm模块<span class="code">http-server</span>，但可以替换为任何其他静态服务器。</p>
        <p>安装<span class="code">http-server</span></p>
        <monaco-editor v-model="code03" />
        <monaco-editor v-model="code04" />
        <p>请注意：</p>
        <ul>
            <li><span class="code">http-server</span>仅用于本地开发，不适用于生产环境</li>
            <li>如有需要，端口号可以进行更改。</li>
            <li>因为https://sandcastle.cesium.com和http://localhost:8002是不同的源，静态服务器必须启用跨源资源共享（CORS），因此需要<span class="code">--cors</span>标志。</li>
            <li>在未来会出于安全的考虑，浏览器可能会像CORS策略一样限制对localhost的访问。请参阅<a href="https://github.com/http-party/http-server/issues/793" target="_blank">http-server issue</a>获取更多信息。</li>
        </ul>
        <h4>在CesiumJS中加载瓦片集<span>Loading the tileset in CesiumJS</span></h4>
        <p>一旦运行了服务器，就可以使用<a href="https://sandcastle.cesium.com/" target="_blank">Sandcastle</a>加载和查看瓦片集。</p>
        <monaco-editor v-model="code05" height="450px" />
        <!--  https://cesium.com/learn/unity/unity-datasets/#step-4-add-a-3d-tileset-from-a-local-directory  -->
        <p>可以通过将URL复制到Cesium 3D瓦片集对象中，在Unreal Engine、Unity或Omniverse中加载这个瓦片集。如需更多信息，请参考<router-link to="" target="_blank">本教程</router-link>。</p>
        <h2>实境瓦片生成器<span>Reality Tiler</span></h2>
        <p>实境瓦片生成器接收大型、带纹理的3D网格，并从中生成3D Tiles 1.1瓦片集。这样做有以下好处：</p>
        <ul>
            <li>输出的瓦片集是网格的分层细节级别（HLOD）表示。</li>
            <li>HLOD结构实现了在不同类型的设备和引擎上进行优化流式传输和渲染。</li>
            <li>几何体、纹理和文件压缩可以应用于瓦片，以减少磁盘上的文件大小并减少网络使用。</li>
        </ul>
        <h3>命令行示例<span>Command line example</span></h3>
        <monaco-editor v-model="code06" />
        <h3>常用选项<span>Frequently used options</span></h3>
        <h4>地理参考瓦片集<span>Georeferencing tilesets</span></h4>
        <h5>手动地理参考瓷砖集<span>Georeference a tileset manually</span></h5>
        <monaco-editor v-model="code07" height="150px" />
        <p>设置输出的位置、方向和比例的选项：</p>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--longitude</span></td>
                    <td>将EPSG:4979坐标系中的<span class="code">经度</span>（以度为单位）转换为数据的原点。</td>
                </tr>
                <tr>
                    <td><span class="code">--latitude</span></td>
                    <td>将EPSG:4979坐标系中的<span class="code">纬度</span>（以度为单位）转换为数据的原点。</td>
                </tr>
                <tr>
                    <td><span class="code">--height</span></td>
                    <td>将EPSG:4979坐标系中的椭球<span class="code">高度</span>（以米为单位）转换为数据的原点。</td>
                </tr>
                <tr>
                    <td><span class="code">--heading</span></td>
                    <td>将以度（弧度）为单位的本地正北方向Y轴旋转角度：偏航角（其中正角度向东递增）。</td>
                </tr>
                <tr>
                    <td><span class="code">--pitch</span></td>
                    <td>从当地东北平面开始的旋转角度（弧度）。正的仰角在平面上方，负的俯仰角在平面下方。</td>
                </tr>
                <tr>
                    <td><span class="code">--roll</span></td>
                    <td>应用于当地Z轴的旋转角度（弧度）。</td>
                </tr>
                <tr>
                    <td><span class="code">--scale-x</span></td>
                    <td>在x方向上的缩放比例。</td>
                </tr>
                <tr>
                    <td><span class="code">--scale-y</span></td>
                    <td>在y方向上的缩放比例。</td>
                </tr>
                <tr>
                    <td><span class="code">--scale-z</span></td>
                    <td>在z方向上的缩放比例。</td>
                </tr>
            </tbody>
        </table>
        <h5>将一个瓦片集与坐标参考系统（CRS）进行地理参考<span>Georeference a tileset with a coordinate reference system (CRS)</span></h5>
        <p>通常，现实世界的数据是基于某种坐标参考系统进行测量的，其中包括地图投影、大地测量坐标（如经度、纬度、高度）以及其他将3D坐标赋予地球表面点的方法。tilers利用PROJ库来解析这些坐标参考系统的数据。</p>
        <monaco-editor v-model="code08" height="150px" />
        <p>在上述示例中，<span class="code">--input-crs</span>指定要使用的CRS。而<span class="code">--input-crs-origin-(x|y|z)</span>选项则设置了一个原点。</p>
        <p>CRS字符串必须是<a href="https://proj.org/" target="_blank">PROJ库</a>支持的格式。常见的例子包括：</p>
        <ul>
            <li>EPSG代码。欧洲石油测量组织（EPSG）维护了一个坐标参考系统和其他大地测量参数的<a href="https://epsg.org/home.html" target="_blank">数据库</a>，每个都有一个唯一的标识符（EPSG代码）。这通常是使用广泛的坐标参考系统的最简单选项。</li>
            <li>开放地理空间联盟（OGC）的<a href="https://www.ogc.org/standard/wkt-crs/" target="_blank">Well-Known Text（WKT）格式</a>。虽然更冗长，但WKT字符串在描述坐标参考系统时更具表现力。</li>
            <li><a href="https://proj.org/en/9.2/usage/quickstart.html" target="_blank">PROJ字符串</a>。这是PROJ的旧格式，但仍然被广泛使用，用于指定CRS。</li>
        </ul>
        <p>要了解PROJ支持的更多CRS字符串的信息，请参阅<a href="https://proj.org/en/9.2/development/reference/functions.html#c.proj_create" target="_blank">proj_create()文档</a>。</p>
        <h5>地理参考ContextCapture输入<span>Georeferencing ContextCapture input</span></h5>
        <p>ContextCapture模型通常在一个附加的XML文件中包含地理参考信息。实境瓦片目前不解析这类文件，但可以通过命令行标志来指定地理参考信息。</p>
        <p>例如，假设输入文件包含以下地理参考信息：</p>
        <monaco-editor v-model="code09" height="210px" />
        <p><span class="code">&lt;SRS&gt;</span>标签（“空间参考系统”）对应于<span class="code">--input-crs</span>标志。<span class="code">SRSOrigin</span>对应于<span class="code">--input-crs-origin-(x|y|z)</span>标志。</p>
        <p>对于上述示例，相应的<span class="code">tilers</span>命令将如下所示：</p>
        <monaco-editor v-model="code10" />
        <div class="note">
            <p>未来发布的3D瓦片数据工作流将自动读取提供CRS信息的附加文件。</p>
        </div>
        <h4>压缩<span>Compression</span></h4>
        <p>3D瓦片数据工作流提供了多种输出的压缩选项。所有文件都可以使用gzip压缩。此外，还可以对输出中的glTF模型应用几何体和纹理压缩。</p>
        <h5>文件压缩：gzip<span>File compression: gzip</span></h5>
        <p>所有输出瓦片集中的文件都可以使用通用gzip压缩进行压缩，只需使用--gzip标志。</p>
        <monaco-editor v-model="code11" />
        <h5>几何压缩：Draco<span>Geometric compression: Draco</span></h5>
        <div class="note">
            <p>此选项在瓦片生成器中默认启用。</p>
        </div>
        <p>Google <a href="https://google.github.io/draco/spec/" target="_blank">Draco库</a>提供了专为3D模型设计的压缩功能。可以使用<span class="code"><a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression" target="_blank">KHR_draco_mesh_compression</a></span>glTF扩展来压缩glTF属性。</p>
        <p>Draco针对小文件大小进行了优化。它可以重新排序顶点以实现更好的压缩效果。</p>
        <p>Draco压缩包括将位置量化到网格上。这是一种有损压缩技术，通过减少位数来换取精度。</p>
        <p>要使用Draco压缩，请设置<span class="code">--geometric-compression</span>DRACO命令行标志。</p>
        <p>示例:</p>
        <monaco-editor v-model="code12" />
        <p>默认情况下，模型会进行1毫米精度的量化。要控制量化精度，请使用<span class="code">--compression-precision-meters</span>标志。例如，要将量化精度更改为1厘米，命令如下：</p>
        <monaco-editor v-model="code13" />
        <h5>几何压缩：网格选择<span>Geometric compression: Meshopt</span></h5>
        <p><a href="https://github.com/zeux/meshoptimizer#vertexindex-buffer-compression" target="_blank">Meshopt</a>是一种针对运行时性能进行优化的3D模型压缩算法。可以使用<span class="code"><a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_meshopt_compression" target="_blank">EXT_meshopt_compression</a></span>扩展来压缩glTF属性。此扩展与KHR_mesh_quantization（参见<a href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-reality-tiler/#quantization" target="_blank">量化</a>）结合使用，以实现更高效（有损）的压缩。</p>
        <p>要同时启用meshopt和量化，请设置<span class="code">--geometric-compression MESHOPT</span>。</p>
        <p>示例:</p>
        <monaco-editor v-model="code14" />
        <p>默认情况下，模型被量化为1毫米的精度。要控制量化程度，请使用<span class="code">--compression-precision-meters</span>标志。例如，要将量化精度更改为1厘米，命令如下所示：</p>
        <monaco-editor v-model="code15" />
        <h5>几何压缩：量化<span>Geometric compression: quantization</span></h5>
        <p>对于不使用压缩的顶点量化，实境瓦片生成器支持作为独立扩展的<span class="code">KHR_mesh_quantization</span>。该扩展将位置量化到由<span class="code">--compression-precision-meters</span>指定的网格上，然后在GPU运行时解码。量化后的位置以整数形式存储，而不是浮点数，从而节省了存储空间。</p>
        <p>要启用量化，请设置<span class="code">--geometric-compression QUANTIZATION</span>，就像以下示例中一样：</p>
        <monaco-editor v-model="code16" />
        <h5>颜色纹理压缩：KTX2<span>Color texture compression: KTX2</span></h5>
        <div class="note">
            <p>此选项在瓦片生成器中默认启用。</p>
        </div>
        <p>对于包含颜色信息的纹理，瓦片生成器支持Khronos纹理（KTX）压缩纹理。<a href="https://www.khronos.org/ktx/" target="_blank">KTX v2.0</a>是一种图像容器格式，支持<a href="https://github.com/BinomialLLC/basis_universal#basis_universal" target="_blank">Basis Universal超级压缩</a>。这些纹理经过优化，可以快速转换为适用于GPU的纹理格式，这些格式因设备和制造商而异。使用<span class="code"><a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_basisu" target="_blank">KHR_texture_basisu</a></span>glTF扩展将此纹理压缩应用于glTF模型。</p>
        <monaco-editor v-model="code17" />
        <p>当<span class="code">--color-texture-compression</span>设置为<span class="code">KTX2</span>时，瓦片生成器使用BasisU的<span class="code">ETC1S</span>模式对纹理进行压缩。该格式使用有损压缩方法，生成比JPEG更小的纹理。在运行时，它转换为GPU压缩纹理格式，占用较小的存储空间。</p>
        <h5>纹理压缩：JPEG<span>Texture compression: JPEG</span></h5>
        <p>瓦片生成器通过<span class="code">--color-texture-compression JPEG</span>选项支持使用JPEG图像作为纹理。JPEG图像比PNG更小，并且比KTX2得到更广泛的支持。不过，JPEG图像采用有损压缩方法。</p>
        <p>示例:</p>
        <monaco-editor v-model="code18" />
        <h5>纹理压缩：PNG<span>Texture compression: PNG</span></h5>
        <p>瓦片生成器通过<span class="code">--color-texture-compression PNG</span>选项支持使用PNG纹理。PNG图像采用无损压缩方法，保留了纹理的细节，而不会引入任何 <el-tooltip placement="top-start"><span class="code">伪影</span><template #content>纹理中的伪影是指由于图像压缩算法和色彩深度限制导致的视觉上的不连续或失真效果。<br>这些伪影可能表现为块状瑕疵、颜色波纹、边缘锯齿等。这些伪影可以降低纹理的质量和真实感。</template></el-tooltip>，但代价是较大的文件大小。</p>
        <monaco-editor v-model="code19" />
        <h3>离核处理<span>Out-of-core processing</span></h3>
        <p>3D瓦片数据工作流使用磁盘空间进行离核（OOC）处理，用于处理大型数据集，这些数据集无法容纳在物理内存中。</p>
        <ul>
            <li>建议使用固态NVMe硬盘以获得最佳性能。</li>
            <li>确保运行瓦片生成器的磁盘具有足够的可用空间。建议的空间大小是输入数据的5-10倍。</li>
            <li>如果在瓦片生成器运行时中断，请清理名为<span class="code">tilers_*.mmap</span>的临时文件。默认情况下，这些文件存储在系统临时文件目录中，通常为：
                <ul>
                    <li><strong>Linux</strong>：<span class="code">/tmp</span></li>
                    <li><strong>Windows</strong>：<span class="code">C:\Users\&lt;username&gt;\AppData\Local\Temp</span></li>
                </ul>
            </li>
        </ul>
        <h3>常见问题解答<span>Frequently asked questions</span></h3>
        <h4>瓦片集旋转了90度<span>Tileset is rotated 90 degrees</span></h4>
        <p>如果输出的瓦片集显示与正确方向相比旋转了90度，请检查原始数据集中哪个轴向是朝上的，并相应地设置<span class="code">--input-up-axis</span>参数。默认情况下，3D瓦片数据工作流假设glTF模型使用y-up坐标系，而OBJ模型使用z-up坐标系。</p>
        <p><span class="code">--input-up-axis</span>设置与<span class="code">--input-crs</span>选项互斥，因为后者假设数据使用CRS的坐标系统。</p>
        <h4>瓦片集显示在地球的中心位置<span>Tileset appears at the center of the earth</span></h4>
        <p>如果瓦片集出现在地球的中心，那么数据很可能是在本地坐标系中，需要在运行时进行额外的矩阵变换，以便将瓦片集在地球上定位和定向。</p>
        <p>这可以通过两种不同的方式来实现：</p>
        <ol>
            <li>使用3D瓦片数据工作流的<a href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-reality-tiler/#georeferencing" target="_blank">地理参考选项</a>来定位瓦片集。</li>
            <li>在运行时，对瓦片集应用模型矩阵来将其定位到地球上。更多详细信息请参阅<a href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-reality-tiler/#viewing-tilesets" target="_blank">CesiumJS中的查看瓦片集部分</a>。</li>
        </ol>
        <h4>瓦片集显示在地球上错误的位置<span>Tileset appears in the wrong location on earth</span></h4>
        <p>如果瓦片集在地球上显示在太空或其他意外的位置，可能需要对输入数据进行地理参考。可以使用命令行选项<span class="code">--input-crs</span>来指定坐标参考系统（CRS），可以使用EPSG代码、PROJ字符串或WKT字符串来表示。</p>
        <h2>技术参考资料<span>Technical reference</span></h2>
        <h3>输入模型要求<span>Input model requirements</span></h3>
        <p>实境瓦片生成器接受glTF或OBJ格式的带纹理的3D模型。以下是进一步的要求列表：</p>
        <h4>glTF输入要求<span>glTF input requirements</span></h4>
        <p>glTF输入必须满足以下要求：</p>
        <ul>
            <li>基本单元
                <ul>
                    <li>glTF输入模型必须至少包含一个网格基元。</li>
                    <li>基元必须使用<span class="code">TRIANGLES</span>（三角形）模式。</li>
                </ul>
            </li>
            <li>属性
                <ul>
                    <li>模型必须具有一个<span class="code">POSITION</span>（位置）属性。</li>
                    <li>带纹理的模型还必须具有<span class="code">TEXCOORD_0</span>（纹理坐标）属性。</li>
                    <li>当前所有其他属性都被忽略（包括顶点颜色）。</li>
                    <li>当前不支持在glTF中对属性进行扩展，比如压缩。</li>
                    <li>所有的网格基元（所有输入的glTF资源共同）必须具有相同数量的属性。</li>
                </ul>
            </li>
            <li>材质
                <ul>
                    <li>目前仅支持<span class="code">baseColorTexture</span>和<span class="code">baseColorFactor</span>。</li>
                    <li><span class="code">KHR_materials_unlit</span>扩展将被传播到输出。</li>
                </ul>
            </li>
            <li>纹理
                <ul>
                    <li>仅支持 PNG 和 JPEG 格式。</li>
                    <li>当前不支持纹理扩展</li>
                    <li>如果模型没有纹理，或者在加载模型时找不到引用的纹理，实境瓦片生成器将使用一个 1x1 像素的白色纹理代替。</li>
                    <li>所有纹理环绕模式（<span class="code">wrapS</span>/<span class="code">wrapT</span>）都受到支持。然而，重复的纹理可能需要大量的虚拟内存。为获得最佳效果，请使用：所有纹理坐标在范围[0, 1]内的模型。</li>
                </ul>
            </li>
            <li>访问器/缓冲视图
                <ul>
                    <li>支持具有共享访问器和/或缓冲视图的glTF资源。然而，在瓦片生成时会扩展这一点，可能需要大量虚拟内存。</li>
                </ul>
            </li>
        </ul>
        <h4>OBJ 输入要求<span>OBJ input requirements</span></h4>
        <ul>
            <li><span class="code">.obj</span>和<span class="code">.mtl</span>文件必须使用 UTF-8 编码。</li>
            <li>模型必须具有顶点（<span class="code">v</span>）。</li>
            <li>输入模型可以具有n-gon（n边形）面，它们将在输出中被三角化。</li>
            <li>带有纹理的模型必须具有纹理坐标（<span class="code">vt</span>）。</li>
            <li>只支持漫反射颜色纹理（<span class="code">map_Kd</span>）或漫反射因子（<span class="code">Kd</span>）。</li>
            <li>目前仅支持PNG和JPEG纹理。</li>
            <li>所有其他顶点属性（法线，顶点颜色）将被忽略。</li>
            <li>超出边界的纹理坐标，被认为使用<span class="code">REPEAT</span>纹理包裹。不支持<span class="code">-clamp</span>标志。</li>
            <li>如果OBJ引用文件名中带有空格的文件，则文件名必须用引号括起来，例如"my mesh.obj"，或者空格必须用反斜杠转义，例如my\ mesh.obj。</li>
        </ul>
        <h3>3D Tiles 1.1 输出<span>3D Tiles 1.1 output</span></h3>
        <p>实境瓦片生成器生成<a href="https://github.com/CesiumGS/3d-tiles/tree/main/specification" target="_blank">3D Tiles 1.1</a>瓦片集。它使用规范的以下特性：</p>
        <ul>
            <li><a href="https://github.com/CesiumGS/3d-tiles/blob/main/specification/TileFormats/glTF/README.adoc#tileformats-gltf-gltf" target="_blank">glTF 内容</a>
                <ul>
                    <li>每个瓦片包含一个以<a href="https://github.com/KhronosGroup/glTF" target="_blank">glTF</a>格式的单一内容。</li>
                    <li>每个glTF资产包含一个带有基本颜色纹理的三角面片网格。</li>
                    <li>该网格的材质使用了<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_unlit" target="_blank">KHR_materials_unlit</a>扩展，因为实际模型通常在没有阴影的情况下效果最佳。</li>
                    <li>网格基元包含位置（<span class="code">POSITION</span>）和纹理坐标（<span class="code">TEXCOORD_0</span>）属性。</li>
                    <li>未来发布的3D瓦片数据工作流将会保留输入模型中更多的属性和元数据。</li>
                </ul>
            </li>
            <li><a href="https://github.com/CesiumGS/3d-tiles/blob/main/specification/ImplicitTiling/README.adoc#implicittiling-implicit-tiling" target="_blank">隐式瓦片</a>
                <ul>
                    <li>瓦片集是一个八叉树，利用莫顿索引的隐式瓦片进行高效的运行时查询。此外，只需要存储根边界体积，这保持了<span class="code">tileset.json</span>的小型化。</li>
                </ul>
            </li>
            <li><a href="https://github.com/CesiumGS/3d-tiles/blob/main/specification/README.adoc#metadata" target="_blank">瓦片元数据</a>
                <ul>
                    <li><span class="code"><a href="https://github.com/CesiumGS/3d-tiles/tree/main/specification/Metadata/Semantics#tile" target="_blank">TILE_BOUNDING_BOX</a></span> - 根瓦片包含一个具有此语义的元数据属性，用于存储比隐式瓦片所使用的边界框更紧凑的边界框。运行时引擎可以使用这个边界框，在缩放到瓦片集时产生更好的摄像机视图。例如，请参阅<a href="https://github.com/CesiumGS/cesium/pull/11365" target="_blank">CesiumJS PR</a>。</li>
                </ul>
            </li>
        </ul>
        <h3>错误代码索引列表<span>Error codes list</span></h3>
        <p>以下是3D瓦片数据工作流支持的所有错误代码列表。每个错误包括三个部分：一个唯一的数字代码，一个“类别”，以及一个字符串描述。这些错误分为三个类别：</p>
        <ul>
            <li><span class="code">USER</span> - 用户：输入数据问题或不兼容的命令行界面参数</li>
            <li><span class="code">CONFIG</span> - 配置：提供的配置文件存在问题，例如无效的选项</li>
            <li><span class="code">INTERNAL</span> - 内部：内部处理错误</li>
        </ul>
        <table class="table-02">
            <thead>
                <tr>
                    <th>错误</th>
                    <th>错误码</th>
                    <th>类别</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>INPUT_INVALID（输入无效）</td>
                    <td>0</td>
                    <td>USER</td>
                    <td>传递给瓦片生成器（比如命令行标志）的输入无效</td>
                </tr>
                <tr>
                    <td>INPUT_FILE_MISSING（输入文件丢失）</td>
                    <td>1</td>
                    <td>USER</td>
                    <td>指定的其中一个输入文件丢失。</td>
                </tr>
                <tr>
                    <td>INPUT_FILE_INVALID（输入文件无效）</td>
                    <td>2</td>
                    <td>USER</td>
                    <td>指定的其中一个输入文件无效。</td>
                </tr>
                <tr>
                    <td>INPUT_UNSUPPORTED（输入不支持）</td>
                    <td>3</td>
                    <td>USER</td>
                    <td>指定的其中一个输入文件具有不支持的特性。</td>
                </tr>
                <tr>
                    <td>INPUT_FILE_TOO_BIG（输入文件太大）</td>
                    <td>4</td>
                    <td>USER</td>
                    <td>输入文件大小超出了可用虚拟内存。</td>
                </tr>
                <tr>
                    <td>PARAMETER_INVALID（参数无效）</td>
                    <td>5000</td>
                    <td>CONFIG</td>
                    <td>配置文件参数无效</td>
                </tr>
                <tr>
                    <td>PARAMETER_OUT_OF_RANGE（参数超出范围）</td>
                    <td>5001</td>
                    <td>CONFIG</td>
                    <td>配置文件参数超出了允许的范围</td>
                </tr>
                <tr>
                    <td>PARAMETER_NOT_ALLOWED（参数不允许）</td>
                    <td>5002</td>
                    <td>CONFIG</td>
                    <td>配置文件参数不是一个有效的数值</td>
                </tr>
            </tbody>
        </table>
        <p>此外，许多错误类型包含一个原因字段，以提供更多细节。原因代码列表如下：</p>
        <table class="table-01">
            <thead>
                <tr>
                    <th>错误原因</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CONFIG_PARSE_FAILURE（配置解析失败）</td>
                    <td>解析配置JSON文件失败。</td>
                </tr>
                <tr>
                    <td>CLI_NO_INPUT_PROVIDED（命令行未提供输入）</td>
                    <td>没有提供配置文件、输入或输入列表。</td>
                </tr>
                <tr>
                    <td>CLI_MISSING_REQUIRED_OPTIONS（命令行缺少必要选项）</td>
                    <td>一个必需的命令行选项被省略了。</td>
                </tr>
                <tr>
                    <td>CLI_OPTION_INVALID_ARGUMENT_TYPE（命令行选项无效的参数类型）</td>
                    <td>提供的命令行选项具有意外类型的参数，无法解析。</td>
                </tr>
                <tr>
                    <td>CLI_OPTION_REQUIRES_ARGUMENT（命令行选项需要参数）</td>
                    <td>提供的命令行选项没有参数，但是需要一个。</td>
                </tr>
                <tr>
                    <td>CLI_OPTION_REQUIRES_NO_ARGUMENT（命令行选项不需要参数）</td>
                    <td>提供的命令行选项带有参数，但不需要参数。</td>
                </tr>
                <tr>
                    <td>CLI_OPTION_INVALID（命令行选项无效）</td>
                    <td>提供的命令行选项未被识别。</td>
                </tr>
                <tr>
                    <td>CLI_PARSE_FAILURE（命令行解析失败）</td>
                    <td>在解析CLI选项时发生了错误。</td>
                </tr>
                <tr>
                    <td>CRS_TYPE_MISMATCH（CRS类型不匹配）</td>
                    <td>指定的坐标参考系统不兼容。这可能是因为其中一个坐标参考系统是本地坐标系统，而另一个是全局坐标系统。</td>
                </tr>
                <tr>
                    <td>DIRECTORY_REMOVAL_FAILURE（目录删除失败）</td>
                    <td>无法删除指定的目录。</td>
                </tr>
                <tr>
                    <td>EXECUTABLE_INSIDE_OUTPUT（输出中包含可执行文件）</td>
                    <td>瓦片生成器的可执行文件位于输出目录中，将会被覆盖。</td>
                </tr>
                <tr>
                    <td>FILE_READ_FAILURE（文件读取失败）</td>
                    <td>无法读取指定的文件。</td>
                </tr>
                <tr>
                    <td>FILE_REMOVAL_FAILURE（文件删除失败）</td>
                    <td>无法删除指定的文件。</td>
                </tr>
                <tr>
                    <td>FILE_WRITE_FAILURE（文件写入失败）</td>
                    <td>无法写入指定的文件。</td>
                </tr>
                <tr>
                    <td>FILE_EMPTY（文件为空）</td>
                    <td>指定的文件为空。</td>
                </tr>
                <tr>
                    <td>GEOREFERENCE_SCALE_ZERO（地理参考尺度为零）</td>
                    <td><span class="code">--scale-{x,y,z}</span>参数提供的比例因子为零，这将导致几何形状退化。</td>
                </tr>
                <tr>
                    <td>GLTF_BUFFER_DATA_URI_INVALID（GLTF缓冲数据URI无效）</td>
                    <td>一个用于 glTF 缓冲区的数据 URI 是无效的。</td>
                </tr>
                <tr>
                    <td>GLTF_DESERIALIZE_FAILURE（GLTF反序列化失败）</td>
                    <td>无法加载glTF模型。</td>
                </tr>
                <tr>
                    <td>GLTF_DESERIALIZE_WARNING（GLTF反序列化警告）</td>
                    <td>加载glTF模型时发出了警告。</td>
                </tr>
                <tr>
                    <td>GLTF_LOAD_IMAGE_URI_INVALID（GLTF加载图像URI无效）</td>
                    <td>在 glTF 中指定的 URI 无效，但应该指向一个图像。</td>
                </tr>
                <tr>
                    <td>GLTF_LOAD_BUFFER_URI_INVALID（GLTF加载缓冲区URI无效）</td>
                    <td>在 glTF 中指定的 URI 无效，但应该指向一个 glTF 缓冲区。</td>
                </tr>
                <tr>
                    <td>GLTF_NO_MESHES（GLTF没有网格）</td>
                    <td>输入的 glTF 文件中没有任何网格。</td>
                </tr>
                <tr>
                    <td>GLTF_NO_POSITIONS（GLTF没有位置信息）</td>
                    <td>输入的glTF文件中没有任何具有位置属性的图元。</td>
                </tr>
                <tr>
                    <td>GLTF_NO_PRIMITIVES（GLTF没有基元）</td>
                    <td>输入的 glTF 文件中没有任何基本图元。</td>
                </tr>
                <tr>
                    <td>INPUT_CRS_ORIGIN_MISSING_CRS（坐标参考系统命令缺少CRS标志）</td>
                    <td>在使用<span class="code">--input-crs-origin-{x,y,z}</span>时必须设置<span class="code">--input-crs</span>。</td>
                </tr>
                <tr>
                    <td>INPUT_FORMAT_MISMATCH（输入格式不匹配）</td>
                    <td>输入包含不同的输入文件格式。目前，瓦片生成器要求所有输入具有相同的格式。</td>
                </tr>
                <tr>
                    <td>INPUT_FORMAT_UNKNOWN（输入格式未知）</td>
                    <td>无法从输入文件中确定输入格式。</td>
                </tr>
                <tr>
                    <td>INPUT_INSIDE_OUTPUT（输入目录在输出中）</td>
                    <td>输入目录位于输出目录内部，并将被覆盖。</td>
                </tr>
                <tr>
                    <td>PATH_INVALID（路径无效）</td>
                    <td>指定的路径不是有效的文件路径。</td>
                </tr>
                <tr>
                    <td>INPUT_SAME_AS_OUTPUT（输入目录与输出相同）</td>
                    <td>输入目录与输出目录相同，将被覆盖。</td>
                </tr>
                <tr>
                    <td>INPUT_LIST_READ_FAILURE（输入列表读取失败）</td>
                    <td>无法读取包含输入路径的文件。</td>
                </tr>
                <tr>
                    <td>INPUT_AND_INPUT_LIST_MUTUALLY_EXCLUSIVE（输入和输入列表互斥）</td>
                    <td><span class="code">--input</span>和<span class="code">--input-list</span>是互斥的。</td>
                </tr>
                <tr>
                    <td>INVALID_CRS（无效的CRS）</td>
                    <td>坐标参考系统无效，必须是 PROJ 库支持的坐标参考系统 (CRS)。</td>
                </tr>
                <tr>
                    <td>INVALID_PIPELINE（无效的数据工作流）</td>
                    <td>提供的输入与所选的工作流不兼容。</td>
                </tr>
                <tr>
                    <td>LICENSE_INVALID（许可无效）</td>
                    <td>提供的许可证无效。</td>
                </tr>
                <tr>
                    <td>MODEL_FORMAT_UNSUPPORTED（模型格式不支持）</td>
                    <td>输入模型使用了3D瓦片数据工作流不支持的格式。</td>
                </tr>
                <tr>
                    <td>NO_INPUT_MODELS（没有输入模型）</td>
                    <td>无法从输入中读取有效的模型。</td>
                </tr>
                <tr>
                    <td>NO_INPUT_PROVIDED（没有提供输入）</td>
                    <td>未指定输入路径。</td>
                </tr>
                <tr>
                    <td>NO_OUTPUT_PROVIDED（没有提供输出）</td>
                    <td>未指定输出路径。</td>
                </tr>
                <tr>
                    <td>NO_PIPELINE（没有工作流）</td>
                    <td>无法从输入和输出格式中确定要使用的工作流。</td>
                </tr>
                <tr>
                    <td>NO_VALID_INPUT_FILE（无有效的输入文件）</td>
                    <td>输入文件中没有包含适用于瓦片的有效网格。</td>
                </tr>
                <tr>
                    <td>OBJ_DECODE_IMAGE_FAILURE（OBJ解码图像失败）</td>
                    <td>OBJ文件中的图像无法解码。</td>
                </tr>
                <tr>
                    <td>OBJ_NO_VALID_DATA（OBJ没有有效数据）</td>
                    <td>输入OBJ文件不包含任何有效数据。</td>
                </tr>
                <tr>
                    <td>OBJ_LOAD_ERROR（OBJ加载错误）</td>
                    <td>无法加载指定的OBJ文件。</td>
                </tr>
                <tr>
                    <td>OBJ_LOAD_WARNING（OBJ加载警告）</td>
                    <td>加载OBJ文件时发出了警告。</td>
                </tr>
                <tr>
                    <td>OBJ_INVALID_TEXCOORD_INDEX（OBJ无效的纹理坐标索引）</td>
                    <td>OBJ包含一个或多个无效的纹理坐标索引。</td>
                </tr>
                <tr>
                    <td>OBJ_INVALID_NORMAL_INDEX（OBJ无效的法线索引）</td>
                    <td>OBJ包含一个或多个无效的法线索引。</td>
                </tr>
                <tr>
                    <td>OBJ_INVALID_POSITION_INDEX（OBJ无效的位置索引）</td>
                    <td>OBJ包含一个或多个无效的顶点位置索引。</td>
                </tr>
                <tr>
                    <td>OUTPUT_ALREADY_EXISTS（输出已经存在）</td>
                    <td>输出目录已存在，将被覆盖。要强制写入此目录，请使用<span class="code">--overwrite</span>标志。</td>
                </tr>
                <tr>
                    <td>TEMP_DIRECTORY_NOT_FOUND（临时目录未找到）</td>
                    <td>找不到临时的目录。</td>
                </tr>
                <tr>
                    <td>TEMP_DIRECTORY_CREATE_FAILURE（临时目录创建失败）</td>
                    <td>瓦片生成器无法创建临时目录。</td>
                </tr>
                <tr>
                    <td>VERTEX_COLORS_UNSUPPORTED（不支持顶点颜色）</td>
                    <td>目前还不支持顶点颜色。</td>
                </tr>
                <tr>
                    <td>GLTF_EXTENSION_UNSUPPORTED（不支持GLTF扩展）</td>
                    <td>目前还不支持GLTF扩展。</td>
                </tr>
                <tr>
                    <td>MODEL_TOO_BIG（模型太大）</td>
                    <td>输入模型太大，没有足够的虚拟内存来加载它。</td>
                </tr>
                <tr>
                    <td>GLTF_EXCESSIVE_SHARED_BUFFERVIEWS（GLTF 过多的共享缓冲视图）</td>
                    <td>glTF的缓冲视图共享目前可能需要大量的虚拟内存。如果这是CAD模型，请尝试使用CAD瓦片生成器。</td>
                </tr>
                <tr>
                    <td>MODEL_EXCESSIVE_TEXTURE_REPEAT（模型纹理重复过多）</td>
                    <td>模型中的三角形跨越了纹理的多个副本。这将导致在虚拟内存方面需要过多的虚拟内存来进行纹理烘焙。如果这是CAD模型，请尝试使用CAD瓦片生成器。</td>
                </tr>
            </tbody>
        </table>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-reality-tiler/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style lang="scss" scoped>
.table-02 {
    th:nth-child(1) {
        width: 295px;
    }
    th:nth-child(2),
    td:nth-child(2) {
        width: 60px;
        text-align: center;
    }
    th:nth-child(3),
    td:nth-child(3) {
        width: 90px;
        text-align: center;
    }
}
</style>
