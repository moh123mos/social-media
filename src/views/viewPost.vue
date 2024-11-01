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
    postDatails.value.push(res.data.data);
    comments.value = res.data.data.comments;
    localStorage.setItem("cur_post", JSON.stringify(postDatails.value));
    store.addUsers(postDatails.value);
  });
};
onMounted(getPost);
</script>
