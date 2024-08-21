<template>
  <navBar></navBar>
  <router-view></router-view>
</template>
<script setup>
import navBar from "./components/navBar.vue";
// api tarmeez
// https://documenter.getpostman.com/view/4696539/2s83zjqN3F
</script>
<style lang="scss">
$main-color: #0080ff;
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: 0;
}
body {
  background-color: #f0f2f5 !important;
}
</style>
