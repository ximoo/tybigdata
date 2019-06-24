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
  name: "bHome",
  components: { Tile },
  methods: {}
};
</script>

