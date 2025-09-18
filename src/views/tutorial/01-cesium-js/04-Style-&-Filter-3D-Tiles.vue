<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const viewer = `const viewer = new Cesium.Viewer('cesium-container');`;

const code01 = ref({
    js: `osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
    color: {
        conditions: [
            [ '\${name} === "Crown Entertainment Complex"', 'color("red")' ],
            [ 'true', 'color("white")' ]
        ]
    }
});`
});

const code02 = ref({
    js: `osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
    show: '\${feature["building"]} === "residential" || \${feature["building"]} === "apartments"'
});`
});

const code03 = ref({
    js: `osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
        distanceFromComplex: 'distance(vec2(\${feature["cesium#longitude"]}, \${feature["cesium#latitude"]}), vec2(144.96007, -37.82249))'
    },
    color: {
        conditions: [
            [ '\${distanceFromComplex} > .01', 'color("#d65c5c")' ],
            [ '\${distanceFromComplex} > .006', 'color("#f58971")' ],
            [ '\${distanceFromComplex} > .002', 'color("#f5af71")' ],
            [ '\${distanceFromComplex} > .0001', 'color("#f5ec71")' ],
            [ 'true', 'color("#ffffff")' ]
        ]
    }
});`
});

const code04 = ref({
    js: `pointCloudTileset.style = new Cesium.Cesium3DTileStyle({
    color: {
        conditions: [
            // 广场
            [ '\${classification} === 2', 'color("brown")' ],
            // 低植被
            [ '\${classification} === 3', 'color("greenyellow")' ],
            // 中等植被
            [ '\${classification} === 4', 'color("green")' ],
            // 高植被
            [ '\${classification} === 5', 'color("darkgreen")' ]
        ]
    }
});`
});

const code05 = ref({
    js: `osmBuildingsTileset.style = new Cesium.CesiumTileStyle({
    color: {
        conditions: [
            [ '\${material} === null', 'color("white")' ],
            [ '\${material} === "glass"', 'color("skyblue", .5)' ],
            [ '\${material} === "concrete"', 'color("grey")' ],
            [ '\${material} === "brick"', 'color("indianred")' ],
            [ 'true', 'color("white")' ]
        ]
    }
});`
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>样式设计和过滤3D瓦片<span>Styling and Filtering 3D Tiles</span></h1>
        <p>本指南讲述了如何使用CesiumJS来对3D瓦片进行设计和筛选，以突出显示数据集中的重要元素。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-3d-tiles-styling-melbourneHeatmapHalf.jpg"><em class="alt">使用3D瓦片样式创建的墨尔本热力图。左侧：OSM建筑物3D瓦片。右侧：点云3D瓦片。</em></p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <ul>
            <li>具有属性或分类的3D瓦片。可以上传自己的数据，也可以使用Cesium的精选3D瓦片之一，例如OSM建筑物或蒙特利尔点云，这些可以在Cesium ion资产库中找到。要将数据集转换为3D瓦片，请查看我们<a href="https://cesium.com/docs/tutorials/ion-intro/" target="_blank">导入数据的快速指南</a>。</li>
        </ul>
        <div class="note">
            <p>Cesium ion的瓦片流水线目前支持3D建筑物和点云的元素数据，并且我们正在努力添加更多功能。</p>
        </div>
        <ul>
            <li>关于CesiumJS的基础知识。对于初学者，可以访问 <router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门</router-link>教程。</li>
            <li>Cesium ion账户用于生成JSFiddle代码示例的访问Token（<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门</router-link>的第一步）。</li>
        </ul>
        <h2>3D瓦片的样式语言<span>The styling language for 3D Tiles</span></h2>
        <p>3D瓦片的样式语言允许定义数据集中元素的外观规则，例如建筑物的颜色或显示的建筑物类型。这对于识别城市中的模式或创建更具信息性的可视化非常有帮助。</p>
        <p>样式是使用JSON和JavaScript表达式定义的。此外，样式语言提供了一组<a href="https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling#built-in-functions" target="_blank">built-in functions</a>（内置函数），以支持常见的数学运算，例如<span class="code">min</span>（最小值）、<span class="code">distance</span>（距离）和<span class="code">log</span>（对数）。</p>
        <p>本指南包含了3D瓦片样式语言中常用部分的示例：</p>
        <ul>
            <li>样式选项<span class="code">show</span>和<span class="code">color</span>。</li>
            <li><span class="code">条件</span>检查（conditions），包括元素属性检查、null检查和点云中点的<span class="code">分类</span>（Classification）检查。</li>
            <li>使用<span class="code">defines</span>创建新变量。</li>
            <li><span class="code">distance</span>（距离）函数。</li>
            <li>创建新的颜色定义。</li>
        </ul>
        <p>要深入了解3D瓦片的样式和过滤功能，请参阅<a href="https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling" target="_blank">3D Tiles Styling Specification</a>（3D瓦片样式规范）的详细文档。在<a href="https://sandcastle.cesium.com/" target="_blank">Sandcastle</a>中还有更多示例可供参考（搜索“styling”）。</p>
        <h3>什么是3D瓦片元素？<span>What is a 3D Tiles feature?</span></h3>
        <p>元素可以是单独的建筑物、门、窗户、阀门或点云中的点等。</p>
        <h2>应用基本样式<span>Apply a basic style</span></h2>
        <p>我们可以使用两种常见的方法将样式应用于3D瓦片：通过<span class="code">show</span>和<span class="code">color</span>视觉属性。一旦确定了样式规则，我们可以通过将3D瓦片的<span class="code">style</span>成员变量设置为新的<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Cesium3DTileStyle.html" target="_blank">Cesium3DTileStyle</a></span>来将其应用于元素。</p>
        <p>对于下面的代码片段，我们使用Cesium OSM Buildings 3D瓦片和澳大利亚墨尔本的Crown Entertainment Complex。规则是<strong>将名为“Crown Entertainment Complex”的建筑物设置为红色，而其他建筑物设置为白色</strong>。CesiumJS将高效地将此规则应用于每个元素，并替换元素上的任何现有样式。我们选择的元素属性是<span class="code">name</span>，在数据集中已经存在。</p>
        <monaco-editor v-model="code01" height="200px" />
        <p><a class="btn-sandcastle" href="https://sandcastle.cesium.com/#c=rVZtb9s2EP4rB2eoZcCVX/LWuLaxxG2HDCsyIMH6IQoMWjrHXGhSICm7Xpv/viMl1XKsGRlQf5FIPs/x7uHDkzsd+E0zaWGChmfL32+BxTEaA1bBRmUauJLAjEFrItnpFLDwWskwwTnLhL30+Dv1hBJGEDWmjjaNPW5K7Clz61PrANOo8T6SkVwxDSuOa9REkbguw/7l54KokdMnSlrGJeqo0YZvkQSwqDXNDErCXT4O51otvygtkmIiaLUdnEm+ZJaSGMCcCYM0+dzyGVApl8nfmbFgFwgxW6Jmrmah1BMwC59RzKgOiZSsTyrMMaEDXNrARa8kPmHa0huTxz6VD/ioEU3QOzkJL8663fM2vD0+D9/1+ycXeWa13KAbdgnZO+36l17fPVuRrKScwM3tZ7jKuEi4fATLBdLZQC6pMstyxdwVKyNga8bL8w1jjcziTQV4aTYyDtwWRaEmRolhqvmSW75CE7IkCWpCb7NKU7Fx2TCYMcNjMHYjSLh5JmPr/eMAV27p1q0Erfwwa2KGnrprivxx/MFBcr5nA8RKKD2AYuTGMuFuQzOA+3IS6LXxyzdJp/cMo9EImhOt1hI+SvKSc9cSnfvVMhX4temMRu5zgYOmxqTZihoP7Z1YVme4A1svuMVdYPn27J/ecs+FWLcLtYY5HUKm0Ti9MAGSKNUqpXw2FdUMIT8VwC/cLv4sID9LPhd/AE6cIp375qyI13wotKKteUICcSaa8P07HMKylIzs1DROxr3CJ06tbeVrqqhyYpW6vazVwic/UD+rdGpd1FZMxTsJN5bJGAfbs44a5WSwwrgfVGrP29ORUPKR2yxB0qANNevUe4rlVht8kNqO0Cr0Kg3z/6xdZvkMY6B+0evuuPMoOTuNT+MaI+8xu2e7zPnpu4vz3quY/ZdMNn8ls9t7ScW4lrp3747m/ve6m+faI3kzI4MkKs6cTcNHtB8FuterzXVCX52EblhCzSFq5L3NEUKVet3vuw8hPVBg7JrqD7eWltzrcW7n/Si9w1H++87Xh+sfDnfwKr2IKOMFk49YF8aJRz1uSWs7u/tBvjsm1zLBrw/vHZ7PIfD4N2/AblJUc0+vpDpy/xTKfUju0uk7MJ8iHWKZ577EjXZj6O/9uDz/X/kyVdpCpkUQhh0Kl9ItRNOZZfETdYnYmDwqwLBTpQ4TvgKejGr+e0As6B/QyCUsxC3/h2w4HnYIv0cVirmedLNCLdjGwRa98R/5ZBiGww4N65lWKTFjtNl4a/phoVa5fZ7Y21lmrRMtJ249W2XmJ0QHJzIkELWEsf9Kg5cPvH7DTo46wKO7OfYfrNJDjp9/sEpnviIKNYdx3v0/7XT/rRn3gtDZ+NpLnSqa/Qs" target="_blank">在Sandcastle中打开</a></p>
        <p>我们可以通过在查看器中点击元素来查看元素属性的列表。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-3d-tiles-styling-nameAttribute.jpg"></p>
        <h2>基于属性显示元素<span>Show features based on a property</span></h2>
        <p>除了着色之外，3D瓦片的样式语言还允许根据元素的元数据属性来显示和隐藏元素。</p>
        <p>这是来自Cesium OSM Buildings tileset的墨尔本所有建筑物。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-3d-tiles-styling-showAllBuildings.jpg"><em>在只显示住宅建筑之前的墨尔本</em></p>
        <p>假设我们想要找到墨尔本所有的住宅建筑物，这些建筑物在OSM Buildings中使用<span class="code">building</span>（建筑物）属性分类为“residential”或“apartment”。</p>
        <monaco-editor v-model="code02" height="160px" />
        <p><a class="btn-sandcastle" href="https://sandcastle.cesium.com/#c=rVZtb9s2EP4rB2eoZcCVX/LWuLaxxG2HDCsyIMH6IQoMWjrHXGhSICm7Xpv/viMl1XKsGRlQf5FEPs/x7uHDozsd+E0zaWGChmfL32+BxTEaA1bBRmUauJLAjEFrItnpFLDwWskwwTnLhL30+Dv1hBJGEDWmjjaNPW5K7Clz81PrANOo8T6SkVwxDSuOa9REkbguw/7lx4KokdMnSlrGJeqo0YZvkQSwqDWNDErCXf4dzrVaflFaJMVA0Go7OJN8ySwlMYA5EwZp8LnlM6BSLpO/M2PBLhBitkTNXM1CqSdgFj6jmFEdEilZn1SYY0IHuLSBi15JfMK0pTcmj30qH/BRI5qgd3ISXpx1u+dteHt8Hr7r908u8sxquUE37BKyd9r1L72+e7YiWUk5gZvbz3CVcZFw+QiWC6S9gVxSZZbljLkrZkbA1oyX+xvGGpnFmwrw0mxkHLglikJNjBLDVPMlt3yFJmRJEtSE3maVpmLjsmEwY4bHYOxGkHDzTMbW+8cBrtzUrZsJWvlm1sQMPXXXFPnj+IOD5HzPBoiVUHoAxZf7lgl3C5oB3JeDQK+NX75J2r1nGI1G0JxotZbwUZKXnLuW6NyvlqnAr01nNHKfCxw0NSbNVtR4aO/EsjrDHdh6wS3uAsu3Z//0lnsuxLpdqDXMaRMyjcbphQmQRKlWKeWzqahmCPmpAH7hdvFnAflZ8rn4A3DiFOncN2dFvOZDoRUtzRMSiDPRhO/f4RCWpWRkp6ZxMu4VPnFqbStfU0WVHavU7WWtFj75gfpZpVProrZiKt5JuLFMxjjY7nXUKAeDFcb9oFJ73p6OhJKP3GYJkgZtqJmn3lNMt9rgg9R2hFahV2mY/2ftMstnGAP1i153x51HydlpfBrXGHmP2T3bZc5P312c917F7L9ksvkrmd3eSyrGtdS9c3c097/XnTzXHsmbGRkkUXHmbBo+ov0o0L1eba4TunUSOmEJNYeokfc2RwhV6nW/7z6E9ECBsWuqP9xaWnKvx7mV96P0Dkf57zNfH65/ONzBo/QioowXTD5iXRgnHvW4Jc3trO4/8tUxuZYJfn147/B8DoHHv3kDdpOimnt6JdWR+6dQrkNyl07fgfkUaRPLPOskLrLfSYLS7NHUAS0b7cbQ94tx6Ztf+TJV2kKmRRCGHUojpdOLpjPL4ifqLrExeTYAw06VOkz4CngyqvnPArGgf04jV6gQt/wfsu942CH8HlUo5nrZzQq1YBsHW/TGf+SDYRgOO/RZz7RKiRmjxcbbwzIsVC6XzxN7O8usdWLnxK3Xq8x8Z2nDRYYEolYy9rc7eNnB6z7s5KgDPDrTY3/Rlfo7fn7RlbvwiijUVMb5rfFp59bYmngvCO2Nr73UqaLZvw" target="_blank">在Sandcastle中打开</a></p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-3d-tiles-styling-showOnlyResidentialBuildings.jpg"><em>只显示墨尔本的住宅建筑物</em></p>
        <h2>使用条件对要素进行着色<span>Color features using conditions</span></h2>
        <p>还可以使用条件来确定元素分配的颜色。</p>
        <p>例如，希望在墨尔本Crown Entertainment Complex（皇冠娱乐中心）周围的区域为游客设计一条公交路线。距离娱乐中心一定距离内有哪些建筑物？</p>
        <p>这段代码片段<strong>根据建筑物与皇冠娱乐中心的距离</strong>为每个建筑物分配一个颜色。</p>
        <monaco-editor v-model="code03" height="300px" />
        <p><a class="btn-sandcastle" href="https://sandcastle.cesium.com/#c=rVZtb9s2EP4rB2eoZcCVX/LWuLaxxG2HDCsyIMH6IQoMWjrHXGhSICm7Xpv/viMl1XKsGRlQf5FEPs/x7uHDozsd+E0zaWGChmfL32+BxTEaA1bBRmUauJLAjEFrItnpFLDwWskwwTnLhL30+Dv1hBJGEDWmjjaNPW5K7Clz81PrANOo8T6SkVwxDSuOa9REkbguw/7lx4KokdMnSlrGJeqo0YZvkQSwqDWNDErCXf4dzrVaflFaJMVA0Go7OJN8ySwlMYA5EwZp8LnlM6BSLpO/M2PBLhBitkTNXM1CqSdgFj6jmFEdEilZn1SYY0IHuLSBi15JfMK0pTcmj30qH/BRI5qgd3ISXpx1u+dteHt8Hr7r908u8sxquUE37BKyd9r1L72+e7YiWUk5gZvbz3CVcZFw+QiWC6S9gVxSZZbljLkrZkbA1oyX+xvGGpnFmwrw0mxkHLglikJNjBLDVPMlt3yFJmRJEtSE3maVpmLjsmEwY4bHYOxGkHDzTMbW+8cBrtzUrZsJWvlm1sQMPXXXFPnj+IOD5HzPBoiVUHoAxZf7lgl3C5oB3JeDQK+NX75J2r1nGI1G0JxotZbwUZKXnLuW6NyvlqnAr01nNHKfCxw0NSbNVtR4aO/EsjrDHdh6wS3uAsu3Z//0lnsuxLpdqDXMaRMyjcbphQmQRKlWKeWzqahmCPmpAH7hdvFnAflZ8rn4A3DiFOncN2dFvOZDoRUtzRMSiDPRhO/f4RCWpWRkp6ZxMu4VPnFqbStfU0WVHavU7WWtFj75gfpZpVProrZiKt5JuLFMxjjY7nXUKAeDFcb9oFJ73p6OhJKP3GYJkgZtqJmn3lNMt9rgg9R2hFahV2mY/2ftMstnGAP1i153x51HydlpfBrXGHmP2T3bZc5P312c917F7L9ksvkrmd3eSyrGtdS9c3c097/XnTzXHsmbGRkkUXHmbBo+ov0o0L1eba4TunUSOmEJNYeokfc2RwhV6nW/7z6E9ECBsWuqP9xaWnKvx7mV96P0Dkf57zNfH65/ONzBo/QioowXTD5iXRgnHvW4Jc3trO4/8tUxuZYJfn147/B8DoHHv3kDdpOimnt6JdWR+6dQrkNyl07fgfkUaRPLPOskLrLfSYLS7NPU4eIb7cbQt4xxaZ1f+TJV2kKmRRCGHcokpQOMpjPL4idqMLExeUIAw06VOkz4CngyqvnbArGgP08jV6sQt/wfcvB42CH8HlUo5trZzQq1YBsHW/TGf+SDYRgOO/RZz7RKiRmjxcbb8zIshC6XzxN7O8usdXrnxK3dq8x8c2nPRYYEom4y9hc8eOXBSz/s5KgDPDrWY3/XlTvg+PldV5r6FVGor4zzi+PTzsWx3cq9ILQ3vvZSp4pm/wI" target="_blank">在Sandcastle中打开</a></p>
        <ul>
            <li>3D瓦片样式<span class="code">条件</span>（conditions）允许在数组中定义诸如<span class="code">颜色</span>之类的特征。</li>
            <li>条件行为类似于if语句。</li>
            <li><span class="code">defines</span>表达式创建新的变量。</li>
            <li><span class="code">distance</span>是3D瓦片样式语言的<span class="code"><a href="https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling#distance" target="_blank">内置函数</a></span>。</li>
            <li>支持CSS样式的<span class="code"><a href="https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling#color" target="_blank">颜色定义</a></span>。</li>
        </ul>
        <p>上述代码片段产生以下样式结果：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-3d-tiles-styling-osmBuildingColorByDistance.jpg"></p>
        <h2>点云样式<span>Style point clouds</span></h2>
        <p><a href="https://github.com/CesiumGS/3d-tiles/blob/master/specification/TileFormats/PointCloud/README.md" target="_blank">point cloud</a>（点云）是一组遵循上述相同样式规则的点，具有一些附加选项。</p>
        <h3>点云样式选项和属性<span>Point cloud styling options and properties</span></h3>
        <p>除了<span class="code">color</span>（颜色）和<span class="code">show</span>（显示）的视觉属性之外，点云瓦片还支持<span class="code">pointSize</span>。默认的<span class="code">pointSize</span>为1.0。</p>
        <p>在Cesium ion上以瓦片方式存储的LAS文件中的点云，每个点都包含两个属性：<span class="code">Classification</span>（分类）和<span class="code">Intensity</span>（强度）。</p>
        <ul>
            <li><span class="code">Classification</span>（分类）是一个整数，映射到点的数据类型，例如地面、低植被或建筑物。</li>
            <li><span class="code">Intensity</span>（强度）是点的表面反射率，是一个介于0到255之间的整数。</li>
        </ul>
        <p>点云的样式化也可以应用于其他点属性，如位置、颜色和法线。例如，可以基于点云瓦片相对于中心点的距离使用<span class="code">POSITION_ABSOLUTE</span>元数据属性创建一个热力图，类似于我们根据建筑物相对于Crown Entertainment Complex（皇冠娱乐中心）的距离对OSM建筑物进行着色（请参阅<a href="https://sandcastle.cesium.com/#c=dVTbjts2EP0VwghgCVBp6i4lziKOu0WMul1j7TQvAgKaorNsaNIgKW3dhf+9pC5OnSB6sDzDmXNm5gw1m20kEwYsuWxqsD+DjZIHCDbUUAUWnFMRgKXkzXHPMPgoWEuVZuYMHuVeGkY0WOM9BFuChWDiiwNYcPo3FrWSYKckIZIzYE3wBzaUgSWTBCvOKKxEixVoGX22RG+BoM9gSTVrjvCvzudNSWcupTCYCaqmAXipBLCPLU1Zl620ZbXNfj1mEkUtyyepeL3rYzy/Ehf/TSV6uidbCf+eb2vTqNieMKH3LRXmQx/k9bVBTaig0DbYYu2QBgyoqVmJU2MWxDApvEMj+j/UYfhjrY7VdmwsFRaW9wb0xMjXjbTzvObB02A6JpdPpNCSU8jlF++K4w4vwc/q351PFK7vf9t9Xq5Xy9+/da/NmVNbw1BaTQ92rtqOb3B0TqYNFoRa75RwfDx5o8d79bJ52K52q4c/Py/ebx/WH3f3toiWkthLEhRmZQmTMInLMgyTAERRisIIZqjMwyxMUBqAJC3TJA5hEucoTKOi9H0wA1EKUQCQ+wkh8qd9LZdg7J9Lp/D0yP7xOsOrJmfKuXyuJn4ARpeidWe/ehnrvTioy7V5wzi1kt1K37/iX3f9ofcCGsWv67SS4pFq2ShC4UHJ40I7zWsvzJIo9EG3VwMsHGf7E/CtO/a6IJd1uwWKHa3mLdUQ17U3IA6y3e7gkSrsFs9dEe8qozZMYLc0r2/ox23p5cmTBGaJFSiNR3lSK0WI8sIKhtJo0CdCMM6TvEiSOPYHEaRidq9+pPhAcW1v/YYZ8vQoOfdSS5HlcVygFMVlnuYB+AXBKM8ylIdpXMRlUWQByGBUhJa0yNMEIVSk327pJJjMuzHd9dTv2PEklXG6eBDODD2euL3jerZvyFc7d6K7SzmfjUnzmrWA1W+ryXffj2oC7EJrbU8ODedb9i+tJnfzmY2/SeOya+rBfuk4PruQp/Bu3TshhPOZNX/MMlLyPVb/Q/wP" target="_blank">热力图Sandcastle示例</a>）。</p>
        <h3>点云样式化示例<span>Point cloud styling example</span></h3>
        <p>假设想要可视化加拿大蒙特利尔生物圈博物馆周围的环境。样式规则是：<strong>如果点的<span class="code">Classification</span>（分类）属性是植被，则将其着色为绿色</strong>。</p>
        <monaco-editor v-model="code04" height="300px" />
        <p><a class="btn-sandcastle" href="https://sandcastle.cesium.com/#c=lVRbb9s2FP4rB8aAOoBGU6QudmYH85wVCNCu2JJuD9VQ0CJtEaVIg6LseYX320ddbMhNgGwvInku3/nORWfPLOylOAgLC9DiACtRybpEv7eycTbK2/fKaMekFjYbBfA10wBOWOslt2eHp+6NNtaUfxireC8Y3wSNOdOyZE4a77BhqhKZPt38kOlMTyawhH9CDGuplNfDzkjtgN7Dk1SiEg7MBlwhIJfu2NzfeypWMBXAimnGGeRs52orOEgNBIcxHKQrgIEVlVF1E7NxIxjyErWg3LPhUJjK+ev62GcA3hBleu8L0lJYKVPzM4cFsAOT7pxsd9D7Xt0m/WD0svKPBz4m01kU93WCAdpjwbjU29uzxpfFOaHrvjDO1iI4a0r2lyzrcjk0IL32FPTl6zqHqlxogXZWltLJvagQ43z8LIlLvd+qIzjTFvUnaapdIayA93Ul6vICmbNSWIa8WzMJ45YwF5WTuucymJUVs87fmKbjjl9IkhkNZ2ga4elsFmI87Yl/H5EZpThEU28RUhInvSKKSZqSCMVJSP0Zh424mxxjpfDD10XtC8elFfnrPHxAjNKIxDjGPipOp5QEAxWNPAccJTgNoxkhdKiL04TGCaU0STGNorBT3fQm9e4/RPbIcRxiQqn/pLMwHeJ7KjiJaBonU4zpNLrofGhfDEJIRHwtMA7pMPSp/QpW+Tl6W+u+CD2Nn6/E6NePy/vflk8Pq88Pv3z+8PEpuPx0z2YDVe6oxPUKGA75Y6PupiA3ythLJ3KjuWyiVbfw6ZzCp2z03deVYlUlNzJvW3eCxWIBpFkffqc0EOM3a2sO+s1NNvoz6PzAD+fWmlrzV5HoFdLWCqGPQilz6PE8kn/AXmxFNzuvIkbPEb/lVgreLIr/ARpfgXJmv1wDe9BCbouXIZt9cOV/KKQTrW9n1R6nvqujYDRvu3h3hvhRljtjHdRWjRGaOFHuFPNzOlnX+Rff87yqGsfGdD4Zus653IPkixe2P+RNll6zqZV6lH97gnfzibd/5qpMu+w+7IVV7NiYFeHdu06IEJpP/PNlT2eMWjP7DfK/" target="_blank">在Sandcastle中打开</a></p>
        <p>应用了样式规则后，我们可以可视化博物馆周围有多少植被。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-3d-tiles-styling-bioMuseumMontrealPointCloudClassified.jpg"></p>
        <h2>处理未定义的属性<span>Handle undefined properties</span></h2>
        <p>有时建筑物缺少属性。在这种情况下，我们可以添加一个<span class="code">null</span>检查条件：</p>
        <monaco-editor v-model="code05" height="250px" />
        <p>在这个例子中，如果任何建筑物没有材料元数据属性，它的颜色将是白色。</p>
        <h3>在Cesium Stories中使用样式编辑器<span>Use the styling editor in Cesium Stories</span></h3>
        <p>还可以使用Cesium Stories中的样式编辑器来为3D瓦片设置样式。我们之前介绍的相同样式方法可以在编辑器中应用，而无需编写代码。请参阅Cesium Stories中的<a href="https://cesium.com/learn/ion/stories-styling/" target="_blank">样式编辑器教程</a>。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-3d-tiles-styling-ionStyleEditor.gif"></p>
        <h2>更多资源<span>Additional resources</span></h2>
        <p>请查看Sandcastle中的样式示例，包括：</p>
        <ul>
            <li><a href="https://sandcastle.cesium.com/#c=dVTbjts2EP0VwghgCVBp6i4lziKOu0WMul1j7TQvAgKaorNsaNIgKW3dhf+9pC5OnSB6sDzDmXNm5gw1m20kEwYsuWxqsD+DjZIHCDbUUAUWnFMRgKXkzXHPMPgoWEuVZuYMHuVeGkY0WOM9BFuChWDiiwNYcPo3FrWSYKckIZIzYE3wBzaUgSWTBCvOKKxEixVoGX22RG+BoM9gSTVrjvCvzudNSWcupTCYCaqmAXipBLCPLU1Zl620ZbXNfj1mEkUtyyepeL3rYzy/Ehf/TSV6uidbCf+eb2vTqNieMKH3LRXmQx/k9bVBTaig0DbYYu2QBgyoqVmJU2MWxDApvEMj+j/UYfhjrY7VdmwsFRaW9wb0xMjXjbTzvObB02A6JpdPpNCSU8jlF++K4w4vwc/q351PFK7vf9t9Xq5Xy9+/da/NmVNbw1BaTQ92rtqOb3B0TqYNFoRa75RwfDx5o8d79bJ52K52q4c/Py/ebx/WH3f3toiWkthLEhRmZQmTMInLMgyTAERRisIIZqjMwyxMUBqAJC3TJA5hEucoTKOi9H0wA1EKUQCQ+wkh8qd9LZdg7J9Lp/D0yP7xOsOrJmfKuXyuJn4ARpeidWe/ehnrvTioy7V5wzi1kt1K37/iX3f9ofcCGsWv67SS4pFq2ShC4UHJ40I7zWsvzJIo9EG3VwMsHGf7E/CtO/a6IJd1uwWKHa3mLdUQ17U3IA6y3e7gkSrsFs9dEe8qozZMYLc0r2/ox23p5cmTBGaJFSiNR3lSK0WI8sIKhtJo0CdCMM6TvEiSOPYHEaRidq9+pPhAcW1v/YYZ8vQoOfdSS5HlcVygFMVlnuYB+AXBKM8ylIdpXMRlUWQByGBUhJa0yNMEIVSk327pJJjMuzHd9dTv2PEklXG6eBDODD2euL3jerZvyFc7d6K7SzmfjUnzmrWA1W+ryXffj2oC7EJrbU8ODedb9i+tJnfzmY2/SeOya+rBfuk4PruQp/Bu3TshhPOZNX/MMlLyPVb/Q/wP" target="_blank">3D瓦片点云样式</a> - 用于创建点云3D瓦片热力图的代码示例。</li>
            <li><a href="https://sandcastle.cesium.com/index.html#c=rVdtb9pIEP4rK1QpRiJ+JzY0zV2TVG2kNq0CulN19MNiT8yq9i5aryFclf9+s34hdiDlUPsF7PXOPM/MPLMvlkXekhgyQcQ9YVyBpJFiKyDeNZmyFHKSq03KeDLjlkUm1TNJKU8KmgC5FlGRAVdUMcHHZKHUMh9bVsLUopibkcisK8hZkb2fWF58qrRDS0kAK6M5Yln5EiJ2z6LS3pq0oC4LlsYaK6aKkkgUUkG+0Sxvv16Rz0vg1/rDUkhF0woZgdfrtWPyTWQmYmXlTIEVC6aUxThTjOrAck1kXjs3lxjEjK+oJCsGa5DkDeGwJhVp869yzJj1ovL9SmCgjIOc9Qbkx4wTgiFIHPkixYrFIMeNYSSBKvhbyDSeVlOM/mDGH/uvZxzhSrdmHgEHM0nFHMwYlmoxhVy9TXByrmorpKNkAaWVTj8oohZAqmhSEtEM61VSJ0qQVIjvhCryifIFVYryKrJ69heB+cAso8+a5RXVOWWUe+a9FNk1JFiZ3NCBnQa+aTth6Hi2G9q264cDPezb5tnIcXzP8wLHD12nHA2G3ozr0FponyVrZNHN6QegOvNfmIoWdyJNd6Bdx3SDMBiFQeiOvNAblhinOOz53sgeDu0wcP2zCto27cA5Gw2dEZIdhb4zrJm0U1ylycxB6YIaZeVizDXjtWyfZaj0LJ4CGO8JqpwDPJ5KyvN7IbNt7T9RJdmDb95cv7ud3ky/PtUdK/hR0LgsoRZxo8KclI0ByqxSWL9181b9edfT6mMVRSHTLe6N4HeQY59EUOb0bY7TbmIDq+N7W/V1ErOULGNlU5g0jo0ad0v2SqRCtljOaQ4xwYJiAEwS/EkWmvN9waOy0JE2uNx8KD8Y/bpH6tj0OgIvx6R7H6qoSOVoTOo3/c7jsjT5mPzTDBJ87L36UaE9kos3xLNt3Zqznkzm1PCHA2IPUJ34Zw77s963wcumbsvUcGwX7ZwBcYbOATunYxcgnnOGxq7tHzActuxc10cT9wx/vPAQ0WHLbqihPFvj2QeJtuywnYkTIF4YHKLZim6krWy0cvZkRa9TrbluMCDDEQJ0ZjZPj+V/KcjHl8S2qWWWYr+pIgYUgZCx7lnYo7mP9axfUV0M97i65y3dNdh3uGZRLT6Mrno0Xv1oIB8xxE5cx+n3GUaZddsMnKbQpS/jZFnIZQon+8r1ooeOAwnxUdZOF1/gQpcch+90HGwgTcX6KAd2l0LKsuMI2B3zaEP5yc+EW8+bp8UzmONkG7Mc994IiF6FCdWHpTij8vse1V7XU3+vahsC46c4Z71m0FhB5BotFQue1DIekH3ixuHS5BT35ZETBMEQt/26PIF9dub6/V9rgIYZlk3v5/Yz3SaSbnbLtn3Use36sMMtpWZSxh6MZ1IckHZvDIjRdnRaOgr7xKo8+v2Oy+Po+D+jo88+vMXmid4eQsjjfzHqsDivDOxuR64XeEA+kNq6O17kXjXLlvo2lDb6IbpHtNcaLxbYUifeCZ7J6g3i8uaWLKVYglSbPT02weMYT+4ggYdfP5I0lGc9Q0Ly7mFpIJW+icdoZVRAWDIkhG3TJ3+Q9sqje2bUJ2PSXdD1sNNkphP7ZCHWeNpKN634k/JigUfEBeV60ycZ4Guuk7F7HFvgneR3nMZyJDImnYNBfV7qcp7gQhfhvS4FfZycCpHOqfwEvDBKUdXeFDwo7a0q7eWGVE632sA1AlKIcM42kIb8tg5PUb3uSGfwM5xmSTsS6elkcQRWs7AfifW0HxyBdYvXG1Lq+0i0TmccBvyAcjq+Xl0R7qB8q24bu1Wd8d6gd17K9KLx9SfL9H1fX3sM07QUZEvc+vFKPy+i7yjqKM8bhHOrbXoesxVh8Zs9N3kSpTTP8ct9kaYT9i+W7OLcwvk7pqkob66fVyBTutHTFs7Fx2rQNM1zC1/3W6qqFZ55/g8" target="_blank">Cesium OSM建筑物样式</a> - 用于对OSM建筑物进行样式设置的代码示例。</li>
        </ul>
        <p>要深入了解对3D瓦片进行样式和筛选的文档，请参阅<a href="https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling" target="_blank">3D瓦片样式规范</a>。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-3d-tiles-styling/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
