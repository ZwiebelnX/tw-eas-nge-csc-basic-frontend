<template>
  <div class="container">
    <el-table :data="cart" stripe class="table">
      <el-table-column label="商品" align="center">
        <template slot-scope="scope">
          <div class="goods-info-container">
            <el-image alt="" fit="cover" :src="scope.row.goodsInfo.imageUrl"
                      class="goods-image"></el-image>
            <span>{{scope.row.goodsInfo.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺名" prop="goodsInfo.storeName" align="center"></el-table-column>
      <el-table-column label="数量" prop="amount" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.amount" label="数量"
                           @change="(currentValue, oldValue) =>
                           {handleAmountChange(currentValue, oldValue,scope.row.goodsInfo)}">
          </el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import httpTools from '@/utils/http-tools';

@Component
export default class Cart extends Vue {
  cart = Array.from(this.$store.state.cart.values());

  async mounted() {
    if (this.$store.state.user === undefined) {
      this.$message.warning('请先登录');
      await this.$router.push('/login');
    }
    const response = await this.$https.get(this.$urls.getCartList(1, 100));
    if (httpTools.is2xxResponse(response.status)) {
      this.$store.commit('refreshCart', response.data.data);
    }
    this.cart = Array.from(this.$store.state.cart.values());
  }

  async handleAmountChange(currentValue: number, oldValue: number, goodsInfo: Goods) {
    let changeAmount = currentValue - oldValue;
    if (changeAmount > 0) {
      const response = await this.$https
        .post(this.$urls.addGoodsToCart(), { goodsId: goodsInfo.id, amount: changeAmount });
      if (httpTools.is2xxResponse(response.status)) {
        this.$store.commit('addToCart', { goodsInfo, changeAmount });
      }
    } else {
      changeAmount = Math.abs(changeAmount);
      const response = await this.$https
        .delete(this.$urls.deleteGoodsFromCart(),
          { data: { goodsId: goodsInfo.id, amount: changeAmount } });
      if (httpTools.is2xxResponse(response.status)) {
        this.$store.commit('deleteFromCart', { goodsInfo, changeAmount });
      }
    }

    const response = await this.$https.get(this.$urls.getCartList(1, 100));
    if (httpTools.is2xxResponse(response.status)) {
      this.$store.commit('refreshCart', response.data.data);
    }
    this.cart = Array.from(this.$store.state.cart.values());
  }
}
</script>

<style scoped>
.table{
  width: 70%;
  margin: 20px auto 10px auto;
  text-align: center;
}

.goods-info-container{
  display: flex;
  flex-flow: column;
  align-items: center;
}

.goods-image {
  width: 100px;
  height: 100px;
}
</style>
