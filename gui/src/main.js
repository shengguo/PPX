/** 重置样式 */
import '@/styles/reset.css'
import 'uno.css'
import '@/styles/global.scss'
// import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 组件库 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式
app.use(ElementPlus)
import common from '@/utils/common/common.js'
import { setupStore } from '@/store'
setupStore(app)
// 图标库 ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`ele-${key}`, component)
}
// 自定义图标库
import SvgIcon from '@/components/SvgIcon/index.vue'
app.component('SvgIcon', SvgIcon)
//挂载到公共函数common
app.config.globalProperties.$common = common

app.mount('#app')
