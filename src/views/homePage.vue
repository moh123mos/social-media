<template>
  <DisplayPosts
    :posts="posts"
    :fromHome="true"
    :isloading="isloading"
  ></DisplayPosts>
  <div v-if="isloading" class="container m-auto col-9">
    <div class="bg-primary p-2 rounded text-light text-center fw-bold">
      Loading..
    </div>
  </div>
  <div v-if="hasError" class="container m-auto col-9">
    <div class="bg-danger p-2 rounded text-light text-center fw-bold">
      Error in Fetching Data
    </div>
  </div>
</template>

<script setup>
import DisplayPosts from "@/components/displayPosts.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

let posts = ref([]);
let page = ref(1);
let lastPage = ref(0);
let isloading = ref(false);
let hasError = ref(false);
// let store = userDataPublic();
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
  } finally {
    isloading.value = false;
  }
};
const handleScroll = () => {
  let isEnd =
    window.scrollY + window.innerHeight >= document.body.scrollHeight - 100;
  if (isEnd && page.value <= lastPage.value && !isloading.value) {
    fetchData(++page.value);
  }
};
onMounted(() => {
  fetchData();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
