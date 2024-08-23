import { defineStore } from "pinia";
import { ref } from "vue";

export const userDataPublic = defineStore("users", () => {
  let isLoggedIn = ref(false);
  let users = ref([]);
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
  return { isLoggedIn, login, logout, addUsers, users, getUsers };
});
