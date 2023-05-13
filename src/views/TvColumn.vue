<template>
  <div>
    <div class="tvColumnContainer">
      <div class="hardTitle">
        <p class="title">栏目回放</p>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TvColumn',
  data () {
    return {}
  },
  mounted () {
    // window.onmousewheel = document.onmousewheel = this.scrollFunc
  },
  methods: {
  },
  beforeDestroy () {
  }
}
</script>

<style lang='less' scoped>

.tvColumnContainer {
  .hardTitle {
    display: flex;
    align-items: center;
    background-color: var(--title-background-color);
    width: 100%;
    font-size: 40px;
    text-indent: 40px;
    height: 140px;
    color: var(--light-color);

    .title {
      font-size: 2rem;
      letter-spacing: 3px;
      animation: initShow 0.8s cubic-bezier(0.2, 0.9, 1, 1);
    }
  }
}
</style>
