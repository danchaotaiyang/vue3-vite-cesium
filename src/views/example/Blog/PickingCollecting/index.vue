<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { usePickStore } from '@/stores/example/PickingCollecting';
import * as point from './point';
import * as polyline from './polyline';
import * as polygon from './polygon';
import * as rectangle from './rectangle';
import * as circle from './circle';


const pickStore = usePickStore();

const entityEvents = computed(() => {
    switch (pickStore.category.value) {
        case 'polyline': {
            return polyline;
        }
        case 'polygon': {
            return polygon;
        }
        case 'rectangle': {
            return rectangle;
        }
        case 'circle': {
            return circle;
        }
        default: {
            return point;
        }
    }
});

const editor = computed(() => pickStore.editor);

const eventEntityCreate = () => {
    entityEvents.value.entityCreate();
};

const eventEntityRemove = (item) => {
    pickStore.removeById(item.id);
};

const eventEntityModify = (item) => {
    entityEvents.value.entityModify(item);
};

const eventEntityModifyConfirm = () => {
    entityEvents.value.entityModifyConfirm();
};

const eventEntityModifyCancel = () => {
    entityEvents.value.entityModifyCancel(editor);
};

const eventEntityModifyRestore = () => {
    entityEvents.value.entityModifyRestore();
};

const eventEntitySetAttribute = (attr, index = 0) => {

    pickStore.setAttribute(attr, index);

    entityEvents.value.entityModifyPosition(index);

};

const eventEntityClean = () => {
    pickStore.removeAll();
};

const eventEntityCleanAll = () => {
    pickStore.cleanAll();
};

const eventEntityCopy = (item) => {
    entityEvents.value.entityCopy(item, editor);
};

const eventEntityCopyAll = () => {
    entityEvents.value.entityCopyApplyAll();
};

const eventEntityClick = (item) => {
    let { viewer, editor } = pickStore;
    if (editor.copySource) {
        entityEvents.value.entityCopyApply(item);
        editor.copySource = '';
    } else {
        let entity = viewer.entities.getById(item.id);
        entityEvents.value.entityAim(entity);
    }
};

/*  面板功能
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/

const panel = reactive({
    height: 0,
    clientHeight: 0
});
const panelBodyRef = ref();
const panelBodyStyle = computed(() => {

    let height = `auto`;

    if (panel.height >= panel.clientHeight - 100) {

        height = `${ panel.clientHeight - 100 }px`;

    }

    return {
        height
    };

});

const setPanelHeight = () => {
    panel.clientHeight = window.innerHeight;
    panel.height = 0;
    nextTick(() => {
        if (panelBodyRef.value) {
            panel.height = panelBodyRef.value.clientHeight;
        }
    });
};

/*  Lifecycle
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────*/

watch(() => pickStore.entities, () => {
    setPanelHeight();
});

onMounted(() => {
    pickStore.createCesium();
    setPanelHeight();
});

window.addEventListener('resize', () => {
    pickStore.viewer.scene.requestRender();
    setPanelHeight();
}, false);

</script>

<template>
<div id="cesium-container" :class="{ 'padding-view': editor.modifying, 'cursor-cross-hair': editor.adding, 'cursor-move': editor.moving }" class="fullscreen"></div>
<div v-show="!editor.modifying" class="panel">
    <div class="panel-head">
        <el-radio-group :disabled="editor.adding || editor.modifying" :model-value="pickStore.categoryValue" class="categories" fill="#14838d" @change="pickStore.setCategoryValue">
            <el-radio-button v-for="(item, index) in pickStore.categories" :key="index" :value="item.value">{{ item.label }}</el-radio-button>
        </el-radio-group>
    </div>
    <div ref="panelBodyRef" class="panel-body">
        <el-scrollbar v-if="pickStore.entities.length" :style="panelBodyStyle" always>
            <div class="collections">
                <div v-for="(item) in pickStore.entities" :key="item.id" :class="{ 'entity-no-action': editor.adding || editor.modifying || editor.copySource, 'cursor-cross-hair': editor.copySource && editor.copySource !== item.id, 'cursor-not-allowed': editor.copySource && editor.copySource === item.id }" class="collection">
                    <div class="entity-label" @click.stop="eventEntityClick(item)">
                        <i :style="{ background: item.graphicFill, border: `2px solid ${ item.graphicStrokeWidth && item.graphicStroke ? item.graphicStroke : 'transparent' }` }" class="entity-color"></i> {{ item.name }}
                    </div>
                    <div class="entity-action" @click.stop="eventEntityCopy(item)">
                        <el-icon color="#fff">
                            <component is="MagicStick" />
                        </el-icon>
                    </div>
                    <div class="entity-action" @click.stop="eventEntityModify(item)">
                        <el-icon color="#fff">
                            <component is="Edit" />
                        </el-icon>
                    </div>
                    <el-popconfirm :hide-after="0" :title="`确认删除【${ item.name }】?`" cancel-button-type="warning" width="auto" @confirm="eventEntityRemove(item)">
                        <template #reference>
                        <div class="entity-action">
                            <el-icon color="#fff">
                                <component is="Remove" />
                            </el-icon>
                        </div>
                        </template>
                    </el-popconfirm>
                </div>
            </div>
        </el-scrollbar>
    </div>
    <div class="panel-foot">
        <el-button-group v-if="pickStore.entitiesAll.length">
            <el-popconfirm :hide-after="0" cancel-button-type="warning" title="确认清除?" width="auto" @confirm="eventEntityCleanAll">
                <template #reference>
                <el-button :disabled="editor.adding || editor.modifying" type="danger">清除全部</el-button>
                </template>
            </el-popconfirm>
            <el-popconfirm v-if="pickStore.entities.length" :hide-after="0" :title="`确认清除?`" cancel-button-type="warning" width="auto" @confirm="eventEntityClean">
                <template #reference>
                <el-button :disabled="editor.adding || editor.modifying" type="danger">清除{{ pickStore.category.label }}</el-button>
                </template>
            </el-popconfirm>
        </el-button-group>
        <el-button :disabled="editor.wating" :type="editor.adding ? 'warning' : 'success'" class="pick" @click.stop="eventEntityCreate">{{ editor.adding ? '结束' : '开始' }}拾取{{ pickStore.category.label }}</el-button>
    </div>
</div>
<div v-if="editor.modifying" class="modify">
    <div class="editor">
        <div class="form">
            <el-scrollbar always class="form-scroll">
                <div class="form-wrap">
                    <el-form label-position="left" label-width="3em">
                        <el-form-item label="名称">
                            <div class="attributes">
                                <div class="item-field label">
                                    <el-input v-model="editor.name" @input="eventEntitySetAttribute('name')" />
                                </div>
                            </div>
                            <template v-if="editor.labelText">
                            <div class="attributes">
                                <div class="item-field">
                                    <div class="item-label">颜色</div>
                                    <div class="item-value">
                                        <div class="item-value-input">
                                            <el-color-picker v-model="editor.labelFill" show-alpha @change="eventEntitySetAttribute('labelFill')" />
                                        </div>
                                    </div>
                                </div>
                                <div class="item-field">
                                    <div class="item-label">描边</div>
                                    <div class="item-value">
                                        <div class="item-value-color">
                                            <el-color-picker v-model="editor.labelStroke" show-alpha @change="eventEntitySetAttribute('labelStroke')" />
                                        </div>
                                        <div class="item-value-input number">
                                            <el-input-number v-model="editor.labelStrokeWidth" :max="6" :min="0" controls-position="right" @change="eventEntitySetAttribute('labelStrokeWidth')" />
                                        </div>
                                    </div>
                                </div>
                                <div class="item-field">
                                    <div class="item-label">字号</div>
                                    <div class="item-value">
                                        <div class="item-value-input number">
                                            <el-input-number v-model="editor.labelFontSize" :min="12" controls-position="right" @change="eventEntitySetAttribute('labelFontSize')" />
                                        </div>
                                    </div>
                                </div>
                                <div class="item-field">
                                    <div class="item-label">背景</div>
                                    <div class="item-value">
                                        <div class="item-value-input">
                                            <el-switch v-model="editor.labelShowBackground" @change="eventEntitySetAttribute('labelShowBackground')" />
                                        </div>
                                        <div class="item-value-input">
                                            <el-color-picker v-model="editor.labelBackgroundColor" :disabled="!editor.labelShowBackground" show-alpha @change="eventEntitySetAttribute('labelBackgroundColor')" />
                                        </div>
                                    </div>
                                </div>
                                <div class="item-field">
                                    <div class="item-label">边距</div>
                                    <div class="item-value">
                                        <div v-if="editor.labelBackgroundPadding" class="item-value-input number">
                                            <el-input-number v-model="editor.labelBackgroundPadding[ 0 ]" :disabled="!editor.labelShowBackground" :min="0" controls-position="right" @change="eventEntitySetAttribute('labelBackgroundPadding')" />
                                        </div>
                                        <div v-if="editor.labelBackgroundPadding" class="item-value-input number">
                                            <el-input-number v-model="editor.labelBackgroundPadding[ 1 ]" :disabled="!editor.labelShowBackground" :min="0" controls-position="right" @change="eventEntitySetAttribute('labelBackgroundPadding')" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="attributes">
                                <div class="item-field">
                                    <div class="item-label">字体</div>
                                    <div class="item-value">
                                        <div class="item-value-input font-family">
                                            <el-select v-model="editor.labelFontFamily" filterable @change="eventEntitySetAttribute('labelFontFamily')">
                                                <el-option v-for="(item, index) in pickStore.fontFamily" :key="index" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-field">
                                    <div class="item-label">粗细</div>
                                    <div class="item-value">
                                        <div class="item-value-input font-weight">
                                            <el-select v-model="editor.labelFontWeight" @change="eventEntitySetAttribute('labelFontWeight')">
                                                <el-option :value="300" label="细"></el-option>
                                                <el-option :value="500" label="正常"></el-option>
                                                <el-option :value="700" label="粗"></el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </template>
                        </el-form-item>
                        <el-form-item label="图形">
                            <div class="attributes">
                                <div v-if="editor.graphicFill" class="item-field">
                                    <div class="item-label">颜色</div>
                                    <div class="item-value">
                                        <div class="item-value-input">
                                            <el-color-picker v-model="editor.graphicFill" show-alpha @change="eventEntitySetAttribute('graphicFill')" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="editor.graphicStroke" class="item-field">
                                    <div class="item-label">描边</div>
                                    <div class="item-value">
                                        <div class="item-value-color">
                                            <el-color-picker v-model="editor.graphicStroke" show-alpha @change="eventEntitySetAttribute('graphicStroke')" />
                                        </div>
                                        <div class="item-value-input number">
                                            <el-input-number v-model="editor.graphicStrokeWidth" :min="0" controls-position="right" @change="eventEntitySetAttribute('graphicStrokeWidth')" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="editor.graphicPixelSize" class="item-field">
                                    <div class="item-label">直径</div>
                                    <div class="item-value">
                                        <div class="item-value-input number">
                                            <el-input-number v-model="editor.graphicPixelSize" :min="3" controls-position="right" @change="eventEntitySetAttribute('graphicPixelSize')" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="editor.graphicWidth" class="item-field">
                                    <div class="item-label">宽度</div>
                                    <div class="item-value">
                                        <div class="item-value-input number">
                                            <el-input-number v-model="editor.graphicWidth" :min="3" controls-position="right" @change="eventEntitySetAttribute('graphicWidth')" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="位置">
                            <div class="attributes" v-if="Array.isArray(editor.coordinates)">
                                <div v-for="(itm, idx) in editor.coordinates" :key="idx" class="coordinates">
                                    <div class="item-field-group">
                                        <div class="item-field">
                                            <div class="item-label">经度</div>
                                            <div class="item-value">
                                                <div class="item-value-input">
                                                    <el-input-number v-model="itm.longitude" controls-position="right" @change="eventEntitySetAttribute('coordinates', idx)" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-field">
                                            <div class="item-label">纬度</div>
                                            <div class="item-value">
                                                <div class="item-value-input">
                                                    <el-input-number v-model="itm.latitude" controls-position="right" @change="eventEntitySetAttribute('coordinates', idx)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="attributes" v-else>
                                <div v-for="(itm, idx) of editor.coordinates" :key="idx" class="coordinates">
                                    <div class="item-field-group">
                                        <div class="item-field">
                                            <div class="item-label">{{ idx }}</div>
                                            <div class="item-value">
                                                <div class="item-value-input">
                                                    <el-input-number v-model="editor.coordinates[ idx ]" controls-position="right" @change="eventEntitySetAttribute('coordinates', idx)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="注释">
                            <el-input v-model="editor.description" :autosize="{ maxRows: 10, minRows: 3 }" class="description" placeholder="说明描述" type="textarea" @input="eventEntitySetAttribute('description')" />
                        </el-form-item>
                    </el-form>
                </div>
            </el-scrollbar>
        </div>
        <div class="action">
            <el-popconfirm :title="`确认放弃当前${ pickStore.category.label }的修改?`" cancel-button-type="warning" width="auto" @confirm="eventEntityModifyCancel">
                <template #reference>
                <div class="entity-cancel">
                    <el-button :disabled="editor.moving" plain type="primary">取消</el-button>
                </div>
                </template>
            </el-popconfirm>
            <el-button-group>
                <el-popconfirm :title="`确认重置当前${ pickStore.category.label }?`" cancel-button-type="warning" width="auto" @confirm="eventEntityModifyRestore">
                    <template #reference>
                    <div class="entity-restore">
                        <el-button :disabled="editor.moving" type="warning">重置</el-button>
                    </div>
                    </template>
                </el-popconfirm>
            </el-button-group>
            <el-button-group>
                <el-popconfirm :title="`确认应用到全部?`" cancel-button-type="warning" width="auto" @confirm="eventEntityCopyAll">
                    <template #reference>
                    <el-button :disabled="editor.moving" type="primary">应用全部</el-button>
                    </template>
                </el-popconfirm>
                <el-button :disabled="editor.moving" type="success" @click.stop="eventEntityModifyConfirm">保存</el-button>
            </el-button-group>
        </div>
    </div>
    <div v-if="editor.code" class="editor-code">
        <monaco-editor :model-value="editor.code" height="500px" />
    </div>
</div>
<div v-if="pickStore.tooltip" class="tooltip">
    <div class="content">{{ pickStore.tooltip }}</div>
</div>
</template>

<style lang="scss" scoped>
.cursor-cross-hair {
    cursor: crosshair;
}

.cursor-move {
    cursor: move;
}

.cursor-not-allowed {
    cursor: not-allowed;
}

.fullscreen {
    background: #000;
    transition: all .3s ease;
    box-sizing: border-box;

    &.padding-view {
        padding-left: 663px;
    }
}

.panel {
    --panel-padding: 8px;

    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    min-width: 376px;
    background: rgba(255, 255, 255, .96);
    border-radius: 3px;

    .panel-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--panel-padding);

        .categories {
            .el-radio-button {
                width: 60px;

                .el-radio-button__inner {
                    display: block;
                    padding: 5px 0;
                }
            }
        }
    }

    .panel-body {
        position: relative;
        flex: 1;
        max-height: calc(100vh - 60px);

        .collections {
            position: relative;
            padding: 0 var(--panel-padding) 12px;

            .collection {
                --color-table-border: #e7e7e7;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 5px;
                border-radius: var(--el-border-radius-base);

                .entity-color {
                    width: 5px;
                    height: 5px;
                    margin-right: 5px;
                    border-radius: 50%;
                }

                .entity-label {
                    flex: 1;
                    display: flex;
                    align-items: center;
                }

                .entity-action {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 4px;
                    opacity: 0;
                    cursor: pointer;
                    font-size: 14px;
                }

                &:nth-child(odd) {
                    background: var(--el-fill-color-lighter);
                }

                &:hover {
                    background: var(--cesium-link-hover-color);
                    color: #fff;

                    .entity-action {
                        opacity: 1;
                    }
                }

                &.entity-no-action {
                    .entity-action {
                        display: none;
                    }
                }
            }
        }
    }

    .panel-foot {
        display: flex;
        justify-content: center;
        padding: var(--panel-padding);

        .pick {
            margin-left: 5px;
        }
    }
}

.modify {
    --panel-padding: 8px;

    position: absolute;
    top: 12px;
    bottom: 12px;
    left: 12px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    width: 640px;

    .editor {
        --editor-padding: 15px;

        flex: 1;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, .96);
        border-radius: var(--el-border-radius-base);

        .form {
            position: relative;
            flex: 1;

            .form-scroll {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;

                .form-wrap {
                    padding: var(--editor-padding);
                }

                .el-form-item {
                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                .attributes {
                    width: 100%;

                    .number {
                        width: 66px;
                    }

                    .label,
                    .coordinates,
                    .description {
                        width: 100%;
                    }

                    .font-weight {
                        width: 60px;
                    }

                    .font-family {
                        width: 118px;
                    }

                    .coordinates {
                        .item-field-group {
                            display: flex;

                            .item-field {
                                flex: 1;
                            }
                        }
                    }

                    & + .attributes {
                        margin-top: 2px;
                    }
                }
            }
        }

        .action {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: var(--panel-padding) 0;

            .entity-cancel,
            .entity-restore {
                display: flex;
                align-items: center;
            }

            .entity-restore {
                margin: 0 5px;
            }
        }
    }

    .editor-code {
        width: 100%;
        margin-top: var(--panel-padding);

        .monaco-editor-widget {
            margin-bottom: 0;
        }
    }

    /*.editor-toggle {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        height: 16px;
        padding: 8px;

        .toggle {
            cursor: pointer;
        }
    }

    &.expanded {
        width: 700px;
    }*/
}

.tooltip {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 8px 0;
    display: flex;
    justify-content: center;

    .content {
        padding: 4px 6px;
        background: var(--cesium-link-color);
        border-radius: var(--el-border-radius-base);
        font-size: 16px;
        line-height: 1;
        color: var(--cesium-link-underline-color);
    }
}

</style>

<style lang="scss">
.panel {
    .panel-head {
        .categories {
            .el-radio-button {
                width: 60px;

                .el-radio-button__inner {
                    display: block;
                    padding: 5px 0;
                }
            }
        }
    }
}
</style>
