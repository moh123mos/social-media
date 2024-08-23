<template>
  <!-- <navBar></navBar> -->
  <router-view></router-view>
</template>
<script setup>
import { onMounted } from "vue";
// import navBar from "./components/navBar.vue";
import { userDataPublic } from "@/store/users";

const store = userDataPublic();
const login = store.login;
const logout = store.logout;
onMounted(() => {
  if (localStorage.getItem("userData")) login();
  else logout();
});
</script>
<style lang="scss">
$main-color: #0080ff;
a {
  text-decoration: none !important;
}
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
  margin-top: 100px;
}
@media (max-width: 991px) {
  .container {
    margin-top: 75px !important;
  }
}
</style>
