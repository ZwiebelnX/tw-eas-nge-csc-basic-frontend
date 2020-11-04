<template>
  <div class="container">
    <h1 class="register-title">用户注册</h1>
    <el-form ref="form" :rules="rules" status-icon :model="form" label-width="80px" class="form">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repeatPassword">
        <el-input type="password" v-model="form.repeatPassword"></el-input>
      </el-form-item>
      <el-form-item label="真实名称" prop="realName">
        <el-input v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="submitForm">立即注册</el-button>
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
import ModifyStatistic from '@/model/modify-statistic';

@Component
export default class Register extends Vue {
  form = {
    nickname: '',
    realName: '',
    password: '',
    repeatPassword: '',
    email: '',
    phone: '',
  }

  rules = {
    nickname: [
      { required: true, message: '请输入昵称' },
    ],
    password: [
      { required: true, message: '请输入密码' },
    ],
    repeatPassword: [
      {
        required: true, validator: this.validatePassword, message: '两次密码不一致',
      },
    ],
    email: [
      { required: true, type: 'email', message: '请输入电子邮箱' },
    ],
  };

  validatePassword(rule: object, value: string, callback: any) {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.form.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }

  submitForm() {
    const formRef: Form = (this.$refs.form) as any;
    formRef.validate(async (valid: boolean) => {
      if (valid) {
        const response = await this.$https.post(this.$urls.register(), this.form);
        if (response.status === 201) {
          this.$message.success('注册成功');
          await this.$https.patch(this.$urls.modifyStatisticInfo(), new ModifyStatistic('B公司优惠券领取人数', 1));
          this.$router.go('/');
        }
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
