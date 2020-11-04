<template>
  <div id="app">
    <Header :is-show-management-tab="false"></Header>
    <RouterView></RouterView>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { Header },
})
export default class Register extends Vue {
  mounted() {
    if (this.$store.state.user === undefined && sessionStorage.getItem('user') !== null) {
      this.$store.commit('login', JSON.parse(sessionStorage.getItem('user')));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
