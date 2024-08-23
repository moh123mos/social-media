<template>
  <div
    v-if="isLoggedIn"
    class="add-post add-post bg-light rounded mb-3 shadow-sm"
  >
    <div
      class="input-preview input-preview d-flex align-items-center justify-content-evenly pt-3"
    >
      <router-link to="/profile" class="img rounded-circle">
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
      <div class="input-post">
        <textarea
          type="text"
          class="body-input w-100"
          :placeholder="'what`s on your mind, ' + username + ' ?'"
          v-model="bodyInput"
        ></textarea>
        <div class="message-invalid" ref="invalidBody"></div>
      </div>
    </div>
    <div class="image-post">
      <label for="inTag" class="image-icon">
        <span>Add Image to Your Post</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-card-image input-image-icon"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          <path
            d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"
          />
        </svg>
        <input id="inTag" @change="getImage" type="file" class="input-image" />
      </label>
    </div>
    <div class="send-post text-center">
      <div
        class="w-50 btn btn-primary mb-2 fw-bold"
        :class="bodyInput == '' ? 'disabled' : ''"
        ref="sendPostBtn"
        @click="createPost"
      >
        Post
      </div>
    </div>
  </div>
</template>

<script setup>
import { userDataPublic } from "@/store/users";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import axios from "axios";
const store = userDataPublic();
const { isLoggedIn } = storeToRefs(store);
const username = ref(null);
const userProfile = ref(null);
const userData = localStorage.getItem("userData");
let bodyInput = ref("");
let sendPostBtn = ref(null);
let imageInput = ref(null);
let invalidBody = ref(null);
if (userData) {
  username.value = JSON.parse(localStorage.getItem("userData")).user.name;
  userProfile.value = JSON.parse(
    localStorage.getItem("userData")
  ).user.profile_image;
}
let getImage = (e) => {
  let file = e.target.files;
  if (file.length > 0) {
    imageInput.value = file[0];
  }
};
const createPost = () => {
  const myHeaders = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${JSON.parse(userData).token}`,
  };
  let formdata = new FormData();
  console.log(imageInput.value == null);
  formdata.append("body", bodyInput.value);
  if (imageInput.value != null) formdata.append("image", imageInput.value);
  axios
    .post("https://tarmeezacademy.com/api/v1/posts", formdata, {
      headers: myHeaders,
    })
    .then((res) => {
      console.log(res.data);
      bodyInput.value = "";
      imageInput.value = null;
    })
    .catch((err) => {
      console.log(err);
      invalidBody.value.innerHTML = err.response.data.message;
    });
};
</script>

<style lang="scss">
$main-color: #0080ff;
.message-invalid {
  font-size: 12px;
  margin-left: 10px;
  color: #eb4941;
  font-weight: bold;
}
.add-post {
  .img {
    cursor: pointer;
  }
  .input-post {
    width: 80%;
    .body-input {
      background: #e4e6e9;
      padding: 15px;
      border-radius: 10px;
      &:focus {
        outline: 3px solid $main-color;
      }
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        background-color: #e7e9eb;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #53636f;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(136, 8, 8);
      }
    }
  }
  .image-post {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    .image-icon {
      span {
        color: #0080ff;
        font-size: 14px;
        font-weight: bold;
      }
      .input-image-icon {
        width: 30px;
        height: 40px;
        color: #0080ff;
        margin-left: 10px;
        transition: 0.3s;
      }
      &:hover .input-image-icon,
      &:hover span {
        color: #005bb6;
        cursor: pointer;
      }
      .input-image {
        display: none;
      }
    }
  }
}
</style>
