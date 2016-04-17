<!-- template code -->
<template>

<p>The state of New York holds <span class="showhide">“closed” primaries</span> -- so only people who are already registered with a political party may vote for that party’s candidate(s).</p>

<p class="input-label">Select a party to view their ballot:</p>
<select v-model="partyselect">
  <option selected value="">No party selected</option>
  <option v-for="party in listofParties">{{ party }}</option>
</select>

<div v-show="partyselect">
  <p>
    The party you selected: {{ partyselect }}
  </p>

  <p>show office</p>
    <ul>
      <li>show candidates</li>
    </ul>

</div>

</template>

<!-- logic code -->
<script>
var browserKey = '33a19b90-164d-4262-9fdb-148fc935b9c5' //My ElectionAPI key

export default {

  //Here are my variables 
  data:function(){
    return {
      message: "",
      partyselect: null,
      APIresponse: [],
      listofParties: []
    }
  },

  //This tells this Vue component what to do when it's rendered on a page
  ready: function() {

    // GET request
    this.$http.jsonp(this.url).then(function (response) {
      // success callback
      this.APIresponse = response.data;

      //Store all of the party info in partiesWithContests object, but only for parties where there are contests
      var partiesWithContests = {};
      this.APIresponse.parties.forEach(
        function(partyinfo){
          if (partyinfo.contests[0].contest_description != "No Contests"){
            partiesWithContests[partyinfo.name] = partyinfo;
          }
      });
      
      this.listofParties = Object.keys(partiesWithContests); // shows the party names!
      //console.log(JSON.stringify(partiesWithContests));

      //if the users chooses "partyName X", then show them only contests + candidates for that party
      // var partyChosen = "";
      // partyChosen = "Democratic";
      // partiesWithContests[partyChosen].contests.forEach(function(contest){
      //   console.log(contest.contest_description);
      //   contest.candidacies.forEach(function(candidate){
      //     console.log(candidate.ballot_name);
      //   })
      // });

      }, function (response) {
          // error callback
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