import Vue from 'vue';
import service from '@/utils/http-client';
import urls from '@/utils/urls';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';

Vue.config.productionTip = false;
Vue.prototype.$https = service;
Vue.prototype.$urls = urls;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
