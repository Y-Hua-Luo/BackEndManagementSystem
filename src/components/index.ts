// 引入需全局注册的组件
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'

// 引入全部elementPlus组件库的icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局组件对象
const globalComponents: any = {
  SvgIcon,
  Category,
}

// 插件：可以是一个拥有install()方法的对象，也可以直接是一个安装函数本身
export default {
  install(app: any) {
    // 遍历全局组件对象注册全局组件
    Object.keys(globalComponents).forEach((key) => {
      //注册为全局组件
      app.component(key, globalComponents[key])
    })
    // 全局注册elementPlus组件库的icon图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
