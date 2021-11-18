<template>
  <Dashboard/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Dashboard from './components/Dashboard.vue'

@Options({
  components: {
    Dashboard
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
