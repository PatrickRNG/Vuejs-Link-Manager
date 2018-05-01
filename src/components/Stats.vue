<template>
  <div class="stats">

    <h2>Options</h2>

    <p>There are currently<span> {{countLinks}} </span>links </p>

    <button class="button removeButton" v-on:click="removeAllLinks">Remove all</button>
    <p> {{msg}} </p>
    <button class="button formatButton" v-on:click="formatAllLinks">Format all</button>    

  </div>
</template>

<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Stats',
  data() {
      return {
          msg: ''
      }
  },
  computed: {
    ...mapGetters([
      'countLinks',
      'formatLinks'
    ])
  },
  methods: {
      ...mapMutations(['REMOVE_ALL', 'FORMAT_ALL']),
      ...mapActions(['removeAll', 'formatAll']),

      removeAllLinks() {
          this.removeAll().then(() => {
              this.msg = 'They have been removed'
          });
      },

      formatAllLinks() {
        this.formatAll();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h2, p {
    color: #fff;
}

p span {
    font-size: 1.2em;
    margin: 0 3px;
}

.button {
  background-color: #03c298;
  color: #fff;
  border: none;
  box-shadow: 0 10px 20px rgba(1, 1, 1, .3);
  transition: .2s;
  margin-bottom: 30px;
  padding: 12px;
  outline: none;
  font-weight: bold;
}

.button:hover {
  background-color: #0ddaad;
}

.stats {height: 100%;}

</style>
