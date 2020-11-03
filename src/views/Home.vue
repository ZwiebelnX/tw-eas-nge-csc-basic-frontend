<template>
  <div class="container">
    <GoodsCard :key="goods.id" v-for="goods in goodsList" :goods-info="goods" />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import GoodsCard from '@/components/GoodsCard.vue';
import httpTools from '@/utils/http-tools';

@Component({
  components: { GoodsCard },
})
export default class Home extends Vue {
  totalPages = 0;

  goodsList: object[] = [];

  async mounted() {
    const response = await this.$https.get(this.$urls.getGoodsList(1, 100));
    if (httpTools.is2xxResponse(response.status)) {
      const responseEntity = response.data as PageableResponse;
      this.totalPages = responseEntity.totalPages;
      this.goodsList = responseEntity.data as object[];
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
</style>
