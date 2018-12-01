<template>
  <div class="filterMenu">
    <ul>
      <li v-for="(item, index) in filterItems" v-bind:key="index">
        <a
          v-bind:class="[index === activeIndex ? 'active' : '']"
          v-on:click="updateSelection(index, item)"
        >{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilterMenu',
  props: {
    activeIndexFromParent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      filterItems: [],
      activeIndex: null
    }
  },
  methods: {
    getTags () {
      this.$prismic.client
        .query(this.$prismic.Predicates.at("document.type", "project"), {
          // we don't need any fields
          fetch: [],
          // keep page size large to get all projects
          pageSize: 100
        })
        .then(response => {
          this.buildTagList(response.results);
        });
    },
    buildTagList(projects) {
      console.log(projects)
      let rawList = [];
      projects.forEach((project, index) => {
        rawList.push(project.tags);
      });

      let fullTagList = ["all"].concat(...rawList);
      fullTagList.forEach((tag, index) => {
        if (tag === "featured" || tag === "Featured") {
          fullTagList.splice(index, 1);
        }
      });
      this.filterItems = fullTagList.filter(
        (tag, i, arr) => arr.indexOf(tag) === i
      );
    },
    updateSelection (index, item) {
      this.activeIndex = index
      this.$emit('filterChanged', item)
    }
  },
  created () {
    this.activeIndex = this.activeIndexFromParent
    this.getTags()
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl';

div.filterMenu {
  margin-bottom: 50px;
}

ul {
  li {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: 700;

    a {
      cursor: pointer;
      padding-bottom: 5px;
      color: #9b9b9b;

      &.active {
        color: $link-color;
        box-shadow: inset 0px -2px 0 0 $link-color;
        transition: box-shadow 0.2s ease-out;
      }

      &:hover {
        color: $link-color;
        box-shadow: inset 0px -2px 0 0 $link-color;
        transition: box-shadow 0.2s ease-out;
      }
    }
  }
}
</style>
