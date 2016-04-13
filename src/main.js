//My packages/dependencies
import Vue from 'vue'
import Resource from 'vue-resource'

//Tell Vue that it can use these packages that you've imported
Vue.use(Resource)

//My components
import GoogleMap from './GoogleMap.vue'
import PollSite from './PollSite.vue'
import ContestList from './ContestList.vue'
import NextElection from './NextElection.vue'
import UpcomingElections from './UpcomingElections.vue'
import AddressInput from './AddressInput.vue'

//Give more detailed errors
Vue.config.debug = true

//Set the HTML tags for my Vue components
Vue.component('googlemap', GoogleMap)
Vue.component('pollsite', PollSite)
Vue.component('contestlist', ContestList)
Vue.component('nextelection', NextElection)
Vue.component('upcomingelections', UpcomingElections)
Vue.component('addressinput', AddressInput)

//Tell Vue where it can have domain
new Vue({
	//el stands for "element".. as in.. an HTML element.
	//basically you can only use Vue (and the above components that you've imported) 
	//within the HTML body element in index.html
  el: 'body'
})