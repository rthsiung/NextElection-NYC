<!-- template code -->
<template>

<p>There are <b>{{ numberOfUpcomingElections }} other elections</b> coming up.</p>

<ul>
  <li v-for="">
    (list of upcoming election dates and types)
  </li>
</ul>

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
      elections: [],
      electionDatesTypes: [],
      upcomingElections: {},
      numberOfUpcomingElections: 0
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
        console.log("UpcomingElections Vue Component - Saved an array with the elections from the api response!");

        // get election date and type from the API response
        this.electionDatesTypes = this.APIresponse.elections.map(
          function (electionItem) {
            var n = electionItem.Description.search(" -");
            var newDescription = electionItem.Description.substring(0,n);  
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
        this.numberOfUpcomingElections = Object.keys(tempUpcomingElections).length - 1;

        console.log(this.upcomingElections);

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