<template>
  <navBar></navBar>
  <div class="container pb-3">
    <div
      class="posts m-auto col-9"
      :style="fromPost ? 'padding-bottom: 50px;' : ''"
    >
      <add-post v-if="fromHome"></add-post>
      <!-- display Post(s) -->
      <div
        v-for="(post, i) in posts"
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
          <div
            class="card-text mb-2"
            :style="fromPost ? 'white-space: normal;' : 'white-space: nowarp;'"
            @click="goToPostDetail(post)"
          >
            {{ post.body }}
          </div>
          <div
            class="card-img mb-3 h-100"
            :style="fromPost ? '' : 'overflow: hidden; max-height: 300px'"
            @click="goToPostDetail(post)"
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
            <div
              class="comment-post d-flex gap-2"
              @click="goToPostDetail(post)"
            >
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
      <!-- show comments section -->
      <displayCommntsVue
        v-if="fromPost"
        :comments="comments"
      ></displayCommntsVue>
    </div>
  </div>
  <!-- add comment section -->
  <form
    v-if="isLoggedIn && fromPost"
    @submit.prevent="sendComment"
    class="container col-sm-12 col-md-9 comment-section d-flex position-fixed"
  >
    <div class="comment-input">
      <div class="user-info">
        <router-link to="/profile" class="img rounded-circle">
          <img
            v-if="
              '{}' !== JSON.stringify(myAccount.user.profile_image) &&
              JSON.stringify(myAccount.user.profile_image) !== 'null'
            "
            :src="myAccount.user.profile_image"
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
      </div>
      <textarea
        type="text"
        ref="inputComment"
        v-model="commentBody"
        @input="chaneHeight"
        :placeholder="'Comment as ' + myAccount.user.name"
      ></textarea>
      <label
        for="sendComment"
        class="send-comment"
        :style="commentBody == '' ? 'background: #8ebdec; cursor:auto' : ''"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-send-fill send-icon"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"
          />
        </svg>
        <input type="submit" id="sendComment" value="" />
      </label>
    </div>
  </form>
</template>

<script setup>
import navBar from "@/components/navBar.vue";
import router from "@/router";
import AddPost from "./addPost.vue";
import displayCommntsVue from "@/components/displayComments.vue";
import { userDataPublic } from "@/store/users";
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
const store = userDataPublic();
let inputComment = ref(null);
let commentBody = ref("");
let { myAccount } = storeToRefs(store);
let { isLoggedIn } = storeToRefs(store);
let props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
  fromHome: {
    type: Boolean,
  },
  fromPost: {
    type: Boolean,
  },
  comments: {
    type: Array,
  },
});
let commentsData = ref(props.comments);
let toggleLike = (idx) => {
  document
    .querySelectorAll(".footer .like-post .fill")
    .item(idx)
    .classList.toggle("d-none");
  document
    .querySelectorAll(".footer .like-post .hand")
    .item(idx)
    .classList.toggle("d-none");
  console.log(document.querySelectorAll(".footer .like-post .hand").item(idx));
  console.log(document.querySelectorAll(".footer .like-post .fill").item(idx));
  console.log(idx);
};
const goToPostDetail = (post) => {
  router.push(`/posts/${post.id}`);
};
const chaneHeight = () => {
  if (inputComment.value.value == "") inputComment.value.style.height = "60px";
  if (inputComment.value.scrollHeight <= 200)
    inputComment.value.style.height = inputComment.value.scrollHeight + "px";
};

// const getComments = async () => {
//   if (props.fromPost) {
//     const id = ref(props.posts[0].id);
//     const myHeaders = {
//       Authorization: `Bearer ${myAccount.value.token}`,
//     };
//     try {
//       let res = await axios.get(
//         `https://tarmeezacademy.com/api/v1/posts/${id.value}/comments`,
//         {
//           headers: myHeaders,
//         }
//       );
//       commentsData.value = await res.data.data;
//       console.log(commentsData.value);
//       try {
//         for (let i = 0; i < commentsData.value.length; i++) {
//           let id = commentsData.value[i].author_id;
//           let res = await axios.get(
//             `https://tarmeezacademy.com/api/v1/users/${id}`
//           );
//           let ele = await res.data.data;
//           console.log(ele);
//           commentsData.value[i].author = ele;
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };
// onMounted(() => {
//   getComments();
// });

const sendComment = () => {
  const id = ref(props.posts[0].id);
  console.log(id.value);
  const myHeaders = {
    Authorization: `Bearer ${myAccount.value.token}`,
  };
  let body = {
    body: commentBody.value,
  };
  axios
    .post(
      `https://tarmeezacademy.com/api/v1/posts/${id.value}/comments`,
      body,
      {
        headers: myHeaders,
      }
    )
    .then((res) => {
      console.log(res.data);
      commentsData.value.push(res.data.data);
      commentBody.value = "";
    })
    .catch((error) => {
      console.log(error);
    });
};
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

.comment-section {
  background-color: #f0f2f5;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  padding-bottom: 5px;
  .comment-input {
    width: 100%;
    display: flex;
    align-items: center;
    textarea {
      box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.3);
      position: relative;
      padding: 15px 45px 10px 60px;
      width: 100%;
      height: 60px;
      border-radius: 5px;
      resize: none;
      &:focus {
        outline: 1px solid #2790fa9c;
      }
    }
  }
  .user-info,
  .send-comment {
    position: absolute;
    z-index: 2;
  }
  .user-info {
    left: 20px;
  }
  .send-comment {
    cursor: pointer;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: #0080ff; // disabled => #8ebdec
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    .send-icon {
      color: #fff;
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
