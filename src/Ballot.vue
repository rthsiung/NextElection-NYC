<!-- template code -->
<template>

<h3>The Candidates</h3>

<span style="color:gray">this election type is: {{electiontype}}</span>

<div v-if="APIresponse.parties == null ">
  <p>The ballot for this election isn't available yet. The candidates on a ballot are usually published 3-4 weeks before an election, so check back!</p>
</div>

<div v-else>
  <!--Check if this election is a primary based on the election type that we found in NextElection.vue -->
  <div v-if="electiontype.toLowerCase().includes('primary')">
    <ballotprimary></ballotprimary>
  </div>
  <div v-else>
    this election is not a primary
  </div>
</div>

</template>

<!-- logic code -->
<script>

export default {

  //Here are my variables 
  data:function(){
    return {
      message: "",
      APIresponse: []
    }
  },

  //This tells this Vue component what to do when it's rendered on a page
  ready: function() {

    // GET request
    this.$http.jsonp(this.url).then(function (response) {
      // success callback
      this.message = "API response successfully sent."
      this.APIresponse = response.data;
      //this.APIresponse = require('./NYCAprilPrimary.json')


      }, function (response) {
          // error callback
          this.message = "API response fail."
      });

    },

  //Properties - the inputs that you feed to this Vue component
  props: [
    "districtkey", 
    "electionid",
    "electiontype"
    ],

  //Computed variables - variables that are made up of other variables
  computed: {  
    url: function() {      
      return "http://nyc.electionapi.com/psl/contestlist?districtkey="+this.districtkey+"&electionid="+this.electionid+"&key="+electionAPIkey
    }
  }
}
</script>


<style scoped>
</style>