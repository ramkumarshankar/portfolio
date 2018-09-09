<template>
  <div class="text-slice">
    <div>
      <h2>{{ heading }}</h2>
    </div>
    <div>
      <prismic-rich-text :field="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextSlice',
  props: ['heading', 'body']
}
</script>

<style lang="stylus" scoped>
div.text-slice
  display: grid
  grid-template-columns: 0.33fr 0.66fr
  column-gap: 20px
  grid-column-gap: 20px
  row-gap: 30px
  grid-row-gap: 30px

  @media screen and (max-width: 768px)
    grid-template-columns: 1fr !important

</style>
