<template>
  <div class="">
    <van-tabbar fixed v-model="active">
      <van-tabbar-item
        v-for="(item, index) in tablist"
        :key="index"
        :icon="item.icon"
        @click.stop="toPage(item.path)"
        >{{ item.title }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    activeTab: {
      type:Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      active: this.activeTab,
      tablist: [
        { title: "首页", icon: "home-o", path: "/home", name: "home" },
        { title: "查询", icon: "search", path: "/search", name: "search" },
        { title: "消息", icon: "comment-o", path: "/message", name: "message" },
        { title: "我的", icon: "user-o", path: "/user", name: "user" },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toPage(path) {
    //   this.$router.push({
    //     path: path,
    //   });
    },
  },
};
</script>

<style scoped lang="less"></style>
