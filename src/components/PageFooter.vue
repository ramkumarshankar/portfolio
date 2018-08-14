<template>
  <footer>
    <ul class='social-icons'>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><button class="secondary">3</button></li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="stylus" scoped>
footer
  background-color: #1B1B1B

ul
  display: inline-block
  list-style-type: none
  padding: 30px 0px

  li
    display: inline
    padding-left: 30px

    a
      text-decoration: none
      color: #FFF

    a:hover
      box-shadow: inset 0px -1px 0 0 #735290
      transition: box-shadow 0.2s ease-out;

    button
      color: #FFF
</style>
