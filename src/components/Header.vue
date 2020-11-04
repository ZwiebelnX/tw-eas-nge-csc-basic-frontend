<template>
  <div class="container">
    <el-menu :default-active="activeIndex" :router="true" class="header" mode="horizontal">
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item :disabled="this.$store.state.user === undefined" index="/cart">
        购物车
      </el-menu-item>
      <el-submenu :disabled="this.$store.state.user === undefined" index="/mine">
        <template slot="title">我的</template>
        <el-menu-item index="/coupon">优惠券</el-menu-item>
        <el-menu-item index="/my-info" disabled>我的信息</el-menu-item>
      </el-submenu>
      <el-menu-item :disabled="this.$store.state.user !== undefined" index="/register">
        注册
      </el-menu-item>
      <el-menu-item :disabled="this.$store.state.user !== undefined" index="/login">
        登录
      </el-menu-item>
      <el-menu-item :disabled="this.$store.state.user === undefined" @click="logout">
        登出
      </el-menu-item>
      <el-menu-item :disabled="!isShowManagementTab" index="/management">管理</el-menu-item>

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
      await this.$router.push('/');
    }
  }
}

</script>

<style scoped>
  .header{
    height: 5%;
  }
</style>
