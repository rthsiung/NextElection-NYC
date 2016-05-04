<!-- template code -->
<template>

<iframe
  frameborder="0"
  v-bind:src=url
  allowfullscreen></iframe>
</template>


<script>
var googleMapsAPIkey = 'AIzaSyCFWn95jlosz4xNi5l6Ug0pMdBrtLrWDDM' // API key for Google Maps Embed API

export default {
  props: [
    "pollsite",
    "useraddress"
  ],
  computed: {
    // Google Maps Embed API
    url: function() {
      
      return "https://www.google.com/maps/embed/v1/directions?key="+googleMapsAPIkey
          +"&origin="+this.useraddress
          +"&destination="+this.pollsite
          +"&avoid=tolls|highways"
          +"&mode=walking"
    }
  }
}
</script>

<!-- style code -->
<style scoped>
iframe {
  border: 0;
  width: 100%;
  min-height: 350px;
}
</style>