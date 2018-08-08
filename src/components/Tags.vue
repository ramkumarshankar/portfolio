<template>
  <div class="tags">
    <span class="tag" v-for="(tag, index) in displayedTags" v-bind:key="index">
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    tags: Array
  },
  computed: {
    displayedTags () {
      let displayedTags = this.tags
      let index = displayedTags.indexOf('featured')
      if (index !== -1) {
        displayedTags.splice(index, 1)
      }
      return displayedTags
    }
  }
}
</script>

<style lang="stylus" scoped>
.tags
  // background: transparent

.tag
  // display: inline-block
  padding: 2px 10px
  margin-right: 10px
  font-size: 0.75em
  text-transform: uppercase
  font-weight: 700
  background-color: #4A4A4A
  color: #FFF
  width: auto !important
  border-radius 50px
</style>

