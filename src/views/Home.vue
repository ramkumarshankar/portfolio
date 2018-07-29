<template>
  <div class="home">
    <Hero v-bind:headline='headline' />
    <div class="container">
      <h2>I design and build digital products</h2>
      <h3>I design and build digital products</h3>
      <h4>I design and build digital products</h4>
      <p>This is some paragraph copy. Let's see how it looks</p>
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

<style lang="stylus" scoped>
</style>