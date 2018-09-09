<template>
  <div class="home">
    <Hero v-bind:headline='headline' />
    <div class="container">
      <div class="projects-section">
        <h2 class="section-header">Featured Work</h2>
        <section class="projects-grid">
          <loading-indicator :loading="loading" />
          <projects-grid :projects="projects" />
        </section>
        <div class="more-projects-block"><router-link :to="{name: 'work'}">More projects &#10141;</router-link></div>
      </div>
      <teaching-section :title="$prismic.richTextAsPlain(teachingHeading)" :body="teachingBody"  />
      <contact-section :text="contactText" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import ProjectTile from '@/components/ProjectTile.vue'
import TeachingSection from '@/components/TeachingSection.vue'
import ContactSection from '@/components/ContactSection.vue'

export default {
  name: 'home',
  props: {
    contactFormSubmitted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      docID: '',
      headline: '',
      projects: [],
      teachingHeading: '',
      teachingBody: '',
      contactText: '',
      loading: false
    }
  },
  components: {
    Hero,
    LoadingIndicator,
    ProjectsGrid,
    ProjectTile,
    TeachingSection,
    ContactSection
  },
  methods: {
    getContent (uid) {
      this.loading = true
      this.$prismic.client.getSingle('homepage', { fetchLinks: ['project.title', 'project.image', 'project.short_description'] }).then((document) => {
        this.docID = document.id
        this.headline = this.$prismic.richTextAsPlain(document.data.headline)
        // Get projects
        let projectsResponse = document.data.body[0].items
        let displayedProjects = []
        projectsResponse.forEach((project, index) => {
          displayedProjects.push({
            title: project.featured_projects.data.title,
            short_description: project.featured_projects.data.short_description,
            image: project.featured_projects.data.image,
            link: project.featured_projects,
            tags: project.featured_projects.tags
          })
        })
        this.projects = displayedProjects
        // Get teaching section
        let teachingSection = document.data.body[1].primary
        this.teachingHeading = teachingSection.teachingheading
        this.teachingBody = teachingSection.teachingbody
        // Get contact section
        let contactSection = document.data.body[2].primary
        this.contactText = contactSection.contacttext
        this.loading = false
      })
    }
  },
  mounted () {
    if (this.contactFormSubmitted) {
      this.$notify({
        title: 'Thanks for your message!',
        text: "I'll get back to you as soon as possible",
        duration: 3000
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

section.projects-grid
  min-height: 300px
  position:relative

div.projects-section
  border-bottom: solid 1px #DDD
  padding-bottom: 30px

  div.more-projects-block
    text-align: right

  a
    display: inline-block
    color: $link-color
</style>
