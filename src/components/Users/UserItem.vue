<template>
  <tr>
    <th
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center"
    >
      <span
        class="ml-3 font-bold"
        :class="[color === 'light' ? 'text-gray-700' : 'text-white']"
      >
        {{ username }}
      </span>
    </th>
    <td
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
    >
      {{ role }}
    </td>
    <td
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
    >
      <i
        class="fas fa-circle  mr-2"
        :class="[status === 'enable' ? 'text-green-600' : 'text-red-500']"
      ></i>
      {{ status }}
    </td>
    <td
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right"
    >
      <button
            class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            @click.prevent="toggleModal"
          >
           <i class="fas fa-user-edit"></i>
            
    </button>
    <button
            class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            @click.prevent=""
          >
           <i class="fas fa-trash-alt"></i>
            
    </button>
    </td>
    <user-form v-bind:modalTitle="modalTitle" v-bind:showModal="showModal" v-bind:username="username"/>
  </tr>
  
</template>

<script>
import UserForm from "@/components/Users/UserForm.vue";
export default {
  data() {
    return {
        showModal:false,
        modalTitle:"แก้ไขข้อมูลผู้ใช้งาน"
    }
  },
  props: {
    id: String,
    username: String,
    role: String,
    status: String,

    color: {
      default: "light",
      validator: function(value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  components: {
      UserForm
  },
  methods: {
    toggleModal: function(){
      this.showModal = !this.showModal;
      this.modalTitle = "แก้ไขข้อมูลผู้ใช้งาน"
    }
  },
};
</script>
