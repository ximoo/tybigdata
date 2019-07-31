<template>
  <!-- vecVideoShow -->
  <reDialog
    v-dialogDrag
    :title="vecInfo.name + '的车载视频'"
    :visible="vecVideoShow"
    :modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="600px"
    class="group-tree-dialog"
    @close="closeDialog"
  >
    <video :src="videoSrc" controls autoplay></video>
  </reDialog>
</template>
<script>
import flvjs from "flv.js";

export default {
  name: "vecVideo",
  props: ["vecVideoShow", "vecInfo"],
  data() {
    return {
      videoSrc: null
    };
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit("vecVideoClose", false);
    }
  },
  watch: {
    vecVideoShow(n) {
      let self = this;
      if (n) {
        self.videoSrc = "http://localhost:9200/video/2.mp4";
      }
    }
  }
};
</script>
<style scoped>
video {
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>
