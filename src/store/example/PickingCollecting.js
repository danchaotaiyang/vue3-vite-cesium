import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import * as Cesium from 'cesium';
import { cameraView, fontFamilyData } from '@/config.js';
import { modifyAlpha } from '@/views/example/Blog/PickingCollecting/index.js';


export const usePickStore = defineStore('pick', () => {

    const editorRaw = {
        id: '',
        category: '',
        adding: false,
        waiting: false,
        creating: false,
        modifying: false,
        moving: false,
        flying: false,

        copySource: '',
        code: null,

        name: '',
        coordinates: [],
        description: ''
    };


    const categories = [
        {
            label: '点',
            value: 'point'
        },
        {
            label: '折线',
            value: 'polyline'
        },
        {
            label: '多边形',
            value: 'polygon'
        },
        {
            label: '矩形',
            value: 'rectangle'
        },
        {
            label: '圆',
            value: 'circle'
        },
        {
            label: '椭圆',
            value: 'ellipse'
        }
    ];

    const fontFamily = fontFamilyData.map(f => {
        if (typeof f === 'string') {
            return { label: f, value: f };
        } else {
            return { label: f[ 0 ], value: f[ 1 ] };
        }
    });

    const viewerRef = ref();

    const categoryValueRef = ref('point');

    const categoriesEntitiesRef = ref({});

    const entitiesAll = computed(() => {

        const __entities__ = [];

        for (const key in categoriesEntitiesRef.value) {

            let value = categoriesEntitiesRef.value[ key ];

            if (Array.isArray(value) && value.length) {
                __entities__.push(...value);
            }

            value = null;
        }

        return __entities__;
    });

    const category = computed(() => {
        return categories.find(d => d.value === categoryValueRef.value);
    });

    const entitiesRef = computed(() => {
        return categoriesEntitiesRef.value[ category.value.value ];
    });

    const entities = computed(() => entitiesRef.value);

    const viewer = computed(() => viewerRef.value);

    const categoryValue = computed(() => categoryValueRef.value);

    const categoriesEntities = computed(() => categoriesEntitiesRef.value);

    const editor = reactive({});

    const entityRef = computed(() => {
        if (!editor[ 'id' ]) {
            return null;
        }
        return entities.value.find(d => d.id === editor[ 'id' ]);
    });

    const entity = computed(() => entityRef.value);

    const tooltipRef = ref('');

    const tooltip = computed(() => tooltipRef.value);

    const createCesium = () => {
        let viewer = new Cesium.Viewer('cesium-container', {

            // 如果设置为 false，动画小部件将不会被创建。
            animation: false,

            // 如果设置为 false，基础图层选择器小部件将不会被创建。
            baseLayerPicker: false,

            // 如果设置为 false，全屏按钮小部件将不会被创建。
            fullscreenButton: false,

            // 如果设置为 true，VR按钮小部件将被创建。
            vrButton: false,

            // 如果设置为 false，主页按钮小部件将不会被创建。
            homeButton: false,

            // 如果设置为 false，信息框小部件将不会被创建。
            infoBox: true,

            // 如果设置为 false，场景模式选择器小部件将不会被创建。
            sceneModePicker: false,

            // 如果设置为 false，选择指示器小部件将不会被创建。
            selectionIndicator: false,

            // 如果设置为 false，时间线小部件将不会被创建。
            timeline: false,

            // 如果设置为 false，导航帮助按钮将不会被创建。
            navigationHelpButton: false,

            baseLayer: false,

            // terrain: Cesium.Terrain.fromWorldTerrain()
        });

        viewer[ '_cesiumWidget' ][ '_creditContainer' ][ 'style' ][ 'display' ] = 'none';
        viewer[ '_toolbar' ][ 'style' ][ 'display' ] = 'none';

        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(cameraView.longitude, cameraView.latitude, cameraView.height)
        });

        viewerRef.value = viewer;


    };

    const setAttribute = (attribute, index = 0) => {

        let value = editor[ attribute ];

        let entity = viewer.value.entities.getById(editor[ 'id' ]);
        let { __graphic__, label } = entity;
        let graphic = entity[ __graphic__ ];
        let hasGraphic = Cesium.defined(graphic);
        let hasLabel = Cesium.defined(label);

        let time = new Cesium.JulianDate();

        switch (attribute) {
            case 'graphicFill': {
                if (hasGraphic) {
                    if (graphic.color) {
                        graphic.color = Cesium.Color.fromCssColorString(value);
                    }
                    if (graphic.material) {
                        graphic.material = Cesium.Color.fromCssColorString(value);
                    }
                }
                break;
            }
            case 'graphicWidth': {
                if (hasGraphic) {
                    graphic.width = value;
                }
                break;
            }
            case 'graphicStroke': {
                if (hasGraphic) {
                    graphic.outlineColor = Cesium.Color.fromCssColorString(value);
                }
                break;
            }
            case 'graphicStrokeWidth': {
                if (hasGraphic) {
                    graphic.outlineWidth = value;
                    if (hasLabel) {
                        label.pixelOffset = new Cesium.Cartesian2(0, editor[ 'graphicPixelSize' ] / 2 + value + 2);
                    }
                }
                break;
            }
            case 'graphicPixelSize': {
                if (hasGraphic) {
                    graphic.pixelSize = value;
                    if (hasLabel) {
                        label.pixelOffset = new Cesium.Cartesian2(0, value / 2 + editor[ 'graphicStrokeWidth' ] + 2);
                    }
                }
                break;
            }
            case 'name': {
                entity.name = value;
                if (hasLabel) {
                    label.text = value;
                    editor.labelText = value;
                }
                break;
            }
            case 'labelFontWeight':
            case 'labelFontSize':
            case 'labelFontFamily': {
                if (hasLabel) {
                    label.font = `${ editor[ 'labelFontWeight' ] } ${ editor[ 'labelFontSize' ] }px ${ editor[ 'labelFontFamily' ] }`;
                }
                break;
            }
            case 'labelStrokeWidth': {
                if (hasLabel) {
                    label.outlineWidth = value;
                }
                break;
            }
            case 'labelStroke': {
                if (hasLabel) {
                    label.outlineColor = Cesium.Color.fromCssColorString(value);
                }
                break;
            }
            case 'labelFill': {
                if (hasLabel) {
                    label.fillColor = Cesium.Color.fromCssColorString(value);
                }
                break;
            }
            case 'labelShowBackground': {
                if (hasLabel) {
                    label.showBackground = value;
                }
                break;
            }
            case 'labelBackgroundPadding': {
                if (hasLabel) {
                    label.backgroundPadding = new Cesium.Cartesian2(value[ 0 ], value[ 1 ]);
                }
                break;
            }
            case 'labelBackgroundColor': {
                if (hasLabel) {
                    label.backgroundColor = Cesium.Color.fromCssColorString(value);
                }
                break;
            }
            case 'coordinates': {

                let __degrees__ = value[ index ];

                if (Array.isArray(value)) {

                    if (entity.position) {
                        entity.position = Cesium.Cartesian3.fromDegrees(__degrees__.longitude, __degrees__.latitude);
                    }

                    if (graphic.positions) {

                        let position = graphic.positions.getValue(time);
                        position[ index ] = Cesium.Cartesian3.fromDegrees(__degrees__.longitude, __degrees__.latitude);
                        graphic.positions = position;

                    }

                }

                __degrees__ = null;
                break;
            }
            case 'description': {
                entity.description = value;
                break;
            }
        }

        graphic = null;
        label = null;
        entity = null;

    };

    const setCategories = () => {
        for (const d of categories) {
            categoriesEntitiesRef.value[ d.value ] = [];
        }
    };

    const setExclude = (item) => {

        let time = new Cesium.JulianDate();

        for (let entity of viewer.value.entities.values) {

            if (item.id === entity.id) {
                continue;
            }

            let { __graphic__, label } = entity;
            let graphic = entity[ __graphic__ ];

            if (__graphic__ === 'point') {

                if (Cesium.defined(graphic)) {

                    let color = graphic.color.getValue(time);
                    entity[ '__graphic__color__' ] = color.toCssColorString();
                    graphic.color = color.withAlpha(modifyAlpha);

                    let outlineColor = graphic.outlineColor.getValue(time);
                    entity[ '__graphic__stroke__' ] = outlineColor.toCssColorString();
                    graphic.outlineColor = outlineColor.withAlpha(modifyAlpha);

                }

                if (Cesium.defined(label)) {

                    let fillColor = label.fillColor.getValue(time);
                    entity[ '__label__fill__color__' ] = fillColor.toCssColorString();
                    label.fillColor = fillColor.withAlpha(modifyAlpha);

                    let outlineColor = label.outlineColor.getValue(time);
                    entity[ '__label__stroke__' ] = outlineColor.toCssColorString();

                    let backgroundColor = label.backgroundColor.getValue(time);
                    if (Cesium.defined(backgroundColor)) {
                        entity[ '__label__background__' ] = backgroundColor.toCssColorString();
                        label.backgroundColor = backgroundColor.withAlpha(modifyAlpha);
                    }

                }
            }

            if (__graphic__ === 'polyline') {

                if (Cesium.defined(graphic)) {
                    let color = graphic.material.color.getValue(time);
                    entity[ '__graphic__color__' ] = color.toCssColorString();
                    graphic.material.color = color.withAlpha(modifyAlpha);
                }

            }

            if (__graphic__ === 'rectangle') {

                if (Cesium.defined(graphic)) {
                    let color = graphic.material.color.getValue(time);
                    entity[ '__graphic__color__' ] = color.toCssColorString();
                    graphic.material.color = color.withAlpha(modifyAlpha);
                }

            }

            label = null;
            graphic = null;
            entity = null;

        }

    };

    const setRestore = () => {

        for (let i = 0; i < viewer.value.entities.values.length; i++) {

            let entity = viewer.value.entities.values[ i ];

            if (entity.id === editor.id) {
                continue;
            }

            let { __graphic__, __graphic__color__, __graphic__stroke__, label } = entity;
            let graphic = entity[ __graphic__ ];

            if (Cesium.defined(graphic)) {

                if (__graphic__ === 'point') {

                    if (__graphic__color__) {
                        graphic.color = Cesium.Color.fromCssColorString(__graphic__color__);
                    }

                    if (__graphic__stroke__) {
                        graphic.outlineColor = Cesium.Color.fromCssColorString(__graphic__stroke__);
                    }

                }

                if (__graphic__ === 'polyline') {

                    if (__graphic__color__) {
                        graphic.material.color = Cesium.Color.fromCssColorString(__graphic__color__);
                    }

                }

                if (__graphic__ === 'polygon') {

                    if (__graphic__color__) {
                        graphic.material.color = Cesium.Color.fromCssColorString(__graphic__color__);
                    }

                }

                if (__graphic__ === 'rectangle') {

                    if (__graphic__color__) {
                        graphic.material.color = Cesium.Color.fromCssColorString(__graphic__color__);
                    }

                }

            }

            if (Cesium.defined(label)) {

                let { __label__fill__color__, __label__stroke__, __label__background__ } = entity;

                if (__label__fill__color__) {
                    label.fillColor = Cesium.Color.fromCssColorString(__label__fill__color__);
                }

                if (__label__stroke__) {
                    label.outlineColor = Cesium.Color.fromCssColorString(__label__stroke__);
                }

                if (__label__background__) {
                    label.backgroundColor = Cesium.Color.fromCssColorString(__label__background__);
                }

            }

            label = null;
            graphic = null;
            entity = null;

        }

        for (const key in editor) {
            if (typeof editorRaw[ key ] !== 'undefined') {
                editor[ key ] = editorRaw[ key ];
            } else {
                delete editor[ key ];
            }
        }

    };

    const removeById = (id) => {

        let entities = entitiesRef.value;

        let index = entities.findIndex((d) => d.id === id);

        if (index > -1) {
            viewer.value.entities.removeById(entities[ index ].id);
            entities.splice(index, 1);
        }

        entities = null;

    };

    const cleanAll = () => {

        viewer.value.entities.removeAll();

        setCategories();

    };

    const removeAll = () => {

        for (let entity of entities.value) {
            viewer.value.entities.remove(entity);
        }

        categoriesEntities.value[ category.value.value ] = [];

    };

    const flyTo = (destination) => new Promise((resolve, reject) => {
        try {

            editor.flying = true;

            viewer.value.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(destination.longitude, destination.latitude, viewer.value.camera.positionCartographic.height),
                duration: .3,
                complete: () => {

                    editor.flying = false;

                    resolve();

                }
            });

        } catch (e) {

            console.warn(e);

            reject(e);

            editor.flying = false;

        }
    });

    setCategories();

    const setCategoryValue = (index) => {
        categoryValueRef.value = index;
    };

    const setTooltip = (content) => {
        if (Cesium.defined(content)) {
            tooltipRef.value = content;
        } else {
            tooltipRef.value = '';
        }
    };

    return {
        viewer,

        editorRaw,

        categories,
        fontFamily,

        categoryValue,
        categoriesEntities,

        entitiesAll,
        category,
        entities,
        entity,

        createCesium,
        setAttribute,
        setExclude,
        setRestore,
        removeById,
        removeAll,
        cleanAll,
        flyTo,
        setCategoryValue,

        editor,

        tooltip,
        setTooltip
    };
});