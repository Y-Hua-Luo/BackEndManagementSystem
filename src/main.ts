import { createApp } from 'vue'
// 从stores里引入pinia
import pinia from './stores'
// 引入scss全局样式
import '@/styles/index.scss'
// 引入ElementPlus样式库，否则插件按需引入时没有样式
import 'element-plus/dist/index.css'
// svg注册script
import 'virtual:svg-icons-register'

import App from './App.vue'

// 导入路由鉴权文件
import router from './permission.ts'

const app = createApp(App)

// 全局导入全部elementPlus组件库的icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)

app.mount('#app')
