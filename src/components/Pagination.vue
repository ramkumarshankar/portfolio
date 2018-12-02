<template>
  <ul class="pagination-container">
    <li class="previous">
      <a v-if="activePage === 1" class="disabled">&#8249;</a>
      <a v-else href="#" disabled>&#8249;</a>
    </li>
    <li
      v-for="(item, index) in pages"
      :class="'page ' + ((activePage === item.name) ? 'active' : '')"
      v-bind:key="index"
    >
      <a @click="updatePage(item.name)">{{ item.name }}</a>
    </li>
    <li class="next">
      <a v-if="activePage === numPages" class="disabled">&#8250;</a>
      <a v-else href="#" disabled>&#8250;</a>
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
    },
    activePage: {
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
  },
  methods: {
    updatePage(page) {
      console.log("page clicked: " + page);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl';

a {
  font-weight: bold;
  font-size: 0.8em;
  cursor: pointer;

  &.disabled {
    opacity: 0.3;
  }
}

ul.pagination-container {
  text-align: center;
  display: block;
  margin: 20px 0px;

  li {
    padding: 5px 12px;
    display: inline-block;
    margin: 0px 5px;

    &.page {
      border-radius: 2px;
    }

    a {
      color: $text-color;

      &:hover:not(.disabled) {
        // TODO: hover state
        color: $link-color;
        padding-bottom: 5px;
        box-shadow: inset 0px -2px 0 0 $link-color;
        transition: box-shadow 0.2s ease-out;
      }
    }

    &.active {
      background: $link-color;

      a {
        color: #FFF;

        &:hover:not(.disabled) {
        // TODO: hover state
        }
      }
    }
  }
}
</style>