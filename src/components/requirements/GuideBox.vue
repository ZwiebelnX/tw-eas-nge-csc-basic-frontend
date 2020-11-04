<template>
  <div class="container">
    <el-dialog
      title="新手引导"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是华丽的新手引导页面。请点击下面三个按钮来获取优惠券</span>
      <div class="button-container">
        <el-button type="primary" :disabled="this.buttonDisable[0]" @click="buttonClick(0)">
          按钮1
        </el-button>
        <el-button type="primary" :disabled="this.buttonDisable[1]" @click="buttonClick(1)">
          按钮2
        </el-button>
        <el-button type="primary" :disabled="this.buttonDisable[2]" @click="buttonClick(2)">
          按钮3
        </el-button>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import httpTools from '@/utils/http-tools';

@Component
export default class GuideBox extends Vue {
  dialogVisible = false;

  buttonDisable = [false, false, false];

  async mounted() {
    if (this.$store.state.user !== undefined) {
      const response = await this.$https.get(this.$urls.getCouponList(1, 100));
      if (httpTools.is2xxResponse(response.status)) {
        const coupon = (response.data.data as Coupon[])
          .find((value) => value.couponName === 'B公司优惠券');
        if (coupon === undefined) {
          this.dialogVisible = true;
        }
      }
    }
  }

  handleClose(done: any) {
    this.$confirm('确认关闭？')
      .then(() => {
        done();
      })
      .catch();
  }

  async buttonClick(buttonIndex: number) {
    this.buttonDisable[buttonIndex] = true;
    if (this.buttonDisable.reduce((p, c) => p && c)) {
      this.dialogVisible = false;
      this.$message.success('您已成功完成新手引导。');
      const response = await this.$https.post(this.$urls.addCouponToUser(), { id: '1' });
      if (httpTools.is2xxResponse(response.status)) {
        this.$message.success('优惠券已发放，请到优惠券列表查看。');
      }
    }
  }
}
</script>

<style scoped>
.button-container{
  margin: 10px;
}
</style>
