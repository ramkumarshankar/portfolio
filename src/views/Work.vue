<template>
  <div class="work">
    <div class="container">
      <h1 class="page-headline">Work</h1>
      <filter-menu :filterItems='tagList' v-on:filterChanged='retrieveProjects' />
      <section class="projects-section">
        <projects-grid :projects="projects" />
        <!-- <project-tile v-for="(project, index) in projects" :key="'project-' + index"
        :title="$prismic.richTextAsPlain(project.data.title)" :description="$prismic.richTextAsPlain(project.data.short_description)" :image="project.data.image" :link="project.data.link" /> -->
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
      this.startProgress()
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'project'),
        { fetch: ['project.title', 'project.short_description', 'project.image', 'project.link'], orderings: '[document.last_publication_date desc]' }
      ).then((response) => {
        // console.log(response.results[0])
        this.setProgress(95)
        this.projects = response.results
        console.log(this.projects)
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
          console.log('inside if')
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
          this.projects = response.results
          // this.buildTagList()
          // response is the response object, response.results holds the documents
        })
      }
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

// .projects-section
//   display: flex
//   flex-wrap: wrap
</style>
