import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Store from './store'
import ElementUI from 'element-ui'
import './assets/styles/reset.styl'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Vuex);
Vue.use(ElementUI);

const store = new Vuex.Store(Store);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
