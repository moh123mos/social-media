<template>
  <div class="container m-auto">
    <ul class="comments-view">
      <li class="comment" v-for="comment in comments" :key="comment.id">
        <router-link to="/profile" class="img rounded-circle">
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
        </router-link>
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
import { defineProps } from "vue";
defineProps({
  comments: Array,
});
</script>

<style lang="scss"></style>
