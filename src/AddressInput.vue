<!-- template code -->
<template>

<!--Address Input Area-->
  <h2>Where do I vote?<br>Who are the candidates?</h2>

  <p class="input-label">Your Registered Voting Address</p>
  <input style="width: 95%;" id="addressInputField" placeholder="e.g. 25 West 4th St, New York, NY 10012" type="text"
  ></input>

  <p><span class="showhide">I'm not sure if (or where) I'm registered to vote</span>.</p>

  

<!--Everything you need to know to vote!-->

  <div style="display:none;" id="everything-you-need-know">
    Here's your poll site:
    <pollsite 
    streetnumber= {{ addressDetailsStreetNumber }}
    streetname= {{ addressDetailsStreetName }} 
    postalcode= {{ addressDetailsPostalCode }}
    ></pollsite>
    <!--<ballot districtkey="" electionid=""></ballot>-->
  </div>


</template>

<!-- logic code -->
<script>
var browserKey = 'AIzaSyCFWn95jlosz4xNi5l6Ug0pMdBrtLrWDDM' // API key for Google Maps Javascript API

export default {

  data: function() {
    return {
      addressDetails: {},
      addressDetailsStreetName: "", //for poll site
      addressDetailsStreetNumber: "", //for poll site
      addressDetailsPostalCode: "", //for poll site
      addressDetailsDistrictKey: "", //for ballot
      addressDetailsElectionID: ""  //for ballot
    }
  },

  methods: {
  },

  ready: function() {
    //Take the address input field and add Google's autocomplete dropdown feature to it
    //I'm using the Google Maps Javascript API, which has an autocomplete feature
    var addressinputfield = document.getElementById("addressInputField");
    var userAddressAutocompleteObject = new google.maps.places.Autocomplete(addressinputfield);

    //When the user enters in a new address, Google's autocomplete feature will update and we can return this new address's details using .getPlace()
    userAddressAutocompleteObject.addListener('place_changed', function(){
      this.addressDetails = userAddressAutocompleteObject.getPlace();
    //console.log(JSON.stringify(this.addressDetails));

    //Create a new array with just the address components, and then just get the first type and the long_name
    var justcomponents = this.addressDetails.address_components;
    var typeandLongName = {};
    justcomponents.forEach(function (component) {
      typeandLongName[component.types[0]] = component.long_name;
    });
    //console.log(typeandLongName);

    //Save the streetname, streetnumber,and postalcode
    this.addressDetailsStreetNumber = typeandLongName.street_number;
    this.addressDetailsStreetName = typeandLongName.route;
    this.addressDetailsPostalCode = typeandLongName.postal_code;

    console.log("street number is " + this.addressDetailsStreetNumber);
    console.log("street name is " + this.addressDetailsStreetName);
    console.log("zipcode is " + this.addressDetailsPostalCode);
    


    });
    
  }

}
</script>

<style scoped>
</style>