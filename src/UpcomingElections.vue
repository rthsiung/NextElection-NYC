<!-- template code -->
<template>

<h3>There are {{ numberOfUpcomingElections }} more elections coming up:</h3>

<ul>
  <li v-for="elections in upcomingElections">
    <span class="upcoming-electiondate">{{ $key }}</span><br>
    <span v-for="election in elections">
      <span v-on:click="showElectionTypeInfo" class="moreinfo">
        {{ election }}<span class="icon-expand_more"></span>
      </span>
      <div class="showinfo" v-if="showElectionTypeInfoToggle" transition="fade">
        {{{ typedescriptions[election] }}}
      </div>

    </span>
  </li>
</ul>

<!--<pre>{{ $data | json}}</pre>-->


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
      numberOfUpcomingElections: 0,
      fieldbookresponse: [],
      typedescriptions: {}
    }
  },

  //This tells this Vue component what to do when it's rendered on a page
  ready: function() {

      // GET request
      this.$http.jsonp(this.url).then(function (response) {
        // success callback
        this.message = "We got an API response!";
        this.APIresponse = response.data; // store the api response
        this.elections = this.APIresponse.elections; 

        // get election date and type from the API response
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
        var nextelectiondate = this.electionDatesTypes[0].date;

        // when there are more than 1 election on a date, create an array of election types for that date -- but only do this for dates that are not the NEXT election date
        this.electionDatesTypes.forEach(
          function (election) {
            if ( election.date != nextelectiondate){
              if (Array.isArray(tempUpcomingElections[election.date]) ) {
                tempUpcomingElections[
                  moment(election.date).format('MMMM Do, YYYY')
                ].push(election.type);
              } else {
                tempUpcomingElections[
                  moment(election.date).format('MMMM Do, YYYY')
                ] = [election.type];
              }
            }
          });

        this.upcomingElections = tempUpcomingElections;
        this.numberOfUpcomingElections = Object.keys(tempUpcomingElections).length;

        //console.log(this.upcomingElections);

        //Make the Fieldbook API call for election type descriptions
        var fieldbookurl = "https://api.fieldbook.com/v1/571798785a41710300a7f2b0/election_types"
        this.$http.get(fieldbookurl).then((response)=> {
          // success callback
          //create object with election types + descriptions
          this.fieldbookresponse = response.data
          var temp = {};
          this.fieldbookresponse.forEach(
            function (item) {
              console.log(item.election_type)
              console.log(item.description)
              temp[item.election_type] = [item.description]
            })
          this.typedescriptions = temp;
        }, function (response) {
            //failure callback
        });
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