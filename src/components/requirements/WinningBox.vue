<template>
  <div class="container">

  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import httpTools from '@/utils/http-tools';
import ModifyStatistic from '@/model/modify-statistic';

@Component
export default class WinningBox extends Vue {
  timer = {}

  async mounted() {
    if (this.$store.state.user !== undefined) {
      const response = await this.$https.get(this.$urls.getCouponList(1, 100));
      if (httpTools.is2xxResponse(response.status)) {
        const coupon = (response.data.data as Coupon[])
          .find((value) => value.couponName === 'C公司优惠券');
        if (coupon === undefined) {
          this.timer = setTimeout(this.winThePrice, 5000);
        }
      }
    }
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }

  async winThePrice() {
    const response = await this.$https.post(this.$urls.addCouponToUser(), { id: '3' });
    if (httpTools.is2xxResponse(response.status)) {
      await this.$alert('恭喜您中奖了！优惠券已发放，请到优惠券列表查看', '恭喜中奖', {
        confirmButtonText: '确定',
      });
      await this.$https.patch(this.$urls.modifyStatisticInfo(), new ModifyStatistic('C公司优惠券领取人数', 1));
    }
  }
}
</script>

<style scoped>

</style>
