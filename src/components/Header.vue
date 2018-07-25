<template>
  <header>
    <div class="header-inner">
      <h1>Ramkumar Shankar</h1>
      <nav>
        <ul>
          <li><a href="#">Work</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="stylus" scoped>
.header-inner
  padding: 0px 100px
  display: flex
  align-items: center
  justify-content: space-between

  h1
    font-size: 1.414em

ul
  display: inline-block
  list-style-type: none

  li
    display: inline
    padding-left: 20px
    
    a 
      text-decoration: none

</style>
