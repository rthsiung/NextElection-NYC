<!-- template code -->
<template>

  <h3>Where You Vote</h3>
  <p>
    {{ APIresponse.site_name }}<br>
    {{ APIresponse.site_address }}
  </p>

  <googlemap v-bind:place=pollsiteAddress></googlemap>

  <ballot
    v-bind:districtkey = "{{districtKey}}"
    v-bind:electionid = "{{nextElectionID}}"
  ></ballot>


</template>

<!-- logic code -->
<script>
var browserKey = '33a19b90-164d-4262-9fdb-148fc935b9c5' //My ElectionAPI key

export default {

  //Here are my variables 
  data:function(){
    return {
      message: "",
      APIresponse: [],
      pollsiteAddress: "",
      districtKey: "",
      elections: [],
      electionDatesIDs: [],
      realElectionDatesIDs: {},
      nextElectionID: ""
    }
  },

  //This tells this Vue component what to do when it's rendered on a page
  ready: function() {

      // GET request
      this.$http.jsonp(this.url).then(function (response) {
          // success callback
          this.message = "Poll site API call... success!"
          this.APIresponse = response.data
          this.pollsiteAddress = this.APIresponse.destination;
          this.districtKey = this.APIresponse.districtKey;
          this.elections = this.APIresponse.elections; 

          // get election date and IDs from the API response
          this.electionDatesIDs = this.APIresponse.elections.map(function (electionItem) {
              return {
                "date": electionItem.YYYYMMDD_StartDate,
                "ID": electionItem.ID
              }
          });

          // a js object to hold the election dates (keys) and the election IDs on each of those dates (values)
          var tempElectionDatesIDs = {};

          // when there are more than 1 election on a date, create an array of election IDs for that date
          this.electionDatesIDs.forEach(
            function (election) {
              if ( Array.isArray(tempElectionDatesIDs[election.date]) ) {
                tempElectionDatesIDs[election.date].push(election.ID);
              } else {
                tempElectionDatesIDs[election.date] = [election.ID];
              }
            });

          this.realElectionDatesIDs = tempElectionDatesIDs;

          var nextElectionDate = Object.keys(this.realElectionDatesIDs)[0];
          this.nextElectionID = this.realElectionDatesIDs[nextElectionDate];

      }, function (response) {
          // error callback
          this.message = "Poll site API call... failure. :("
      });
    },

  //Properties - the inputs that you feed to this Vue component
  props: [
    "streetnumber", 
    "streetname", 
    "postalcode"],

  //Computed variables - variables that are made up of other variables
  computed: {
    url: function() {

      //This is the abbreviated API call with as few props as possible
      return "http://nyc.electionapi.com/psl/pollsiteinfo?streetnumber="+this.streetnumber+"&streetname="+this.streetname+"&postalcode="+this.postalcode+"&key="+browserKey
    }
  }
}
</script>


<style scoped>
</style>