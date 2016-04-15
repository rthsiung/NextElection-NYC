<!-- template code -->
<template>

  <p class="input-label">Your Registered Voting Address</p>
  <input
    style="width: 95%;"
    id="addressInputField"
    placeholder="e.g. 25 West 4th St, New York, NY 10012"
    type="text"
  ></input>
  <button v-on:click="">Go</button>

  
  <div id="everything-you-need-know">
    <pollsite streetnumber="" streetname="" postalcode=""></pollsite>
  </div>

</template>

<!-- logic code -->
<script>
var browserKey = 'AIzaSyCFWn95jlosz4xNi5l6Ug0pMdBrtLrWDDM' // my browser key

export default {

  data: function() {
    return {
      addressDetails: []      
    }
  },

  methods: {

  },

  ready: function() {
    //Take the address input field and add Google's autocomplete dropdown feature to it
    var addressinputfield = document.getElementById("addressInputField");
    var userAddressAutocompleteObject = new google.maps.places.Autocomplete(addressinputfield);

    //When the user enters in a new address, Google's autocomplete feature will update and we can return this new address's details using .getPlace()
    userAddressAutocompleteObject.addListener('place_changed', function(){
      this.addressDetails = userAddressAutocompleteObject.getPlace();
      console.log(this.addressDetails);
    });
    
  }

}
</script>

<style scoped>
</style>