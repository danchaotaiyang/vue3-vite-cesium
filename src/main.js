import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import pinia from './store';
import router from './router';
import App from './App.vue';
import MonacoEditor from './components/MonacoEditor.vue';
import CesiumExample from './components/CesiumExample.vue';

import 'element-plus/dist/index.css';
import './assets/css/redefine.scss';
import './assets/css/layout.scss';


const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus, { locale: zhCn, size: 'small' });
for (const [ key, component ] of Object.entries(ElementPlusIcons)) {
    app.component(key, component);
}
app.component('MonacoEditor', MonacoEditor);
app.component('CesiumExample', CesiumExample);
app.mount('#app');
