<template>
  <div class="container">
    <div class="infoContainer">
      <div class="videoMain">
        <video id="video" ref="videoRef" class="video video-js vjs-default-skin vjs-big-play-centered" controls
               preload="none" playsinline="true">
        </video>
      </div>
    </div>
    <router-view @addTvPrograms="addTvPrograms" :tvProgramsInfo="tvProgramsInfo"></router-view>
  </div>
</template>

<script>
export default {
  name: 'TvPrograms',
  data () {
    return {
      tvProgramsInfo: ''
    }
  },
  async mounted () {
    const { data: list } = await this.$http('/api/lies/tvChannelList')
    this.tvProgramsInfo = list
    // 防止eslint检测到下一行
    // eslint-disable-next-line no-undef
    this.myPlayer = videojs(this.$refs.videoRef, {
      // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      controls: true,
      // 自动播放属性,muted:静音播放
      autoplay: true,
      // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      preload: 'auto',
      fluid: true,
      volumeMenuButton: true,
      poster: 'https://picsum.photos/1280/720', // 封面图片
      notSupportedMessage: '请选择频道或视频暂无法播放'
    })
  },
  methods: {
    addTvPrograms (url) {
      this.myPlayer.src(url)
    }
  }
}
</script>

<style lang='less' scoped>
.videoMain {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 40px;
  max-width: 888px;
  height: 50vw;
  opacity: 0;
  max-height: 500px;
  animation: initShowVideo 1s;
  animation-fill-mode: forwards;

  .video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}

.container {
  .infoContainer {
    .info {
      text-align: center;
      margin: 0 auto;
    }
  }
}

@media screen and (max-width: 1000px) {
  .videoMain {
    padding: 0 30px;
  }
}
</style>
