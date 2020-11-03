<template>
  <div class="container">
    <el-card :body-style="{ padding: '0px' }">
      <el-image alt="" :src="goodsInfo.imageUrl" class="image" fit="cover" />
      <div class="info-container">
        <div class="goods-title"><span>{{ goodsInfo.name }}</span></div>
        <div class="goods-description"><span>{{ goodsInfo.description }}</span></div>
        <div class="info-bottom-container">
          <el-button type="text" class="store-button">{{goodsInfo.storeName}}</el-button>
          <el-button type="primary" icon="el-icon-shopping-cart-2" circle size="small"
                     class="add-to-cart-button" @click="addToCart"></el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import CartItem from '@/model/cart-item';
import httpTools from '@/utils/http-tools';

@Component
export default class GoodsCard extends Vue {
  @Prop() goodsInfo!: Goods;

  async addToCart() {
    if (this.$store.state.user !== undefined) {
      const response = await this.$https.post(this.$urls.addGoodsToCart(),
        new CartItem(this.goodsInfo, 1));
      if (httpTools.is2xxResponse(response.status)) {
        this.$store.commit('addToCart', this.goodsInfo);
        this.$message.success('添加到购物车成功');
      }
    } else {
      this.$message.warning('请先登录');
      this.$router.push('/login').then();
    }
  }
}
</script>

<style scoped>
.container{
  margin: 20px;
}

.image{
  width: 300px;
  height: 300px;
}

.info-container{
  padding-bottom: 20px;
}

.goods-title{
  font-weight: bolder;
  padding-bottom: 10px;
}

.goods-description{
  color: gray;
  margin-bottom: 10px;
}

.info-container{
  width: 300px;
  height: 100px;
}

.store-button{
  text-decoration: underline;
  color: lightgray;
  margin-right: 20px;
}

</style>
