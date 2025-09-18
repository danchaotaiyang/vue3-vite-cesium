<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>Cesium Stories中3D瓦片进行样式处理<span>Styling 3D Tiles in Cesium Stories</span></h1>
        <p>这篇教程将带领你学习如何在 Cesium Stories 中使用<strong>styling editor</strong>（样式编辑器）。我们将创建一个地图来可视化纽约市每栋建筑物的年代，但你也可以应用相同的概念来为其他类型的 3D Tiles（如点云）设置样式。</p>
        <p>本章将学习如何：</p>
        <ul>
            <li>在故事中添加经过 Cesium 筛选的 3D 数据</li>
            <li>根据不同类型的元数据为3D内容中的特征进行着色优化</li>
            <li>分享一个带有注释的故事</li>
        </ul>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-teaser.jpg" alt=""><em>Cesium Stories中使用样式处理来可视化每栋建筑物的年代。<a href="https://cesium.com/ion/stories/viewer/?id=a4c1afb2-be92-401d-9058-fc025f6c8810" target="_blank">观看演示</a>，了解您可以通过样式处理实现的效果。</em></p>
        <h2>步骤 1：获取纽约市的3D建筑物<span>Step 1: Get 3D Buildings of New York City</span></h2>
        <p>从<strong>将纽约市的3D建筑物添加到Cesium ion账户</strong>开始。</p>
        <p>首先，注册或登录到<a href="https://cesium.com/ion" target="_blank">Cesium ion</a>。</p>
        <p>接下来，前往 <a href="https://cesium.com/ion/assetdepot/" target="_blank">Asset Depot</a>（资产库）。在这里可以找到我们精选的资产，这些资产已经准备好在故事中使用。</p>
        <p>搜索<strong>New York City 3D Buildings</strong>（纽约市的3D建筑物），选择它，然后点击下方的<strong>Add to my assets</strong>按钮。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-add_depot_asset.jpg" alt=""></p>
        <p>这个瓦片集现在已经可以在故事中使用了。</p>
        <h2>步骤 2：在新故事中添加数据<span>Step 2: Add data to a new story</span></h2>
        <p>前往<a href="https://cesium.com/ion/stories/" target="_blank">Stories tab</a>选项卡，然后点击<strong>New Story</strong>按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/9a78cf8a-07cb-4cb3-a51b-a2dbbd97fb30_new-story-button.jpg" alt=""></p>
        <p>将打开故事编辑器。默认情况下，您的故事中包含 Cesium OSM Buildings，这是一个具有丰富元数据的全球 3D 建筑层。它是为了在世界各地提供城市背景或为您自己的数据增添价值而设计的很好的基础部分。</p>
        <p>故事是关于展示纽约市建筑物的年代，因此我们将使用来自纽约市开放数据门户网站的资产替换 Cesium OSM Buildings，以获取我们所需的要素数据。</p>
        <p>点击左侧资产列表中的垃圾桶图标，将 Cesium OSM Buildings 从此故事中移除：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-delete_buildings.jpg" alt=""></p>
        <p>现在通过点击<strong>Add asset</strong>（添加资产）来添加纽约市的建筑物：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-add_asset.jpg" alt=""></p>
        <p>找到<strong>New York City 3D Buildings</strong>（纽约市3D建筑物）瓦片集，然后点击<strong>Add</strong>。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-add_nyc.jpg" alt=""></p>
        <p>已经将这个3D瓦片集添加到了故事中。要实际看到它，我们需要将相机拉近一些。点击资产名称旁边的放大镜图标，可以自动缩放到它。</p>
        <p>可以通过鼠标、触摸屏或右上角的小部件来移动和倾斜相机，以获得一个漂亮的俯拍曼哈顿的视角，如下所示。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-nyc.jpg" alt=""></p>
        <p>最后，点击<strong>Capture View</strong>（捕捉视图）按钮，保存当前幻灯片上的相机位置。</p>
        <h2>步骤 3：创建一个样式<span>Step 3: Create a style</span></h2>
        <p>现在我们已经向故事中添加了一些数据，让我们看看如何对其进行样式设置。</p>
        <p>要访问样式编辑器，请点击资产名称旁边的样式图标。3D瓦片集必须具有某些每个要素的元数据，才能使此按钮可用。</p>
        <p>在样式编辑器中，点击<strong>New style</strong>（新建样式）：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-styles_list.jpg" alt=""></p>
        <p>在这里，可以选择要用于样式设置的元数据属性。</p>
        <p>从属性下拉菜单中选择<strong>Year</strong>（年份）。选择<strong>Graduated</strong>（渐变）作为样式类型，因为我们要对一个连续的数值进行样式设置。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-create_style.jpg" alt=""></p>
        <p>这个建筑数据集是从2014年的航空调查中生成的，所以将上限设置为<strong>2014</strong>，然后将下限设置为<strong>1890</strong>，如下所示。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-graduated_year.jpg" alt=""></p>
        <p>现在已经创建了一个样式，根据建筑的年龄对每个建筑物进行着色——建筑越老，蓝色就越深。</p>
        <p>点击左下角的<strong>Okay</strong>（确定）按钮以保存这个样式。再次点击<strong>Okay</strong>（确定）将该样式应用到这个瓦片集上。</p>
        <h2>步骤 4：检查单个建筑物的特征数据<span>Step 4: Inspect feature data on individual buildings</span></h2>
        <p>应用样式是揭示整个切片集中模式的好方法。如果想查看任何单个要素（例如建筑物）的数据，可以单击它并选择<strong>View info about</strong>（查看有关信息）按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-picking.jpeg" alt=""></p>
        <p>通过这种方式，可以准确查看该特定建筑物是在哪一年建造的。可以对具有定义特征的任何资源进行此类检查，例如3D Tiles、KML、GeoJSON或CZML。</p>
        <div class="note">
            <p>如果要素数据中有一个名为或包含“name”的字段，当选择该要素时，它将自动用作信息框的标题。</p>
            <p>如果找不到“name”字段，Cesium Stories将查找名为“title”、“id”或“identifier”的字段。在纽约市的切片集中，信息框的标题是SOURCE_ID，因为这是找到的第一个包含“id”的字段。</p>
        </div>
        <h2>步骤 5：自定义样式<span>Step 5: Customize your style</span></h2>
        <p>刚刚创建的样式很难准确确定给定建筑在颜色光谱中的位置，因为它是一个连续的渐变。让我们修改这个样式，定义离散的区间，这样我们可以准确区分最古老的建筑物所在的位置。</p>
        <p>要编辑样式，请首先点击资产名称旁边的样式图标，返回到样式编辑器，然后点击我们刚刚创建的样式上的编辑按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-edit_style.jpg" alt=""></p>
        <p>通过在左上角点击<strong>Palette</strong>（调色板），选择一个在两端具有两种明显颜色的调色板，以在最古老和最新的建筑之间创建更强烈的对比。我们选择了下面的红蓝调色板：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-palette.jpg" alt=""></p>
        <p>这将自动将范围分成5个相等的段落。可以随时修改每个段落的颜色和值，还可以删除或添加新的段落。</p>
        <p>点击<strong>Classify</strong>切换按钮。这将把样式从渐变变为离散的块状：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-classify_style.jpg" alt=""></p>
        <p>将图例标题从<strong>Year</strong>编辑为<strong>Construction Year</strong>，以使可视化内容更加清晰明确。</p>
        <p>最后点击<strong>Okay</strong>保存，然后点击<strong>Okay</strong>应用样式。</p>
        <p>已经创建了一个样式，可以清楚地看到最古老和最新的建筑物所在的位置。</p>
        <div class="note">
            <p>在样式编辑器中创建的任何样式都可以在不同的3D瓦片或不同的故事中重复使用。因此，可以将相同的样式应用于不同城市的3D建筑，以便轻松进行比较。</p>
            <p>通过这种方式，可以修改样式，就像我们刚刚所做的那样，而无需返回到使用它的每个数据集中进行更新。</p>
        </div>
        <h2>步骤 6：按类型进行样式设置<span>Step 6: Style by type</span></h2>
        <p>我们将看一下分类数据的最后一种元数据。这个3D瓦片中的每座建筑物都按照最常见的所有者许可类型进行了分类。我们将创建一个样式来可视化拥有更多单位的建筑物是由个人还是公司拥有的。</p>
        <p>每张幻灯片中的资源可以应用不同的样式。点击<strong>New Slide</strong>（新建幻灯片），在左侧的幻灯片列表中选择<strong>Map slide</strong>（地图幻灯片），创建一个新的幻灯片，用于接下来我们即将创建的新样式。</p>
        <p>再次进入样式编辑器，点击<strong>New style</strong>（新建样式），然后从属性下拉菜单中选择<strong>Majority_Ownership_Type</strong>。</p>
        <p>这次我们选择<strong>Categorized</strong>（分类）作为样式类型。</p>
        <p>此属性的一个类别是“个人”。将其输入到值和标签字段中，然后点击加号按钮。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-individual_condition.jpg" alt=""></p>
        <p>value字段应包含在数据集中要进行匹配的确切值，因此它是区分大小写的。label字段可以是在图例中想要显示的任何有意义的名称。</p>
        <p>按照下面的示例填写两个类别，分别是<span class="code">Corporation</span>（公司）和<span class="code">Other Government Agency</span>（其他政府机构）。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-all_conditions.jpg" alt=""></p>
        <p>编辑图例标题，删除下划线，将其称为<strong>Majority Ownership Type</strong>（大部分所有权类型）。还可以通过拖动行重新排序图例项。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-legend_reorder.gif" alt=""></p>
        <p>点击<strong>save</strong>，然后点击<strong>Okay</strong>应用样式。</p>
        <p>现在可以通过可视化看到曼哈顿在公司所有权方面超过个人所有权。能找到城市中其他地区这种趋势逆转的情况吗？</p>
        <p>尝试创建几张幻灯片，来捕捉任何有趣的模式。</p>
        <h2>步骤 7：分享故事<span>Step 7: Share your story</span></h2>
        <p>当准备好分享演示文稿时，请点击右上角的<strong>Share</strong>（分享）按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-share_button.jpg" alt=""></p>
        <p>给您的故事一个标题，例如<strong>Exploring New York City’s Building Data</strong>（探索纽约市建筑数据）。</p>
        <p>然后切换<strong>Enable Sharing</strong>（启用共享）按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-styling-stories-share.jpg" alt=""></p>
        <p>现在可以分享此URL，以在Stories viewer中展示演示文稿。</p>
        <h2>下一步<span>Next steps</span></h2>
        <p>现在，已经学会了如何使用样式编辑器，可以通过将自己的数据上传到Cesium ion上来尝试它。或者在<router-link :to="{ name: 'Cesium-Ion-Stories-Introduction' }" target="_blank">我们的教程</router-link>中查看可以使用Cesium Stories做什么。</p>
        <p>如果有任何问题或反馈，我们<a href="https://cesium.com/contact" target="_blank">非常乐意听取</a>！</p>
        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/ion/stories-styling/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>