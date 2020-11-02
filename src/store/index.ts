import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/utils/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
  },
  mutations: {
    login(state: any, user: User) {
      state.user = user;
    },
    logout(state: any) {
      state.user = undefined;
    },
  },
  actions: {
  },
  modules: {
  },
});
