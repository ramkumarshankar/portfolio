<template>
  <header>
    <div class="header-inner mx-auto absolute left-0 right-0">
      <h1 class="site-title">Ramkumar Shankar</h1>
      <nav>
        <ul>
          <li><a href="#">Work</a></li>
          <li><a href="#">About</a></li>
          <li><button class="secondary">Say hello</button></li>
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

  h1
    font-size: 1.414em
    font-weight: 500
    color: #FFF

ul
  display: inline-block
  list-style-type: none

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
