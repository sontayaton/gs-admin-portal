<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
        >

          <div v-if="alertOpen" class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-600">
            <span class="text-xl inline-block mr-5 align-middle">
              <i class="fas fa-bell"></i>
            </span>
            <span class="inline-block px-3 align-middle mr-8">
              <b class="capitalize">{{error_message}}</b> 
            </span>
            <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 px-4 top-0 mt-4 mr-6 outline-none focus:outline-none" v-on:click="closeAlert()">
              <span>×</span>
            </button>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-gray-500 text-center mb-3 font-bold">
              <small>Sign in with credentials</small>
            </div>
            <form @submit.prevent="login">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Username
                </label>
                <input  v-model="username"
                  type="text"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Username"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input  v-model="password"
                  type="password"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-gray-700">
                    Remember me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button v-on:click="login" 
                  class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-gray-300">
              <small>Forgot password?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/auth/register" class="text-gray-300">
              <small>Create new account</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        username : "",
        password : "",
        alertOpen: false,
        error_message:""
      };
  },
  methods: {
      login: function () {
        let username = this.username
        let password = this.password
        this.$store.dispatch('login', { username, password })
       .then(() => this.$router.push('/admin/dashboard'))
       .catch(err => {

        console.log(JSON.stringify(err.message))
         this.alertOpen = true;
         this.error_message = "Invalid User or Password";
         this.$store.dispatch('logout');
         
         })
      },
      closeAlert: function(){
        this.alertOpen = false;
      }
    }
};
</script>
