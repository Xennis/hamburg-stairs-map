<template>
  <l-map @ready="onReady" style="position: absolute; top: 0; bottom: 0; width: 100%;" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geo-json :geojson="stepsData" :options="stepsDataOptions"></l-geo-json>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet';
import {Icon} from 'leaflet';
import StepsHamburg from '../assets/steps-hamburg.json'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data () {
    return {
      url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieGVubmlzIiwiYSI6ImNrdWxpYmMwNjFtY3gycG15c2htN2gxenoifQ.V2BLrQ8MqJ0E9c7lHIVnug',
      attribution:
        '&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>',
      zoom: 15,
      center: [53.551086, 9.993682],
      map: null,
      stepsDataOptions: {
        onEachFeature: function onEachFeature(feature, layer) {
          var text = '';
          if (feature.properties.name) {
            text += '<h3>' + feature.properties.name + '</h3>'
          }
          text += '<pre>'
          for (const [key, value] of Object.entries(feature.properties)) {
            if (['@id', 'highway'].includes(key)) {
              continue;
            }
            text += `${key}: ${value}\n`;
          }
          text += '</pre><p>Data: <a href="https://www.openstreetmap.org/' + feature.properties["@id"] + '" target="_blank">OpenStreetMap</a> / <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank">ODbL</a></p>'
          layer.bindPopup(text);
        },
        style: function(feature) {
          if (feature.properties.sac_scale) {
            return {
              color: '#F4941B'
            }
          }
        },
        //filter: function(feature) {
        //  return feature.properties.handrail == 'no';
        //},
      }
    };
  },
  async created () {
    this.stepsData = StepsHamburg
  },
  methods: {
    onReady(mapObject) {
      this.map = mapObject
    }
  },
}</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
