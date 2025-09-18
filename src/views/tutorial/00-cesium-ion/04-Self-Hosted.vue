<script setup>
import { ref } from 'vue';


const code01 = ref({
    shell: `sudo snap install microk8s --classic`
});

const code02 = ref({
    shell: `sudo usermod -a -G microk8s $USER`
});

const code03 = ref({
    shell: `mkdir ~/.kube
sudo chown -f -R $USER ~/.kube
sudo microk8s config > ~/.kube/config`
});

const code04 = ref({
    shell: `sudo usermod -a -G microk8s $USER`
});

const code05 = ref({
    shell: `mkdir ~/.kube
sudo chown -f -R $USER ~/.kube
sudo microk8s config > ~/.kube/config`
});

const code06 = ref({
    shell: `brew install ubuntu/microk8s/microk8s`
});

const code07 = ref({
    shell: `microk8s install --cpu 4 --mem 12 --disk 128`
});

const code08 = ref({
    shell: `mv /path/to/extracted/folder/ ~/cesium-ion-self-hosted`
});

const code09 = ref({
    shell: `multipass mount . microk8s-vm:/cesium-ion`
});

const code10 = ref({
    shell: `microk8s status --wait-ready`
});

const code11 = ref({
    shell: `microk8s is running
high-availability: no
  datastore master nodes: 127.0.0.1:19001
  datastore standby nodes: none
addons:
  enabled:
    ha-cluster           # (core) Configure high availability on the current node
    helm                 # (core) Helm - the package manager for Kubernetes
    helm3                # (core) Helm 3 - the package manager for Kubernetes
    metrics-server       # (core) K8s Metrics Server for API access to service metrics
  disabled:
    cert-manager         # (core) Cloud native certificate management
    community            # (core) The community addons repository
    dashboard            # (core) The Kubernetes dashboard
    dns                  # (core) CoreDNS
    gpu                  # (core) Automatic enablement of Nvidia CUDA
    host-access          # (core) Allow Pods connecting to Host services smoothly
    hostpath-storage     # (core) Storage class; allocates storage from host directory
    ingress              # (core) Ingress controller for external access
    kube-ovn             # (core) An advanced network fabric for Kubernetes
    mayastor             # (core) OpenEBS MayaStor
    metallb              # (core) Load balancer for your Kubernetes cluster
    minio                # (core) MinIO object storage
    observability        # (core) A lightweight observability stack for logs, traces and metrics
    prometheus           # (core) Prometheus operator for monitoring and logging
    rbac                 # (core) Role-Based Access Control for authorization
    registry             # (core) Private image registry exposed on localhost:32000
    storage              # (core) Alias to hostpath-storage add-on, deprecated`
});

const code12 = ref({
    shell: `microk8s enable helm3
microk8s config > $HOME/.kube/config`
});

const code13 = ref({
    shell: `microk8s ctr image import images/cesium-ion-asset-server.tar
microk8s ctr image import images/cesium-ion-tiling.tar`
});

const code14 = ref({
    yaml: `localPersistentVolumes:
  - name: cesium-ion-tileset-volume
    node: "[NODE NAME FROM STEP 1]"
    path: "[DIRECTORY FROM STEP 6]"
    capacity: 32Gi
  - name: cesium-ion-sources-volume
    node: "[NODE NAME FROM STEP 1]"
    path: "[DIRECTORY FROM STEP 8]"
    capacity: 32Gi`
});

const code15 = ref({
    shell: `cp -r sampleData/* [DIRECTORY FROM STEP 8]`
});

const code16 = ref({
    yaml: `license: ""`
});

const code17 = ref({
    shell: `microk8s helm install cesium-ion cesium-ion/ --values cesium-ion/values.yaml`
});

const code18 = ref({
    shell: `NAME: cesium-ion
LAST DEPLOYED: Fri May 19 16:47:56 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export CLUSTER_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].port}" services cesium-ion)
  export CLUSTER_IP=$(kubectl get --namespace default -o jsonpath="{.spec.clusterIP}" services cesium-ion)
  echo http://$CLUSTER_IP:$CLUSTER_PORT

  If DNS is configured, it can be accessed via
    http://assets.cesium-ion.local/

2. In order to tile your asset, you need to create a Job. You can generate the template by running the following command:

helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml`
});

const code19 = ref({
    shell: `microk8s helm upgrade cesium-ion cesium-ion/ --values cesium-ion/values.yaml`
});

const code20 = ref({
    shell: `echo http://$(microk8s kubectl get --namespace default -o jsonpath="{.spec.clusterIP}" services cesium-ion):$(microk8s kubectl get --namespace default -o jsonpath="{.spec.ports[0].port}" services cesium-ion)`
});

const code21 = ref({
    shell: `microk8s kubectl port-forward service/cesium-ion --address=0.0.0.0 8070`
});

const code22 = ref({
    shell: `microk8s helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml > my_first_job.yaml`
});

const code23 = ref({
    yaml: `command:
    - "pipeline"
    - "--input"
    - "/data/sources/Office_Park/Office_Park.obj"
    - "--input-type"
    - "3D_CAPTURE"
    - "--output"
    - "/data/tilesets/Office_Park"
    - "--output-type"
    - "3DTILES"`
});

const code24 = ref({
    shell: `microk8s kubectl create -f my_first_job.yaml`
});

const code25 = ref({
    shell: `job.batch/cesium-ion-tiling-reality-model created`
});

const code26 = ref({
    shell: `microk8s kubectl get pods`
});

const code27 = ref({
    shell: `NAME                                    READY   STATUS    RESTARTS   AGE
cesium-ion-75c8576f6f-clx7g             1/1     Running   0          13h
cesium-ion-tiling-reality-model-sbxk6   1/1     Running   0          4s`
});

const code28 = ref({
    shell: `microk8s kubectl logs POD_NAME_FROM_ABOVE`
});

const code29 = ref({
    shell: `microk8s helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml > imagery.yaml`
});

const code30 = ref({
    yaml: `command:
    - pipeline
    - "--input"
    - "/data/sources/Courtyard.tif"
    - "--input-type"
    - "RASTER_IMAGERY"
    - "--output"
    - "/data/tilesets/Courtyard"
    - "--output-type"
    - "IMAGERY"`
});

const code31 = ref({
    shell: `microk8s kubectl create -f imagery.yaml`
});

const code32 = ref({
    shell: `microk8s helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml > terrain.yaml`
});

const code33 = ref({
    yaml: `command:
    - pipeline
    - "--input"
    - "/data/sources/ZionNationalPark.tif"
    - "--input-type"
    - "RASTER_TERRAIN"
    - "--output"
    - "/data/tilesets/ZionNationalPark"
    - "--output-type"
    - "TERRAIN"`
});

const code34 = ref({
    shell: `microk8s kubectl create -f terrain.yaml`
});

const code35 = ref({
    shell: `microk8s helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml > points.yaml`
});

const code36 = ref({
    yaml: `command:
    - pipeline
    - "--input"
    - "/data/sources/House.laz"
    - "--input-type"
    - "POINT_CLOUD"
    - "--output"
    - "/data/tilesets/House"
    - "--output-type"
    - "3DTILES"`
});

const code37 = ref({
    shell: `microk8s kubectl create -f points.yaml`
});

const code38 = ref({
    shell: `microk8s helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml > cad.yaml`
});

const code39 = ref({
    yaml: `command:
    - pipeline
    - "--input"
    - "/data/sources/OfficePlan/OfficePlan.obj"
    - "--input-type"
    - "3D_MODEL"
    - "--output"
    - "/data/tilesets/OfficePlan"
    - "--output-type"
    - "3DTILES"`
});

const code40 = ref({
    shell: `microk8s kubectl create -f cad.yaml`
});

const code41 = ref({
    shell: `microk8s helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml > citygml.yaml`
});

const code42 = ref({
    yaml: `command:
    - pipeline
    - "--input"
    - "/data/sources/Reichstag/Reichstag.gml"
    - "--input-type"
    - "CITYGML"
    - "--output"
    - "/data/tilesets/Reichstag"
    - "--output-type"
    - "3DTILES"`
});

const code43 = ref({
    shell: `microk8s kubectl create -f citygml.yaml`
});

const code44 = ref({
    shell: `microk8s helm template cesium-ion/ --values cesium-ion/values.yaml -s templates/job.yaml > kml.yaml`
});

const code45 = ref({
    yaml: `command:
    - pipeline
    - "--input"
    - "/data/sources/Office_Park_KML/doc.kml"
    - "--input-type"
    - "KML"
    - "--output"
    - "/data/tilesets/Office_Park_KML"
    - "--output-type"
    - "3DTILES"`
});

const code46 = ref({
    shell: `microk8s kubectl create -f kml.yaml`
});

const code47 = ref({
    json: `{
    "jobId": "",
    "progress": {
        "percentComplete": 0,
        "status": "COMPLETE",
        "message": "DATA_ERROR",
        "errorJson": ""
    }
}`
});

const code48 = ref({
    shell: `docker load -i images/cesium-ion-tiling.tar`
});

const code49 = ref({
    shell: `docker run --rm -e CESIUM_LICENSE=license -v ~/myInputDir:/input -v ~/myOutputDir:/output cesiumgs/cesium-ion-tiling:1.0.0 bin/runJob.js -i /input/Courtyard.tif --input-type RASTER_IMAGERY -o /output/Courtyard --output-type IMAGERY`
});

const code50 = ref({
    shell: `docker load -i images/cesium-ion-asset-server.tar`
});

const code51 = ref({
    shell: `docker run --rm -p 8070:8070 -e CESIUM_LICENSE=license -v ~/myTilesets:/tilesets cesiumgs/cesium-ion-asset-server:1.0.0 -d /tilesets --dev`
});
</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>自主托管<span>Cesium ion Self-Hosted</span></h1>
        <h2>开始<span>Getting started</span></h2>
        <p>本指南将分步骤讲解 Kubernetes 上使用 Cesium ion 开始并运行起来。虽然期望您有 Kubernetes 的经验，但这个指南是为了即使没有先前的知识，也能从零开始使用 3D 瓦片。</p>
        <h3>包含内容<span>What’s included</span></h3>
        <ul>
            <li><strong>startHere.html</strong> - Cesium ion文档（本文件）</li>
            <li><strong>images/cesium-ion-asset-server.tar</strong> - 用于Cesium ion资产服务器的容器镜像</li>
            <li><strong>images/cesium-ion-tiling.tar</strong> - 用于Cesium ion 3D Tiling Pipeline的容器镜像</li>
            <li><strong>cesium-ion/</strong> - 用于将Cesium ion安装到Kubernetes集群的Helm Charts</li>
            <li><strong>sampleData/</strong> - 在整个文档中使用的示例数据</li>
            <li><strong>thirdParty/</strong> - <span class="code">startHere.html</span>使用的支持代码和数据</li>
        </ul>
        <h3>系统要求<span>System requirements</span></h3>
        <p>任何能够运行Kubernetes的x86-64兼容系统也能够运行Cesium ion。生产工作负载的要求将直接取决于使用情况，而Cesium ion的性能会随着额外的CPU和RAM而扩展。对于本地开发，我们建议使用具有以下属性的集群：</p>
        <ul>
            <li>x86-64兼容处理器</li>
            <li>4个或更多CPU核心</li>
            <li>32GB内存或更大</li>
            <li>至少32GB的存储容量</li>
        </ul>
        <p>另外，为了遵循本指南，需要sudo、管理员或等效的权限。</p>
        <h3>安装 microk8s<span>Installing microk8s</span></h3>
        <p>这个指南使用<a href="https://microk8s.io/" target="_blank">microk8s</a>，这是一个轻量级且易于配置的 Kubernetes 实现。如果想使用已有的 Kubernetes 集群，需要将提供的命令更改为适用于已有 Kubernetes 安装的命令。如果不打算安装 microk8s，可以直接跳到<strong>导入镜像</strong>的部分。</p>
        <el-tabs type="border-card">
            <el-tab-pane label="Linux">
                <p>运行以下命令来使用 snap 安装 microk8s。</p>
                <monaco-editor v-model="code01" />
                <p><strong>更新权限和配置。</strong></p>
                <p>安装完成后，运行以下命令将自己添加到 microk8s 用户组。</p>
                <monaco-editor v-model="code02" />
                <p>还需要在主文件夹中创建一个<span class="code">.kube</span>目录来存储 microk8s 的配置。运行以下命令：</p>
                <monaco-editor v-model="code03" />
                <p>由于我们对组设置进行了更改，在继续之前，必须退出并重新登录。</p>
            </el-tab-pane>
            <el-tab-pane label="Windows">
                <p>我们建议使用<a href="https://learn.microsoft.com/en-us/windows/wsl/" target="_blank">WSL2</a>来设置microk8s环境。使用官方提供的WSL2 microk8s安装说明，链接地址：<a href="https://microk8s.io/docs/install-wsl2" target="_blank">https://microk8s.io/docs/install-wsl2</a></p>
                <p><strong>更新权限和配置</strong></p>
                <p>安装完成后，运行以下命令将自己添加到 microk8s 用户组</p>
                <monaco-editor v-model="code04" />
                <p>还需要在主文件夹中创建一个<span class="code">.kube</span>目录来存储 microk8s 的配置。运行以下命令：</p>
                <monaco-editor v-model="code05" />
                <p>由于我们对组设置进行了更改，必须退出WSL2，并重新运行它，以使更改生效。</p>
                <div class="note">
                    <p>在使用WSL2时，可以轻松访问根目录上的文件，但必须使用Unix风格的路径。例如，如果根目录是<span class="code">C:\</span>，可以在<span class="code">\mnt\c</span>下访问文件。</p>
                </div>
            </el-tab-pane>
            <el-tab-pane label="MacOS">
                <p>Microk8s 在 MacOS 上使用<a href="https://brew.sh/" target="_blank">HomeBrew</a>。运行以下命令安装 microk8s。</p>
                <monaco-editor v-model="code06" />
                <p>现在使用以下命令运行 microk8s 安装程序。这将确保由 VM 创建的节点具有足够的资源来安排和正常运行瓦片工作。它还会提示并安装<a href="https://multipass.run/" target="_blank">multipass</a>：</p>
                <monaco-editor v-model="code07" />
                <div class="note">
                    <p>下一步是将提取的文件移动到主目录（<span class="code">~/</span>）中。这是必需的，因为某些文件夹（如<span class="code">Downloads</span>和<span class="code">Documents</span>）具有内置的 ACL（额外的安全配置）。如果挂载文件夹位于 ACL 目录中，这可能会导致在 microk8s VM 中出现权限错误。</p>
                </div>
                <p>将提取的文件夹移动到主目录中：</p>
                <monaco-editor v-model="code08" />
                <p>进入上面复制的目录，并使用以下命令挂载 cesium ion 自托管目录：</p>
                <monaco-editor v-model="code09" />
            </el-tab-pane>
        </el-tabs>
        <h4>验证安装是否成功<span>Verify installation</span></h4>
        <p>安装完成后，可以通过运行以下命令来确认一切是否正常运行：</p>
        <monaco-editor v-model="code10" />
        <p>这应该会产生类似以下的输出。重要的部分是 "microk8s is running"。如果收到错误，请查看安装 microk8s 部分。</p>
        <monaco-editor v-model="code11" height="530px" />
        <h4>验证所需功能<span>Verify required features</span></h4>
        <p><strong>helm3</strong> 应该默认启用，不需要其他任何操作即可安装和运行应用程序。如果未显示为已启用，应该运行以下命令：</p>
        <monaco-editor v-model="code12" />
        <p>Microk8s 安装了<span class="code">kubectl</span>和<span class="code">helm</span>。可以使用<span class="code">microk8s kubectl</span>和<span class="code">kubectl helm</span>来管理集群。</p>
        <h4>导入镜像<span>Importing images</span></h4>
        <p>运行以下命令将镜像导入到 microk8s 中。每个步骤的镜像导入可能需要几分钟的时间。</p>
        <monaco-editor v-model="code13" />
        <h4>安装 Helm chart<span>Installing the Helm chart</span></h4>
        <p>虽然<span class="code">cesium-ion/values.yaml</span>包含许多配置变量，可以根据确切架构和应用程序需求进行修改，但为了本教程的目的，我们将只执行最少的必需配置。</p>
        <p>Cesium ion tiling 需要访问输入卷和输出卷。我们还将配置资产服务器以使用相同的输出卷进行托管。请按照以下步骤进行配置：</p>
        <div class="note">
            <p>在编辑 cesium-ion/values.yaml 文件时，需要注意以下事项。<br>
               <strong>在 Windows 上</strong>：文件路径应从 WSL2 shell 内部（<span class="code">/mnt/c/...</span>）开始。<br>
               <strong>在 MacOS 上</strong>：文件路径应表示从<span class="code">microk8s</span> VM 内部的文件路径。请记得还要使用必要的权限将在此处使用的文件路径挂载到 microk8s VM 上。</p>
        </div>
        <ol>
            <li>运行<span class="code">microk8s kubectl get nodes</span>命令并复制节点的名称。将在下面用到它。
                <ul>
                    <li>Kubernetes 中的“节点”指的是运行 pod 的硬件。在这种情况下，计算机将是唯一的节点。</li>
                </ul>
            </li>
            <li>在文本编辑器中打开<span class="code">cesium-ion/values.yaml</span>。</li>
            <li>找到<span class="code">localPersistentVolumes</span>部分。</li>
            <li>在<span class="code">cesium-ion-tileset-volume</span>下，将<span class="code">#REQUIRED:“kubectl get-nodes”返回的名称</span>替换为步骤 1 中的节点名称。</li>
            <li>在<span class="code">cesium-ion-sources-volume</span>下，将<span class="code">#REQUIRED:“kubectl get-nodes”返回的名称</span>替换为步骤 1 中的同样的节点名称。</li>
            <li>创建一个用于存放瓦片集数据的目录。</li>
            <li>在<span class="code">cesium-ion-tileset-volume</span>下，用步骤 6 中创建的目录的绝对路径替换<span class="code"># REQUIRED: 文件系统上输出数据的路径</span>。</li>
            <li>创建一个用于存放源数据的目录。这个目录必须与第 6 步中的瓦片集数据目录不同。</li>
            <li>在<span class="code">cesium-ion-sources-volume</span>下，用步骤 8 中创建的目录的绝对路径替换<span class="code"># REQUIRED: 文件系统上输入数据的路径</span>。</li>
        </ol>
        <p>完成后，<span class="code">localPersistentVolumes</span>部分应该根据安装包含正确的信息。</p>
        <monaco-editor v-model="code14" height="220px" />
        <p>我们提供了几种类型的示例数据可供使用。但是需要将数据复制到铺瓦管道可以访问的位置。在本教程中，这就是在上面第8步中创建的目录。现在通过运行以下命令将包含的示例数据复制到该目录中：</p>
        <monaco-editor v-model="code15" />
        <h4>许可证配置<span>License configuration</span></h4>
        <p>Cesium ion需要一个3D Tiling Pipeline许可证，该许可证在<span class="code">cesium-ion/values.yaml</span>文件的顶部进行配置。默认情况下，它将是一个空字符串：</p>
        <monaco-editor v-model="code16" />
        <p>通过执行以下步骤安装许可证：</p>
        <ol>
            <li>从<a href="https://cesium.com/downloads" target="_blank">https://cesium.com/downloads</a>下载许可证文件</li>
            <li>在文本编辑器中打开许可证文件，并将整个内容复制到剪贴板中</li>
            <li>将内容粘贴到<span class="code">cesium-ion/values.yaml</span>顶部的<span class="code">许可证</span>字符串中</li>
        </ol>
        <h4>运行安装命令<span>Running the install command</span></h4>
        <p>确保在前面的部分中保存了对<span class="code">cesium-ion/values.yaml</span>的更改，然后通过运行以下命令安装chart：</p>
        <monaco-editor v-model="code17" />
        <p>应该会看到类似以下的输出。</p>
        <monaco-editor v-model="code18" height="360px" />
        <p>以上表示安装成功。可以暂时忽略输出，因为我们将在下面提供明确的下一步操作。</p>
        <p>如果收到了错误提示，请运行<span class="code">microk8s helm uninstall cesium-ion</span>以确保删除任何部分安装的组件。然后请检查本节，确保没有遗漏任何步骤，并再次尝试安装。</p>
        <div class="note">
            <p>在初始安装之后，除非修改文件后运行helm upgrade命令，否则对<span class="code">cesium-ion/values.yaml</span>的额外更改将不会生效：</p>
            <monaco-editor v-model="code19" />
        </div>
        <h4>访问资产服务器<span>Accessing the asset server</span></h4>
        <p>运行以下命令以获取Kubernetes集群中资产服务器的URL：</p>
        <monaco-editor v-model="code20" />
        <el-tabs type="border-card">
            <el-tab-pane label="Linux">
                <p>在选择的浏览器中访问此URL，将会看到成功加载的首页。请务必在继续之前阅读首页，因为它包含了其他重要信息。</p>
            </el-tab-pane>
            <el-tab-pane label="Windows">
                <p>目前，Windows上的WSL2不支持默认情况下访问除本地IP（0.0.0.0）之外的其他IP地址。最简单的方法是使用<a href="https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/" target="_blank">Kubernetes端口转发</a>来暴露我们的应用程序。通过端口转发，可以将上一步中的ClusterIP IP地址暴露给Windows主机。打开一个新的WSL2窗口，并使用以下命令：</p>
                <monaco-editor v-model="code21" />
                <p>在选择的浏览器中访问http://localhost:8070，将会看到成功加载的页面。请务必在继续之前阅读首页，因为它包含了其他重要信息。</p>
            </el-tab-pane>
            <el-tab-pane label="MacOS">
                <p>为了将multipass虚拟机中的资产服务器暴露给主机，我们建议使用<a href="https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/" target="_blank">Kubernetes端口转发</a>。通过端口转发，可以将上述步骤中的ClusterIP IP地址暴露给MacOS主机。打开一个新的终端标签，并使用以下命令：</p>
                <monaco-editor v-model="code21" />
                <p>在选择的浏览器中访问http://localhost:8070，将会看到成功加载的页面。请务必在继续之前阅读首页，因为它包含了其他重要信息。</p>
            </el-tab-pane>
        </el-tabs>
        <h3>瓦片生成和查看数据<span>Tiling and viewing data</span></h3>
        <p>现在资产服务器正在运行，我们可以对示例数据进行瓦片处理并进行查看。</p>
        <p>Cesium ion的分块处理流程作为一个<a href="https://kubernetes.io/docs/concepts/workloads/controllers/job/" target="_blank">Kubernetes 任务</a>运行。对于每个要创建的瓦片集，需要创建一个任务。可以随时通过运行以下命令检索任务模板并将其存储到文件中。请立即执行此操作：</p>
        <monaco-editor v-model="code22" />
        <p>使用喜欢的文本编辑器打开此文件，并查看其内容。除了可能熟悉的标准Kubernetes任务属性外，还会看到标记为<span class="code">REQUIRED</span>或<span class="code">OPTIONAL</span>的配置选项的注释。只有两项必需的：</p>
        <ol>
            <li>在<span class="code">metadata.name</span>中为任务指定一个唯一的名称。在运行上述命令时，已经生成了一个唯一的名称。</li>
            <li><span class="code">containers.command</span>是配置和运行分块处理流程的命令行。</li>
        </ol>
        <h4>实境模型<span>Reality models</span></h4>
        <p>对于我们的第一个任务，让我们将位于<span class="code">/data/sources/Office_Park/Office_Park.obj</span>中的实境捕捉 OBJ 模型进行瓦片生成。Cesium ion 支持以 glTF、DAE、FBX或OBJ 格式呈现的实境模型。</p>
        <p>首先，将<span class="code">my_first_job.yaml</span>文件顶部的<span class="code">name:</span>属性更改为<span class="code">cesium-ion-tiling-reality-model</span>。</p>
        <p>接下来，在<span class="code">my_first_job.yaml</span>文件中找到<span class="code">command:</span>部分，将整个条目替换为以下内容。记住，缩进在yaml文件中非常重要。我们已经预先缩进了文本，但<span class="code">command:</span>应该与其上方的<span class="code">imagePullPolicy: Never</span>对齐。</p>
        <monaco-editor v-model="code23" height="240px" />
        <p>虽然 3D Tiling Pipeline 参考指南中对所有选项进行了详细解释，但这里是上述命令的简要总结：</p>
        <ul>
            <li><strong class="code">pipeline</strong> - Cesium ion管道可执行文件。对于所有的任务来说，这是相同的。</li>
            <li><strong class="code">--input /data/sources/Office_Park/Office_Park.obj</strong> - 指定任务模板中挂载的目录中输入数据的绝对路径。支持多个输入文件，并将它们合并成一个单一的瓦片集。同时也支持zip文件，在处理之前会自动解压缩。</li>
            <li><strong class="code">--input-type 3D_CAPTURE</strong> - 瓦片生成的数据类型，在本例中是3D捕捉、网格或实境模型。</li>
            <li><strong class="code">--output /data/tilesets/Office_Park</strong> - 指定任务模板中挂载的目录中输出文件的绝对路径。</li>
            <li><strong class="code">--output-type 3DTILES</strong> - 要生成的瓦片集类型，在这种情况下是3D瓦片。</li>
        </ul>
        <p>我们已准备好创建我们的第一个瓦片集。保存并关闭<span class="code">my_first_job.yaml</span>文件，然后通过运行以下命令来启动任务：</p>
        <monaco-editor v-model="code24" />
        <p>应该会看到类似下面的成功提示消息：</p>
        <monaco-editor v-model="code25" />
        <p>这个小模型只需要几秒钟就能完成，但可以通过运行以下命令来检查状态：</p>
        <monaco-editor v-model="code26" />
        <p>将显示类似以下内容的输出：</p>
        <monaco-editor v-model="code27" />
        <p>运行任务的pod，以<span class="code">cesium-ion-tiling-reality-model-</span>开头，后面将跟着一个唯一的后缀。另一个pod是我们上面创建的资产服务器，可以忽略不计。</p>
        <p>如果状态是<span class="code">Complete</span>，则任务已成功；<span class="code">Error</span>表示失败；<span class="code">Running</span>或其他任何状态都表示正在进行中。</p>
        <p>任务完成后，在120秒后自动清理，除非使用不同的值进行配置。在那之前，可以运行以下命令来查看任务日志：</p>
        <monaco-editor v-model="code28" />
        <p>通常情况下，除非正在调试问题或与 Cesium 支持人员合作，否则无需查看日志。</p>
        <p>由于我们已经以开发模式启动了资产服务器，现在可以回到浏览器中的首页，然后点击<span class="code">View all tilesets</span>（查看所有瓦片集）。列表中现在应该包含一个id为Office_Park的瓦片集。该id是由上述命令中的<span class="code">--output</span>参数确定的，可以将其配置为任何喜欢的值。例如，它可以是正在构建的应用程序中数据的数据库标识符。</p>
        <p>点击Office_Park，应该会看到数据在一个基于简单CesiumJS的查看器中显示：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-ion/reality-model-sample.jpg"></p>
        <p>还可以通过<span class="code">YOUR_SERVER_ADDRESS/v1/3dtiles/Office_Park/tileset.json</span>的URL将此3D瓦片数据集加载到Cesium应用程序或任何支持3D瓦片的客户端中。请参阅<router-link :to="{ name: 'Quickstart' }" target="_blank">Cesium学习中心</router-link>，了解如何将3D瓦片加载到Cesium客户端中的详细信息。</p>
        <p>已经成功制作了第一个瓦片集！让我们再做几个吧。</p>
        <h4>影像<span>Imagery</span></h4>
        <p>Cesium ion支持将一个或多个栅格影像文件制作成瓦片集。通过以下命令运行，创建一个名为<span class="code">imagery.yaml</span>的新任务模板：</p>
        <monaco-editor v-model="code29" />
        <p>在文本编辑器中打开<span class="code">imagery.yaml</span>文件，并将<span class="code">command:</span>部分修改为以下内容：</p>
        <monaco-editor v-model="code30" height="240px" />
        <p>这次我们将依赖于自动生成的名称。运行以下命令启动任务：</p>
        <monaco-editor v-model="code31" />
        <p>稍等片刻，返回到<span class="code">View all tilesets</span>（查看所有瓦片集）的页面并刷新它。现在应该在资产中看到<span class="code">Courtyard</span>的列表。点击它以查看数据。</p>
        <p>它应该看起来与下面的图片类似：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-ion/imagery-sample.jpg"></p>
        <p>这是一个TileMapService（TMS）影像瓦片集，可以通过<span class="code">YOUR_SERVER_ADDRESS/v1/imagery/Courtyard/</span>的URL加载到任何支持TMS布局的应用程序中。</p>
        <h4>地形<span>Terrain</span></h4>
        <p>Cesium ion支持将一个或多个栅格地形生成单个瓦片集。通过运行以下命令，创建一个名为<span class="code">terrain.yaml</span>的新任务模板：</p>
        <monaco-editor v-model="code32" />
        <p>在文本编辑器中打开<span class="code">terrain.yaml</span>文件，并将<span class="code">command:</span>部分更改如下：</p>
        <monaco-editor v-model="code33" height="240px" />
        <p>我们将再次依赖于自动生成的名称。通过运行以下命令来启动任务：</p>
        <monaco-editor v-model="code34" />
        <p>一分钟后，返回到<span class="code">View all tilesets</span>（查看所有瓦片集）页面并刷新。现在应该看到<span class="code">ZionNationalPark</span>在资产中列出。点击它以查看数据。</p>
        <p>它应该类似于下面的图片：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-ion/terrain-sample.jpg"></p>
        <p>这是一个量化网格地形瓦片集，可以通过<span class="code">YOUR_SERVER_ADDRESS/v1/terrain/ZionNationalPark/</span> url加载到任何支持量化网格的应用程序中。</p>
        <h4>点云<span>Point clouds</span></h4>
        <p>Cesium ion支持将一个或多个LAS或LAZ点云生成单个瓦片集。通过运行以下命令，创建一个名为<span class="code">points.yaml</span>的新任务模板：</p>
        <monaco-editor v-model="code35" />
        <p>在文本编辑器中打开<span class="code">points.yaml</span>文件，并将<span class="code">command:</span>部分更改如下：</p>
        <monaco-editor v-model="code36" height="240px" />
        <p>我们将再次依赖于自动生成的名称。通过运行以下命令来启动任务：</p>
        <monaco-editor v-model="code37" />
        <p>稍后，返回到<span class="code">View all tilesets</span>（查看所有瓦片集）页面并刷新。现在应该在资产中看到<span class="code">House</span>的列表。点击它以查看数据。</p>
        <p>它应该类似于下面的图片：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-ion/points-sample.jpg"></p>
        <p>这是一个3D瓦片数据集，可以加载到任何支持3D瓦片的应用程序中，通过<span class="code">YOUR_SERVER_ADDRESS/v1/3dtiles/House/tileset.json</span> url进行加载。</p>
        <h4>任意3D模型<span>Arbitrary 3D Models</span></h4>
        <p>Cesium ion支持将一个或多个glTF、DAE、FBX或OBJ模型生成到单个瓦片集中。只要模型不是真实网格或类似的大网格，就应该使用这个选项。BIM和CAD模型就是一个例子。</p>
        <p>通过运行以下命令创建一个名为<span class="code">cad.yaml</span>的新任务模板：</p>
        <monaco-editor v-model="code38" />
        <p>在文本编辑器中打开<span class="code">cad.yaml</span>文件，并将<span class="code">command:</span>部分更改为以下内容：</p>
        <monaco-editor v-model="code39" height="240px" />
        <p>我们将再次依赖自动生成的名称。通过运行以下命令启动任务：</p>
        <monaco-editor v-model="code40" />
        <p>等待片刻后，返回到<span class="code">View all tilesets</span>（查看所有瓦片集）页面并进行刷新。现在应该可以在资产中看到<span class="code">OfficePlan</span>的列表。点击它以查看数据。</p>
        <p>它应该类似于下面的图片：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-ion/cad-sample.jpg"></p>
        <p>这是一个3D瓦片数据集，可以通过<span class="code">YOUR_SERVER_ADDRESS/v1/3dtiles/OfficePlan/tileset.json</span> url加载到任何支持3D瓦片的应用程序中。</p>
        <h4>CityGML<span>CityGML</span></h4>
        <p>Cesium ion支持将一个或多个CityGML文件生成成单个瓦片集。通过运行以下命令创建一个名为<span class="code">citygml.yaml</span>的新任务模板：</p>
        <monaco-editor v-model="code41" />
        <p>在文本编辑器中打开<span class="code">citygml.yaml</span>文件，并将<span class="code">command:</span>部分更改为以下内容：</p>
        <monaco-editor v-model="code42" height="240px" />
        <p>我们将再次依赖自动生成的名称。通过运行以下命令启动任务：</p>
        <monaco-editor v-model="code43" />
        <p>等待片刻后，返回到<span class="code">View all tilesets</span>（查看所有瓦片集）页面并进行刷新。现在应该可以在资产中看到<span class="code">Reichstag</span>的列表。点击它以查看数据。</p>
        <p>它应该类似于下面的图片：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-ion/CityGML-sample.jpg"></p>
        <p>这是一个可以加载到任何支持3D瓦片的应用程序中的3D瓦片数据集，通过<span class="code">YOUR_SERVER_ADDRESS/v1/3dtiles/Reichstag/tileset.json</span> url进行访问。</p>
        <h4>KML/COLLADA<span>KML/COLLADA</span></h4>
        <p>Cesium ion支持对KML/COLLADA文件进行瓦片生成，这是KML规范的一个子集，用于从许多工具中导出建筑模型。通过运行以下命令创建一个名为<span class="code">kml.yaml</span>的新任务模板：</p>
        <monaco-editor v-model="code44" />
        <p>在文本编辑器中打开<span class="code">kml.yaml</span>文件，并将<span class="code">command:</span>部分更改为以下内容：</p>
        <monaco-editor v-model="code45" height="240px" />
        <p>我们将再次依赖自动生成的名称。通过运行以下命令启动任务：</p>
        <monaco-editor v-model="code46" />
        <p>等待片刻后，返回到<span class="code">View all tilesets</span>（查看所有瓦片集）页面并进行刷新。现在应该可以在资产中看到<span class="code">Office_Park_KML</span>的列表。点击它以查看数据。</p>
        <p>它应该类似于下面的图片：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-ion/KML-COLLADA-sample.jpg"></p>
        <p>这是一个可以加载到任何支持3D瓦片的应用程序中的3D瓦片数据集，通过<span class="code">YOUR_SERVER_ADDRESS/v1/3dtiles/Office_Park_KML/tileset.json</span> url进行访问。</p>
        <h3>下一步<span>Next steps</span></h3>
        <p>完成了入门指南！现在应该拥有安装Cesium ion到自己的开发Kubernetes集群所需的一切，或者继续在刚创建的microk8s集群上进行实验。</p>
        <h2>架构概览<span>Architectural overview</span></h2>
        <p>在入门指南中，我们安装了 <el-tooltip placement="top-start"><span class="code">Cesium ion Helm Chart</span><template #content>Cesium ion Helm Chart 是用于 Cesium ion 产品的 Helm Chart，Helm Chart 是 Kubernetes 的一个包管理工具，用于简化部署和管理 Kubernetes 应用程序。<br>因此，Cesium ion Helm Chart 可以帮助用户在 Kubernetes 环境中轻松地部署和管理 Cesium ion 相关的组件和服务。</template></el-tooltip>，它由三个主要组件组成：容器镜像、资产服务器服务和任务模板。chart创建的架构如下所示：</p>
        <p><svg class="my-svg" style="max-width: 1429px; background-color: white;" viewBox="-8 -8 1429.25 584" width="100%"><g><marker id="flowchart-pointEnd" class="marker flowchart" markerHeight="12" markerUnits="userSpaceOnUse" markerWidth="12" orient="auto" refX="10" refY="5" viewBox="0 0 10 10"><path class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-pointStart" class="marker flowchart" markerHeight="12" markerUnits="userSpaceOnUse" markerWidth="12" orient="auto" refX="0" refY="5" viewBox="0 0 10 10"><path class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-circleEnd" class="marker flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="11" refY="5" viewBox="0 0 10 10"><circle class="arrowMarkerPath" cx="5" cy="5" r="5" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="flowchart-circleStart" class="marker flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="-1" refY="5" viewBox="0 0 10 10"><circle class="arrowMarkerPath" cx="5" cy="5" r="5" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="flowchart-crossEnd" class="marker cross flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="12" refY="5.2" viewBox="0 0 11 11"><path class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-crossStart" class="marker cross flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="-1" refY="5.2" viewBox="0 0 11 11"><path class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><g class="root"><g class="clusters"><g id="cluster" class="cluster cluster flowchart-label"><rect height="485" rx="0" ry="0" style="" width="1413.25" x="0" y="83"></rect><g class="cluster-label" transform="translate(638.125, 83)"><foreignObject height="18" width="137"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Kubernetes Cluster</span></div></foreignObject></g></g><g id="assetserver" class="cluster default flowchart-label"><rect height="284" rx="0" ry="0" style="" width="415.25" x="507" y="259"></rect><g class="cluster-label" transform="translate(669.125, 259)"><foreignObject height="18" width="91"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Asset Server</span></div></foreignObject></g></g></g><g class="edgePaths"><path id="L-client-ingress-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-client LE-ingress" d="M647.75,33L647.75,37.166666666666664C647.75,41.333333333333336,647.75,49.666666666666664,647.75,58C647.75,66.33333333333333,647.75,74.66666666666667,647.75,87.16666666666667C647.75,99.66666666666667,647.75,116.33333333333333,647.75,124.66666666666667L647.75,133" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-service-pod1-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-service LE-pod1" d="M631.25,342L621.4166666666666,351.8333333333333C611.5833333333334,361.6666666666667,591.9166666666666,381.3333333333333,587.5860927152318,401C583.2555187637969,420.6666666666667,594.2610375275939,440.3333333333333,599.7637969094923,450.1666666666667L605.2665562913908,460" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-service-pod2-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-service LE-pod2" d="M668.4023178807947,342L680.7102649006623,351.8333333333333C693.0182119205298,361.6666666666667,717.634105960265,381.3333333333333,737.9194260485651,401C758.2047461368653,420.6666666666667,774.1594922737307,440.3333333333333,782.1368653421633,450.1666666666667L790.114238410596,460" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-ingress-service-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-ingress LE-service" d="M647.75,166L647.75,175.83333333333334C647.75,185.66666666666666,647.75,205.33333333333334,647.75,220.83333333333334C647.75,236.33333333333334,647.75,247.66666666666666,647.75,261.6666666666667C647.75,275.6666666666667,647.75,292.3333333333333,647.75,300.6666666666667L647.75,309" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-volumes-pod1-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-volumes LE-pod1" d="M957.25,355.5385026737968L910.3333333333334,363.1154188948306C863.4166666666666,370.6923351158645,769.5833333333334,385.84616755793223,714.689293598234,403.25641711229946C659.7952538631347,420.6666666666667,643.8405077262693,440.3333333333333,635.8631346578367,450.1666666666667L627.885761589404,460" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-volumes-pod2-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-volumes LE-pod2" d="M974.7764900662252,367L951.7720750551877,372.6666666666667C928.76766004415,378.3333333333333,882.758830022075,389.6666666666667,855.4238410596026,405.1666666666667C828.0888520971303,420.6666666666667,819.4277041942605,440.3333333333333,815.0971302428256,450.1666666666667L810.7665562913908,460" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-volumes-tilingjobs-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-volumes LE-tilingjobs" d="M1201.9116541353383,284L1207.8013784461152,279.8333333333333C1213.6911027568922,275.6666666666667,1225.470551378446,267.3333333333333,1231.360275689223,257.5C1237.25,247.66666666666666,1237.25,236.33333333333334,1230.194812362031,225C1223.1396247240618,213.66666666666666,1209.0292494481237,202.33333333333334,1201.9740618101546,196.66666666666666L1194.9188741721855,191" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-tilingjobs-volumes-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-tilingjobs LE-volumes" d="M1088.0082781456954,191L1080.4652317880793,196.66666666666666C1072.9221854304635,202.33333333333334,1057.8360927152319,213.66666666666666,1050.2930463576158,225C1042.75,236.33333333333334,1042.75,247.66666666666666,1049.046992481203,257.5C1055.343984962406,267.3333333333333,1067.937969924812,275.6666666666667,1074.234962406015,279.8333333333333L1080.531954887218,284" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(675.75, 401)"><g class="label" transform="translate(-46.5, -9)"><foreignObject height="18" width="93"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel">Read tilesets</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(836.75, 401)"><g class="label" transform="translate(-46.5, -9)"><foreignObject height="18" width="93"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel">Read tilesets</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(1237.25, 225)"><g class="label" transform="translate(-62, -9)"><foreignObject height="18" width="124"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel">Read source files</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(1042.75, 225)"><g class="label" transform="translate(-45.5, -9)"><foreignObject height="18" width="91"><div style="display: inline-block; white-space: nowrap;"><span class="edgeLabel">Write tilesets</span></div></foreignObject></g></g></g><g class="nodes"><g id="flowchart-ingress-49" class="node default k8s flowchart-label" transform="translate(647.75, 149.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="67" x="-33.5" y="-16.5"></rect><g class="label" style="" transform="translate(-26, -9)"><foreignObject height="18" width="52"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Ingress</span></div></foreignObject></g></g><g class="root" transform="translate(27.5, 427)"><g class="clusters"><g class="cluster default flowchart-label"><rect height="83" rx="0" ry="0" style="" width="437" x="8" y="8"></rect><g class="cluster-label" transform="translate(164, 8)"><foreignObject height="18" width="125"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Image Repository</span></div></foreignObject></g></g></g><g class="edgePaths"></g><g class="edgeLabels"></g><g class="nodes"><g id="flowchart-assetserverimage-51" class="node default k8s flowchart-label" transform="translate(135.5, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="185" x="-92.5" y="-16.5"></rect><g class="label" style="" transform="translate(-85, -9)"><foreignObject height="18" width="170"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">cesium-ion-asset-server</span></div></foreignObject></g></g><g id="flowchart-tilingjobimage-52" class="node default k8s flowchart-label" transform="translate(344, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="132" x="-66" y="-16.5"></rect><g class="label" style="" transform="translate(-58.5, -9)"><foreignObject height="18" width="117"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">cesium-ion-tiling</span></div></foreignObject></g></g></g></g><g class="root" transform="translate(900.75, 100)"><g class="clusters"><g id="tilingjobs" class="cluster default flowchart-label"><rect height="83" rx="0" ry="0" style="" width="470" x="8" y="8"></rect><g class="cluster-label" transform="translate(204.5, 8)"><foreignObject height="18" width="77"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Tiling Jobs</span></div></foreignObject></g></g></g><g class="edgePaths"></g><g class="edgeLabels"></g><g class="nodes"><g id="flowchart-imageryjob-57" class="node default k8s flowchart-label" transform="translate(94, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="102" x="-51" y="-16.5"></rect><g class="label" style="" transform="translate(-43.5, -9)"><foreignObject height="18" width="87"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Imagery Job</span></div></foreignObject></g></g><g id="flowchart-terrainjob-58" class="node default k8s flowchart-label" transform="translate(242, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="94" x="-47" y="-16.5"></rect><g class="label" style="" transform="translate(-39.5, -9)"><foreignObject height="18" width="79"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Terrain Job</span></div></foreignObject></g></g><g id="flowchart-3dtilesjob-59" class="node default k8s flowchart-label" transform="translate(391, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="104" x="-52" y="-16.5"></rect><g class="label" style="" transform="translate(-44.5, -9)"><foreignObject height="18" width="89"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">3D Tiles Job</span></div></foreignObject></g></g></g></g><g class="root" transform="translate(949.75, 276)"><g class="clusters"><g id="volumes" class="cluster default flowchart-label"><rect height="83" rx="0" ry="0" style="" width="372" x="8" y="8"></rect><g class="cluster-label" transform="translate(163, 8)"><foreignObject height="18" width="62"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Volumes</span></div></foreignObject></g></g></g><g class="edgePaths"></g><g class="edgeLabels"></g><g class="nodes"><g id="flowchart-sourcevolume-60" class="node default k8s flowchart-label" transform="translate(109, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="132" x="-66" y="-16.5"></rect><g class="label" style="" transform="translate(-58.5, -9)"><foreignObject height="18" width="117"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Sources Volume</span></div></foreignObject></g></g><g id="flowchart-tilesetvolume-61" class="node default k8s flowchart-label" transform="translate(285, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="120" x="-60" y="-16.5"></rect><g class="label" style="" transform="translate(-52.5, -9)"><foreignObject height="18" width="105"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Tileset Volume</span></div></foreignObject></g></g></g></g><g id="flowchart-pod1-54" class="node default k8s flowchart-label" transform="translate(614.5, 476.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="139" x="-69.5" y="-16.5"></rect><g class="label" style="" transform="translate(-62, -9)"><foreignObject height="18" width="124"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Asset Server Pod</span></div></foreignObject></g></g><g id="flowchart-service-53" class="node default k8s flowchart-label" transform="translate(647.75, 325.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="151" x="-75.5" y="-16.5"></rect><g class="label" style="" transform="translate(-68, -9)"><foreignObject height="18" width="136"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">cesium-ion Service</span></div></foreignObject></g></g><g id="flowchart-pod2-56" class="node default k8s flowchart-label" transform="translate(803.5, 476.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="139" x="-69.5" y="-16.5"></rect><g class="label" style="" transform="translate(-62, -9)"><foreignObject height="18" width="124"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">Asset Server Pod</span></div></foreignObject></g></g><g id="flowchart-client-48" class="node default plain flowchart-label" transform="translate(647.75, 16.5)"><rect height="33" rx="16.5" ry="16.5" style="" width="61.25" x="-30.625" y="-16.5"></rect><g class="label" style="" transform="translate(-19, -9)"><foreignObject height="18" width="38"><div style="display: inline-block; white-space: nowrap;"><span class="nodeLabel">client</span></div></foreignObject></g></g></g></g></g></svg></p>
        <h3>资产服务器服务<span>Asset server service</span></h3>
        <p>资产服务器服务负责为<span class="code">3D瓦片数据工作流创建的瓦片集</span>提供服务。默认情况下，它会从<span class="code">cesium-ion/values.yaml</span>中定义的本地持久存储的<span class="code">tileset-volume</span>（瓦片集存储）中提供数据，支持所有Kubernetes存储类型。每个瓦片集都是一个单独的文件。</p>
        <p>该服务使用的Pod数量也通过<span class="code">cesium-ion/values.yaml</span>文件中的<span class="code">autoscaling</span>和<span class="code">replicaCount</span>部分进行配置。每个Pod运行一个<span class="code">cesium-ion-asset-server</span>容器镜像的实例。</p>
        <p>还配置了一个ingress，用于将所有流量路由到资产服务器服务。用户应该根据其特定需求和用例自定义<span class="code">cesium-ion/values.yaml</span>。</p>
        <h3>任务模版<span>Job Template</span></h3>
        <p>3D瓦片数据工作流作为标准的<a href="https://kubernetes.io/docs/concepts/workloads/controllers/job/" target="_blank">Kubernetes任务</a>负载运行，并且除了与瓦片数据工作流相关的选项之外，没有任何特殊考虑。</p>
        <p>使用Helm Chart安装的任务是一个模板，用作运行3D瓦片数据工作流的基础。正如在<strong>瓦片生成和查看数据</strong>中讨论的那样，任务模板必须修改以将数据生成为我们支持的任何格式之一。所有任务使用<span class="code">cesium-ion-tiling</span>容器镜像。</p>
        <p>默认情况下，任务被配置为从<span class="code">sources-volume</span>（来源存储）读取数据，并将数据写入到<span class="code">tileset-volume</span>（瓦片集存储）中，这些配置在<span class="code">cesium-ion/values.yaml</span>中定义。此外，瓦片集还有一个临时的暂存存储，即<span class="code">working-directory</span>，在节点上本地创建的<span class="code">emptyDir</span>。</p>
        <p>在默认的chart配置中，瓦片数据工作流将数据写入到资产服务器服务提供的相同存储。最终，用于输入和输出的存储可以根据每个任务进行配置，并支持所有存储类型。与资产服务器服务一样，用户应根据其特定需求和用例定制<span class="code">cesium-ion/values.yaml</span>和任务模板。</p>
        <h3>使用Cesium ion构建<span>Building with Cesium ion</span></h3>
        <p>3D瓦片数据工作流和资产服务器服务具有高度可定制性，并用于各种用例的模块构建。以下是三个典型用途，可为您提供灵感。</p>
        <h4>按需动态生成瓦片的Web应用程序<span>Web application with on-demand tiling</span></h4>
        <p>我们可以利用入门指南中安装的架构，进一步开发一个面向客户的Web应用程序。在这个例子中，我们添加了一个认证pod，根据存储在数据库中的信息对请求进行验证。其中一个例子是基于Bearer token的系统，但实际上它可以是任何类型的认证方式。</p>
        <p>我们更新了入口，将<span class="code">/assets/</span>路由到资产服务器。然后我们将<span class="code">/jobs/</span>路由到一个新的任务服务器。该任务服务器将获取有关新资产的信息，处理文件上传并启动一个任务对资产进行瓦片处理。</p>
        <p>在下图中，现有架构的部分被合并到白色块中，新创建的资源以蓝色绘制。</p>
        <p><svg class="my-svg" style="max-width: 1292px; background-color: white;" viewBox="-8 -8 1292.25 769" width="100%"><g><marker id="flowchart-pointEnd" class="marker flowchart" markerHeight="12" markerUnits="userSpaceOnUse" markerWidth="12" orient="auto" refX="10" refY="5" viewBox="0 0 10 10"><path class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-pointStart" class="marker flowchart" markerHeight="12" markerUnits="userSpaceOnUse" markerWidth="12" orient="auto" refX="0" refY="5" viewBox="0 0 10 10"><path class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-circleEnd" class="marker flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="11" refY="5" viewBox="0 0 10 10"><circle class="arrowMarkerPath" cx="5" cy="5" r="5" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="flowchart-circleStart" class="marker flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="-1" refY="5" viewBox="0 0 10 10"><circle class="arrowMarkerPath" cx="5" cy="5" r="5" style="stroke-width: 1; stroke-dasharray: 1, 0;"></circle></marker><marker id="flowchart-crossEnd" class="marker cross flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="12" refY="5.2" viewBox="0 0 11 11"><path class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><marker id="flowchart-crossStart" class="marker cross flowchart" markerHeight="11" markerUnits="userSpaceOnUse" markerWidth="11" orient="auto" refX="-1" refY="5.2" viewBox="0 0 11 11"><path class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9" style="stroke-width: 2; stroke-dasharray: 1, 0;"></path></marker><g class="root"><g class="clusters"><g id="cluster" class="cluster cluster flowchart-label"><rect height="670" rx="0" ry="0" style="" width="1276.25" x="0" y="83"></rect><g class="cluster-label" transform="translate(569.625, 83)"><foreignObject height="18" width="137"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Kubernetes Cluster</span></div></foreignObject></g></g><g id="apiserver" class="cluster default flowchart-label"><rect height="317" rx="0" ry="0" style="" width="438.5" x="502.5" y="209"></rect><g class="cluster-label" transform="translate(683.25, 209)"><foreignObject height="18" width="77"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">API Server</span></div></foreignObject></g></g></g><g class="edgePaths"><path id="L-client-ingress-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-client LE-ingress" d="M628.75,33L628.75,37.166666666666664C628.75,41.333333333333336,628.75,49.666666666666664,628.75,58C628.75,66.33333333333333,628.75,74.66666666666667,628.75,83C628.75,91.33333333333333,628.75,99.66666666666667,628.75,103.83333333333333L628.75,108" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-service-pod1-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-service LE-pod1" d="M675.1602564102565,333.5L662.633547008547,350.25C650.1068376068376,367,625.0534188034188,400.5,612.5267094017094,422.9166666666667C600,445.3333333333333,600,456.6666666666667,600,462.3333333333333L600,468" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-service-pod2-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-service LE-pod2" d="M699.8397435897435,333.5L712.366452991453,350.25C724.8931623931625,367,749.9465811965812,400.5,762.4732905982906,422.9166666666667C775,445.3333333333333,775,456.6666666666667,775,462.3333333333333L775,468" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-ingress-service-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-ingress LE-service" d="M647.9455445544554,141L654.5379537953795,146.66666666666666C661.1303630363036,152.33333333333334,674.3151815181518,163.66666666666666,680.9075907590759,175C687.5,186.33333333333334,687.5,197.66666666666666,687.5,218.58333333333334C687.5,239.5,687.5,270,687.5,285.25L687.5,300.5" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-ingress-assetserver-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-ingress LE-assetserver" d="M662.25,127.42437337942955L753.0833333333334,135.35364448285796C843.9166666666666,143.28291558628635,1025.5833333333333,159.1414577931432,1116.4166666666667,172.73739556323827C1207.25,186.33333333333334,1207.25,197.66666666666666,1207.25,221.33333333333334C1207.25,245,1207.25,281,1207.25,318.5C1207.25,356,1207.25,395,1207.25,422.9166666666667C1207.25,450.8333333333333,1207.25,467.6666666666667,1207.25,483C1207.25,498.3333333333333,1207.25,512.1666666666666,1207.25,524.75C1207.25,537.3333333333334,1207.25,548.6666666666666,1207.25,562.75C1207.25,576.8333333333334,1207.25,593.6666666666666,1207.25,610.5C1207.25,627.3333333333334,1207.25,644.1666666666666,1196.8143564356435,658.25C1186.3787128712872,672.3333333333334,1165.5074257425742,683.6666666666666,1155.071782178218,689.3333333333334L1144.6361386138615,695" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-volumes-assetserver-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-volumes LE-assetserver" d="M1058.75,627L1058.75,632.6666666666666C1058.75,638.3333333333334,1058.75,649.6666666666666,1064.9777227722773,661C1071.2054455445543,672.3333333333334,1083.6608910891089,683.6666666666666,1089.8886138613861,689.3333333333334L1096.1163366336634,695" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-volumes-tilingjobs-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-volumes LE-tilingjobs" d="M1036.7772277227723,594L1029.2310231023102,588.3333333333334C1021.6848184818482,582.6666666666666,1006.5924092409241,571.3333333333334,999.046204620462,560C991.5,548.6666666666666,991.5,537.3333333333334,998.2520080321286,527.5C1005.004016064257,517.6666666666666,1018.5080321285141,509.3333333333333,1025.2600401606426,505.1666666666667L1032.012048192771,501" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-tilingjobs-volumes-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-tilingjobs LE-volumes" d="M1082.7048192771085,501L1088.7540160642573,505.1666666666667C1094.8032128514058,509.3333333333333,1106.9016064257028,517.6666666666666,1112.9508032128515,527.5C1119,537.3333333333334,1119,548.6666666666666,1112.2392739273928,560C1105.4785478547856,571.3333333333334,1091.957095709571,582.6666666666666,1085.1963696369637,588.3333333333334L1078.4356435643565,594" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-ingress-authentication-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-ingress LE-authentication" d="M595.25,130.9601431980907L557.1875,138.30011933174225C519.125,145.64009546539378,443,160.3200477326969,404.9375,173.32669053301512C366.875,186.33333333333334,366.875,197.66666666666666,362.41415895061726,207.5C357.9533179012346,217.33333333333334,349.0316358024691,225.66666666666666,344.5707947530864,229.83333333333334L340.1099537037037,234" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-authentication-ingress-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-authentication LE-ingress" d="M162.3900462962963,234L157.9292052469136,229.83333333333334C153.46836419753086,225.66666666666666,144.54668209876544,217.33333333333334,140.0858410493827,207.5C135.625,197.66666666666666,135.625,186.33333333333334,212.22916666666666,172.8217786227292C288.8333333333333,159.31022391212505,442.0416666666667,143.6204478242501,518.6458333333334,135.77555978031265L595.25,127.93067173637516" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-authentication-database-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-authentication LE-database" d="M251.25,400L251.25,405.6666666666667C251.25,411.3333333333333,251.25,422.6666666666667,251.25,434C251.25,445.3333333333333,251.25,456.6666666666667,251.25,462.3333333333333L251.25,468" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-apiserver-database-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-apiserver LE-database" d="M502.5,469.22375L293.25,477.43" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-apiserver-tilingjobs-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-apiserver LE-tilingjobs" d="M941,452.0491905354919L1012.75,472.92839352428393" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(687.5, 175)"><g class="label" transform="translate(-18, -9)"><foreignObject height="18" width="36"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">/api/*</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(1207.25, 484.5)"><g class="label" transform="translate(-30, -9)"><foreignObject height="18" width="60"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">/assets/*</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(1058.75, 661)"><g class="label" transform="translate(-46.5, -9)"><foreignObject height="18" width="93"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Read tilesets</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(991.5, 560)"><g class="label" transform="translate(-62, -9)"><foreignObject height="18" width="124"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Read source files</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(1119, 560)"><g class="label" transform="translate(-45.5, -9)"><foreignObject height="18" width="91"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Write tilesets</span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(366.875, 175)"><g class="label" transform="translate(-61.5, -9)"><foreignObject height="18" width="123"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Validate requests</span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(976.875, 462.4887920298879)"><g class="label" transform="translate(-63, -9)"><foreignObject height="18" width="126"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel">Launch Tiling Job</span></div></foreignObject></g></g></g><g class="nodes"><g id="flowchart-ingress-77" class="node default k8sOld flowchart-label" transform="translate(628.75, 124.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="67" x="-33.5" y="-16.5"></rect><g class="label" style="" transform="translate(-26, -9)"><rect></rect><foreignObject height="18" width="52"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Ingress</span></div></foreignObject></g></g><g id="flowchart-database-79" class="node default k8sNew flowchart-label" transform="translate(251.25, 484.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="84" x="-42" y="-16.5"></rect><g class="label" style="" transform="translate(-34.5, -9)"><rect></rect><foreignObject height="18" width="69"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Database</span></div></foreignObject></g></g><g id="flowchart-images-80" class="node default k8sOld flowchart-label" transform="translate(477, 711.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="140" x="-70" y="-16.5"></rect><g class="label" style="" transform="translate(-62.5, -9)"><rect></rect><foreignObject height="18" width="125"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Image Repository</span></div></foreignObject></g></g><g id="flowchart-assetserver-81" class="node default k8sOld flowchart-label" transform="translate(1114.25, 711.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="106" x="-53" y="-16.5"></rect><g class="label" style="" transform="translate(-45.5, -9)"><rect></rect><foreignObject height="18" width="91"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Asset Server</span></div></foreignObject></g></g><g id="flowchart-tilingjobs-82" class="node default k8sOld flowchart-label" transform="translate(1058.75, 484.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="92" x="-46" y="-16.5"></rect><g class="label" style="" transform="translate(-38.5, -9)"><rect></rect><foreignObject height="18" width="77"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Tiling Jobs</span></div></foreignObject></g></g><g id="flowchart-volumes-83" class="node default k8sOld flowchart-label" transform="translate(1058.75, 610.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="77" x="-38.5" y="-16.5"></rect><g class="label" style="" transform="translate(-31, -9)"><rect></rect><foreignObject height="18" width="62"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Volumes</span></div></foreignObject></g></g><g class="root" transform="translate(27.5, 226)"><g class="clusters"><g id="authentication" class="cluster k8sNew k8sNew flowchart-label"><rect height="166" rx="0" ry="0" style="" width="432.5" x="8" y="8"></rect><g class="cluster-label" transform="translate(173.25, 8)"><foreignObject height="18" width="102"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Authentication</span></div></foreignObject></g></g></g><g class="edgePaths"><path id="L-authservice-authpod1-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-authservice LE-authpod1" d="M184.49096385542168,66L174.4508032128514,70.16666666666667C164.4106425702811,74.33333333333333,144.33032128514057,82.66666666666667,134.29016064257027,91C124.25,99.33333333333333,124.25,107.66666666666667,124.25,111.83333333333333L124.25,116" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path><path id="L-authservice-authpod2-0" class="edge-thickness-normal edge-pattern-solid flowchart-link LS-authservice LE-authpod2" d="M264.0090361445783,66L274.04919678714856,70.16666666666667C284.08935742971886,74.33333333333333,304.16967871485946,82.66666666666667,314.2098393574297,91C324.25,99.33333333333333,324.25,107.66666666666667,324.25,111.83333333333333L324.25,116" marker-end="url(#flowchart-pointEnd)" style="fill:none;"></path></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" transform="translate(0, 0)"><foreignObject height="0" width="0"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g id="flowchart-authservice-89" class="node default k8sNew flowchart-label" transform="translate(224.25, 49.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="175" x="-87.5" y="-16.5"></rect><g class="label" style="" transform="translate(-80, -9)"><rect></rect><foreignObject height="18" width="160"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Authentication Service</span></div></foreignObject></g></g><g id="flowchart-authpod1-91" class="node default k8sNew flowchart-label" transform="translate(124.25, 132.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="150" x="-75" y="-16.5"></rect><g class="label" style="" transform="translate(-67.5, -9)"><rect></rect><foreignObject height="18" width="135"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Authentication Pod</span></div></foreignObject></g></g><g id="flowchart-authpod2-93" class="node default k8sNew flowchart-label" transform="translate(324.25, 132.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="150" x="-75" y="-16.5"></rect><g class="label" style="" transform="translate(-67.5, -9)"><rect></rect><foreignObject height="18" width="135"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">Authentication Pod</span></div></foreignObject></g></g></g></g><g id="flowchart-service-84" class="node default k8sNew flowchart-label" transform="translate(687.5, 317)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="99" x="-49.5" y="-16.5"></rect><g class="label" style="" transform="translate(-42, -9)"><rect></rect><foreignObject height="18" width="84"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">API Service</span></div></foreignObject></g></g><g id="flowchart-pod1-86" class="node default k8sNew flowchart-label" transform="translate(600, 484.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="125" x="-62.5" y="-16.5"></rect><g class="label" style="" transform="translate(-55, -9)"><rect></rect><foreignObject height="18" width="110"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">API Server Pod</span></div></foreignObject></g></g><g id="flowchart-pod2-88" class="node default k8sNew flowchart-label" transform="translate(775, 484.5)"><rect class="basic label-container" height="33" rx="0" ry="0" style="" width="125" x="-62.5" y="-16.5"></rect><g class="label" style="" transform="translate(-55, -9)"><rect></rect><foreignObject height="18" width="110"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">API Server Pod</span></div></foreignObject></g></g><g id="flowchart-client-76" class="node default plain flowchart-label" transform="translate(628.75, 16.5)"><rect height="33" rx="16.5" ry="16.5" style="" width="61.25" x="-30.625" y="-16.5"></rect><g class="label" style="" transform="translate(-19, -9)"><rect></rect><foreignObject height="18" width="38"><div style="display: inline-block; white-space: nowrap;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel">client</span></div></foreignObject></g></g></g></g></g></svg></p>
        <h4>定期处理瓦片<span>Scheduled tiling</span></h4>
        <p>有时数据会全天收集，针对集群中的特定存储进行收集，或通过外部服务（例如FTP）提供。</p>
        <p>可以设置一个 Kubernetes <a href="https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/" target="_blank">定时任务</a>，在特定时间运行，用于检测并自动对任何新数据进行瓦片处理。这可以通过一个脚本来实现，该脚本会遍历新的源文件，并为每个文件启动一个任务。</p>
        <p>上述用例的一个演变是让一个 Pod 监视特定的 Kubernetes 存储来检测变化。每当数据被复制到该存储时，Pod 就会根据预设的命名方案或数据存储中的位置，使用已知选项启动一个瓦片任务。例如，任何复制到<span class="code">/imagery</span>目录的内容都可以通过影像数据工作流自动进行瓦片处理，并对最终用户进行提供。</p>
        <h4>离线处理瓦片<span>Offline tiling</span></h4>
        <p>在某些情况下，可能有一组明确定义的数据需要进行一次瓦片处理，并且随后为应用程序进行托管。在这种情况下，按需或定期进行瓦片处理将完全取消，瓦片任务可以在集群之外运行。请参考<strong>在 Kubernetes 之外运行数据工作流</strong>中的说明。一旦数据被瓦片处理，可以手动将其复制到 Kubernetes 存储中，并由资产服务器服务提供服务。</p>
        <h2>3D瓦片数据工作流参考<span>3D tiling pipeline reference</span></h2>
        <h3>常用选项<span>Common options</span></h3>
        <p>以下选项适用于所有瓦片处理任务。</p>
        <table class="table-01">
            <thead>
                <tr>
                    <th>选项</th>
                    <th>值</th>
                    <th>必须</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--input-type</span></td>
                    <td><span class="code">RASTER_IMAGERY</span><span class="code">RASTER_TERRAIN</span><span class="code">CITYGML</span><span class="code">3D_CAPTURE</span><span class="code">3D_MODEL</span><span class="code">POINT_CLOUD</span><span class="code">KML</span></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td>要铺砌的源数据类型。仅支持特定的输入类型和输出类型组合，请参阅下面每种数据类型的具体部分以获取详细信息。</td>
                </tr>
                <tr>
                    <td><span class="code">--input</span></td>
                    <td>string</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td>要处理的一个或多个文件的路径。支持使用<a href="https://en.wikipedia.org/wiki/Glob_(programming)" target="_blank">通配符</a>来一次选择大量文件。文件必须在<span class="code">cesium-ion/values.yaml</span>中指定的<span class="code">tilingJob.volumeMounts</span><span class="code">sources-volume</span><span class="code">mountPath</span>位置下可用。<br>还支持压缩文件，在处理之前会自动解压缩。</td>
                </tr>
                <tr>
                    <td><span class="code">--output-type</span></td>
                    <td><span class="code">IMAGERY</span><span class="code">TERRAIN</span><span class="code">3DTILES</span></td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td>要生成的瓦片集类型。仅支持特定的输入类型和输出类型的组合，请参阅下面每种数据类型的具体部分以获取详细信息。</td>
                </tr>
                <tr>
                    <td><span class="code">--output</span></td>
                    <td>string</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td>输出文件的路径。文件必须写入到<span class="code">cesium-ion/values.yaml</span>中指定的<span class="code">tilingJob.volumeMounts</span><span class="code">tileset-volume</span><span class="code">mountPath</span>位置下的路径。</td>
                </tr>
                <tr>
                    <td><span class="code">--progress-url</span></td>
                    <td>string</td>
                    <td><el-icon><SuccessFilled /></el-icon></td>
                    <td>一个可选的URL，用于将有关瓦片处理进度进度的POST消息提交。有关更多详细信息，请参阅<strong>监视进度</strong>。</td>
                </tr>
            </tbody>
        </table>
        <p>目前 cesium ion 自主托管瓦片处理支持以下源类型：</p>
        <h3>实境模型<span>Reality models</span></h3>
        <p>通过指定<span class="code">--input-type 3D_CAPTURE</span>和<span class="code">--output-type 3DTILES</span>，可以从一个或多个3D模型文件创建一个3D瓦片数据集。</p>
        <p>支持以下模型格式：</p>
        <ul>
            <li>Wavefront OBJ (.obj)</li>
            <li>glTF (.gltf, .glb)</li>
            <li>Filmbox (.fbx)</li>
            <li>COLLADA (.dae)</li>
        </ul>
        <div class="note">
            <p><span class="code">3D_CAPTURE</span>输入类型专门用于处理大型网格数据，通常是从点云或摄影测绘过程中获得的。请参阅<strong>任意模型</strong>了解与此描述不符合的模型数据拼接方法。</p>
        </div>
        <p>实境模型特定的命令行选项：</p>
        <table>
            <thead>
                <tr>
                    <th>选项</th>
                    <th>值</th>
                    <th>默认</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--geometry-compression</span></td>
                    <td><span class="code">NONE</span>或<span class="code">DRACO</span></td>
                    <td>DRACO</td>
                    <td>控制创建3D瓦片集时应用于几何体的压缩类型。<span class="code">NONE</span>用于禁用几何体压缩。<span class="code">DRACO</span>使用<a href="https://google.github.io/draco/" target="_blank">Draco压缩</a>来创建更小的、具有更好流式传输性能的瓦片集。使用此选项生成的3D瓦片需要支持<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression" target="_blank">KHR_draco_mesh_compression</a> glTF扩展的客户端。所有官方的Cesium客户端都受支持。</td>
                </tr>
                <tr>
                    <td><span class="code">--position</span></td>
                    <td>数字数组</td>
                    <td>N/A</td>
                    <td>以EPSG:4326坐标系中的[经度、纬度、高度]格式表示的瓦片集的起点，其中高度以米为单位。如果源数据已包含地理参考信息，则此值将被忽略。</td>
                </tr>
                <tr>
                    <td><span class="code">--texture-format</span></td>
                    <td><span class="code">AUTO</span>或<span class="code">WEBP</span></td>
                    <td>AUTO</td>
                    <td>控制3D瓦片数据集中纹理的格式。 <br><br>AUTO会根据每个影像自动选择PNG或JPG格式来生成<strong>与所有支持3D瓦片规范的软件兼容的</strong>最小瓦片集。<br><br>WebP创建更小的影像，以实现更好的数据流性能，但需要客户端支持<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_texture_webp" target="_blank">EXT_texture_webp</a> glTF扩展。所有官方的Cesium客户端都得到支持。</td>
                </tr>
            </tbody>
        </table>
        <h3>任意模型<span>Arbitrary models</span></h3>
        <p>通过指定<span class="code">--input-type 3D_MODEL</span>和<span class="code">--output-type 3DTILES</span>，可以从一个或多个3D模型文件创建一个3D瓦片数据集。</p>
        <p>支持以下模型格式：</p>
        <ul>
            <li>Wavefront OBJ (.obj)</li>
            <li>glTF (.gltf, .glb)</li>
            <li>Filmbox (.fbx)</li>
            <li>COLLADA (.dae)</li>
        </ul>
        <div class="note">
            <p><span class="code">3D_MODEL</span>输入类型适用于传统的3D模型，如CAD、BIM或其他人工设计。请参阅<strong>实境模型</strong>以进行3D捕捉瓦片化或处理其他大型网格。</p>
        </div>
        <p>针对模型的特定命令行选项：</p>
        <table>
            <thead>
                <tr>
                    <th>选项</th>
                    <th>值</th>
                    <th>默认</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--geometry-compression</span></td>
                    <td><span class="code">NONE</span>或<span class="code">DRACO</span></td>
                    <td>DRACO</td>
                    <td>控制创建3D瓦片集时应用于几何体的压缩类型。<span class="code">NONE</span>用于禁用几何体压缩。<span class="code">DRACO</span>使用<a href="https://google.github.io/draco/" target="_blank">Draco压缩</a>来创建更小的、具有更好流式传输性能的瓦片集。使用此选项生成的3D瓦片需要支持<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression" target="_blank">KHR_draco_mesh_compression</a> glTF扩展的客户端。所有官方的Cesium客户端都受支持。</td>
                </tr>
                <tr>
                    <td><span class="code">--position</span></td>
                    <td>数字数组</td>
                    <td>N/A</td>
                    <td>以EPSG:4326坐标系中的[经度、纬度、高度]格式表示的瓦片集的起点，其中高度以米为单位。如果源数据已包含地理参考信息，则此值将被忽略。</td>
                </tr>
                <tr>
                    <td><span class="code">--texture-format</span></td>
                    <td><span class="code">AUTO</span>或<span class="code">WEBP</span></td>
                    <td>AUTO</td>
                    <td>控制3D瓦片数据集中纹理的格式。 <br><br>AUTO会根据每个影像自动选择PNG或JPG格式来生成<strong>与所有支持3D瓦片规范的软件兼容的</strong>最小瓦片集。<br><br>WebP创建更小的影像，以实现更好的数据流性能，但需要客户端支持<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_texture_webp" target="_blank">EXT_texture_webp</a> glTF扩展。所有官方的Cesium客户端都得到支持。</td>
                </tr>
            </tbody>
        </table>
        <h3>点云<span>Point clouds</span></h3>
        <p>通过指定<span class="code">--input-type POINT_CLOUD</span>和<span class="code">--output-type 3DTILES</span>，可以从一个或多个点云文件创建一个3D瓦片数据集。</p>
        <p>支持LASer (.las, .laz)格式</p>
        <p>点云特定的命令行选项：</p>
        <table>
            <thead>
                <tr>
                    <th>选项</th>
                    <th>值</th>
                    <th>默认</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--geometry-compression</span></td>
                    <td><span class="code">NONE</span>或<span class="code">DRACO</span></td>
                    <td>DRACO</td>
                    <td>控制创建3D瓦片集时应用于几何体的压缩类型。<span class="code">NONE</span>用于禁用几何体压缩。<span class="code">DRACO</span>使用<a href="https://google.github.io/draco/" target="_blank">Draco压缩</a>来创建更小的、具有更好流式传输性能的瓦片集。使用此选项生成的3D瓦片需要支持<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression" target="_blank">KHR_draco_mesh_compression</a> glTF扩展的客户端。所有官方的Cesium客户端都受支持。</td>
                </tr>
                <tr>
                    <td><span class="code">--position</span></td>
                    <td>数字数组</td>
                    <td>N/A</td>
                    <td>以EPSG:4326坐标系中的[经度、纬度、高度]格式表示的瓦片集的起点，其中高度以米为单位。如果源数据已包含地理参考信息，则此值将被忽略。</td>
                </tr>
            </tbody>
        </table>
        <h3>影像<span>Imagery</span></h3>
        <p>通过指定<span class="code">--input-type RASTER_IMAGERY</span>和<span class="code">--output-type IMAGERY</span>，可以创建一个影像瓦片集。</p>
        <p>支持以下格式：</p>
        <ul>
            <li>GeoTIFF (.tiff, .tif)</li>
            <li>Floating Point Raster (.flt)</li>
            <li>Arc/Info ASCII Grid (.asc)</li>
            <li>Source Map (.src)</li>
            <li>Erdas Imagine (.img)</li>
            <li>Erdas Imagine (.img)</li>
            <li>JPEG (.jpg, .jpeg)</li>
            <li>PNG (.png)</li>
        </ul>
        <p>栅格数据必须进行正射矫正并包含坐标参考系统。辅助文件，如 .aux.xml, .tab, .tfw, .wld, .prj, .ovr, .rrd 等，将被自动检测并使用。</p>
        <p>没有针对影像的特定命令行选项。</p>
        <h3>地形<span>Terrain</span></h3>
        <ul>
            <li>GeoTIFF (.tiff, .tif)</li>
            <li>Floating Point Raster (.flt)</li>
            <li>Arc/Info ASCII Grid (.asc)</li>
            <li>Source Map (.src)</li>
            <li>Erdas Imagine (.img)</li>
            <li>USGS ASCII DEM and CDED (.dem)</li>
            <li>JPEG (.jpg, .jpeg)</li>
            <li>PNG (.png)</li>
        </ul>
        <p>栅格数据必须是单波段的浮点数或整数值。它们还必须经过正射矫正，并且包含一个坐标参考系统。辅助文件，如 .aux.xml、.tab、.tfw、.wld、.prj、.ovr、.rrd 等，将被自动检测和使用。</p>
        <p>地形特定的命令行选项：</p>
        <table>
            <thead>
                <tr>
                    <th>选项</th>
                    <th>值</th>
                    <th>默认</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--height-reference</span></td>
                    <td><span class="code">MEAN_SEA_LEVEL</span>或<span class="code">WGS84</span></td>
                    <td>N/A</td>
                    <td>默认情况下，源数据的垂直基准被用作相对高程值的基准高度。通过指定此属性，可以覆盖默认行为。如果未指定且没有可用的垂直基准，则使用WGS84。<br><br>设置为<span class="code">WGS84</span>以强制使用<span class="code">WGS84</span>椭球体，或设置为<span class="code">MEAN_SEA_LEVEL</span>以强制使用<span class="code">EGM96 MSL</span>模型。</td>
                </tr>
                <tr>
                    <td><span class="code">--to-meters</span></td>
                    <td>number</td>
                    <td>N/A</td>
                    <td>默认情况下，使用源数据的垂直基准。当指定时，会覆盖垂直轴的单位，并提供一个常数比例因子，以将输入高程值转换为米。设置此属性仅在垂直轴与水平轴具有不同单位的罕见情况下才有用。<br><br>例如，如果数据是以英尺为单位，并且未指定垂直基准，则应指定0.3048来将英尺转换为米。</td>
                </tr>
                <tr>
                    <td><span class="code">--water-mask</span></td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>将这个值设置为<span class="code">true</span>将把海平面上的<strong>nodata或者高程数值</strong>视为水，并在瓦片集中添加水域掩码扩展。通常情况下，这个值只在对全球数据进行瓦片处理时使用。</td>
                </tr>
            </tbody>
        </table>
        <h3>CityGML<span>CityGML</span></h3>
        <p>可以通过指定<span class="code">--input-type CITYGML</span>和<span class="code">--output-type 3DTILES</span>，从一个或多个CityGML文件（.citygml，.xml，.gml）创建一个3D瓦片数据集。目前还不支持CityGML 3.0版本。</p>
        <p>CityGML特定的命令行选项：</p>
        <table>
            <thead>
                <tr>
                    <th>选项</th>
                    <th>值</th>
                    <th>默认</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--geometry-compression</span></td>
                    <td><span class="code">NONE</span>或<span class="code">DRACO</span></td>
                    <td>DRACO</td>
                    <td>控制创建3D瓦片集时应用于几何体的压缩类型。<span class="code">NONE</span>用于禁用几何体压缩。<span class="code">DRACO</span>使用<a href="https://google.github.io/draco/" target="_blank">Draco压缩</a>来创建更小的、具有更好流式传输性能的瓦片集。使用此选项生成的3D瓦片需要支持<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression" target="_blank">KHR_draco_mesh_compression</a> glTF扩展的客户端。所有官方的Cesium客户端都受支持。</td>
                </tr>
                <tr>
                    <td><span class="code">--disable-colors</span></td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>当设置为true时，瓦片生成器将忽略颜色信息，并创建全白的几何体。</td>
                </tr>
                <tr>
                    <td><span class="code">--disable-textures</span></td>
                    <td>boolean</td>
                    <td>false</td>
                    <td>当设置为true时，瓦片生成器将忽略纹理信息，并使用底层几何体的颜色。</td>
                </tr>
                <tr>
                    <td><span class="code">--clamp-to-terrain</span></td>
                    <td>string</td>
                    <td></td>
                    <td>在进行数据约束时使用的地形瓦片集的路径，例如Cesium World Terrain。如果未指定参数，则将使用<a href="https://cddis.nasa.gov/926/egm96/egm96.html" target="_blank">平均海平面（EGM96）</a>。当启用地形约束时，CityGML会调整以下对象类型的高度，使其与地形平齐：<span class="code">CityFurniture</span>（城市家具）、<span class="code">GroundSurface</span>（地面表面）、<span class="code">Track</span>（轨道）、<span class="code">Road</span>（道路）、<span class="code">Railway</span>（铁路）、<span class="code">Square</span>（广场）、<span class="code">ReliefFeature</span>（浮雕特征）、<span class="code">LandUse</span>（土地利用）和<span class="code">TransportationObject</span>（交通工具）。</td>
                </tr>
            </tbody>
        </table>
        <h3>KML/COLLADA<span>KML/COLLADA</span></h3>
        <p>通过指定<span class="code">--input-type KML</span>和<span class="code">--output-type 3DTILES</span>，可以从一个或多个带有关联COLLADA (.dae)模型的KML文件 (.kml, .kmz) 创建3D瓦片数据集。</p>
        <div class="note">
            <p>KML瓦片不支持完整的KML规范。它将处理与<span class="code">Placemark</span>相关的<span class="code">Model</span>（模型）元素。任何<span class="code">Placemark</span>的元数据也将包含在3D瓦片输出中。</p>
        </div>
        <p>KML特定的命令行选项：</p>
        <table>
            <thead>
                <tr>
                    <th>选项</th>
                    <th>值</th>
                    <th>默认</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">--geometry-compression</span></td>
                    <td><span class="code">NONE</span>或<span class="code">DRACO</span></td>
                    <td>DRACO</td>
                    <td>控制创建3D瓦片集时应用于几何体的压缩类型。<span class="code">NONE</span>用于禁用几何体压缩。<span class="code">DRACO</span>使用<a href="https://google.github.io/draco/" target="_blank">Draco压缩</a>来创建更小的、具有更好流式传输性能的瓦片集。使用此选项生成的3D瓦片需要支持<a href="https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_draco_mesh_compression" target="_blank">KHR_draco_mesh_compression</a> glTF扩展的客户端。所有官方的Cesium客户端都受支持。</td>
                </tr>
                <tr>
                    <td><span class="code">--clamp-to-terrain</span></td>
                    <td>string</td>
                    <td></td>
                    <td>在匹配模型贴合地形高度时使用的地形瓦片集的路径，例如Cesium World Terrain。默认情况下，将使用<a href="https://cddis.nasa.gov/926/egm96/egm96.html" target="_blank">平均海平面（EGM96）</a>。当启用模型匹配地形时，模型的高度将被调整为与地形表面相契合。</td>
                </tr>
            </tbody>
        </table>
        <h3>监测进展<span>Monitoring Progress</span></h3>
        <p>当指定了<span class="code">--progress-url</span>参数时，瓦片数据工作流将会以JSON对象的形式将进度更新通过POST请求发送到提供的URL，该JSON对象具有以下结构和属性：</p>
        <monaco-editor v-model="code47" height="220px" />
        <table class="table-02">
            <thead>
                <tr>
                    <th>属性</th>
                    <th>类型</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>jobId</td>
                    <td><span class="code">string</span></td>
                    <td>任务的唯一标识符</td>
                </tr>
                <tr>
                    <td>progress.percentComplete</td>
                    <td><span class="code">number</span>或<span class="code">undefined</span></td>
                    <td>一个从0到100的数值，或者在出现错误时为undefined</td>
                </tr>
                <tr>
                    <td>progress.status</td>
                    <td><span class="code">string</span></td>
                    <td>状态之一：<span class="code">IN_PROGRESS</span>（进行中），<span class="code">COMPLETE</span>（完成），<span class="code">ERROR</span>（错误），<span class="code">DATA_ERROR</span>（数据错误）。</td>
                </tr>
                <tr>
                    <td>progress.message</td>
                    <td><span class="code">string</span>或<span class="code">undefined</span></td>
                    <td>当状态为<span class="code">ERROR</span>或<span class="code">DATA_ERROR</span>时，包含了一个可读的人类描述错误的文本。</td>
                </tr>
                <tr>
                    <td>progress.errorJson</td>
                    <td><span class="code">string</span>或<span class="code">undefined</span></td>
                    <td>当状态为<span class="code">ERROR</span>时，包括可能有助于调试问题的任何额外信息。</td>
                </tr>
            </tbody>
        </table>
        <p><span class="code">--progress-url</span>选项将保留查询参数，这样可以将其它所需的数据编码到URL中，例如与此数据相关联的数据库标识。</p>
        <h3>在Kubernetes之外运行数据工作流<span>Running the pipeline outside of Kubernetes</span></h3>
        <p><span class="code">cesium-ion-tiling</span>容器镜像可以用于在任何符合OCI标准的实现中运行数据工作流，比如<a href="https://www.docker.com/" target="_blank">Docker</a>或<a href="https://podman.io/" target="_blank">Podman</a>。</p>
        <p>例如，要将镜像加载到本地Docker注册表中，请运行：</p>
        <monaco-editor v-model="code48" />
        <p>请注意输出中显示的完整名称和标签，例如<span class="code">cesiumgs/cesium-ion-tiling:1.0.0</span>。</p>
        <p>现在可以使用上述记录的相同命令行选项来运行数据工作流。例如，要将一个GeoTIFF切分为图像瓦片集，您可以运行以下命令：</p>
        <monaco-editor v-model="code49" />
        <p>需要将上述命令中的<span class="code">license</span>替换为<span class="code">cesium-ion/values.yaml</span>中相同的许可证字符串。如果您经常以这种方式运行瓦片生成器，还可以在系统上设置一个全局环境变量，并将<span class="code">-e CESIUM_LICENSE=license</span>替换为<span class="code">-e CESIUM_LICENSE</span>。</p>
        <p>然后，可以将生成的<span class="code">~/myOutputDir/Courtyard</span>瓦片集复制到由资产服务器托管的目录中。</p>
        <p>以下是上述命令的每个部分的说明：</p>
        <ul>
            <li><span class="code">docker run --rm</span> - 运行一个容器并在其完成后立即销毁</li>
            <li><span class="code">-v ~/myInputDir:/input</span> - 将<span class="code">~/myInputDir</span>目录映射到容器内部的<span class="code">/input</span>目录中，使其在容器中可用。</li>
            <li><span class="code">-v ~/myOutputDir/:/output</span> - 将<span class="code">~/myOutputDir</span>目录映射到容器内部的<span class="code">/output</span>目录中，使其在容器中可用。</li>
            <li><span class="code">cesiumgs/cesium-ion-tiling:1.0.0</span> - 要运行的特定瓦片数据工作流镜像。</li>
            <li><span class="code">bin/runJob.js</span> - 实际执行数据工作流的脚本。</li>
            <li><span class="code">-i /input/Courtyard.tif --input-type RASTER_IMAGERY</span> - 输入路径和类型。</li>
            <li><span class="code">-o /output/Courtyard --output-type IMAGERY</span> - 输出路径和类型</li>
        </ul>
        <p>要在Kubernetes之外运行资产服务器，请参阅<strong>在Kubernetes之外运行服务器</strong>。</p>
        <h2>资产服务器参考<span>Asset server reference</span></h2>
        <h3>开发模式<span>Development mode</span></h3>
        <p>默认情况下，<span class="code">cesium-ion/values.yaml</span>将服务器配置为开发模式。为开发人员在应用程序开发过程中提供了多项提高工作效率的特性：</p>
        <ul>
            <li>一个带有基本信息的登录页。</li>
            <li>当前参考文档。</li>
            <li>服务器上的瓦片集列表和用于浏览它们的查看器应用程序。</li>
            <li>已启用并配置了 CORS，以允许任何Web客户端进行连接。</li>
            <li>缓存已完全禁用。</li>
        </ul>
        <p><strong>开发模式中可用的特性并非为生产使用而设计或测试。强烈建议您在生产环境中通过在<span class="code">cesium-ion/values.yaml</span>中设置<span class="code">developmentMode: false</span>来禁用开发模式。</strong></p>
        <h3>部署到生产环境<span>Deploying to production</span></h3>
        <p>如果计划在生产环境中运行资产服务器，有两个步骤应该采取：</p>
        <ul>
            <li>如上所述，禁用<span class="code">developmentMode</span>（开发者模式）。</li>
            <li>确保您的入口（ingress）、负载均衡器或其他内容分发机制为您的使用案例设置了适当的缓存头。因为内容缓存策略高度依赖于特定的使用案例，所以资产服务器在生产模式下不会设置任何缓存头。这意味着默认行为是永久缓存，这可能不是您想要的。</li>
        </ul>
        <h3>安装全局三维内容<span>Installing Global 3D Content</span></h3>
        <p>Cesium ion资产服务器可以托管Cesium精选的全局三维内容，如Cesium World Terrain、OSM Buildings和Sentinel-2影像。将相关文件复制到<span class="code">cesium-ion/values.yaml</span>中配置的<span class="code">assetServer.volumeMounts.mountPath</span>。您可以将文件重命名为任何希望的名称，该名称将成为瓦片集标识符。资产服务器将自动检测数据库类型，并在正确的路由下托管它。</p>
        <p>例如，如果您将 Cesium World Terrain 重命名为<span class="code">cwt</span>，它将可以通过<span class="code">/v1/terrain/cwt/</span>访问，并且您可以通过访问<span class="code">/v1/terrain/cwt/layer.json</span>来浏览 layer.json 文件。还可以在3D瓦片数据工作流的<span class="code">--clamp-to-terrain</span>选项中使用 Cesium World Terrain。</p>
        <h3>在 Kubernetes 外部运行服务器<span>Running the server outside of Kubernetes</span></h3>
        <p><span class="code">cesium-ion-asset-server</span>容器镜像可以用于在任何符合 OCI 标准的实现中运行服务器，比如<a href="https://www.docker.com/" target="_blank">Docker</a>或<a href="https://podman.io/" target="_blank">Podman</a>。</p>
        <p>例如，要将镜像加载到本地的 Docker 注册表中，请运行以下命令：</p>
        <monaco-editor v-model="code50" />
        <p>请注意输出中显示的完整名称和标签，例如<span class="code">cesiumgs/cesium-ion-asset-server:1.0.0</span>。</p>
        <p>现在，可以使用命令行运行服务器。例如，要在本地端口 8070 上提供和浏览位于<span class="code">~/myTilesets</span>中的瓦片集，可以运行：</p>
        <monaco-editor v-model="code51" />
        <p>需要将上述命令中的<span class="code">license</span>替换为<span class="code">cesium-ion/values.yaml</span>中相同的许可证字符串。如果您经常以这种方式运行瓦片生成器，还可以在系统上设置一个全局环境变量，并将<span class="code">-e CESIUM_LICENSE=license</span>替换为<span class="code">-e CESIUM_LICENSE</span>。</p>
        <div class="note">
            <p>在生产环境中，资产服务器应始终在<strong>入口、负载均衡器或 CDN 后</strong>运行。目前，我们尚未提供在 Kubernetes 之外为生产工作负载运行资产服务器的官方指导。</p>
        </div>
        <p>要在 Kubernetes 之外运行瓦片数据工作流，请参阅<strong>在Kubernetes之外运行数据工作流</strong>。</p>
        <h3>API 参考<span>API Reference</span></h3>
        <p>如果使用的是官方Cesium客户端，通常没有必要直接与服务器创建的API路由进行交互。然而，如果正在实施依赖于3D瓦片数据工作流输出的自定义流程，或者正在实现自己的客户端，请参考下方的文档来获取单个瓦片数据。</p>
        <h4>3D 瓦片<span>3D Tiles</span></h4>
        <p>Cesium ion 提供符合3D Tiles规范的3D瓦片集服务。</p>
        <h5>GET /v1/3dtiles/{tilesetId}/tileset.json</h5>
        <p>获取指定<span class="code">tilesetId</span>的根瓦片集JSON。</p>
        <p><i>路径参数</i></p>
        <table>
            <thead>
            <tr>
                <th>参数名</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>tilesetId</td>
                <td>要执行操作的瓦片集标识符。这是一个相对于assetServer.volumeMounts.mountPath的URL编码文件路径。</td>
            </tr>
            </tbody>
        </table>
        <p><i>路径响应</i></p>
        <table>
            <thead>
            <tr>
                <th>Code</th>
                <th>Content-Type</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>200 OK</td>
                <td>application/json</td>
                <td>tileset.json的内容</td>
            </tr>
            <tr>
                <td>404 Not Found</td>
                <td>application/json</td>
                <td>格式为 {"code":"ResourceNotFound","message":""} 的JSON对象。</td>
            </tr>
            </tbody>
        </table>
        <p>示例</p>
        <ul>
            <li>http://10.152.183.47/v1/3dtiles/1234/tileset.json</li>
        </ul>
        <h5>GET /v1/3dtiles/{tilesetId}/{pathFragment}</h5>
        <p>从瓦片集中检索3D瓦片内容。</p>
        <p><i>路径参数</i></p>
        <table>
            <thead>
            <tr>
                <th>参数名</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>tilesetId</td>
                <td>要执行操作的瓦片集标识符。这是一个相对于assetServer.volumeMounts.mountPath的URL编码文件路径。</td>
            </tr>
            <tr>
                <td>pathFragment</td>
                <td>进入3D瓦片集的路径。这是一个路径片段，而不是单个标识符。</td>
            </tr>
            </tbody>
        </table>
        <p><i>路径响应</i></p>
        <table>
            <thead>
            <tr>
                <th>Code</th>
                <th>Content-Type</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>200 OK</td>
                <td>根据3D瓦片资源的内容类型而有所不同。</td>
                <td>文件的内容</td>
            </tr>
            <tr>
                <td>404 Not Found</td>
                <td>application/json</td>
                <td>格式为 {"code":"ResourceNotFound","message":""} 的JSON对象。</td>
            </tr>
            </tbody>
        </table>
        <p>示例</p>
        <ul>
            <li>http://10.152.183.47/v1/3dtiles/1234/data.pnts</li>
            <li>http://10.152.183.47/v1/3dtiles/1234/0/0.b3dm</li>
            <li>http://10.152.183.47/v1/3dtiles/1234/textures/brick.jpg</li>
        </ul>
        <h4>影像<span>Imagery</span></h4>
        <p>Cesium ion提供符合瓦片地图服务规范（<a href="https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification" target="_blank">TileMap Service specification，TMS</a>）的图像。</p>
        <h5>GET /v1/imagery/{tilesetId}/tilemapresource.xml</h5>
        <p>检索与提供的瓦片集相关联的<a href="https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#TileMap_Resource" target="_blank">TileMap资源</a>。</p>
        <p><i>路径参数</i></p>
        <table>
            <thead>
            <tr>
                <th>参数名</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>tilesetId</td>
                <td>要执行操作的瓦片集标识符。这是一个相对于assetServer.volumeMounts.mountPath的URL编码文件路径。</td>
            </tr>
            </tbody>
        </table>
        <p><i>路径响应</i></p>
        <table>
            <thead>
            <tr>
                <th>Code</th>
                <th>Content-Type</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>200 OK</td>
                <td>application/xml</td>
                <td>该瓦片集的<a href="https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#TileMap_Resource" target="_blank">TileMap资源</a>。</td>
            </tr>
            <tr>
                <td>404 Not Found</td>
                <td>application/json</td>
                <td>格式为 {"code":"ResourceNotFound","message":""} 的JSON对象。</td>
            </tr>
            </tbody>
        </table>
        <p>示例</p>
        <ul>
            <li>http://10.152.183.47/v1/imagery/1234/tilemapresource.xml</li>
        </ul>
        <h5>GET /v1/imagery/{tilesetId}/{zoomLevel}/{tileColumn}/{tileRow}.(jpg|png)</h5>
        <p><i>路径参数</i></p>
        <table>
            <thead>
            <tr>
                <th>参数名</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>tilesetId</td>
                <td>要执行操作的瓦片集标识符。这是一个相对于assetServer.volumeMounts.mountPath的URL编码文件路径。</td>
            </tr>
            <tr>
                <td>zoomLevel</td>
                <td>缩放级别。</td>
            </tr>
            <tr>
                <td>tileColumn</td>
                <td>瓦片x坐标。</td>
            </tr>
            <tr>
                <td>tileRow</td>
                <td>瓦片y坐标。</td>
            </tr>
            </tbody>
        </table>
        <p><i>路径响应</i></p>
        <table>
            <thead>
            <tr>
                <th>Code</th>
                <th>Content-Type</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>200 OK</td>
                <td>image/jpg, image/png</td>
                <td>提供的坐标处的图像。</td>
            </tr>
            <tr>
                <td>404 Not Found</td>
                <td>application/json</td>
                <td>格式为 {"code":"ResourceNotFound","message":""} 的JSON对象。请注意，对于透明的图像，Cesium ion不会存储空瓦片。因此，在正常操作过程中可能会发生404错误。</td>
            </tr>
            </tbody>
        </table>
        <p>示例</p>
        <ul>
            <li>http://10.152.183.47/v1/imagery/myImagery/21/608192/793641.png</li>
        </ul>
        <h4>地形<span>Terrain</span></h4>
        <p>Cesium ion以<a href="https://github.com/CesiumGS/quantized-mesh" target="_blank">quantized-mesh-1.0地形格式</a>提供地形数据。</p>
        <h5>GET /v1/terrain/{tilesetId}/layer.json</h5>
        <p>检索<span class="code">tilesetId</span>的图层JSON。</p>
        <p><i>路径参数</i></p>
        <table>
            <thead>
            <tr>
                <th>参数名</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>tilesetId</td>
                <td>要执行操作的瓦片集标识符。这是一个相对于assetServer.volumeMounts.mountPath的URL编码文件路径。</td>
            </tr>
            </tbody>
        </table>
        <p><i>路径响应</i></p>
        <table>
            <thead>
            <tr>
                <th>Code</th>
                <th>Content-Type</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>200 OK</td>
                <td>application/json</td>
                <td>layer.json的内容。</td>
            </tr>
            <tr>
                <td>404 Not Found</td>
                <td>application/json</td>
                <td>格式为 {"code":"ResourceNotFound","message":""} 的JSON对象。</td>
            </tr>
            </tbody>
        </table>
        <p>示例</p>
        <ul>
            <li>http://10.152.183.47/v1/terrain/CesiumWorldTerrain/layer.json</li>
        </ul>
        <h5>GET /v1/terrain/{tilesetId}/{zoomLevel}/{tileColumn}/{tileRow}.terrain</h5>
        <p>检索一个量化网格地形瓦片。</p>
        <p><i>路径参数</i></p>
        <table>
            <thead>
            <tr>
                <th>参数名</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>tilesetId</td>
                <td>要执行操作的瓦片集标识符。这是一个相对于assetServer.volumeMounts.mountPath的URL编码文件路径。</td>
            </tr>
            <tr>
                <td>zoomLevel</td>
                <td>缩放级别。</td>
            </tr>
            <tr>
                <td>tileColumn</td>
                <td>瓦片x坐标。</td>
            </tr>
            <tr>
                <td>tileRow</td>
                <td>瓦片y坐标。</td>
            </tr>
            </tbody>
        </table>
        <p><i>路径响应</i></p>
        <table>
            <thead>
            <tr>
                <th>Code</th>
                <th>Content-Type</th>
                <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>200 OK</td>
                <td>application/vnd.quantized-mesh</td>
                <td>地形瓦片和可选扩展部分。</td>
            </tr>
            <tr>
                <td>404 Not Found</td>
                <td>application/json</td>
                <td>格式为 {"code":"ResourceNotFound","message":""} 的JSON对象。</td>
            </tr>
            </tbody>
        </table>
        <p>示例</p>
        <ul>
            <li>http://10.152.183.47/v1/terrain/CesiumWorldTerrain/21/608192/793641.terrain</li>
        </ul>
        <h4>健康检查<span>Health check</span></h4>
        <h5>GET /health</h5>
        <p>健康检查用于 Kubernetes 确保服务器正在运行。如果服务器可以访问，则此路由始终返回 204 无内容。它不适用于 Kubernetes 之外的用途。</p>
        <h2>第三方许可证<span>Third Party Licensing</span></h2>
        <p>Cesium ion使用以下第三方软件。</p>
        <table>
            <thead>
            <tr>
                <th>名称</th>
                <th>许可</th>
                <th>链接地址</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>@aws-sdk/client-s3</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/@aws-sdk/client-s3" target="_blank">https://www.npmjs.com/package/@aws-sdk/client-s3</a></td>
            </tr>
            <tr>
                <td>@aws-sdk/credential-provider-node</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/@aws-sdk/credential-provider-node" target="_blank">https://www.npmjs.com/package/@aws-sdk/credential-provider-node</a></td>
            </tr>
            <tr>
                <td>@aws-sdk/lib-storage</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/@aws-sdk/lib-storage" target="_blank">https://www.npmjs.com/package/@aws-sdk/lib-storage</a></td>
            </tr>
            <tr>
                <td>@opensearch-project/opensearch</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/@opensearch-project/opensearch" target="_blank">https://www.npmjs.com/package/@opensearch-project/opensearch</a></td>
            </tr>
            <tr>
                <td>archiver</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/archiver" target="_blank">https://www.npmjs.com/package/archiver</a></td>
            </tr>
            <tr>
                <td>aws-c-auth</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-auth" target="_blank">https://github.com/awslabs/aws-c-auth</a></td>
            </tr>
            <tr>
                <td>aws-c-cal</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-cal" target="_blank">https://github.com/awslabs/aws-c-cal</a></td>
            </tr>
            <tr>
                <td>aws-c-common</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-common" target="_blank">https://github.com/awslabs/aws-c-common</a></td>
            </tr>
            <tr>
                <td>aws-c-compression</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-compression" target="_blank">https://github.com/awslabs/aws-c-compression</a></td>
            </tr>
            <tr>
                <td>aws-c-event-stream</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-event-stream" target="_blank">https://github.com/awslabs/aws-c-event-stream</a></td>
            </tr>
            <tr>
                <td>aws-c-http</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-http" target="_blank">https://github.com/awslabs/aws-c-http</a></td>
            </tr>
            <tr>
                <td>aws-c-io</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-io" target="_blank">https://github.com/awslabs/aws-c-io</a></td>
            </tr>
            <tr>
                <td>aws-c-mqtt</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-mqtt" target="_blank">https://github.com/awslabs/aws-c-mqtt</a></td>
            </tr>
            <tr>
                <td>aws-c-s3</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-s3" target="_blank">https://github.com/awslabs/aws-c-s3</a></td>
            </tr>
            <tr>
                <td>aws-c-sdkutils</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-c-sdkutils" target="_blank">https://github.com/awslabs/aws-c-sdkutils</a></td>
            </tr>
            <tr>
                <td>aws-checksums</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-checksums" target="_blank">https://github.com/awslabs/aws-checksums</a></td>
            </tr>
            <tr>
                <td>aws-crt-cpp</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/awslabs/aws-crt-cpp" target="_blank">https://github.com/awslabs/aws-crt-cpp</a></td>
            </tr>
            <tr>
                <td>aws-sdk-cpp</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/aws/aws-sdk-cpp" target="_blank">https://github.com/aws/aws-sdk-cpp</a></td>
            </tr>
            <tr>
                <td>base64</td>
                <td>BSD-2-Clause</td>
                <td><a href="https://github.com/aklomp/base64" target="_blank">https://github.com/aklomp/base64</a></td>
            </tr>
            <tr>
                <td>better-sqlite3</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/better-sqlite3" target="_blank">https://www.npmjs.com/package/better-sqlite3</a></td>
            </tr>
            <tr>
                <td>bluebird</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/bluebird" target="_blank">https://www.npmjs.com/package/bluebird</a></td>
            </tr>
            <tr>
                <td>boost</td>
                <td>BSL-1.0</td>
                <td><a href="https://www.boost.org" target="_blank">https://www.boost.org</a></td>
            </tr>
            <tr>
                <td>bshoshany-thread-pool</td>
                <td>MIT</td>
                <td><a href="https://github.com/bshoshany/thread-pool" target="_blank">https://github.com/bshoshany/thread-pool</a></td>
            </tr>
            <tr>
                <td>bzip2</td>
                <td>bzip2</td>
                <td><a href="http://www.bzip.org" target="_blank">http://www.bzip.org</a></td>
            </tr>
            <tr>
                <td>cesium</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/cesium" target="_blank">https://www.npmjs.com/package/cesium</a></td>
            </tr>
            <tr>
                <td>cesium-native</td>
                <td>Apache-2.0 License</td>
                <td><a href="https://github.com/CesiumGS/cesium-native" target="_blank">https://github.com/CesiumGS/cesium-native</a></td>
            </tr>
            <tr>
                <td>chokidar</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/chokidar" target="_blank">https://www.npmjs.com/package/chokidar</a></td>
            </tr>
            <tr>
                <td>clone</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/clone" target="_blank">https://www.npmjs.com/package/clone</a></td>
            </tr>
            <tr>
                <td>collada-dom</td>
                <td>MIT</td>
                <td><a href="https://github.com/rdiankov/collada-dom" target="_blank">https://github.com/rdiankov/collada-dom</a></td>
            </tr>
            <tr>
                <td>COLLADA2GLTF</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://github.com/KhronosGroup/COLLADA2GLTF" target="_blank">https://github.com/KhronosGroup/COLLADA2GLTF</a></td>
            </tr>
            <tr>
                <td>compressonator</td>
                <td>MIT</td>
                <td><a href="https://github.com/GPUOpen-Tools/compressonator/blob/v3.1.4064/LICENSE" target="_blank">https://github.com/GPUOpen-Tools/compressonator/blob/v3.1.4064/LICENSE</a></td>
            </tr>
            <tr>
                <td>cpp-jwt</td>
                <td>MIT</td>
                <td><a href="https://github.com/arun11299/cpp-jwt" target="_blank">https://github.com/arun11299/cpp-jwt</a></td>
            </tr>
            <tr>
                <td>csv-parse</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/csv-parse" target="_blank">https://www.npmjs.com/package/csv-parse</a></td>
            </tr>
            <tr>
                <td>cxxopts</td>
                <td>MIT</td>
                <td><a href="https://github.com/jarro2783/cxxopts" target="_blank">https://github.com/jarro2783/cxxopts</a></td>
            </tr>
            <tr>
                <td>data-uri-to-buffer</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/data-uri-to-buffer" target="_blank">https://www.npmjs.com/package/data-uri-to-buffer</a></td>
            </tr>
            <tr>
                <td>deep-equal</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/deep-equal" target="_blank">https://www.npmjs.com/package/deep-equal</a></td>
            </tr>
            <tr>
                <td>delaunator-cpp</td>
                <td>MIT</td>
                <td><a href="https://github.com/abellgithub/delaunator-cpp" target="_blank">https://github.com/abellgithub/delaunator-cpp</a></td>
            </tr>
            <tr>
                <td>dockerode</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/dockerode" target="_blank">https://www.npmjs.com/package/dockerode</a></td>
            </tr>
            <tr>
                <td>double-conversion</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://github.com/google/double-conversion" target="_blank">https://github.com/google/double-conversion</a></td>
            </tr>
            <tr>
                <td>draco</td>
                <td>Apache-2.0</td>
                <td><a href="https://google.github.io/draco/" target="_blank">https://google.github.io/draco/</a></td>
            </tr>
            <tr>
                <td>eigen</td>
                <td>MPL-2.0</td>
                <td><a href="http://eigen.tuxfamily.org" target="_blank">http://eigen.tuxfamily.org</a></td>
            </tr>
            <tr>
                <td>expected-lite</td>
                <td>BSL-1.0</td>
                <td><a href="https://github.com/martinmoene/expected-lite" target="_blank">https://github.com/martinmoene/expected-lite</a></td>
            </tr>
            <tr>
                <td>fast-glob</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/fast-glob" target="_blank">https://www.npmjs.com/package/fast-glob</a></td>
            </tr>
            <tr>
                <td>FBX2glTF</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://github.com/godotengine/FBX2glTF" target="_blank">https://github.com/godotengine/FBX2glTF</a></td>
            </tr>
            <tr>
                <td>flatbuffers</td>
                <td>Apache-2.0</td>
                <td><a href="http://google.github.io/flatbuffers" target="_blank">http://google.github.io/flatbuffers</a></td>
            </tr>
            <tr>
                <td>fmt</td>
                <td>MIT</td>
                <td><a href="https://github.com/fmtlib/fmt" target="_blank">https://github.com/fmtlib/fmt</a></td>
            </tr>
            <tr>
                <td>fontawesome/css</td>
                <td>MIT</td>
                <td><a href="https://fontawesome.com/v4/" target="_blank">https://fontawesome.com/v4/</a></td>
            </tr>
            <tr>
                <td>fontawesome/fonts</td>
                <td>SIL OPEN FONT LICENSE Version 1.1</td>
                <td><a href="https://fontawesome.com/v4/" target="_blank">https://fontawesome.com/v4/</a></td>
            </tr>
            <tr>
                <td>fs-extra</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/fs-extra" target="_blank">https://www.npmjs.com/package/fs-extra</a></td>
            </tr>
            <tr>
                <td>gdal</td>
                <td>MIT</td>
                <td><a href="https://github.com/OSGeo/gdal" target="_blank">https://github.com/OSGeo/gdal</a></td>
            </tr>
            <tr>
                <td>giflib</td>
                <td>MIT</td>
                <td><a href="http://giflib.sourceforge.net" target="_blank">http://giflib.sourceforge.net</a></td>
            </tr>
            <tr>
                <td>glm</td>
                <td>MIT</td>
                <td><a href="https://github.com/g-truc/glm" target="_blank">https://github.com/g-truc/glm</a></td>
            </tr>
            <tr>
                <td>globby</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/globby" target="_blank">https://www.npmjs.com/package/globby</a></td>
            </tr>
            <tr>
                <td>gltf-pipeline</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/gltf-pipeline" target="_blank">https://www.npmjs.com/package/gltf-pipeline</a></td>
            </tr>
            <tr>
                <td>glutess</td>
                <td>SGI FREE SOFTWARE LICENSE B v2.0</td>
                <td><a href="https://github.com/CesiumGS/glutess" target="_blank">https://github.com/CesiumGS/glutess</a></td>
            </tr>
            <tr>
                <td>highlight.js</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://github.com/highlightjs/highlight.js/" target="_blank">https://github.com/highlightjs/highlight.js/</a></td>
            </tr>
            <tr>
                <td>iconv-lite</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/iconv-lite" target="_blank">https://www.npmjs.com/package/iconv-lite</a></td>
            </tr>
            <tr>
                <td>image-size</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/image-size" target="_blank">https://www.npmjs.com/package/image-size</a></td>
            </tr>
            <tr>
                <td>ImageMagick</td>
                <td>Apache-2.0</td>
                <td><a href="https://imagemagick.org/index.php" target="_blank">https://imagemagick.org/index.php</a></td>
            </tr>
            <tr>
                <td>Intel ® Architecture Instruction Set Extensions and Future Features</td>
                <td>MIT</td>
                <td><a href="https://software.intel.com/content/www/us/en/develop/download/intel-architecture-instruction-set-extensions-programming-reference.html" target="_blank">https://software.intel.com/content/www/us/en/develop/download/intel-architecture-instruction-set-extensions-programming-reference.html</a></td>
            </tr>
            <tr>
                <td>jimp</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/jimp" target="_blank">https://www.npmjs.com/package/jimp</a></td>
            </tr>
            <tr>
                <td>json-c</td>
                <td>MIT</td>
                <td><a href="https://github.com/json-c/json-c" target="_blank">https://github.com/json-c/json-c</a></td>
            </tr>
            <tr>
                <td>jsonwebtoken</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank">https://www.npmjs.com/package/jsonwebtoken</a></td>
            </tr>
            <tr>
                <td>klaw</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/klaw" target="_blank">https://www.npmjs.com/package/klaw</a></td>
            </tr>
            <tr>
                <td>laszip</td>
                <td>LGPL-2.1</td>
                <td><a href="https://github.com/LASzip/LASzip" target="_blank">https://github.com/LASzip/LASzip</a></td>
            </tr>
            <tr>
                <td>libcitygml</td>
                <td>LGPL-v2.1</td>
                <td><a href="https://github.com/CesiumGS/libcitygml" target="_blank">https://github.com/CesiumGS/libcitygml</a></td>
            </tr>
            <tr>
                <td>libcurl</td>
                <td>MIT</td>
                <td><a href="https://curl.haxx.se" target="_blank">https://curl.haxx.se</a></td>
            </tr>
            <tr>
                <td>libdeflate</td>
                <td>MIT</td>
                <td><a href="https://github.com/ebiggers/libdeflate" target="_blank">https://github.com/ebiggers/libdeflate</a></td>
            </tr>
            <tr>
                <td>libgeotiff</td>
                <td>MIT</td>
                <td><a href="https://github.com/OSGeo/libgeotiff" target="_blank">https://github.com/OSGeo/libgeotiff</a></td>
            </tr>
            <tr>
                <td>libjpeg-turbo</td>
                <td>IJG,BSD-3-Clause,Zlib</td>
                <td><a href="https://libjpeg-turbo.org" target="_blank">https://libjpeg-turbo.org</a></td>
            </tr>
            <tr>
                <td>libmorton</td>
                <td>MIT</td>
                <td><a href="https://github.com/Forceflow/libmorton" target="_blank">https://github.com/Forceflow/libmorton</a></td>
            </tr>
            <tr>
                <td>libpng</td>
                <td>libpng-2.0</td>
                <td><a href="http://www.libpng.org" target="_blank">http://www.libpng.org</a></td>
            </tr>
            <tr>
                <td>libtiff</td>
                <td>MIT</td>
                <td><a href="http://www.simplesystems.org/libtiff" target="_blank">http://www.simplesystems.org/libtiff</a></td>
            </tr>
            <tr>
                <td>libwebp</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://github.com/webmproject/libwebp" target="_blank">https://github.com/webmproject/libwebp</a></td>
            </tr>
            <tr>
                <td>libxml2</td>
                <td>MIT</td>
                <td><a href="https://gitlab.gnome.org/GNOME/libxml2/-/wikis/" target="_blank">https://gitlab.gnome.org/GNOME/libxml2/-/wikis/</a></td>
            </tr>
            <tr>
                <td>lodepng</td>
                <td>Zlib</td>
                <td><a href="https://github.com/lvandeve/lodepng" target="_blank">https://github.com/lvandeve/lodepng</a></td>
            </tr>
            <tr>
                <td>lru-cache</td>
                <td>ISC</td>
                <td><a href="https://www.npmjs.com/package/lru-cache" target="_blank">https://www.npmjs.com/package/lru-cache</a></td>
            </tr>
            <tr>
                <td>meshoptimizer</td>
                <td>MIT</td>
                <td><a href="https://github.com/zeux/meshoptimizer" target="_blank">https://github.com/zeux/meshoptimizer</a></td>
            </tr>
            <tr>
                <td>mime</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/mime" target="_blank">https://www.npmjs.com/package/mime</a></td>
            </tr>
            <tr>
                <td>morton-nd</td>
                <td>MIT</td>
                <td><a href="https://github.com/kevinhartman/morton-nd" target="_blank">https://github.com/kevinhartman/morton-nd</a></td>
            </tr>
            <tr>
                <td>nan</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/nan" target="_blank">https://www.npmjs.com/package/nan</a></td>
            </tr>
            <tr>
                <td>nconf</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/nconf" target="_blank">https://www.npmjs.com/package/nconf</a></td>
            </tr>
            <tr>
                <td>nlohmann_json</td>
                <td>MIT</td>
                <td><a href="https://github.com/nlohmann/json" target="_blank">https://github.com/nlohmann/json</a></td>
            </tr>
            <tr>
                <td>node-expat</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/node-expat" target="_blank">https://www.npmjs.com/package/node-expat</a></td>
            </tr>
            <tr>
                <td>obj2gltf</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/obj2gltf" target="_blank">https://www.npmjs.com/package/obj2gltf</a></td>
            </tr>
            <tr>
                <td>object-hash</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/object-hash" target="_blank">https://www.npmjs.com/package/object-hash</a></td>
            </tr>
            <tr>
                <td>Open Sans</td>
                <td>SIL OPEN FONT LICENSE Version 1.1</td>
                <td><a href="https://github.com/googlefonts/opensans" target="_blank">https://github.com/googlefonts/opensans</a></td>
            </tr>
            <tr>
                <td>openssl</td>
                <td>OpenSSL</td>
                <td><a href="https://github.com/openssl/openssl" target="_blank">https://github.com/openssl/openssl</a></td>
            </tr>
            <tr>
                <td>pako</td>
                <td>(MIT AND Zlib)</td>
                <td><a href="https://www.npmjs.com/package/pako" target="_blank">https://www.npmjs.com/package/pako</a></td>
            </tr>
            <tr>
                <td>pcre</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://www.pcre.org" target="_blank">https://www.pcre.org</a></td>
            </tr>
            <tr>
                <td>pino</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/pino" target="_blank">https://www.npmjs.com/package/pino</a></td>
            </tr>
            <tr>
                <td>progress</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/progress" target="_blank">https://www.npmjs.com/package/progress</a></td>
            </tr>
            <tr>
                <td>proj</td>
                <td>MIT</td>
                <td><a href="https://proj.org" target="_blank">https://proj.org</a></td>
            </tr>
            <tr>
                <td>PROJ-data</td>
                <td>CC-BY-4.0,CC-BY-SA-4.0,CC0-1.0,Data licence Germany - attribution - version 2.0,OGL-Canada-2.0,Open License France,Public domain,BSD-2-Clause</td>
                <td><a href="https://github.com/OSGeo/PROJ-data" target="_blank">https://github.com/OSGeo/PROJ-data</a></td>
            </tr>
            <tr>
                <td>qhull</td>
                <td>Qhull</td>
                <td><a href="http://www.qhull.org" target="_blank">http://www.qhull.org</a></td>
            </tr>
            <tr>
                <td>rapidjson</td>
                <td>MIT</td>
                <td><a href="http://rapidjson.org" target="_blank">http://rapidjson.org</a></td>
            </tr>
            <tr>
                <td>readable-stream</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/readable-stream" target="_blank">https://www.npmjs.com/package/readable-stream</a></td>
            </tr>
            <tr>
                <td>request</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/request" target="_blank">https://www.npmjs.com/package/request</a></td>
            </tr>
            <tr>
                <td>request-promise-native</td>
                <td>ISC</td>
                <td><a href="https://www.npmjs.com/package/request-promise-native" target="_blank">https://www.npmjs.com/package/request-promise-native</a></td>
            </tr>
            <tr>
                <td>restify</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/restify" target="_blank">https://www.npmjs.com/package/restify</a></td>
            </tr>
            <tr>
                <td>restify-errors</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/restify-errors" target="_blank">https://www.npmjs.com/package/restify-errors</a></td>
            </tr>
            <tr>
                <td>s2n</td>
                <td>Apache-2.0</td>
                <td><a href="https://github.com/aws/s2n-tls" target="_blank">https://github.com/aws/s2n-tls</a></td>
            </tr>
            <tr>
                <td>spdlog</td>
                <td>MIT</td>
                <td><a href="https://github.com/gabime/spdlog" target="_blank">https://github.com/gabime/spdlog</a></td>
            </tr>
            <tr>
                <td>sqlite3</td>
                <td>Unlicense</td>
                <td><a href="https://www.sqlite.org" target="_blank">https://www.sqlite.org</a></td>
            </tr>
            <tr>
                <td>stb</td>
                <td>Unlicense</td>
                <td><a href="https://github.com/nothings/stb" target="_blank">https://github.com/nothings/stb</a></td>
            </tr>
            <tr>
                <td>taskflow</td>
                <td>MIT</td>
                <td><a href="https://github.com/taskflow/taskflow" target="_blank">https://github.com/taskflow/taskflow</a></td>
            </tr>
            <tr>
                <td>tinyobjloader</td>
                <td>MIT</td>
                <td><a href="https://github.com/syoyo/tinyobjloader" target="_blank">https://github.com/syoyo/tinyobjloader</a></td>
            </tr>
            <tr>
                <td>upath</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/upath" target="_blank">https://www.npmjs.com/package/upath</a></td>
            </tr>
            <tr>
                <td>uriparser</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://uriparser.github.io/" target="_blank">https://uriparser.github.io/</a></td>
            </tr>
            <tr>
                <td>workerpool</td>
                <td>Apache-2.0</td>
                <td><a href="https://www.npmjs.com/package/workerpool" target="_blank">https://www.npmjs.com/package/workerpool</a></td>
            </tr>
            <tr>
                <td>xatlas</td>
                <td>MIT</td>
                <td><a href="https://github.com/CesiumGS/xatlas" target="_blank">https://github.com/CesiumGS/xatlas</a></td>
            </tr>
            <tr>
                <td>xerces-c</td>
                <td>Apache-2.0</td>
                <td><a href="http://xerces.apache.org/xerces-c/index.html" target="_blank">http://xerces.apache.org/xerces-c/index.html</a></td>
            </tr>
            <tr>
                <td>xml-stream</td>
                <td>MIT</td>
                <td><a href="https://github.com/assistunion/xml-stream" target="_blank">https://github.com/assistunion/xml-stream</a></td>
            </tr>
            <tr>
                <td>xz_utils</td>
                <td>Unlicense</td>
                <td><a href="https://tukaani.org/xz" target="_blank">https://tukaani.org/xz</a></td>
            </tr>
            <tr>
                <td>yargs</td>
                <td>MIT</td>
                <td><a href="https://www.npmjs.com/package/yargs" target="_blank">https://www.npmjs.com/package/yargs</a></td>
            </tr>
            <tr>
                <td>zlib</td>
                <td>Zlib</td>
                <td><a href="https://zlib.net" target="_blank">https://zlib.net</a></td>
            </tr>
            <tr>
                <td>zstd</td>
                <td>BSD-3-Clause</td>
                <td><a href="https://github.com/facebook/zstd" target="_blank">https://github.com/facebook/zstd</a></td>
            </tr>
            <tr>
                <td>zstr</td>
                <td>MIT</td>
                <td><a href="https://github.com/mateidavid/zstr" target="_blank">https://github.com/mateidavid/zstr</a></td>
            </tr>
            </tbody>
        </table>
        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/ion/self-hosted/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style lang="scss" scoped>
:root {
    --mermaid-font-family: "trebuchet ms", verdana, arial, sans-serif;
}

.table-01 tr {

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

.table-02 tr {

    td:nth-child(2) {
        min-width: 164px;
    }
}

.my-svg {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-size: 16px;
    fill: #333;

    .error-icon {
        fill: #552222;
    }

    .error-text {
        fill: #552222;
        stroke: #552222;
    }

    .edge-thickness-normal {
        stroke-width: 2px;
    }

    .edge-thickness-thick {
        stroke-width: 4px;
    }

    .edge-pattern-solid {
        stroke-dasharray: 0;
    }

    .edge-pattern-dashed {
        stroke-dasharray: 3;
    }

    .edge-pattern-dotted {
        stroke-dasharray: 2;
    }

    .marker {
        fill: #333333;
        stroke: #333333;
    }

    .marker.cross {
        stroke: #333333;
    }

    svg {
        font-family: "trebuchet ms", verdana, arial, sans-serif;
        font-size: 16px;
    }

    .label {
        font-family: "trebuchet ms", verdana, arial, sans-serif;
        color: #333;
    }

    .cluster-label text {
        fill: #333;
    }

    .cluster-label span,
    p {
        color: #333;
    }

    .label text,
    span,
    p {
        fill: #333;
        color: #333;
    }

    .node {
        rect,
        circle,
        ellipse,
        polygon,
        path {
            fill: #ECECFF;
            stroke: #9370DB;
            stroke-width: 1px;
        }

        .label {
            text-align: center;
        }

        &.clickable {
            cursor: pointer;
        }
    }

    .flowchart-label text {
        text-anchor: middle;
    }

    .arrowheadPath {
        fill: #333333;
    }

    .edgePath .path {
        stroke: #333333;
        stroke-width: 2.0px;
    }

    .flowchart-link {
        stroke: #333333;
        fill: none;
    }

    .edgeLabel {
        background-color: #e8e8e8;
        text-align: center;

        rect {
            opacity: 0.5;
            background-color: #e8e8e8;
            fill: #e8e8e8;
        }
    }

    .labelBkg {
        background-color: rgba(232, 232, 232, 0.5);
    }

    .cluster {
        rect {
            fill: #ffffde;
            stroke: #aaaa33;
            stroke-width: 1px;
        }

        text {
            fill: #333;
        }
    }

    .cluster span,
    p {
        color: #333;
    }

    div.mermaidTooltip {
        position: absolute;
        text-align: center;
        max-width: 200px;
        padding: 2px;
        font-family: "trebuchet ms", verdana, arial, sans-serif;
        font-size: 12px;
        background: hsl(80, 100%, 96.2745098039%);
        border: 1px solid #aaaa33;
        border-radius: 2px;
        pointer-events: none;
        z-index: 100;
    }

    .flowchartTitleText {
        text-anchor: middle;
        font-size: 18px;
        fill: #333;
    }

    .plain > * {
        fill: #ddd !important;
        stroke: #fff !important;
        stroke-width: 4px !important;
        color: #000 !important;
    }

    .plain {
        span {
            fill: #ddd !important;
            stroke: #fff !important;
            stroke-width: 4px !important;
            color: #000 !important;
        }

        tspan {
            fill: #000 !important;
        }
    }

    .k8s > * {
        fill: #326ce5 !important;
        stroke: #fff !important;
        stroke-width: 4px !important;
        color: #fff !important;
    }

    .k8s {
        span {
            fill: #326ce5 !important;
            stroke: #fff !important;
            stroke-width: 4px !important;
            color: #fff !important;
        }

        tspan {
            fill: #fff !important;
        }
    }

    .k8sNew > * {
        fill: #326ce5 !important;
        stroke: #fff !important;
        stroke-width: 4px !important;
        color: #fff !important;
    }

    .k8sNew {
        span {
            fill: #326ce5 !important;
            stroke: #fff !important;
            stroke-width: 4px !important;
            color: #fff !important;
        }

        tspan {
            fill: #fff !important;
        }
    }

    .k8sOld > * {
        fill: #fff !important;
        stroke: #326ce5 !important;
        stroke-width: 4px !important;
        color: #326ce5 !important;
    }

    .k8sOld {
        span {
            fill: #fff !important;
            stroke: #326ce5 !important;
            stroke-width: 4px !important;
            color: #326ce5 !important;
        }

        tspan {
            fill: #326ce5 !important;
        }
    }

    .cluster > * {
        fill: #fff !important;
        stroke: #bbb !important;
        stroke-width: 2px !important;
        color: #326ce5 !important;
    }

    .cluster {
        span {
            fill: #fff !important;
            stroke: #bbb !important;
            stroke-width: 2px !important;
            color: #326ce5 !important;
        }

        tspan {
            fill: #326ce5 !important;
        }
    }
}
</style>
