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
  },
}
</script>
<style scoped>
#app {
  color: #333;
}
</style>