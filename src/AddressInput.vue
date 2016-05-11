<template>

<!--Address Input Area-->
  <h2>Who are the candidates?<br>Where do I vote?</h2>

  <p class="clearsans-light">Easy! What's the address where you're registered to vote?</p>
  <input style="width: 100%;" id="addressInputField" placeholder="e.g. 25 West 4th St, New York, NY 10012" type="text" v-model="addressinput"
  ></input>

<p><span class="moreinfo" v-on:click="showVoterLookup" v-if="addressinput == null">
  I'm not sure where / if I'm registered to vote. <span class="icon-expand_more"></span>
</span></p>

  <div class="showinfo" v-if="showVoterLookupToggle" transition="fade">
  <p>You're in luck! The New York State Board of Elections has a tool where you can check your voter registration online:</p> 
  <p><a target="_blank" href="https://voterlookup.elections.state.ny.us/"><button>Go check your registration > </button></a></p>
  </div>

  <div v-if="addressDetailsStreetNumber != ''">
    <pollsite
      v-bind:streetnumber = "addressDetailsStreetNumber"
      v-bind:streetname = "addressDetailsStreetName"
      v-bind:postalcode = "addressDetailsPostalCode"

      v-bind:electiontype = "electiontype"
      v-bind:useraddress = "formattedAddress"
      ></pollsite>
  </div>

<!--
<p>For debugging:</p>
<pre>{{$data | json}}</pre>
-->

</template>

<script>

export default {

  data: function() {
    return {
      addressinput: null,
      showVoterLookupToggle: false,
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

      //Save the streetname, streetnumber,and postalcode
      this.addressDetailsStreetNumber = addressComponentsFormatted.street_number;
      this.addressDetailsStreetName = addressComponentsFormatted.route;
      this.addressDetailsPostalCode = addressComponentsFormatted.postal_code;
 
    });
  }, //close ready:function

  props: [
    "electiontype"
    ],

  methods:{
    showVoterLookup: function (event){
      this.showVoterLookupToggle = !this.showVoterLookupToggle
    }
  }

}
</script>

<style scoped>

</style>