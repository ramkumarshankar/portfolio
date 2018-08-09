<template>
  <div class="project-tile">
    <prismic-link  :field="link">
      <prismic-image :field="image" />
      <!-- <img src="http://placekitten.com/800/300" /> -->
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <Tags :tags="tags" />
    </prismic-link>
  </div>
</template>

<script>
import Tags from '@/components/Tags'

export default {
  name: 'ProjectTile',
  props: {
    title: String,
    description: String,
    link: Object,
    image: Object,
    tags: Array
  },
  components: {
    Tags
  }
}
</script>

<style lang="stylus" scoped>
h2
  font-weight: 700

.project-tile
  flex-basis: 50%
  padding: 20px 0px

  &:first-child
    flex-basis: 100%
    padding: 0 !important

  &:nth-child(odd)
    padding-left: 20px

  &:nth-child(even)
    padding-right: 20px
</style>
