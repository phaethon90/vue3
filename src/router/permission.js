import router from './index'
import store from '@/store'

const whiteList = ['/login'] //白名单
router.beforeEach((to, from, next) => {
  //判断token是否存在
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      //token不存在且试图访问的页面不属于白名单，则转至登录页面
      next('/login')
    }
  }
})
