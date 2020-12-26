import Vue from "vue";
import VueRouter from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";


// mouting point for the whole app

import App from "@/App.vue";


//Vuetify

import vuetify from '@/plugins/vuetify'




// dependency

import store from './store'
import Axios from 'axios'

import router from './router'

// routes
import VueConfirmDialog from 'vue-confirm-dialog'

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)






// app config

// authen config
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.config.productionTip = false;

Vue.use(VueRouter);

//Vue.use(vuetify);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
