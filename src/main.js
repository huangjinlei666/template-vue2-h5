import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import 'amfe-flexible';
import * as filters from './filters'
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
