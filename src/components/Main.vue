<template>
  <div class="container">

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
          <div class="listButtons">
            <a target="_blank" class="visit" :href="visitedLinks[index]">Visit</a>
            <button v-on:click="formatText(index)" class="formatButton">Format</button>
            <button v-on:click="deleteLink(index)" class="removeButton">Remove</button>
          </div>
        </li>
      </ul>

    </div>

    <div class="menu" @click="showMenu">&#9776;</div>

    <div class="right rightMobile" v-if="mobileMenu">
      <stats />
    </div>
    
  </div>
</template>

<script>

import Stats from '@/components/Stats.vue'
import { mapState, mapMutations, mapActions, mapGetters} from 'vuex'
import store from '../store/store'

export default {
  name: 'Main',
  data()  {
    return {
      newLink: '',
      showError: false,
      visitedLinks: [],
      mobileMenu: true,
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
      'STORAGE_VISITED_KEY',
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
      'formatLink',
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

      localStorage.setItem(this.STORAGE_VISITED_KEY, JSON.stringify(this.links));
    },
    getLCitem: function (links) {
      this.getLCitems(this.links);
    },
    returnVisitedLink: function () {
      if (localStorage.getItem(this.STORAGE_KEY) === null) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.visitedLinks));
      } else {
        let item = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        this.visitedLinks = item;
      }
    },
    showMenu: function () {
      let rightMenu = document.querySelector('.rightMobile');
      rightMenu.style.display = 'block';
            
      if (this.showMenu == false) {
        rightMenu.style.display = 'none';
      }
      
      this.showMenu = !this.showMenu;
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

.container {
  display: grid;
  grid-template-columns: 3fr 2fr;
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
  justify-content: space-between;
}

ul li .listButtons {
  display: flex;
  align-items: baseline;
}

ul li span {
  width: 60%;
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
  display: block;
}

.menu {
  color: #fff;
  font-size: 2rem;
  position: absolute;
  right: 30px;
  display: none;
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
  top: 19px;
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
  margin-left: 12px;
  -webkit-appearance: none;  
}

.removeButton:hover, .formatButton:hover {
  background: #0ddaad;
}

.formatButton {
  background-color: #03c298;
  border: none;
  padding: 6px;
  color: #fff;
  border-radius: 3px;
  transition: .15s;
  margin-left: auto;
  -webkit-appearance: none;
}

.error {
  border-bottom-color: #ff2222;
}

.errorText {
  color: #ddd;
  padding: 0;
  margin: 0 0 20px 0;
}

@media screen and (min-width: 826px) {
  .rightMobile {
    display: block !important;
    position: relative;
  }
}

@media screen and (max-width: 825px) {
  .container {
    grid-template-columns: 4fr 0fr;
  }
  .rightMobile {
    position: absolute;
    right: 0;
    height: 100%;
    background: #403b50;
    display: none;
  }
  .menu {
    display: block;
    z-index: 1;
  }
}

</style>
