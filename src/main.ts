import { createApp } from 'vue'
// 从stores里引入pinia
import pinia from './stores'
// 引入scss全局样式
import '@/styles/index.scss'
// 引入ElementPlus样式库，否则插件按需引入时没有样式
import 'element-plus/dist/index.css'
// svg注册script
import 'virtual:svg-icons-register'
// 引入全局注册组件
import globalComponents from './components'
import App from './App.vue'
// 导入路由鉴权文件
import router from './permission.ts'

const app = createApp(App)

app.use(pinia)
app.use(router)
// 使用全局注册组件
app.use(globalComponents)

app.mount('#app')
