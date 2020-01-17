import Vue from 'vue'
import App from './App'
import router from './router'
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from 'element-ui';
import Resource from 'vue-resource'
import vuex from "vuex"
import store from "./vuex/store"
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Resource);
Vue.use(vuex)
Vue.http.options.emulateJSON = true;
// Vue.http.options.headers = {
//   'Content-Type': 'charset=UTF-8'
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
