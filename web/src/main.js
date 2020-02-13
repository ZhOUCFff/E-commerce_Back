import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入并全局注册TreeTable--------------------------
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)
//-------------------------------------------------

// 导入并全局注册vue-quill-editor--------------------------
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
//----------------------------------------------------------

import 'nprogress/nprogress.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
