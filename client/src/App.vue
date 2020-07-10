<template>
  <div id="app">
    <Header />
    <MainHeader />
    <router-view/>

    <Footer />
  </div>
</template>


<script>

import Header from "./components/Header"
import Footer from "./components/Footer"
import MainHeader from "./components/MainHeader"


export default {
  name: 'app',
  components: {
    MainHeader,
    Header,
    Footer
  },

  mounted() {
    this.$store.dispatch("mounted")
  }


}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
