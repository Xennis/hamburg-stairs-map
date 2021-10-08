<template>
  <l-map @ready="onReady" style="height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <l-geo-json :geojson="geojson" :options="geojsonOptions"></l-geo-json>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LGeoJson} from 'vue2-leaflet';
import { Icon } from 'leaflet';
import HeiligeStiege from '../assets/heilige-stiege.json'

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
    LMarker,
    LGeoJson
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 17,
      center: [50.909000, 14.237500],
      markerLatLng: [51.504, -0.159],

      map: null,
      geojsonOptions: {
        onEachFeature: function onEachFeature(feature, layer) {
          console.log(feature);
          layer.bindPopup("<h3>" + feature.properties.name + "</h3>" + "<pre>"+JSON.stringify(feature.properties, null, " ")+"</pre>");
        },
        style: function(feature) {
          if (feature.properties.wikipedia) {
            return {
              weight: 6,
              color: '#03fcb1'
            }
          }
        },
      }
    };
  },
  async created () {
    this.geojson = HeiligeStiege
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
