import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import "./style/style.css";
import VueCookies from "vue-cookies";
import mixinsComputed from "./plugins/mixinsComputed";

VueCookies.config("2d");

Vue.use(VueCookies);
Vue.use(firebase);
Vue.mixin(mixinsComputed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
