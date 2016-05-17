<template>
  <h2>What am I voting for, and where do I vote?</h2>
  <p>It depends! Where are you registered to vote?</p>

  <!--Address Input Area-->
  <div class="inputwrapper">
    <input id="addressInputField" placeholder="e.g. 25 West 4th St, New York, NY 10012" type="text" v-model="addressinput"
    ></input>
    <!--x button to clear address input-->
    <button v-if="addressinput" class="clearinput" v-on:click="addressinput=''"><span class="icon-cancel"></span></button>
  </div>
 
<p><span class="moreinfo" v-on:click="showVoterLookup" v-if="!addressinput">
  Help! I'm not sure if or where I'm registered to vote.&nbsp;<span class="icon-expand_more"></span>
</span></p>

  <div class="showinfo" v-if="!addressinput && showVoterLookupToggle" transition="fade">
  <p>You're in luck! The NY Board of Elections has a tool where you can check your voter registration online:</p> 
  <p><a target="_blank" href="https://voterlookup.elections.state.ny.us/"><button>Check my voter registration!</button></a></p>
  </div>

  <div v-if="addressinput && addressDetailsStreetNumber != ''">
    <pollsite
      v-bind:streetnumber = "addressDetailsStreetNumber"
      v-bind:streetname = "addressDetailsStreetName"
      v-bind:postalcode = "addressDetailsPostalCode"

      v-bind:electiondetails = "electiondetails"
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
    "electiondetails"
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