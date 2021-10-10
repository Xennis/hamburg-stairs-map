<template>
  <div id="app">
    <StepsMap />
  </div>
</template>

<script>
import StepsMap from './components/StepsMap.vue'

export default {
  name: 'App',
  components: {
    StepsMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
