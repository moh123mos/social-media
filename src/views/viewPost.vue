<template>
  <DisplayPosts :posts="users" :fromPost="true"></DisplayPosts>
</template>
<script setup>
import DisplayPosts from "@/components/displayPosts.vue";
DisplayPosts;
import { userDataPublic } from "@/store/users";
import { storeToRefs } from "pinia";
let store = userDataPublic();
let { users } = storeToRefs(store);
console.log(users.value);
// let toggleLike = (idx) => {
//   document
//     .querySelectorAll(".footer .like-post .fill")
//     .item(idx)
//     .classList.toggle("d-none");
//   document
//     .querySelectorAll(".footer .like-post .hand")
//     .item(idx)
//     .classList.toggle("d-none");
//   console.log(document.querySelectorAll(".footer .like-post .hand").item(idx));
//   console.log(document.querySelectorAll(".footer .like-post .fill").item(idx));
//   console.log(idx);
// };
</script>
