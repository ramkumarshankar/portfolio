<template>
  <div class="contact">
    <div class="container">
      <h1 class="page-headline">{{ title }}</h1>
      <section class="contact-section">
        <loading-indicator :loading="loading" />
        <form name="contact">
          <div class="form-input">
            <input type="hidden" name="form-name" value="contact" />
            <div>
              <label for="name">Name</label>
              <input type="text" name="name" v-model="form.name" />
            </div>
            <div>
              <label for="email">Email</label>
              <input type="email" name="email" v-model="form.email" />
            </div>
            <div class="message">
              <label for="message">Message</label>
              <textarea name="message" v-model="form.message" />
            </div>
          </div>
          <button class="primary" type="submit" @click.prevent="handleSubmit">Send</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'Contact',
  data () {
    return {
      loading: false,
      title: '',
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  components: {
    LoadingIndicator
  },
  methods: {
    getContent () {
      this.loading = true
      this.$prismic.client.getSingle('contactpage').then((document) => {
        this.docID = document.id
        this.title = this.$prismic.richTextAsPlain(document.data.title)
        this.loading = false
      })
    },
    encode (data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    handleSubmit () {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({ 'form-name': 'contact', ...this.form })
      })
        .then(() => { 
          this.$router.push({ name: 'home', params: { contactFormSubmitted: true } })
        })
        .catch(error => alert(error))
    }
  },
  created () {
    this.getContent()
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl'
h1.page-headline
  margin-top: 50px
  margin-bottom: 20px

section.contact-section
  position: relative
  min-height: 300px
  margin-bottom: 30px

.form-input
  display: grid
  grid-template-columns: 0.5fr 0.5fr
  margin-bottom: 30px
  column-gap: 20px
  row-gap: 20px

  @media screen and (max-width: 768px)
    grid-template-columns: 1fr !important

label
  font-family: $base-body-font-family
  font-weight: 600
  display: block
  margin-bottom: 15px

input
  width:100%
  font-size: 1.125em
  padding: 10px 10px
  border: 1px solid #979797
  // box-shadow: inset 0 1px 1px 0 rgba(0,0,0,0.50)
  border-radius: 2px

textarea
  width:100%
  font-size: 1.125em
  padding: 10px 10px
  border: 1px solid #979797
  // box-shadow: inset 0 1px 1px 0 rgba(0,0,0,0.50)
  border-radius: 2px
  height: 200px

div.message
  grid-column-start: 1
  grid-column-end: 3
  width: 100%

  @media screen and (max-width: 768px)
    grid-column-start: 1
    grid-column-end: 2
</style>
