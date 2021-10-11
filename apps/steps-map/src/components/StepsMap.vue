<template>
  <div id="map" />
</template>

<script>
import mapboxgl from "mapbox-gl";
import StepsHamburg from "../assets/steps-hamburg.json";

export default {
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoieGVubmlzIiwiYSI6ImNrdWxpYmMwNjFtY3gycG15c2htN2gxenoifQ.V2BLrQ8MqJ0E9c7lHIVnug",
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [9.993682, 53.551086],
      zoom: 14,
    })
      .addControl(new mapboxgl.NavigationControl({ showCompass: false }))
      .addControl(new mapboxgl.GeolocateControl());

    map.on("load", () => {
      map.addSource("steps", {
        type: "geojson",
        data: StepsHamburg,
      });
      map.addLayer({
        id: "steps",
        type: "line",
        source: "steps",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3388ff",
          "line-width": 4,
        },
      });

      // Add pop-up
      map.on("click", "steps", (e) => {
        const properties = e.features[0].properties;

var description = "";
        if (properties.name) {
          description += "<h3>" + properties.name + "</h3>";
        }
        description += "<pre>";
        for (const [key, value] of Object.entries(properties)) {
          if (["@id", "highway"].includes(key)) {
            continue;
          }
          description += `${key}: ${value}\n`;
        }
        description +=
          '</pre><p>Data: <a href="https://www.openstreetmap.org/' +
          properties["@id"] +
          '" target="_blank">OpenStreetMap</a> / <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank">ODbL</a></p>';

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(description)
          .addTo(map);
      });

      // Cursor when the mouse is over the layer.
      map.on("mouseenter", "steps", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "steps", () => {
        map.getCanvas().style.cursor = "";
      });
    });
  },
};
</script>
<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
