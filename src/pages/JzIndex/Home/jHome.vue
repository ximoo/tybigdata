<template>
  <div class="ex-pages-bigdata">
    <Tile/>
    <fullScreen/>
    <router-view/>
  </div>
</template>
<script>
import Tile from "../Component/Tile.vue";

export default {
  name: "jHome",
  components: { Tile },
  methods: {}
};
</script>

