<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const code01 = ref({
    js: `const viewer = new Cesium.Viewer('cesium-container');`
});

const code03 = ref({
    js: `viewer.zoomTo(viewer.entities);`
});

const code04 = ref({
    js: `${ code01.value.js }

const wyoming = viewer.entities.add({
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
            -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
            -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
            -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
        ]),
        height: 0,
        outline: true,
        outlineColor: Cesium.Color.BLACK,
        material: Cesium.Color.RED.withAlpha(.5)
    }
});

viewer.zoomTo(wyoming);`,
    html
});

const codeBox = ref({
    js: `${ code01.value.js }

const blueBox = viewer.entities.add({
    name: '蓝色盒子',
    position: Cesium.Cartesian3.fromDegrees(-114, 40, 300000),
    box: {
        dimensions: new Cesium.Cartesian3(400000, 300000, 500000),
        material: Cesium.Color.BLUE
    }
});

const redBox = viewer.entities.add({
    name: '红盒子',
    position: Cesium.Cartesian3.fromDegrees(-107, 40, 300000),
    box: {
        dimensions: new Cesium.Cartesian3(400000, 300000, 500000),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
        material: Cesium.Color.RED.withAlpha(.5)
    }
});

const yellowBox = viewer.entities.add({
    name: '黄盒子',
    position: Cesium.Cartesian3.fromDegrees(-100, 40, 300000),
    box: {
        dimensions: new Cesium.Cartesian3(400000, 300000, 500000),
        fill: false,
        outline: true,
        outlineColor: Cesium.Color.YELLOW
    }
});

${ code03.value.js }`,
    html
});

const codeEllipse = ref({
    js: `${ code01.value.js }

const greenCircle = viewer.entities.add({
    name: '在特定高度位置绘制一个带有轮廓的绿色的圆',
    position: Cesium.Cartesian3.fromDegrees(-111, 40, 150000),
    ellipse: {
        semiMinorAxis: 300000,
        semiMajorAxis: 300000,
        height: 200000,
        outline: true,
        material: Cesium.Color.GREEN
    }
});

const redEllipse = viewer.entities.add({
    name: '在地表上绘制一个红色椭圆',
    position: Cesium.Cartesian3.fromDegrees(-103, 40),
    ellipse: {
        semiMinorAxis: 250000,
        semiMajorAxis: 400000,
        material: Cesium.Color.RED.withAlpha(.5)
    }
});

const blueEllipse = viewer.entities.add({
    name: '绘制一个蓝色的半透明、旋转和拉伸的椭圆，并添加轮廓线',
    position: Cesium.Cartesian3.fromDegrees(-95, 40, 100000),
    ellipse: {
        semiMinorAxis: 150000,
        semiMajorAxis: 300000,
        extrudedHeight: 200000,
        rotation: Cesium.Math.toRadians(45),
        outline: true,
        material: Cesium.Color.BLUE.withAlpha(.5)
    }
});

${ code03.value.js }`,
    html
});

const codeCorridor = ref({
    js: `${ code01.value.js }

const redCorridor = viewer.entities.add({
    name: '红色圆角走廊',
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -100, 40,
            -105, 40,
            -105, 35
        ]),
        width: 200000,
        material: Cesium.Color.RED.withAlpha(.5)
    }
});

const greenCorridor = viewer.entities.add({
    name: '带斜接角和轮廓的高度绿色走廊',
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -90, 40,
            -95, 40,
            -95, 35
        ]),
        width: 200000,
        height: 100000,
        outline: true,
        cornerType: Cesium.CornerType.MITERED,
        material: Cesium.Color.GREEN
    }
});

const blueCorridor = viewer.entities.add({
    name: '带斜角和轮廓的蓝色挤压走廊',
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -80, 40,
            -85, 40,
            -85, 35
        ]),
        width: 200000,
        height: 200000,
        extrudedHeight: 100000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        cornerType: Cesium.CornerType.BEVELED,
        material: Cesium.Color.BLUE.withAlpha(.5)
    }
});

${ code03.value.js }`,
    html
});

const codeCylinder = ref({
    js: `${ code01.value.js }

const greenCylinder = viewer.entities.add({
    name: '黑色轮廓的绿色圆柱体',
    position: Cesium.Cartesian3.fromDegrees(-100, 40, 200000),
    cylinder: {
        length: 400000,
        topRadius: 200000,
        bottomRadius: 200000,
        outline: true,
        outlineColor: Cesium.Color.DARK_GREEN,
        material: Cesium.Color.GREEN.withAlpha(.5)
    }
});

const redCone = viewer.entities.add({
    name: '红色圆锥体',
    position: Cesium.Cartesian3.fromDegrees(-105, 40, 200000),
    cylinder: {
        length: 400000,
        topRadius: 0,
        bottomRadius: 200000,
        material: Cesium.Color.RED
    }
});

${ code03.value.js }`,
    html
});

const codePolygons = ref({
    js: `${ code01.value.js }

const redPolygon = viewer.entities.add({
    name: '地面上的红色多边形',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -115, 37,
            -115, 32,
            -107, 33,
            -102, 31,
            -102, 35
        ]),
        material: Cesium.Color.RED
    }
});

const greenPolygon = viewer.entities.add({
    name: '绿色挤出多边形',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -108, 42,
            -100, 42,
            -104, 40
        ]),
        extrudedHeight: 500000,
        closeTop: false,
        closeBottom: false,
        material: Cesium.Color.GREEN
    }
});

const texturedPolygon = viewer.entities.add({
    name: '带有每个位置高度和自定义纹理坐标的拉伸纹理多边形',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
            -118.4, 40.4, 50000,
            -118.4, 37, 30000,
            -114.2, 38, 35000,
            -108, 37, 30000,
            -108, 40.4, 50000
        ]),
        textureCoordinates: {
            positions: [
                new Cesium.Cartesian2(0, 1),
                new Cesium.Cartesian2(0, 0),
                new Cesium.Cartesian2(.5, 0),
                new Cesium.Cartesian2(1, 0),
                new Cesium.Cartesian2(1, 1)
            ]
        },
        extrudedHeight: 0,
        perPositionHeight: true,
        material: '/static/img/tutorial/cesium-js/Cesium_Logo_Color.jpg'
    }
});

const texturedPolygonWithHoles = viewer.entities.add({
    name: '具有每个位置高度、孔洞和自定义纹理坐标的纹理多边形',
    polygon: {
        hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                -130, 40, 50000,
                -130, 36, 30000,
                -125, 37, 35000,
                -120, 36, 30000,
                -120, 40, 50000
            ]),
            holes: [
                {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                        -128, 39.2, 46000,
                        -128, 38.6, 42000,
                        -127, 38.6, 42000,
                        -127, 39.2, 46000
                    ])
                }
            ]
        },
        textureCoordinates: {
            positions: [
                new Cesium.Cartesian2(0, 1),
                new Cesium.Cartesian2(0, 0),
                new Cesium.Cartesian2(.5, 0),
                new Cesium.Cartesian2(1, 0),
                new Cesium.Cartesian2(1, 1)
            ],
            holes: [
                {
                    positions: [
                        new Cesium.Cartesian2(.2, .8),
                        new Cesium.Cartesian2(.2, .6),
                        new Cesium.Cartesian2(.4, .6),
                        new Cesium.Cartesian2(.4, .8)
                    ]
                }
            ]
        },
        perPositionHeight: true,
        material: '/static/img/tutorial/cesium-js/Cesium_Logo_Color.jpg'
    }
});

const orangePolygon = viewer.entities.add({
    name: '带有每个位置高度和轮廓的橙色多边形',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
            -108, 25, 100000,
            -100, 25, 100000,
            -100, 30, 100000,
            -108, 30, 300000
        ]),
        extrudedHeight: 0,
        perPositionHeight: true,
        outline: true,
        outlineColor: Cesium.Color.BLACK,
        material: Cesium.Color.ORANGE.withAlpha(.5)
    }
});

const bluePolygon = viewer.entities.add({
    name: '蓝色多孔多边形',
    polygon: {
        hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -99, 30,
                -85, 30,
                -85, 40,
                -99, 40,
            ]),
            holes: [
                {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        -97, 31,
                        -97, 39,
                        -87, 39,
                        -87, 31,
                    ]),
                    holes: [
                        {
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                -95, 33,
                                -89, 33,
                                -89, 37,
                                -95, 37,
                            ]),
                            holes: [
                                {
                                    positions: Cesium.Cartesian3.fromDegreesArray([
                                        -93, 34,
                                        -91, 34,
                                        -91, 36,
                                        -93, 36,
                                    ])
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        height: 0,
        outline: true,
        material: Cesium.Color.BLUE.withAlpha(.5)
    }
});

const cyanPolygon = viewer.entities.add({
    name: '带有每个位置高度和轮廓的垂直青色多边形',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
            -90, 41, 0,
            -85, 41, 500000,
            -80, 41, 0,
        ]),
        perPositionHeight: true,
        outline: true,
        material: Cesium.Color.CYAN.withAlpha(.5)
    }
});

const purplePolygonUsingRhumbLines = viewer.entities.add({
    name: '使用等角线创建带有轮廓的紫色多边形',
    polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -120, 45,
            -80, 45,
            -80, 55,
            -120, 55
        ]),
        extrudedHeight: 50000,
        outline: true,
        outlineColor: Cesium.Color.MAGENTA,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.PURPLE
    }
});

${ code03.value.js }`,
    html
});

const codePolyline = ref({
    js: `${ code01.value.js }

const redLine = viewer.entities.add({
    name: '在地形上的红线',
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -75, 35,
            -125, 35
        ]),
        width: 5,
        clampToGround: true,
        material: Cesium.Color.RED
    }
});

const greenRhumbLine = viewer.entities.add({
    name: '在地形上绘制绿色等角线',
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -75, 35,
            -125, 35
        ]),
        width: 5,
        arcType: Cesium.ArcType.RHUMB,
        material: Cesium.Color.GREEN
    }
});

const glowingLing = viewer.entities.add({
    name: '地表绘制蓝色发光线',
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -75, 37,
            -125, 37
        ]),
        width: 10,
        material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: .2,
            taperPower: .5,
            color: Cesium.Color.CORNFLOWERBLUE
        })
    }
});

const orangeOutlined = viewer.entities.add({
    name: '指定高度上遵循地表绘制黑色轮廓橙色线',
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75, 39, 250000,
            -125, 39, 250000
        ]),
        width: 5,
        material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.ORANGE,
            outlineWidth: 2
        })
    }
});

const purpleArrow = viewer.entities.add({
    name: '指定高度上绘制紫色箭头直线',
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75, 43, 500000,
            -125, 43, 500000
        ]),
        width: 10,
        arcType: Cesium.ArcType.NONE,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE)
    }
});

const dashedLine = viewer.entities.add({
    name: '蓝色虚线',
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -75, 45, 500000,
            -125, 45, 500000
        ]),
        width: 4,
        material: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.CYAN
        })
    }
});

${ code03.value.js }`,
    html
});

const codePolylineVolume = ref({
    js: `${ code01.value.js }

const computedCircle = (radius) => {
    const positions = [];

    for (let i = 0; i < 360; i++) {
        const radian = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(radius * Math.cos(radian), radius * Math.sin(radian)));
    }

    return positions;
};

const redTube = viewer.entities.add({
    name: '红色圆角管',
    polylineVolume: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -85, 32,
            -85, 36,
            -89, 36
        ]),
        shape: computedCircle(60000),
        material: Cesium.Color.RED
    }
});

const greenTube = viewer.entities.add({
    name: '绿色具有斜角边缘和轮廓的方块',
    polylineVolume: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -90, 32, 0,
            -90, 36, 100000,
            -94, 36, 0
        ]),
        shape: [
            new Cesium.Cartesian2(-50000, -50000),
            new Cesium.Cartesian2(50000, -50000),
            new Cesium.Cartesian2(50000, 50000),
            new Cesium.Cartesian2(-50000, 50000)
        ],
        outline: true,
        cornerType: Cesium.CornerType.BEVELED,
        material: Cesium.Color.GREEN.withAlpha(.5)
    }
});

const computedStar = (arms, outer, inner) => {;
    const angle = Math.PI / arms;
    const length = arms * 2;
    const positions = [];

    for (let i = 0; i < length; i++) {
        const r = i  % 2 === 0 ? outer : inner;
        positions.push(new Cesium.Cartesian2(Math.cos(i * angle) * r, Math.sin(i * angle) * r))
    }

    return positions;
};

const blueTube = viewer.entities.add({
    name: '蓝色具有斜角连接线和轮廓的星型',
    polylineVolume: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -95, 32, 0,
            -95, 36, 100000,
            -99, 36, 200000
        ]),
        shape: computedStar(5, 70000, 50000),
        outline: true,
        material: Cesium.Color.BLUE.withAlpha(.5)
    }
});

${ code03.value.js }`,
    html
});

const codeRectangle = ref({
    js: `${ code01.value.js }

const redRectangle = viewer.entities.add({
    name: '红色半透明矩形',
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-110, 20, -80, 25),
        material: Cesium.Color.RED.withAlpha(.5)
    }
});

const greenRectangle = viewer.entities.add({
    name: '指定高度绘制绿色轮廓半透明、旋转和挤压的矩形',
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-110, 30, -100, 40),
        height: 800000,
        extrudedHeight: 1200000,
        rotation: Cesium.Math.toRadians(45),
        outline: true,
        material: Cesium.Color.GREEN.withAlpha(.5)
    }
});

let rotation = Cesium.Math.toRadians(30);

const getRotation = () => {
    rotation += 05;
    return rotation;
};

const rotationRectangle = viewer.entities.add({
    name: '旋转文理矩形',
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-92, 30, -76, 40),
        rotation: new Cesium.CallbackProperty(getRotation, false),
        stRotation: new Cesium.CallbackProperty(getRotation, false),
        material: '/static/img/tutorial/cesium-js/Cesium_Logo_Color.jpg',
        classificationType: Cesium.ClassificationType.TERRAIN
    }
});

${ code03.value.js }`,
    html
});

const codeEllipsoid = ref({
    js: `${ code01.value.js }

const blueEllipsoid = viewer.entities.add({
    name: '蓝色椭球',
    position: Cesium.Cartesian3.fromDegrees(-114, 40, 300000),
    ellipsoid: {
        radii: new Cesium.Cartesian3(200000, 200000, 300000),
        material: Cesium.Color.BLUE
    }
});

const redSphere = viewer.entities.add({
    name: '黑色轮廓红色球体',
    position: Cesium.Cartesian3.fromDegrees(-107, 40, 300000),
    ellipsoid: {
        radii: new Cesium.Cartesian3(300000, 300000, 300000),
        material: Cesium.Color.RED.withAlpha(.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK
    }
});

const outlineOnly = viewer.entities.add({
    name: '黄色椭球轮廓',
    position: Cesium.Cartesian3.fromDegrees(-100, 40, 300000),
    ellipsoid: {
        radii: new Cesium.Cartesian3(200000, 200000, 300000),
        fill: false,
        outline: true,
        outlineColor: Cesium.Color.YELLOW,
        slicePartitions: 24,
        stackPartitions: 36
    }
});

${ code03.value.js }`,
    html
});

const codeWall = ref({
    js: `${ code01.value.js }

const redWall = viewer.entities.add({
    name: '高处红墙',
    wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -115, 44, 200000,
            -90, 44, 200000,
        ]),
        minimumHeights: [ 100000, 100000 ],
        material: Cesium.Color.RED
    }
});

const greenWall = viewer.entities.add({
    name: '有轮廓的绿色墙',
    wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -107, 43, 100000,
            -97, 43, 100000,
            -97, 40, 100000,
            -107, 40, 100000,
            -107, 43, 100000,
        ]),
        material: Cesium.Color.GREEN,
        outline: true
    }
});

const blueWall = viewer.entities.add({
    name: '锯齿高处有轮廓的蓝色墙',
    wall: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -115, 50,
            -112.5, 50,
            -110, 50,
            -107.5, 50,
            -105, 50,
            -102.5, 50,
            -100, 50,
            -97.5, 50,
            -95, 50,
            -92.5, 50,
            -90, 50,
        ]),
        maximumHeights: [
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000,
            200000,
            100000
        ],
        minimumHeights: [
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0,
            100000,
            0
        ],
        material: Cesium.Color.BLUE.withAlpha(.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK
    }
});

${ code03.value.js }`,
    html
});

const code05 = ref({
    js: `${ code01.value.js }

const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-103, 40),
    ellipse: {
        semiMinorAxis: 250000,
        semiMajorAxis: 400000,
        material: Cesium.Color.BLUE.withAlpha(.5),
    },
});

viewer.zoomTo(viewer.entities);

const ellipse = entity.ellipse;`
});

const code06 = ref({
    js: `${ code05.value.js } // 用于即将出现的示例`,
    html
});

const code07 = ref({
    js: `${ code05.value.js }

ellipse.material = '/static/img/tutorial/cesium-js/polar-bear.jpg';`,
    html
});

const code08 = ref({
    js: `${ code05.value.js }

ellipse.material = new Cesium.CheckerboardMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
    repeat: new Cesium.Cartesian2(4, 4),
});`,
    html
});

const code09 = ref({
    js: `${ code05.value.js }

ellipse.material = new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
    repeat: 32,
});`,
    html
});

const code10 = ref({
    js: `${ code05.value.js }

ellipse.material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(8, 8),
    lineThickness: new Cesium.Cartesian2(2, 2),
});`,
    html
});

const code11 = ref({
    js: `${ code05.value.js }

ellipse.fill = false;
ellipse.outline = true;
ellipse.outlineColor = Cesium.Color.YELLOW;
ellipse.outlineWidth = 2;`,
    html
});

const code12 = ref({
    js: `${ code01.value.js }

const entity = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([ -77, 35, -77.1, 35 ]),
        width: 5,
        material: Cesium.Color.RED,
    },
});
viewer.zoomTo(viewer.entities);

const polyline = entity.polyline;`
});

const code13 = ref({
    js: `${ code12.value.js } // 用于即将出现的示例`,
    html
});

const code14 = ref({
    js: `${ code12.value.js }

polyline.material = new Cesium.PolylineOutlineMaterialProperty({
    color: Cesium.Color.ORANGE,
    outlineWidth: 3,
    outlineColor: Cesium.Color.BLACK,
});`,
    html
});

const code15 = ref({
    js: `${ code12.value.js }

polyline.material = new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.2,
    color: Cesium.Color.BLUE,
});`,
    html
});

const code16 = ref({
    js: `${ code04.value.js }

wyoming.polygon.height = 250000;`,
    html
});

const code17 = ref({
    js: `${ code04.value.js }

wyoming.polygon.height = 200000;
wyoming.polygon.extrudedHeight = 250000;`,
    html
});

const code18 = ref({
    js: `${ code17.value.js }

wyoming.name = '怀俄明州';
wyoming.description = \`<img width="50%" style="float:left; margin: 0 1em 1em 0;" src="/static/img/tutorial/cesium-js/Flag_of_Wyoming.svg" alt=""/>\\
<p>怀俄明州（英语：State of Wyoming）是美国西部的一个州。</p>
<p>为全美国人口最少的一州，亦为全美印第安人比例第四高的州。此州一共管辖有23个县。怀俄明州内拥有众多知名的景点，包括举世闻名的黄石国家公园和大蒂顿国家公园等，每年吸引成千上万的海内外游客前来观光游览。怀俄明的名称源自古印地安语“mecheweamiing”，意为“大草原”。根据州历史沿革，怀俄明州亦称为“大怀俄明”（Big Wyoming）及“牛仔州”（Cowboy State）。其中，怀俄明州州议会于公元1869年通过授予女性投票权的法案，为世界上首见女性拥有投票权的政府，因而得到“平等之州”（Equality State）的美誉。</p>
<p>来源：<a style="color: yellow" target="_blank" href="https://zh.wikipedia.org/wiki/%E6%80%80%E4%BF%84%E6%98%8E%E5%B7%9E">维基百科</a></p>\`;`,
    html
});

const code19 = ref({
    js: `${ code18.value.js }

const heading = Cesium.Math.toRadians(90);
const pitch   = Cesium.Math.toRadians(-30);

viewer.zoomTo(wyoming, new Cesium.HeadingPitchRange(heading, pitch));`,
    html
});

const code20 = ref({
    js: `${ code18.value.js }

const result = await viewer.flyTo(wyoming);

if (result) {
    viewer.selectedEntity = wyoming;
}`,
    html
});

const code21 = ref({
    js: `${ code17.value.js }

wyoming.position = Cesium.Cartesian3.fromDegrees(-107.724, 42.68);

viewer.trackedEntity = wyoming;`,
    html
});

const code22 = ref({
    js: `viewer.entities.add({
    id: 'uniqueId',
});`
});

const code23 = ref({
    js: `const entity = viewer.entities.getById('uniqueId');`
});

const code24 = ref({
    js: `const entity = viewer.entities.getOrCreateEntity('uniqueId');`
});

const code25 = ref({
    js: `const entity = new Entity({
    id: 'uniqueId'
});

viewer.entities.add(entity);`
});

const code26 = ref({
    js: `const onChanged = (collection, added, removed, changed) => {
    let message = '已添加的实体ID：';
    for (let i = 0; i < added.length; i++) {
        message += '\\n' + added[ i ].id;
    }
    console.log(message);
};

viewer.entities.collectionChanged.addEventListener(onChanged);`
});

const code27 = ref({
    js: `const entities = viewer.entities;

let i;
let height;
let positions;
const stripeMaterial = new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.WHITE.withAlpha(.5),
    oddColor: Cesium.Color.BLUE.withAlpha(.5),
    repeat: 5,
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-92, 20, -86, 27),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        stRotation: Cesium.Math.toRadians(45),
        material: stripeMaterial,
    },
});

entities.add({
    polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -107,
                27,
                -107,
                22,
                -102,
                23,
                -97,
                21,
                -97,
                25,
            ])
        ),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: stripeMaterial,
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-80, 25),
    ellipse: {
        semiMinorAxis: 300000,
        semiMajorAxis: 500000,
        rotation: Cesium.Math.toRadians(-40),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        stRotation: Cesium.Math.toRadians(22),
        material: stripeMaterial,
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-72, 25),
    ellipse: {
        semiMinorAxis: 250000,
        semiMajorAxis: 250000,
        rotation: Cesium.Math.toRadians(-40),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        stRotation: Cesium.Math.toRadians(90),
        material: stripeMaterial,
    },
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
            -118,
            38,
            -116,
            40.0
        ),
        extrudedHeight: 500000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        stRotation: Cesium.Math.toRadians(45),
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-117, 35),
    ellipse: {
        semiMinorAxis: 100000,
        semiMajorAxis: 200000,
        height: 100000,
        extrudedHeight: 200000,
        rotation: Cesium.Math.toRadians(90),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -118,
                30,
                -115,
                30,
                -117.1,
                31.1,
                -118,
                33,
            ])
        ),
        height: 300000,
        extrudedHeight: 700000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-70, 45, 100000),
    cylinder: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -118,
                30,
                -115,
                30,
                -117.1,
                31.1,
                -118,
                33,
            ])
        ),
        length: 200000,
        topRadius: 150000,
        bottomRadius: 150000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

for (i = 0; i < 5; ++i) {
    height = 100000 + 200000 * i;
    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-106, 45, height),
        box: {
            dimensions: new Cesium.Cartesian3(90000, 90000, 90000),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            material: Cesium.Color.fromRandom({ alpha: 0.5 }),
        },
    });

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-102, 45, height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(45000, 45000, 90000),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            material: Cesium.Color.fromRandom({ alpha: 0.5 }),
        },
    });

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-98, 45, height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(67500, 67500, 67500),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            material: Cesium.Color.fromRandom({ alpha: 0.5 }),
        },
    });
}

entities.add({
    wall: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -95,
            50,
            -85,
            50,
            -75,
            50,
        ]),
        maximumHeights: [500000, 1000000, 500000],
        minimumHeights: [0, 500000, 0],
        outline: true,
        outlineColor: Cesium.Color.LIGHTGRAY,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 0.7 }),
    },
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-92, 30, -85, 40),
        material: stripeMaterial,
    },
});

entities.add({
    polygon: {
        hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -109,
                30,
                -95,
                30,
                -95,
                40,
                -109,
                40,
            ]),
            holes: [
                {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        -107,
                        31,
                        -107,
                        39,
                        -97,
                        39,
                        -97,
                        31,
                    ]),
                    holes: [
                        {
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                -105,
                                33,
                                -99,
                                33,
                                -99,
                                37,
                                -105,
                                37,
                            ]),
                            holes: [
                                {
                                    positions: Cesium.Cartesian3.fromDegreesArray([
                                        -103,
                                        34,
                                        -101,
                                        34,
                                        -101,
                                        36,
                                        -103,
                                        36,
                                    ]),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        material: stripeMaterial,
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-80, 35),
    ellipse: {
        semiMinorAxis: 200000,
        semiMajorAxis: 500000,
        rotation: Cesium.Math.toRadians(30),
        material: stripeMaterial,
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-72, 35),
    ellipse: {
        semiMinorAxis: 200000,
        semiMajorAxis: 200000,
        rotation: Cesium.Math.toRadians(30),
        material: stripeMaterial,
    },
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
            -110,
            38,
            -107,
            40.0
        ),
        height: 700000,
        extrudedHeight: 1000000,
        rotation: Cesium.Math.toRadians(45),
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-110, 35),
    ellipse: {
        semiMinorAxis: 100000,
        semiMajorAxis: 200000,
        height: 300000,
        extrudedHeight: 700000,
        rotation: Cesium.Math.toRadians(-40),
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -113,
                30,
                -110,
                30,
                -110,
                33,
                -111.5,
                31,
                -113,
                33,
            ])
        ),
        extrudedHeight: 300000,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-70, 40, 200000),
    cylinder: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -118,
                30,
                -115,
                30,
                -117.1,
                31.1,
                -118,
                33,
            ])
        ),
        length: 400000,
        topRadius: 0,
        bottomRadius: 200000,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

for (i = 0; i < 5; ++i) {
    height = 200000 * i;

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-65, 35),
        ellipse: {
            semiMinorAxis: 200000,
            semiMajorAxis: 200000,
            height: height,
            material: Cesium.Color.fromRandom({ alpha: 0.5 }),
        },
    });

    entities.add({
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(
                -67,
                27,
                -63,
                32.0
            ),
            height: height,
            material: Cesium.Color.fromRandom({ alpha: 0.5 }),
        },
    });
}

for (i = 0; i < 5; ++i) {
    height = 100000 + 200000 * i;
    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-108, 45, height),
        box: {
            dimensions: new Cesium.Cartesian3(90000, 90000, 90000),
            material: Cesium.Color.fromRandom({ alpha: 1 }),
        },
    });

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-104, 45, height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(45000, 45000, 90000),
            material: Cesium.Color.fromRandom({ alpha: 1 }),
        },
    });

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-100, 45, height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(67500, 67500, 67500),
            material: Cesium.Color.fromRandom({ alpha: 1 }),
        },
    });
}

positions = [];
for (i = 0; i < 40; ++i) {
    positions.push(Cesium.Cartesian3.fromDegrees(-100 + i, 15));
}

entities.add({
    polyline: {
        positions: positions,
        width: 10,
        material: new Cesium.PolylineGlowMaterialProperty({
            color: Cesium.Color.DEEPSKYBLUE,
            glowPower: 0.25,
        }),
    },
});

positions = [];
for (i = 0; i < 40; ++i) {
    positions.push(Cesium.Cartesian3.fromDegrees(-100 + i, 9));
}

entities.add({
    wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -90,
            43,
            100000,
            -87.5,
            45,
            100000,
            -85,
            43,
            100000,
            -87.5,
            41,
            100000,
            -90,
            43,
            100000,
        ]),
        material: new Cesium.CheckerboardMaterialProperty({
            repeat: new Cesium.Cartesian2(20, 6),
        }),
    },
});

entities.add({
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -120,
            45,
            -125,
            50,
            -125,
            55,
        ]),
        width: 100000,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -120,
            45,
            -125,
            50,
            -125,
            55,
        ]),
        width: 100000,
        height: 300000,
        extrudedHeight: 400000,
        material: Cesium.Color.fromRandom({ alpha: 0.7 }),
    },
});

entities.add({
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -120,
            45,
            -125,
            50,
            -125,
            55,
        ]),
        width: 100000,
        height: 700000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 0.7 }),
    },
});

const starPositions = (arms, rOuter, rInner) => {
    const angle = Math.PI / arms;
    const pos = [];
    for (let i = 0; i < 2 * arms; i++) {
        const r = i % 2 === 0 ? rOuter : rInner;
        const p = new Cesium.Cartesian2(
            Math.cos(i * angle) * r,
            Math.sin(i * angle) * r
        );
        pos.push(p);
    }
    return pos;
}

entities.add({
    polylineVolume: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
            -102,
            15,
            100000,
            -105,
            20,
            200000,
            -110,
            20,
            100000,
        ]),
        shape: starPositions(7, 30000, 20000),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 1,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    polylineVolume: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -102,
            15,
            -105,
            20,
            -110,
            20,
        ]),
        shape: starPositions(7, 30000, 20000),
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

const computeCircle = (radius) => {
    const positions = [];
    for (let i = 0; i < 360; i++) {
        const radians = Cesium.Math.toRadians(i);
        positions.push(
            new Cesium.Cartesian2(
                radius * Math.cos(radians),
                radius * Math.sin(radians)
            )
        );
    }
    return positions;
}

entities.add({
    polylineVolume: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -104,
            13,
            -107,
            18,
            -112,
            18,
        ]),
        shape: computeCircle(40000),
        material: Cesium.Color.WHITE,
    },
});`
});

const code28 = ref({
    js: `Cesium.Math.setRandomNumberSeed(1234);

${ code01.value.js }

${ code26.value.js }

${ code27.value.js }

${ code03.value.js }`,
    html
});

const code29 = ref({
    js: `Cesium.Math.setRandomNumberSeed(1234);

${ code01.value.js }

${ code26.value.js }

viewer.entities.suspendEvents();

${ code27.value.js }

viewer.entities.resumeEvents();

${ code03.value.js }`,
    html
});

const code30 = ref({
    js: `/**
 * 返回指定窗口坐标处的最上层实体
 * 如果指定位置上没有实体，则返回 undefined
 *
 * @param { Cartesian2 } windowPosition 窗口坐标
 * @returns { Entity } 返回拾取的实体或 undefined.
 */
const pickEntity = (viewer, windowPosition) => {
    const picked = viewer.scene.pick(windowPosition);
    if (Cesium.defined(picked)) {
        const id = Cesium.defaultValue(picked.id, picked.primitive.id);
        if (id instanceof Cesium.Entity) {
            return id;
        }
    }
    return undefined;
};

/**
 * 返回在指定窗口坐标处的实体列表
 * 实体按照它们的视觉顺序从前到后排序
 *
 * @param { Cartesian2 } windowPosition 窗口坐标
 * @returns { Entity[] } 返回拾取的实体列表或 undefined
 */
const drillPickEntities = (viewer, windowPosition) => {
    let picked;
    let entity;
    const pickedPrimitives = viewer.scene.drillPick(windowPosition);
    const length = pickedPrimitives.length;
    const result = [];
    const hash   = {};

    for (let i = 0; i < length; i++) {
        picked = pickedPrimitives[ i ];
        entity = Cesium.defaultValue(picked.id, picked.primitive.id);
        if (entity instanceof Cesium.Entity && !Cesium.defined(hash[ entity.id ])) {
            result.push(entity);
            hash[ entity.id ] = true;
        }
    }
    return result;
};`
});

const code31 = ref({
    js: `${ code01.value.js }

const citizensBankPark = viewer.entities.add({
    name: '市民银行球场',
    position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2
    },
    label: {
        text: '市民银行球场',
        font: '14px Microsoft YaHei',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9)
    }
});

${ code03.value.js }`,
    html
});

const code32 = ref({
    js: `${ code01.value.js }

const citizensBankPark = viewer.entities.add({
    name: '市民银行球场',
    position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    billboard: {
        image: '/static/img/tutorial/cesium-js/philadelphia-phillies.png',
        width: 64,
        height: 64
    },
    label: {
        text: '市民银行球场',
        font: '14px Microsoft YaHei',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(0, 32)
    }
});

${ code03.value.js }`,
    html
});

const code33 = ref({
    js: `${ code01.value.js }

const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
    model: {
        uri: '/static/sampleData/CesiumJS/models/GroundVehicle.glb'
    }
});

viewer.trackedEntity = entity;`,
    html
});

const code34 = ref({
    js: `${ code01.value.js }

const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706);
const heading = Cesium.Math.toRadians(45);
const pitch = Cesium.Math.toRadians(15);
const roll = Cesium.Math.toRadians(0);
const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    new Cesium.HeadingPitchRoll(heading, pitch, roll)
);

const entity = viewer.entities.add({
    position,
    orientation,
    model: {
        uri: '/static/sampleData/CesiumJS/models/GroundVehicle.glb'
    }
});

viewer.trackedEntity = entity;`,
    html
});

const code35 = ref({
    js: `console.log(typeof wyoming.polygon.outline);`
});

const code36 = ref({
    js: `${ code01.value.js }

const polygon        = new Cesium.PolygonGraphics();
polygon.hierarchy    = Cesium.Cartesian3.fromDegreesArray([
    -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
    -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
    -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
    -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073
]);
polygon.height       = 150000;
polygon.material     = new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(.5));
polygon.outline      = new Cesium.ConstantProperty(true);
polygon.outlineColor = new Cesium.ConstantProperty(Cesium.Color.BLACK);

const wyoming   = new Cesium.Entity();
wyoming.name    = '怀俄明州';
wyoming.polygon = polygon;

viewer.entities.add(wyoming);

${ code03.value.js }`,
    html
});



</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>创建实体<span>Creating Entities</span></h1>
        <p>学习如何在CesiumJS中使用Entity API绘制空间数据，例如点、标记、标签、线条、模型、形状和体积。</p>
        <div class="note">
            <p>刚接触Cesium？</p>
            <ul>
                <li>请查看"<router-link :to="{ name: 'Proposed-Building' }" target="_blank">可视化一个拟建建筑物</router-link>" 或 "<router-link :to="{ name: 'Flight-Tracker' }" target="_blank">构建飞行追踪器</router-link>"教程，了解如何构建Cesium应用以及如何可视化和交互3D实体的概述。</li>
                <li>如果需要首次设置应用程序的帮助，请从<router-link :to="{ name: 'Quickstart' }" target="_blank">快速入门</router-link>教程开始。</li>
            </ul>
        </div>
        <h2>Entity API是什么？<span>What is the Entity API?</span></h2>
        <p>CesiumJS拥有一个丰富的空间数据API，可分为两类：一个低级别的<span class="code">Primitive API</span>，面向图形开发人员；和一个高级别的<span class="code">Entity API</span>，面向数据驱动的可视化。</p>
        <p>低级别的原始API是低级别的，它提供了执行特定任务所需的最基本抽象层。它的设计注重为图形开发人员提供灵活的实现方式，而非追求API的一致性。加载模型与创建广告牌完全不同，而创建多边形又与它们截然不同。每种可视化类型都有其独特的功能，并具有不同的性能特点和最佳实践方法。尽管原始API功能强大且灵活，但对于大多数应用程序来说，更适合使用更高级别的抽象层。</p>
        <p>实体API公开了一组高级对象，这些对象按一致的设计方式将相关的可视化和信息聚合到一个统一的数据结构中，我们称之为<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Entity.html" target="_blank">实体</a></span>。它使我们能够专注于数据的呈现，而无需关注底层的可视化机制。此外，实体API还提供了用于轻松构建复杂、时间动态可视化的构造方式，与静态数据自然地结合。尽管实体API在底层实际上使用了原始API，但我们几乎不需要关心这个实现细节。通过对所提供数据应用各种启发式方法，实体API能够提供灵活、高性能的可视化，并提供一致、易学且易于使用的接口。</p>
        <h2>第一个实体<span>Our first entity</span></h2>
        <p>首先，在Sandcastle中打开<span class="code"><a href="https://sandcastle.cesium.com/?src=Hello%20World.html&label=Showcases" target="_blank">Hello World</a></span>示例。</p>
        <p>从经度和纬度度数的列表中，添加一个代表美国怀俄明州的多边形。</p>
        <cesium-example v-model="code04" height="390px" />
        <p>点击工具栏上的<strong>Run (F8)</strong>按钮（或键盘上的<strong>F8</strong>键）会产生以下结果：</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-OurFirstEntity.jpg"></p>
        <p>上面的代码创建了<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html" target="_blank">Viewer</a></span>，它创建了地球和其他小部件。我们通过<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/EntityCollection.html#add" target="_blank">viewer.entities.add</a></span>创建了一个新<span class="code">Entity</span>。我们传递给<span class="code">add</span>的对象为该实体提供了初始值。返回值是实际的<span class="code">Entity</span>实例。最后，<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/EntityCollection.html#zoomTo" target="_blank">viewer.zoomTo</a></span>将相机缩放以查看实体。</p>
        <p>实体有许多选项。我们明确规定了<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/PolygonGraphics.html" target="_blank">Polygon</a></span>填充为半透明的红色，以及黑色的轮廓线。</p>
        <h2>形状和体积<span>Shapes and volumes</span></h2>
        <p>下表是<span class="code">Entity</span>API 所能创建的形状和体积：</p>
        <div class="list">
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-boxGeometry.png">
                <p>盒子 <a href="https://cesium.com/learn/cesiumjs/ref-doc/BoxGraphics.html" target="_blank">entity.box</a></p>
                <cesium-example v-model="codeBox" height="635px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-ellipseGeometry.png">
                <p>圆和椭圆 <a href="https://cesium.com/learn/cesiumjs/ref-doc/EllipseGraphics.html" target="_blank">entity.ellipse</a></p>
                <cesium-example v-model="codeEllipse" height="700px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-corridorGeometry.png">
                <p>走廊 <a href="https://cesium.com/learn/cesiumjs/ref-doc/CorridorGraphics.html" target="_blank">entity.corridor</a></p>
                <cesium-example v-model="codeCorridor" height="892px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-cylinderGeometry.png">
                <p>圆柱体和圆锥体 <a href="https://cesium.com/learn/cesiumjs/ref-doc/CylinderGraphics.html" target="_blank">entity.cylinder</a></p>
                <cesium-example v-model="codeCylinder" height="525px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-polygonGeometry.png">
                <p>多边形 <a href="https://cesium.com/learn/cesiumjs/ref-doc/PolygonGraphics.html" target="_blank">entity.polygon</a></p>
                <cesium-example v-model="codePolygons" height="700px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-polylineGeometry.png">
                <p>折线 <a href="https://cesium.com/learn/cesiumjs/ref-doc/PolylineGraphics.html" target="_blank">entity.polyline</a></p>
                <cesium-example v-model="codePolyline" height="600px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-polylineVolumeGeometry.png">
                <p>折线体积 <a href="https://cesium.com/learn/cesiumjs/ref-doc/PolylineVolumeGraphics.html" target="_blank">entity.polylineVolume</a></p>
                <cesium-example v-model="codePolylineVolume" height="600px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-extentGeometry.png">
                <p>矩形 <a href="https://cesium.com/learn/cesiumjs/ref-doc/Rectangle.html" target="_blank">entity.rectangle</a></p>
                <cesium-example v-model="codeRectangle" height="600px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-ellipsoidGeometry.png">
                <p>球和椭球 <a href="https://cesium.com/learn/cesiumjs/ref-doc/EllipsoidGraphics.html" target="_blank">entity.ellipsoid</a></p>
                <cesium-example v-model="codeEllipsoid" height="600px" />
            </div>
            <div class="item">
                <img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-wallGeometry.png">
                <p>墙 <a href="https://cesium.com/learn/cesiumjs/ref-doc/WallGraphics.html" target="_blank">entity.wall</a></p>
                <cesium-example v-model="codeWall" height="600px" />
            </div>
        </div>
        <h4><strong>材质和轮廓</strong><span>Materials and outlines</span></h4>
        <p>所有形状和体积都具有一组共同的属性，用于控制它们的外观。<span class="code">fill</span>属性指定几何图形是否填充，<span class="code">outline</span>属性指定几何图形是否有轮廓。</p>
        <p>当<span class="code">fill</span>属性为<span class="code">true</span>时，material 属性决定了填充的外观。以下代码创建了一个半透明的蓝色椭圆形。</p>
        <cesium-example v-model="code06" height="320px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-materialColor.jpg" alt=""></p>
        <h4><strong>图像</strong><span>Imagery</span></h4>
        <p>我们还可以指定一个图像的 URL，而不是颜色。</p>
        <cesium-example v-model="code07" height="355px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-materialImage.jpg" alt=""><em>原图中的猫没找到</em></p>
        <p>在上述两种情况下，当我们进行赋值时，<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/ColorMaterialProperty.html" target="_blank">ColorMaterialProperty</a></span>或<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/ImageMaterialProperty.html" target="_blank">ImageMaterialProperty</a></span>会自动为我们创建。对于更复杂的材质，我们需要自己创建<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/MaterialProperty.html" target="_blank">MaterialProperty</a></span>实例。目前，实体形状和体积支持颜色、图像、棋盘格、条纹和网格等材质。</p>
        <h4><strong>棋盘</strong><span>Checkerboard</span></h4>
        <cesium-example v-model="code08" height="420px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-materialCheckerboard.jpg" alt=""></p>
        <h4><strong>条纹</strong><span>Stripe</span></h4>
        <cesium-example v-model="code09" height="420px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-materialStriped.jpg" alt=""></p>
        <h4><strong>网格</strong><span>Grid</span></h4>
        <cesium-example v-model="code10" height="440px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-materialGrid.jpg" alt=""></p>
        <h4><strong>轮廓线</strong><span>Outlines</span></h4>
        <p><span class="code">outline</span>依赖于<span class="code">outlineColor</span>（轮廓颜色）和<span class="code">outlineWidth</span>（轮廓宽度）属性。轮廓宽度仅在非Windows系统上有效，如Android、iOS、Linux和OS X。在Windows系统上，轮廓的宽度始终为1。这是由于WebGL在Windows上的实现限制所导致的。</p>
        <cesium-example v-model="code11" height="405px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-outlineOnly.jpg" alt=""></p>
        <h4><strong>折线</strong><span>Polylines</span></h4>
        <p><span class="code">Polylines</span>是一种特殊情况，因为它们没有填充或轮廓属性。除了颜色之外，它们依赖于专用材料。由于这些特殊的材料，具有不同宽度和轮廓宽度的<span class="code">Polylines</span>在所有系统上都可以正常工作。</p>
        <cesium-example v-model="code13" height="290px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-polylineMaterialColor.jpg" alt=""></p>
        <h4><strong>折线轮廓</strong><span>Polyline outline</span></h4>
        <cesium-example v-model="code14" height="390px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-polylineMaterialOutline.jpg" alt=""></p>
        <h4><strong>折线发光</strong><span>Polyline glow</span></h4>
        <cesium-example v-model="code15" height="380px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-polylineMaterialGlow.jpg" alt=""></p>
        <h3>高度和挤出<span>Heights and extrusions</span></h3>
        <p>包括<span class="code">corridor</span>（走廊）、<span class="code">ellipse</span>（椭圆）、<span class="code">polygon</span>（多边形）和<span class="code">rectangles</span>（矩形）在内的表面形状可以放置在高度上，或者挤出成一个体积。在这两种情况下，形状或体积仍然会遵循WGS84椭球体的曲率。</p>
        <p>在相应的图形对象上设置高度属性（以米为单位）。下面的代码将抬高多边形到地球上方 250,000 米的位置。</p>
        <cesium-example v-model="code16" height="425px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-height.jpg" alt=""><em>怀俄明州区域轮廓在海拔 250,000 米处</em></p>
        <p>设置<span class="code">extrudedHeight</span>属性挤压形状成体积。该体积将在<span class="code">height</span>和<span class="code">extrudedHeight</span>之间创建。如果<span class="code">height</span>为<span class="code">undefined</span>，则体积从 0 开始。创建一个从 200,000 米开始，延伸至 250,000 米的体积。</p>
        <cesium-example v-model="code17" height="430px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-extruded.jpg" alt=""><em>我们可以轻松地将一个平面多边形挤压成体积</em></p>
        <h2>视图中实体特性<span>Entity features in the Viewer</span></h2>
        <p>这些是视图提供的开箱即用的用于处理实体的功能。</p>
        <h3>选择和描述<span>Selection and description</span></h3>
        <p>在查看器中单击实体将在实体位置显示<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/SelectionIndicator.html" target="_blank">SelectionIndicator</a></span>小部件，并弹出<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/InfoBox.html" target="_blank">InfoBox</a></span>以提供更多信息。我们可以设置名称，它确定<span class="code">InfoBox</span>的标题。我们还可以提供 HTML 作为<span class="code">Entity.description</span>属性。</p>
        <cesium-example v-model="code18" height="530px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-EntityDescription.jpg" alt=""><em>设置实体描述允许以 HTML 格式显示信息在 InfoBox 中</em></p>
        <p>在<span class="code">InfoBox</span>中显示的所有 HTML 都是沙盒化的。这可以防止外部数据源向 Cesium 应用程序注入恶意代码。要在描述中运行 JavaScript 或浏览器插件，请通过<span class="code">viewer.infoBox.frame</span>属性访问用于沙盒的 iframe。有关控制 iframe 沙盒化的更多信息，请参见<a href="https://web.dev/articles/sandboxed-iframes?hl=zh-cn" target="_blank">本文</a>。</p>
        <h2>相机控制<span>Camera controls</span></h2>
        <p>使用<span class="code">viewer.zoomTo</span>命令查看特定实体。还有一个<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html#flyTo" target="_blank">viewer.flyTo</a></span>方法，可以执行动画相机飞行到实体的过程。这两种方法都可以传入<span class="code">Entity</span>、<span class="code">EntityCollection</span>、<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/DataSource.html" target="_blank">DataSource</a></span>或实体数组。</p>
        <p>两种方法都会计算所有提供实体的视图。默认情况下，相机朝向北方，并且以45度的角度向下查看。通过传入<span class="code">HeadingPitchRange</span>来自定义。</p>
        <cesium-example v-model="code19" height="600px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-zoomOffset.jpg" alt=""><em>从东面观察怀俄明州</em></p>
        <p><span class="code">zoomTo</span>和<span class="code">flyTo</span>都是异步函数；也就是说，在它们返回之前不能保证已经完成。例如，飞到一个实体会经过许多动画帧。这两个函数都返回<span class="code"><a href="https://javascript.info/promise-basics" target="_blank">Promises</a></span>，可以用来安排在飞行或缩放完成后执行的函数。在我们的示例中，使用下面的片段替换<span class="code">zoomTo</span>。这将在飞行完成后飞到怀俄明州并选择它。</p>
        <cesium-example v-model="code20" height="600px" />
        <p>用<span class="code">result</span>接收回调函数结果，若飞行成功完成则为<span class="code">true</span>，若被取消则为<span class="code">false</span>。取消可能是因为用户在此次飞行完成前发起了另一个飞行或缩放，或者是因为目标没有相应的可视化，即无法进行缩放。</p>
        <p>在处理时态数据时，我们希望摄像机始终保持对某个实体的跟踪，而不是对地球的跟踪。这可以通过设置<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html#trackedEntity" target="_blank">viewer.trackedEntity</a></span>来实现。跟踪一个实体需要设置其<span class="code">position</span>。</p>
        <cesium-example v-model="code21" height="480px" />
        <p>通过将<span class="code">viewer.trackedEntity</span>设置为<span class="code">undefined</span>或双击实体之外的区域，可以停止跟踪。调用<span class="code">zoomTo</span>或<span class="code">flyTo</span>也会取消跟踪。</p>
        <h2>管理实体<span>Managing entities</span></h2>
        <p><span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/EntityCollection.html" target="_blank">EntityCollection</a></span>是用于管理和监控一组实体的关联数组。<span class="code">viewer.entities</span>就是一个<span class="code">EntityCollection</span>。<span class="code">EntityCollection</span>包括<span class="code"><a href="" target="_blank">add</a></span>、<span class="code"><a href="" target="_blank">remove</a></span>和<span class="code"><a href="" target="_blank">removeAll</a></span>等方法，用于管理实体。</p>
        <p>有时候我们需要更新之前创建的实体。所有的实体实例都具有可以用来从集合中检索实体唯一的<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#id" target="_blank">ID</a></span>。我们可以指定一个ID，也可以自动生成一个。</p>
        <monaco-editor v-model="code22" />
        <p>使用<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/EntityCollection.html#getById" target="_blank">getById</a></span>方法检索实体。如果提供的 ID 不存在对应的实体，则返回<span class="code">undefined</span>。</p>
        <monaco-editor v-model="code23" />
        <p>要获取一个实体，如果该实体不存在，则创建一个新的实体，可以使用 getOrCreateEntity 方法。</p>
        <monaco-editor v-model="code24" />
        <p>通过手动创建一个新的实体，并使用 add 方法将其添加到集合中。如果集合中已经存在具有相同 ID 的实体，则该方法会抛出异常。</p>
        <monaco-editor v-model="code25" height="140px" />
        <p>EntityCollection 的强大之处在于使用<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/EntityCollection.html#collectionChanged" target="_blank">collectionChanged</a></span>事件。当集合中的实体被添加、移除或更新时，这会通知监听器。</p>
        <p>在Sandcastle中使用<a href="https://sandcastle.cesium.com/?src=Geometry%20and%20Appearances.html&label=Showcases" target="_blank">Geometry Showcase</a>示例。在创建viewer的代码行之后，粘贴以下代码。</p>
        <monaco-editor v-model="code26" height="200px" />
        <cesium-example v-model="code28" height="600px" />
        <p>当运行示例时，应该在控制台中看到大约65条消息，每个消息代表一次对<span class="code">viewer.entities.add</span>的调用。</p>
        <p>在更新大量实体时，更准确的表达是将更改暂存起来并在最后发送一个大事件。这样，Cesium可以在单次遍历中处理所有必要的更改。在调用<span class="code">viewer.entities.add</span>之前，请调用<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/EntityCollection.html#suspendEvents" target="_blank">viewer.entities.suspendEvents</a></span>，并在示例结束时调用<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/EntityCollection.html#resumeEvents" target="_blank">viewer.entities.resumeEvents</a></span>。当再次运行演示时，将会获得一个包含所有65个实体的单个事件。这些调用是引用计数的，因此可以嵌套多个<span class="code">suspend</span>和<span class="code">resume</span>调用。</p>
        <cesium-example v-model="code29" height="600px" />
        <h2>拾取<span>Picking</span></h2>
        <p>在选择对象时（通过点击来选取一个物体），我们需要与 Primitive API 进行简要的接口交互。可以使用<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pick" target="_blank">scene.pick</a></span>和<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#drillPick" target="_blank">scene.drillPick</a></span>来获取一个实体。</p>
        <monaco-editor v-model="code30" height="600px" />
        <h2>点、广告牌和标签<span>Points, billboards, and labels</span></h2>
        <p>通过设置<span class="code">position</span>、<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/PointGraphics.html" target="_blank">point</a></span>和<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/LabelGraphics.html" target="_blank">label</a></span>来创建一个图形化的点或标签。例如，在我们最喜欢的棒球队主场球场放置一个点。</p>
        <cesium-example v-model="code31" height="450px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-pointLabel.jpg" alt=""><em>宾夕法尼亚州费城的市民银行球场，费城费城人队的主场。</em></p>
        <p>默认情况下，标签在水平和垂直方向上都居中。由于标签和点共享同一位置，它们在屏幕上重叠。为了避免这种情况，需要指定标签原点为<span class="code">VerticalOrigin.BOTTOM</span>并设置像素偏移量为<span class="code">（0，-9）</span>。</p>
        <p>用一个<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/BillboardGraphics.html" target="_blank">billboard</a></span>（广告牌）替换点，广告牌是一种始终面向用户的标记。</p>
        <cesium-example v-model="code32" height="430px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-billboardLabel.jpg" alt=""><em>将费城费城人队的标志作为广告牌放置在我们实体的位置上。</em></p>
        <p>查看沙堡 <a href="https://sandcastle.cesium.com/?src=Labels.html&label=Showcases" target="_blank">Label</a>（标签）和<a href="https://sandcastle.cesium.com/?src=Billboards.html&label=Showcases" target="_blank">Billboards</a>（广告牌）沙堡示例，了解更多的自定义选项。</p>
        <h2>3D模型<span>3D models</span></h2>
        <p>CesiumJS使用<span class="code"><a href="https://github.com/KhronosGroup/glTF" target="_blank">glTF</a></span>作为运行时资产格式来支持 <span class="code"><a href="https://sandcastle.cesium.com/?src=3D%20Models.html&label=Showcases" target="_blank">3D models</a></span>（3D模型）。可以在3D模型沙盒示例中找到示例模型。</p>
        <p>设置一个位置和一个URI给glTF模型，以创建模型实体。</p>
        <cesium-example v-model="code33" height="250px" />
        <p><img src="/static/img/tutorial/cesium-js/tutorials-creating-entities-truckModel.jpg" alt=""><em>CesiumJS自带的示例卡车模型。</em></p>
        <p>默认情况下，该模型是竖直朝上并面向东方。通过为<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/Entity.html#orientation" target="_blank">Entity.orientation</a></span>属性指定一个<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/Quaternion.html" target="_blank">Quaternion</a></span>（四元数）来控制模型的方向。这个四元数控制了模型的航向、俯仰角和滚动角。</p>
        <cesium-example v-model="code34" height="410px" />
        <p>如果自己创建模型，请务必查看我们 <a href="https://cesium.com/blog/2014/12/15/gltf-tips-for-artists/" target="_blank">关于艺术家使用glTF的技巧</a>的文章。</p>
        <h2>属性系统<span>The property system</span></h2>
        <p>我们为实体定义的所有值都被存储为<span class="code">Property</span>对象。例如，查看Wyoming轮廓的值：</p>
        <monaco-editor v-model="code35" />
        <p>outline是<span class="code"><a href="https://cesium.com/docs/cesiumjs-ref-doc/ConstantProperty.html" target="_blank">ConstantProperty</a></span>的一个实例。本教程使用一种称为隐式属性转换的简写形式，它可以自动将原始值转换为相应的属性。如果没有这个简写形式，我们将不得不编写一个更长的初始示例版本：</p>
        <cesium-example v-model="code36" height="430px" />
        <p>使用属性是因为Entity API不仅能够表达常量值，还能表达随时间变化的值。查看<a href="https://sandcastle.cesium.com/?src=Callback%20Property.html" target="_blank">Callback Property</a>（回调属性）和插值沙盒示例，以查看一些动态属性。</p>
        <el-affix position="bottom">
            <div class="origin"><a class="btn-sandcastle" href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/" target="_blank">原文</a></div>
        </el-affix>
    </div>
</div>
</template>

<style lang="scss" scoped>
.list {

    .item {
        position: relative;
        margin-bottom: 50px;
        padding-left: 110px;

        img {
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    p {
        margin-bottom: 15px;
        font-weight: bold;
        font-size: 18px;
        line-height: 1;
    }
}
</style>
