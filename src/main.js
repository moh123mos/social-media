import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

router.afterEach((to) => {
  document.title = to.meta.title || "Default Title";
});

createApp(App).use(store).use(router).use(bootstrap).mount("#app");
