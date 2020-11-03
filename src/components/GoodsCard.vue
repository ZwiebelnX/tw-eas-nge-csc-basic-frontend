<template>
  <div class="container">
    <el-card :body-style="{ padding: '0px' }">
      <el-image alt="" :src="goodsInfo.imageUrl" class="image" fit="cover" />
      <div class="info-container">
        <div class="goods-title"><span>{{ goodsInfo.name }}</span></div>
        <div class="goods-description"><span>{{ goodsInfo.description }}</span></div>
        <el-button type="primary" size="small" class="button">添加至购物车</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class GoodsCard extends Vue {
  @Prop() goodsInfo!: Goods
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
  padding-bottom: 10px;
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

</style>
