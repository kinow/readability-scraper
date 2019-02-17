import Vue from 'vue';
import Vuex from 'vuex';

import { JSDOM } from 'jsdom';
import { Readability } from 'readability';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    setTitle(state, title) {
      state.title = title;
    },
    setAuthor(state, author) {
      state.author = author;
    },
  },
  actions: {
    read({commit}, url) {
      JSDOM.fromURL(url)
          .then((dom) => {
            const reader = new Readability(dom.window.document);
            const article = reader.parse();
            commit('setTitle', article.title);
            commit('setAuthor', article.byline);
          });
    },
  },
});
