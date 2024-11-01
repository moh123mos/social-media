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
input {
  &:focus {
    outline: 1px solid #0080ff;
  }
}
body {
  background-color: #f0f2f5 !important;
  scroll-behavior: smooth;
}
.container {
  margin-top: 100px;
}
*::-webkit-scrollbar {
  width: 5px;
}
*::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 10px;
}
*::-webkit-scrollbar-thumb {
  background-color: #8ca4b4;
  border-radius: 10px;
  transition: 0.3s;
}
*::-webkit-scrollbar-thumb:hover {
  background-color: #637480;
}
@media (max-width: 991px) {
  .container {
    margin-top: 75px !important;
  }
}
</style>
