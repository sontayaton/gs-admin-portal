<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-gray-200">
      <admin-navbar/>
     <header-default/>
      <div class="px-4 md:px-10 mx-auto w-full">
         
        <router-view />
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderDefault from "@/components/Headers/HeaderDefault.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import AdminNavbar from '@/components/Navbars/AdminNavbar.vue';
export default {
  name: "admin-layout",
  components: {
    Sidebar,
    FooterAdmin,
    AdminNavbar,
    HeaderDefault,
  },
};
</script>
