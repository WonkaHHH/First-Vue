import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(Router)
app.mount('#app')
for (let iconName in ElementPlusIconsVue) {
    app.component(iconName, ElementPlusIconsVue[iconName])
}