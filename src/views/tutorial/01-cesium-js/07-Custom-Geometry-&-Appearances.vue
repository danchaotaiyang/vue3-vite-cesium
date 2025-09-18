<script setup>
import { ref } from 'vue';


const html = '<div id="cesium-container"></div>';

const viewer = `const viewer = new Cesium.Viewer('cesium-container');`;

const code01 = ref({
    js: `${ viewer }
viewer.entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-100, 20, -90, 30),
        material: new Cesium.StripeMaterialProperty({
            evenColor: Cesium.Color.WHITE,
            oddColor: Cesium.Color.BLUE,
            repeat: 5
        })
    }
});`,
    html
});

const code02 = ref({
    js: `${ viewer }

// 原始代码：
// viewer.entities.add({
//     rectangle: {
//         coordinates: Cesium.Rectangle.fromDegrees(-100, 20, -90, 30),
//         material: new Cesium.StripeMaterialProperty({
//             evenColor: Cesium.Color.WHITE,
//             oddColor: Cesium.Color.BLUE,
//             repeat: 5
//         })
//     }
// });

const instance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-100, 20, -90, 30),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
    })
});

viewer.scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: Cesium.Material.fromType('Stripe')
        })
    })
);`,
    html
});

const code03 = ref({
    js: `Cesium.Math.setRandomNumberSeed(1234);

const viewer = new Cesium.Viewer('cesium-container', { infoBox: false });

const { entities } = viewer;

let i;
let height;
let positions;
const stripeMaterial = new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.WHITE.withAlpha(.5),
    oddColor: Cesium.Color.BLUE.withAlpha(.5),
    repeat: 5
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-92, 20, -86, 27),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        stRotation: Cesium.Math.toRadians(45),
        material: stripeMaterial
    }
});

entities.add({
    polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -107, 27,
                -107, 22,
                -102, 23,
                -97, 21,
                -97, 25
            ])
        ),
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: stripeMaterial
    }
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
        material: stripeMaterial
    }
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
        material: stripeMaterial
    }
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-118, 38, -116, 40),
        extrudedHeight: 500000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        stRotation: Cesium.Math.toRadians(45),
        material: Cesium.Color.fromRandom({ alpha: 1 })
    }
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
        material: Cesium.Color.fromRandom({ alpha: 1 })
    }
});

entities.add({
    polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -118, 30,
                -115, 30,
                -117.1, 31.1,
                -118, 33
            ])
        ),
        height: 300000,
        extrudedHeight: 700000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 1 })
    }
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-70, 45, 100000),
    cylinder: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -118, 30,
                -115, 30,
                -117.1, 31.1,
                -118, 33
            ])
        ),
        length: 200000,
        topRadius: 150000,
        bottomRadius: 150000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 1 })
    }
});

for (let i = 0; i < 5; i++) {

    height = 100000 + 200000 * i;

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-106, 45, height),
        box: {
            dimensions: new Cesium.Cartesian3(90000, 90000, 90000),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            material: Cesium.Color.fromRandom({ alpha: .5 })
        }
    });

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-102, 45, height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(45000, 67500, 90000),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            material: Cesium.Color.fromRandom({ alpha: .5 })
        }
    });

    entities.add({
        position: Cesium.Cartesian3.fromDegrees(-98, 45, height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(67500, 67500, 67500),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            material: Cesium.Color.fromRandom({ alpha: .5 })
        }
    });
}

entities.add({
    wall: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -95, 50,
            -85, 50,
            -75, 50
        ]),
        maximumHeights: [ 500000, 1000000, 500000 ],
        minimumHeights: [ 0, 500000, 0 ],
        outline: true,
        outlineColor: Cesium.Color.LIGHTGRAY,
        material: Cesium.Color.fromRandom({ alpha: .7 })
    }
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-92, 30, -85, 40),
        material: stripeMaterial
    }
});

entities.add({
    polygon: {
        hierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                -109, 30,
                -95, 30,
                -95, 40,
                -109, 40
            ]),
            holes: [
                {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        -107, 31,
                        -107, 39,
                        -97, 39,
                        -97, 31
                    ]),
                    holes: [
                        {
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                -105, 33,
                                -99, 33,
                                -99, 37,
                                -105, 37
                            ]),
                            holes: [
                                {
                                    positions: Cesium.Cartesian3.fromDegreesArray([
                                        -103, 34,
                                        -101, 34,
                                        -101, 36,
                                        -103, 36
                                    ])
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        material: stripeMaterial
    }
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-80, 35),
    ellipse: {
        semiMinorAxis: 200000,
        semiMajorAxis: 500000,
        rotation: Cesium.Math.toRadians(30),
        material: stripeMaterial
    }
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-72, 35),
    ellipse: {
        semiMinorAxis: 200000,
        semiMajorAxis: 200000,
        rotation: Cesium.Math.toRadians(30),
        material: stripeMaterial
    }
});

entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(-110, 38, -107, 40),
        height: 700000,
        extrudedHeight: 1000000,
        rotation: Cesium.Math.toRadians(45),
        material: Cesium.Color.fromRandom({ alpha: 1 })
    }
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-110, 35),
    ellipse: {
        semiMinorAxis: 100000,
        semiMajorAxis: 200000,
        height: 300000,
        extrudedHeight: 700000,
        rotation: Cesium.Math.toRadians(-40),
        material: Cesium.Color.fromRandom({ alpha: 1 })
    }
});

entities.add({
    polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -113, 30,
                -110, 30,
                -110, 33,
                -111.5, 31,
                -113, 33
            ])
        ),
        extrudedHeight: 300000,
        material: Cesium.Color.fromRandom({ alpha: 1 })
    }
});

entities.add({
    position: Cesium.Cartesian3.fromDegrees(-70, 40, 200000),
    cylinder: {
        hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray([
                -118, 30,
                -115, 30,
                -117.1, 31.1,
                -118, 33,
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
                -67, 27,
                -63, 32
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
            -90, 43, 100000,
            -87.5, 45, 100000,
            -85, 43, 100000,
            -87.5, 41, 100000,
            -90, 43, 100000,
        ]),
        material: new Cesium.CheckerboardMaterialProperty({
            repeat: new Cesium.Cartesian2(20, 6),
        }),
    },
});

entities.add({
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -120, 45,
            -125, 50,
            -125, 55,
        ]),
        width: 100000,
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

entities.add({
    corridor: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            -120, 45,
            -125, 50,
            -125, 55,
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
            -120, 45,
            -125, 50,
            -125, 55,
        ]),
        width: 100000,
        height: 700000,
        outline: true,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 4,
        material: Cesium.Color.fromRandom({ alpha: 0.7 }),
    },
});

function starPositions(arms, rOuter, rInner) {
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
            -102, 15, 100000,
            -105, 20, 200000,
            -110, 20, 100000,
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
            -102, 15,
            -105, 20,
            -110, 20,
        ]),
        shape: starPositions(7, 30000, 20000),
        material: Cesium.Color.fromRandom({ alpha: 1 }),
    },
});

function computeCircle(radius) {
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
            -104, 13,
            -107, 18,
            -112, 18,
        ]),
        shape: computeCircle(40000),
        material: Cesium.Color.WHITE,
    },
});

viewer.zoomTo(viewer.entities);
`,
    html
});

const code04 = ref({
    js: `const viewer = new Cesium.Viewer("cesium-container");
const scene = viewer.scene;

const instance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-100, 20, -90, 30),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
    })
});

const anotherInstance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-85, 20, -75, 30),
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
    })
});

scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: [ instance, anotherInstance ],
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: Cesium.Material.fromType('Stripe')
        })
    })
);
    `,
    html
});

const code05 = ref({
    js: `const viewer = new Cesium.Viewer("cesium-container");
const scene = viewer.scene;

const instance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-100, 20, -90, 30),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
    }),
    attributes: {
        color: new Cesium.ColorGeometryInstanceAttribute(0, 0, 1, .8)
    }
});

const anotherInstance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-85, 20, -75, 30),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
    }),
    attributes: {
        color: new Cesium.ColorGeometryInstanceAttribute(1, 0, 0, .8)
    }
});

scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: [ instance, anotherInstance ],
        appearance: new Cesium.PerInstanceColorAppearance()
    })
);
`,
    html
});

const code06 = ref({
    js: `const viewer = new Cesium.Viewer("cesium-container");
const scene = viewer.scene;

const instances = [];

for (let lon = -180; lon < 180; lon += 5) {
    for (let lat = -85; lat < 85; lat += 5) {
        instances.push(
            new Cesium.GeometryInstance({
                geometry: new Cesium.RectangleGeometry({
                    rectangle: Cesium.Rectangle.fromDegrees(lon, lat, lon + 5, lat + 5),
                    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
                }),
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                        Cesium.Color.fromRandom({ alpha: .5 })
                    )
                }
            })
        );
    }
}

scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance()
    })
);`,
    html
});

const code07 = ref({
    js: `const viewer = new Cesium.Viewer("cesium-container");
const scene = viewer.scene;

const instance = new Cesium.GeometryInstance({
    geometry: new Cesium.RectangleGeometry({
        rectangle: Cesium.Rectangle.fromDegrees(-100, 30, -90, 40),
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
    }),
    id: 'my rectangle',
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
    }
});

scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: instance,
        appearance: new Cesium.PerInstanceColorAppearance()
    })
);

const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

handler.setInputAction((movement) => {
    const pick = scene.pick(movement.position);
    if (Cesium.defined(pick) && pick.id === 'my rectangle') {
        alert('鼠标点击了矩形');
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);`,
    html
});

const code08 = ref({
    js: `const viewer = new Cesium.Viewer("cesium-container");
const scene = viewer.scene;

const ellipsoidGeometry = new Cesium.EllipsoidGeometry({
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    radii: new Cesium.Cartesian3(300000, 200000, 150000)
});

const cyanEllipsoidInstance = new Cesium.GeometryInstance({
    geometry: ellipsoidGeometry,
    modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(-100, 40)
        ),
        new Cesium.Cartesian3(0, 0, 150000),
        new Cesium.Matrix4()
    ),
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.CYAN)
    }
});

const orangeEllipsoidInstance = new Cesium.GeometryInstance({
    geometry: ellipsoidGeometry,
    modelMatrix: Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(-100, 40)
        ),
        new Cesium.Cartesian3(0, 0, 450000),
        new Cesium.Matrix4()
    ),
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.ORANGE)
    }
});

scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: [ cyanEllipsoidInstance, orangeEllipsoidInstance ],
        appearance: new Cesium.PerInstanceColorAppearance({
            translucent: false,
            closed: true
        })
    })
);`,
    html
});

const code09 = ref({
    js: `${ viewer }
const scene = viewer.scene;

const circleInstance = new Cesium.GeometryInstance({
    geometry: new Cesium.CircleGeometry({
        center: Cesium.Cartesian3.fromDegrees(-95, 43),
        radius: 250000,
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
    }),
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            new Cesium.Color(1, 0, 0, .5)
        )
    },
    id: 'circle'
});

const primitive = new Cesium.Primitive({
    geometryInstances: circleInstance,
    appearance: new Cesium.PerInstanceColorAppearance({
        translucent: false,
        closed: true
    })
});

scene.primitives.add(primitive);

setInterval(() => {
    const attributes = primitive.getGeometryInstanceAttributes('circle');
    attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
        Cesium.Color.fromRandom({ alpha: 1 })
    );
}, 2000);`,
    html
});

const code10 = ref({
    js: `// 也许是因为一个不透明的盒子，观众不会进入
// - 背面剔除并进行深度测试。无混合

const appearance = new Cesium.PerInstanceColorAppearance({
    translucent: false,
    closed: true
});

// 此外观与上面相同

const anotherAppearance = new Cesium.PerInstanceColorAppearance({
    renderState: {
        depthTest: {
            enabled: true
        },
        cull: {
            enabled: true,
            face: Cesium.CullFace.BACK
        }
    }
});`
});

const code11 = ref({
    js: `const geometry = new Cesium.RectangleGeometry({
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    // ...
});

const geometry2 = new Cesium.RectangleGeometry({
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    // ...
});

const appearance = new Cesium.MaterialAppearance(/* ... */);
const geometry3 = new Cesium.RectangleGeometry({
    vertexFormat: appearance.vertexFormat,
    // ...
});`
});

</script>

<template>
<div class="wrap">
    <div class="container">
        <h1>自定义几何体和外观<span>Custom Geometry & Appearances</span></h1>
        <p>该教程将教会大家如何使用Primitive API提供的几何体（Geometry）和外观（Appearances）系统。通过自定义网格、形状、体积和外观来扩展 CesiumJS ，它是一个高级主题，不适用于普通的 Cesium 用户。</p>
        <div class="note">
            <p>如果想学习如何在地球上绘制各种形状和体积，请查看<router-link :to="{ name: 'Creating-Entities' }" target="_blank">创建实体</router-link>教程。</p>
        </div>
        <h2>几何概述<span>Geometry overview</span></h2>
        <p>CesiumJS可以使用<span class="code">Entity</span>（实体）创建不同类型的几何体，比如多边形和椭球体。举例：将以下内容复制并粘贴到<a href="https://sandcastle.cesium.com/" target="_blank">Hello World Sandcastle</a>示例中，可以在地球上创建一个带点图案的矩形：</p>
        <cesium-example v-model="code01" height="250px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-extentPrimitive.png"></p>
        <p>在本教程中，将要深入了解构成实体的<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Geometry.html" target="_blank">几何</a></span>和<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Appearance.html" target="_blank">外观</a></span>类型。几何体定义了原始结构，即组成实体的<el-tooltip placement="top-start"><span class="code">基元</span><template #content>在计算机图形学中，基元通常指的是构成图像的最基本的几何元素，例如点、线、三角形等。<br>这些基本的几何元素可以组合和操作以创建更复杂的图像。</template></el-tooltip>：三角形、线条或点。外观定义了基元的着色方式，包括完整的GLSL顶点和片段着色器以及渲染状态。</p>
        <p>使用几何体和外观类型的好处包括以下几个方面：</p>
        <ul>
            <li><p><strong>性能</strong> - 当绘制大量静态的基本图元时（例如：每个邮政编码区域的多边形），几何结构可以直接将多个几何体组合为<strong>单个</strong>几何体，以降低<span class="code"><strong>CPU</strong></span>开销并更好地利用<span class="code"><strong>GPU</strong></span>。组合基本图元，是在Web Worker上完成的，以保持用户界面的响应性。</p></li>
            <li><p><strong>灵活性</strong> - <el-tooltip placement="top-start"><span class="code">基元</span><template #content>在计算机图形学中，基元通常指的是构成图像的最基本的几何元素，例如点、线、三角形等。<br>这些基本的几何元素可以组合和操作以创建更复杂的图像。</template></el-tooltip>结合了几何体和外观。通过解耦它们，我们可以独立地修改每个部分。我们可以添加与许多不同外观兼容的新几何体，反之亦然。</p></li>
            <li><p><strong>低级访问</strong> - Appearances（外观）提供了接近底层的访问，以此进行渲染，而不必担心：直接使用<a href="https://github.com/CesiumGS/cesium/wiki/Architecture#renderer" target="_blank">Renderer</a>（渲染器）时的所有细节。<br>
                外观使以下操作变得简单：<br>
                - 编写完整的GLSL顶点和片元着色器。<br>
                - 使用自定义的渲染状态。</p>
            </li>
        </ul>
        <p>当然也有一些缺点：</p>
        <ul>
            <li>直接使用几何体（Geometries）和外观（Appearances）需要更多的代码，和对图形更加深入理解。实体（Entity）的抽象级别，适用于绘制地图应用；几何体（Geometries）和外观（Appearances）的抽象级别，更接近传统的3D引擎。</li>
            <li>组合几何体适用于静态数据，且非常有效，但不一定适用于动态数据。</li>
        </ul>
        <p>让我们使用几何和外观重新编写初始的代码示例：</p>
        <cesium-example v-model="code02" height="540px" />
        <p>把矩形实体（Rectangle Entity）换成原始通用的基本图元<a href="https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html" target="_blank">Primitive</a>，它将几何实例（GeometryInstance）和外观（Appearance）组合在一起。</p>
        <p>目前，除了实例（instance）是几何体（geometry）的容器（container）之外，我们不会区分几何体（<a href="https://cesium.com/learn/cesiumjs/ref-doc/Geometry.html" target="_blank">Geometry</a>）和几何体实例（<a href="https://cesium.com/learn/cesiumjs/ref-doc/GeometryInstance.html" target="_blank">GeometryInstance</a>）。</p>
        <p>要创建一个矩形几何体，例如：一个覆盖并适应地球曲率的矩形区域的三角形几何体，我们可以使用<a href="https://cesium.com/learn/cesiumjs/ref-doc/RectangleGeometry.html" target="_blank">RectangleGeometry</a>（矩形几何体）创建。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-geometryWireframe.png"></p>
        <p>由于它位于椭球体表面上，所以要使用<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/EllipsoidSurfaceAppearance.html" target="_blank">EllipsoidSurfaceAppearance</a></span>。根据几何体在曲面上或处于椭球体上方固定高度的事实进行假设，可以节省内存。</p>
        <h2>几何体类型<span>Geometry types</span></h2>
        <p>CesiumJS支持以下几何体类型：</p>
        <table>
            <thead>
                <tr>
                    <th>几何体</th>
                    <th>轮廓</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">BoxGeometry</span></td>
                    <td><span class="code">BoxOutlineGeometry</span></td>
                    <td>盒子</td>
                </tr>
                <tr>
                    <td><span class="code">CircleGeometry</span></td>
                    <td><span class="code">CircleOutlineGeometry</span></td>
                    <td>圆形或挤压圆形</td>
                </tr>
                <tr>
                    <td><span class="code">CorridorGeometry</span></td>
                    <td><span class="code">CorridorOutlineGeometry</span></td>
                    <td>一个垂直于表面的折线走廊，具有以米为单位的宽度和可选的挤压高度</td>
                </tr>
                <tr>
                    <td><span class="code">CylinderGeometry</span></td>
                    <td><span class="code">CylinderOutlineGeometry</span></td>
                    <td>圆柱体、圆锥体或截锥体。</td>
                </tr>
                <tr>
                    <td><span class="code">EllipseGeometry</span></td>
                    <td><span class="code">EllipseOutlineGeometry</span></td>
                    <td>椭圆或挤压椭圆</td>
                </tr>
                <tr>
                    <td><span class="code">EllipsoidGeometry</span></td>
                    <td><span class="code">EllipsoidOutlineGeometry</span></td>
                    <td>椭球体</td>
                </tr>
                <tr>
                    <td><span class="code">RectangleGeometry</span></td>
                    <td><span class="code">RectangleOutlineGeometry</span></td>
                    <td>矩形或挤压矩形</td>
                </tr>
                <tr>
                    <td><span class="code">PolygonGeometry</span></td>
                    <td><span class="code">PolygonOutlineGeometry</span></td>
                    <td>一个可选择带有孔洞的多边形或者挤压多边形</td>
                </tr>
                <tr>
                    <td><span class="code">PolylineGeometry</span></td>
                    <td><span class="code">SimplePolylineGeometry</span></td>
                    <td>一组带有像素宽度的线段</td>
                </tr>
                <tr>
                    <td><span class="code">PolylineVolumeGeometry</span></td>
                    <td><span class="code">PolylineVolumeOutlineGeometry</span></td>
                    <td>沿着一条折线挤压的二维形状</td>
                </tr>
                <tr>
                    <td><span class="code">SphereGeometry</span></td>
                    <td><span class="code">SphereOutlineGeometry</span></td>
                    <td>球体</td>
                </tr>
                <tr>
                    <td><span class="code">WallGeometry</span></td>
                    <td><span class="code">WallOutlineGeometry</span></td>
                    <td>垂直于地球的墙</td>
                </tr>
            </tbody>
        </table>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-geometryAndAppearancesDemo.png"></p>
        <p><a href="https://sandcastle.cesium.com/?src=Geometry%20and%20Appearances.html" target="_blank" class="btn-sandcastle">在Sandcastle中演示</a></p>
        <cesium-example v-model="code03" height="400px" />
        <h2>组合几何体<span>Combining geometries</span></h2>
        <p>当我们使用一个<el-tooltip placement="top-start"><span class="code">基元</span><template #content>在计算机图形学中，基元通常指的是构成图像的最基本的几何元素，例如点、线、三角形等。<br>这些基本的几何元素可以组合和操作以创建更复杂的图像。</template></el-tooltip>（primitive）来绘制多个静态几何体时，我们会获得性能上的优势。例如，可以在一个基元中绘制两个矩形。</p>
        <cesium-example v-model="code04" height="480px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-combine.png"></p>
        <p>我们创建了两一个<strong>不同</strong>的矩形<span class="code">几何体实例</span>（GeometryInstance），然后将这两个实例（GeometryInstance）都提供给了图元（Primitive）。这样可以使用相同的外观绘制这两个实例。</p>
        <p>某些外观（appearances）可以为实例（instance）提供独特的属性。例如，我们可以使用<a href="https://cesium.com/learn/cesiumjs/ref-doc/PerInstanceColorAppearance.html" target="_blank">PerInstanceColorAppearance</a>来给实例（instance）着上不同的颜色。</p>
        <cesium-example v-model="code05" height="545px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-combineColor.png"></p>
        <p>每个实例（instance）都有一个<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Color.html" target="_blank">Color</a></span>属性。这个基本图元使用（Primitive）使用<span class="code">PerInstanceColorAppearance</span>进行构造，它使用实例（instance）自身的颜色属性来的决定着色效果。</p>
        <p>通过组合几何体，CesiumJS可以高效绘制大量的几何体。以下示例绘制了2,592个具有独特颜色的矩形。</p>
        <cesium-example v-model="code06" height="545px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/2013-11-04-extents.png"></p>
        <h2>拾取<span>Picking</span></h2>
        <p>在将实例组合后，它们可以独立访问。给每个实例分配一个<span class="code">id</span>，并使用该id来确定实例是否可以通过<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Scene.html#pick" target="_blank">Scene.pick</a></span>方法进行拾取。</p>
        <p>以下示例创建了一个带有<span class="code">id</span>的实例，并在单击时向控制台输出消息。</p>
        <cesium-example v-model="code07" height="545px" />
        <p>使用<span class="code">id</span>，可以避免：在构建完<el-tooltip placement="top-start"><span class="code">基元</span><template #content>在计算机图形学中，基元通常指的是构成图像的最基本的几何元素，例如点、线、三角形等。<br>这些基本的几何元素可以组合和操作以创建更复杂的图像。</template></el-tooltip>后，将完整实例（包括几何体）的引用保留在内存中。</p>
        <h2>几何体实例<span>Geometry instances</span></h2>
        <p>实例可以用于在场景的不同位置上对<strong>同一个</strong>几何体进行定位、缩放和旋转操作。这是因为多个实例可以引用<strong>同一个</strong><span class="code">Geometry</span>（几何体），并且每个实例可以拥有不同的<span class="code">modelMatrix</span>（模型矩阵）。因此我们只需要计算一次几何体，然后可以多次复用它。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-creating-entities-geometryInstance.png"></p>
        <p>以下示例创建了一个<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/EllipsoidGeometry.html" target="_blank">EllipsoidGeometry</a></span>（椭球几何体）和两个<span class="code">Instance</span>（实例）。这两个实例都引用这一个椭球几何体，通过使用不同的<span class="code">modelMatrix</span>（模型矩阵）将它们定位到不同位置，让其中一个椭球位于另一个椭球的上方。</p>
        <cesium-example v-model="code08" height="600px" />
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-ellipsoidInstances.png"></p>
        <h2>更新实例属性<span>Updating per-instance attributes</span></h2>
        <p>在将几何体（Geometry）添加到基元（Primitive）之后，更新实例（Instance）的属性以改变可视化效果。实例的属性包括：</p>
        <ul>
            <li>Color：一个用于确定实例的颜色的属性<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/ColorGeometryInstanceAttribute.html" target="_blank">ColorGeometryInstanceAttribute</a></span>。<el-tooltip placement="top-start"><span class="code">基元</span><template #content>在计算机图形学中，基元通常指的是构成图像的最基本的几何元素，例如点、线、三角形等。<br>这些基本的几何元素可以组合和操作以创建更复杂的图像。</template></el-tooltip>必须使用<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/PerInstanceColorAppearance.html" target="_blank">PerInstanceColorAppearance</a></span>来进行渲染。</li>
            <li>Show：一个布尔值，用于确定实例的可见性。适用于任何实例。</li>
        </ul>
        <p>以下示例展示了如何改变几何体实例的颜色：</p>
        <cesium-example v-model="code09" height="600px" />
        <p>通过<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html?classFilter=primitive#getGeometryInstanceAttributes" target="_blank">primitive.getGeometryInstanceAttributes</a></span>从<el-tooltip placement="top-start"><span class="code">基元</span><template #content>在计算机图形学中，基元通常指的是构成图像的最基本的几何元素，例如点、线、三角形等。<br>这些基本的几何元素可以组合和操作以创建更复杂的图像。</template></el-tooltip>中检索几何体实例的属性。可以直接更改属性的属性值。</p>
        <h2>外观<span>Appearances</span></h2>
        <p><span class="code">几何体</span>（Geometry）定义了结构。<el-tooltip placement="top-start"><span class="code">基元</span><template #content>在计算机图形学中，基元通常指的是构成图像的最基本的几何元素，例如点、线、三角形等。<br>这些基本的几何元素可以组合和操作以创建更复杂的图像。</template></el-tooltip>（Primitive）的另一个关键属性是：<span class="code">外观</span>（appearance），它定义了基元（Primitive）的着色方式，即每个像素如何着色。一个基元（Primitive）可以有多个几何体实例（GeometryInstance），但一个基元（Primitive）只能有一个外观（Appearance）。根据外观的类型，它会有一个<span class="code"><a href="https://github.com/CesiumGS/cesium/wiki/Fabric" target="_blank">material</a></span>（材质），该材质定义了大部分的着色方式。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-highLevelDesign.png"></p>
        <p title="CesiumJS has the following appearances:">CesiumJS具有以下外观效果：</p>
        <table>
            <thead>
                <tr>
                    <th>外观</th>
                    <th>说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="code">MaterialAppearance</span></td>
                    <td>适用于所有几何体类型的外观，支持用材质（Material）描述纹理效果。</td>
                </tr>
                <tr>
                    <td><span class="code">EllipsoidSurfaceAppearance</span></td>
                    <td>一种假设几何体与地球表面平行（如多边形）的<span class="code">MaterialAppearance</span>版本，利用这个假设，通过程序计算多个顶点属性来节省内存。</td>
                </tr>
                <tr>
                    <td><span class="code">PerInstanceColorAppearance</span></td>
                    <td>使用实例（per-instance）自身的颜色（Color）属性为自己着色。</td>
                </tr>
                <tr>
                    <td><span class="code">PolylineMaterialAppearance</span></td>
                    <td>支持使用材质（Material）为折线（Polyline）着色。</td>
                </tr>
                <tr>
                    <td><span class="code">PolylineColorAppearance</span></td>
                    <td>使用顶点（per-vertex）或线段（per-segment）的颜色（Color）属性来为折线（Polyline）着色。</td>
                </tr>
            </tbody>
        </table>
        <p>Appearances（外观）定义了完整的<el-tooltip content="GLSL着色器是一种编程语言，用于在图形处理单元（GPU）上执行特定的图形计算和渲染操作。" placement="top-start"><span class="code">GLSL</span></el-tooltip>着色器的顶点着色器（vertex shader）和片段着色器（fragment shader）的代码，它们在绘制图元时会被传送到GPU上执行。顶点着色器（vertex shader）负责处理每个顶点的位置、法线和纹理坐标等信息，而片段着色器（fragment shader）则负责处理生成每个像素的最终颜色。</p>
        <p>通过定义完整的GLSL顶点和片段着色器，可以实现各种高级渲染效果，如阴影、反射、抗锯齿等，以呈现出期望的图元外观。</p>
        <p>Appearances（外观）还定义了完整的渲染状态，该状态控制了在绘制图元时GPU的状态。</p>
        <p>这意味着通过定义外观，不仅可以自定义顶点着色器（vertex shader）和片段着色器（fragment shader），还可以定义在绘制图元时控制GPU状态的完整渲染状态。这些渲染状态在图元被绘制时被传输到GPU上，并在渲染过程中控制GPU的状态。</p>
        <p>通过定义完整的渲染状态，可以控制深度测试、剔除、混合、面向和背向剔除等渲染设置，以适应不同的需求和场景。</p>
        <p>我们可以直接定义渲染状态，也可以使用更高级的属性，例如<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/MaterialAppearance.html#closed" target="_blank">closed</a></span>和<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/MaterialAppearance.html#translucent" target="_blank">translucent</a></span>，外观将转化为渲染状态。例如：</p>
        <monaco-editor v-model="code10" height="400px" />
        <p>一旦创建了一个外观（Appearance），就无法更改其渲染状态（renderState）属性，因为这可能会导致与原始外观不兼容的渲染行为。但我们可以更改其材质（material）从而可以轻松地更改图元的外观效果，而无需重新定义整个外观。我们也可以更改图元（Primitive）的外观属性（appearance property），将图元的外观属性更改为另一个外观对象，从而更改整个图元的外观效果。这可以方便地实现不同场景和交互动作下的不同外观效果，并且可以在运行时动态更改外观属性。</p>
        <p>大多数外观还具有<a href="https://cesium.com/learn/cesiumjs/ref-doc/MaterialAppearance.html#flat" target="_blank">flat</a>和<a href="https://cesium.com/learn/cesiumjs/ref-doc/MaterialAppearance.html#faceForward" target="_blank">faceForward</a>属性，这两个属性间接影响GLSL着色器的行为。flat属性决定是否执行光照计算，而faceForward属性决定了图元表面法线的方向。通过调整这些属性，我们可以灵活控制图元的外观效果，并在需要时进行优化或特殊处理。</p>
        <ul>
            <li>flat - <el-tooltip placement="top-start"><span class="code">平面着色</span><template #content>在计算机图形学中，平面着色是一种简化的着色模型，其中每个面片或顶点都被着同样的颜色，而不考虑光照的影响。<br>这种着色方式忽略了顶点之间的平滑过渡，给图元增加了一种扁平、角锐的外观。</template></el-tooltip>。该属性是一个布尔值，用于指示是否禁用光照计算。当flat为true时，可以启用平面着色效果，图元将不会考虑光照效果，而是使用固定的颜色或纹理作为图元的外观。这意味着图元的每个面片或顶点被赋予相同的颜色，而不会受到光照方程的影响。这在一些特定的场景中非常有用，可以用于创建简单的、无光照的外观样式，比如创建简化的图形效果或需要明确的阴影效果。需要注意的是，使用平面着色会丧失平滑的表面过渡和真实感，因为没有考虑光照的影响。因此，平面着色通常适用于一些简单的二维图形或特定的艺术风格要求，而不适用于需要真实光照模型的场景。</li>
            <li>faceForward - faceForward属性也是一个布尔值，它控制了图元表面的<el-tooltip placement="top-start"><span class="code">法线</span><template #content>在光照模型中，法线是一个重要的概念，它表示表面在某一点的方向。<br>在Cesium中，外观（Appearance）对象可以包含一个法线（normal attribute），这个法线可以被光照方程用来计算光照效果。<br>然而，对于背面的图元，法线方向与观察方向相反，这意味着它们将不会受到光照的影响，而出现黑暗区域。</template></el-tooltip>方向。当faceForward为true时，图元表面的法线方向将与摄像机的观察方向一致，这可以确保图元始终面向观察者。无论观察者在哪个方向，图元的每个面都将受到光照计算的影响，这样可以避免在背面（Back-face）渲染时出现黑暗区域。例如墙壁内部。这在渲染透明物体时特别有用，可以避免背面渲染不可见的部分，从任何方向看都具有透明效果。需要注意的是，faceForward属性可能会略微影响模型外观，因为翻转法线方向会改变表面的颜色或纹理映射方向。因此，使用faceForward属性时应谨慎考虑，并根据需要进行调整。</li>
        </ul>
        <p><img alt="" src="/static/img/tutorial/cesium-js/5fc89576-3032-4f95-8187-fce2a2b6cd17_Geometries-flat.png"></p>
        <h2>几何体和外观兼容性<span>Geometry and appearance compatibility</span></h2>
        <p>并非所有的外观都适用于所有的几何体。例如，<span class="code">EllipsoidSurfaceAppearance</span>（椭球体表面外观）不适合用于<span class="code">WallGeometry</span>（墙体几何体），因为墙壁不在地球表面上。</p>
        <p>为了让外观与几何体兼容，它们的顶点格式必须匹配。顶点格式指的是顶点数据的组织方式和属性类型，例如每个顶点的位置坐标、法线方向、纹理坐标等。外观通过指定顶点格式来定义它所需的输入数据。</p>
        <p>如果外观期望的顶点格式与几何体提供的顶点数据不匹配，就会导致问题。例如，如果几何体没有提供外观需要的法线数据，那么在进行光照计算时将无法正确渲染外观。或者，如果外观期望的纹理坐标格式与几何体提供的纹理坐标格式不匹配，那么纹理将无法正确地映射到几何体上。</p>
        <p>因此，在使用外观和几何体时，确保它们具有匹配的顶点格式非常重要。这可以通过检查顶点属性的类型、数量和顺序等来实现。当外观和几何体具有匹配的顶点格式时，它们才能正确地合作，并且渲染出预期的视觉效果。</p>
        <p>在创建几何体时可以提供<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/VertexFormat.html" target="_blank">VertexFormat</a></span>（顶点格式）。</p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-compatible.png"></p>
        <p><img alt="" src="/static/img/tutorial/cesium-js/tutorials-geometry-and-appearances-notCompatible.png"></p>
        <p>一个几何体的<span class="code">vertexFormat</span>（顶点格式）决定了它是否可以与另一个几何体组合。两个几何体不必是相同类型，但它们需要匹配的顶点格式，否则它们将不能直接组合在一起。如果两个几何体的顶点格式不匹配，就需要进行顶点转换或者其他操作，以使它们具有相同的顶点格式。</p>
        <p>为了方便起见，外观要么具有一个<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/MaterialAppearance.html#vertexFormat" target="_blank">vertexFormat</a></span>属性，要么具有一个<span class="code"><a href="https://cesium.com/learn/cesiumjs/ref-doc/EllipsoidSurfaceAppearance.html#VERTEX_FORMAT" target="_blank">VERTEX_FORMAT</a></span>静态常量，可以作为选项传递给几何体。</p>
        <monaco-editor v-model="code11" height="320px" />
        <h2>资源<span>Resources</span></h2>
        <p>在参考文档中查看：</p>
        <ul>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/ndex.html?filter=Geometry" target="_blank">All geometries</a></li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/index.html?filter=Appearance" target="_blank">All appearances</a></li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html" target="_blank">Primitive</a></li>
            <li><a href="https://cesium.com/learn/cesiumjs/ref-doc/GeometryInstance.html" target="_blank">GeometryInstance</a></li>
        </ul>
        <p>更多关于材质的信息，请参阅<a href="https://github.com/CesiumGS/cesium/wiki/Fabric" target="_blank">Fabric</a>。</p>
        <p>有关未来计划，请参阅<a href="https://github.com/CesiumGS/cesium/issues/766" target="_blank">几何体和外观路线图</a>。</p>
        <el-affix position="bottom">
            <div class="origin"><a href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-geometry-appearances/" target="_blank" class="btn-sandcastle">原文</a></div>
        </el-affix>
    </div>
</div>
</template>
