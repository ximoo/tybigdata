<template>
  <iframe frameborder="0" scrolling="auto" :src="iframeUrl"></iframe>
</template>
<script>
const hostDomain = "http://120.202.182.111:8060";
export default {
  name: "iFrame",
  data() {
    return {
      iframeUrl: null
    };
  },
  mounted() {
      this.iframeUrl = hostDomain + this.$route.path;
  },
  watch: {
    $route(n) {
      console.log(n)
      this.iframeUrl = hostDomain + n.path;
    }
  }
};
</script>
<style lang="less">
iframe {
  border: none;
  background: transparent;
  width: 100%;
  height: calc(~"100vh - 80px");
}
</style>
