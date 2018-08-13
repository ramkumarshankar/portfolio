<template>
  <div class="home">
    <Hero v-bind:headline='headline' />
    <div class="container">
      <h1 class="section-header">Featured</h1> 
      <section class="projects-section" v-for="(project, index) in projects" :key="'project-' + index">
        <project-tile v-for="(item, index) in project.items" :key="'project-item-' + index"
        :title="$prismic.richTextAsPlain(item.featured_projects.data.title)" :description="$prismic.richTextAsPlain(item.featured_projects.data.short_description)" :image="item.featured_projects.data.image" :tags="item.featured_projects.tags" :link="item.featured_projects" />
      </section>
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
    ProjectTile
  },
  methods: {
    getContent (uid) {
      this.$prismic.client.getSingle('homepage', { fetchLinks: ['project.title', 'project.image', 'project.short_description'] }).then((document) => {
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
h1.section-header
  margin-bottom: 30px
  
.projects-section
  display: flex
  flex-wrap: wrap
</style>
