<template>
    <div id="container">
        <div id="mapContainer"></div>
    </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Vue from 'vue';

export default {
    name: 'Map',

    methods: {
        async setupLeafletMap() {
            const center = [37, -122];

            const mapDiv = L.map('mapContainer').setView(center, 13);

            var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 3,
                maxZoom: 8
            }).addTo(mapDiv);

            L.marker(center).addTo(mapDiv);
        }
    },

    async mounted() {
        await Vue.nextTick();
        await this.setupLeafletMap();
    }
};
</script>

<style scoped>
#mapContainer {
    width: 500px;
    height: 500px;
}
</style>
