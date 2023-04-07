import Vue from "vue";
import Router from "vue-router";
import constantRouter from './modules/constantRouter.js'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// hack router replace callback
const originalReplace = Router.prototype.push
Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(Router);
const commonRoutes = [
  {
  path: '/home',
  component: () => import('@/views/layouts/index.vue'),
},
{
  path:'/login',
  component:()=>import('@/views/login')
}
]

const routes = [...commonRoutes, ...constantRouter]
const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to,from,next)=>{
  if(to.path !=='/login'&&!window.localStorage.getItem('token')){
    // next('/login')
  }
  next()
})
export default router;