<template>
  <div id="app">
    <Header :isFixed="this.$router.currentRoute.name === 'home'" />
    <router-view/>
    <page-footer />
    <notifications classes="notification" position="bottom center"/>
    <vue-progress-bar></vue-progress-bar>
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

.notification
  // Style of the notification itself
  background: #1B1B1B
  color: #FFF
  padding: 15px 30px
  margin-bottom: 20px
  font-family: $base-body-font-family
  border-radius: 2px

  .notification-title
    // Style for title line
    margin-bottom: 10px

  .notification-content
    // Style for content

  &.my-type
    /*
    Style for specific type of notification, will be applied when you
    call notification with "type" parameter:
    this.$notify({ type: 'my-type', message: 'Foo' })
    */

</style>
