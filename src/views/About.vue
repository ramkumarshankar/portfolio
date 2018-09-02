<template>
  <div class="about">
    <div class="container">
      <h1 class="page-headline">{{ title }}</h1>
      <section class="about-section">
        <loading-indicator :loading="loading" />
        <div>
          <prismic-rich-text :field="highlight" />
        </div>
        <div>
          <prismic-rich-text :field="bodyText" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'About',
  data () {
    return {
      loading: false,
      title: '',
      highlight: '',
      bodyText: ''
    }
  },
  components: {
    LoadingIndicator
  },
  methods: {
    getContent () {
      this.loading = true
      this.$prismic.client.getSingle('aboutpage').then((document) => {
        this.docID = document.id
        this.title = this.$prismic.richTextAsPlain(document.data.title)
        this.highlight = document.data.highlight
        this.bodyText = document.data.text
        this.loading = false
      })
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl'
h1.page-headline
  margin-top: 50px
  margin-bottom: 20px

section.about-section
  position: relative
  column-gap: 20px
  row-gap: 20px
  min-height: 300px
  display: grid
  grid-template-columns: 0.33fr 0.66fr
  margin-bottom: 30px

  @media screen and (max-width: 768px)
    grid-template-columns: 1fr !important
</style>
