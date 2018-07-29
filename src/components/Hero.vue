<template>
  <div class='hero-section'>
    <div class='container'>
      <h1 class='page-headline'>{{ headline }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: ['headline']
}
</script>

<style lang="stylus" scoped>
.hero-section
  display: flex
  flex-direction: column
  padding: 150px 0px 100px 0px

h1.page-headline
  width: 70%

  @media screen and (max-width: 800px)
    width: 100% !important;
</style>
