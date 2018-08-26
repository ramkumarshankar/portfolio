<template>
  <header>
    <div class="header-inner mx-auto" v-bind:class="[headerClasses]">
      <router-link :to="{ name: 'home' }"><h1 class="site-title" v-bind:class="[isFixed ? 'light' : '']">Ramkumar Shankar</h1></router-link>
      <nav>
        <ul>
          <li><router-link v-bind:class="isFixed ? 'light' : ''" :to="{ name: 'work' }">Work</router-link></li>
          <li><router-link v-bind:class="isFixed ? 'light' : ''" :to="{ name: 'about' }">About</router-link></li>
          <li><button class="secondary" v-bind:class="isFixed ? 'light' : ''">Say hello</button></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isFixed: Boolean,
  },
  computed: {
    headerClasses () {
      if (this.isFixed) {
        return ['absolute', 'left-0', 'right-0', 'light']
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.light
  color: #fff

h1.site-title
  font-size: 1.414em
  font-weight: 500

.header-inner
  max-width: 960px
  margin: auto
  padding: 20px 0px
  display: flex
  align-items: center
  justify-content: space-between
  z-index: 100

  @media screen and (max-width: 1024px)
    width: 760px !important

  @media screen and (max-width: 800px)
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: 100% !important;

ul
  display: inline-block
  list-style-type: none

  li
    display: inline
    padding-left: 30px

  a
  text-decoration: none

  a:hover
    box-shadow: inset 0px -1px 0 0 #735290
    transition: box-shadow 0.2s ease-out;

</style>
