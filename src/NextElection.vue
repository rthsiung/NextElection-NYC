<!-- template code -->
<template>

<h1>The next election in NYC is on <b>{{ nextElectionDateFormatted }}</b>.</h1>
<p>(This election is a <span class="moreinfo">{{ nextElectionType[0] }}</span>. For some people, there will also be a <span class="moreinfo">{{ nextElectionType[1] }}</span>.)</p>

</template>

<!-- logic code -->
<script>

import moment from 'moment'

var browserKey = '33a19b90-164d-4262-9fdb-148fc935b9c5' //My ElectionAPI key

export default {

  //Here are my variables 
  data:function(){
    return {
      message: "",
      APIresponse: [],
      elections: [],
      electionDatesTypes: [],
      upcomingElections: {},
      nextElectionDate: "",
      nextElectionDateFormatted:"",
      nextElectionType: [],
    }
  },

  //This tells this Vue component what to do when it's rendered on a page
  ready: function() {

    //This is where I would show a loading animation.

      // GET request
      this.$http.jsonp(this.url).then(function (response) {

        //This is where I would hide the loading animation.

        // success callback
        this.message = "We got an API response!";
        this.APIresponse = response.data; // store the api response
        this.elections = this.APIresponse.elections; 

        this.electionDatesTypes = this.APIresponse.elections.map(
          function (electionItem) {
            //do a search for the word "Election"
            var m = electionItem.Description.search("Election");
              //IF the word "Election" is found
              //then get the substring of all the text before "Election" AND including the word "Election"
              if (m !== -1){
                var newDescription = electionItem.Description.substring(0,m+8);
              } 
              //ELSE if the word "Election" is not found...
              //Then do a search for " -" and get the substring of all the text before the dash
              else {
                var n = electionItem.Description.search(" -");
                var newDescription = electionItem.Description.substring(0,n);
              }
            return {
              "date": electionItem.YYYYMMDD_StartDate,
              "type": newDescription
            }
          });

        // a js object to hold the election dates (keys) and the types of elections on each of those dates (values)
        var tempUpcomingElections = {};

        // when there are more than 1 election on a date, create an array of election types for that date
        this.electionDatesTypes.forEach(
          function (election) {
            if ( Array.isArray(tempUpcomingElections[election.date]) ) {
              tempUpcomingElections[election.date].push(election.type);
            } else {
              tempUpcomingElections[election.date] = [election.type];
            }
          });

        // 
        this.upcomingElections = tempUpcomingElections;

        //console.log(this.upcomingElections);

        this.nextElectionDate = Object.keys(this.upcomingElections)[0];
        this.nextElectionDateFormatted = moment(this.nextElectionDate).format('dddd, MMMM Do, YYYY');

        this.nextElectionType = this.upcomingElections[this.nextElectionDate];

      }, function (response) {
          // error callback
          this.message = "API response failure :("
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
      //This is the full API call. Not all of these props are necessary.
      //return "http://nyc.electionapi.com/psl/pollsiteinfo?latitude="+this.latitude+"&longitude="+this.longitude+"&county="+this.county+"&streetnumber="+this.streetnumber+"&streetname="+this.streetname+"&postalcode="+this.postalcode+"&key="+browserKey

      //This is the abbreviated API call with as few props as possible
      return "http://nyc.electionapi.com/psl/pollsiteinfo?streetnumber="+this.streetnumber+"&streetname="+this.streetname+"&postalcode="+this.postalcode+"&key="+browserKey
    }
  }
}
</script>


<style scoped>
</style>