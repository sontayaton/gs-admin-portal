<template>
  <div class="flex flex-wrap mt-4">
     
    <div class="w-full mb-12 px-4">
      <user-lists/>
    </div>
  </div>
</template>
<script>
import UserLists from "@/components/Users/UserLists.vue";


export default {
  components: {
    UserLists,
    
  },
};
</script>
