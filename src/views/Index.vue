<template>
  <div>
    <div class="hardTitle">
      <p class="title">Happy New Year</p>
    </div>
    <div class="contentContainer">
      <!--      左边的内容   -->
      <div class="InformationBar">
        <div class="informationItem clearfix">
          <div class="titleHeader"># 壹深圳</div>
          <div class="contentList" refs="contentRef">
            <a class="contentItem" v-for="item in this.articleDataList" :key="item.id" :href="item.h5Url"
               target="_blank" :title="item.introduction">
              <div class="img">
                <img :src="item.logo" alt="">
              </div>
              <div class="title">
                {{ item.title }}
              </div>
            </a>
          </div>
        </div>
      </div>
      <!--      热搜的内容   -->
      <div class="topic">
        <div class="topicContent">
          <div class="hotBot">
            <div class="title">
              <p>微博热搜</p>
              <div class="refresh" @click="updateHotSearchData">
                <i ref="updateIconfont" class="iconfont icon-shuaxin3"></i>
                <p>点击刷新</p>
              </div>
            </div>
            <div class="list" v-if="hotSearchDataList">
              <a class="item" target="_blank"
                 :href="`https://s.weibo.com/weibo?q=%23${hotSearchDataList.hotgov.word.replaceAll('#', '')}%23`">
                <i class="serial iconfont icon-zhiding" style="width: 16px;"></i>
                <p class="content" :title="hotSearchDataList.hotgov.name">{{ hotSearchDataList.hotgov.name }}</p>
                <p class="num">{{ hotSearchDataList.hotgov.num | million }}</p>
                <div class="iconfont"
                     :style="{backgroundColor: hotSearchDataList.hotgov['icon_desc_color'] }">{{ hotSearchDataList.hotgov['icon_desc'] }}
                </div>
              </a>
              <a class="item" v-for="item in hotSearchDataList.realtime" :key="item.realpos" target="_blank"
                 :href="`https://s.weibo.com/weibo?q=%23${item.word}%23`">
                <p class="serial">{{ item.realpos }}</p>
                <p class="content" :title="item.word">{{ item.word }}</p>
                <p class="num">{{ item.num | million }}</p>
                <div class="iconfont" :style="{backgroundColor: item['icon_desc_color'] }">{{ item['label_name'] }}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      hotSearchDataList: null,
      updateLock: false,
      articleDataList: null
    }
  },
  mounted () {
    this.updateHotSearchData()
    this.getArticleList()
    const outDiv = document.querySelectorAll('.contentList')
    // const outDiv = this.$refs.contentRef
    outDiv.forEach(item => {
      item.onwheel = function (event) {
        // 禁止事件默认行为（此处禁止鼠标滚轮行为关联到"屏幕滚动条上下移动"行为）
        event.preventDefault()
        // 设置鼠标滚轮滚动时屏幕滚动条的移动步长
        const step = 120
        if (event.deltaY < 0) {
          // 向上滚动鼠标滚轮，屏幕滚动条左移
          this.scrollLeft -= step
        } else {
          // 向下滚动鼠标滚轮，屏幕滚动条右移
          this.scrollLeft += step
        }
      }
    })
  },
  methods: {
    async getArticleList () {
      const { data } = await this.$http('api/side/getArticleList')
      this.articleDataList = data
    },
    async updateHotSearchData () {
      if (this.updateLock) return false
      this.$refs.updateIconfont.classList.add('update')
      this.updateLock = true
      const { data } = await this.$http('api/side/search')
      this.hotSearchDataList = data
      this.$refs.updateIconfont.classList.remove('update')
      setTimeout(() => {
        this.updateLock = false
      }, 2000)
    }
  },
  filters: {
    million: function (value) { // 过万处理
      let num
      if (value > 9999) { // 大于9999显示x.xx万
        num = (Math.floor(value / 1000) / 10) + '万'
      } else if (value < 9999 && value > -9999) {
        num = value
      } else if (value < -9999) { // 小于-9999显示-x.xx万
        num = -(Math.floor(Math.abs(value) / 1000) / 10) + '万'
      }
      return num
    }
  }
}
</script>

<style lang='less' scoped>
.clearfix:after {
  content: "";
  clear: both;
  display: table;
}

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

  .title {
    font-size: 2rem;
    letter-spacing: 1px;
    animation: initShow 1s cubic-bezier(0, .69, 0, 1.01);
  }
}

.contentContainer {
  display: flex;
}

.contentContainer {
  .InformationBar {
    //position: relative;
    flex: 1;
    padding-right: 8px;
    //max-width: 69%;
    width: 100px;
    overflow: hidden;
    .informationItem {
      //position: absolute;
      //left: 0;
      //top: 0;
      display: flex;
      flex-direction: column;
      background-color: rgba(70, 78, 91, 1);
      margin: 8px 0 8px 8px;
      padding: 5px 10px;
      height: 210px;
      flex: 1;
      .titleHeader {
        display: inline-block;
        height: 30px;
        font-size: 16px;
      }

      .contentList {
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        flex: 1;
        height: 100%;
        scrollbar-width: none;

        .contentItem {
          display: block;
          color: var(--light-color);
          margin-right: 20px;

          .title {
            width: 220px;
            font-size: 14px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .img {
            width: 220px;
            height: 120px;
            overflow: hidden;
            text-align: center;

            img {
              width: 100%;
              min-height: 100%;
            }
          }
        }
      }
    }
  }
}

.contentContainer {
  .topic {
    width: 340px;
    color: var(--light-color);
  }

  .topic .topicContent {
    position: sticky;
    top: 0px;
    width: 100%;
    padding: 8px 8px 8px 0;
  }

  .topic .topicContent .hotBot {
    //background-color: var(--hot-search-background-color);
    background-color: rgba(70, 78, 91, 1);
    padding: 0 16px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    height: 706px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      height: 40px;
      cursor: default;

      .refresh {
        cursor: pointer;

        .iconfont.update {
          display: inline-block;
          animation: updateRotate 0.4s linear infinite;
        }

        p {
          display: inline-block;
          vertical-align: 1px;
          margin-left: 2px;
        }
      }
    }

    .list {
      font-size: 12px;
      height: 300px;
      overflow-y: scroll;
      flex: 1;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        width: 0 !important
      }

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        cursor: default;
        color: var(--light-color);

        .serial {
          min-width: 16px;
          text-align: center;
        }

        .content {
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .num {
          flex: 1;
          margin: 0 10px;
          white-space: nowrap;
        }

        .iconfont {
          text-align: center;
          font-size: 12px;
          width: 20px;
          border-radius: 2px;
          font-weight: 700;
        }
      }
    }
  }
}

@keyframes updateRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 959px) {
  .contentContainer {
    .topic {
      display: none;
    }
  }
}
</style>
