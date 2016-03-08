<!-- template code -->
<template>

<h2>Next Election in NYC:</h2>
<h1>{{ nextElection }}</h1>

<p style="color: blue;">{{ message }}</p>
<p style="font-size:0.5em; color: grey;">{{ elections | json}}</p>

<p>There are {{ elections.length }} other upcoming elections.</p>

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
      elections: []
    }
  },

  //This tells this Vue component what to do when it's rendered on a page
  ready: function() {

      // GET request
      this.$http.jsonp(this.url).then(function (response) {
          // success callback
          this.message = "Poll Site - Elections: Success!"
            console.log('Poll Site - Elections: API request sent')
          this.APIresponse = response.data
            console.log('Poll Site - Elections: API response received and saved')
            this.elections = this.APIresponse.elections
            console.log('Poll Site - Elections: saved elections array')

      }, function (response) {
          // error callback
          this.message = "Poll Site - Elections: Failure :("
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