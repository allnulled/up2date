<template>
  <Main />
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html, html * {
  box-sizing: border-box;
}
body {
  margin: 0;
  box-sizing: border-box;
  margin-right: 1px;
}
</style>
