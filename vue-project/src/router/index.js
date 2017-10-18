import Vue from 'vue'
import Router from 'vue-router'
import marage from 'webpack-merge'
import menuM from './router-menu-m.js'
import menu from './router-menu-z'
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import(/* webpackChunkName: "Login" */  'containers/login')
        },
        {
            path: '/index',
            component: () => import(/* webpackChunkName: "home" */  'containers/home'),
            children:[...menuM,...menu]
        }
    ]
})
