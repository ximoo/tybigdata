<template>
  <div style="height:calc(100% - 80px);">
    <transition name="el-fade-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "layout"
};
</script>
