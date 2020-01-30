<template>
  <v-app id="app">
    <Header />
    <Drawer />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Header from './layout/Header'
import Drawer from './layout/Drawer'
import Footer from './layout/Footer'
export default {
  components: {
    Footer,
    Header,
    Drawer
  },
  data () {
    return {
      drawer: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    logout () {
      this.$firebase.auth().signOut()
      this.$cookies.remove('user')
      this.$store.dispatch('setUser')
      this.$router.replace('login')
    },
    init () {
      this.$store.dispatch('setUser')
    }
  }
}
</script>
