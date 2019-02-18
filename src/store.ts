import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import {JSDOM} from 'jsdom';
/// <reference path="../node_modules/@types/mozilla-readability/index.d.ts"/>
import Readability from 'readability';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: '',
    title: '',
    author: '',
    isLoading: false,
  },
  getters: {
    url: (state) => {
      return state.url;
    },
    html: (state) => {
      if (state.title.trim() === '' || state.author.trim() === '') {
        return '';
      }
      return `<tr>\n` +
        `    <td>${state.title}</td>\n` +
        `    <td><a href=""${state.url}>${state.author}</a></td>\n` +
        `</tr>`;
    },
    git: (state) => {
      if (state.title.trim() === '' || state.author.trim() === '') {
        return '';
      }
      return `Add ${state.author}'s ${state.title}`;
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
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    read({commit}) {
      if (this.state.url.trim() === '') {
        return;
      }
      commit('setLoading', true);
      const url = 'https://cors-anywhere.herokuapp.com/' + this.state.url;
      const origin = window.location.protocol + '//' + window.location.host;
      axios(url, {
        maxRedirects: 0,
        timeout: 3600,
        headers: {
          'Accept': '*/*',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          'x-requested-with': origin,
        },
      })
        .then((response) => {
          const doc = new JSDOM(response.data);
          const reader = new Readability(doc.window.document);
          const article = reader.parse();
          commit('setTitle', article.title);
          commit('setAuthor', article.byline);
          commit('setLoading', false);
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response.headers);
          } else if (error.request) {
            // console.log(error.request);
          } else {
            // console.log(error.message);
          }
          // console.log(error.config);
          commit('setLoading', false);
        })
      ;
    },
  },
});
