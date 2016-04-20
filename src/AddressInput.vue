<template>

<!--Address Input Area-->
  <h2>Where do I vote?<br>Who are the candidates?</h2>

  <p>Enter the address where you're registered to vote:</p>
  <input style="width: 100%;" id="addressInputField" placeholder="e.g. 25 West 4th St, New York, NY 10012" type="text"
  ></input>

  <p><span class="moreinfo">I'm not sure where (or if) I'm registered to vote</span>.</p>

<!--
  <p>Formatted address is {{formattedAddress}}.</p>
  <p>Google Maps URL is <a href="{{googlemapsURL}}">{{googlemapsURL}}</a>.</p>
-->

  <div v-if="addressDetailsStreetNumber != ''">
    <pollsite
      v-bind:streetnumber = "addressDetailsStreetNumber"
      v-bind:streetname = "addressDetailsStreetName"
      v-bind:postalcode = "addressDetailsPostalCode"
      ></pollsite>
  </div>

<!--
<p>For debugging:</p>
<pre>{{$data | json}}</pre>
-->

</template>

<script>
var browserKey = 'AIzaSyCFWn95jlosz4xNi5l6Ug0pMdBrtLrWDDM' // API key for Google Maps Javascript API

export default {

  data: function() {
    return {
      addressDetails: {}, // object that stores the address details returned by Google's autocomplete API
      formattedAddress: "",
      googlemapsURL: "",
      addressComponentsFormatted: {},

      addressDetailsStreetNumber: "", 
      addressDetailsStreetName: "",
      addressDetailsPostalCode: "", 

      addressDetailsDistrictKey: '', 
      addressDetailsElectionID: ''
    }
  },

  ready: function() {
    //Take the address input field and add Google's autocomplete dropdown feature to it
    //I'm using the Google Maps Javascript API, which has an autocomplete feature
    var addressinputfield = document.getElementById("addressInputField");
    var addressAPIresponse = new google.maps.places.Autocomplete(addressinputfield);

    //When the user enters in a new address, Google's autocomplete feature will update and we can return this new address's details using .getPlace()
    addressAPIresponse.addListener('place_changed', () => {
      this.addressDetails = addressAPIresponse.getPlace();
      this.formattedAddress = this.addressDetails.formatted_address;    
      this.googlemapsURL = this.addressDetails.url;

      //Create a new array with just the address components, then format it so that the keys are the "type", and the values are the "long_name" 
      var addressComponents = this.addressDetails.address_components;
      var addressComponentsFormatted = {};
      addressComponents.forEach(function (component) {
        addressComponentsFormatted[component.types[0]] = component.long_name;
      });
      console.log(JSON.stringify(this.addressDetails));
      //console.log(JSON.stringify(addressComponentsFormatted));

      //Save the streetname, streetnumber,and postalcode
      this.addressDetailsStreetNumber = addressComponentsFormatted.street_number;
      this.addressDetailsStreetName = addressComponentsFormatted.route;
      this.addressDetailsPostalCode = addressComponentsFormatted.postal_code;
 
    });
    
  }

}
</script>

<style scoped>
</style>