<template>
  <div class="container">
    <el-menu :default-active="activeIndex" :router="true" class="header" mode="horizontal">
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item v-if="this.$store.state.user !== undefined" index="/cart">购物车</el-menu-item>
      <el-menu-item v-if="this.$store.state.user !== undefined" index="/mine">我的</el-menu-item>
      <el-menu-item v-if="this.$store.state.user === undefined" index="/register">注册</el-menu-item>
      <el-menu-item v-if="this.$store.state.user === undefined" index="/login">登录</el-menu-item>
      <el-menu-item v-if="this.$store.state.user !== undefined" @click="logout">登出</el-menu-item>
      <el-menu-item v-if="isShowManagementTab" index="/management">管理</el-menu-item>

    </el-menu>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import httpTools from '@/utils/http-tools';

@Component
export default class Header extends Vue {
  get activeIndex() {
    return this.$route.path;
  }

  @Prop(Boolean) isShowManagementTab!: boolean

  async logout() {
    const response = await this.$https.post(this.$urls.logout());
    if (httpTools.is2xxResponse(response.status)) {
      this.$message('登出成功！跳转到主页');
      this.$store.commit('logout');
    }
  }
}

</script>

<style scoped>
  .header{
    height: 5%;
  }
</style>
