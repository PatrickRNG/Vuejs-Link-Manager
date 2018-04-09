import Vue from 'vue';

export default {
    ADD_LINK: (state, payload) => {
        // if the text in input is a url, push the url to the list, else push the text
        //using this because when it wasn't a url, would return localhost (or the current url)
        //instead of the text written in the input
        if (state.links != undefined || state.links.length != 0) {
          state.links.push(payload);
        } else {
          console.log('No links');
        }
  
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
      },

      REMOVE_ALL: (state) => {
        state.links = [];
  
        localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.links));
      },

      GET_LC_ITEMS: (state) => {
        state.links = JSON.parse(localStorage.getItem(state.STORAGE_VISITED_KEY));
      }
}

// Link storage = full link
// Visited links storage = part link

// Visited = link storage
// List link = Visited Links storage