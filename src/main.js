import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@ibm/type/css/ibm-type.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
