<template>
  <div class="flex flex-wrap mt-4">
     
    <div class="w-full mb-12 px-4">
      <user-lists v-bind:users="users" v-bind:policies="policies" />
    </div>
  </div>
</template>
<script>
import UserLists from "@/components/Users/UserLists.vue";
import httpclient from "@/httpclient"

export default {
  data(){
    return{
      users:[],
      policies:[]
    }

  },
  components: {
    UserLists,
    
  },
  mounted () {
    httpclient
      .get(`${process.env.VUE_APP_USER_API}/admin/all`)
      .then(response => {
        //console.log(response);
        this.users = response.data;
      });

    httpclient
      .get(`${process.env.VUE_APP_USER_API}/policy/all`)
      .then(response => {
        console.log(response);
        this.policies = response.data;
      })
    
  }
};
</script>
