<template>
<div class="wrap">
    <div class="container">
        <h1>Cesium ion 存档和导出<span>Cesium ion Archives and Exports</span></h1>
        <p>通过 Cesium ion 的档案和导出功能，可以根据自己的需求最大限度地利用数据。</p>
        <p>即将学习如何：</p>
        <ul>
            <li>创建一个可下载的资产存档</li>
            <li>从Cesium ion下载资产存档到计算机</li>
            <li>在本地托管已下载的资产</li>
            <li>将资产从Cesium ion导出到S3</li>
            <li>使用AWS S3托管资产</li>
        </ul>
        <h2>前提条件<span>Prerequisites</span></h2>
        <ul>
            <li>需要一个Cesium ion账户。</li>
            <li>（仅适用于导出）AWS访问凭据或生成临时凭据的能力。</li>
        </ul>
        <h2>简要声明<span>Quick facts</span></h2>
        <ul>
            <li><strong>Archives</strong>（存档）允许将数据从Cesium ion下载到本地计算机。创建的每个存档的大小都会影响账户的存储配额。</li>
            <li><strong>Exports</strong>（导出）功能允许将数据复制到AWS S3存储桶中。每个导出的大小都会计入账户的每月流量配额。</li>
            <li>可以多次将资产导出到不同的位置。</li>
            <li>存档和导出也可通过 REST API 进行编程访问，这样就可以将它们集成到自己基于 Cesium ion 的应用程序中。</li>
            <li>只能存档或导出上传到Cesium ion的数据。例如Cesium World Terrain和Cesium OSM Buildings等资产库资产不能被下载或导出。</li>
            <li>在显示已下载/导出的内容时，必须提供归属信息。</li>
        </ul>
        <h2>创建并下载资产存档<span>Create and download an asset Archive</span></h2>
        <p>存档功能允许为资产创建一个压缩的ZIP文件。一旦创建了存档，可以将其下载用于在应用程序中的离线使用。</p>
        <div class="note">
            <p>创建的每个存档都会影响到账户的<strong>存储配额</strong>。如果需要更多的账户存储空间，请<a href="https://cesium.com/platform/cesium-ion/pricing/" target="_blank">升级Cesium ion计划</a>。</p>
        </div>
        <ol>
            <li>
                <p>在Cesium ion仪表板的<strong>My Assets</strong>选项卡中找到想要存档的资产。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-ion/7ddee848-f5de-4d51-a216-1a7c0a384919_FindAsset.png"></p>
            </li>
            <li>
                <p>在窗口右侧的资产详细信息面板中，点击<strong>Make available for download</strong>（可下载）开关按钮。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-ion/a0617a73-bd46-454f-9a86-9273959625ad_toggleArchive.png"></p>
            </li>
            <li>
                <p>Cesium ion将处理文件以创建存档。根据资产的大小，这可能需要一些时间。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-ion/0d3e7e9f-bc28-475e-b0be-b7f779c430d1_ArchiveInProgress.png"></p>
            </li>
            <li>
                <p>当资产准备就绪时，将在<strong>Make available for download</strong>（可下载）开关旁边看到一个下载文件的链接。点击链接开始下载。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-ion/c3a4977e-051b-4d4e-bab4-13dffcab1a07_downloadArchive.png"></p>
            </li>
        </ol>
        <h2>在应用中使用已下载的资产<span>Using downloaded assets in your applications</span></h2>
        <h3>直接从磁盘加载<span>Load directly from disk</span></h3>
        <p>可以直接在应用程序中使用下载的资源。在不同的Cesium集成中，这个过程可能会有所不同。</p>
        <h4>CesiumJS</h4>
        <p>可以按照<a href="https://github.com/CesiumGS/cesium/tree/main/Documentation/OfflineGuide" target="_blank">这个指南</a>从文件路径加载栅格影像。</p>
        <p>从文件路径加载3D瓦片集可能会导致CORS错误。因此，建议使用本地文件服务器来托管3D瓦片集。请参考下面的说明来了解如何使用本地文件服务器。</p>
        <h4>Cesium for Unreal<span>Unreal中使用Cesium</span></h4>
        <p>可以按照<a href="https://cesium.com/learn/unreal/unreal-datasets/#loading-datasets-from-other-sources" target="_blank">这个教程</a>从文件路径加载瓦片集和栅格影像。</p>
        <h3>在本地服务器上托管资源<span>Host assets on a local server</span></h3>
        <p>作为直接从磁盘使用资源的替代方案，可以将资源托管在本地服务器上。</p>
        <p>数据可以使用任何静态文件服务器进行托管，例如<a href="https://www.npmjs.com/package/http-server" target="_blank">http-server npm包</a>。在托管数据之前，请确保解压缩存档文件。</p>
        <h2>将资产导出到S3<span>Export an asset to S3</span></h2>
        <p>“导出”功能允许将资产的副本发送到亚马逊S3存储桶。然后，该资产可以与其他AWS基础设施一起直接用于托管，或作为应用程序流水线的一部分使用。</p>
        <div class="note">
            <p>每个导出都会对帐户的<strong>月度流量配额</strong>产生影响。如果需要更高的数据流传输能力，请<a href="https://cesium.com/platform/cesium-ion/pricing/" target="_blank">升级Cesium ion计划</a>。</p>
        </div>
        <ol>
            <li>
                <p>在Cesium ion仪表板的<strong>My Assets</strong>选项卡中找到想要导出的资产。</p>
            </li>
            <li>
                <p>切换到资产详细信息面板中的<strong>Exports</strong>标签页。在这个标签页中，可以创建新的导出并查看导出历史记录。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-ion/51767e99-9076-47fb-9989-631f1182359b_exportTab.png"></p>
            </li>
            <li>
                <p>点击<strong>Export asset</strong>按钮</p>
                <p><img alt="" src="/static/img/tutorial/cesium-ion/5ff7353f-5b7d-4da8-8480-e865e445b2db_exportButton.png"></p>
            </li>
            <li>
                <p>会弹出一个新的弹窗，显示导出的选项。</p>
                <p><img alt="" src="/static/img/tutorial/cesium-ion/f5f37a74-e57f-49e1-bdd7-f0b5436d6e95_exportS3.png"></p>
            </li>
            <li>
                <p>填写要存储数据的存储桶名称和存储桶内的前缀。例如，“my-bucket” 和 “ion-exports-tutorial/test” 将会把数据存储在 “s3://my-bucket/ion-exports-tutorial/test” 中。</p>
            </li>
            <li>
                <p>请使用 AWS 凭据填写剩余的字段。</p>
                <div class="note">
                    <p>虽然任何具有对存储桶写权限的有效 AWS 密钥/密钥对都可以使用，但 Cesium 强烈建议使用带有 24 小时超时的<a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html" target="_blank">IAM 临时安全凭据</a>（尽管对于大多数资产来说，较短的超时时间也可以正常工作）。这样可以确保永久凭据不会被存储在 ion 的服务器和日志中，即使是暂时的。</p>
                </div>
            </li>
            <li>
                <p>点击<strong>Submit</strong>。</p>
            </li>
            <li>
                <p>导出表格将显示一个旋转的图标，表示正在处理导出。对于小型资产，这个过程应该只需要几分钟。较大的资产可能需要更长时间，但可以关闭浏览器窗口，稍后再来检查。</p>
            </li>
        </ol>
        <h2>在应用程序中使用导出的资产<span>Using exported assets in your applications</span></h2>
        <p>尽管可以对导出的资产执行额外的处理，但它们已经准备好直接通过 S3 进行托管。所有必需的内容类型、缓存控制和内容编码的标头都已设置。有关详细信息，请参阅AWS 的官方<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html" target="_blank">静态网站托管</a>文档。</p>
        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/ion/cesium-ion-archives-and-exports/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
