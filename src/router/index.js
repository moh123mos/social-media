import HomePage from "@/views/homePage.vue";
import ProfilePage from "@/views/profilePage.vue";
import loginPage from "@/views/loginPage.vue";
import RegisterPage from "@/views/registerPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "Home Page",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    meta: {
      title: "Profile Page",
    },
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      title: "Register",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
