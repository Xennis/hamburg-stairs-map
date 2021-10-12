import Vue from 'vue'
import App from './App.vue'

import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
