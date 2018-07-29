<template>
  <div class="home">
    <Hero v-bind:headline='headline' />
    <div class="container">
    <h1>Featured</h1>
    </div>
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Hero from '@/components/Hero.vue'

export default {
  name: 'home',
  data () {
    return {
      docID: '',
      headline: ''
    }
  },
  components: {
    HelloWorld,
    Hero
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getSingle('homepage').then((document) => {
        console.log(document)
        this.docID = document.id
        this.headline = this.$prismic.richTextAsPlain(document.data.headline)
      })
    }
  },
  created () {
    this.getContent()
  },
  mounted () {
    console.log(this.$prismic)
  }
}
</script>
