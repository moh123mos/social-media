import { defineStore } from "pinia";
import { ref } from "vue";

export const profileData = defineStore("profileData", () => {
  let userOfProfile = ref(null);
  let userPosts = ref([]);
  function addUsers(user) {
    userOfProfile.value = user;
  }
  function addPosts(posts) {
    userPosts.value = posts;
  }
  return { addUsers, addPosts, userOfProfile, userPosts };
});
