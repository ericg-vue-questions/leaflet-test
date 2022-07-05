import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

require("../node_modules/leaflet-polylinedecorator/dist/leaflet.polylineDecorator.js");

new Vue({
    render: (h) => h(App)
}).$mount("#app");
