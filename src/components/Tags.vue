<template>
  <div class="tags">
    <span class="tag" v-for="(tag, index) in displayedTags" v-bind:key="index">{{ tag }}</span>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tags: Array
  },
  computed: {
    displayedTags() {
      if (this.tags) {
        let displayedTags = this.tags;
        let index = displayedTags.indexOf("featured");
        if (index !== -1) {
          displayedTags.splice(index, 1);
        }
        return displayedTags;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  // display: inline-block
  padding: 5px 10px;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 0.75em;
  text-transform: uppercase;
  font-weight: 700;
  background-color: #4A4A4A;
  color: #FFF;
  width: auto !important;
  border-radius: 2px;
}
</style>
