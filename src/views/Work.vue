<template>
  <div class="work">
    <div class="container">
      <h1 class="page-headline">Work</h1>
      <filter-menu :filterItems='tagList' v-on:filterChanged='retrieveProjects' />
      <section class="projects-section">
        <loading-indicator :loading="loading" />
        <projects-grid :projects="projects" />
      </section>
    </div>
  </div>
</template>

<script>
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import FilterMenu from '@/components/FilterMenu.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'Work',
  components: {
    FilterMenu,
    ProjectsGrid,
    LoadingIndicator
  },
  data () {
    return {
      loading: false,
      tagList: null,
      projects: []
    }
  },
  methods: {
    getContent () {
      // Start progress bar
      this.loading = true
      this.startProgress()
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'project'),
        { fetch: ['project.title', 'project.short_description', 'project.image', 'project.link'], orderings: '[document.last_publication_date desc]' }
      ).then((response) => {
        this.setProgress(95)
        this.buildProjectsList(response.results)
        this.loading = false
        if (!this.tagList) {
          this.buildTagList()
        }
      })
    },
    buildTagList () {
      let rawList = []
      this.projects.forEach((project, index) => {
        rawList.push(project.tags)
      })

      let fullTagList = ['all'].concat(...rawList)
      fullTagList.forEach((tag, index) => {
        if (tag === 'featured' || tag === 'Featured') {
          fullTagList.splice(index, 1)
        }
      })
      this.tagList = fullTagList.filter((tag, i, arr) => arr.indexOf(tag) === i)
    },
    retrieveProjects (tag) {
      // Initialise progress bar
      this.setProgress(0)
      this.loading = true
      console.log(tag + ' selected')
      if (tag === 'all') {
        this.getContent()
      } else {
        this.startProgress()
        this.$prismic.client.query(
          this.$prismic.Predicates.at('document.tags', [tag]),
          { fetch: ['project.title', 'project.short_description', 'project.image', 'project.link'], orderings: '[document.last_publication_date desc]' }
        ).then((response) => {
          this.setProgress(95)
          this.buildProjectsList(response.results)
          this.loading = false
        })
      }
    },
    buildProjectsList (projectsResponse) {
      // Remove projects that are not in response
      this.projects = this.projects.filter(project => {
        let indexInArray = projectsResponse.map(projectItem => {
          return projectItem['id']
        }).indexOf(project.id)
        return indexInArray !== -1
      })
      // Add additional projects to the array
      projectsResponse.forEach((projectItem, index) => {
        let indexInArray = this.projects.map(project => {
          return project['id']
        }).indexOf(projectItem.id)
        if (indexInArray === -1) {
          this.projects.push({
            id: projectItem.id,
            title: projectItem.data.title,
            short_description: projectItem.data.short_description,
            image: projectItem.data.image,
            link: projectItem.data.link,
            tags: projectItem.tags
          })
        }
      })
    },
    startProgress () {
      this.$Progress.start()
    },
    setProgress (value) {
      this.$Progress.set(value)
    },
    finishProgress () {
      this.$Progress.finish()
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
h1.page-headline
  margin-top: 50px
  margin-bottom: 20px

section.projects-section
  position: relative
  min-height: 300px
</style>
