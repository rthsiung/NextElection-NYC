<!-- template code -->
<template>

  <p class="input-label">Your Registered Voting Address</p>
  <input
    style="width: 95%;"
    id="autocomplete"
    placeholder="e.g. 25 West 4th St, New York, NY 10012"
    type="text"
    v-el:addressentered
  ></input>
  <button v-on:click="saveAddress">Go</button>
  
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
      addressentered: "",
      userAddress:""
    }
  },

  methods: {
    saveAddress: function(){
      this.userAddress = this.$els.addressentered.value;
      console.log(this.userAddress)
    }
  },

  ready: function() {
    console.log("testing here we go!");
    console.log(new google.maps.places.Autocomplete())
  }

}
</script>

<style scoped>
</style>