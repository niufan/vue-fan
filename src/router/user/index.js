export default [
    {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/list')
    },
    {
        path: 'user/add',
        name: 'user.add',
        component: () => import(/* webpackChunkName: "user.add" */ '@/views/user/add')
    },
    {
        path: 'user/:id',
        name: 'user.show',
        component: () => import(/* webpackChunkName: "user.show" */ '@/views/user/show')
    },
    {
        path: 'user/:id/edit',
        name: 'user.edit',
        component: () => import(/* webpackChunkName: "user.edit" */ '@/views/user/edit')
    }
]