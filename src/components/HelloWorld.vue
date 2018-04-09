<template>
  <div class="hello">

    <div class="left">
      <h1> {{ title }} </h1>

      <form @submit.prevent="validateInput">
        <input name="link" type="text" placeholder="Add a link" v-model="newLink" v-validate="'required'" data-vv-delay="500" v-bind:class="{'error' : showError}">
        <div class="bar"></div>
        <p class="errorText" v-show="showError"> {{ errors.first('link') }} </p>
        <input type="submit">
      </form>

      <ul>
        <li v-for="(link, index) in links" v-bind:key="index">
          <span>{{ link }}</span>
          <a target="_blank" class="visit" :href="visitedLinks[index]">Visit</a>
          <button v-on:click="formatText(index)">Format</button>
          <button v-on:click="deleteLink(index)" class="removeButton">Remove</button>
        </li>
      </ul>

    </div>

    <div class="right">
      <stats/>
    </div>
    
  </div>
</template>

<script>

import Stats from '@/components/Stats.vue'
import { mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import store from '../store/store'

export default {
  name: 'HelloWorld',
  data()  {
    return {
      newLink: '',
      showError: false,
      visitedLinks: []
    }
  },
  components: {
    Stats
  },
  computed: {
    ...mapState ([
      'title',
      'links',
      'STORAGE_KEY',
      'STORAGE_VISITED_KEY'
    ])
  },
  methods: {
    ...mapMutations ([
      'ADD_LINK',
      'GET_LC_ITEMS',
      'FORMAT_LINK'
    ]),
    ...mapActions ([
      'removeLink',
      'getLCitems',
      'formatLink'
    ]),
    addLink: function () {
      // let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
      this.ADD_LINK (this.newLink)
      this.newLink = '';      
    },
    deleteLink: function (link) {
      this.removeLink(link)
    },
    validateInput: function () {
      this.$validator.validate().then((result) => {
        if (result) {
          this.addLink();
          this.showError = false;
        } else {
          this.showError = true;
        }
      });
    },
    formatText: function (link) {
      this.formatLink(link);

      localStorage.setItem(this.STORAGE_VISITED_KEY, this.links);
    },
    getLCitem: function (links) {
      this.getLCitems(this.links);
    },
    returnVisitedLink: function () {
      let item = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
      this.visitedLinks = item;
    }
  },
  created () {
    this.getLCitem();
    this.returnVisitedLink();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: 100%;
  grid-template-areas: "left right";
  height: 100%;
}

.left, .right {
  padding: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 10px;
  transition: .15s;
  box-shadow: 1px 1px 8px #000;
  display: flex;
  align-items: baseline;
}

ul li:hover {
  background-color: #ddd;
}

h2, h1 {
  color: #fff;
}

.left {
  grid-area: left;
}

.right {
  grid-area: right;
}

form {position: relative;}

input {
  border: none;
  padding: 12px;
  width: calc(100% - 40px);
  margin-bottom: 20px;
  outline: none;
  background: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  position: relative;
}

input::placeholder {
  color: #fff;
}

input[type=submit] {
  background-color: #fff;
  border: none;
  width: 30%;
  transition: .2s;
  margin-bottom: 30px;
  color: #000;
  font-weight: bold;
  box-shadow: 0 10px 20px rgba(1, 1, 1, .3);
}

input[type=submit]:hover {
  background: #ddd;
}

.bar {
  position: absolute;
  border-bottom: 1px solid #0ddaad;
  padding: 12px;
  left: 0;
  top: 16px;
  padding-right: 0;
  padding-left: 0;
  width: 0;
  transition: .8s;
}

input:focus + .bar{
  width: calc(100% - 16px);
}

input:focus::placeholder {
  transition: .2s;
  color: #ccc;
}

.visit {
  color: #03c298;
  font-weight: bold;
  margin-left: 20px;
  transition: .15s;
}

.visit:hover {
  color: #0ddaad;
}

.removeButton {
  background-color: #03c298;
  border: none;
  padding: 6px;
  color: #fff;
  border-radius: 3px;
  transition: .15s;
  margin-left: auto;
}

.removeButton:hover {
  background: #0ddaad;
}

.error {
  border-bottom-color: #ff2222;
}

.errorText {
  color: #ddd;
  padding: 0;
  margin: 0 0 20px 0;
}

</style>
