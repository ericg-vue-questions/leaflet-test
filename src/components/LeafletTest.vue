<template>
    <div id="container">
        <div id="mapContainer"></div>
    </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Vue from 'vue';

//
// obtain a mapbox token from https://account.mapbox.com/access-tokens/
// and then create token.js in ./src/components with the following content:
//
//    const token = "<your token>";
//    export { token };
//
import { token } from './token.js';

export default {
    name: 'Map',

    data() {
        return {
            center: [37.781814, -122.40474]
        };
    },

    methods: {
        async setupLeafletMap() {
            const mapDiv = L.map('mapContainer').setView(this.center, 13);

            L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`, {
                attribution:
                    'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                accessToken: `${token}`
            }).addTo(mapDiv);

            const from = [37.781814, -122.40474];
            const to = [37.80012, -122.404827];

            var polylinePoints = [from, to];

            var polyline = L.polyline(polylinePoints, { color: 'red' }).addTo(mapDiv);
            var decorator = L.polylineDecorator(polyline, {
                patterns: [
                    // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                    { offset: 0, repeat: 20, symbol: L.Symbol.dash({ pixelSize: 10 }) }
                ]
            }).addTo(mapDiv);

            const response = await fetch('/TheCloud.svg');
            const source = await response.text();

            console.log('response', source);
            const size = 50;

            const cloudIcon = L.divIcon({
                html: source,
                className: 'my-custom-icons',
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2]
            });

            L.marker(from, { icon: cloudIcon }).addTo(mapDiv);

            console.log(polyline);
            console.log(decorator);
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

#mapContainer >>> .my-custom-icons {
    background-color: red;
}
</style>
