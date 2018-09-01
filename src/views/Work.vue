<template>
  <div class="work">
    <div class="container">
      <h1 class="page-headline">Work</h1>
      <filter-menu :filterItems='tagList' v-on:filterChanged='retrieveProjects' />
      <section class="projects-section">
        <projects-grid :projects="projects" />
      </section>
    </div>
  </div>
</template>

<script>
import ProjectsGrid from '@/components/ProjectsGrid.vue'
import FilterMenu from '@/components/FilterMenu.vue'

export default {
  name: 'work',
  components: {
    FilterMenu,
    ProjectsGrid
  },
  data () {
    return {
      tagList: null,
      projects: null
    }
  },
  methods: {
    getContent () {
      // Start progress bar
      this.startProgress()
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'project'),
        { fetch: ['project.title', 'project.short_description', 'project.image', 'project.link'], orderings: '[document.last_publication_date desc]' }
      ).then((response) => {
        this.setProgress(95)
        this.buildProjectsList(response.results)
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
        })
      }
    },
    buildProjectsList (projectsResponse) {
      let displayedProjects = []
      projectsResponse.forEach((project, index) => {
        displayedProjects.push({
          id: project.id,
          title: project.data.title,
          short_description: project.data.short_description,
          image: project.data.image,
          link: project.data.link,
          tags: project.tags
        })
      })
      // console.log(displayedProjects)
      this.projects = displayedProjects
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
</style>
