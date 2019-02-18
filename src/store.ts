import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { Alert, AlertType } from '@/utils';

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
    alerts: [],
  },
  getters: {
    url: (state) => {
      return state.url;
    },
    html: (state) => {
      if (!state.title || ! state.author) {
        return;
      }
      if (state.title.trim() === '' || state.author.trim() === '') {
        return '';
      }
      return `<tr>\n` +
        `    <td>${state.title}</td>\n` +
        `    <td><a href=""${state.url}>${state.author}</a></td>\n` +
        `</tr>`;
    },
    git: (state) => {
      if (!state.title || ! state.author) {
        return;
      }
      if (state.title.trim() === '' || state.author.trim() === '') {
        return '';
      }
      return `Add ${state.author}'s ${state.title}`;
    },
    alerts: (state) => {
      return state.alerts;
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
    addAlert(state, alert) {
      // @ts-ignore
      state.alerts.push(alert);
    },
    clearAlerts(state) {
      state.alerts = [];
    },
  },
  actions: {
    read({commit}) {
      commit('clearAlerts');
      commit('setTitle', '');
      commit('setAuthor', '');
      if (this.state.url.trim() === '') {
        const alert = new Alert();
        alert.detail = 'Missing URL';
        alert.type = AlertType.WARNING;
        commit('addAlert', alert);
        return;
      }
      commit('setLoading', true);
      const url = 'https://cors-anywhere.herokuapp.com/' + this.state.url;
      const origin = window.location.protocol + '//' + window.location.host;
      axios(url, {
        maxRedirects: 0,
        timeout: 9000,
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
          const author = article.byline;
          const title = article.title;
          if (!author || author.trim() === '' || !title || title.trim() === '') {
            const alert = new Alert();
            alert.detail = `Invalid title [${title}] or author [${author}]`;
            alert.type = AlertType.WARNING;
            commit('addAlert', alert);
            commit('setLoading', false);
            return;
          }
          commit('setTitle', title);
          commit('setAuthor', author);
          commit('setLoading', false);
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error.response.headers);
            const alert = new Alert();
            alert.title = 'Server Error';
            alert.detail = error.message;
            alert.type = AlertType.DANGER;
            commit('addAlert', alert);
          } else if (error.request) {
            // console.log(error.request);
            const alert = new Alert();
            alert.title = 'Request Error';
            alert.detail = error.message;
            alert.type = AlertType.DANGER;
            commit('addAlert', alert);
          } else {
            // console.log(error.message);
            const alert = new Alert();
            alert.title = 'Unknown Error!';
            alert.detail = error.message;
            alert.type = AlertType.DANGER;
            commit('addAlert', alert);
          }
          // console.log(error.config);
          commit('setLoading', false);
        })
      ;
    },
  },
});
