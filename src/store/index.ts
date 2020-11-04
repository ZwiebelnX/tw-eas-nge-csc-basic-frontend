import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/model/user';
import CartItem from '@/model/cart-item';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
    cart: new Map(),
  },
  mutations: {
    login(state: any, user: User) {
      state.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    logout(state: any) {
      state.user = undefined;
      sessionStorage.removeItem('user');
    },
    addToCart(state: any, changeInfo: {goodsInfo: Goods; changeAmount: number}) {
      if (state.cart.has(changeInfo.goodsInfo.id)) {
        (state.cart.get(changeInfo.goodsInfo.id) as CartItem).amount += changeInfo.changeAmount;
      } else {
        state.cart.set(changeInfo.goodsInfo.id,
          new CartItem(changeInfo.goodsInfo, changeInfo.changeAmount));
      }
    },
    deleteFromCart(state: any, changeInfo: {goodsInfo: Goods; changeAmount: number}) {
      const cartItem = state.cart.get(changeInfo.goodsInfo.id) as CartItem;
      cartItem.amount -= changeInfo.changeAmount;
      if (cartItem.amount <= 0) {
        state.cart.delete(changeInfo.goodsInfo.id);
      }
    },
    refreshCart(state: any, cartItemList: CartItem[]) {
      state.cart.clear();
      cartItemList.forEach((value) => {
        state.cart.set(value.goodsInfo.id, new CartItem(value.goodsInfo, value.amount));
      });
    },
  },
  actions: {
  },
  modules: {
  },
});
