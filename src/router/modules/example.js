export default {
    path: '/example',
    name: 'Example',
    meta: {
        title: '示例',
        order: 200
    },
    redirect: { name: 'Home' },
    children: [
        /*  CesiumJS
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∵  */
        {
            path: '/example/cesium-js',
            name: 'Example-Cesium-JS',
            meta: {
                title: 'CesiumJS'
            },
            children: [
                {
                    path: '/example/cesium-js/quickstart',
                    name: 'Example-Cesium-JS-Quickstart',
                    meta: {
                        title: '快速开始'
                    },
                    component: () => import('../../views/example/01-cesium-js/00-Quickstart.vue')
                },
                {
                    path: '/example/cesium-js/flight-tracker',
                    name: 'Example-Cesium-JS-Flight-Tracker',
                    meta: {
                        title: '飞行追踪器'
                    },
                    component: () => import('../../views/example/01-cesium-js/01-Flight-Tracker.vue')
                },
                {
                    path: '/example/cesium-js/proposed-building',
                    name: 'Example-Cesium-JS-Proposed-Building',
                    meta: {
                        title: '可视化建筑物'
                    },
                    component: () => import('../../views/example/01-cesium-js/02-Proposed-Building.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities',
                    name: 'Example-Cesium-JS-Creating-Entities',
                    meta: {
                        title: '创建实体'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-00-Creating-Entities.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-box',
                    name: 'Example-Cesium-JS-Creating-Entities-Box',
                    meta: {
                        title: '-Box'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-01-Creating-Entities-Box.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-ellipse',
                    name: 'Example-Cesium-JS-Creating-Entities-Ellipse',
                    meta: {
                        title: '-Ellipse'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-02-Creating-Entities-Ellipse.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-corridor',
                    name: 'Example-Cesium-JS-Creating-Entities-Corridor',
                    meta: {
                        title: '-Corridor'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-03-Creating-Entities-Corridor.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-cylinder',
                    name: 'Example-Cesium-JS-Creating-Entities-Cylinder',
                    meta: {
                        title: '-Cylinder'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-04-Creating-Entities-Cylinder.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-polygon',
                    name: 'Example-Cesium-JS-Creating-Entities-Polygon',
                    meta: {
                        title: '-Polygon'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-05-Creating-Entities-Polygon.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-polyline',
                    name: 'Example-Cesium-JS-Creating-Entities-Polyline',
                    meta: {
                        title: '-Polyline'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-06-Creating-Entities-Polyline.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-polyline-volume',
                    name: 'Example-Cesium-JS-Creating-Entities-Polyline-Volume',
                    meta: {
                        title: '-Polyline-Volume'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-07-Creating-Entities-Polyline-Volume.vue')
                },
                {
                    path: '/example/cesium-js/creating-entities-rectangle',
                    name: 'Example-Cesium-JS-Creating-Entities-Rectangle',
                    meta: {
                        title: '-Rectangle'
                    },
                    component: () => import('../../views/example/01-cesium-js/03-08-Creating-Entities-Rectangle.vue')
                }
            ]
        },
        /*  CesiumJS
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∴  */

        /*  Blog
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∴  */
        {
            path: '/example/blog',
            name: 'Example-Blog',
            meta: {
                title: 'Blog'
            },
            redirect: { name: 'Home' }
        },
        {
            path: '/example/blog/imagery-providers',
            name: 'Example-Blog-Imagery-Providers',
            meta: {
                title: '地图瓦片',
                description: 'Cesium加载百度，高德，腾讯，天地图，谷歌，Bing地图，ArcGIS，OpenStreetMap，MapBox的瓦片',
                updated: '2025年9月18日 16:19'
            },
            component: () => import('../../views/example/Blog/ImageryProviders/index.vue')
        },
        {
            path: '/example/blog/picking-collecting',
            name: 'Example-Blog-Picking-Collecting',
            meta: {
                title: '拾取采集',
                description: '点击添加可编辑点，拾取坐标并采集',
                updated: '2024年4月23日 18:30:06'
            },
            component: () => import('../../views/example/Blog/PickingCollecting/index.vue')
        },

        /*  BiliBili
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∵  */
        {
            path: '/example/bili-bili',
            name: 'Example-BiliBili',
            meta: {
                title: 'BiliBili'
            },
            redirect: { name: 'Home' },
            children: [
                {
                    path: '/example/bili-bili/Getting-Started-Quickly-in-Digital-Cities',
                    name: 'Example-BiliBili-Getting-Started-Quickly-in-Digital-Cities',
                    meta: {
                        title: '数字城市 - BiliBili',
                        description: 'Cesium打造数字城市快速上手课程【最新Vue3与Vite结合版】',
                        updated: '2023年12月21日 00:40:27'
                    },
                    component: () => import('../../views/example/BiliBili/01-Getting-Started-Quickly-in-Digital-Cities.vue')
                }
            ]
        },
        /*  BiliBili
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∴  */


        /*  Others
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∵  */
        {
            path: '/example/other',
            name: 'Example-Other',
            meta: {
                title: '其他'
            },
            redirect: { name: 'Home' },
            children: [
                {
                    path: '/example/other/offline',
                    name: 'Example-Other-Offline',
                    meta: {
                        title: '--'
                    }
                    // component: () => import('../../views/example/Others/Offline.vue')
                }
            ]
        }
        /*  Others
        ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  ∴  */
    ]
};
