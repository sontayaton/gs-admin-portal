import Vue from "vue";
import VueRouter from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";




// dependency

import store from './store'
import Axios from 'axios'

import router from './router'

// routes





// app config

// authen config
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}


Vue.config.productionTip = false;

Vue.use(VueRouter);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
