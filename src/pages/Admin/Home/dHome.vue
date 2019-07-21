<template>
  <div>
    <Header />
    <router-view/>
    <pFooter />
  </div>
</template>
<script>
import Header  from "../Module/pHeader.vue"
import Footer  from "../Module/pFooter.vue"
import store from "../../../pages/JzIndex/Configs/store";
export default {
  name: "dHome",
  components:{Header,Footer},
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

