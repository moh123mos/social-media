<template>
  <!-- <navBar></navBar> -->
  <router-view></router-view>
</template>
<script setup>
import { onMounted } from "vue";
// import navBar from "./components/navBar.vue";
import { useStore } from "vuex";
onMounted(() => {
  const store = useStore();
  if (localStorage.getItem("userData")) store.dispatch("login");
  else store.dispatch("logout");
});
</script>
<style lang="scss">
$main-color: #0080ff;
*,
ul,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
body {
  background-color: #f0f2f5 !important;
}
.container {
  padding-top: 100px;
}
</style>
