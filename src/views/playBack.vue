<template>
  <div class="container">
    <div class="infoContainer">
      <div class="videoMain">
        <video id="video" ref="videoRef" class="video video-js vjs-default-skin vjs-big-play-centered" controls
               preload="none" playsinline="true">
        </video>
      </div>
    </div>
    <div class="playBackContainer">
      <div class="gdBtn">
        <div class="newsChannel" v-for="(value, key) in list" :key="key" :id="key" @click="getPlayBack($event)">
          <i class="iconfont icon-shouye"></i>
          <p>{{ value.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playBack',
  data () {
    return {
      tvProgramsInfo: '',
      list: {
        687: {
          id: 687,
          origin: 1182,
          ChannelName: 'gdws',
          name: '广东新闻联播',
          beginTime: '18:30:00',
          endTime: '19:00:00'
        },
        770: {
          id: 770,
          origin: 1186,
          ChannelName: 'gdxw',
          name: '今日一线',
          beginTime: '21:29:00',
          endTime: '22:20:00'
        },
        644: {
          id: 644,
          origin: 1186,
          ChannelName: 'gdxw',
          name: '午间30分',
          beginTime: '12:00:20',
          endTime: '12:33:00'
        }
      }
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
    // const time = new Date()
  },
  methods: {
    addTvPrograms (url) {
      this.myPlayer.src(url)
    },
    async getPlayBack (e) {
      const id = e.currentTarget.getAttribute('id')
      const list = this.list[id]
      const options = {
        id,
        origin: list.origin,
        beginTime: new Date(this.getCurrentTime() + ' ' + list.beginTime).getTime(),
        endTime: new Date(this.getCurrentTime() + ' ' + list.endTime).getTime()
      }
      const { data: { url } } = await this.$http('api/lies/play', { params: { options: options } })
      this.addTvPrograms(url)
    },
    getCurrentTime () {
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      return yy + '/' + mm + '/' + dd
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

.container .playBackContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90px;
  flex-wrap: wrap;

  .gdBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-wrap: wrap;

    .newsChannel {
      flex: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
      padding: 0 20px;
      height: 40px;
      border-radius: 8px;
      cursor: pointer;
      word-break: keep-all;
      background: rgba(34, 211, 238, 0.2);
      color: var(--light-color);
      transition: background-color .2s;
      font-size: 14px;
      letter-spacing: 1px;
      opacity: 0;
      animation: initShow 0.8s cubic-bezier(0.2, 0.9, 1, 1);
      animation-fill-mode: forwards;
      animation-delay: 400ms;

      p {
        margin-left: 6px;
      }

      &:hover {
        background: rgba(34, 211, 238, 0.3);
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .videoMain {
    padding: 0 30px;
  }
}
</style>
