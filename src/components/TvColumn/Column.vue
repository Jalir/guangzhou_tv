<template>
  <div>
    <div class="showContainer">
      <div class="tagList">
        <div class="tvProgram">
          <div class="tvProgramBox">
            <p>{{ list[currentTelevisionStation]['name'] }}</p>
          </div>
          <div class="tvProgramSelectOption" ref="tvProgramSelectOption" @click="selectProgram($event)">
            <p class="tvProgramSelectValue" data-value="gd">广东台</p>
            <p class="tvProgramSelectValue" data-value="sz">深圳台</p>
            <p class="tvProgramSelectValue" data-value="gz">广州台</p>
          </div>
        </div>
        <div class="tvProgram">
          <div class="tvProgramBox">
            <p>请选择</p>
          </div>
          <div class="tvProgramSelectOption" @click="selectColumn($event)">
            <p class="tvProgramSelectValue" v-for="(value,key) in list[currentTelevisionStation]['program']" :key="key"
               :data-id="key">{{ value }}</p>
          </div>
        </div>
      </div>
      <div class="infoShow" v-if="status === 'prepare'">
        <p>请选择栏目</p>
      </div>
      <div class="loadingArea" v-else-if="status === 'loading'">
        <div class="loading"></div>
      </div>
      <div class="videoListArea" v-else-if="status === 'finished'" @touchstart="getTouchstartY()"
           @touchmove="touchmove()">
        <div class="item" v-for="(item, index) in dataList" :key="index">
          <a :href="item['h5url']" target="_blank" style="display: block; width: 100%;height: 100%">
            <div class="coverImage" :style="{backgroundImage:'url(' + item.imgLink + ')'}">
              <!--              <img class="" :data-src="item['imgLink']" :src="item['imgLink']">-->
            </div>
            <div class="info">
              <a class="title" :href="item['h5url']" target="_blank" :title="item.title">{{ item.title }}</a>
            </div>
          </a>
        </div>
        <div class="loadingArea">
          <div class="loading"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'GdColumn',
  data () {
    return {
      paramsOption: {
        currentId: 0,
        releasedAt: 0,
        pageNum: 1
      },
      status: 'prepare',
      dataList: [],
      list: {
        gd: {
          name: '广东台',
          program: {
            644: '午间30分',
            687: '广东新闻联播',
            669: '飞跃广东',
            673: '晚间新闻',
            767: '社会纵横',
            679: '今日关注',
            674: '珠江新闻',
            770: '今日一线',
            650: '直播广东',
            829: '今日焦点',
            756: 'DV现场',
            772: '今日最新闻',
            700: '城事特搜',
            686: '南方财经报道'
          }
        },
        sz: {
          name: '深圳台',
          program: {
            7000: '宝安新闻',
            7885: '法观天下',
            7902: '正午30分',
            7882: '第一现场',
            7924: '新闻广场',
            7925: '18点新闻',
            7883: '直播深圳',
            7901: '深视新闻',
            7886: '都市路路通',
            7917: '城市发现',
            7914: '1919创财经'
          }
        },
        gz: {
          name: '广州台',
          program: {
            1000015: '广州新闻联播',
            1000095: '广视新闻',
            1000097: 'G4出动'
          }
        }
      },
      lock: true,
      wheelLock: true,
      imgNum: 0,
      currentTelevisionStation: '', // 'gz' 'gd' 'sz'
      currentColumn: '请选择',
      navListItem: ''
    }
  },
  beforeMount () {
    // console.log(this.$route.params.id)
    this.currentTelevisionStation = this.$route.params.id
  },
  async mounted () {
    // this.currentTelevisionStation = this.$route.path.split('/').pop()
    // const liZeeArr = [687, 669, 673, 767, 679, 674, 770, 650, 829, 756, 772, 700, 686]
    // const liZeeArr = [687]
    // liZeeArr.forEach(item => {
    //   this.$http.get('api/lies/d', { params: { id: item } }).then(res => {
    //     const { data } = res
    //     console.log(data)
    //   })
    // })

    // console.log(document.querySelectorAll('.tvColumnContainer')[0])
    this.navListItem = document.querySelectorAll('.nav .navListItem')[0]
    addEventListener('scroll', this.handleScroll, true)
    // const imgList = document.querySelectorAll('.coverImage img')
    // const viewHeight = window.innerHeight || document.documentElement.clientHeight
  },
  methods: {
    getTouchstartY () {
      this.startY = event.changedTouches[0].pageY // 将手指对应的y轴坐标赋值给data中的startY
      this.wheelLock = false
      setTimeout(() => {
        this.wheelLock = true
      }, 3000)
    },
    touchmove () {
      // if (!this.wheelLock) return false
      const moveEndY = event.changedTouches[0].pageY
      const Y = moveEndY - this.startY // 如果值为正,则代表手指下滑,反则则为上滑,为0则表示点击
      if (Y > 0 && this.wheelLock) {
        this.navListItem.classList.remove('hideNavListItem') // 子组件向父组件传值,显示父组件的顶部组件
        this.wheelLock = false
      } else if (Y < 0) {
        this.navListItem.classList.add('hideNavListItem') // 隐藏顶部组件
      } else {
        // this.navListItem.classList.remove('hideNavListItem') // 子组件向父组件传值,显示父组件的顶部组件
      }
    },
    scrollFunc (e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          this.navListItem.classList.remove('hideNavListItem')
        }
        if (e.wheelDelta < 0) {
          this.navListItem.classList.add('hideNavListItem')
        }
        // Firefox滑轮事件
      } else if (e.detail) {
        if (e.detail > 0) {
          this.navListItem.classList.remove('hideNavListItem')
        }
        if (e.detail < 0) {
          this.navListItem.classList.add('hideNavListItem')
        }
      }
    },
    async selectColumn (e) {
      // 确认选择框内的值
      this.currentColumn = e.target.innerText
      // 进入加载状态
      this.status = 'loading'
      // 获取 id 元素
      const id = e.target.getAttribute('data-id')
      // 将 params 的 id 换成选中的 id
      this.paramsOption = {
        currentId: id,
        releasedAt: 0,
        pageNum: 1
      }
      // 开放滚轮事件
      const dom = document.querySelectorAll('.tvColumnContainer')[0]
      dom.onmousewheel = this.scrollFunc
      // 装载请求的容器
      const requestPromise = []
      switch (this.currentTelevisionStation) {
        case 'gd':
          // 发送广东的 promise
          requestPromise.push(this.$http.get('api/lies/list', { params: this.paramsOption }))
          break
        case 'gz':
          // 发送广州的 promise
          requestPromise.push(this.$http.get('api/gz/list', { params: this.paramsOption }))
          break
        case 'sz':
          // 第一次请求不足整个页面，需要多次请求：添加一页
          requestPromise.push(this.$http.get('api/sz/list', { params: this.paramsOption }))
          break
      }
      // 将请求一次统一发送
      await axios.all(requestPromise).then(res => {
        // 将统一返回的 res data 提取
        const list = [].concat(...res.map(item => item.data))
        // 更换 dataList
        this.dataList = [...list]
      })
      // 结束加载状态
      this.status = 'finished'
    },
    // 跳转路由
    jumpToOriginalWebsite (url) {
      window.open(url)
    },
    selectProgram (e) {
      this.currentTelevisionStation = e.target.getAttribute('data-value')
    },
    async handleScroll (event) {
      // const imgList = document.querySelectorAll('.coverImage img')
      // const viewHeight = window.innerHeight || document.documentElement.clientHeight
      // for (let i = this.imgNum; i < imgList.length; i++) {
      //   // 用可视区域高度减去元素顶部距离可视区域顶部的高度
      //   const distance = viewHeight - imgList[i].getBoundingClientRect().top
      //   // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
      //   if (distance >= 20) {
      //     // 给元素写入真实的src，展示图片
      //     imgList[i].src = imgList[i].getAttribute('data-src')
      //     // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
      //     this.imgNum = i + 1
      //   }
      // }
      if (event.target.scrollTop === 0) this.navListItem.classList.remove('hideNavListItem')
      if (!event) return false
      // 计算滚轮离底部的距离
      // console.log(event.target)
      // console.log(event.target.scrollHeight)
      // console.log(event.target.scrollTop)
      // console.log(event.target.clientHeight)
      const scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight
      if (scrollBottom < 1000 && this.lock) { // 判断滚动到底部时
        this.lock = false
        this.paramsOption.pageNum += 1
        let requestPromise
        switch (this.currentTelevisionStation) {
          case 'gd': {
            // 广东台需要记录最后一个请求的时间
            this.paramsOption.releasedAt = this.dataList[this.dataList.length - 1]?.releasedAt
            requestPromise = this.$http.get('api/lies/list', { params: this.paramsOption })
            break
          }
          case 'gz':
            requestPromise = this.$http.get('api/gz/list', { params: this.paramsOption })
            break
          case 'sz':
            requestPromise = this.$http.get('api/sz/list', { params: this.paramsOption })
            break
        }
        await requestPromise.then(res => {
          const { data } = res
          this.dataList = this.dataList.concat(data)
        }).catch(e => console.log(e))
        this.status = 'finished'
        this.lock = true
      }
    }
    // getColumn (id) {
    //   this.status = 'loading'
    //   this.currentId = id
    //   this.$http.get('api/lies/d', { params: { id: id } }).then(res => {
    //     const { data } = res
    //     this.dataList = data
    //     this.releasedAt = this.dataList[this.dataList.length - 1].releasedAt
    //     this.status = 'finished'
    //   })
    // }
  },
  beforeDestroy () {
    this.navListItem.classList.remove('hideNavListItem')
    const dom = document.querySelectorAll('.tvColumnContainer')[0]
    if (dom) {
      dom.onmousewheel = null
      window.removeEventListener('scroll', this.handleScroll, true)
    }
  }
}
</script>

<style lang='less' scoped>

.showContainer {
  .loadingArea {
    width: 100%;
    height: 200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .loading {
      //position: absolute;
      //top: 38%;
      //left: 49%;
      width: 40px;
      height: 40px;
      //transform: translate(-20px, -20px);
      border-radius: 50%;
      border: 1px solid transparent;
      border-top-color: var(--color);
      animation: rotate 1.5s linear infinite;
      animation-delay: 2s;
      opacity: 0;

      &:before {
        content: '';
        position: absolute;
        top: 4px;
        bottom: 4px;
        right: 4px;
        left: 4px;
        border: 1px solid transparent;
        border-radius: 50%;
        border-top-color: var(--color);
        animation: rotate 1s linear infinite;
        animation-delay: 2s;
      }
    }
  }
}

@keyframes rotate {
  0% {
    opacity: 1;
    transform: rotate(0);
  }
  100% {
    opacity: 1;
    transform: rotate(360deg);
  }
}

.showContainer {
  display: flex;
  flex-direction: column;
  align-items: center;

  .tagList {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    font-size: 14px;
    transition: all .3s linear;
    background-color: var(--active-background-color);
    animation: initShow 0.8s cubic-bezier(0.2, 0.9, 1, 1);
    animation-delay: 200ms;
    opacity: 0;
    animation-fill-mode: forwards;
    text-align: center;
    z-index: 2;

    //-webkit-touch-callout: none;
    ///* iOS Safari */
    //-webkit-user-select: none;
    ///* Chrome/Safari/Opera */
    //-khtml-user-select: none;
    ///* Konqueror */
    //-moz-user-select: none;
    ///* Firefox */
    //-ms-user-select: none;
    ///* Internet Explorer/Edge */
    //user-select: none;

    .tvProgram {
      display: flex;
      cursor: pointer;
      flex-direction: column;
      max-width: 340px;
      margin: 0 30px;
      width: 44%;
      position: relative;
      animation: initShow 0.8s cubic-bezier(0.2, 0.9, 1, 1);
      animation-delay: 400ms;
      opacity: 0;
      animation-fill-mode: forwards;
      color: var(--light-color);

      .tvProgramBox {
        outline: none;
        height: 36px;
        line-height: 36px;
        text-indent: 10px;
        transition: all .2s;
        background-color: var(--active-background-color);
        border-radius: 2px;

        &:hover ~ .tvProgramSelectOption {
          display: block;
        }
      }

      .tvProgramSelectOption {
        display: none;
        position: absolute;
        top: 36px;
        left: 0;
        width: 100%;
        max-width: 340px;
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        animation: initShow 0.1s cubic-bezier(0.2, 0.9, 1, 1);

        .tvProgramSelectValue {
          display: block;
          text-indent: 10px;
          height: 36px;
          max-width: 340px;
          //background-color: var(--active-background-color);
          background-color: var(--column-nav-background-color);
          transition: all .1s;

          &:hover {
            background-color: var(--column-nav-background-color-hover);
            color: var(--light-color);
          }
        }

        &:hover {
          display: block;
        }
      }
    }

  }

  .infoShow {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    animation: initShow 0.8s cubic-bezier(0.2, 0.9, 1, 1);
    animation-delay: 600ms;
    opacity: 0;
    animation-fill-mode: forwards;
  }
}

.showContainer {
  .videoListArea {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;

    .item {
      display: inline-flex;
      flex-direction: column;
      margin: 10px 3px;
      border-radius: 4px;
      width: 220px;
      height: 168px;
      box-shadow: 0 0.005rem 0.325rem -0.0875rem var(--active-background-color);
      transition: all .2s;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0.005rem 0.425rem 0.175rem var(--active-background-color);
      }

      .coverImage {
        display: block;
        width: 216px;
        height: 122px;
        margin: 0 auto;
        background-size: cover;
      }

      .info {
        text-align: center;
        padding: 4px 4px 0;
        display: flex;
        flex: 1;

        .title {
          flex: 1;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          text-justify: inter-ideograph;
          -webkit-box-orient: vertical;
          text-align: left;
          font-size: 14px;
          color: var(--light-color);
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .showContainer {
    .tagList {
      .tvProgram {
        margin: 0 10px;
      }
    }

    .videoListArea {
      .item {
        margin: 12px 2px;
        border-radius: 4px;
        width: 48%;
        height: auto;

        .coverImage {
          display: block;
          width: 100%;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
