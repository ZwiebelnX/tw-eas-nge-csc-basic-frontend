<template>
  <div class="container">
    <h1 class="register-title">用户登录</h1>
    <el-form ref="form" :rules="rules" status-icon :model="form" class="form"
             @keyup.enter.native="login">
      <el-form-item prop="name">
        <el-input v-model="form.loginName" placeholder="昵称/电子邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"  v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="toHomepage">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import { Form } from 'element-ui';
import httpTools from '@/utils/http-tools';

@Component
export default class Login extends Vue {
  form = {
    loginName: '',
    password: '',
  }

  rules = {
    loginName: [
      { required: true, message: '请输入登录名' },
    ],
    password: [
      { required: true, message: '请输入密码' },
    ],
  };

  mounted() {
    if (sessionStorage.getItem('userInfo') !== null) {
      this.$store.commit('login', JSON.parse(sessionStorage.getItem('userInfo') as string));
    } else {
      this.$store.commit('logout');
    }
  }

  login() {
    const formRef = this.$refs.form as Form;
    formRef.validate(async (valid: boolean) => {
      if (valid) {
        const response = await this.$https.post(this.$urls.login(), this.form);
        if (httpTools.is2xxResponse(response.status)) {
          this.$message.success('登陆成功，跳转到主页');
          this.$store.commit('login', response.data);
          this.$router.push('/').then();
        } else if (response.status === 401) {
          this.$message.warning('用户名或密码错误，请重新输入');
        }
      } else {
        this.$message.error('表单填写有误，请检查');
      }
    });
  }

  toHomepage() {
    this.$router.push('/');
  }
}
</script>

<style scoped>
.container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  max-width: 600px;
  padding: 40px;
  margin: 30px auto 0 auto;
}

.register-title{
  margin-bottom: 20px;
}

.form{
  margin: 20px 80px 10px 80px;
}
</style>
