<template>
  <div class="contact">
    <div class="container">
      <h1 class="page-headline">{{ title }}</h1>
      <section class="contact-section">
        <loading-indicator :loading="loading"/>
        <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="botfield" @submit.prevent="handleSubmit">
          <div class="form-input">
            <input type="hidden" name="form-name" value="contact">
            <div style="display: none">
              <label for="botfield">Don’t fill this out if you're human</label>
              <input name="botfield" v-model="form.botfield">
            </div>
            <div>
              <label for="name">Name</label>
              <input type="text" name="name" v-model="form.name">
            </div>
            <div>
              <label for="email">Email</label>
              <input type="email" name="email" v-model="form.email">
            </div>
            <div class="message">
              <label for="message">Message</label>
              <textarea name="message" v-model="form.message"/>
            </div>
          </div>
          <button class="primary" type="submit">Send</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from "@/components/LoadingIndicator.vue";

export default {
  name: "Contact",
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s | Contact",
    meta: [
      { vmid: "og:title", content: "Contact" },
      { vmid: "og:url", content: "https://www.ramkumar.me/contact/" }
    ]
  },
  data() {
    return {
      loading: false,
      title: "",
      form: {
        name: "",
        email: "",
        message: "",
        botfield: ""
      }
    };
  },
  components: {
    LoadingIndicator
  },
  methods: {
    getContent() {
      this.loading = true;
      this.$prismic.client.getSingle("contactpage").then(document => {
        this.docID = document.id;
        this.title = this.$prismic.richTextAsPlain(document.data.title);
        this.loading = false;
      });
    },
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      let dataToSubmit = Object.assign({}, this.form);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({ "form-name": "contact", ...dataToSubmit })
      })
        .then(() => {
          this.$router.push({
            name: "home",
            params: { contactFormSubmitted: true }
          });
        })
        .catch(error => alert(error));
    }
  },
  created() {
    this.getContent();
  }
};
</script>

<style lang="stylus" scoped>
@import '../styles/main.styl';

h1.page-headline {
  margin-top: 50px;
  margin-bottom: 20px;
}

section.contact-section {
  position: relative;
  min-height: 300px;
  margin-bottom: 30px;
}

.form-input {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  margin-bottom: 30px;
  column-gap: 20px;
  grid-column-gap: 20px;
  row-gap: 20px;
  grid-row-gap: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr !important;
  }
}

label {
  font-family: $base-body-font-family;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  font-size: 1.125em;
  padding: 10px 10px;
  border: 1px solid #979797;
  // box-shadow: inset 0 1px 1px 0 rgba(0,0,0,0.50)
  border-radius: 2px;
}

textarea {
  width: 100%;
  font-size: 1.125em;
  padding: 10px 10px;
  border: 1px solid #979797;
  // box-shadow: inset 0 1px 1px 0 rgba(0,0,0,0.50)
  border-radius: 2px;
  height: 200px;
}

div.message {
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 2;
  }
}
</style>
