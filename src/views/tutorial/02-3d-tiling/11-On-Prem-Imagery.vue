<script setup>
import { ref }                 from 'vue';
import { sourceSampleDataUrl } from '@/assets/js/cfg';


const code01 = ref({
    shell: `imagery-tiler -f <layer-type> -i <input1.tif> <input2.tif> -o <output-directory>`
});

const code02 = ref({
    shell: `imagery-tiler -f TMS -i SampleData/Courtyard.tif -o Courtyard`
});

const code03 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: '<影像的UTL>'
    }),
    baseLayerPicker: false
});`
});
</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>本地使用影像瓦片生成器<span>Using the Imagery Tiler On-Premises</span></h1>
        <div class="note">
            <p>寻找本地部署的3D瓦片？请联系销售进行评估。<a href="https://cesium.com/contact/" target="_blank">联系销售</a>。</p>
        </div>
        <h2>安装<span>Setup</span></h2>
        <p>解压缩<span class="code">Cesium-ion-3D-Tiling-Pipeline.zip</span>文件的内容。</p>
        <p>主要的可执行文件是<span class="code">imagery-tiler</span>，可以在<span class="code">bin</span>目录下找到。</p>
        <p>如果希望运行示例，请下载并将<a :href="sourceSampleDataUrl" download>SampleData.zip</a>解压缩到一个名为<strong>SampleData</strong>的新目录中。</p>
        <h2>Windows<span>Windows</span></h2>
        <p>Windows二进制文件需要安装<span class="code">Visual Studio 2017</span>的<span class="code">Visual C++ Redistributable</span>组件。请<a download href="https://aka.ms/vs/15/release/vc_redist.x64.exe">下载</a>并运行该安装程序。</p>
        <h2>使用瓦片生成器<span>Using the tiler</span></h2>
        <monaco-editor v-model="code01" />
        <p><span class="code">&lt;layer-type&gt;</span>可以是<strong>TMS</strong>或<strong>WMTS</strong>.</p>
        <p>例如，<span class="code">SampleData/Courtyard.tif</span>包含了一个小型的无人机采集的庭院影像。通过运行以下命令，将其生成为TMS瓦片图层：</p>
        <monaco-editor v-model="code02" />
        <p>这将在<span class="code">Courtyard</span>目录中生成一个TMS瓦片集。</p>
        <p>当提供多个重叠的影像时，列表中较早的文件将被优先考虑。为了获得最佳结果，请确保所有输入文件具有相同的每像素米数分辨率（meters-per-pixel resolution）。否则，生成的瓦片集可能会在最高分辨率的输入影像上分辨率过低，或者在最低分辨率的输入影像上分辨率过高，导致视觉效果不理想。</p>
        <p>如果影像瓦片生成器检测到输入影像不是EPSG:3857 Web Mercator投影方式，它会自动对其进行重新投影。</p>
        <h3>可用选项<span>Available options</span></h3>
        <p>以下是配置瓦片生成器的所有命令行选项的完整列表。</p>
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
                    <td>一个或多个影像文件，将被拼贴成一个单一的图层。对于重叠的影像，列表中较早的文件将优先考虑。影像文件可以有1到4个频段，第4个频段被视为alpha通道，但是所有输入文件必须具有相同数量的频段。大多数栅格格式都受支持。如果没有提供<span class="code">--input-list</span>，则此项为<strong>必填项</strong>。不能与<span class="code">--input-list</span>同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input-list</span></td>
                    <td>一个影像文件列表，用于拼接成单个图层。如果没有提供<span class="code">--input</span>参数，则此参数是<strong>必须</strong>的。不能与<span class="code">--input</span>参数同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--output</span>,<span class="code">-o</span></td>
                    <td>影像瓦片集输出目录。如果目录不存在，将创建一个新目录，如果已存在则会覆盖其中的内容。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--output-format</span>,<span class="code">-f</span></td>
                    <td>指定要生成的瓦片集格式。选项有<span class="code">TMS</span>或<span class="code">WMTS</span>。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--title</span>,<span class="code">-t</span></td>
                    <td>设置生成的瓦片集元数据中的标题字段。</td>
                    <td></td>
                    <td><span class="code">Imagery</span></td>
                </tr>
                <tr>
                    <td><span class="code">--quiet</span></td>
                    <td>在生成瓦片集的过程中控制输出信息。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
                <tr>
                    <td><span class="code">--verbose</span></td>
                    <td>显示详细输出信息。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
            </tbody>
        </table>
        <h2>下一步<span>Next steps</span></h2>
        <p>现在我们已经将影像生成瓦片，下一步是将其流式传输到CesiumJS中。我们只需要一个Web服务器来托管这些瓦片，然后我们可以指定影像的URL。</p>
        <p>下面的示例将TMS影像添加到CesiumJS中。</p>
        <monaco-editor v-model="code03" height="180px" />
        <p><router-link :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }" target="_blank">托管3D内容</router-link>将引导设置Cesium ion资产服务器并使用CesiumJS流式传输影像。</p>
        <h2>许可<span>License</span></h2>
        <p>第三方授权的瓦片生成器可以在<span class="code">ThirdParty.pdf</span>中找到。</p>
        <el-affix position="bottom">
<!--  <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-imagery/" target="_blank">原文</a></div>-->
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/on-prem/on-prem-imagery/" target="_blank">原文</a></div>
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
