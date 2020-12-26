<template>
  <div class="flex flex-wrap mt-4">
   

    <div class="w-full mb-12 px-4 bg-gray-100"  data-app>
      <crud-table />
    </div>
  </div>
</template>
<script>

import CrudTable from "@/components/Tables/CrudTable.vue";

export default {
  components: {
    CrudTable
  },
};
</script>
