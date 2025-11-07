import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// ElementPlus按需引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // svg文件目录
      symbolId: 'icon-[name]', // 生成的Symbol ID格式，与代码中#icon-phone对应
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 引入scss全局变量
  css: {
    preprocessorOptions: {
      scss: {
        // 通过@use引入的scss有独立的命名空间，需要以'scss文件名.变量名' 使用
        // as：取别名，as *表示取消独立命名空间，直接暴露在全局作用域，使用时则不需要scss文件名.变量名
        additionalData: "@use '@/styles/variable.scss' as *;",
      },
    },
  },
})
