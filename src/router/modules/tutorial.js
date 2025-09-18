export default {
    path: '/tutorial',
    name: 'Tutorial',
    meta: {
        title: '官方教程',
        order: 100
    },
    redirect: { name: 'Home' },
    children: [
        /*  官方教程
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∵  */
        {
            path: '/tutorial/cesium-ion',
            name: 'CesiumIon',
            meta: {
                title: 'Cesium ion'
            },
            redirect: { name: 'Home' },
            children: [
                {
                    path: '/tutorial/cesium-ion/archives-and-exports',
                    name: 'Cesium-Ion-Archives-And-Exports',
                    meta: {
                        title: '存档和导出'
                    },
                    component: () => import('../../views/tutorial/00-cesium-ion/00-Archives-And-Exports.vue')
                },
                {
                    path: '/tutorial/cesium-ion/cesium-stories-overview',
                    name: 'Cesium-Ion-Cesium-Stories-Overview',
                    meta: {
                        title: 'Cesium故事'
                    },
                    children: [
                        {
                            path: '/tutorial/cesium-ion/stories-introduction',
                            name: 'Cesium-Ion-Stories-Introduction',
                            meta: {
                                title: 'Cesium故事简介'
                            },
                            component: () => import('../../views/tutorial/00-cesium-ion/01-Stories-Introduction.vue')
                        },
                        {
                            path: '/tutorial/cesium-ion/stories-styling',
                            name: 'Cesium-Ion-Stories-Styling',
                            meta: {
                                title: '设置3D瓦片样式'
                            },
                            component: () => import('../../views/tutorial/00-cesium-ion/02-Stories-Styling.vue')
                        },
                        {
                            path: '/tutorial/cesium-ion/stories-time-dynamic',
                            name: 'Cesium-Ion-Stories-Time-Dynamic',
                            meta: {
                                title: '可视化时变数据'
                            },
                            component: () => import('../../views/tutorial/00-cesium-ion/03-Stories-Time-Dynamic.vue')
                        }
                    ]
                },
                {
                    path: '/tutorial/cesium-ion/self-hosted',
                    name: 'Cesium-Ion-Self-Hosted',
                    meta: {
                        title: '自主托管'
                    },
                    component: () => import('../../views/tutorial/00-cesium-ion/04-Self-Hosted.vue')
                }
                // 延后
                /*{
                    path: '/tutorial/cesium-ion/integrations',
                    name: 'Cesium-Ion-Integrations',
                    meta: {
                        title: 'Cesium ion 集成'
                    },
                    redirect: { name: 'Home' },
                    children: [
                        {
                            path: '/tutorial/cesium-ion/integrations/integrations-3ds-max',
                            name: 'Cesium-Ion-Integrations-3ds-Max',
                            meta: {
                                title: '3ds Max'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/integrations/integrations-blender',
                            name: 'Cesium-Ion-Integrations-Blender',
                            meta: {
                                title: 'Blender'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/integrations/integrations-fme',
                            name: 'Cesium-Ion-Integrations-FME',
                            meta: {
                                title: 'FME'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/integrations/integrations-stk',
                            name: 'Cesium-Ion-Integrations-STK',
                            meta: {
                                title: 'STK'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/integrations/integrations-webodm',
                            name: 'Cesium-Ion-Integrations-WebODM',
                            meta: {
                                title: 'WebODM'
                            }
                        }
                    ]
                },
                {
                    path: '/tutorial/cesium-ion/integrate-with',
                    name: 'Cesium-Ion-Integrate-With',
                    meta: {
                        title: '与Cesium ion集成'
                    },
                    redirect: { name: 'Home' },
                    children: [
                        {
                            path: '/tutorial/cesium-ion/integrate-with/rest-api',
                            name: 'Cesium-Ion-Integrate-With-Rest-Api',
                            meta: {
                                title: 'REST API'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/integrate-with/ion-oauth2',
                            name: 'Cesium-Ion-Integrate-With-Ion-Oauth2',
                            meta: {
                                title: '使用 OAuth2'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/integrate-with/ion-upload-rest',
                            name: 'Cesium-Ion-Integrate-With-Ion-Upload-Rest',
                            meta: {
                                title: '使用REST上传3D数据'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/integrate-with/convert-gltf-to-3d-tiles',
                            name: 'Cesium-Ion-Integrate-With-Convert-Gltf-2-3D-Tiles',
                            meta: {
                                title: 'AWS：将glTF转换为3D瓦片'
                            }
                        }
                    ]
                },
                {
                    path: '/tutorial/cesium-ion/account',
                    name: 'Cesium-Ion-Account',
                    meta: {
                        title: '管理帐户'
                    },
                    redirect: { name: 'Home' },
                    children: [
                        {
                            path: '/tutorial/cesium-ion/account/access-tokens',
                            name: 'Cesium-Ion-Account-Access-Tokens',
                            meta: {
                                title: 'Cesium ion 访问 Token'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/account/optimizing-quotas',
                            name: 'Cesium-Ion-Account-Optimizing-Quotas',
                            meta: {
                                title: '优化SaaS账户配额'
                            }
                        },
                        {
                            path: '/tutorial/cesium-ion/account/teams',
                            name: 'Cesium-Ion-Account-Teams',
                            meta: {
                                title: 'Cesium ion 团队'
                            }
                        }
                    ]
                }*/
            ]
        },
        {
            path: '/tutorial/cesium-js',
            name: 'CesiumJS',
            meta: {
                title: 'CesiumJS'
            },
            redirect: { name: 'Home' },
            children: [
                {
                    path: '/tutorial/cesium-js/quickstart',
                    name: 'Quickstart',
                    meta: {
                        title: '快速入门'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/00-Quickstart.vue')
                },
                {
                    path: '/tutorial/cesium-js/flight-tracker',
                    name: 'Flight-Tracker',
                    meta: {
                        title: '飞行追踪器'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/01-Flight-Tracker.vue')
                },
                {
                    path: '/tutorial/cesium-js/interactive-building',
                    name: 'Proposed-Building',
                    meta: {
                        title: '可视化建筑物'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/02-Proposed-Building.vue')
                },
                {
                    path: '/tutorial/cesium-js/photorealistic-3d-tiles',
                    name: 'Photorealistic-3D-Tiles-In-CesiumJS',
                    meta: {
                        title: '实境3D瓦片'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/03-Photorealistic-3D-Tiles-In-CesiumJS.vue')
                },
                {
                    path: '/tutorial/cesium-js/3d-tiles-styling',
                    name: 'Style-&-Filter-3D-Tiles',
                    meta: {
                        title: '样式与过滤'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/04-Style-&-Filter-3D-Tiles.vue')
                },
                {
                    path: '/tutorial/cesium-js/camera',
                    name: 'Camera',
                    meta: {
                        title: '相机'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/05-Camera.vue')
                },
                {
                    path: '/tutorial/cesium-js/creating-entities',
                    name: 'Creating-Entities',
                    meta: {
                        title: '创建实体'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/06-Creating-Entities.vue')
                },
                {
                    path: '/tutorial/cesium-js/geometry-appearances',
                    name: 'Custom-Geometry-Appearances',
                    meta: {
                        title: '几何体与外观'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/07-Custom-Geometry-&-Appearances.vue')
                },
                {
                    path: '/tutorial/cesium-js/terrain',
                    name: 'Visualizing-3D-Terrain',
                    meta: {
                        title: '可视化3D地形'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/08-Visualizing-3D-Terrain.vue')
                },
                {
                    path: '/tutorial/cesium-js/imagery',
                    name: 'Visualizing-Imagery',
                    meta: {
                        title: '可视化影像'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/09-Visualizing-Imagery.vue')
                },
                {
                    path: '/tutorial/cesium-js/particle-systems',
                    name: 'Introduction-To-Particle-Systems',
                    meta: {
                        title: '粒子系统'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/10-Introduction-To-Particle-Systems.vue')
                }
            ]
        },
        {
            path: '/tutorial/3d-tiling',
            name: '3D-Tiling',
            meta: {
                title: '3D Tiling'
            },
            redirect: { name: 'Home' },
            children: [
                {
                    path: '/tutorial/3d-tiling/cesium-ion',
                    name: '3D-Tiling-Ion',
                    meta: {
                        title: '上传和瓦片处理'
                    },
                    redirect: { name: '3D-Tiling-Tiler-Data-Formats' },
                    children: [
                        {
                            path: '/tutorial/3d-tiling/cesium-ion/tiler-data-formats',
                            name: '3D-Tiling-Tiler-Data-Formats',
                            meta: {
                                title: '数据类型与格式'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/01-Tiler-Data-Formats.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/cesium-ion/ion-tile-3d-buildings',
                            name: '3D-Tiling-Ion-3D-Buildings',
                            meta: {
                                title: '3D建筑'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/02-Ion-3D-Buildings.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/cesium-ion/ion-tile-3d-models',
                            name: '3D-Tiling-Ion-3D-Models',
                            meta: {
                                title: '3D模型'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/03-Ion-3D-Models.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/cesium-ion/ion-tile-imagery',
                            name: '3D-Tiling-Ion-Imagery',
                            meta: {
                                title: '影像'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/04-Ion-Imagery.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/cesium-ion/ion-tile-photogrammetry',
                            name: '3D-Tiling-Ion-Photogrammetry',
                            meta: {
                                title: '摄影测绘'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/05-Ion-Photogrammetry.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/cesium-ion/ion-tile-point-clouds',
                            name: '3D-Tiling-Ion-Point-Clouds',
                            meta: {
                                title: '点云'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/06-Ion-Point-Clouds.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/cesium-ion/ion-tile-terrain',
                            name: '3D-Tiling-Ion-Terrain',
                            meta: {
                                title: '地形'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/07-Ion-Terrain.vue')
                        }
                    ]
                },
                {
                    path: '/tutorial/3d-tiling/CDB-to-3d-tiles',
                    name: '3D-Tiling-CDB-To-3D-Tiles',
                    meta: {
                        title: 'CDB转3D瓦片'
                    },
                    component: () => import('../../views/tutorial/02-3d-tiling/08-CDB-To-3D-Tiles.vue')
                },
                {
                    path: '/tutorial/3d-tiling/set-location-for-data',
                    name: '3D-Tiling-Set-Location-For-Data',
                    meta: {
                        title: '设置数据位置'
                    },
                    component: () => import('../../views/tutorial/02-3d-tiling/09-Set-Location-For-Data.vue')
                },
                {
                    path: '/tutorial/3d-tiling/on-prem',
                    name: '3D-Tiling-On-Prem',
                    meta: {
                        title: '瓦片与托管部署'
                    },
                    redirect: { name: '3D-Tiling-On-Prem-3D-Buildings' },
                    children: [
                        {
                            path: '/tutorial/3d-tiling/on-prem-3d-buildings',
                            name: '3D-Tiling-On-Prem-3D-Buildings',
                            meta: {
                                title: '建筑瓦片生成'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/10-On-Prem-3D-Buildings.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/on-prem-imagery',
                            name: '3D-Tiling-On-Prem-Imagery',
                            meta: {
                                title: '影像瓦片生成'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/11-On-Prem-Imagery.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/on-prem-reality',
                            name: '3D-Tiling-On-Prem-Reality',
                            meta: {
                                title: '实境瓦片生成'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/12-On-Prem-Reality.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/on-prem-model',
                            name: '3D-Tiling-On-Prem-Model',
                            meta: {
                                title: '模型瓦片生成'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/13-On-Prem-Model.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/on-prem-point-cloud',
                            name: '3D-Tiling-On-Prem-Point-Cloud',
                            meta: {
                                title: '点云瓦片生成'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/14-On-Prem-Point-Cloud.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/on-prem-terrain',
                            name: '3D-Tiling-On-Prem-Terrain',
                            meta: {
                                title: '地形瓦片生成'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/15-On-Prem-Terrain.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/on-prem-hosting-3d-content',
                            name: '3D-Tiling-On-Prem-Hosting-3D-Content',
                            meta: {
                                title: '托管3D内容'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/16-On-Prem-Hosting-3D-Content.vue')
                        },
                        {
                            path: '/tutorial/3d-tiling/on-prem-system-requirements',
                            name: '3D-Tiling-On-Prem-Hosting-System-Requirements',
                            meta: {
                                title: '系统要求'
                            },
                            component: () => import('../../views/tutorial/02-3d-tiling/17-On-Prem-System-Requirements.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/tutorial/photorealistic-3d-tiling',
            name: 'Photorealistic-3D-Tiles',
            meta: {
                title: 'Photorealistic 3D Tiles'
            },
            redirect: { name: 'Home' },
            children: [
                {
                    path: '/tutorial/photorealistic-3d-tiling/stories-introduction',
                    name: 'Photorealistic-3D-Tiles-Stories-Introduction',
                    meta: {
                        title: '无代码实境3D瓦片'
                    },
                    component: () => import('../../views/tutorial/00-cesium-ion/01-Stories-Introduction.vue')
                },
                {
                    path: '/tutorial/photorealistic-3d-tiling/photorealistic-3d-tiles-in-cesium-js',
                    name: 'Photorealistic-3D-Tiles-In-CesiumJS-2',
                    meta: {
                        title: 'CesiumJS中的实境3D瓦片'
                    },
                    component: () => import('../../views/tutorial/01-cesium-js/03-Photorealistic-3D-Tiles-In-CesiumJS.vue')
                },
                // 延后
                /*{
                    path: '/tutorial/photorealistic-3d-tiling/unreal-photorealistic-3d-tiles',
                    name: 'Photorealistic-3D-Tiles-In-Unreal',
                    meta: {
                        title: 'Unreal中的实境3D瓦片'
                    }
                },
                {
                    path: '/tutorial/photorealistic-3d-tiling/unity-photorealistic-3d-tiles',
                    name: 'Photorealistic-3D-Tiles-In-Unity',
                    meta: {
                        title: 'Unity中的实境3D瓦片'
                    }
                },
                {
                    path: '/tutorial/photorealistic-3d-tiling/omniverse-photorealistic-3d-tiles',
                    name: 'Photorealistic-3D-Tiles-In-Omniverse',
                    meta: {
                        title: 'Omniverse中的实境3D瓦片'
                    }
                },*/
                {
                    path: '/tutorial/photorealistic-3d-tiling/travel-time-cesium-js-photorealistic-3d-tiles-arcgis',
                    name: 'Photorealistic-3D-Tiles-Travel-Time',
                    meta: {
                        title: 'ArcGIS位置服务可视化旅行时间'
                    },
                    component: () => import('../../views/tutorial/03-photorealistic-3d-tiling/06-Photorealistic-3D-Tiles-Travel-Time.vue')
                }
            ]
        }
        // Unity 模块无法安装
        /*{
            path: '/tutorial/unity',
            name: 'Cesium-For-Unity',
            meta: {
                title: 'Cesium for Unity'
            },
            redirect: { name: 'Home' },
            children: [
                {
                    path: '/tutorial/unity/quickstart',
                    name: 'Cesium-For-Unity-Quickstart',
                    meta: {
                        title: '快速入门'
                    },
                    component: () => import('../../views/tutorial/04-cesium-for-unity/00-Unity-Quickstart.vue')
                },
            ]
        }*/

        /*  官方教程
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∴  */
    ]
};
