<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Vue from 'vue';

//
// obtain a mapbox token from https://account.mapbox.com/access-tokens/
// and then create token.js in ./src/components with the following content:
//
//    const token = "<your token>";
//    export { token };
//
import {token} from "./token.js";

export default {
  name: "Map",

  data() {
    return{
      center: [37, -122],
    }
  },

  methods: {
    async setupLeafletMap() {
      const mapDiv = L.map("mapContainer").setView(this.center, 13);

      var tiles = new L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 3,
          maxZoom: 8
        }
      ).addTo(mapDiv);

      const from = [37, -122];

      L.marker(from).addTo(mapDiv);
    },
  },

  async mounted() {
    await Vue.nextTick();
    await this.setupLeafletMap();
  },
};
</script>

<style scoped>
  #mapContainer {
    width: 500px;
    height: 500px;
  }
</style>