<template>
  <div class="home">
    <Hero v-bind:headline='headline' />
    <div class="container">
      <div class="projects-section">
        <h2 class="section-header">Featured Work</h2>
        <projects-grid :projects="projects" />
        <div class="more-projects-block"><router-link :to="{name: 'work'}">More projects &#10141;</router-link></div>
      </div>
      <contact-section></contact-section>
    </div>
    <!-- <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Hero from '@/components/Hero.vue'
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import ProjectTile from '@/components/ProjectTile.vue'
import ContactSection from '@/components/ContactSection.vue'

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
    Hero,
    ProjectsGrid,
    ProjectTile,
    ContactSection
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getSingle('homepage', { fetchLinks: ['project.title', 'project.image', 'project.short_description'] }).then((document) => {
        console.log(document)
        this.docID = document.id
        this.headline = this.$prismic.richTextAsPlain(document.data.headline)
        this.projects = document.data.body[0].items
      })
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl'

h2.section-header
  margin-top: 30px
  margin-bottom: 30px

div.contact-block
  margin-bottom: 50px

div.projects-section
  border-bottom: solid 1px #DDD
  padding-bottom: 30px

  div.more-projects-block
    text-align: right

  a
    display: inline-block
    color: $link-color
</style>
