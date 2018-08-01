<template>
  <div class="home">
    <Hero v-bind:headline='headline' />
    <div class="container">
      <h1>My work</h1>
      <p>I care about design, user experience and clean, maintainable code.</p>
    </div>
    <section v-for="(project, index) in projects" :key="'project-' + index">
      <!-- <template> -->
        <prismic-rich-text :field="project.primary.title"/>
        <section v-for="(item, index) in project.items" :key="'project-item-' + index">
          <!-- <p>{{item.featured_projects}}</p> -->
          <prismic-link  :field="item.featured_projects">
            Click here
          </prismic-link>
        </section>
      <!-- </template> -->
    </section>
    <!-- <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
      headline: '',
      projects: []
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
        console.log(document.data.body)
        this.docID = document.id
        this.headline = this.$prismic.richTextAsPlain(document.data.headline)
        this.projects = document.data.body
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
