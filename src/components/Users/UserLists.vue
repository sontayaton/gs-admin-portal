<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-green-900 text-white']"
  >
  <user-form :bus="bus" ref="form"></user-form>
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex justify-between">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-gray-800' : 'text-white']"
          >
            ข้อมูลผู้ใช้งาน
          </h3>

          <button
            class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
            @click.prevent="toggleModal"
          >
            <i class="fas fa-user-plus"></i>
            เพิ่มผู้ใช้งาน
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="block w-full overflow-x-auto">
        <!-- Projects table -->
        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-gray-100 text-gray-600 border-gray-200'
                    : 'bg-green-800 text-green-300 border-green-700',
                ]"
              >
                Username
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-gray-100 text-gray-600 border-gray-200'
                    : 'bg-green-800 text-green-300 border-green-700',
                ]"
              >
                Role
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-gray-100 text-gray-600 border-gray-200'
                    : 'bg-green-800 text-green-300 border-green-700',
                ]"
              >
                Status
              </th>

              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-gray-100 text-gray-600 border-gray-200'
                    : 'bg-green-800 text-green-300 border-green-700',
                ]"
              ></th>
            </tr>
          </thead>
          <tbody>
            <user-item
              v-for="user in users"
              v-bind:key="user.id"
              v-bind:username="user.username"
              v-bind:role="user.role"
              v-bind:status="user.status"
            >
            </user-item>
          </tbody>
        </table>
      </div>
    </div>
    <user-form v-bind:modalTitle="modalTitle" v-bind:showModal="showModal"/>
  </div>
</template>
<script>
import Vue from 'vue'
import UserItem from "@/components/Users/UserItem.vue";

import UserForm from "@/components/Users/UserForm.vue";

export default {
  name: "regular-modal",
  data() {
    return {
      showModal: false,
      users: [
        { id: 1, username: "username", role: "superuser", status: "enable" },
        { id: 1, username: "username", role: "superuser", status: "disable" },
        { id: 1, username: "username", role: "superuser", status: "enable" },
      ],
      bus: new Vue(),
      modalTitle:"ข้อมูลผู้ใช้งาน"
    };
  },
  components: {
    UserItem,
    UserForm
  },
  props: {
    
    color: {
      default: "light",
      validator: function(value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    toggleModal: function(){
      this.showModal = !this.showModal;
      this.modalTitle = "เพิ่มข้อมูลผู้ใช้งาน"
    }
  },
};
</script>
