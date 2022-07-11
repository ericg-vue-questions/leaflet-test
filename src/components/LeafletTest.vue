<template>
    <div id="container">
        <div id="mapContainer"></div>
    </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Vue from 'vue';
import data from './france.geo.json';

export default {
    name: 'Map',

    data() {
        return {
            center: [46.2276, 2.2137]
        };
    },

    methods: {
        async setupLeafletMap() {
            const mapDiv = L.map('mapContainer').setView(this.center, 4);

            var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 3,
                maxZoom: 8
            }).addTo(mapDiv);

            L.geoJSON(data, {
                onEachFeature: this.onEachFeature,
                style: this.styleMap
            }).addTo(mapDiv);

            L.control.lasso({ intersect: true }).addTo(mapDiv);

            mapDiv.on('mousedown', () => {
                console.log('mousedown');
                this.resetSelectedState();
            });
            mapDiv.on('lasso.finished', (event) => {
                console.log('lasso.finished');
                this.setSelectedLayers(event.layers);
            });
            mapDiv.on('lasso.enabled', () => {
                console.log('lasso.enabled');
                this.resetSelectedState();
            });
            mapDiv.on('lasso.disabled', () => {
                console.log('lasso.disabled');
            });
        },

        onEachFeature(feature, layer) {
            console.log('onEachFeature', feature.properties.name_long);
        },

        styleMap() {
            return { color: 'green', fillOpacity: 0 };
        },

        resetSelectedState() {
            console.log('resetSelectedState');

            // map.eachLayer((layer) => {
            //     if (layer instanceof L.Marker && !(layer instanceof L.MarkerCluster)) {
            //         layer.setIcon(new L.Icon.Default());
            //     } else if (layer instanceof L.Path) {
            //         layer.setStyle({ color: '#3388ff' });
            //     }
            // });
            // lassoResult.innerHTML = '';
        },

        setSelectedLayers(layers) {
            console.log('setSelectedLayers', layers);
            this.resetSelectedState();

            layers.forEach((layer) => {
                const name = layer.feature.properties.name_long;

                console.log('setSelectedLayers', name);
            });

            // lassoResult.innerHTML = layers.length ? `Selected ${layers.length} layers` : '';
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
    width: 1000px;
    height: 500px;
}

#mapContainer >>> .my-custom-icons {
    background-color: red;
}
</style>
