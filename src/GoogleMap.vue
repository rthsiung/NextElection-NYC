<!-- template code -->
<template>
  <iframe
  frameborder="0"
  v-bind:src=url
  allowfullscreen></iframe>
</template>

<!-- logic code -->
<script>
var browserKey = 'AIzaSyCFWn95jlosz4xNi5l6Ug0pMdBrtLrWDDM' // my Google Maps browser key
export default {
  // a slightly more advanced example of how to use props that includes type validation (you'll get an error if you try to pass in something that isn't a String), and also provides a default value if you forget to supply a value.
  props: {
    place: {
      type: String,
      default: '169 13th St, Brooklyn, NY 11215'
    }
  },
  computed: {
    // this is a computed property that replaces every space charater in the place property with a '+' character.
    // e.g. "26 Broadway, New York, NY" becomes "26+Broadway,+New+York,+NY"
    placeConverted: function() {
      return this.place.replace(/\s/g, '+')
    },
    // this is a computed property that uses our key, and placeConverted property to generate the url in the format that Google Maps Embed API needs.
    url: function() {
      return "https://www.google.com/maps/embed/v1/place?key="+browserKey+"&q="+this.placeConverted
    }
  }
}
</script>

<!-- style code -->
<style scoped>
iframe {
  border: 0;
  min-width: 250px;
  min-height: 250px;
}
</style>