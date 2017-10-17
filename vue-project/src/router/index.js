import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "Login" */  'containers/login')
        },
        {
            path: '/home',
            name: '首页111',
            redirect: '/home/form',
            component: () => import(/* webpackChunkName: "Home" */  'containers/home'),
            children: [{
                path: 'form',
                name: '表单',
                component: () => import(/* webpackChunkName: "Form" */  'components/form')
            }]
        }
    ]
})
