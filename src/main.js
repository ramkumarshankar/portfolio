import Vue from 'vue'
import PrismicVue from 'prismic-vue'

import App from './App.vue'
import router from './router'

import '@ibm/type/css/ibm-type.min.css'
import 'fractures/dist/fractures.css'
import 'socicon/css/socicon.css'

import linkResolver from './prismic/link-resolver'

Vue.config.productionTip = false

Vue.use(PrismicVue, {
  endpoint: 'https://ramkumarshankar.cdn.prismic.io/api/v2',
  linkResolver
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
