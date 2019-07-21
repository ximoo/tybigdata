<template>
  <iframe frameborder="0" scrolling="auto" :src="iframeUrl"   @load="vueFunc" ></iframe>
</template>
<script>
export default {
  name: "iFrame",
  props: ["iframeUrl"],
  data() {
    return {};
  }
};
</script>
<style lang="less">
iframe {
  border: none;
  background: transparent;
}
</style>
