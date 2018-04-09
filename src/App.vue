<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900');
  body {margin: 0; padding: 0;height:100%; background: #403b50}
  html {height: 100%; font-size: 16px;}
  button, input[type=submit] {cursor: pointer;}
  *::selection {background: #000; color: #fff;}
  * {
    font-family: 'Lato', sans-serif;
  }
  p, p > *, span, strong, b, button, input {
    font-size: 1rem;
  }
  #app {height: 100%;}
  a {
    text-decoration: none;
    color: #000;
  }
  .home {
    height: 100%;
  }
</style>
