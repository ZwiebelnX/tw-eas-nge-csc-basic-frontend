export default class ModifyStatistic {
  statisticName: string;

  modifyValue: string;

  constructor(statisticName: string, modifyValue: string) {
    this.statisticName = statisticName;
    this.modifyValue = modifyValue;
  }
}
