import HomePage from "@/views/homePage.vue";
import loginPage from "@/views/loginPage.vue";
import RegisterPage from "@/views/registerPage.vue";
import viewPost from "@/views/viewPost.vue";
import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "@/views/UserProfilePage.vue";

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
  {
    path: "/profile/:id",
    name: "user profile",
    component: UserProfile,
    meta: {
      title: "User Profile",
    },
  },
  {
    path: "/posts/:id",
    name: "viewPost",
    component: viewPost,
    meta: {
      title: "View Post",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
