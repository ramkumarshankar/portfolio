<template>
  <div class="project-tile">
    <prismic-link :field="link">
      <div class="image-container">
        <prismic-image :field="image" />
        <div class="overlay">
          <div>
            View Project
          </div>
        </div>
      </div>
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

div.image-container
  overflow: hidden
  position: relative
  margin-bottom: 5px
  border-radius: 2px

  img
    transition: all 0.2s ease-in

div.overlay
  opacity: 0
  transform-origin: 50% 0%
  transform: scaleY(0)
  position: absolute
  width: 100%
  height: 100%
  top:0
  left:0
  display: flex
  justify-content: flex-end
  align-items: flex-start
  transition: all 0.2s ease-in

  div
    margin-right: 10px
    background: #DA4167
    padding: 10px 20px
    color: #FFF

// div.image-container:hover
//   img
//     opacity: 0.5

//   div.overlay
//     opacity: 1
//     transform: scaleY(1)

.project-tile
  position: relative
  flex-basis: 50%
  padding-bottom: 40px

  @media screen and (max-width: 600px)
    flex-basis: 100%
    // padding-left: 1.5rem;
    // padding-right: 1.5rem;
    // width: 100% !important;
    padding: 0  0 40px 0 !important

  &:hover
    a > div.image-container > img
      opacity: 0.4

    a > div.image-container > div.overlay
      opacity: 1
      transform: scaleY(1)

  &:first-child
    flex-basis: 100%
    padding: 0 0 40px 0 !important

  &:not(:first-child)
    > a > div.image-container > img
    // > a > img
      width: 100%
      height: 250px
      object-fit: cover;

  &:nth-child(odd)
    padding-left: 20px

  &:nth-child(even)
    padding-right: 20px

</style>
