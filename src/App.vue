<template>
  <div id="app">
    <Header :isFixed="this.$router.currentRoute.name === 'home'"/>
    <router-view/>
    <page-footer/>
    <notifications classes="notification" position="bottom center"/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import PageFooter from "@/components/PageFooter.vue";

export default {
  name: "App",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Ramkumar Shankar",
    meta: [
      // OpenGraph data (Most widely used)
      { vmid: "og:title", content: "Home" },
      { property: "og:site_name", content: "Ramkumar Shankar" },
      // The list of types is available here: http://ogp.me/#types
      { property: "og:type", content: "website" },
      // Should the the same as your canonical link, see below.
      { vmid: "og:url", content: "https://www.ramkumar.me/" },
      // {property: 'og:image', content: 'https://www.my-site.com/my-special-image.jpg'},
      // Often the same as your meta description, but not always.
      {
        property: "og:description",
        content:
          "I am a creative developer based in Sydney, Australia. This is my portfolio."
      },
      // Twitter card
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "https://ramkumar.me" },
      { name: "twitter:title", content: "Ramkumar Shankar" },
      {
        name: "twitter:description",
        content:
          "I am a creative developer based in Sydney, Australia. This is my portfolio."
      },
      // Your twitter handle, if you have one.
      { name: "twitter:creator", content: "@ramkumarshankar" },
      // Google / Schema.org markup:
      { itemprop: "name", content: "Ramkumar Shankar" },
      {
        itemprop: "description",
        content:
          "I am a creative developer based in Sydney, Australia. This is my portfolio."
      },
      // Default
      {
        name: "description",
        content:
          "I am a creative developer based in Sydney, Australia. This is my portfolio."
      }
    ]
  },
  components: {
    Header,
    PageFooter
  }
};
</script>

<style lang="stylus">
@import './styles/main.styl';

body, html {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

#app {
  // font-family 'IBM Plex Sans', 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align center
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.notification {
  // Style of the notification itself
  background: $dark-background !important;
  color: #FFF;
  padding: 15px 30px;
  margin-bottom: 20px;
  font-family: $base-body-font-family;
  border-radius: 2px;

  .notification-title {
    // Style for title line
    margin-bottom: 10px;
  }

  .notification-content {
    // Style for content
  }

  &.my-type {
    /*
    Style for specific type of notification, will be applied when you
    call notification with "type" parameter:
    this.$notify({ type: 'my-type', message: 'Foo' })
    */
  }
}
</style>
