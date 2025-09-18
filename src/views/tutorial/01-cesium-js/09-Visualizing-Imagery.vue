<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const code01 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    infoBox: false,
    baseLayerPicker: false,
    baseLayer: Cesium.ImageryLayer.fromWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
    })
});`,
    html
});

const code02 = ref({
    js: `${ code01.value.js }

const blackMarble = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(3812)
);

viewer.imageryLayers.add(blackMarble);`,
    html
});

const code03 = ref({
    js: `${ code01.value.js }

const blackMarble = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(3812)
);

blackMarble.alpha = .5;  // 0 是透明的 1 是不透明的

viewer.imageryLayers.add(blackMarble);`,
    html
});

const code04 = ref({
    js: `${ code01.value.js }

const blackMarble = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.IonImageryProvider.fromAssetId(3812)
);

blackMarble.alpha = .5;  // 0 是透明的 1 是不透明的
blackMarble.brightness = 2;  // > 1 增加亮度 小于 1 减少亮度,

viewer.imageryLayers.add(blackMarble);`,
    html
});

const code05 = ref({
    js: `${ code04.value.js }

const cesiumLogo = Cesium.ImageryLayer.fromProviderAsync(
    Cesium.SingleTileImageryProvider.fromUrl(
        '/static/img/tutorial/cesium-js/Cesium_Logo_overlay.png',
        {
            rectangle: Cesium.Rectangle.fromDegrees(-75, 28, -67, 29.75)
        }
    )
);

viewer.imageryLayers.add(cesiumLogo);`,
    html
});

const code06 = ref({
    js: `viewer.imageryLayers.add(
    new Cesium.WebMapServiceImageryProvider({
        url: new Cesium.Resource({
            url: '/path/to/imagery',
            proxy: new Cesium.DefaultProxy('/proxy/')
        }),
        layers: [
            // ...
        ]
    })
);`
});

const code07 = ref({
    javascript: 'const layer = layers.addImageryProvider(imageryProvider);'
});

const code08 = ref({
    js: `const layer = new Cesium.ImageryLayer(imageryProvider);
layers.add(layer);`
});

const code09 = ref({
    js: `let imageryProvider;
try {
    // 来自NASA的蓝色大理石下一代影像，拍摄于2004年7月。
    imageryProvider = await Cesium.IonImageryProvider.fromAssetId(3845);
} catch (e) {
    console.warn(\`在创建影像提供程序时发生了错误: \${ e }\`);
}

const imageryLayer = new Cesium.ImageryLayer(imageryProvider);

const viewer = new Cesium.Viewer('cesium-container', {
    baseLayer: imageryLayer
});`
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>可视化影像<span>Visualizing Imagery</span></h1>
        <p>CesiumJS支持来自许多其它绘制和分层高分辨率影像（地图）的服务，包括<a href="https://ion.cesium.com/" target="_blank">Cesium ion</a>。使用Cesium ion可以流式传输经过精心选择的高分辨率影像，或者将自己的栅格数据转换为影像图层，并在CesiumJS应用程序中进行切片。图层可以进行排序和混合。可以动态更改每个图层的亮度、对比度、伽玛值、色调和饱和度。本教程介绍图像图层概念和相关的CesiumJS API。</p>
        <div class="note">
            <p>有属于自己的影像吗？可以查看<router-link :to="{ name: '3D-Tiling-Ion-Imagery' }" target="_blank">无人机或卫星影像瓦片生成</router-link>。</p>
        </div>
        <h2>快速入门<span>Quickstart</span></h2>
        <p>在Sandcastle中打开“<a href="https://sandcastle.cesium.com/?src=Hello%20World.html" target="_blank">Hello World</a>”示例。此示例将创建一个<span class="code">Viewer</span>小部件，使用Cesium ion流式传输Bing Maps空中影像，并呈现为单个图层。通过向<span class="code">Viewer</span>构造函数提供另一个参数来指定不同的底图层。让我们使用Bing Maps带标签的影像：</p>
        <cesium-example v-model="code01" height="200px"></cesium-example>
        <div class="note">
            <p><strong>创建一个Cesium ion账户</strong></p>
            <p>本教程使用由Cesium ion提供的影像数据。<a href="https://ion.cesium.com/signup/" target="_blank">创建一个账户</a>以获得访问Token，以便在本教程中使用这些影像数据。在此注册，上面的示例代码将自动更新为使用Token。如果已经有一个账户，<a href="https://ion.cesium.com/" target="_blank">请登录</a>。</p>
        </div>
        <p>修改完示例后，按下F8键来运行它。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-imagery-layers-bing-labels.jpg"></p>
        <p>当放大或缩小地图时，图层会根据需要进行流式传输。</p>
        <p>添加另一个Cesium ion影像图层：<a href="https://earthobservatory.nasa.gov/features/NightLights" target="_blank">夜晚的地球</a>。</p>
        <cesium-example v-model="code02" height="300px"></cesium-example>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-imagery-layers-black-marble.jpg"></p>
        <p>由于它是最后添加的，并且覆盖了全球范围，黑色大理石图层会覆盖Bing图层。我们可以使用<span class="code">viewer.imageryLayers.lower(blackMarble)</span>将黑色大理石图层移到底部，但我们更希望将其与Bing图层混合，这样我们可以更好地了解这两个图层之间的关系。</p>
        <cesium-example v-model="code03" height="330px"></cesium-example>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-imagery-layers-blended.jpg"></p>
        <p>接下来，增加灯光的亮度：</p>
        <cesium-example v-model="code04" height="350px"></cesium-example>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-imagery-layers-brightness.jpg"></p>
        <p>最后，添加第三个图层，绘制一个单独的影像覆盖在特定范围上。</p>
        <cesium-example v-model="code05" height="520px"></cesium-example>
        <h2>流式传输的影像数据<span>Ready-to-stream imagery</span></h2>
        <p><a href="https://sandcastle.cesium.com/?src=Sentinel-2.html&label=ion%20Assets" target="_blank">Sandcastle中的ion资产选项卡</a>包含了更多由Cesium ion托管的影像瓦片集，只需几行代码即可将其添加到CesiumJS应用程序中。其中许多瓦片集也可<a href="https://cesium.com/platform/cesium-ion/content/" target="_blank">供本地使用</a>。</p>
        <h2>更多的影像提供商<span>More imagery providers</span></h2>
        <p>高分辨率影像（如上面使用的前两层）太大，无法容纳在内存中，甚至一个单独的磁盘都不行，因此将影像分成更小的图块，称为瓦片，根据视图需要即时流式传输到客户端。Cesium支持几种标准来请求使用<i>影像提供商</i>的瓦片。大多数影像提供商使用HTTP上的<a href="http://rest.elkstein.org/" target="_blank">REST接口</a>请求瓦片。图像提供商根据请求格式和瓦片组织方式而异。Cesium具有以下图像提供商：</p>
        <ul>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/WebMapServiceImageryProvider.html" target="_blank">WebMapServiceImageryProvider</a>: <a href="https://www.ogc.org/standard/wms/" target="_blank">Web Map Service</a>（WMS），是OGC的一个标准，用于从分布式地理空间数据库请求地理区域的地图瓦片。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/TileMapServiceImageryProvider.html" target="_blank">TileMapServiceImageryProvider</a>: <a href="https://cesium.com/learn/cesiumjs/ref-doc/TileMapServiceImageryProvider.html" target="_blank">Tile Map Service</a>（TMS），是一种用于访问地图瓦片的REST接口。可以使用 <a href="https://ion.cesium.com/" target="_blank">Cesium ion</a>或<a href="https://gdal.org/programs/gdal2tiles.html" target="_blank">GDAL2Tiles</a>生成瓦片。</li>
            <li><a href="https://cesium.com/docs/cesiumjs-ref-doc/WebMapTileServiceImageryProvider.html" target="_blank">WebMapTileServiceImageryProvider</a>: <a href="https://www.ogc.org/standard/wmts/" target="_blank">OpenGIS Web Map Tile Service</a>（WMTS），是一种OGC标准，用于通过互联网提供预渲染的地理参考地图瓦片。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/OpenStreetMapImageryProvider.html" target="_blank">OpenStreetMapImageryProvider</a>: 提供对<a href="http://wiki.openstreetmap.org/wiki/Main_Page">OpenStreetMap</a>瓦片或其他<a href="http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames" target="blank">Slippy地图瓦片</a>的访问。有几种方式可以 <a href="https://switch2osm.org/serving-tiles/" target="blank">托管这些瓦片</a>。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/BingMapsImageryProvider.html" target="_blank">BingMapsImageryProvider</a>: 使用 <a href="https://learn.microsoft.com/en-us/bingmaps/rest-services/?redirectedfrom=MSDN" target="_blank">Bing Maps REST服务</a>访问瓦片。可以在<a href="https://www.bingmapsportal.com/" target="_blank">https://www.bingmapsportal.com/</a>上创建Bing Maps密钥。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html" target="_blank">ArcGisMapServerImageryProvider</a>: 使用Esri<a href="http://resources.esri.com/help/9.3/arcgisserver/apis/rest/" target="_blank">ArcGIS Server REST API</a>访问由ArcGIS MapServer托管的瓦片。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/GoogleEarthEnterpriseMapsProvider.html" target="_blank">GoogleEarthEnterpriseMapsProvider</a>: 提供对组织的<a href="http://www.google.com/enterprise/mapsearth/products/earthenterprise.html" target="_blank">Google Earth Enterprise</a>服务器中存储的影像的访问。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/MapboxImageryProvider.html" target="_blank">MapboxImageryProvider</a>: 使用<a href="https://www.mapbox.com/developers/api/" target="_blank">Mapbox API</a>访问瓦片。创建一个账户并提供<a href="https://www.mapbox.com/account/apps/" target="_blank">访问Token</a>。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/SingleTileImageryProvider.html" target="_blank">SingleTileImageryProvider</a>: 从单个影像创建一个瓦片。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html" target="_blank">UrlTemplateImageryProvider</a>: 创建自定义的切片方案。通过使用URL模板连接到各种影像源。例如，TMS的URL模板可以是//path-to-tiles/{z}/{x}/{reverseY}.jpg。</li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/TileCoordinatesImageryProvider.html" target="_blank">TileCoordinatesImageryProvider</a>: 通过在每个瓦片周围绘制边框并标注其级别、X坐标和Y坐标，展示了地球如何按照特定的切片方案划分为瓦片。</li>
        </ul>
        <h2>跨域资源共享<span>Cross-origin resource sharing</span></h2>
        <p>作为安全措施，Web浏览器防止 JavaScript 代码读取来自不同站点的影像。特别是，像 CesiumJS 这样的<a href="https://www.khronos.org/webgl/" target="_blank">WebGL</a>应用程序，如果这些影像（在我们的情况下是影像瓦片）来自不同的主机名或端口，并且服务器没有明确允许以这种方式使用影像，则<a href="https://www.khronos.org/webgl/security/#Cross-Origin_Media" target="_blank">禁止使用图像作为纹理</a>。通过在 HTTP 响应中包含<a href="http://enable-cors.org/" target="_blank">跨域资源共享</a>（CORS）头，服务器表明这些图像不包含机密信息，因此其他站点可以安全地读取它们的像素。</p>
        <p>不幸的是，并非所有影像服务都支持CORS。对于那些不支持CORS的服务，必须使用与托管应用的网站相同源的代理服务器。在使用这样的代理时，对于Web浏览器和CesiumJS客户端来说，瓦片看起来就像来自同一个源。要在影像提供程序中使用代理，请在构建影像提供程序时使用proxy属性。Cesium包含了一个Node.js编写用于开发目的<a href="https://github.com/CesiumGS/cesium/blob/1.26/server.js#L87-L128" target="_blank">简单代理</a>。</p>
        <monaco-editor v-model="code06" height="240px" />
        <p>如果托管公共影像，我们鼓励按照这里描述的方式启用CORS，而不是使用代理。</p>
        <h2>影像提供程序与图层的区别<span>Imagery providers vs. layers</span></h2>
        <p>到目前为止，我们还没有明确区分影像提供程序和图层。影像提供程序使用特定的服务请求瓦片，而图层代表来自影像提供程序的显示瓦片。例如，</p>
        <monaco-editor :model-value="code07" />
        <p>或者简写</p>
        <monaco-editor :model-value="code08" />
        <p>我们通常构建一个影像提供程序只是为了创建一个图层，然后我们可以通过图层的属性（如<span class="code">show</span>、<span class="code">alpha</span>、<span class="code">brightness</span>和<span class="code">contrast</span>）来改变它的可视外观。请参阅<a href="https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html" target="_blank">ImageryLayer</a>。将影像提供程序和图层解耦使得编写新的影像提供程序更容易。</p>
        <p>影像图层集合（Imagery Layer Collection）类似于上述示例中的图层，决定了图层绘制的顺序。图层的绘制顺序是根据它们被添加的顺序从底部到顶部进行的。使用诸如add、remove和get等函数，可以像操作其他Cesium集合一样来操作影像图层集合。此外，还可以使用raise、raiseToTop、lower和lowerToBottom等方法对图层进行重新排序。请参阅<a href="https://cesium.com/learn/cesiumjs/ref-doc/mageryLayerCollection.html" target="_blank">ImageryLayerCollection</a>。</p>
        <h2>异步影像提供程序和错误处理<span>Async imagery providers and error handling</span></h2>
        <p>一些影像提供程序，例如<span class="code">IonImageryProvider</span>和<span class="code">BingMapsImageryProvider</span>，需要进行异步网络请求进行初始化。有两种处理方式。第一种是我们在上面的所有示例中使用的方式：<span class="code">ImageryLayer.fromProviderAsync</span>是一个辅助方法，它会在后台处理异步代码流程，使应用代码完全同步。</p>
        <p>然而，如果需要对流程或潜在错误处理有更多的控制权，可以使用<span class="code">fromUrl</span>工厂函数创建异步影像提供程序。</p>
        <monaco-editor :model-value="code09" height="280px" />
        <h2>资源<span>Resources</span></h2>
        <p>可以在Sandcastle中查看有关影像图层的示例：</p>
        <ul>
            <li><a href="https://sandcastle.cesium.com/?src=Imagery%20Layers.html" target="_blank">Imagery Layers</a> - 来自本教程的代码示例</li>
            <li><a href="https://sandcastle.cesium.com/?src=Imagery%20Layers%20Manipulation.html" target="_blank">Imagery Layers Manipulation</a> - 可以从多个源加载图层影像，并且可以独立地调整每个图层的alpha值</li>
            <li><a href="https://sandcastle.cesium.com/?src=Imagery%20Adjustment.html" target="_blank">Imagery Adjustment</a> - 可以调整影像图层的亮度、对比度、伽马值、色相和饱和度。</li>
        </ul>
        <p>此外，还请查看参考文档：</p>
        <ul>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/?classFilter=ImageryProvider" target="_blank">所有影像提供程序</a></li>
            <li><span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html" target="_blank">ImageryLayer</a></span></li>
            <li><span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayerCollection.html" target="_blank">ImageryLayerCollection</a></span></li>
        </ul>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-imagery/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
