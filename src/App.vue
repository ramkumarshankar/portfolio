<template>
  <div id="app">
    <Header :isFixed="this.$router.currentRoute.name === 'home'" />
    <router-view/>
    <page-footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import PageFooter from '@/components/PageFooter.vue'

export default {
  name: 'App',
  components: {
    Header,
    PageFooter
  }
}
</script>

<style lang="stylus">
@import './styles/main.styl'

body, html
  margin 0
  padding 0

#app
  // font-family 'IBM Plex Sans', 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
