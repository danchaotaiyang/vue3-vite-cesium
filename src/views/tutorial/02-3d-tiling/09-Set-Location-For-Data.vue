<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>设置上传到Cesium ion的数据的位置<span>Set Location for Data Uploaded to Cesium ion</span></h1>
        <p>对于上传一些未进行地理参考的数据，可以使用<strong>3D Tiles Location Editor</strong>来优化其在地球上的位置、旋转和缩放。</p>
        <p>步骤如下：</p>
        <ol>
            <li>在Cesium ion中<strong>My Assets</strong>页面上，在资产预览上方点击<strong>My Assets</strong>。</li>
            <li>选择一个初始位置和地形，然后点击<strong>Next</strong>。</li>
            <li>微调瓦片集的位置、旋转和缩放，并点击<strong>Save</strong>。</li>
        </ol>
        <p>具体细节如下所示。</p>
        <h2>步骤 1：打开该资产的 3D Tiles Location Editor<span>Step 1: Open 3D Tiles Location Editor for the asset</span></h2>
        <ol>
            <li>在<strong>My Assets</strong>页面上，选择要定位的资产。</li>
            <li>在屏幕右上方的预览窗口上方，点击<strong>Adjust Tileset Location</strong>按钮。</li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/tutorials-data-import-locate-adjust-point-cloud.jpg"></p>
        <p>这将打开<strong>3D Tiles Location Editor</strong>的第一页。</p>
        <h2>步骤 2：设置初始位置和地形<span>Step 2: Set the initial location and terrain</span></h2>
        <ol>
            <li>在<strong>3D Tiles Location Editor</strong>的第一页上，通过在<strong>Search</strong>文本框中输入初始位置地址或经纬度坐标来设置大致位置。</li>
            <li>选择一个<strong>Terrain</strong>资产。瓦片集将相对于此地形定位。</li>
            <li>点击<strong>Next</strong>。</li>
        </ol>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/tutorials-data-import-locate-initial.jpg"></p>
        <h2>步骤 3：微调瓦片集的位置、旋转和缩放<span>Step 3: Fine tune the position, rotation, and scale of your tileset</span></h2>
        <p>在<strong>3D Tiles Location Editor</strong>的第二页上，可以微调位置、旋转和缩放。可以使用预览中的交互式工具或表单进行微调。</p>
        <ul>
            <li><strong>Click position</strong>按钮在位置变化幅度较大时很有帮助：点击该按钮，并在预览中点击想要使用的位置。</li>
            <li>点击<strong>Zoom to tileset</strong>按钮可以更好地查看设置位置中的瓦片集。</li>
            <li>要使用交互式工具进行微调，请点击菜单圆圈，选择想要使用的工具，然后在箭头上拖动。还可以通过在表单中输入数值来进行相同类型的微调。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/tutorials-data-import-locate-form.jpg"></p>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/tutorials-data-import-locate-interactive.jpg"></p>
        <h2>地球设置<span>Globe settings</span></h2>
        <p>前往<strong>Globe Settings</strong>设置</p>
        <ul>
            <li>禁用/启用影像图层（有时会利于准确查看瓦片集与地面的交点位置）。</li>
            <li></li>
            <li>在选项中更改先前选定的基础地形。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/3d-tiling/tutorials-data-import-locate-globe.jpg"></p>
        <h3>就是这样！<span>That’s it!</span></h3>
        <p>完成后，点击<strong>Save</strong>按钮，然后在顶部工具栏上点击<strong>Back to Assets</strong>按钮。</p>
        <h2>下一步<span>Next steps</span></h2>
        <p>在找到数据后，学习如何使用CesiumJS和<a href="https://sandcastle.cesium.com/" target="_blank">Sandcastle示例</a>进行可视化。</p>
        <p>对于将数据导入Cesium ion的其他方法感兴趣吗？请查看这些用于第三方工具和服务（如Blender和Open Drone Map）的<a href="https://cesium.com/platform/cesium-ion/integrations/" target="_blank">插件</a>。</p>
        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/3d-tiling/ion-tile-set-location/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
