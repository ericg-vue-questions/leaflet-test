<template>
  <img src="./TheCloud.svg" />
</template>

<script>
export default {
  name: "Map",

  data() {

    this.loadSVGIcon();

    return{
    }
  },

  methods: {
    async loadSVGIcon() {
      const response = await fetch( "./TheCloud.svg" );
      const svgSrc = await response.text();

      console.log( "loadSVGIcon", response );
      console.log( "loadSVGIcon", svgSrc );
    },
  },
};
</script>

<style scoped>
</style>
