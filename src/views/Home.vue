<template>
  <div class="home">
    <Hero v-bind:headline='headline' />
    <div class="container">
      <div class="projects">
        <h2 class="section-header">Featured Work</h2>
        <section class="projects-section" v-for="(project, index) in projects" :key="'project-' + index">
          <project-tile v-for="(item, index) in project.items" :key="'project-item-' + index"
          :title="$prismic.richTextAsPlain(item.featured_projects.data.title)" :description="$prismic.richTextAsPlain(item.featured_projects.data.short_description)" :image="item.featured_projects.data.image" :tags="item.featured_projects.tags" :link="item.featured_projects" />
        </section>
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
    ProjectTile,
    ContactSection
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getSingle('homepage', { fetchLinks: ['project.title', 'project.image', 'project.short_description'] }).then((document) => {
        console.log(document)
        this.docID = document.id
        this.headline = this.$prismic.richTextAsPlain(document.data.headline)
        this.projects = document.data.body
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

div.projects
  border-bottom: solid 1px #DDD
  padding-bottom: 30px

  div.more-projects-block
    text-align: right

  a
    display: inline-block
    color: $link-color

div.contact-block
  margin-bottom: 50px

.projects-section
  display: flex
  flex-wrap: wrap
</style>
