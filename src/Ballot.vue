<!-- template code -->
<template>

<h3>The Candidates</h3>

<p>The state of New York holds <span class="moreinfo">“closed” primaries</span> -- so only people who are already registered with a political party may vote for that party’s candidate(s).</p>

<p><b>Select a party to view their ballot:</b></p>
<select v-model="partyselect">
  <option selected value="">No party selected</option>
  <option v-for="party in listofParties">{{ party }}</option>
</select>

<div v-show="partyselect">
  <p>The party you selected: {{ partyselect }}</p>
  <ul>
    <li v-for="contest in partiesWithContests[partyselect].contests">{{ contest.contest_description }} </li>
      <ul>
        <li v-for="candidacy in partiesWithContests[partyselect].contests.candidacies">{{ candidacy.ballot_name }}</li>
      </ul>
  </ul>
</div>

<p><b>Candidacies:</b> {{partiesWithContests[partyselect].contests | json}}</p>

<div v-else>
  <p><span class="moreinfo">Why isn't my party listed?</span></p>
</div>

<pre>{{ $data | json }}</pre>

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
      //this.APIresponse = response.data;
      this.APIresponse = { "parties":[ { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ { "ballot_name":"Bernie Sanders", "candidacy_name":"Bernie Sanders", "group":null, "party":null, "writeIn":false }, { "ballot_name":"Hillary Clinton", "candidacy_name":"Hillary Clinton", "group":null, "party":null, "writeIn":false } ], "contest_description":"President Citywide", "proposal_text":"", "proposal_uri":"", "vote_for":1, "write_in_capable":false }, { "candidacies":[ { "ballot_name":"Carmen Hulbert (F)", "candidacy_name":"Carmen Hulbert (F)", "group":"Pledged to support Sanders 1", "party":null, "writeIn":false }, { "ballot_name":"Jonathan I. Fuhrer (M)", "candidacy_name":"Jonathan I. Fuhrer (M)", "group":"Pledged to support Sanders 1", "party":null, "writeIn":false }, { "ballot_name":"Traci-Ann Strickland (F)", "candidacy_name":"Traci-Ann Strickland (F)", "group":"Pledged to support Sanders 1", "party":null, "writeIn":false }, { "ballot_name":"Robert Dannin (M)", "candidacy_name":"Robert Dannin (M)", "group":"Pledged to support Sanders 1", "party":null, "writeIn":false }, { "ballot_name":"Rachel J. Bernstein (F)", "candidacy_name":"Rachel J. Bernstein (F)", "group":"Pledged to support Sanders 1", "party":null, "writeIn":false }, { "ballot_name":"Sean T. Robertson (M)", "candidacy_name":"Sean T. Robertson (M)", "group":"Pledged to support Sanders 1", "party":null, "writeIn":false }, { "ballot_name":"Jenny Low (F)", "candidacy_name":"Jenny Low (F)", "group":"Pledged to support Clinton 2", "party":null, "writeIn":false }, { "ballot_name":"Martin Malave-Dilan (M)", "candidacy_name":"Martin Malave-Dilan (M)", "group":"Pledged to support Clinton 2", "party":null, "writeIn":false }, { "ballot_name":"Janet Forte (F)", "candidacy_name":"Janet Forte (F)", "group":"Pledged to support Clinton 2", "party":null, "writeIn":false }, { "ballot_name":"Steven Cohn (M)", "candidacy_name":"Steven Cohn (M)", "group":"Pledged to support Clinton 2", "party":null, "writeIn":false }, { "ballot_name":"Cara Noel (F)", "candidacy_name":"Cara Noel (F)", "group":"Pledged to support Clinton 2", "party":null, "writeIn":false }, { "ballot_name":"Edward Tyre (M)", "candidacy_name":"Edward Tyre (M)", "group":"Pledged to support Clinton 2", "party":null, "writeIn":false }, { "ballot_name":"Nancy Padilla (F)", "candidacy_name":"Nancy Padilla (F)", "group":"Pledged to support Clinton 2", "party":null, "writeIn":false } ], "contest_description":"Delegate to National Convention 7th Congressional District", "proposal_text":"", "proposal_uri":"", "vote_for":7, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Democratic", "regCode":null, "relativeOrder":0, "sample_ballot_url":null }, { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ { "ballot_name":"Donald J. Trump", "candidacy_name":"Donald J. Trump", "group":null, "party":null, "writeIn":false }, { "ballot_name":"Jeb Bush", "candidacy_name":"Jeb Bush", "group":null, "party":null, "writeIn":false }, { "ballot_name":"John R. Kasich", "candidacy_name":"John R. Kasich", "group":null, "party":null, "writeIn":false }, { "ballot_name":"Marco Rubio", "candidacy_name":"Marco Rubio", "group":null, "party":null, "writeIn":false }, { "ballot_name":"Ben Carson", "candidacy_name":"Ben Carson", "group":null, "party":null, "writeIn":false }, { "ballot_name":"Ted Cruz", "candidacy_name":"Ted Cruz", "group":null, "party":null, "writeIn":false } ], "contest_description":"President Citywide", "proposal_text":"", "proposal_uri":"", "vote_for":1, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Republican", "regCode":null, "relativeOrder":0, "sample_ballot_url":null }, { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ ], "contest_description":"No Contests", "proposal_text":"", "proposal_uri":null, "vote_for":0, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Conservative", "regCode":null, "relativeOrder":0, "sample_ballot_url":null }, { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ ], "contest_description":"No Contests", "proposal_text":"", "proposal_uri":null, "vote_for":0, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Green", "regCode":null, "relativeOrder":0, "sample_ballot_url":null }, { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ ], "contest_description":"No Contests", "proposal_text":"", "proposal_uri":null, "vote_for":0, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Working Families", "regCode":null, "relativeOrder":0, "sample_ballot_url":null }, { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ ], "contest_description":"No Contests", "proposal_text":"", "proposal_uri":null, "vote_for":0, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Independence", "regCode":null, "relativeOrder":0, "sample_ballot_url":null }, { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ ], "contest_description":"No Contests", "proposal_text":"", "proposal_uri":null, "vote_for":0, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Women's Equality", "regCode":null, "relativeOrder":0, "sample_ballot_url":null }, { "ID":0, "abbreviatedName":null, "code":null, "color":null, "contests":[ { "candidacies":[ ], "contest_description":"No Contests", "proposal_text":"", "proposal_uri":null, "vote_for":0, "write_in_capable":false } ], "created":"/Date(-62135596800000+0000)/", "createdBy":0, "emblem":null, "isActive":false, "isEnforced":false, "isEstablished":false, "isMajor":false, "isRecognized":false, "mainFrameCode":null, "modified":"/Date(-62135596800000+0000)/", "modifiedBy":0, "name":"Reform", "regCode":null, "relativeOrder":0, "sample_ballot_url":null } ] }

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