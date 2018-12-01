<template>
  <ul>
    <li v-for="(item, index) in pages" v-bind:key="index">
      <a href="#">{{ item.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    numPages: Number
  },
  computed: {
    pages() {
      const range = []
      for (let i = 1; i <= this.numPages; i++) {
        range.push({
          name: i,
        });
      }
      return range
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl';
</style>