	
<template>
  <div>
    <p>Loading the Preview...</p>
  </div>
</template>

<script>
export default {
  name: "Preview",
  beforeCreate() {
    const previewToken = this.$route.query.token;
    this.$prismic.client
      .previewSession(previewToken, this.$prismic.linkResolver, "/")
      .then(url => {
        window.location.replace(url);
      });
  }
};
</script>