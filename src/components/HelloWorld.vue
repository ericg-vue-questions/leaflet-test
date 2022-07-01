<template>
  <leaflet-test></leaflet-test>
</template>

<script>
import LeafletTest from './LeafletTest.vue'
export default {
  components: { LeafletTest },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
