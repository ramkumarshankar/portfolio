<template>
  <div class="work">
    <div class="container">
      <h1 class="page-headline">Work</h1>
      <filter-menu />
    </div>
  </div>
</template>

<script>
import FilterMenu from '@/components/FilterMenu.vue'

export default {
  name: 'work',
  components: {
    FilterMenu
  }
}
</script>

<style lang="stylus" scoped>
h1.page-headline
  margin-top: 50px
  margin-bottom: 20px
</style>
