<!-- template code -->
<template>

  <ballot
    v-bind:districtkey = "pollSiteandElectionDetails.districtKey"
    v-bind:electionid = "pollSiteandElectionDetails.nextElectionID"

    v-bind:electiontype = "electiontype"
  ></ballot>

  <h3>Where You Vote</h3>

  <p>
    {{ pollSiteandElectionDetails.pollsiteName }}<br>
    {{ pollSiteandElectionDetails.pollsiteAddress }}
  </p>

  <googlemap 
    v-bind:pollsite="pollSiteandElectionDetails.pollsiteAddress"
    v-bind:useraddress="useraddress"
  ></googlemap>

</template>

<!-- logic code -->
<script>
var electionAPIkey = '33a19b90-164d-4262-9fdb-148fc935b9c5' //My ElectionAPI key

export default {

  data:function(){
    return {
      pollSiteandElectionDetails: {
            "APIresponse": [],
            "pollsiteName": "",
            "pollsiteAddress": "25 west 4th street, manhattan, ny",
            "districtKey": "",
            "electionDatesIDs": [],
            "cleanElectionDatesIDs": {},
            "nextElectionID": ""
          }
    }
  },

  props: [
    "streetnumber", 
    "streetname", 
    "postalcode",
    "electiontype",
    "useraddress"
    ],

  asyncData: function(){
      // GET request
      return this.$http.jsonp(this.url).then(function (response) {
        // success callback

        // store the API response for debugging
        var APIresponse = response.data
        
        //store key variables from API response
        var pollsiteName = APIresponse.site_name;
        var pollsiteAddress = APIresponse.site_address;
        var districtKey = APIresponse.districtKey;

        // an array of just the election dates and IDs (which are from the API response)
        var electionDatesIDs = APIresponse.elections.map(function (electionItem) {
            return {
              "date": electionItem.YYYYMMDD_StartDate,
              "ID": electionItem.ID
            }
        });

        // reformatting election dates and IDs, such that the dates are keys, and IDs are values
        var tempElectionDatesIDs = {};
        // ...and when there are more than 1 election on a date, create an array of election IDs for that date
        electionDatesIDs.forEach(
          function (election) {
            if ( Array.isArray(tempElectionDatesIDs[election.date]) ) {
              tempElectionDatesIDs[election.date].push(election.ID);
            } else {
              tempElectionDatesIDs[election.date] = [election.ID];
            }
          });

        //this is the real object with cleaned up election dates and IDs
        var cleanElectionDatesIDs = tempElectionDatesIDs;

        var nextElectionDate = Object.keys(cleanElectionDatesIDs)[0];
        var nextElectionID = cleanElectionDatesIDs[nextElectionDate];

        return {
          pollSiteandElectionDetails: {
            "APIresponse": APIresponse,
            "pollsiteName": pollsiteName,
            "pollsiteAddress": pollsiteAddress,
            "districtKey": districtKey,
            "electionDatesIDs": electionDatesIDs,
            "cleanElectionDatesIDs": cleanElectionDatesIDs,
            "nextElectionID": nextElectionID
          }
        }
      });
  }, 
  watch:{
    streetnumber: 'reloadAsyncData',
    streetname: 'reloadAsyncData',
    postalcode: 'reloadAsyncData' 
  },

  computed: {  
    url: function() {      
       return "http://nyc.electionapi.com/psl/pollsiteinfo?streetnumber="+this.streetnumber+"&streetname="+this.streetname+"&postalcode="+this.postalcode+"&key="+electionAPIkey
      }
    }
}
</script>


<style scoped>
</style>