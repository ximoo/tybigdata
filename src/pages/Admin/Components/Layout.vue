<template>
  <div>
    <Header />
    <!-- 这里是需要keepalive的 -->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <!-- 这里不会被keepalive -->
    <router-view v-else></router-view>
    <Footer />
  </div>
</template>
<script>
export default {
  name: "Home"
};
</script>

