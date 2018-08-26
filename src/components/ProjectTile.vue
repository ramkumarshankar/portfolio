<template>
  <div class="project-tile">
    <prismic-link :field="link">
      <prismic-image :field="image" />
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
  margin-bottom: 5px

p
  margin-bottom: 5px

.project-tile
  position: relative
  flex-basis: 50%
  padding-bottom: 40px

  &:first-child
    flex-basis: 100%
    padding: 0 0 40px 0 !important

  &:not(:first-child)
    > a > img
      width: 100%
      height: 250px
      object-fit: cover;

  &:nth-child(odd)
    padding-left: 20px

  &:nth-child(even)
    padding-right: 20px

</style>
