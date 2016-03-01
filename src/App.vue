<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <p>{{ msg2 }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: "MyVote (NYC Beta)",
      msg2: "Testing the ElectionAPI to build a web app to give people their poll site and ballot information."
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
