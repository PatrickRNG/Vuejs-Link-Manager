import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var vm = new Vue({
  data: {
    text: null,
  }
})

export default new Vuex.Store({
  state: {
    title: 'Link Manager',
    links: [],
    visitedLinks: [],
    "STORAGE_KEY": 'links_storage',
  },
  getters: {
    countLinks: state => {
      return state.links.length;
    }
  },
  mutations: {
    ADD_LINK: (state, link) => {
      // if the text in input is a url, push the url to the list, else push the text
      //using this because when it wasn't a url, would return localhost (or the current url)
      //instead of the text written in the input
      state.links.push(link);

      localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.links));
    },
    REMOVE_LINK: (state, link) => {
      state.links.splice(link, 1);

      localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.links));
    },
    FORMAT_LINK: (state, index, txt) => {
      let regex = /([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+/
      let text = state.links[index].match(regex);

      // Reactive mutations
      txt = vm.$set(state.links, index, text[0]);
      console.log(txt);
    },
    REMOVE_ALL: (state) => {
      state.links = [];

      localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.links));
    },
    GET_LC_ITEMS: (state) => {
      state.links = JSON.parse(localStorage.getItem(state.STORAGE_KEY));
    }
  },
  actions: {
    removeLink: (context, link) => {
      context.commit('REMOVE_LINK', link)
    },
    formatLink: (context, index) => {
      context.commit('FORMAT_LINK', index)
    },
    getLCitems: (context, links) => {
      context.commit('GET_LC_ITEMS', links)
    },
    removeAll({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('REMOVE_ALL')
          resolve()
        }, 1500)
      });
    }
  }
})
