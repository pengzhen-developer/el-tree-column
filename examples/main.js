import Vue from 'vue'
import Demo from './Demo.vue'

import EL from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElTreeColumn from './../packages/el-tree-column/index'

Vue.use(EL)
Vue.use(ElTreeColumn)

Vue.config.productionTip = false

new Vue({
  render: h => h(Demo)
}).$mount('#app')
