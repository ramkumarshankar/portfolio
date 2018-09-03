<template>
  <div class="contact-block">
    <prismic-rich-text :field="text" />
    <router-link class="primary" :to="{ name: 'contact' }" tag="button">Get in touch</router-link>
  </div>
</template>

<script>
export default {
  name: 'ContactSection',
  props: {
    text: Array
  }
}
</script>

<style lang="stylus" scoped>

div.contact-block
  margin-top: 30px
  margin-bottom: 50px

button
  margin-top: 5px

</style>
