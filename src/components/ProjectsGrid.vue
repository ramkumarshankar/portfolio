<template>
  <div class='projects'>
    <project-tile v-for="(item, index) in projects" :featured ="index === 0" :key="'project-item-' + index"
    :title="$prismic.richTextAsPlain(item.featured_projects.data.title)" :description="$prismic.richTextAsPlain(item.featured_projects.data.short_description)" :image="item.featured_projects.data.image" :link="item.featured_projects"
    :tags="item.featured_projects.tags" />
  </div>
</template>

<script>
import ProjectTile from '@/components/ProjectTile.vue'

export default {
  name: 'ProjectGrid',
  props: {
    projects: Array
  },
  data () {
    return {
      projectInfo: []
    }
  },
  components: {
    ProjectTile
  },
  methods: {
    getProjectInfo () {
      this.projectInfo = []
      console.log(this.$router.currentRoute.name)
      if (this.$router.currentRoute.name === 'home') {
        this.projects.forEach((project, index) => {
          console.log('adding!')
          this.projectInfo.$set({
            title: project.featured_projects.data.title,
            short_description: project.featured_projects.data.short_description,
            image: project.featured_projects.data.image,
            link: project.featured_projects
          }, index)
          // this.projectInfo.push({
          //   title: project.featured_projects.data.title,
          //   short_description: project.featured_projects.data.short_description,
          //   image: project.featured_projects.data.image,
          //   link: project.featured_projects
          // })
          console.log(this.projectInfo)
        })
        console.log(this.projectInfo)
      } else if (this.$router.currentRoute.name === 'work') {
        this.projects.forEach((project, index) => {
          this.projectInfo.push({
            title: project.data.title,
            short_description: project.data.short_description,
            image: project.data.image,
            link: project.data.link
          })
        })
      }
    }
  },
  created () {
    console.log('created')
    // this.getProjectInfo()
  },
  beforeUpdate () {
    console.log('beforeUpdate')
    // this.getProjectInfo()
  }
}
</script>

<style lang="stylus" scoped>
.projects
  display: grid
  grid-template-columns: 0.5fr 0.5fr
  column-gap: 20px
  row-gap: 30px
  margin-bottom:30px

  @media screen and (max-width: 600px)
    grid-template-columns: 1fr !important

.featured
  grid-column-start: 1
  grid-column-end: 3

  @media screen and (max-width: 600px)
    grid-column-start: 1
    grid-column-end: 2

</style>
