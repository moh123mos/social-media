<template>
  <nav
    class="navbar position-fixed navbar-expand-lg bg-body-tertiary m-auto col-12 rounded shadow-sm mb-4"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <span class="logo">f</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link active d-flex align-items-center"
              aria-current="page"
              href="#"
            >
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house-door-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"
                  />
                </svg>
              </div>
              <span class="home mt-1 mx-1">Home</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/profile"
              class="nav-link active d-flex align-items-center"
              aria-current="page"
              href="#"
            >
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <span class="home mt-1 mx-1">Profile</span></router-link
            >
          </li>
        </ul>
        <ul class="btns mb-0">
          <div v-if="isLoggedIn" class="logedIn d-flex justify-content-center">
            <router-link to="/profile" class="profile-img me-2">
              <img
                v-if="
                  '{}' !== JSON.stringify(userProfile) &&
                  JSON.stringify(userProfile) !== 'null'
                "
                :src="userProfile"
                width="40px"
                height="40px"
                class="rounded-circle"
                alt=""
              />
              <img
                v-else
                src="../assets/profileImg/userMan.png"
                width="40px"
                height="40px"
                class="rounded-circle"
                alt=""
              />
            </router-link>
            <li class="">
              <a
                class="btn btn-outline-danger btn-sm logout-btn"
                @click="clearData"
                >Logout</a
              >
            </li>
          </div>
          <div class="unlogedIn" v-if="!isLoggedIn">
            <li class="btn btn-outline-primary me-2 btn-sm">
              <router-link to="/login">Login</router-link>
            </li>
            <li class="btn btn-outline-primary btn-sm">
              <router-link to="/register">Register</router-link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
// import { useStore } from "vuex";
import { ref } from "vue";
import { userDataPublic } from "@/store/users";
import { storeToRefs } from "pinia";

const store = userDataPublic();

const { isLoggedIn } = storeToRefs(store);

const logout = store.logout;
let clearData = () => {
  localStorage.setItem("userData", "");
  logout();
};
const username = ref(null);
const userProfile = ref(null);
const userData = localStorage.getItem("userData");
if (userData) {
  username.value = JSON.parse(userData).user.name;
  userProfile.value = JSON.parse(userData).user.profile_image;
}
</script>
<style lang="scss">
$main-color: #0080ff;
ul,
ol,
dl {
  margin: 0;
  padding: 0;
  border: 0;
}
.navbar {
  z-index: 5;
  top: 0;
  .navbar-toggler {
    &:focus {
      box-shadow: 0 0px 3px 1px $main-color !important;
    }
  }
  .navbar-brand {
    .logo {
      text-align: center;
      font-weight: 700;
      color: $main-color;
      display: block;
      width: 30px;
      height: 30px;
      border: 1px solid #0080ff;
      border-radius: 50%;
      transition: 0.3s;
    }
    &:hover {
      .logo {
        color: #fff;
        background-color: $main-color;
      }
    }
  }
  .nav-item {
    position: relative;
    font-weight: 500;
    .router-link-active {
      color: $main-color !important;
    }
    &::before {
      content: "";
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: -18px;
      background: $main-color;
      border-radius: 10px;
      transition: 0.3s;
    }
    &:hover {
      &::before {
        opacity: 1;
      }
    }
    .icon {
      color: $main-color;
    }
  }
  .btns {
    .profile-img {
      cursor: pointer;
    }
    .btn {
      font-weight: 500;
      transition: 0.3s;
      &.logout-btn {
        text-decoration: none;
        font-weight: bold;
        a {
          color: rgb(223, 37, 37);
        }
      }
      a {
        text-decoration: none;
      }
      &:hover a {
        color: #fff;
      }
    }
  }
  @media (max-width: 991px) {
    .nav-item {
      margin-bottom: 10px;
      .nav-link {
        justify-content: center;
      }
      &::before {
        width: 80px;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
    .unlogedIn,
    .logedIn {
      text-align: center;
    }
  }
  @media (min-width: 992px) {
    .nav-item {
      margin-bottom: 10px;
      .nav-link {
        justify-content: center;
      }
      &::before {
        width: 100%;
        left: 0;
        transform: translateX(0);
      }
    }
  }
}
</style>
