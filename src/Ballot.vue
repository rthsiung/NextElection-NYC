<!-- template code -->
<template>

{{ }}

</template>

<!-- logic code -->
<script>
var browserKey = '33a19b90-164d-4262-9fdb-148fc935b9c5' //My ElectionAPI key

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
          this.message = "Contest List: Success!";
          this.APIresponse = response.data;

          //Store all of the party info in a new object, but only for parties where there are contests
          var partiesWithContests = {};
          this.APIresponse.parties.forEach(
            function(partyinfo){
              if (partyinfo.contests[0].contest_description != "No Contests"){
                partiesWithContests[partyinfo.name] = partyinfo;
              }
          });
          //console.log(Object.keys(partiesWithContests)); // shows the party names!

          //if the users chooses "partyName X", then show them only contests + candidates for that party
          var partyChosen = "";
          partyChosen = "Democratic";
          partiesWithContests[partyChosen].contests.forEach(function(contest){
            console.log(contest.contest_description);
            contest.candidacies.forEach(function(candidate){
              console.log(candidate.ballot_name);
            })
          ;});
   
      }, function (response) {
          // error callback
          this.message = "Contest List: Failure :("
      });

    },

  //Properties - the inputs that you feed to this Vue component
  props: [
    "districtkey", 
    "electionid"],

  //Computed variables - variables that are made up of other variables
  computed: {  
    url: function() {      
      return "http://nyc.electionapi.com/psl/contestlist?districtkey="+this.districtkey+"&electionid="+this.electionid+"&key="+browserKey
    }
  }
}
</script>


<style scoped>
</style>