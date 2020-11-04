<template>
  <div class="container">
    <ManagementCard :key="item.name" v-for="item in statisticInfoList" :statistic-info="item" />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import httpTools from '@/utils/http-tools';
import ManagementCard from '@/components/ManagementCard.vue';

@Component({
  components: { ManagementCard },
})
export default class Management extends Vue {
  statisticInfoList: StatisticInfo[] = []

  async mounted() {
    if (this.$store.state.user !== undefined) {
      const response = await this.$https.get(this.$urls.getStatisticInfo());
      if (httpTools.is2xxResponse(response.status)) {
        this.statisticInfoList = response.data;
      }
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
