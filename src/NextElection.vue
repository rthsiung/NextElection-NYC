<!-- template code -->
<template>

<h1><span class="clearsans-light">The next election in NYC is on</span> {{ nextElectionDateFormatted }}.</h1>

<p>
  This election is a 
  <span v-on:click="showElectionTypeInfo" class="moreinfo">
    {{ nextElectionType[0] }}&nbsp;<span class="icon-expand_more"></span>
  </span>.
  <span v-if="nextElectionType.length > 1">
   For some people, there will also be a <span class="moreinfo">{{ nextElectionType[1] }}</span>.
  </span>
</p>

<div class="showinfo" v-if="showElectionTypeInfoToggle" transition="fade">
  {{{ electionDetails.typedescription }}}
</div>

<!--Add to calendar feature-->
<div title="Add to Calendar" class="addeventatc">
    Add to Calendar
    <span class="start">{{ electionDetails.formattedDate }} 06:00 AM</span>
    <span class="end">{{ electionDetails.formattedDate }} 09:00 PM</span>
    <span class="timezone">America/New_York</span>
    <span class="title">Election Day!</span>
    <span class="description">
      <p>POLL HOURS: All poll sites in NYC are open from 6am to 9pm.</p>
      <p>ELECTION TYPE: {{ nextElectionType[0] }}.</p>
      <p>ABOUT: {{{ electionDetails.typedescription }}}</p>
    </span>
    <span class="location">Check your poll site location on NextElection!</span>
    <span class="organizer">NextElection NYC</span>
    <span class="all_day_event">false</span>
    <span class="date_format">MM/DD/YYYY</span>
    <span class="alarm_reminder">60</span>
</div>

  <div id="arrow">
    <h4>Tell me more!</h4>
    <span class="icon-arrow-down2"></span>
  </div>

<addressinput
  v-bind:electiondetails = "electionDetails"
></addressinput>

</template>

<!-- logic code -->
<script>
var electionAPIkey = '33a19b90-164d-4262-9fdb-148fc935b9c5' //My ElectionAPI key
import moment from 'moment'

export default {

  //Here are my variables 
  data:function(){
    return {
      showElectionTypeInfoToggle: false,
      message: "",
      APIresponse: [],
      elections: [],
      electionDatesTypes: [],
      upcomingElections: {},
      nextElectionDate: "",
      nextElectionDateFormatted:"",
      nextElectionType: [],
      fieldbookAPIresponse: [],
      electionDetails: {}
    }
  },

  //This tells this Vue component what to do when it's rendered on a page
  ready: function() {

    //This is where I would show a loading animation.

      // GET request
      this.$http.jsonp(this.url).then(function (response) {

        //This is where I would hide the loading animation.

        // success callback
        this.message = "Election API response success!";
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

        this.nextElectionDate = Object.keys(this.upcomingElections)[0];
        this.nextElectionDateFormatted = moment(this.nextElectionDate).format('dddd, MMMM Do, YYYY');
        this.nextElectionType = this.upcomingElections[this.nextElectionDate];

        

        //Make the Fieldbook API call for election type descriptions
        var fieldbookurl = "https://api.fieldbook.com/v1/571798785a41710300a7f2b0/election_types/?election_type="+this.nextElectionType[0]

        this.$http.get(fieldbookurl).then((response)=> {
          // success callback
          this.fieldbookAPIresponse = response.data;
          
          //Create the electionDetails object -- this will be passed down to child components so that we can show the Add to Calendar button after the user enters their address and gets their poll site
          this.electionDetails = {
            "formattedDate": moment(this.nextElectionDate).format('MM/DD/YYYY'),
            "electiontype": this.upcomingElections[this.nextElectionDate],
            "typedescription": this.fieldbookAPIresponse[0].description
          }

          }, function (response) {
              // error callback
          });  

      }, function (response) {
          // error callback
          this.message = "Election API response failure :("
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
      return "http://nyc.electionapi.com/psl/pollsiteinfo?streetnumber="+this.streetnumber+"&streetname="+this.streetname+"&postalcode="+this.postalcode+"&key="+electionAPIkey
    }
  },

  methods:{
    showElectionTypeInfo: function (event){
      this.showElectionTypeInfoToggle = !this.showElectionTypeInfoToggle
    }
  }
}
</script>


<style scoped>
</style>