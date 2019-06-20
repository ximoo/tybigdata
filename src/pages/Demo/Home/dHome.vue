<template>
  <div>
    <pHeader />
    <router-view/>
    <pFooter />
  </div>
</template>
<script>
export default {
  name: "dHome",
  methods: {
    toDB() {
      this.$router.push({ path: "/system/controlDB" });
    }
  }
};
</script>

