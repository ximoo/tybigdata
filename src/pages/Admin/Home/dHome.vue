<template>
  <div>
    <pHeader />
    <router-view/>
    <pFooter />
  </div>
</template>
<script>
import store from "../../../pages/JzIndex/Configs/store";
export default {
  name: "dHome",
  mounted(){
     window.document.title =
      store.state.platformData.state.city + store.state.platformData.state.name;
  },
  methods: {
    toDB() {
      this.$router.push({ path: "/system/controlDB" });
    }
  },
  computed: {
    platformName() {
      return (
        store.state.platformData.state.city +
        store.state.platformData.state.name
      );
    },
    adcode() {
      return store.state.platformData.state.adcode;
    }
  }
};
</script>

