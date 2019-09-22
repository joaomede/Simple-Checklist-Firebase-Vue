import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import mixinsComputed from "./plugins/mixinsComputed";

Vue.use(VueCookie);
Vue.use(firebase);
Vue.mixin(mixinsComputed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
