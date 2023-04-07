//无权限路由
const constantRouter = [
    {
        path: '/',
        component: () => import('@/views/layouts/index.vue'),
        redirect: '/home',
        meta: {
            title: '首页',
            keepAlive: false,
        }
    },
]

export default constantRouter