<template>
  <div class="container">
    <el-table :data="coupons" stripe class="table">
      <el-table-column label="优惠券名" prop="couponName" align="center"></el-table-column>
      <el-table-column label="可用于" prop="storeName" align="center"></el-table-column>
      <el-table-column label="过期时间" prop="expireTime" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import httpTools from '@/utils/http-tools';

@Component
export default class Coupon extends Vue {
  coupons = [];

  async mounted() {
    const response = await this.$https.get(this.$urls.getCouponList(1, 100));
    if (httpTools.is2xxResponse(response.status)) {
      this.coupons = response.data.data;
    }
  }
}
</script>

<style scoped>
.table{
  width: 70%;
  margin: 20px auto 10px auto;
  text-align: center;
}
</style>
