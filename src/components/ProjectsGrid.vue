<template>
  <div class='projects'>
    <project-tile v-for="(item, index) in projects" :featured ="index === 0" :key="'project-item-' + index"
    :title="$prismic.richTextAsPlain(item.title)" :description="$prismic.richTextAsPlain(item.short_description)" :image="item.image" :link="item.link"
    :tags="item.tags" />
  </div>
</template>

<script>
import ProjectTile from '@/components/ProjectTile.vue'

export default {
  name: 'ProjectGrid',
  props: {
    projects: Array
  },
  components: {
    ProjectTile
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
