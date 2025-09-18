<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const code01 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000)
});`,
    html
});

const code02 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000),
    orientation: {
        heading: Cesium.Math.toRadians(20),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0
    }
});`,
    html
});

const code03 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');

const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction((event) => {
    const ray = viewer.camera.getPickRay(event.position);
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (Cesium.defined(cartesian)) {
        document.querySelector('.point').innerHTML = \`x: \${ cartesian.x }<br\/>y: \${ cartesian.y }<br\/>z: \${ cartesian.z }\`;
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);`,
    html      : `${ html }
<div class="point"></div>`,
    css       : `.point {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px;
    background: #ffffff;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 3px;
}`
});

const code04 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');

const rectangle = viewer.entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-90, 38, -87, 40)
    }
});

viewer.flyTo(rectangle);`,
    html
});

const code05 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    terrain: Cesium.Terrain.fromWorldTerrain()
});

const building = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(building);

viewer.camera.flyTo({
    destination: new Cesium.Cartesian3(
        -3961951.575572026, 3346492.0945766014, 3702340.5336036095
    ),
    orientation: {
        direction: new Cesium.Cartesian3(
            0.8982074415844437, -0.4393530288745287, 0.013867512433959908
        ),
        up: new Cesium.Cartesian3(
            0.12793638617798253, 0.29147314437764565, 0.9479850669701113
        ),
    },
    complete: () => {
        setTimeout(() => {
            viewer.camera.flyTo({
                destination: new Cesium.Cartesian3(
                    -2304817.2435183465, -3639113.128132953, 4688495.013644141
                ),
                orientation: {
                    direction: new Cesium.Cartesian3(
                        0.3760550186878076, 0.9007147395506565, 0.21747547189489164
                    ),
                    up: new Cesium.Cartesian3(
                        -0.20364591529594356, -0.14862471084230877, 0.9676978022659334
                    ),
                },
                easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
                duration: 5,
            });
        }, 5000);
    },
});`,
    html
});

const code06 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container', {
    terrain: Cesium.Terrain.fromWorldTerrain()
});

const center = Cesium.Cartesian3.fromRadians(2.4213211833389243, 0.6171926869414084, 3626.0426275055174);

const transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
viewer.scene.camera.lookAtTransform(
    transform, new Cesium.HeadingPitchRange(0, -Math.PI / 4, 2900)
);`,
    html
});

const code07 = ref({
    js: `// 观察一个点
const viewer = new Cesium.Viewer('cesium-container', {
    terrain: Cesium.Terrain.fromWorldTerrain()
});

const center = Cesium.Cartesian3.fromRadians(2.4213211833389243, 0.6171926869414084, 3626.0426275055174);

const transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
viewer.scene.camera.lookAtTransform(
    transform, new Cesium.HeadingPitchRange(0, -Math.PI / 8, 2900)
);

// 环绕这个点
viewer.clock.onTick.addEventListener((clock) => {
    viewer.scene.camera.rotateRight(.001);
});`,
    html
});

const code08 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');
// 禁用相机碰撞以允许它进入地下
viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;`,
    html
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>控制相机<span>Control the camera</span></h1>
        <p>本指南将展示如何在CesiumJS中使用相机API，并实现诸如飞到地球上的某一点、缩放到场景中的数据源或将相机锁定到特定模型等功能。</p>
        <h2>前提条件<span>Prerequisites</span></h2>
        <ul>
            <li>了解如何设置基本的CesiumJS应用程序。</li>
        </ul>
        <div class="note">
            <p>是Cesium的新手吗？如果是第一次设置应用程序，可以从<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门</router-link>教程开始获取帮助。</p>
        </div>
        <h2>飞往某个位置<span>Fly to a location</span></h2>
        <p>如果知道位置的纬度、经度和高度，可以使用相机的<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Camera.html#flyTo" target="_blank">flyTo</a></span>函数在CesiumJS中直接飞往该位置。例如，要飞往圣地亚哥，我们可以传入经度-117.16，纬度32.71和高度15000.0，代码如下:</p>
        <cesium-example v-model="code01" height="180px" />
        <p><a href="https://sandcastle.cesium.com/#c=bY9BS8NAEIX/ypBTAnGStWjBpkGIR8GD4mkv02RSFze7ZXeTEsX/7rZBEO2cZt687zEzkYNJ8ZEdbMHwERr2ahzw9aylMmnPc2NNIGXYySTbSCPNwmBLAzvCXs8vNv2UBmJ17IMyFJQ1dz9xDbkQOzIr7J0dHnjvmH16JcQaxW0Oq2tcixzETVmWWGbSfGWbJE8qH2bN9ZILcK+Gg3UBRqdTxCLwcNAUc4vd2L5zwNb703Una1X8RqtOTaC67YV3oNXkfdz0o9bP6oNlUldF9P9DtaVOmf3TxE7TfLK9ifpxERGxKuJ4mQzW6h25P8nf" target="_blank" class="btn-sandcastle">在Sandcastle中打开</a></p>
        <p>要在<span class="code">flyTo</span>完成后更改相机的方向，请添加一个<span class="code">orientation</span>选项：</p>
        <cesium-example v-model="code02" height="240px" />
        <p>这里的<span class="code">heading</span>（航向）、<span class="code">pitch</span>（俯仰）和<span class="code">roll</span>（倾斜），单位都是：弧度(rad)，它们组合后被称作为：欧拉角。</p>
        <ul>
            <li>航向: 水平面相对正北方向，Y轴旋转的夹角角度，正角度向东递增。航空或航海术语中，这通常称为偏航角。</li>
            <li>俯仰: 水平面到相机顶部，X轴旋转后的仰角或俯角。</li>
            <li>倾斜: 相机或观察者绕视线方向，Z轴旋转后的倾斜角度。</li>
        </ul>
        <p><strong>获取一个点的位置</strong></p>
        <p>如果知道要飞往的位置的名称，但不确定该位置的坐标，可以使用<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pickPosition" target="_blank">pickPosition</a></span>来查找。以下代码片段将在单击时打印出一个点在<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html" target="_blank">Cartesian3</a></span>中的位置：</p>
        <cesium-example v-model="code03" height="240px" />
        <p><a href="https://sandcastle.cesium.com/index.html#c=dVJdb9swDPwrRF7iAKmc9NH5QIegw4oFWIFk3YuBQZboWJgiCRLtJB363yfbMbBmq590JI93pJmm8D0gCK2cU+YATnODAchCQI2CVIP6ApWSCI57CmBLoArhoG2BEGpfcoEsN7lpuIdG4Qk9rMDgCTYYVH1kL10sGYsObqwhrgz68RR+5wbiR+h9DD1720QZnw1E4ZET/rBey31fkkxy8zZZDGoVN1Lfyu0iDc3ORVuPDRr60hclvTUmeKSGtseVzQLSk3E1fYrDWpOUtekekGBLn/QuWzmnxC+UzzaoLr+6TsuCQIOszQ65nsrcFbZqAKqE5OpRYhlXIJP3HSeTYSPCmmA1Mm0PtzVdq7e4hulHA+8vDtn28fP+52b7tPnaMkbT0TLQReO67/+gjs56gtrrhLGU8Bh/O2FIizqKEROh29AyHUhLqRpQcpWPJB5tPoIusRq/3ikj8ZzB/Ww2W8AwcAa8iAPUhAuoUB0qyuazmTsv4KQkVdl9D3yXgXkHCktkjxl0gPBMd8JqG6/hVCnC8XqZRg/vrNwcVHQlNA8hZspa6516xXz0H5q2XMZL/9ag1/zSllTz9bYPMsaWaYT/sshaXXD/V8c/" target="_blank" class="btn-sandcastle">在Sandcastle中打开</a></p>
        <h2>飞行到一个资源<span>Fly to an asset</span></h2>
        <p>如果已经将一个资产添加到场景中，并且想要聚焦相机到它上面，可以使用 viewer 的<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#flyTo" target="_blank">flyTo</a></span>方法。<span class="code">viewer.flyTo</span>方法接收<span class="code">Entity</span>、<span class="code">EntityCollection</span>、<span class="code">DataSource</span>、<span class="code">Cesium3DTileset</span>等参数。</p>
        <p>例如，如果想聚焦到已使用以下代码片段将其添加到场景中的矩形<span class="code">Entity</span>上：</p>
        <cesium-example v-model="code04" height="220px" />
        <p><a href="https://sandcastle.cesium.com/#c=bZJha9swEIb/yuFPDnhSRwfrGjestDA2Bhtr2L4IjCpfUlFFKqezQzb63ydZjTfa6pvee96795CkhE+kPcMVRjvsvtyANgZjBA5wCAOBDR50jMhReSmfMPE5eNHjRg+OLyd+He7RwwWoqsu2zkxcl9ydzvWOM9Cpaqm88qMmGC3ukZLF4/7Y9uek1aoq9qvgWVuPpKoG/igPwEiUlO8URtsjnR+NhlAz/grk+nVB6kWj/ONiHrfHyGnYmw8n4mRZpBgGvkva6dksoS7U2ftZ8oEm6l0xFpHQsPZbh6lQFhHo2bLFKHTf11PYGTov4fMxIVBvfQob5/A/jpzYUNhd45YQY50DNyVjM+VqSpS8F8Djv+1SopJg4w7rUM9TF8uqqdrIB4er4/iPdveQmsBArhZCMu4eXM4ibwdzjyxMjLlpRlv5v7Xt7Qi2v3jlacC49EFSZTM4d2N/o6pWrUz8C6sLOu2+/TYiOX3I2N3b1dciCiFama6vOzkEd6vpWee/" target="_blank" class="btn-sandcastle">在Sandcastle中打开</a></p>
        <h2>创建一个缓动函数<span>Create an easing function</span></h2>
        <p><span class="code">camera.flyTo</span>函数的一个选项是<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/EasingFunction.html" target="_blank">easingFunction</a></span>。缓动函数控制相机飞行期间时间的插值方式。以下代码示例将缓动函数设置为<span class="code">QUADRATIC_IN_OUT</span>，以从东京天空树飞往西雅图太空针：</p>
        <cesium-example v-model="code05" height="600px" />
        <p><a href="https://sandcastle.cesium.com/#c=jVRtb9MwEP4rVj9lUuf6/WV0E2OAhARMsA6+VEIm8cAiTSbH6TTQ/jvnpN06GGNJFMXP+fzcPXe5tYtoHfyVj+gQNf4Knfgu9Cv8acCK5aQc1idtk1xofFxOpujXskEo+RgBOdg6LMY1vojt6nMb62oDFHvTZXOz92zZLJvZDB1XFTo9e4de9KGuQvMNpVD7zie0bNYQStuttpZusbEcInflQtoSldG75E93Nh53101ZZIoxE9yVvvH4MoZVSGHtO+yqqnjg6NuoLurrRYv6Lgf04fz45cfjxZuTL2/efzk9XyDvBvyib8oU2uaWpXQrHx0efItBk8p3KTQu70IHu2qeuJjgyzW82OdWUSspllpKzQhTU8S5UMIyTKyQWilCBWCaMC4IlpwrAo+VWUiE2hg81GLDMdDmqwrRl48SE2ysYUQLQaURQnA9RfsEC2655IQZo4VkBkCCCeVGaUmZ4NxKa4kZufPVXz7CQJm2XIEz1RrIJM+nMUuF5jQzaiWkkhm0AjZIopTVhFLKR4Kb4V22q8vaJ39wqzkq9rapQtkWYeXbPhUPWBH6Z3E2Oj2lRIwTYajGkL+kBooDIe9DXhYChRwN5czm3IQyRliZ9VIgq6B3Mv2zUE8vF9eKSEmoUUYbotUgGyE6q2nBoDZSMqqFlkJTY4WxVIndKP5TMmgABt0lpKUScrKQsBraggqjGJxJjAA1jB76wioN9TKEMSUtNO0u0c3O9/jHvN6U53ZEvLoH4z9/tJ0Dqj660VVuwWGEjESIEkLG5c3dcBnvyXQy79J17Y+y+XlYXbYxoT7WBcaz5KGxYHh0s699+cMnXHZddp7Pti7zKqxRqA4fmHuorF3XgeWir+uz8NMvJ0fzGey/51a3Lk+Y07WPtbvOW77To7cjiDGez2D5t1dq2/qrA5KMbqw5198" target="_blank" class="btn-sandcastle">在Sandcastle中打开</a></p>
        <h2>观察一个点<span>Look at a point</span></h2>
        <p>除了飞向地球上的一个点之外，还可以将相机锁定在一个点上。想要将相机的移动限制在一个区域或资源时非常有用。</p>
        <p>要将相机锁定在一个点上，请使用相机的<span class="code">lookAtTransform</span>函数。下面的代码片段将相机锁定在日本富士山上：</p>
        <cesium-example v-model="code06" height="240px" />
        <p><a href="https://sandcastle.cesium.com/#c=bVJbb9MwFP4rVp5SKTjXpunIKqZKg6EB01bgJVJ0lpysVh27sp2Ogvjv2OmFCZYn+zvfLScJQ/JegTBkiZoN/ccHAk2DWhMjyV4OijApCGiNRlciDI80eiMFbbGDgZurkb+SGxTkklRe7WR1M/Jqq67BzWvjCHXlva1EJXagyI7hMyorEfh8sv02Yn7lHeRLKQwwgaryAvKrEoQYVMoiFyfB6nCnnZL9d6l4ewT8SeDoIFgPxpa4IB1wjZX4PTkXaFCYscDRawnK2BOIdLS7h9aetZ/QLInTJI6LNE2LeZKlAYloHs/ieZIX+TyLs6jIApLmSU6jLMmT2TSaTuNZ5qJckLEL1p1U/d+s1QnSFEGbz1KZ9dftSl6zH9heK+jRP9QbPcatUG0RpI2dKaBcys2VOdv454zg5T4/oH0J8XTHTLO+B/GEfhSQN5/ArOndTVgEJJlH0cRleIFXarPnuHB7c8871m9tLTIo7lMaGuy3HOyCwseh2aChjdZO6Khl+FJatmxHWHv5ylckDbf/kp10A+cP7CdW3qIMLf8/KZdj8y87VBz2jraOF7cHkFJahvb6utJIyR9B/eP8Bw" target="_blank" class="btn-sandcastle">在Sandcastle中打开</a></p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-camera-mount_fuji.png"></p>
        <h2>围绕一个点旋转<span>Orbit around a point</span></h2>
        <p>一旦将相机锁定在某个点上，就可以创建一个相机轨道以展示资源。可以通过使用相机的<span class="code">lookAtTransform</span>函数与事件监听器来实现：</p>
        <cesium-example v-model="code07" height="340px" />
        <p><a href="https://sandcastle.cesium.com/#c=bVJdb9owFP0rVp6ClDmfBNgoWoXWrRVbK8q2l0iRcQyxcGxk39Cxaf99dgKs2shL7Otzzj332GGIPmoiAc2Z4W3z8IwIpcwYBAodVasRVxIRYxiYQobhCYbvlcQV25BWwG2HX6kdk+gGFV7paCXtcKVll8Sdl+AAZeG9K2QhD0SjA2cvTFuKZC9n2W9dzS+8nj5XEgiXTBdegH4VEiFgWtvK2zNh1e/xRqvmu9KiOhX8QVDI34OumXW9UHSHKGmYJm4wgvaKS+h9UCah83GSnBMNdkVk2qkuSWXXxk9wlsRpEsfjNE3HkyRLAxThPB7FkyQf55MszqJxFqA0T3IcZUmejIbRcBiPMufCNQKbs9ko3fzttTqXDGbEwBelof66X6k7/oNVd9oa9nt7nUYXDja2wnA/DBZK7W7hIuNfegSvY/3E7BBy+8SB1ksit8yPAvTmM4EaP92H4wAlkygaXNJ61GsOCGpuLjn1ramwOWIlV9z+SFV9OFhzC27AOtL+ppUU7IX7HWzQX9g101oBAbbk2xr8CEfR0HW2l+UF3tTAUbCZY7rvPW/2NhPUauFjHAJr9sJSTbhu6Y4BpsY4roNOw9fUacUPiFc3V14SosK+Z3uyaYV45j9Z4c2mocX/RxWqi+3xwLQgRwer49miL2KMp6HdXmeCUmJN9D/KfwA" target="_blank" class="btn-sandcastle">在Sandcastle中打开</a></p>
        <h2>屏幕空间相机控制器<span>Screen space camera controller</span></h2>
        <p><span class="code">ScreenSpaceCameraController</span>将用户输入（如鼠标和触摸）从窗口坐标转换为相机运动。它包含启用和禁用不同类型输入的属性，修改惯性的数量以及最小和最大缩放距离的属性。</p>
        <p>例如，可以使用<span class="code">ScreenSpaceCameraController</span>控制相机是否被允许进入地下：</p>
        <cesium-example v-model="code08" height="150px" />
        <h2>资源<span>Resources</span></h2>
        <p>请在 Sandcastle 中查看相机示例。</p>
        <ul>
            <li><a href="https://sandcastle.cesium.com/?src=Camera%20Tutorial.html" target="_blank">相机教程</a> - 相机运动的代码示例。</li>
            <li><a href="https://sandcastle.cesium.com/?src=Camera.html" target="_blank">相机示例</a> - 飞往位置、查看范围和设置相机参考框架的代码示例。</li>
        </ul>
        <p>同时，请查看参考文档：</p>
        <ul>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/Camera.html" target="_blank">Camera</a></li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/ScreenSpaceCameraController.html" target="_blank">ScreenSpaceCameraController</a></li>
        </ul>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-camera/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
   </div>
</div>
</template>
