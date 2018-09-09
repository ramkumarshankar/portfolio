<template>
  <div class="project">
    <div class="container">
      <span class="tag" v-for="(tag, index) in tags" v-bind:key="index">
        {{ tag }}
        <span v-if="index !== tags.length -1">&nbsp;/&nbsp;</span>
      </span>
      <h1 class="page-headline">{{ $prismic.richTextAsPlain(this.title) }}</h1>
      <p>{{ $prismic.richTextAsPlain(this.description) }}</p>
      <prismic-image class='title-image' :field="titleImage" />
      <section class="project-detail">
        <loading-indicator :loading="loading" />
        <section class="project-detail-slice" v-for="(slice, index) in slices" :key="'slice-' + index">
          <template v-if="slice.slice_type === 'paragraph'">
            <text-slice v-for="(item, index) in slice.items" :key="'textslice-' + index" :heading="$prismic.richTextAsPlain(item.heading)" :body="item.paragraph" />
          </template>
          <template v-else-if="slice.slice_type === 'image'">
              <prismic-image v-for="(item, index) in slice.items" :key="'imageslice-' + index" :field="item.image" />
          </template>
          <template v-else-if="slice.slice_type === 'text_highlight'">
            <!-- <template v-for="(item, index) in slice.items"> -->
              <prismic-rich-text v-for="(item, index) in slice.items" :key="'highlightslice-' + index" :field="item.highlight" />
            <!-- </template> -->
          </template>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import TextSlice from '@/components/TextSlice.vue'

export default {
  name: 'Project',
  data () {
    return {
      loading: false,
      tags: '',
      title: '',
      description: '',
      titleImage: '',
      slices: []
    }
  },
  components: {
    LoadingIndicator,
    TextSlice
  },
  methods: {
    getContent () {
      this.loading = true
      let projectUid = this.$route.params.slug
      console.log('get content for ' + projectUid)
      this.$prismic.client.getByUID('project', projectUid).then((document) => {
        // document contains the document content
        console.log(document)
        this.title = document.data.title
        this.description = document.data.short_description
        this.titleImage = document.data.image
        // document.title = 'Ramkumar Shankar - Work - ' + this.title
        this.slices = document.data.body
        this.buildTagList(document.tags)
        this.loading = false
      })
    },
    buildTagList (tags) {
      if (tags) {
        let displayedTags = tags
        let index = displayedTags.indexOf('featured')
        if (index !== -1) {
          displayedTags.splice(index, 1)
        }
        this.tags = displayedTags
      }
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl'
div.project
  margin-top: 50px

section.project-detail
  margin-bottom: 30px
  min-height: 300px
  position: relative

section.project-detail-slice
 margin: 30px 0px

h1.page-headline
  margin-bottom: 20px

.tag
  margin-top: 5px
  // margin-right: 10px
  font-size: 0.75em
  text-transform: uppercase
  font-weight: 700
  color: $tag-color
  width: auto !important
  border-radius 2px

img.title-image
  width: 100%
  object-fit: cover
</style>
