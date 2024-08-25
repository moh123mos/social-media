<template>
  <DisplayPosts
    :posts="postDatails"
    :comments="comments"
    :fromPost="true"
  ></DisplayPosts>
</template>
<script setup>
import DisplayPosts from "@/components/displayPosts.vue";

import { userDataPublic } from "@/store/users";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const store = userDataPublic();
let postDatails = ref([]);
let comments = ref([]);
const getPost = () => {
  let id = useRoute().params.id;
  axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`).then((res) => {
    console.log(res.data.data);
    postDatails.value.push(res.data.data);
    comments.value = res.data.data.comments;
    localStorage.setItem("cur_post", JSON.stringify(postDatails.value));
    store.addUsers(postDatails.value);
  });
};
onMounted(getPost);
// console.log(users.value);
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
