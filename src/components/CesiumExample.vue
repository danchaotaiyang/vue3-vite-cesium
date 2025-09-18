<!--suppress JSUnresolvedLibraryURL -->
<script setup>
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';

import { VERSION } from 'cesium';

import { cesiumAccessTokenDefault } from '../assets/js/cfg.js';


const props = defineProps({
    modelValue: {
        type: [ Object, String ],
        default: () => ({})
    },
    title: {
        type: String,
        default: `Cesium ${ VERSION }`
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '130px'
    },
    runnerWidth: {
        type: Number,
        default: 1170
    },
    runnerHeight: {
        type: Number,
        default: 600
    },
    language: {
        type: String,
        default: ''
    },
    readOnly: {
        type: Boolean,
        default: false
    },
    options: {
        type: Object,
        default: () => ({})
    },
    accessToken: {
        type: String,
        default: cesiumAccessTokenDefault
    }
});

const emit = defineEmits([ 'update:modelValue', 'change' ]);

const editor = ref();

const state = reactive({
    value: null
});

const javascriptRef = computed(() => {
    return state.value && state.value[ 'javascript' ] || '';
});

const htmlRef = computed(() => {
    return state.value && state.value[ 'html' ] || '';
});

const cssRef = computed(() => {
    return state.value && state.value[ 'css' ] || '';
});

// 'vs'（默认）、'vs-dark'、'hc-black'、'hc-light'
const codeOptionRef = ref({
    theme: 'vs-dark'
});

const classRef = computed(() => {
    return `theme-${ codeOptionRef.value[ 'theme' ] }`;
});

const styleRef = computed(() => {
    return {
        width: props.width,
        height: props.height
    };
});

const optionsRef = computed(() => {
    return Object.assign({}, props.options, codeOptionRef.value);
});

const contentRef = computed(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
<title>${ props.title }</title>
<link href="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
<script src="https://cesium.com/downloads/cesiumjs/releases/${ VERSION }/Build/Cesium/Cesium.js"><\/script>
<script>
window.Cesium.Ion.defaultAccessToken = '${ props.accessToken }';
window.CESIUM_BASE_URL = '${ window.CESIUM_BASE_URL }';
<\/script>
<style>
html,body,.runner,.runner>#cesium-container{
    width:100%;
    height:100%;
    margin:0;
    padding:0;
}
${ cssRef.value }
<\/style>
<\/head>
<body>
<div class="runner">${ htmlRef.value }</div>
<script>
const startup = async (Cesium) => {
    'use strict';
    console.log(Cesium[ 'VERSION' ]);
    try {
        ${ javascriptRef.value }
    } catch (e) {
        console.warn(e);
    }
};
if (typeof window[ 'Cesium' ] !== 'undefined') {
    startup(window[ 'Cesium' ]).catch((error) => {
        "use strict";
        console.error(error);
    });
}
<\/script>
<\/body>
<\/html>`;
});

const codeExecute = () => {
    if (window.$runner) {
        window.$runner.close();
        window.$runner = null;
    }
    const { availWidth, availHeight, availLeft } = window.screen;
    const { runnerWidth, runnerHeight } = props;

    let width = Math.min(availWidth, runnerWidth);
    let height = Math.min(availHeight, runnerHeight);

    if (runnerWidth > availWidth - 100) {
        width -= 100;
    }
    if (runnerHeight > availHeight - 100) {
        height -= 100;
    }

    let top = Math.abs(availHeight - height) / 2 - 50;
    let left = Math.abs(availWidth - width) / 2 + availLeft;

    window.$runner = window.open('', '_blank', `width=${ width }, height=${ height }, top=${ top }, left=${ left }, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes`);
    window.$runner.document.title = props.title || '';
    window.$runner.document.write(contentRef.value);
};

const eventExecute = () => {
    codeExecute();
};

const setCode = () => {
    let value = {};
    if (typeof props.modelValue === 'string') {
        value = {
            html: props.modelValue
        };
    } else {
        for (const [ key, code ] of Object.entries(props.modelValue)) {
            let language = key;
            if (key === 'js') {
                language = 'javascript';
            }
            value[ language ] = code;
        }
    }
    state.value = value;
};

onBeforeMount(() => {
    setCode();
});

watch(() => state.value, () => {
    emit('change', state.value);
    emit('update:modelValue', state.value);
});
</script>

<template>
<div :class="classRef" :style="styleRef" class="cesium-example">
    <div class="editor-wrap">
        <monaco-editor ref="editor" v-model="state.value" :options="optionsRef" :read-only="props.readOnly" />
        <div class="action">
            <div class="execute" @click.stop="eventExecute">运行</div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.cesium-example {
    position: relative;
    margin-bottom: 10px;

    .editor-wrap {
        box-sizing: border-box;
        position: relative;
        height: 100%;
        padding-bottom: 24px;
    }

    .action {
        position: absolute;
        bottom: 0;
        right: 0;
        line-height: 1;

        .execute {
            background-color: #409EFF;
            color: #fff;
            cursor: pointer;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            height: 24px;
            padding: 0 12px;
            font-size: 12px;
        }
    }

    &.theme-vs-dark {
        background: #2e2e2f;
    }

    &.theme-hc-black {
        background: #222222;
    }

    &.theme-hc-light {
        background: #f0f0f0;
    }
}
</style>
