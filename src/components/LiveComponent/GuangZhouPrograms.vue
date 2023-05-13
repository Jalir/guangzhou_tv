<template>
  <div class="TvPrograms">
    <div class="workerListItemTitle">广州台</div>
    <div class="programsList" @click="sendTvProgramsToAll">
      <div class="workerListItem rippleArea" :url="item.url" v-for="item in tvProgramsInfo['GuangZhou']"
           :key="item['pk']">{{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuangZhouPrograms',
  props: ['tvProgramsInfo'],
  mounted () {
  },
  methods: {
    sendTvProgramsToAll (e) {
      e.target.getAttribute('url') && this.$emit('addTvPrograms', e.target.getAttribute('url'))
    }
  },
  watch: {
    tvProgramsInfo: function (val) {
      // console.log(val)
      // console.log(val.GuangDong)
    }
  },
  filter: {}
}
</script>

<style lang='less' scoped>
.TvPrograms {
  max-width: 700px;
  margin: 0 auto;
  color: var(--light-color);

  .ripple {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    animation: showRipplesss 1s ease-out;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .workerListItemTitle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-width: 1000px;
    height: 40px;
    margin: 0 30px 14px;
    border-radius: 5px;
    font-size: 16px;
    background-color: #1c4c57;
    cursor: default;
    opacity: 0;
    animation: initShow 0.6s;
    animation-delay: 0.35s;
    animation-fill-mode: forwards;
  }

  .programsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1;
    max-height: 200px;
    padding: 0 20px;
    overflow-y: auto;
    opacity: 0;
    animation: initShow 1.0s cubic-bezier(0.2, 0.9, 1, 1);
    animation-delay: 0.65s;
    animation-fill-mode: forwards;

    .workerListItem {
      text-align: center;
      position: relative;
      text-align: center;
      overflow: hidden;
      height: 50px;
      cursor: pointer;
      border-radius: 5px;
      display: flex;
      width: 160px;
      justify-content: center;
      align-items: center;
    }
  }
}

@keyframes showRipplesss {
  0% {
    opacity: 0.4;
    width: 0px;
    height: 0px;
  }
  100% {
    opacity: 0;
    width: 600px;
    height: 600px;
  }
}

</style>
