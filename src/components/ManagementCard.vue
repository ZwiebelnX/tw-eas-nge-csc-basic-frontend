<template>
  <div class="container">
    <el-card>
      <div class="info-container">
        <div class="title"><span>{{ statisticInfo.name }}</span></div>
        <div class="content">
          <span>{{ `${statisticInfo.value} ${statisticInfo.unit}` }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class ManagementCard extends Vue {
  @Prop() statisticInfo!: StatisticInfo
}
</script>

<style scoped>
.container {
  margin-top: 50px;
  width: 400px;
  height: 100px;
}

.title {
  font-weight: bolder;
  font-size: 1.4em;
}
</style>
