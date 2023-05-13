<template>
  <div class="container">
    <div class="origin" ref="originRef" contenteditable @blur="changeText" @focus="changeText('')">
      </div>
    <div class="iconfontArea"><i class="iconfont icon-qingkong deleteIcon" @click="cleanInputText" /></div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {},
  data () {
    return {}
  },
  methods: {
    changeText (e) {
      this.$emit('changeText', e.target?.innerText)
    },
    cleanInputText () {
      this.$refs.originRef.innerText = ''
      this.$emit('changeText', '')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  position: relative;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color);

  .origin {
    position: relative;
    text-align: left;
    width: 79%;
    max-width: 880px;
    height: 80px;
    padding: 10px 26px;
    font-size: 16px;
    box-shadow: 0 0.005rem 0.325rem -0.0875rem var(--box-shadow-color);
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--content-color);
    opacity: 0;
    animation: initShow 0.75s;
    animation-delay: 0.15s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;

    &:hover {
      box-shadow: 0 0.005rem 0.625rem -0.0875rem rgba(255, 253, 253, .2);
    }

    &:focus {
      outline: none;
    }
  }

  .iconfontArea {
    position: absolute;
    background-color: red;
    width: 79%;
    max-width: 880px;
    .deleteIcon {
      position: absolute;
      right: -19px;
      bottom: -47px;
      opacity: 0.2;
      transition: all 0.3s;
      cursor: pointer;
    }
  }

  .origin:hover + .iconfontArea .deleteIcon, .deleteIcon:hover {
    opacity: 1;
  }
}

</style>
