<template>
  <navBar></navBar>
  <div class="container pb-3">
    <div
      class="posts m-auto col-9"
      :style="fromPost ? 'padding-bottom: 50px;' : ''"
      ref="Container"
    >
      <!--* display profile *-->
      <div class="profile-cont mb-5 mt-5">
        <div class="card card-profile w-100 m-auto p-3">
          <div class="d-flex align-items-center">
            <div class="user-img">
              <img
                v-if="'{}' !== JSON.stringify(user.profile_image)"
                :src="user.profile_image"
                width="100%"
                class="rounded"
                alt=""
              />
              <img
                v-else
                src="../assets/profileImg/userMan.png"
                width="100%"
                class="rounded"
                alt=""
              />
            </div>
            <div
              class="ms-3 w-100"
              style="
                height: 270px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
              "
            >
              <div class="">
                <h4 class="mb-0 mt-0">{{ user.name }}</h4>
                <p>{{ user.username }}</p>
              </div>

              <div
                class="statistics p-2 mt-2 d-flex justify-content-evenly rounded text-white stats text-center"
              >
                <div class="d-flex flex-column">
                  <span class="title">Posts</span>
                  <span class="number">{{ user.posts_count }}</span>
                </div>

                <div class="d-flex flex-column ms-2">
                  <span class="title">Comments</span>
                  <span class="number">{{ user.comments_count }}</span>
                </div>
              </div>

              <div class="button mt-2 d-flex flex-row align-items-center">
                <a
                  href="https://66bf67af0e229946a5c88779--roaring-churros-8adbed.netlify.app/"
                  class="btn btn-sm btn-outline-primary w-100"
                >
                  Chat
                </a>
                <a
                  href="https://github.com/moh123mos"
                  class="btn btn-sm btn-primary w-100 ms-2"
                >
                  Follow
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--* / display profile / *-->

      <!--* add posts *-->
      <!-- <add-post v-if="user.id == myAccount.user.id"></add-post> -->
      <div
        v-if="isLoggedIn && user.id == myAccount.user.id"
        class="add-post add-post bg-light rounded mb-3 shadow-sm"
      >
        <div
          class="input-preview d-flex align-items-center justify-content-evenly pt-3"
        >
          <a
            @click="goToProfileDetail(myAccount.user.id)"
            class="img rounded-circle"
          >
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
          </a>
          <div class="input-post">
            <textarea
              @input="chaneHeight"
              ref="textArea"
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
            <input
              id="inTag"
              @change="getImage"
              type="file"
              class="input-image"
            />
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
      <!--* / add posts / *-->

      <!--* display Post(s) *-->
      <div
        v-for="(post, i) in posts"
        :key="post.id"
        class="post card shadow-sm mb-4"
      >
        <div
          class="card-header d-flex align-items-center justify-content-between gap-1"
        >
          <div class="d-flex">
            <div class="user-img">
              <img
                v-if="'{}' !== JSON.stringify(post.author.profile_image)"
                :src="post.author.profile_image"
                width="40px"
                height="40px"
                class="rounded-circle"
                alt=""
                @click="showProfileImg(post.author.id)"
              />
              <img
                v-else
                src="../assets/profileImg/userMan.png"
                width="40px"
                height="40px"
                class="rounded-circle"
                alt=""
                @click="showProfileImg(post.author.id)"
              />
            </div>
            <div class="user-post ms-2">
              <div class="name">{{ post.author.name }}</div>
              <div class="date-post">
                <div
                  @click="goToProfileDetail(post.author.id)"
                  class="user-name d-inline-block me-2"
                >
                  {{ post.author.username }}
                </div>
                <span class="date me-2">{{ post.created_at }}</span>
                <span class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div
            class="overlay d-none"
            :class="'overlay-' + post.author.id"
            ref="overlay"
            @click="showProfileImg(post.author.id, false)"
          ></div>
          <div class="user-img-preview d-none" :class="'img-' + post.author.id">
            <img
              v-if="'{}' !== JSON.stringify(post.author.profile_image)"
              :src="post.author.profile_image"
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
          </div>
          <div v-if="user.id == myAccount.user.id" class="edition d-flex">
            <div
              class="btn btn-outline-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#editPost"
              @click="changeId(post.id, i, post.body, post.title)"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </span>
              <span class="ms-1 d-none d-md-inline">Edit</span>
            </div>
            <div
              class="btn btn-outline-danger btn-sm ms-2"
              data-bs-toggle="modal"
              data-bs-target="#removePost"
              @click="changeId(post.id, i)"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                  />
                </svg>
              </span>
              <span class="ms-1 d-none d-md-inline">Remove</span>
            </div>
            <!-- Delete modal -->
            <div
              class="modal fade"
              id="removePost"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text-danger" id="exampleModalLabel">
                      Warning!
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    Are You Sure You Want To Delete This Post ?
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      @click="deletePost()"
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Edit Modal -->
            <div
              class="modal fade"
              id="editPost"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text-primary" id="exampleModalLabel">
                      Edit Body Of Post !
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div
                      class="title"
                      v-if="
                        DataForPost.title != '' && DataForPost.title != null
                      "
                    >
                      <label class="fw-bold text-primary" for="title"
                        >Title of Post</label
                      >
                      <input
                        v-if="
                          DataForPost.title != '' && DataForPost.title != null
                        "
                        class="w-100 p-2 m-1 bg-light rounded"
                        type="text"
                        v-model="DataForPost.title"
                        ref="newTitle"
                      />
                    </div>
                    <div class="body">
                      <label class="fw-bold text-primary" for="body"
                        >Body Of Post</label
                      >
                      <input
                        id="body"
                        class="w-100 p-2 m-1 bg-light rounded"
                        type="text"
                        v-model="DataForPost.body"
                        ref="newBody"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      @click="editPost"
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Done!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body" @click="goToPostDetail(post)">
          <div class="card-title fw-bold">
            {{ post.title }}
          </div>
          <div
            class="card-text mb-2"
            :style="fromPost ? 'white-space: normal;' : 'white-space: nowarp;'"
          >
            {{ post.body }}
          </div>
          <div
            class="card-img mb-3 h-100"
            :style="fromPost ? '' : 'overflow: hidden; max-height: 300px'"
          >
            <img :src="post.image" class="rounded w-100" alt="" />
          </div>
          <hr />
          <footer
            class="d-flex justify-content-evenly align-items-cneter footer"
          >
            <div class="like-post d-flex gap-2" @click="toggleLike(i)">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-up-fill fill d-none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-up hand"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
                  />
                </svg>
              </div>
              <div class="like">Like</div>
            </div>
            <div class="comment-post d-flex gap-2">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chat-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"
                  />
                </svg>
              </div>
              <div class="comment d-flex">
                <span class="no-comment">({{ post.comments_count }})</span>
                <div class="label">Comment(s)</div>
              </div>
            </div>
            <div class="share-post d-flex">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-share-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"
                  />
                </svg>
              </div>
              <div class="share">Share</div>
            </div>
          </footer>
        </div>
      </div>
      <!--*/ display Post(s) /*-->
    </div>
  </div>
  <!-- * btn to up * -->
  <div
    class="arrow-up position-fixed"
    v-show="shouldAppear"
    @click="scrollToTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-arrow-up-circle-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
      />
    </svg>
  </div>
  <!--*/ btn to up */ -->
</template>
<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import navBar from "@/components/navBar.vue";
import router from "@/router";
// import AddPost from "../components/addPost.vue";
import { ref, computed, onMounted } from "vue";
import { userDataPublic } from "@/store/users";
import { storeToRefs } from "pinia";
const store = userDataPublic();
let { myAccount } = storeToRefs(store);
const id = useRoute().params.id;
let user = ref({});
let posts = ref([]);
let DataForPost = ref({
  id: 0,
  i: 0,
  body: "",
  title: "",
});
const requests = [
  axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`),
  axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`),
];
const getUserProfile = () => {
  axios.all(requests).then(
    axios.spread((res1, res2) => {
      user.value = res1.data.data;
      posts.value = res2.data.data;
      posts.value.reverse();
      // console.log(user.value);
    })
  );
};

let Container = ref(null);
let overlay = ref(null);
// * for scroll to top
const scrollY = ref(window.scrollY);
window.addEventListener("scroll", () => {
  scrollY.value = window.scrollY;
});
const shouldAppear = computed(() => {
  return scrollY.value >= 500;
});
const scrollToTop = () => {
  window.scrollTo(document.body.scrollTop, 0);
};
// *End for scroll to top

let toggleLike = (idx) => {
  document
    .querySelectorAll(".footer .like-post .fill")
    .item(idx)
    .classList.toggle("d-none");
  document
    .querySelectorAll(".footer .like-post .hand")
    .item(idx)
    .classList.toggle("d-none");
};
const goToPostDetail = (post) => {
  router.push(`/posts/${post.id}`);
};
const goToProfileDetail = (id) => {
  router.push(`/profile/${id}`);
};

const showProfileImg = (id, show = true) => {
  if (show) {
    document.querySelector(".overlay-" + id).classList.remove("d-none");
    document.querySelector(".img-" + id).classList.remove("d-none");
  } else {
    document.querySelector(".overlay-" + id).classList.add("d-none");
    document.querySelector(".img-" + id).classList.add("d-none");
  }
};
const deletePost = () => {
  const myHeaders = {
    Accept: "application/json",
    Authorization: `Bearer ${myAccount.value.token}`,
  };
  axios
    .delete(`https://tarmeezacademy.com/api/v1/posts/${DataForPost.value.id}`, {
      headers: myHeaders,
    })
    .then((res) => {
      console.log(res);
      posts.value.splice(DataForPost.value.i, 1);
      --user.value.posts_count;
    })
    .catch((error) => {
      console.log(error);
    });
};
const editPost = () => {
  let body = {
    body: DataForPost.value.body,
    title: DataForPost.value.title,
  };
  const myHeaders = {
    Accept: "application/json",
    Authorization: `Bearer ${myAccount.value.token}`,
  };
  axios
    .put(
      `https://tarmeezacademy.com/api/v1/posts/${DataForPost.value.id}`,
      body,
      {
        headers: myHeaders,
      }
    )
    .then((res) => {
      console.log(res);
      // posts.value.splice(DataForPost.value.i, 1);
      posts.value[DataForPost.value.i] = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
const changeId = (id, i, body = "", title = "") => {
  console.log(id);
  console.log(i);
  DataForPost.value.id = id;
  DataForPost.value.i = i;
  DataForPost.value.body = body;
  DataForPost.value.title = title;
};
// Hooks
onMounted(() => {
  getUserProfile();
});
/// NOTE - this for creation post */
const { isLoggedIn } = storeToRefs(store);
let bodyInput = ref("");
let sendPostBtn = ref(null);
let imageInput = ref(null);
let invalidBody = ref(null);
let textArea = ref(null);
const username = ref(null);
const userProfile = ref(null);
const userData = localStorage.getItem("userData");
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
  formdata.append("body", bodyInput.value);
  if (imageInput.value != null) formdata.append("image", imageInput.value);
  axios
    .post("https://tarmeezacademy.com/api/v1/posts", formdata, {
      headers: myHeaders,
    })
    .then((res) => {
      console.log(res.data.data);
      posts.value.unshift(res.data.data);
      bodyInput.value = "";
      ++user.value.posts_count;
      imageInput.value = null;
    })
    .catch((err) => {
      console.log(err);
      invalidBody.value.innerHTML = err.response.data.message;
    });
};
const chaneHeight = () => {
  if (textArea.value.value == "") textArea.value.style.height = "60px";
  if (textArea.value.scrollHeight <= 200)
    textArea.value.style.height = textArea.value.scrollHeight + "px";
  // console.log(textArea.value.scrollHeight);
};
</script>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #1b1b1b8f;
  z-index: 5;
}
.posts {
  .post {
    .card-header {
      .user-post {
        .name {
          font-weight: bold;
        }
        .user-name {
          cursor: pointer;
          color: gray;
          font-weight: 700;
          transition: 0.3s;
          &:hover {
            color: #042040;
            text-decoration: underline !important;
          }
        }
        .date-post {
          font-size: 14px;
          color: gray;
          .icon {
            transition: 0.3s;
            &:hover {
              color: #000;
            }
          }
        }
      }
      .user-img {
        cursor: pointer;
      }
      .user-img-preview {
        position: fixed;
        z-index: 6;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 15px;
        border-radius: 10px;
        img {
          width: 200px;
          height: 200px;
        }
      }
    }
    .card-body {
      .card-text {
        cursor: pointer;
        color: gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.show {
          white-space: normal !important;
        }
      }
    }
    footer {
      color: #0080ff;
      .icon svg {
        font-weight: 900;
      }
      & > div {
        cursor: pointer;
        align-items: center;
        gap: 5px;
      }
      .comment-post {
        padding: 0 30px 0;
        border-left: 2px solid #0080ff;
        border-right: 2px solid #0080ff;
      }
    }
  }
  .handle {
    text-align: center;
    padding: 15px;
    background: #0080ff;
    border-radius: 15px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-bottom: 10px;
    line-height: 1;
    .p {
      margin: 0;
    }
  }
  .comments-view {
    .comment {
      position: relative;
      background: #fff;
      border-radius: 15px;
      margin-bottom: 15px;
      padding: 15px;
      .img {
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
      }
      .content {
        .name {
          font-weight: bold;
          font-size: 18px;
        }
        .username {
          font-size: 14px;
        }
        hr {
          margin: 5px;
        }
        .text {
          font-size: 18px;
        }
      }
    }
  }
}

.arrow-up {
  bottom: 15px;
  right: 50px;
  color: hsl(210, 100%, 50%);
  cursor: pointer;
}

.card-profile {
  width: 400px;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  .stats {
    background: #f2f5f8 !important;
    color: #000 !important;
    .title {
      font-weight: bold;
      font-size: 16px;
      color: #a1aab9;
    }
    .number {
      font-weight: 500;
    }
  }
}

@media (max-width: 766px) {
  .comment-post {
    gap: 5px;
    padding: 0 30px !important;
    // border: none !important;
  }
  .like,
  .comment .label,
  .share {
    display: none;
  }
}
@media (min-width: 766px) {
  .user-img-preview {
    img {
      height: 400px !important;
      width: 400px !important;
    }
  }
}
@media (max-width: 991px) {
  .container {
    margin-top: 75px !important;
  }
  .posts {
    width: 100% !important;
  }
  .posts .post footer {
    font-size: 12px;
  }
}
@media (min-width: 992px) {
  .comment-post {
    padding: 0 30px 0;
  }
}
</style>
