import { defineStore } from "pinia";
import { ref } from "vue";

export const userDataPublic = defineStore("users", () => {
  let isLoggedIn = ref(false);
  let myAccount = ref({});
  let users = ref([]);
  let cur_post = localStorage.getItem("cur_post");
  let userData = localStorage.getItem("userData");
  if (cur_post) {
    users.value = JSON.parse(cur_post);
  }
  if (userData) {
    myAccount.value = JSON.parse(userData);
  }
  function getUsers() {
    return users.value;
  }
  function login() {
    isLoggedIn.value = true;
  }
  function logout() {
    isLoggedIn.value = false;
  }
  function addUsers(user) {
    users.value = [];
    users.value.push(...user);
  }
  return { myAccount, isLoggedIn, login, logout, addUsers, users, getUsers };
});
