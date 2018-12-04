import Vue from "vue";
import PrismicVue from "prismic-vue";
import VueProgressBar from "vue-progressbar";
import Notifications from "vue-notification";
import Meta from "vue-meta";

import App from "./App.vue";
import router from "./router";

import "@ibm/type/css/ibm-type.min.css";
import "fractures/dist/fractures.css";
import "socicon/css/socicon.css";

import linkResolver from "./prismic/link-resolver";

Vue.config.productionTip = false;

Vue.use(Meta);

const accessToken = process.env.VUE_APP_API_TOKEN;

Vue.use(PrismicVue, {
  endpoint: "https://ramkumarshankar.cdn.prismic.io/api/v2",
  linkResolver,
  apiOptions: {
    accessToken
  }
});

Vue.use(VueProgressBar, {
  color: "#735290",
  thickness: "5px",
  autoFinish: true
});

Vue.use(Notifications);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
