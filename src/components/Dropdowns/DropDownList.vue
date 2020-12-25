<template>
  <div class="w-full sm:w-6/12 md:w-4/12 px-4">
    <div class="relative inline-flex align-middle w-full">
      <button
        class="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-green-500 active:bg-green-600 ease-linear transition-all duration-150"
        type="button"
        ref="btnDropdownRef"
        v-on:click="toggleDropdown(selected)"
      >
        {{ selected }}
      </button>
      <div
        ref="popoverDropdownRef"
        class="bg-green-500 text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
        v-bind:class="{
          hidden: !dropdownPopoverShow,
          block: dropdownPopoverShow,
        }"
      >
        <a
          v-for="item in items"
          v-bind:key="item"
          v-on:click="toggleDropdown(item)"
          href="#pablo"
          class="text-sm py-2 px-4 uppercase font-normal block w-full whitespace-no-wrap bg-transparent text-white"
        >
          {{ item }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
    
    };
  },
  props: {
    items: Array,
    selected:String
  },

  methods: {
    toggleDropdown: function(name) {
      //console.log("muie");
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
        //this.selected = name;
       
        this.$emit("update:selected", name);
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    
  }
};
</script>
