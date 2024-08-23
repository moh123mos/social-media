<template>
  <navBar></navBar>
  <div class="container">
    <div class="posts m-auto col-9">
      <addPost></addPost>
      <div
        v-for="post in posts"
        :key="post.id"
        class="post card shadow-sm mb-4"
      >
        <div class="card-header d-flex align-items-center gap-1">
          <div class="user-img">
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
          <div class="user-post">
            <div class="name">{{ post.author.name }}</div>
            <div class="date-post">
              <div class="user-name d-inline-block me-2">
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
        <div class="card-body">
          <div class="card-title fw-bold">
            {{ post.title }}
          </div>
          <div class="card-text mb-2">
            {{ post.body }}
          </div>
          <div class="card-img mb-3">
            <img :src="post.image" class="rounded w-100" alt="" />
          </div>
          <hr />
          <div class="comment-container d-flex gap-2">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path
                  d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
                />
              </svg>
            </div>
            <div class="comment">
              <span class="no-comment">({{ post.comments_count }})</span
              >Comment(s)
            </div>
          </div>
        </div>
      </div>
      <div v-if="isloading" class="handle loading">Loading...</div>
      <div v-if="hasError" class="handle bg-danger error">
        <p>OOPs, Error on Fetching data...</p>
        <p>please reload page</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import navBar from "@/components/navBar.vue";
import { ref, onMounted } from "vue";
import addPost from "@/components/addPost.vue";
let posts = ref([]);
let page = ref(1);
let lastPage = ref(0);
let isloading = ref(false);
let hasError = ref(false);
const fetchData = async (p = 1) => {
  try {
    isloading.value = true;
    let res = await fetch(
      `https://tarmeezacademy.com/api/v1/posts?limit=20&page=${p}`
    );
    let data = await res.json();
    posts.value.push(...data.data);
    isloading.value = false;
    hasError.value = false;
    console.log(data.meta);
    lastPage.value = data.meta.last_page;
  } catch (error) {
    hasError.value = true;
    console.error("fetching error : " + error);
  }
};
onMounted(fetchData);
window.addEventListener("scroll", () => {
  let isEnd = window.scrollY + window.innerHeight >= document.body.scrollHeight;
  if (isEnd && page.value <= lastPage.value) {
    console.log("the end of page");
    fetchData(++page.value);
  }
});
</script>

<style lang="scss">
.posts {
  .post {
    .card-header {
      .user-post {
        .name {
          font-weight: bold;
        }
        .user-name {
          cursor: pointer;
          font-weight: 700;
          transition: 0.3s;
          &:hover {
            color: #042040;
            text-decoration: underline;
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
    }
    .card-body {
      .card-text {
        color: gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.show {
          white-space: normal !important;
        }
      }
    }
    .comment-container {
      cursor: pointer;
      .icon {
        font-weight: 900;
        color: #000;
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
}
</style>
