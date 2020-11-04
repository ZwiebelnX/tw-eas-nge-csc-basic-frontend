<template>
  <div class="container">
    <h1>{{storeInfo.name}}</h1>
    <div class="goods-container">
      <GoodsCard :key="goods.id" v-for="goods in goodsList" :goods-info="goods" />
    </div>
    <GuideBox v-if="storeId === '2'" />
    <WinningBox v-if="storeId === '3'" />
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import httpTools from '@/utils/http-tools';
import GuideBox from '@/components/requirements/GuideBox.vue';
import WinningBox from '@/components/requirements/WinningBox.vue';
import GoodsCard from '../components/GoodsCard.vue';

@Component({
  components: { WinningBox, GuideBox, GoodsCard },
})
export default class Store extends Vue {
  goodsList: Goods[] = []

  storeInfo: Store = {}

  @Prop(String) storeId!: string;

  async mounted() {
    const storeInfoResponse = await this.$https.get(this.$urls.getStoreInfo(this.storeId));
    if (httpTools.is2xxResponse(storeInfoResponse.status)) {
      this.storeInfo = storeInfoResponse.data;
    }

    const storeGoodsResponse = await this.$https.get(
      this.$urls.getStoreGoods(this.storeId, 1, 100),
    );
    if (httpTools.is2xxResponse(storeInfoResponse.status)) {
      this.goodsList = storeGoodsResponse.data.data;
    }
  }
}
</script>

<style scoped>
.goods-container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
</style>
