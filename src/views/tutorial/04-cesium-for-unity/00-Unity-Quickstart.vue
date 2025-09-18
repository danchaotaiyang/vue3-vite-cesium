<script setup>

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>Cesium for Unity 快速入门<span>Cesium for Unity Quickstart</span></h1>
        <p>这是一个使用Cesium World Terrain和Cesium OSM Buildings构建Cesium for Unity应用程序的快速入门指南。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/0994e363-c079-4bdb-adf4-9574cf6269fb_00_Preview_1.jpg" alt=""><em>芝加哥为背景的Cesium for Unity场景，使用了Cesium World Terrain和Cesium OSM Buildings</em></p>
        <p>本章将学习如何：</p>
        <ul>
            <li>将Cesium for Unity包导入到Unity中。</li>
            <li>创建一个关卡并从Cesium ion导入资源。</li>
            <li>设置项目的默认ion资产Token。</li>
            <li>使用Cesium的DynamicCamera在场景中进行导航。</li>
        </ul>
        <h2>前提条件<span>Prerequisites</span></h2>
        <ul>
            <li>需要安装Unity 2021.3.2f1或更高版本。建议使用最新版本的<a href="https://unity3d.com/unity/qa/lts-releases" target="_blank">Unity 2021.3+ LTS</a>。关于安装Unity的说明，请访问<a href="https://unity3d.com/get-unity/download" target="_blank">Unity下载页面</a>并参考<a href="https://docs.unity3d.com/Manual/GettingStartedInstallingUnity.html" target="_blank">Unity安装指南</a>。</li>
            <li>需要一个 Cesium ion 账户来将地形和建筑物等资产推流到 Unity 中。如果您还没有 Cesium ion 账户，请<a href="https://cesium.com/ion/signup" target="_blank">注册</a>一个免费的 Cesium ion 账户。</li>
        </ul>
        <div class="note">
            <p>Cesium ion 是一个用于流媒体和托管3D内容的开放平台，其中包括全球范围内经过精选的数据，可以使用这些数据来创建自己的真实世界应用程序。</p>
        </div>
        <h2>步骤 1：创建一个新项目并导入 Cesium For Unity 软件包<span>Step 1: Create a new project and import the Cesium For Unity package</span></h2>
        <p>1、创建一个新的Unity项目。Unity建议使用Unity Hub创建项目，您可以<a href="https://unity.com/unity-hub" target="_blank">在此处下载Unity Hub</a>。本教程是使用Unity Hub 3.3.0编写的。</p>
        <p>通过点击<strong>New project</strong>（新建项目）按钮，在<strong>Projects</strong>（项目）选项卡中创建一个新项目。</p>
        <p>一个新窗口应该会打开，允许配置项目。本教程使用<strong>3D (URP)</strong>模板，但 <strong>3D (HDRP)</strong>模板也可以使用。给项目命名，并选择其文件存储位置。然后，点击<strong>Create project</strong>（创建项目）。新项目将很快打开。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/24788502-f6ad-4452-9ea1-86fb9405172e_02_UnityHubConfiguration.png" alt=""></p>
        <div class="note">
            <p>Cesium for Unity 可以与<strong>Universal Render Pipeline (URP)</strong>和<strong>High Definition Render Pipeline (HDRP)</strong>配合使用。但是，它不支持Unity的内置渲染器。如果您选择空的3D项目作为模板，在Cesium加载的数据集将无法正确渲染。</p>
        </div>
        <p>2、项目完全加载后，通过菜单中的<strong>Edit</strong>（编辑） > <strong>Project Settings...</strong>（项目设置...）打开<strong>Project Settings</strong>（项目设置）。</p>
        <p>3、在左侧点击<strong>Package Manager</strong>（包管理器）部分。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/a7bc17a3-8b8c-42e3-9852-e1523aed3dfd_02a_ProjectSettings.png" alt=""></p>
        <p>4、添加一个新的<strong>Scoped Registry</strong>（作用域注册表），并设置如下内容，然后点击<strong>Save</strong>（保存）：</p>
        <p><strong>Name</strong>: Cesium</p>
        <p><strong>URL</strong>: https://unity.pkg.cesium.com</p>
        <p><strong>Scope(s)</strong>: com.cesium.unity</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/1bf7010b-5659-40fc-9d8e-f8ae13560b1c_02b_ScopedRegistryConfig.png" alt=""></p>
        <p>5、关闭项目设置，然后通过菜单中的<strong>Window</strong>（窗口） > <strong>Package Manager</strong>（包管理器）打开<strong>Package Manager</strong>（包管理器）。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/ead8b7a0-7147-4299-ab60-0f91d7d35ee0_03_WindowPackageManager.png" alt=""></p>
        <p>6、在包管理器中，点击<strong>Packages</strong>（包）下拉菜单并选择<strong>My Registries</strong>（我的注册）。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/883a7799-b16c-4652-99bb-a33fbaf93c39_03a_MyRegistries.png" alt=""></p>
        <p>7、<strong>Cesium for Unity</strong>将出现在包列表中。点击它，然后点击<strong>Install</strong>（安装）。Cesium for Unity 和它的依赖项将被下载和安装。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/43684675-18bd-43ee-9e2b-966c6567793a_03b_CesiumInMyRegistries.png" alt=""></p>
        <h2>步骤 2：连接到Cesium ion<span>Step 2: Connect to Cesium ion</span></h2>
        <p>1、通过选择菜单中的<strong>Cesium</strong> > <strong>Cesium</strong>打开<strong>Cesium</strong>窗口。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/e51a5148-42cd-41fd-a542-27504545451e_10_CesiumMenuItem.png" alt=""></p>
        <p>2、点击<strong>Connect to Cesium ion</strong>（连接到 Cesium ion）按钮。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/2319a3a6-c12a-419e-9a2b-80076c2f62ce_ConnectToIon.png" alt=""></p>
        <p>3、一个弹出的浏览器窗口将打开。如果尚未登录，请登录 Cesium ion 账户。也可以使用 Epic Games、Github 或 Google 账户进行登录。</p>
        <p>4、登录后，将看到一个提示，询问是否允许 Cesium for Unity 访问资产。选择<strong>Allow</strong>（允许），然后返回到 Unity 继续操作。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/93d1d8c8-498d-4751-a1ea-2ccb6e1fbedd_12_AllowIonAccess.png" alt=""></p>
        <p>5、现在将为项目创建一个<strong>default access token</strong>（默认访问Token）。从Cesium ion流式传输的每个资产都需要访问Token。在本教程中，将设置一个全局使用的项目访问Token，所有资产都将使用它。</p>
        <p>点击<strong>Cesium</strong>窗口顶部的<strong>Token</strong>按钮。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/879c2c0b-2129-4891-bd11-9b5b46dcbcf1_13_IonToolbarToken.png" alt=""></p>
        <p>6、一个新的窗口将出现用于配置令牌。选择<strong>Create a new token</strong>（创建一个新的Token）选项，并根据需要重命名令牌。然后，点击<strong>Create New Project Default Token</strong>（创建新项目默认Token）按钮。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/6d8f87b5-8ee0-476f-88ae-10af99cda022_14_SelectIonTokenWindow.png" alt=""></p>
        <p>创建的新Token将被添加到Cesium ion账户中。<br>如果已经在Cesium ion账户中拥有一个想使用的Token，可以选择从<strong>Use an existing token</strong>（使用现有Token）下拉框中选择它，而不是创建一个新的Token。</p>
        <div class="note">
            <p>由Cesium for Unity创建的Token只能访问允许的资产。这遵循了Cesium ion账户的安全最佳实践。每当使用<strong>Cesium</strong>面板或<strong>Cesium ion Assets</strong>（Cesium ion资产）面板向场景中添加资产时，Cesium for Unity将自动更新Token的适当权限。<br>可以选择手动配置Token，并在<a href="https://cesium.com/ion/tokens?page=1" target="_blank">Cesium ion的访问Token页面上</a>添加或删除资产。</p>
        </div>
        <h2>步骤 3：在场景中添加一个地球<span>Step 3: Add a globe to your scene</span></h2>
        <p>Unity 在创建新项目时会自动创建一个<strong>SampleScene</strong>场景。您可以随意更改场景的名称。请在<strong>Hierarchy</strong>窗口中查看场景是否包含<strong>Main Camera</strong>和<strong>Directional Light</strong>。</p>
        <p><img src="/static/img/tutorial/cesium-for-unity/447db548-7b69-4833-b57a-57d983e1167e_15_BasicSceneHierarchy.png" alt=""></p>
        <p>如果这些对象中有任何一个缺失，可以通过单击<strong>GameObject</strong> > <strong>Camera</strong>或<strong>GameObject</strong> > <strong>Light</strong> > <strong>Directional Light</strong>菜单来添加它们。具体取决于选择的渲染管线，场景中可能会有其他对象，这也是可以接受的。</p>
        <p>在场景中有了这些基本对象后，可以准备从Cesium ion中添加一个资源。</p>













        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/unity/unity-quickstart/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>