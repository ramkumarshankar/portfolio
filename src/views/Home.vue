<template>
  <div class="home">
    <Hero />
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Hero from '@/components/Hero.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Hero
  },
  mounted () {
    console.log(this.$prismic)
  }
}
</script>
