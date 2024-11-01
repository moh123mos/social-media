<template>
  <div class="container m-auto">
    <ul class="comments-view">
      <li class="comment" v-for="comment in comments" :key="comment.id">
        <div
          @click="goToProfileDetail(comment.author.id)"
          class="img rounded-circle"
        >
          <img
            v-if="
              '{}' !== JSON.stringify(comment.author.profile_image) &&
              JSON.stringify(comment.author.profile_image) !== 'null' &&
              comment.author.profile_image !== ''
            "
            :src="comment.author.profile_image"
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
        <div class="content">
          <div class="user-in">
            <div class="name">{{ comment.author.name }}</div>
            <div class="username">@{{ comment.author.username }}</div>
          </div>
          <hr />
          <p class="text">
            {{ comment.body }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import router from "@/router";
import { defineProps } from "vue";
defineProps({
  comments: Array,
});
const goToProfileDetail = (id) => {
  router.push(`/profile/${id}`);
};
</script>

<style lang="scss"></style>
