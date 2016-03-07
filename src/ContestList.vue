<!-- template code -->
<template>

	<!-- <p style="color: blue;">{{ message }}</p> -->
	<!-- <p style="font-size:0.5em; color: grey;">{{ APIresponse | json }}</p> -->
	<!-- <p>{{ APIresponse | json }}</p>  -->

    <p>
    {{ APIresponse.site_name }}<br>
    {{ APIresponse.site_address }}
  </p>

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
          this.message = "Contest List: Success!"
          console.log('Contest List: API request sent')
          this.APIresponse = response.data
          console.log('Contest List: API response received and saved')

          var parties = this.APIresponse["parties"];
          var democrats = parties.filter(function(party){
            party.name == "Democratic"
          });


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