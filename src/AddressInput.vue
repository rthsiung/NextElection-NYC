<!-- template code -->
<template>

  <p class="input-label">Your Registered Voting Address</p>
  <input
    style="width: 95%;"
    id="address"
    placeholder="e.g. 25 West 4th St, New York, NY 10012"
    autocomplete="off"
    type="text"
    v-model="addressEntered"
    v-on:keyup="lookupAddress | debounce 500"
  ></input>

  <googlemap :place="googFormattedAddress"></googlemap>

  <p>First match Google found is: <em>{{ googFormattedAddress }}</em></p>
  <ol><li v-for="component in addressComponents">
      {{ component.types | json }}: <strong> {{ component.long_name }} </strong>
  </li></ol>

  <pollsite streetnumber= streetname= postalcode=
  ></pollsite>

api response
  <p>
    {{ debugResponseData | json }}
  </p>
  

</template>

<!-- logic code -->
<script>

var browserKey = 'AIzaSyCFWn95jlosz4xNi5l6Ug0pMdBrtLrWDDM' // my browser key

export default {

  data: function() {
    return {
      addressEntered: "", 
      googFormattedAddress: "", 
      location: {}, //lat, long
      addressComponents: [], //streetname, zip, etc
      debugResponseData: {} 
    }
  },

  methods: {
    lookupAddress: function () {
      var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.addressEntered + "&key=" + browserKey
      this.$http.get(geocodeURL).then(function (response) {
        // the API can return multiple possible matches, if it does, assume that the first result (at index '0') is the correct match
        var firstMatch = response.data.results[0] 
        this.googFormattedAddress = firstMatch.formatted_address
        this.location = firstMatch.geometry.location
        this.addressComponents = firstMatch.address_components
        this.debugResponseData = response.data

        get


      }, function (response) {
          // error callback
      })

    }
  },
}

</script>


<style scoped>
</style>