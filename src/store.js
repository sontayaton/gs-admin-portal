import Vue from "vue";
import Vuex from "vuex";
import httpclient from "./httpclient";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
      localStorage.setItem("token", token);
    },
    auth_error(state) {
      state.status = "error";
      localStorage.removeItem("token");
    },
    logout(state) {
      state.status = "";
      state.token = "";
      localStorage.removeItem("token");
      console.log(state);
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        httpclient({
          url: process.env.VUE_APP_AUTH_ADMIN_LOGIN,
          data: user,
          method: "POST",
        })
          .then((resp) => {
            if (resp) {
              if (resp.status === 200) {
                const token = resp.data.accessToken;
                const user = resp.data.user;
                // console.log(JSON.stringify(resp))
                //localStorage.setItem("token", token);
                // Add the following line:
                //httpclient.defaults.headers.common["Authorization"] = token;
                commit("auth_success", token, user);
                resolve(resp);
                return;
              } else {
                
                commit("auth_error");
                reject(resp);
              }
            }
            // localStorage.removeItem("token");
            commit("auth_error");
            reject(resp);
          })
          .catch((err) => {
            commit("auth_error");
            // localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        httpclient({
          url: "http://localhost:3000/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            // Add the following line:
            // axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete httpclient.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    token: (state) => state.token,
  },
});
