<template>
  <ul class="ex-tabmenu">
    <li v-for="item,index in pTabMenu" :key="index" :class="{'active':activeIndex == index}">
      <el-button size="mini" type="text" @click="hanldeTab(index,item.url)">{{item.meta.title}}</el-button>
      <el-button size="mini" type="text" icon="el-icon-error" @click="removeTab(index)" />
    </li>
  </ul>
</template>
<script>
export default {
  name: "TabMenu",
  props: ["data"],
  data() {
    return {
      pTabMenu: [],
      activeIndex: 0
    };
  },
  mounted() {

    let self = this;
    self.$nextTick(() => {
      self.pTabMenu = self.data;
      let path = self.$route.path;
      for (var i in self.pTabMenu) {
        if (path == self.pTabMenu[i].url) {
          self.activeIndex = i;
        }
      }
    });

  },
  watch: {

    data(n) {
      let self = this;
      self.pTabMenu = n;
      let path = self.$route.path;
      for (var i in self.pTabMenu) {
        if (path == self.pTabMenu[i].url) {
          self.activeIndex = i;
        }
      }
    }

  },
  methods: {

    hanldeTab(i, url) {
      this.activeIndex = i;
      this.$router.push(url);
    },

    removeTab(i) {
      let self = this;
      let index = 0;
      if (i !== 0) {
        index = i - 1;
        self.pTabMenu.splice(i, 1);
      }
      self.activeIndex = index;
      localStorage.$platTabMenu = JSON.stringify(self.pTabMenu);
      this.$router.push(self.pTabMenu[index].url);
    }
    
  }
};
</script>