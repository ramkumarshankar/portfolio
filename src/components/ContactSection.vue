<template>
  <div class="contact-block">
    <prismic-rich-text :field="text" />
    <button class="primary">Get in touch</button>
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
