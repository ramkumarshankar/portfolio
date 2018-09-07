<template>
  <div class="project">
    <div class="container">
      <p class="tag">Creative Coding</p>
      <h1 class="page-headline">Love by Numbers</h1>
      <section class="projects-section">
        <loading-indicator :loading="loading" />
      </section>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'Project',
  data () {
    return {
      loading: false
    }
  },
  components: {
    LoadingIndicator
  },
  methods: {
    getContent () {
      console.log('get content for ' + this.$route.params.slug)
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl'
.tag
  margin-top: 5px
  margin-right: 10px
  font-size: 0.75em
  text-transform: uppercase
  font-weight: 700
  color: $tag-color
  width: auto !important
  border-radius 2px
</style>
