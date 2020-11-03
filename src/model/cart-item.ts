export default class CartItem {
  goodsInfo: Goods;

  amount: number;

  constructor(goodsInfo: Goods, amount: number) {
    this.goodsInfo = goodsInfo;
    this.amount = amount;
  }
}
