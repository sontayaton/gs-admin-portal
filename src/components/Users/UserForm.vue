<template>
  <div>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <h3 class="text-3xl font-semibold">
              {{ modalTitle }}
            </h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="close"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <form>
              <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                ข้อมูลผู้ใช้งาน
              </h6>
              <div class="flex flex-wrap">
                <div class="w-full lg:w-12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      ผู้ใช้งาน
                    </label>
                    <input
                      :disabled="disabled"
                      v-model="username"
                      type="text"
                      placeholder="ผู้ใช้งาน"
                      class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                    />
                    <span
                      class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
                    >
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="w-full lg:w-12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      รหัสผ่าน
                    </label>
                    <input
                      v-model="password"
                      @change="verifyPassword"
                      type="password"
                      placeholder="รหัสผ่าน"
                      class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                    />
                    <span
                      class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
                    >
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="w-full lg:w-12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      ยืนยัน รหัสผ่าน
                    </label>
                    <input
                      v-model="repassword"
                      @change="verifyPassword"
                      type="password"
                      placeholder="ยืนยัน รหัสผ่าน"
                      class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                    />
                    <span
                      class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
                    >
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                </div>

                <div class="w-full lg:w-12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      สิทธิ์ ผู้ใช้งาน
                    </label>
                  </div>
                  <drop-down-list
                    v-bind:items="policies"
                    :selected.sync="selected"
                  />
                </div>

                <div class="w-full lg:w-12 px-4">
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      สถานะ
                    </label>
                  </div>

                  <drop-down-list
                    v-bind:items="statusList"
                    :selected.sync="selectedStatusList"
                  />
                </div>
              </div>
            </form>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
          >
            <h3
              class="text-2xl font-normal leading-normal mt-0 mb-2 text-red-500"
            >
              {{ form.message }}
            </h3>

            <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="close"
            >
              Close
            </button>
            <button
              class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleModal('save')"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import DropDownList from "@/components/Dropdowns/DropDownList.vue";
import httpclient from "@/httpclient";
export default {
  components: { DropDownList },
  name: "regular-modal",

  data() {
    return {
      username: this.userData.username,
      password: "",
      repassword: "",
      matchPassword: false,
      policy: this.userData.policy,
      form: {
        message: "",
        status: "success",
      },
      selected: this.userData.policy,
      selectedStatusList: this.userData.status,
      statusList: ["enable", "disable"],
    };
  },
  props: {
    userData: Object,
    showModal: Boolean,
    modalTitle: String,
    policies: Array,
    mode: String,
    disabled: Boolean,
  },
  methods: {
    toggleModal: function(event) {
      if (event === "save") {
        // console.log(this.$refs.dropdownSelected.getSelected);
        if (this.mode === "add") {
          if (this.password === "" || this.repassword === "") {
            //this.matchPassword = false;
            this.$confirm({
              title: "Error!!!",
              message: `กรุณากรอกรหัสผ่าน!!!!!`,
              button: {
                yes: "OK",
              },
              callback: () => {},
            });
            return;
          }

          if (!this.matchPassword) {
            //this.matchPassword = false;
            this.$confirm({
              title: "Error!!!",
              message: `รหัสผ่านไม่ตรงกัน!!!!`,
              button: {
                yes: "OK",
              },
              callback: () => {},
            });
            return;
          }

          httpclient
            .post(`${process.env.VUE_APP_USER_API}/admin/create`, {
              username: this.username,
              password: this.password,
              group: this.selected,
              status: this.selectedStatusList,
            })
            .then((response) => {
              console.log(response);
              // this.showModal = !this.showModal;

              this.form.message = "Create success!!!";
              this.form.status = "success";
              this.username = "";
              this.password = "";
              this.repassword = "";
              this.policy = "";
              this.selected = "สิทธิ์การใช้งาน";
              this.selectedStatusList = "สถานะ";

              httpclient
                .get(`${process.env.VUE_APP_USER_API}/admin/all`)
                .then((response) => {
                  this.$confirm({
                    title: "Success!!!",
                    message: `${this.form.message}`,
                    button: {
                      yes: "OK",
                    },
                    callback: () => {
                      this.$emit("update:users", response.data);
                      this.$emit("update:showModal", !this.showModal);
                    },
                  });
                })
                .catch((err) => {
                  this.form.message = err.response.data.message;
                  this.form.status = "fail";
                  this.$confirm({
                    title: "Error!!!",
                    message: `${err.response.data.message}`,
                    button: {
                      yes: "OK",
                    },
                    callback: () => {},
                  });
                });

              //this.users = response.data;
            })
            .catch((err) => {
              console.log(err.response);
              this.form.message = err.response.data.message;
              this.form.status = "fail";
              this.$confirm({
                title: "Error!!!",
                message: `${err.response.data.message}`,
                button: {
                  yes: "OK",
                },
                callback: () => {},
              });
            });
        }
        if (this.mode === "update") {
          httpclient
            .put(`${process.env.VUE_APP_USER_API}/admin/update`, {
              username: this.username,
              password: this.password,
              group: this.selected,
              status: this.selectedStatusList,
            })
            .then((response) => {
              // console.log(response);
              // this.showModal = !this.showModal;
              this.form.message = "Update success!!!";
              // this.form.status = "success";
              // this.username = "";
              // this.password = "";
              // this.repassword = "";
              // this.policy = "";
              // this.selected = "สิทธิ์การใช้งาน";
              // this.selectedStatusList = "สถานะ";
              console.log(response.data);

              this.$confirm({
                title: "Success!!!",
                message: `${this.form.message}`,
                button: {
                  yes: "OK",
                },
                callback: () => {
                  this.$emit("update:user", response.data);
                  this.$emit("update:showModal", !this.showModal);
                },
              });

              //this.users = response.data;
            })
            .catch((err) => {
              //console.log(err);
              this.form.message = err.response.data.message;
              this.form.status = "fail";
              this.$confirm({
                title: "Error!!!",
                message: `${err.response.data.message}`,
                button: {
                  yes: "OK",
                },
                callback: () => {},
              });
            });
        }
      }
      return this.showModal;
    },
    close: function() {
      // this.showModal = !this.showModal;
      this.$emit("update:showModal", !this.showModal);
    },
    dropdownSelected: function(data) {
      console.log(data);
      this.policy = data;
    },
    verifyPassword: function() {
      console.log(`Pass : ${this.password} , Repass: ${this.repassword}`);
      if (this.password !== this.repassword) {
        this.matchPassword = false;
        this.form.message = "รหัสผ่านไม่ตรงกัน!!!!";
      } else {
        this.matchPassword = true;
        this.form.message = "";
      }
    },
  },
};
</script>
