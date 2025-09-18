<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>瓦片数据的类型与格式<span>Tiler Data Types and Formats</span></h1>
        <p>想要快速开始将数据导入Cesium ion，请参考以下指南之一：</p>
        <ul>
            <li><router-link :to="{ name: '3D-Tiling-Ion-Photogrammetry' }" target="_blank">摄影测绘或LiDAR导出的网格模型</router-link></li>
            <li><router-link :to="{ name: '3D-Tiling-Ion-3D-Models' }" target="_blank">BIM、CAD或其他3D模型</router-link></li>
            <li><router-link :to="{ name: '3D-Tiling-Ion-Point-Clouds' }" target="_blank">点云</router-link></li>
            <li><router-link :to="{ name: '3D-Tiling-Ion-3D-Buildings' }" target="_blank">3D建筑物</router-link></li>
            <li><router-link :to="{ name: '3D-Tiling-Ion-Terrain' }" target="_blank">地形</router-link></li>
            <li><router-link :to="{ name: '3D-Tiling-Ion-Imagery' }" target="_blank">卫星或无人机影像</router-link></li>
        </ul>
        <p>如果正在寻找有关Cesium ion提供的资产类型、支持的文件格式以及如何上传数据的更详细信息，请继续阅读以下内容。</p>
        <h2>数据工作流<span>Data pipeline</span></h2>
        <ul>
            <li>当数据上传到Cesium ion时，会生成用于3D内容的3D瓦片，或用于影像的WMTS/TMS格式。</li>
            <li>矢量文件（KML、GeoJSON或CZML）和小型glTF文件可以直接使用。</li>
            <li>上传选项决定了创建哪种资产类型。Cesium ion会针对3D地理空间应用的典型情况，对每种资源类型进行优化。</li>
            <!--  https://cesium.com/learn/ion/ion-upload-rest/  -->
            <li>可以通过<router-link to="" target="_blank">REST API</router-link>上传数据，从而自动化流程。</li>
            <li>同样经过瓦片生成的数据可以通过内置Cesium ion支持的客户端（如CesiumJS）进行查看，也可以直接通过REST API进行访问。</li>
        </ul>
        <h2>Cesium ion资产类型<span>Cesium ion asset types</span></h2>
        <p>Cesium ion接受多种数据格式，并将其作为五种类型的资产之一进行提供：</p>
        <table>
            <thead>
                <tr>
                    <th>资产类型</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>3D Tiles</td>
                    <td>一种用于流式传输海量异构3D地理空间数据集的开放规范。了解更多信息，请查看3D瓦片介绍。</td>
                </tr>
                <tr>
                    <td>Imagery</td>
                    <td>从栅格影像创建的TMS和WMTS图层</td>
                </tr>
                <tr>
                    <td>Terrain</td>
                    <td>从栅格地形创建的量化网格瓦片集</td>
                </tr>
                <tr>
                    <td>glTF</td>
                    <td>二进制glTF模型</td>
                </tr>
                <tr>
                    <td>Native</td>
                    <td>数据不会经过瓦片切割管道处理，以上传时的格式进行托管</td>
                </tr>
            </tbody>
        </table>
        <h2>支持的数据格式<span>Supported data formats</span></h2>
        <p>下表列出了接受的数据格式及其对应的资产类型：</p>
        <table class="table-01">
            <thead>
                <tr>
                    <th>格式</th>
                    <th>3D瓦片</th>
                    <th>地形</th>
                    <th>影像</th>
                    <th>glTF</th>
                    <th>本地</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Zip存档（.Zip）</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td>glTF (.gltf, .glb)</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Filmbox (.fbx)</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td>CityGML (.citygml, .xml, .gml)</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>CZML (.czml)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                </tr>
                <tr>
                    <td>GeoJSON (.json, .geojson, .topojson)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                </tr>
                <tr>
                    <td>KML (.kml, .kmz)</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                </tr>
                <tr>
                    <td>LASer (.las, .laz)</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>COLLADA (.dae)</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Wavefront OBJ (.obj)</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Floating Point Raster（浮点栅格数据） (.flt)</td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Arc/Info ASCII Grid (.asc)</td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Source Map（源映射） (.src)</td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>GeoTIFF (.tiff, .tif)</td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Erdas Imagine（遥感数据） (.img)</td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>USGS ASCII DEM 与 CDED (.dem)	</td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>JPEG (.jpg, .jpeg)</td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>PNG (.png)</td>
                    <td></td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Cesium Terrain Database（Cesium地形数据库） (.terraindb)</td>
                    <td></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <p>虽然上表中未列出，但支持栅格附属文件（.aux.xml、.tab、.tfw、.wld、.prj、.ovr、.rrd等）和模型纹理（.jpg、.png、.bmp、.tga、.dds等）。如果有疑问，请上传与数据一起提供的任何其他文件。</p>
        <p>我们始终在增加更多数据类型的支持。如果希望我们支持某种格式，请<a href="https://community.cesium.com/" target="_blank">在论坛上告诉我们</a>！</p>
        <h2>上传说明<span>Upload instructions</span></h2>
        <ol>
            <li>
                <p>在Cesium ion的<a href="https://cesium.com/ion/assets" target="_blank"><strong>My Assets</strong></a>选项卡中，选择<strong>Add data</strong>。</p>
            </li>
            <li>
                <p>选择一个或多个文件，然后点击<strong>打开</strong>。<br>
            可以继续添加更多文件，它们都将使用相同的管道选项进行上传。<br>
            如果同时添加多个模型，它们将合并为一个单独的资产。</p>
            </li>
            <li>
                <p>根据下表中的信息设置上传选项。</p>
            </li>
            <li>
                <p>上传后，如有需要，可以使用<a href="https://cesium.com/docs/tutorials/locate-data/" target="_blank">位置编辑器</a>编辑数据的<strong>位置</strong>、<strong>方向</strong>和<strong>比例</strong>。</p>
            </li>
        </ol>
        <table>
            <thead>
                <tr>
                    <th>源数据</th>
                    <th>选择"数据类型"选项</th>
                    <th>生成的资产类型</th>
                    <th>上传选项和说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>摄影测绘或LiDAR导出的网格</td>
                    <td>3D Capture</td>
                    <td>3D Tiles</td>
                    <td>Draco压缩 • WebP压缩 • 可与位置编辑器一起使用</td>
                </tr>
                <tr>
                    <td>点云</td>
                    <td>Point Cloud</td>
                    <td>3D Tiles</td>
                    <td>Draco压缩 • 可与位置编辑器一起使用</td>
                </tr>
                <tr>
                    <td>3D建筑（KML/COLLADA）</td>
                    <td>KML/COLLADA（瓦片为3D瓦片）</td>
                    <td>3D Tiles</td>
                    <td>Draco压缩 • 参考地形（用于确定要素的高度，使其与计划在应用程序中使用的地形相匹配）</td>
                </tr>
                <tr>
                    <td>3D建筑 (CityGML)</td>
                    <td>CityGML</td>
                    <td>3D Tile</td>
                    <td>Draco压缩 • 忽略颜色 • 忽略纹理 • 限制在地形上 • 限制在地形图层上（如果选择了限制在地形上）</td>
                </tr>
                <tr>
                    <td>BIM、CAD或通用3D模型</td>
                    <td>3D Model（瓦片为3D瓦片）</td>
                    <td>3D Tile</td>
                    <td>可以与位置编辑器一起使用</td>
                </tr>
                <tr>
                    <td>简单的3D模型</td>
                    <td>3D Model（转换为glTF格式）</td>
                    <td>glTF</td>
                    <td>优化渲染 • Draco压缩 • 适用于不需要瓦片的简单模型</td>
                </tr>
                <tr>
                    <td>影像（地图）</td>
                    <td>Raster Imagery</td>
                    <td>Imagery（TMS 与 WMTS）</td>
                    <td></td>
                </tr>
                <tr>
                    <td>地形（高程图）</td>
                    <td>Raster Terrain</td>
                    <td>Terrain（量化网格）</td>
                    <td>基础地形（与栅格数据组合的地形）• 高度单位（源数据中高度的单位）• 高程参照（源数据中测量高度的表面）</td>
                </tr>
                <tr>
                    <td>已经以3D瓦片格式存在的任何数据</td>
                    <td>3D Tiles</td>
                    <td>3D Tiles</td>
                    <td></td>
                </tr>
                <tr>
                    <td>KML，CZML或GeoJSON</td>
                    <td>KML，CZML 或 GeoJSON（不需要托管瓦片）</td>
                    <td>Native</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <h2>有问题吗？<span>Have a question?</span></h2>
        <p><a href="https://community.cesium.com/" target="_blank">Cesium社区论坛</a>是从Cesium团队获取答案的最快方式。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/3d-tiling/tiler-data-formats/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style lang="scss" scoped>
.table-01 tr {
    th + th,
    td + td {
        text-align: center;
    }

    td + td {
        width: 64px;
        font-size: 16px;
        line-height: 1;
        color: #14838d;
    }
}
</style>
