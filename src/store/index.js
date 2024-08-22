import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: true,
  },
  mutations: {
    setLoginState(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    login({ commit }) {
      commit("setLoginState", true);
    },
    logout({ commit }) {
      commit("setLoginState", false);
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
  modules: {},
});
