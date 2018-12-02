<template>
  <ul v-show="numPages > 1" class="pagination-container">
    <li
      @click="updatePage('previous')"
      :class="'previous ' + ((activePage === 1) ? 'disabled' : '')"
    >
      <a>&#8249;</a>
    </li>
    <li
      v-for="(item, index) in pages"
      @click="updatePage(item.name)"
      :class="'page ' + ((activePage === item.name) ? 'active' : '')"
      v-bind:key="index"
    >
      <a :class="((activePage === item.name) ? 'active' : '')">{{ item.name }}</a>
    </li>
    <li
      @click="updatePage('next')"
      :class="'next ' + ((activePage === numPages) ? 'disabled' : '')"
    >
      <a>&#8250;</a>
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
      if (this.activePage === page) {
        return;
      }
      if (page === "previous") {
        if (this.activePage === 1) {
          return;
        } else {
          this.$emit("pageChanged", this.activePage - 1);
        }
      } else if (page === "next") {
        if (this.activePage === this.numPages) {
          return;
        } else {
          this.$emit("pageChanged", this.activePage + 1);
        }
      } else {
        this.$emit("pageChanged", page);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl';

a {
  font-weight: bold;
  font-size: 0.8em;
}

ul.pagination-container {
  text-align: center;
  display: block;
  margin: 40px 0px;

  li {
    padding: 5px 12px;
    display: inline-block;
    margin: 0px 5px;
    cursor: pointer;

    &.disabled {
      opacity: 0.3;
    }

    &.previous, &.next {
      a {
        color: $text-color;
      }
    }

    &.previous:not(.disabled), &.next:not(.disabled) {
      a {
        color: $text-color;
      }

      &:hover {
        a:not(.active):not(.disabled) {
          color: $link-color;
          padding-bottom: 5px;
          box-shadow: inset 0px -2px 0 0 $link-color;
          transition: box-shadow 0.2s ease-out;
        }
      }
    }

    &.page {
      border-radius: 2px;

      a {
        color: $text-color;
      }

      &.active {
        background: $link-color;

        a {
          color: #FFF;
        }
      }

      &:hover {
        a:not(.active):not(.disabled) {
          color: $link-color;
          padding-bottom: 5px;
          box-shadow: inset 0px -2px 0 0 $link-color;
          transition: box-shadow 0.2s ease-out;
        }
      }
    }
  }
}
</style>
