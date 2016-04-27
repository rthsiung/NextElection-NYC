<!-- template code -->
<template>

<p>The state of New York holds <span class="moreinfo">“closed” primaries</span> -- so only people who are already registered with a political party may vote for that party’s candidate(s).</p>

<p><b>Select a party to view their ballot:</b></p>
<select v-model="partyselect">
  <option selected value="">No party selected</option>
  <option v-for="party in listofParties">{{ party }}</option>
</select>

<div v-show="partyselect">
  <p>The party you selected: {{ partyselect }}</p>
  <ul>
    <li v-for="contest in partiesWithContests[partyselect].contests">{{ contest.contest_description }}
      <ul>
        <li v-for="candidacy in contest.candidacies">{{ candidacy.ballot_name }}</li>
      </ul>
    </li> 
  </ul>
</div>

<div v-else>
  <p><span class="moreinfo">Why isn't my party listed?</span></p>
</div>

</template>

<!-- logic code -->
<script>

export default {

  //Here are my variables 
  data:function(){
    return {
      message: "",
      partyselect: null,
      APIresponse: [],
      listofParties: [], // just the parties with contests
      partiesWithContests: {} // full party info for parties with contests
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

      //Store all of the party info in partiesWithContests object, but only for parties where there are contests
      var tempPartiesWithContests = {};
      this.APIresponse.parties.forEach(
        function(partyinfo){
          if (partyinfo.contests[0].contest_description != "No Contests"){
            tempPartiesWithContests[partyinfo.name] = partyinfo;
          }
      });
      
      this.partiesWithContests = tempPartiesWithContests;
      this.listofParties = Object.keys(this.partiesWithContests);
      //console.log(JSON.stringify(this.partiesWithContests));

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
          this.message = "API response fail."
      });

    },

  //Properties - the inputs that you feed to this Vue component
  props: [
    "districtkey", 
    "electionid"],

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