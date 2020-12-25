<template>
  <tr>
    <th
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center"
    >
      <span
        class="ml-3 font-bold"
        :class="[color === 'light' ? 'text-gray-700' : 'text-white']"
      >
        {{ user.username }}
      </span>
    </th>
    <td
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
    >
      {{ user.policy }}
    </td>
    <td
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
    >
      <i
        class="fas fa-circle  mr-2"
        :class="[user.status === 'enable' ? 'text-green-600' : 'text-red-500']"
      ></i>
      {{ user.status }}
    </td>
    <td
      class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right"
    >
      <button
        class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        @click.prevent="toggleModal(user)"
      >
        <i class="fas fa-user-edit"></i>
      </button>
      <button
        class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        @click.prevent="remove(user)"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
    <user-form
      :showModal.sync="showModal"
      :user.sync="user"
      v-bind:policies="policies"
      v-bind:modalTitle="modalTitle"
      v-bind:userData="user"
      v-bind:mode="mode"
      v-bind:disabled="true"
    />
  </tr>
</template>

<script>
import UserForm from "@/components/Users/UserForm.vue";
import httpclient from "@/httpclient";
export default {
  data() {
    return {
      showModal: false,
      modalTitle: "แก้ไขข้อมูลผู้ใช้งาน",
      mode: "update",
    };
  },
  props: {
    user: Object,
    policies: Array,
    color: {
      default: "light",
      validator: function(value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  components: {
    UserForm,
  },
  methods: {
    toggleModal: function(user) {
      this.showModal = !this.showModal;
      this.modalTitle = "แก้ไขข้อมูลผู้ใช้งาน";
      this.mode = "update";
      this.userData = user;
      console.log(user.username);
    },
    remove: function(user) {
      //let self = this;
      this.$confirm({
        title: "Information",
        message: `ต้องการลบ ${user.username} ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm) => {
          if (confirm) {
            // ... do something
            httpclient
              .delete(`${process.env.VUE_APP_USER_API}/admin/delete`, {
                data: {
                  username: user.username,
                },
              })
              .then((response) => {
                this.$confirm({
                  title: "Success",
                  message: `${response.data.message}`,
                  button: {
                    yes: "OK",
                  },
                  callback: () => {
                    httpclient
                      .get(`${process.env.VUE_APP_USER_API}/admin/all`)
                      .then((response) => {
                        this.$emit("update:users", response.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  },
                });

                //this.$emit("update:users", response.data);
                //this.$emit("update:showModal", !this.showModal);
              })
              .catch((err) => {
                this.$confirm({
                  title: "Error!!!",
                  message: `${err.response.data.message}`,
                  button: {
                    yes: "OK",
                  },
                  callback: () => {
                   
                  },
                });
              });
          }
        },
      });
    },
  },
};
</script>
