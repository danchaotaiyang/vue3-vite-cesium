<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const viewer = `const viewer = new Cesium.Viewer('cesium-container');`;

const entity = `const entity = viewer.entities.add({
    model: {
        uri: '/static/sampleData/CesiumJS/models/CesiumMilkTruck.glb'
    },
    position: Cesium.Cartesian3.fromDegrees(-75.15787310614596, 39.97862668312678)
});

viewer.trackedEntity = entity;

// 时间动画必须开启，否则烟雾没有效果
viewer.clock.shouldAnimate = true;`;

const applyGravity = `const gravityVector = new Cesium.Cartesian3();
const gravity = -(9.8 * 9.8);

function applyGravity(p, dt) {

    // 在地心空间为每个粒子计算一个局部向上向量
    const position = p.position;

    Cesium.Cartesian3.normalize(position, gravityVector);
    Cesium.Cartesian3.multiplyByScalar(
        gravityVector,
        gravity * dt,
        gravityVector
    );

    p.velocity = Cesium.Cartesian3.add(p.velocity, gravityVector, p.velocity);
}`;

const code01 = ref({
    js: `${ viewer }

${ entity }

const particleSystem = viewer.scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',
        imageSize: new Cesium.Cartesian2(15, 15),
        startScale: 1,
        endScale: 4,
        particleLife: 1,
        speed: 5,
        emitter: new Cesium.CircleEmitter(.5),
        emissionRate: 5,
        modelMatrix: entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
        lifetime: 16
    })
);`,
    html
});

// TODO 官方文档有误
const code02 = ref({
    js: `${ viewer }

${ entity }

const particleSystem = viewer.scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',
        color: Cesium.Color.MAGENTA,
        emissionRate: 5,
        emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(.2, .2, .2)),
        imageSize: new Cesium.Cartesian2(25, 25),
        modelMatrix: entity.computeModelMatrix(
            viewer.clock.startTime,
            new Cesium.Matrix4()
        ),
        lifetime: 16
    })
);`,
    html
});

const code03 = ({
    js: `${ viewer }

${ entity }

const particleSystem = viewer.scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',
        color: Cesium.Color.MAGENTA,
        emissionRate: 5,
        emitter: new Cesium.CircleEmitter(5),
        imageSize: new Cesium.Cartesian2(25, 25),
        modelMatrix: entity.computeModelMatrix(
            viewer.clock.startTime,
            new Cesium.Matrix4()
        ),
        lifetime: 16
    })
);`,
    html
});

const code04 = ref({
    js: `${ viewer }

${ entity }

const particleSystem = viewer.scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',
        color: Cesium.Color.MAGENTA,
        emissionRate: 5,
        emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30)),
        imageSize: new Cesium.Cartesian2(25, 25),
        modelMatrix: entity.computeModelMatrix(
            viewer.clock.startTime,
            new Cesium.Matrix4()
        ),
        lifetime: 16
    })
);`,
    html
});

const code05 = ref({
    js: `${ viewer }

${ entity }

const particleSystem = viewer.scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',
        color: Cesium.Color.MAGENTA,
        emissionRate: 5,
        emitter: new Cesium.SphereEmitter(5),
        imageSize: new Cesium.Cartesian2(25, 25),
        modelMatrix: entity.computeModelMatrix(
            viewer.clock.startTime,
            new Cesium.Matrix4()
        ),
        lifetime: 16
    })
);`,
    html
});

const code06 = ref({
    js: `${ viewer }

${ entity }

const particleSystem = viewer.scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',
        color: Cesium.Color.MAGENTA,
        emissionRate: 5,
        emitter: new Cesium.SphereEmitter(5),
        imageSize: new Cesium.Cartesian2(25, 25),
        modelMatrix: entity.computeModelMatrix(
            viewer.clock.startTime,
            new Cesium.Matrix4()
        ),
        lifetime: 16,

        bursts: [
            new Cesium.ParticleBurst({ time: 5, minimum: 300, maximum: 500 }),
            new Cesium.ParticleBurst({ time: 10, minimum: 50, maximum: 100 }),
            new Cesium.ParticleBurst({ time: 15, minimum: 200, maximum: 300 })
        ]
    })
);`,
    html
});

const code07 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    lifetime: 16,
    loop: false
})`
});

const code08 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    minimumParticleLife: 5,
    maximumParticleLife: 10
})`
});

const code09 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(.7),
    endColor: Cesium.Color.WHITE.withAlpha(0)
})`
});

const code10 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    minimumImageSize: new Cesium.Cartesian2(30, 30),
    maximumImageSize: new Cesium.Cartesian2(60, 60)
});`
});

const code11 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    startScale: 1,
    endScale: 4
});`
});

const code12 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    minimumSpeed: 5,
    maximumSpeed: 10
});`
});

const code13 = ref({
    js: `const gravityVector = new Cesium.Cartesian3();
const gravity = -(9.8 * 9.8);

function applyGravity(p, dt) {

    // 在地心空间为每个粒子计算一个局部向上向量
    const position = p.position;

    Cesium.Cartesian3.normalize(position, gravityVector);
    Cesium.Cartesian3.multiplyByScalar(
        gravityVector,
        gravity * dt,
        gravityVector
    );

    p.velocity = Cesium.Cartesian3.add(p.velocity, gravityVector, p.velocity);
}`
});

const code14 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    updateCallback: applyGravity
});`
});

const code15 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');
const entity = viewer.entities.add({
    model: {
        uri: '/static/sampleData/CesiumJS/models/CesiumMilkTruck.glb'
    },
    position: Cesium.Cartesian3.fromDegrees(-75.15787310614596, 39.97862668312678)
});

viewer.trackedEntity = entity;`,
    html
});

const code16 = ref({
    js: `new Cesium.ParticleSystem({
    // ...
    modelMatrix: entity.computeModelMatrix(time, new Cesium.Matrix4())
});`
});

const code17 = ref({
    js: `const translation = new Cesium.Cartesian3();
const rotation = new Cesium.Quaternion();
let hpr = new Cesium.HeadingPitchRoll();
const trs = new Cesium.TranslationRotationScale();

function computeEmitterModelMatrix() {
    hpr = Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0, hpr);
    trs.translation = Cesium.Cartesian3.fromElements(-4, 0, 1.4, translation);
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

    return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
}`
});

const code18 = ref({
    js: `const particleSystem = viewer.scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',

        startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(.7),
        endColor: Cesium.Color.WHITE.withAlpha(0),

        startScale: 1,
        endScale: 4,

        particleLife: 1,

        minimumSpeed: 1,
        maximumSpeed: 4,

        imageSize: new Cesium.Cartesian2(25, 25),
        emissionRate: 5,
        lifetime: 16,
        modelMatrix: entity.computeModelMatrix(
            viewer.clock.startTime,
            new Cesium.Matrix4()
        ),
        emitterModelMatrix: computeEmitterModelMatrix()
    })
);`
});

const code19 = ref({
    js  : `const viewer = new Cesium.Viewer('cesium-container');

// 设置随机数种子以保证结果的一致性。
Cesium.Math.setRandomNumberSeed(3);

// 设置我们模拟的时间范围。
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const stop = Cesium.JulianDate.addSeconds(start, 120, new Cesium.JulianDate());

// 确保视图处于所期望的时间点。
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // 末端循环
viewer.clock.multiplier = 1;
viewer.clock.shouldAnimate = true;

// 将时间轴设置为模拟范围。
viewer.timeline.zoomTo(start, stop);

const viewModel = {
    emissionRate: 5,
    gravity: 0,
    minimumParticleLife: 1.2,
    maximumParticleLife: 1.2,
    minimumSpeed: 1,
    maximumSpeed: 4,
    startScale: 1,
    endScale: 5,
    particleSize: 25,
};

const entityPosition = new Cesium.Cartesian3();
const entityOrientation = new Cesium.Quaternion();
const rotationMatrix = new Cesium.Matrix3();
const modelMatrix = new Cesium.Matrix4();

function computeModelMatrix(entity, time) {
    return entity.computeModelMatrix(time, new Cesium.Matrix4());
}

const emitterModelMatrix = new Cesium.Matrix4();
const translation = new Cesium.Cartesian3();
const rotation = new Cesium.Quaternion();
let hpr = new Cesium.HeadingPitchRoll();
const trs = new Cesium.TranslationRotationScale();

function computeEmitterModelMatrix() {
    hpr = Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0, hpr);
    trs.translation = Cesium.Cartesian3.fromElements( -4, 0, 1.4, translation );
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

    return Cesium.Matrix4.fromTranslationRotationScale( trs, emitterModelMatrix );
}

const pos1 = Cesium.Cartesian3.fromDegrees(-75.15787310614596, 39.97862668312678);
const pos2 = Cesium.Cartesian3.fromDegrees(-75.1633691390455, 39.95355089912078);
const position = new Cesium.SampledPositionProperty();

position.addSample(start, pos1);
position.addSample(stop, pos2);

const entity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({ start, stop })
    ]),
    model: {
        uri: '/static/sampleData/CesiumJS/models/CesiumMilkTruck.glb',
        minimumPixelSize: 64
    },
    viewFrom: new Cesium.Cartesian3(-100, 0, 100),
    position: position,
    orientation: new Cesium.VelocityOrientationProperty(position)
});
viewer.trackedEntity = entity;

const scene = viewer.scene;
const particleSystem = scene.primitives.add(
    new Cesium.ParticleSystem({
        image: '/static/sampleData/CesiumJS/smoke.png',

        startColor: Cesium.Color.LIGHTSEAGREEN.withAlpha(0.7),
        endColor: Cesium.Color.WHITE.withAlpha(0),

        startScale: viewModel.startScale,
        endScale: viewModel.endScale,

        minimumParticleLife: viewModel.minimumParticleLife,
        maximumParticleLife: viewModel.maximumParticleLife,

        minimumSpeed: viewModel.minimumSpeed,
        maximumSpeed: viewModel.maximumSpeed,

        imageSize: new Cesium.Cartesian2(
            viewModel.particleSize,
            viewModel.particleSize
        ),

        emissionRate: viewModel.emissionRate,

        bursts: [
            // 这些迸发有时候会同步，这将创建更加多彩的效果。
            new Cesium.ParticleBurst({
                time: 5,
                minimum: 10,
                maximum: 100,
            }),
            new Cesium.ParticleBurst({
                time: 10,
                minimum: 50,
                maximum: 100,
            }),
            new Cesium.ParticleBurst({
                time: 15,
                minimum: 200,
                maximum: 300,
            }),
        ],

        lifetime: 16,

        emitter: new Cesium.CircleEmitter(2),

        emitterModelMatrix: computeEmitterModelMatrix(),

        updateCallback: applyGravity,
    })
);

const gravityScratch = new Cesium.Cartesian3();

function applyGravity(p, dt) {
    // 在地心空间为每个粒子计算一个局部向上向量
    const position = p.position;

    Cesium.Cartesian3.normalize(position, gravityScratch);
    Cesium.Cartesian3.multiplyByScalar(
        gravityScratch,
        viewModel.gravity * dt,
        gravityScratch
    );

    p.velocity = Cesium.Cartesian3.add(
        p.velocity,
        gravityScratch,
        p.velocity
    );
}

viewer.scene.preUpdate.addEventListener(function (scene, time) {
    particleSystem.modelMatrix = computeModelMatrix(entity, time);

    // 解释发射器模型矩阵的任何变化
    particleSystem.emitterModelMatrix = computeEmitterModelMatrix();

    // 如果启用了旋转功能就对发射器进行旋转
    if (viewModel.spin) {
        viewModel.heading += 1;
        viewModel.pitch += 1;
        viewModel.roll += 1;
    }
});`,
    html
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>粒子系统介绍<span>Introduction to Particle Systems</span></h1>
        <p><img alt="" src="/static/img/tutorial/cesium-js/2017-08-01-particle.gif"></p>
        <h2>什么是粒子系统？<span>What is a particle system?</span></h2>
        <p>粒子系统是模拟复杂物理效应的一种图形技术。粒子系统是由许多小图像组成的集合，当它们一起观察时形成一个更复杂的“模糊”对象。比如火、烟雾、天气或<a href="https://sandcastle.cesium.com/?src=Particle%20System%20Fireworks.html&label=Showcases" target="_blank">烟花</a>等效果。通过指定每个粒子的行为属性，例如初始位置、速度和生命周期，来控制这些复杂效果。</p>
        <p>粒子系统效果在电影和视频游戏中十分常见。例如，为了表示一架飞机受损，技术美术师可以利用粒子系统来展示飞机引擎的爆炸效果，并渲染另一个粒子系统来表示飞机坠毁时的烟雾轨迹。</p>
        <h2>粒子系统基础知识<span>Particle system basics</span></h2>
        <p>请看一个基本粒子系统的代码示例：</p>
        <cesium-example v-model="code01" height="520px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-particle-systems-particles1.gif"></p>
        <p>以上代码创建了一个<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/ParticleSystem.html" target="_blank">ParticleSystem</a></span>（粒子系统）</p>
        <p>通过设置参数来控制单个<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Particle.html" target="_blank">Particle</a></span>对象在整个时间序列上的外观（appearance）和行为（behavior）。粒子是由<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/ParticleEmitter.html" target="_blank">ParticleEmitter</a></span>（粒子发射器）产生的，它们具有位置和类型属性，并且存在一段预定的时间后会消亡。</p>
        <p>其中一些属性是动态的。请注意，与可用的单一颜色属性<span class="code">scale</span>不同，这里使用的是<span class="code">startScale</span>和<span class="code">endScale</span>。它们允许指定粒子在其生命周期内从起始比例过渡到最终比例。除了粒子大小的动态变化，Cesium还引入了<span class="code">startColor</span>和<span class="code">endColor</span>来控制粒子颜色的过渡效果，它们的工作方式类似于<span class="code">startScale</span>和<span class="code">endScale</span>。</p>
        <p>影响视觉输出的其他方式包括最大和最小属性。对于一个具有最大和最小输入范围的变量，如粒子的大小、颜色等，其实际值将在给定的最大值和最小值之间进行随机分配，并且在粒子的整个生命周期内保持不变。例如：利用<span class="code">minimumSpeed</span>和<span class="code">maximumSpeed</span>属性来定义粒子的速度范围，在这个范围内为每个粒子随机分配一个速度值。类似地，可以利用其他属性如<span class="code">imageSize</span>、<span class="code">speed</span>、<span class="code">life</span>和<span class="code">particleLife</span>等来实现类似的效果。通过设定相应的最小值和最大值，可以控制粒子的大小、生命周期和寿命范围。</p>
        <h2>发射器<span>Emitters</span></h2>
        <p>当一个粒子诞生时，它的初始位置和速度向量是由<span class="code">ParticleEmitter</span>（粒子发射器）控制的。发射器将按照<span class="code">emissionRate</span>参数指定单位时间内生成的粒子数量，并且每个粒子的速度会根据发射器的类型进行初始化并赋予一个随机值。</p>
        <p>Cesium中有各种现成的粒子发射器（ParticleEmitter）可供使用。</p>
        <h2>盒子发射器<span>BoxEmitter</span></h2>
        <p><span class="code">BoxEmitter</span>会在一个盒子内随机选择位置进行粒子初始化，并将它们朝向盒子的六个面之一发射出去。它接受一个<span class="code">Cartesian3</span>参数，用于指定盒子的宽度、高度和深度尺寸。</p>
        <cesium-example v-model="code02" height="520px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-particle-systems-box-emitter.gif"></p>
        <h2>圆形发射器<span>CircleEmitter</span></h2>
        <p><span class="code">CircleEmitter</span>沿发射器的上轴方向在圆内随机采样的位置初始化粒子。它接受一个指定圆半径的浮动参数。</p>
        <cesium-example v-model="code03" height="520px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-particle-systems-circle-emitter.gif"></p>
        <p>如果没有指定任何发射器（emitter），Cesium会自动为该粒子系统创建一个<span class="code">CircleEmitter</span>（圆发射器）。</p>
        <h2>锥形发射器<span>ConeEmitter</span></h2>
        <p><span class="code">ConeEmitter</span>会在锥形区域的顶端初始化粒子，并将它们朝向随机角度发射出锥形区域。它接受一个浮点型参数，用于指定锥形区域的角度。该锥形区域朝向发射器的朝上轴。</p>
        <cesium-example v-model="code04" height="520px" />
        <h2>球体发射器<span>SphereEmitter</span></h2>
        <p><span class="code">SphereEmitter</span>会在球体内部的随机位置初始化粒子，并将它们从球体中心向外发射。它接受一个浮点型参数，用于指定球体的半径。</p>
        <cesium-example v-model="code05" height="520px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-particle-systems-sphere-emitter.gif"></p>
        <h2>配置粒子系统<span>Configuring particle systems</span></h2>
        <h3>粒子发射速率<span>Particle emission rate</span></h3>
        <p><span class="code">emissionRate</span>指定每秒发射的粒子数量，从而改变粒子系统中粒子的密度。</p>
        <p>指定一个迸发对象数组，在指定的时间发射一连串的粒子迸发（如上面的动画演示所示）。这可以为粒子系统增添多样性或爆炸效果。</p>
        <p>将此属性添加到<span class="code">particleSystem</span>（粒子系统）中。</p>
        <cesium-example v-model="code06" height="600px" />
        <p>这些迸发将在给定的时间内以 min 和 max 之间的粒子数量进行发射。</p>
        <h3>粒子的生命周期和系统的生命周期<span>Life of the particle and life of the system</span></h3>
        <p>默认情况下，粒子系统会一直运行。若要使粒子系统在固定的时间内运行，请使用<span class="code">lifetime</span>参数指定以秒为单位的持续时间，并将<span class="code">loop</span>设置为false。</p>
        <monaco-editor v-model="code07" height="150px" />
        <p>将<span class="code">particleLife</span>设置为 5 将会使系统中的每个粒子的<span class="code">particleLife</span>都设置为该值。如果想要为每个粒子的寿命输出进行随机化，可以使用变量<span class="code">minimumParticleLife</span>和<span class="code">maximumParticleLife</span>。</p>
        <monaco-editor v-model="code08" height="150px" />
        <h2>设置粒子样式<span>Styling particles</span></h2>
        <h3>颜色<span>Color</span></h3>
        <p>粒子通过使用指定<span class="code">image</span>（图像）的纹理和<span class="code">color</span>（颜色）进行样式设置，并且可以在粒子的生命周期内进行变化，以创建动态效果。</p>
        <p>以下代码使烟雾粒子从绿色逐渐淡出至白色消失。</p>
        <monaco-editor v-model="code09" height="150px" />
        <h3>尺寸<span>Size</span></h3>
        <p>粒子的尺寸由<span class="code">imageSize</span>控制。要随机化大小，可以使用<span class="code">minimumImageSize.x</span>和<span class="code">maximumImageSize.x</span>控制宽度（以像素为单位）。</p>
        <p>这将创建边长在30到60像素之间的正方形粒子：</p>
        <monaco-editor v-model="code10" height="150px" />
        <p>可以使用<span class="code">startScale</span>和<span class="code">endScale</span>属性来调节粒子的大小，使其在生命周期内随着时间增长或缩小。</p>
        <monaco-editor v-model="code11" height="150px" />
        <h3>速度<span>Speed</span></h3>
        <p>速度可以由<span class="code">speed</span>单独控制，也可以同时由<span class="code">minimumSpeed</span>和<span class="code">maximumSpeed</span>来控制。</p>
        <monaco-editor v-model="code12" height="150px" />
        <h2>更新回调<span>UpdateCallback</span></h2>
        <p>粒子系统可以通过应用更新函数进行进一步定制。这是对每一个粒子进行手动更新的操作，可以用于实现诸如重力、风力或色彩变化等效果。</p>
        <p>粒子系统具有一个在模拟过程中修改粒子属性的<span class="code">updateCallback</span>函数。比如位置、速度、颜色等属性。这样可以基于粒子的当前状态和模拟的时间进程，动态地改变粒子的特性，以实现各种各样的效果。这个函数接收两个参数，一个是粒子（particle），另一个是模拟时间步长（simulation time step）。大多数基于物理的效果都会通过修改粒子的速度向量以改变其方向或者速度。以下是一个使粒子对重力做出反应的例子：</p>
        <monaco-editor v-model="code13" height="350px" />
        <p>此函数计算重力向量，并利用重力加速度来改变粒子的速度。</p>
        <p>将这个力设定为粒子系统的<span class="code">updateFunction</span>（更新函数）：</p>
        <monaco-editor v-model="code14" height="150px" />
        <h2>定位<span>Positioning</span></h2>
        <p>粒子系统的位置是通过两个<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Matrix4.html?classFilter=matrix" target="_blank">Matrix4</a></span>变换矩阵来确定的：</p>
        <ul>
            <li><span class="code">modelMatrix</span>: 将粒子系统从模型坐标系变换到世界坐标系。</li>
            <li><span class="code">emitterModelMatrix</span>: 将粒子系统的发射器转换到粒子系统的局部坐标系内。</li>
        </ul>
        <p>可以仅使用这两个转换矩阵中的一个，并将另一个保留为单位矩阵保持不变，但为了方便起见，我们提供了两者。为了练习创建矩阵，让我们将粒子发射器相对于另一个实体进行定位。</p>
        <p>创建一个实体来突出我们的粒子系统。打开<a href="https://sandcastle.cesium.com/?src=Hello%20World.html" target="_blank">Hello World</a> Sandcastle 示例，添加以下代码，将一辆牛奶卡车模型添加到查看器中：</p>
        <cesium-example v-model="code15" height="220px" />
        <p>我们想要在卡车后部添加一个烟雾效果。创建一个模型矩阵，以使粒子系统的位置和方向与牛奶卡车实体相同。</p>
        <monaco-editor v-model="code16" height="150px" />
        <p>这个粒子系统位置在卡车的中心。为了将其定位到卡车的后部，我们可以创建一个带有平移的矩阵。</p>
        <monaco-editor v-model="code17" height="260px" />
        <p>现在添加粒子系统。</p>
        <monaco-editor v-model="code18" height="480px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-particle-systems-particles-final.gif"></p>
        <p>还请注意，我们可以随着时间的推移更新模型或发射器矩阵。例如，如果我们想在卡车上设置发射器位置的动画，我们可以修改<span class="code">emitterModelMatrix</span>，同时保持<span class="code">modelMatrix</span>不变。因为<span class="code">modelMatrix</span>用于定义整个粒子系统在世界坐标中的位置、旋转和缩放。对<span class="code">modelMatrix</span>进行修改，将导致整个粒子系统的位置、旋转或缩放发生变化。<span class="code">emitterModelMatrix</span>用于定义发射区域（也就是粒子从哪里开始生成）相对于粒子系统（由 modelMatrix 定义）的位置、旋转和缩放。对<span class="code">emitterModelMatrix</span>的修改，将导致粒子的发射区域在粒子系统内的位置、旋转或缩放发生变化。这意味着，尽管整个粒子系统（包括所有的粒子和发射区域）在世界坐标中的位置保持不变，但粒子发射的初始位置（即发射区域）却在不断地移动。这种动态更新<span class="code">modelMatrix</span>或<span class="code">emitterModelMatrix</span>的能力，让我们能够在 Cesium 中创建许多动态和复杂的粒子动画效果。</p>
        <p>请在此处查看完整的代码示例：<a href="https://sandcastle.cesium.com/?src=Particle%20System.html&label=Showcases" target="_blank">Particle System demo</a>。</p>
        <cesium-example v-model="code19" height="800px" />
        <h2>了解更多信息<span>Learn more</span></h2>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-particle-systems-fireworks.gif"></p>
        <p>有关更多示例代码，请参阅：</p>
        <ul>
            <li><a href="https://sandcastle.cesium.com/?src=Particle%20System%20Fireworks.html" target="_blank">Particle System Fireworks Demo</a></li>
            <li><a href="https://sandcastle.cesium.com/?src=Particle%20System%20Weather.html" target="_blank">Particle Systems Weather</a></li>
            <li><a href="https://sandcastle.cesium.com/?src=Particle%20System%20Tails.html" target="_blank">Particle Systems Tails</a></li>
        </ul>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-particle-systems/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
   </div>
</div>
</template>
