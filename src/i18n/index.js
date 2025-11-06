import { createI18n } from 'vue-i18n'
import ZH from './zh'
const messages = {
  // en: {
  //   msg: {
  //     title: 'user login'
  //   }
  // },
  zh: {
    ...ZH
  }
}

const getCurrentLanguage = () => {
  const UAlang = navigator.language //获取浏览器语言
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  localStorage.setItem('lang', langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false, //使用 Composition API 模式
  globalInjection: true, //全局注入 $t 方法
  locale: getCurrentLanguage() || 'zh', //当前语言
  messages: messages
})

export default i18n
