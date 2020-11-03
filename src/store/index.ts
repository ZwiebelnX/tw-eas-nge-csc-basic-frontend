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
    },
    logout(state: any) {
      state.user = undefined;
    },
    addToCart(state: any, goodsInfo: Goods) {
      if (state.cart.has(goodsInfo.id)) {
        (state.cart.get(goodsInfo.id) as CartItem).amount += 1;
      } else {
        state.cart.set(goodsInfo.id, new CartItem(goodsInfo, 1));
      }
    },
    deleteCartItem(state: any, deleteInfo: {id: string; amountToDelete: number}) {
      const cartItem = state.cart.get(deleteInfo.id) as CartItem;
      cartItem.amount -= deleteInfo.amountToDelete;
    },
  },
  actions: {
  },
  modules: {
  },
});
