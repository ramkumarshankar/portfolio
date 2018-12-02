<template>
  <ul class="pagination-container">
    <li class="previous">
      <a href="#">&#8249;</a>
    </li>
    <li
      :class="'page ' + ((index === currentPage) ? 'active' : '')"
      v-for="(item, index) in pages"
      v-bind:key="index"
    >
      <a href="#">{{ item.name }}</a>
    </li>
    <li class="previous">
      <a href="#">&#8250;</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    numPages: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 0
    };
  },
  computed: {
    pages() {
      const range = [];
      for (let i = 1; i <= this.numPages; i++) {
        range.push({
          name: i
        });
      }
      return range;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl';

ul.pagination-container {
  text-align: center;
  display: block;
  margin: 20px 0px;

  li {
    padding: 8px 15px;
    display: inline-block;
    margin: 0px 10px;

    &.page {
      border-radius: 2px;
    }

    a {
      color: $text-color;
    }

    &.active {
      background: $link-color;

      a {
        color: #FFF;
      }
    }
  }
}
</style>