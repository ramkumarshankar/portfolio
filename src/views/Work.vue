<template>
  <div class="work">
    <div class="container">
      <h1 class="page-headline">Work</h1>
      <filter-menu :filterItems='tagList' v-on:filterChanged='retrieveProjects' />
      <section class="projects-section">
        <project-tile v-for="(project, index) in projects" :key="'project-' + index"
        :title="$prismic.richTextAsPlain(project.data.title)" :description="$prismic.richTextAsPlain(project.data.short_description)" :image="project.data.image" :link="project.data.link" />
      </section>
    </div>
  </div>
</template>

<script>
import ProjectTile from '@/components/ProjectTile.vue'
import FilterMenu from '@/components/FilterMenu.vue'

export default {
  name: 'work',
  components: {
    FilterMenu,
    ProjectTile
  },
  data () {
    return {
      tagList: null,
      projects: null
    }
  },
  methods: {
    getContent () {
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'project'),
        { fetch: ['project.title', 'project.short_description', 'project.image', 'project.link'], orderings: '[document.last_publication_date desc]' }
      ).then((response) => {
        this.projects = response.results
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
      console.log(tag + ' selected')
      if (tag === 'all') {
        this.getContent()
      } else {
        this.$prismic.client.query(
          this.$prismic.Predicates.at('document.tags', [tag]),
          { fetch: ['project.title', 'project.short_description', 'project.image', 'project.link'], orderings: '[document.last_publication_date desc]' }
        ).then((response) => {
          this.projects = response.results
          // this.buildTagList()
          // response is the response object, response.results holds the documents
        })
      }
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

.projects-section
  display: flex
  flex-wrap: wrap
</style>
