<script setup>
import { ref }                 from 'vue';
import { sourceSampleDataUrl } from '@/assets/js/cfg';


const code01 = ref({
    shell: `terrain-tiler -i <input1.tif> <input2.tif> -o <output.terraindb>`
});

const code02 = ref({
    shell: `terrain-tiler -i SampleData/ZionNationalPark.tiff -o ZionNationalPark.terraindb`
});

const code03 = ref({
    shell: `terrain-tiler -i <new.tif> -o <old.terraindb>`
});

const code04 = ref({
    js: `var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : new Cesium.CesiumTerrainProvider({
        url : '<地形服务器的URL>'
    })
});`
});
</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>本地使用地形瓦片生成器<span>Using the Terrain Tiler On-Premises</span></h1>
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
        <p>Cesium ion地形切片器输出一个可以通过<router-link target="_blank" :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }">Cesium ion资产服务器</router-link>在网络上进行流式传输的<span class="code">terraindb</span>文件。</p>
        <p>瓦片生成器常用命令参照以下格式：</p>
        <monaco-editor v-model="code01" />
        <p>例如，ZionNationalPark 的一个小区域包含在<span class="code">SampleData/ZionNationalPark.tiff</span>中。通过运行以下命令，将其生成瓦片并转换为 Cesium 地形数据库：</p>
        <monaco-editor v-model="code02" />
        <p>在使用多个重叠地形文件时，列表中较早出现的文件将被优先考虑。</p>
        <h3>将新数据合并到现有的地形瓦片集中<span>Merging new data into an existing terrain tileset</span></h3>
        <p>要将新的栅格数据合并到现有的地形瓦片集中，只需将现有的<span class="code">terraindb</span>文件作为输出路径传递即可：</p>
        <monaco-editor v-model="code03" />
        <p>如果<span class="code">old.terraindb</span>已经存在，那么<span class="code">new.tif</span>将被生成瓦片并将图层叠加在<span class="code">old.terraindb</span>中的数据上。这种叠加的工作方式与将多个栅格文件生成到一个<span class="code">terraindb</span>中的方式相同，在这种情况下，输入列表中较早出现的文件会在重叠处覆盖列表中较晚出现的文件。当<span class="code">--void-fill</span>设置为<span class="code">Underlying</span>时，新图层中的任何空白数据将被下方图层的数据填充。</p>
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
                    <td>一个或多个地形文件，将瓦片生成到单个图层。对于重叠的地形文件，列表中较早出现的文件将优先考虑。输入必须是单波段的。如果没有提供<span class="code">--input-list</span>，则<span class="code">必须</span>提供此参数。不能与<span class="code">--input-list</span>同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--input-list</span></td>
                    <td>一个文本文件，包含一个或多个地形文件的列表，将瓦片生成到单个图层。如果没有提供<span class="code">--input</span>，则<span class="code">必须</span>提供此参数。不能与<span class="code">--input</span>同时使用。</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--output</span>,<span class="code">-o</span></td>
                    <td>输出<span class="code">.terraindb</span>文件的路径。如果输出文件已存在，新瓦片数据集将叠加到当前已存在的数据集之上。</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td><span class="code">--attribution</span>,<span class="code">-a</span></td>
                    <td>最终瓦片集中将存储的自定义归属字符串。</td>
                    <td></td>
                    <td></td>
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
                <tr>
                    <td><span class="code">--height-reference</span>,<span class="code">-r</span></td>
                    <td>指定输入高程数值相对于什么。设置为<span class="code">Ellipsoid</span>（椭球体）以使用WSG84椭球体，或设置为<span class="code">MeanSeaLevel</span>（平均海平面）以使用EGM96模型。</td>
                    <td></td>
                    <td><span class="code">MeanSeaLevel</span></td>
                </tr>
                <tr>
                    <td><span class="code">--void-fill</span>,<span class="code">-f</span></td>
                    <td>配置遇到无效高程数值时使用的默认值。设置为<span class="code">MeanSeaLevel</span>（平均海平面）以使用EGM96模型，或设置为<span class="code">Underlying</span>（底层）以使用底层地形图层的高程数值（或者在不存在底层地形图层时使用EGM96模型）。</td>
                    <td></td>
                    <td><span class="code">Underlying</span></td>
                </tr>
                <tr>
                    <td><span class="code">--water-mask</span>,<span class="code">-w</span></td>
                    <td>将其设置为<span class="code">true</span>，将海平面处的高程值视为水域。这将向地形瓦片集添加一个水域遮罩，CesiumJS 将使用该遮罩来显示水域。</td>
                    <td></td>
                    <td><span class="code">false</span></td>
                </tr>
            </tbody>
        </table>
        <h2>下一步<span>Next steps</span></h2>
        <p>现在我们已经将地形瓦片化，下一步是将其流式传输到 CesiumJS。地形可以使用Cesium ion 资产服务器进行服务。Cesium ion 地形瓦片生成器会输出一个<span class="code">terraindb</span>文件，可以通过<router-link target="_blank" :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }">Cesium ion 资产服务器</router-link>在网络上进行流式传输。然后，我们可以像下面展示的那样提供地形的 URL。</p>
        <monaco-editor v-model="code04" height="160px" />
        <p><router-link :to="{ name: '3D-Tiling-On-Prem-Hosting-3D-Content' }" target="_blank">托管3D内容</router-link>将引导设置Cesium ion资产服务器并使用CesiumJS流式传输图像。</p>
        <h2>许可<span>License</span></h2>
        <p>第三方授权的瓦片生成器可以在<span class="code">ThirdParty.pdf</span>中找到。</p>
        <el-affix position="bottom">
<!--            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/3d-tiling/on-prem/on-prem-terrain/" target="_blank">原文</a></div>-->
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/on-prem/on-prem-terrain/" target="_blank">原文</a></div>
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
