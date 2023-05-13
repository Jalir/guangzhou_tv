<template>
  <div class="home">
    <div class="hardTitle">
      <div class="titleText">
        <p>搜索中心</p>
      </div>
      <!--      <div class="loading" v-if="completeGetData">-->
      <div class="loader" v-if="completeGetData">
        <div class="sk-wandering-cubes">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
        </div>
        <!--        <div class="rectangle"></div>-->
        <!--        <div class="rectangle"></div>-->
        <!--        <div class="rectangle"></div>-->
        <!--        <div class="rectangle"></div>-->
      </div>
      <!--      <div class="complete">-->
      <!--        <i class="iconfont icon-duigou"></i>-->
      <!--      </div>-->
    </div>
    <Search @changeText="getText" ref="search" />
    <transition-group class="tag-section" name="tag" v-bind:css="false" v-on:before-enter="tagBeforeEnter"
                      v-on:enter="tagEnter" v-on:leave="listLeave">
      <div class="tag-item" @click="selectFilterItem" v-for="(item, index) in hasTvColumnPk" :key="index"
           :data-index="index">
        {{ item }}
      </div>
    </transition-group>
    <div class="list-section">
      <transition-group name="list" v-bind:css="false" v-on:before-enter="listBeforeEnter" v-on:enter="listEnter"
                        v-on:leave="listLeave">
        <div class="infoArea" :key="index" v-for="(item, index) in filterList" :data-index="index">
          <div class="info">
            <div class="tvColumnPk">{{ item.tvColumnPk }}</div>
            <div class="title" v-clipboard:copy="item.title">{{ item.title }}</div>
            <div class="url" v-clipboard:copy="item.h5url">{{ item.h5url }}</div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'Home',
  components: {
    Search
  },
  mounted () {
    this.getDateInit()
  },
  data () {
    return {
      // 请求API返回的总数据
      dataList: [],
      // 备份的数据,
      reserveList: [],
      // 过滤后的数据
      filterList: [],
      // 防止点击过快
      clock: false,
      hasTvColumnPk: [],
      showTvColumnPk: [],
      lastEl: null,
      completeGetData: true
    }
  },
  methods: {
    async getDateInit () {
      this.filterList = []
      const dataList = []
      const urlList = []
      // 广州台的编号和请求的网址
      const gzArr = [1000095, 1000015, 1000097]
      gzArr.forEach(item => {
        urlList.push(this.$http.get('api/gz/list', {
          params: {
            currentId: item,
            currentPage: 1,
            pageSize: 20
          }
        }))
      })
      // 荔枝网的编号和请求的网址
      const liZeeArr = [687, 669, 673, 767, 679, 674, 770, 650, 829, 756, 772, 700, 686]
      liZeeArr.forEach(item => {
        urlList.push(this.$http.get('api/lies/list', { params: { currentId: item } }))
      })
      // 全部请求发送
      await this.$http.all(urlList).then((...arr) => {
        const list = [].concat(...arr[0].map(item => item.data))
        dataList.push(...list)
      })
      this.dataList = dataList
      this.completeGetData = false

      this.getText(this.$refs.search.$refs.originRef.innerText)
    },
    getText (text) {
      if (!text) {
        this.filterList = []
        this.hasTvColumnPk = []
        this.showTvColumnPk = []
        return false
      }
      this.filterList = []
      this.hasTvColumnPk = []
      this.showTvColumnPk = []
      this.value = text.toString()

      let indexLeft, indexRight
      const beginNum = []
      const endNum = []
      while ((indexLeft = text.indexOf('《', indexLeft)) !== -1) {
        indexLeft += 1
        beginNum.push(indexLeft)
      }
      while ((indexRight = text.indexOf('》', indexRight)) !== -1) {
        indexRight += 1
        endNum.push(indexRight - 1)
      }
      const words = [text]
      for (let i = 0; i < beginNum.length; i++) {
        const title = text.slice(beginNum[i], endNum[i])
        const tvColumn = '央视新闻央视新闻1➕1央视朝闻天下G4出动今日关注今日一线新闻联播广州新闻联播广东新闻联播焦点访谈今日最新闻DV现场广视新闻城市特搜珠江新闻今日焦点直播广东'
        if (tvColumn.indexOf(title) === -1) {
          words.push(title)
        }
      }
      const set = new Set(words)
      const hasTvColumnPk = new Set()
      hasTvColumnPk.add('全部')
      const reg = /[\\：|:|“|”| |>|<|《|》|?|"|.|！|!|？|]/g
      this.dataList.forEach(info => {
        set.forEach(item => {
          const infoTitleFilter = info.title.replace(reg, '')
          const itemFilter = item.replace(reg, '')
          if (infoTitleFilter.indexOf(itemFilter) !== -1) {
            console.log(info)
            this.filterList.push(info)
            hasTvColumnPk.add(info.tvColumnPk)
          }
        })
      })
      if (hasTvColumnPk.size === 1) {
        hasTvColumnPk.clear()
        hasTvColumnPk.add('搜索结果为空')
      }
      this.hasTvColumnPk = hasTvColumnPk
      // 备份数据
      this.reserveList = this.filterList
    },
    selectFilterItem (e) {
      this.lastEl && this.lastEl.target.classList.toggle('click')
      e.target.classList.toggle('click')
      this.lastEl = e
      const elText = e.target.innerText
      this.filterList = [].concat(this.reserveList.filter(item => item.tvColumnPk === elText))
      if (e.target.innerText === '全部') {
        this.filterList = this.reserveList
      }
    },
    listBeforeEnter (el) {
      el.style.opacity = '0'
    },
    listEnter (el, done) {
      const delay = (el.dataset.index + 1) * 10
      setTimeout(() => {
        el.style.opacity = 1
        el.classList.add('fadeUp')
        el.style['animation-iteration-count'] = 1
        done()
      }, delay)
    },
    listLeave (el, done) {
      el.style.opacity = '0'
      const delay = 150
      setTimeout(() => {
        done()
      }, delay)
    },
    tagBeforeEnter (el) {
      el.style.opacity = '0'
    },
    tagEnter (el, done) {
      const delay = (el.dataset.index + 1) * 2
      setTimeout(() => {
        el.style.opacity = '1'
        el.classList.add('fadeLeft')
        el.style['animation-iteration-count'] = 1
        done()
      }, delay)
    }
  }
}
</script>

<style scoped lang="less">
.hardTitle {
  display: flex;
  align-items: center;
  background-color: var(--title-background-color);
  width: 100%;
  font-size: 40px;
  text-indent: 40px;
  height: 140px;
  color: var(--light-color);
  letter-spacing: 4px;

  .titleText {
    font-size: 2rem;
    letter-spacing: 3px;
    margin-right: 40px;
    animation: initShow 0.8s cubic-bezier(0, .69, 0, 1.01);
    transition: all 0.5s;
  }

  //.complete {
  //  animation: completeShow 4s;
  //  animation-fill-mode: forwards;
  //  overflow: hidden;
  //  transform-origin: center;
  //  text-indent: 0;
  //  text-align: center;
  //  transition: opacity 0.5s;
  //
  //  i {
  //    font-size: 32px;
  //  }
  //}

}

@keyframes loading {
  0% {
    height: 1px;
  }
  50% {
    height: 20px;
  }
  100% {
    height: 1px;
  }
}

@keyframes completeShow {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.tag-section {
  margin: 30px auto 60px auto;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
  align-content: center;
  width: 100%;
  max-width: 760px;
  border-radius: 5px;

  .tag-item {
    margin: 10px 5px;
    padding: 0 8px;
    color: var(--color);
    font-size: 14px;
    border-radius: 5px;
    height: 30px;
    max-width: 110px;
    text-align: center;
    line-height: 30px;
    transition: all .5s;
    cursor: pointer;
    border: 1px solid rgba(80, 80, 80, 0);
    cursor: pointer;

    &:hover, &:active, &:focus {
      color: var(--light-color);
      border-radius: 0;
      border-bottom: 1px solid rgba(189, 176, 176, 0.8);
    }
  }

  .tag-item.click {
    color: var(--light-color);
    border-radius: 0;
    border-bottom: 1px solid rgba(189, 176, 176, 0.8);
  }

}

.list-section {
  padding-bottom: 10px;
  background-color: var(--backgounrd-color);

  &:last-child:after {
    content: '';
    display: block;
    overflow: hidden;
  }
}

.infoArea {
  margin: 40px auto;
  width: 80%;
  max-width: 580px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.005rem 0.325rem -0.0875rem var(--box-shadow-color);
  -webkit-animation-fill-mode: forwards;
  transition: all .2s ease-in-out;
  border-radius: 4px;
  color: var(--color);
  transition: all .2s;
  box-shadow: 0 0.015rem 0.425rem -0.0875rem rgb(80, 78, 78);

  &:hover {
    box-shadow: 0 0.015rem 0.425rem -0.0875rem rgba(255, 249, 249, 1);
  }

  .info {
    width: 100%;
    height: 100%;
    position: relative;
    line-height: 200%;

    .tvColumnPk {
      position: absolute;
      padding: 0 8px;
      text-align: center;
      top: -33px;
      left: 0px;
      font-size: 14px;
      line-height: 200%;
      border-radius: 3px;
      border: 1px solid var(--border-color);
      background-color: #ffffff;
      color: black;
    }

    .title {
      width: 100%;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }

    .url {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      word-break: break-all;
    }
  }
}

.fadeUp {
  animation: moveUp 0.4s linear;
}

.fadeLeft {
  animation: moveLeft 0.2s linear;
}

@keyframes moveUp {
  0% {
    opacity: 0.2;
    transform: translateY(12px);
  }
  50% {
    opacity: 0.9;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes moveLeft {
  0% {
    opacity: 0.2;
    transform: translateX(12px);
  }
  50% {
    opacity: 0.9;
    transform: translateX(4px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.vbox {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 435px;
  height: 435px;
}

.sk-wandering-cubes {
  margin: 15px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.sk-wandering-cubes .sk-cube {
  background-color: #fff;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: sk-wanderingCube 1.8s ease-in-out -1.8s infinite both;
  animation: sk-wanderingCube 1.8s ease-in-out -1.8s infinite both;
}

.sk-wandering-cubes .sk-cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-wanderingCube {
  0% {
    opacity: 0.5;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  25% {
    -webkit-transform: translateX(30px) rotate(-90deg) scale(0.5);
    transform: translateX(30px) rotate(-90deg) scale(0.5);
  }
  50% {
    opacity: 1;
    /* Hack to make FF rotate in the right direction */
    -webkit-transform: translateX(30px) translateY(30px) rotate(-179deg);
    transform: translateX(30px) translateY(30px) rotate(-179deg);
  }
  50.1% {
    -webkit-transform: translateX(30px) translateY(30px) rotate(-180deg);
    transform: translateX(30px) translateY(30px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0) translateY(30px) rotate(-270deg) scale(0.5);
    transform: translateX(0) translateY(30px) rotate(-270deg) scale(0.5);
  }
  100% {
    opacity: 0.5;
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@keyframes sk-wanderingCube {
  0% {
    opacity: 0.5;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  25% {
    -webkit-transform: translateX(30px) rotate(-90deg) scale(0.5);
    transform: translateX(30px) rotate(-90deg) scale(0.5);
  }
  50% {
    opacity: 1;
    /* Hack to make FF rotate in the right direction */
    -webkit-transform: translateX(30px) translateY(30px) rotate(-179deg);
    transform: translateX(30px) translateY(30px) rotate(-179deg);
  }
  50.1% {
    -webkit-transform: translateX(30px) translateY(30px) rotate(-180deg);
    transform: translateX(30px) translateY(30px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0) translateY(30px) rotate(-270deg) scale(0.5);
    transform: translateX(0) translateY(30px) rotate(-270deg) scale(0.5);
  }
  100% {
    opacity: 0.5;
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
