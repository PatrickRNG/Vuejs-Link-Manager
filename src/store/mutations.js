import Vue from 'vue';

export default {
    ADD_LINK: (state, payload) => {
        state.links.push(payload);
  
        localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.links));
        localStorage.setItem(state.STORAGE_VISITED_KEY, JSON.stringify(state.links));
      },

      REMOVE_LINK: (state, payload) => {
        state.links.splice(payload, 1);
  
        localStorage.setItem(state.STORAGE_VISITED_KEY, JSON.stringify(state.links));
        localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.links));
      },

      FORMAT_LINK: (state, payload, link) => {
        let regex = /([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+/
        link = state.links[payload].toString().match(regex);
        Vue.set(state.links, payload, link[0]);

        localStorage.setItem(state.STORAGE_VISITED_KEY, JSON.stringify(state.links));        
      },
      FORMAT_ALL: (state) => {
        let regex = /([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+/

        state.links.forEach((item, index) => {
          let link = item.toString().match(regex);
          Vue.set(state.links, index, link[0]);
        });

        localStorage.setItem(state.STORAGE_VISITED_KEY, JSON.stringify(state.links));        
      },

      REMOVE_ALL: (state) => {
        state.links = [];
  
        localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.links));
      },

      GET_LC_ITEMS: (state) => {
        if (localStorage.getItem(state.STORAGE_VISITED_KEY) === null) {
          localStorage.setItem(state.STORAGE_VISITED_KEY, JSON.stringify(state.links));
        } else {
          state.links = JSON.parse(localStorage.getItem(state.STORAGE_VISITED_KEY));
        }
      }
}

// Link storage = full link
// Visited links storage = part link

// Visited = link storage
// List link = Visited Links storage

