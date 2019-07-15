<template>
  <iFrame class="ex-pages" :iframeUrl="iframeUrl" />
</template>
<script>
const hostDomain = "http://192.168.1.200:10201";

export default {
  name: "iframeModule",
  data() {
    return {
      iframeUrl: ""
    };
  },
  mounted() {
    console.log(this.$route.path);
    this.iframeUrl = hostDomain + this.$route.path
  }
};
</script>
<style>
</style>
