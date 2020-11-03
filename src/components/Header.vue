<template>
  <div class="container">
    <el-menu :default-active="activeIndex" :router="true" class="header" mode="horizontal">
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/cart">购物车</el-menu-item>
      <el-menu-item v-if="isShowManagementTab" index="/management">管理</el-menu-item>
      <el-menu-item v-if="this.$store.state.user !== undefined" index="/mine">我的</el-menu-item>
      <el-menu-item v-if="this.$store.state.user === undefined" index="/register">注册</el-menu-item>
      <el-menu-item v-if="this.$store.state.user === undefined" index="/login">登录</el-menu-item>
      <el-menu-item v-if="this.$store.state.user !== undefined" @click="logout">登出</el-menu-item>

    </el-menu>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  activeIndex = '/'

  @Prop(Boolean) isShowManagementTab!: boolean

  logout() {
    this.$https.post(this.$urls.logout());
    this.$store.commit('logout');
  }
}

</script>

<style scoped>
  .header{
    height: 5%;
  }
  .without-login{
    height: 5%;
    width: 10%;
  }
</style>
