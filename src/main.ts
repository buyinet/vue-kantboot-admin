import App from './App.vue';

import { createApp } from 'vue';
import './style.css';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import Antd from 'ant-design-vue';
import * as AntIcons from '@ant-design/icons-vue';
import Kt from './components/kantboot';
import { setupStore } from './store';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    let keyName = "ElIcon"+key;
    app.component(keyName, component)
}
for (const [key, component] of Object.entries(AntIcons)) {
    let keyName = "AntIcon"+key;
    app.component(keyName, component)
}

setupStore(app);
app
    .use(router)
    .use(Antd)
    .use(ElementPlus)
    .use(Kt)
    .mount('#app')
