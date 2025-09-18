<template>
<div class="wrap">
    <div class="container">
        <h1>使用 Cesium Stories 创建交互式3D展示<span>Create an Interactive 3D Presentation with Cesium Stories</span></h1>
        <p>这篇教程将带你了解如何使用Cesium Stories来创建一个交互式的3D演示，展示墨尔本是如何追踪行人活动的。</p>
        <p>本章将学习如何：</p>
        <ul>
            <li>创建一个包含多个场景的故事。</li>
            <li>将谷歌实境3D瓦片或额外的3D数据包含在你的故事中。</li>
            <li>上传二维数据并将其添加到场景中。</li>
            <li>在网络上分享一个含有批注的故事。</li>
        </ul>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-infobox.jpeg" alt=""><em>查看我们在本教程中创建的<a href="https://ion.cesium.com/stories/viewer/?id=bc9cf675-c8dd-409c-8a13-052bd65de63f" target="_blank">最终故事</a>。</em></p>
        <h2>步骤 1：创建新故事<span>Step 1: Create a new story</span></h2>
        <p>如果尚未拥有<a href="https://ion.cesium.com/signin/" target="_blank">Cesium ion</a>账户，那么请创建一个账户。</p>
        <p>前往<a href="https://cesium.com/ion/stories/" target="_blank">Stories</a>标签页，然后点击<strong>New Story</strong>按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-new-story-button.jpeg" alt=""></p>
        <p>这将打开故事编辑器：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-stories_interface.jpg" alt=""></p>
        <h2>步骤 2：前往墨尔本<span>Step 2: Travel to Melbourne</span></h2>
        <p>Cesium Stories默认包含Cesium World Terrain、Cesium OSM Buildings和Bing Imagery。还可以访问来自Google Maps Platform的Photorealistic 3D Tiles。这些全球图层为故事提供了真实世界的背景，并作为故事的数据的基础。在本教程中将与澳大利亚墨尔本市的3D数据进行交互。</p>
        <p>让我们先看一下我们故事的发生地。在右上角的搜索栏中输入<strong>“Bourke Place, Australia”</strong>，然后选择第一个结果：</p>
        <p><img src="/static/img/tutorial/cesium-ion/460de7c9-6ad3-4279-9e22-4d363d894d1d_tutorials-stories-introduction-melbourne_search.png" alt=""></p>
        <p>可以从Cesium OSM Buildings图层中看到墨尔本的所有建筑物。可以点击任何建筑物以查看其特征数据，例如名称、高度或地址（如果有相关信息）。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-select_melbourne_building.jpg" alt=""></p>
        <h2>步骤 3：捕获视图<span>Step 3: Capture the view</span></h2>
        <p>点击顶部的<strong>Capture View</strong>（捕捉视角）按钮。这样可以在工作时保存位置，以防关闭故事。</p>
        <p>可以随时按顶部右侧相机控件中的主页图标，将相机重置回当前幻灯片的保存视角。</p>
        <p><img src="/static/img/tutorial/cesium-ion/592d459d-7818-4e01-8b0a-86a78f30e367_capture-view-cesium-stories.png" alt=""></p>
        <div class="note">
            <p>Cesium Stories默认会自动保存，这样就不会丢失任何编写的内容或添加的数据。</p>
            <p>相机视图仅在点击<strong>Capture View</strong>（捕捉视角）时保存，而不像其他内容那样自动保存，这样可以在移动相机并探索场景时，不会意外覆盖为观众编排的视图。</p>
        </div>
        <h2>步骤 4：将墨尔本数据添加到幻灯片中<span>Step 4: Add Melbourne data to your slide</span></h2>
        <h3>移除 Cesium OSM Buildings<span>Remove Cesium OSM Buildings</span></h3>
        <p>我们要替换这个建筑图层，所以请使用左侧的资产面板，将 Cesium OSM Buildings 从您的故事中删除。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-delete_buildings.jpg" alt=""></p>
        <p>接下来，将为墨尔本市添加新的3D数据。可以选择包括来自Google Maps平台的实境3D瓦片或墨尔本市的高分辨率无人机捕捉数据。</p>
        <h3>备选方案1：包括全球范围的实境3D瓦片<span>Alternative 1: Include Photorealistic 3D Tiles for the entire globe</span></h3>
        <p>在Cesium Stories中添加实境3D瓦片非常简单：在<strong>Terrain</strong>下拉菜单中，选择<strong>Google Photorealistic 3D Tiles</strong>。</p>
        <p><img src="/static/img/tutorial/cesium-ion/870cf3c5-04d4-4c72-88a5-3ebda41c447e_stories-intro-tutorial-terrain.png" alt=""></p>
        <p>当进行此选择时，先前包括在<strong>Assets</strong>（资产）中的其他影像图层会自动被取消选择并从视图中移除，因为它们会与实境3D瓦片重复。</p>
        <div class="note">
            <p>Google实境3D瓦片目前是实验性版本。<a href="https://cesium.com/blog/2023/05/10/cesium-partners-with-google-maps-platform/" target="_blank">了解更多信息</a>。</p>
        </div>
        <h3>备选方案2：添加墨尔本市的高分辨率无人机捕捉数据<span>Alternative 2: Add high-resolution drone capture of Melbourne</span></h3>
        <p>第一步是将3D墨尔本瓦片集添加到Cesium ion账户中。这个模型已经在Cesium ion资产库中提供，我们在那里精选数据，供故事中使用。</p>
        <p>点击屏幕左上角的Cesium ion图标退出Cesium Stories。</p>
        <p><img src="/static/img/tutorial/cesium-ion/8e39583c-8d3d-4fdc-a76e-5ffdb9d5c80c_cesium-ion-home.png" alt=""></p>
        <p>前往<a href="https://cesium.com/ion/assetdepot/" target="_blank">资产库</a>。</p>
        <p>搜索<strong>Melbourne Photogrammetry</strong>，并点击<strong>Add to my assets</strong>：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-add_asset.jpeg" alt=""></p>
        <p>这个资产现在已经准备好在故事中使用了。</p>
        <p>在故事编辑器中重新打开你的故事，并点击<strong>Add asset</strong>：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-add_asset_in_story.jpeg" alt=""></p>
        <p>双击墨尔本测绘模型将其添加到故事中：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-select_asset.jpg" alt=""></p>
        <p>现在故事中有了墨尔本摄影测绘模型。</p>
        <div class="note">
            <p>这个模型的大小超过了10GB，但是可以通过Cesium ion以3D Tiles格式高效地通过网络加载它。</p>
            <p>在不丢失细节的情况下能够创建包含大量3D内容的场景。</p>
        </div>
        <h2>步骤 5：捕捉天际线<span>Step 5: Capture the skyline</span></h2>
        <p>为了为我们的故事设定场景，我们希望第一张幻灯片能够从城市的优美景观开始。请继续使用鼠标或触摸屏在3D视图中探索摄影测量模型。右上角的相机控制功能允许您旋转和倾斜相机，以及进行放大和缩小。</p>
        <p>这是我们为我们的故事最终选择的视角：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-skyline.jpg" alt=""></p>
        <p>在对视图满意时，点击顶部的<strong>Capture View</strong>按钮。</p>
        <h2>步骤 6：添加信息框内容<span>Step 6: Add infobox content</span></h2>
        <p>让我们添加一些内容来向读者介绍我们的故事。给幻灯片加一个像这样的<strong>title</strong>：</p>
        <div class="note">
            <p>The world’s most livable city</p>
            <p>全球最宜居城市</p>
        </div>
        <p>然后复制以下文本，并粘贴到<strong>infobox</strong>输入区域：</p>
        <div class="note">
            <p>Melbourne, Australia was ranked the most livable city in the world according to <a href="//www.economist.com/blogs/graphicdetail/2015/08/daily-chart-5" target="_blank">The 2015 Economist Intelligence Unit ranking</a>.</p>
            <p>A big factor in this ranking is how walkable the city is, which Melbourne excels at.</p>
            <p>How does the city ensure it stays walkable as it evolves? By monitoring pedestrian activity!</p>
            <p>根据<a href="//www.economist.com/blogs/graphicdetail/2015/08/daily-chart-5" target="_blank">2015年经济学人智库的排名</a>，澳大利亚墨尔本被评为世界上最宜居的城市。</p>
            <p>这一排名的一个重要因素是城市的步行便利性，而墨尔本在这方面表现卓越。</p>
            <p>城市在发展过程中如何确保保持步行便利呢？通过监测行人活动！</p>
            <p>当展示故事时，这些内容将出现在幻灯片中。现在来查看目前的进展情况。</p>
            <p>点击右上角的<strong>Present</strong>按钮。这将在另一个窗口中启动故事查看器。应该会看到信息框内容出现在幻灯片中：</p>
        </div>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-infobox.jpeg" alt=""></p>
        <p>我们尚未共享演示文稿，因此此链接仅供您使用。关闭此窗口，返回编辑器。</p>
        <h2>步骤 7：可视化行人传感器<span>Step 7: Visualize the pedestrian sensors</span></h2>
        <p>对于第二张幻灯片，我们希望在这张3D地图上叠加墨尔本市所有行人传感器的位置。可以通过上传标注了这些位置的KML、GeoJSON或CZML数据集来实现这一点。</p>
        <h3>将数据上传到故事中<span>Uploading data to your story</span></h3>
        <p>在 Stories 编辑器中的任何时候都可以拖放一个数据集以将其添加到 Cesium ion 帐户中。上传的任何数据都会存储在 Cesium ion 帐户中，可以在幻灯片或不同的故事中重复使用它。</p>
        <p>首先，点击<strong>New Slide</strong>并创建一个新的<strong>地图幻灯片</strong>：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-new_map_slide.jpg" alt=""></p>
        <p>然后 <a href="https://s3.amazonaws.com/cesiumjs/downloads/Melbourne_Sensors_Activity.czml" target="_blank" download="Melbourne_Sensors_Activity.czml">下载包含传感器位置和元数据的 CZML 文件</a>。将其拖放到编辑器中的任何位置即可。</p>
        <p>最后按如下所示的<strong>Upload</strong>按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-upload.jpg" alt=""></p>
        <p>在文件上传完成后，点击资产列表中该文件名称旁边的放大镜图标，以将相机定位到该文件。现在，应该能够看到整个城市中所有50个传感器位置的概览：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-overview.jpg" alt=""></p>
        <p>点击<strong>Capture View</strong>。现在，可以在这张幻灯片上填写标题和信息框，提供一些关于这些传感器的信息。</p>
        <p>这是我们幻灯片上的内容：</p>
        <div class="note">
            <p><strong>Title</strong>: The pedestrian counting system（行人计数系统）</p>
            <p><strong>Infobox</strong>: The city has around 50 of these “pedestrian sensors” strategically placed around the city, marked here in red.（城市中大约有50个这样的“行人传感器”，它们被放置在城市的各个关键位置，用红色标出。）</p>
            <p>These are just simple infrared beam sensors, not cameras. They’re placed on street lamps or under awnings to keep count of how many people pass underneath.（这些只是简单的红外线光束传感器，而不是摄像头。它们被放置在路灯或遮阳篷下，以计算经过下方的人数。）</p>
        </div>
        <h2>步骤 8：浏览数据<span>Step 8: Explore your dataset</span></h2>
        <p>我们添加的CZML文件不仅标记了传感器的位置，还为每个传感器的名称以及自2009年以来计数的行人数设置了标签。我们已经设置了这些标签在摄像机接近它们时出现。</p>
        <p>尝试放大到城市中的任何一个红色点，以查看这些元数据：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-metadata.jpeg" alt=""></p>
        <p>一旦找到想保存的有趣视图都可以<strong>创建一个新的地图幻灯片</strong>。这将把当前视图保存到新创建的幻灯片中。</p>
        <h3>点击以查看特征数据<span>Click to inspect feature data</span></h3>
        <p>这是我们注意到一些奇怪之处的地方：231 Bourke St 传感器显示为0行人计数。鉴于这是墨尔本的商业区，周围所有的传感器都在计数数百万人，这显得非常奇怪。</p>
        <p>为了弄清楚这个传感器的特殊之处，请尝试点击它，然后点击<strong>View info</strong>按钮以查看它的所有数据。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-feature_picking.jpg" alt=""></p>
        <p>从安装日期我们可以看出，这是最新的传感器之一。它是在我们最初获取这个数据集的同一周安装的！所以它可能没有机会上传读数。</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-toggle.jpg" alt=""></p>
        <p>只有另外一个传感器显示为零计数。能找到它并为其创建一个新的幻灯片吗？</p>
        <h2>步骤 9：分享故事<span>Step 9: Sharing your story</span></h2>
        <p>当准备好分享演示文稿时，请点击右上角的<strong>Share</strong>按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-share.jpg" alt=""></p>
        <p>给故事一个标题，比如<strong>墨尔本的行人传感器</strong>。</p>
        <p>然后切换<strong>Enable Sharing</strong>（启用分享）按钮：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-enable_sharing.jpg" alt=""></p>
        <p>现在可以将此URL发送给任何人，在故事查看器中展示演示文稿。</p>
        <p>即使启用了分享功能，仍然可以继续编辑故事，并且它将保留相同的URL。当读者下次重新加载该页面时，他们将自动获取新版本。</p>
        <p>可以通过点击<strong>Embed</strong>按钮并复制HTML代码，在网页中轻松嵌入故事。例如，这可以是将3D地理空间演示添加到WordPress网站的简便方法。</p>
        <p>如果希望在某人查看故事时自动播放幻灯片，请将字符<span class="code">&play</span>添加到故事URL的末尾。</p>
        <p>可以随时点击分享按钮，再次将其关闭以取消分享。故事链接将只能自己访问。</p>
        <h2>下一步<span>Next steps</span></h2>
        <p>现在知道如何在单个场景中组合不同的2D和3D数据集，保存摄像机视图，并串联一个可以在网络上分享的故事线。</p>
        <p>还可以通过故事功能做更多的事情。以下是一些想法：</p>
        <h4>测量数据<span>Measurements</span></h4>
        <p>Stories提供了一套高保真度的测量工具，可用于轻量级分析，包括测量距离、高度、坡度和面积。可以在故事查看器中演示时访问这些工具，并点击测量图标以展开工具栏。在这里，我们正在测量ME银行屋顶的面积：</p>
        <p><img src="/static/img/tutorial/cesium-ion/tutorials-stories-introduction-area.jpg" alt=""></p>
        <h4>探索更多墨尔本的开放数据<span>Explore more of Melbourne’s open data</span></h4>
        <p>墨尔本市政府在他们的数据门户网站上开放了许多数据集。可以找到有关自行车使用情况、所有公共烧烤位置甚至全年蝴蝶出没情况的数据集！</p>
        <p>如果有任何反馈、问题或制作了一些很酷的东西想要分享，<a href="https://cesium.com/contact/" target="_blank">我们非常乐意听取意见</a>！查看完整的格式列表，了解可以上传到故事中使用的格式。</p>
        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/ion/stories-introduction/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>