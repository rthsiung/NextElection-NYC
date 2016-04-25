<!-- template code -->
<template>

<iframe
  frameborder="0"
  v-bind:src=url
  allowfullscreen></iframe>
</template>


<script>

export default {

  data:function(){
    return {
      placeConverted: ""
    }
  },
  props: [
    "place"
  ],
  computed: {
    // e.g. "26 Broadway, New York, NY" becomes "26+Broadway,+New+York,+NY"
    placeConverted: function() {
      return this.place.replace(/\s/g, '+')
    },
    // this is a computed property that uses our key, and placeConverted property to generate the url in the format that Google Maps Embed API needs.
    url: function() {
      
      return "https://www.google.com/maps/embed/v1/place?key="+googleMapsAPIkey+"&q="+this.placeConverted
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