import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: '',
    title: '',
    author: '',
  },
  getters: {
    url: (state) => {
      return state.url;
    },
    html: (state) => {
      return '<html...>';
    },
    git: (state) => {
      return 'Add ABC\'s blablabla';
    },
  },
  mutations: {
    setUrl(state, url) {
      state.url = url;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setAuthor(state, author) {
      state.author = author;
    },
  },
  actions: {

  },
});
