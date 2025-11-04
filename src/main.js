import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import Svgicon from '@/icons'
import 'element-plus/dist/index.css'
import '@/router/permission'
import * as ELIcons from '@element-plus/icons-vue'

const app = createApp(App)
for (const iconName in ELIcons) {
  app.component(iconName, ELIcons[iconName])
}
Svgicon(app)
app.use(store).use(router).mount('#app')
