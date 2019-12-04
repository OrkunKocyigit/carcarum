import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'
import { BNav, BNavItem, BForm, BFormGroup, BFormSelect, BFormInput, BButton, VBToggle, BCollapse, BCard, BProgress, BProgressBar, BTable, BImg } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import 'core-js/modules/es.promise'
import 'core-js/modules/es.array.iterator'
// Bootstrap
Vue.component('b-nav', BNav)
Vue.component('b-nav-item', BNavItem)
Vue.component('b-form', BForm)
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form-select', BFormSelect)
Vue.component('b-form-input', BFormInput)
Vue.component('b-button', BButton)
Vue.component('b-collapse', BCollapse)
Vue.component('b-card', BCard)
Vue.component('b-progress', BProgress)
Vue.component('b-progress-bar', BProgressBar)
Vue.component('b-table', BTable)
Vue.component('b-img', BImg)
Vue.directive('b-toggle', VBToggle)
// Analytics
Vue.use(VueAnalytics, {
  id: 'UA-153603466-1',
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
