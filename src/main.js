import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import taskDialog from './views/table-task-dialog/index'
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(taskDialog)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
