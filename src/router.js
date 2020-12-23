import Vue from 'vue'
import VueRouter from "vue-router";
import store from './store'
// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";
import Users from "@/views/admin/Users.vue";
import Permissions from "@/views/admin/Permissions.vue"
// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
//import Index from "@/views/Index.vue";

Vue.use(VueRouter)


let router = new VueRouter({
    mode: 'history',
    routes: [
        
        {
          path: "/admin",
          redirect: "/admin/dashboard",
          component: Admin,
          children: [
            {
                path: "/admin/users",
                component:Users,
            },
            {
                path: "/admin/permissions",
                component:Permissions,
            },
            {
              path: "/admin/dashboard",
              component: Dashboard,
            },
            {
              path: "/admin/settings",
              component: Settings,
            },
            {
              path: "/admin/tables",
              component: Tables,
            },
            {
              path: "/admin/maps",
              component: Maps,
            },
            {
                path: "/admin/users",
                component: Users,
              },
          ],
        },
        {
          path: "/auth",
          redirect: "/auth/login",
          component: Auth,
          children: [
            {
              path: "/auth/login",
              component: Login,
            },
            {
              path: "/auth/register",
              component: Register,
            },
          ],
        },
        {
          path: "/landing",
          component: Landing,
        },
        {
          path: "/profile",
          component: Profile,
        },
        {
          path: "/",
          component: Admin,
        },
        { path: "*", redirect: "/" },
      ]
  })
  

  router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login')
    } else {
      store.dispatch('logout');
      next()
    }
  })


  export default router