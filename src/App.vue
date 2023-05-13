<template>
  <div id="app" ref="appRef">
    <div class="divBG" ref="shadeRef" @click="changeMenuHide('hide')"></div>
    <div class="sideBars" ref="sideBarsRef">
      <div class="sideLogo">
        <div class="logoIcon">不干了 （╯'-')╯⌒┻━┻</div>
        <div class="menuShow" @click="changeMenuHide('hide')">
          <i class="iconfont icon-caidanshouqi"></i>
        </div>
      </div>
      <div class="timeComponentGroup">
        <div class="timeComponent">
          <div class="timeInfo">周{{ '日一二三四五六'.charAt(new Date().getDay()) }}，{{ dateClock | formaDate('time') }}</div>
          <div class="dateInfo">
            <p class="dateMonth">{{ dateClock.getMonth() + 1 }}月</p>
            <p class="dateDay">{{ dateClock.getDate() }}日</p>
            <p class="dateYear">{{ dateClock.getFullYear() }}</p>
          </div>
        </div>
      </div>
      <div class="selectMenu">
        <div class="userListSub"><span>用户中心</span></div>
        <div class="workerListItem rippleArea">
          <router-link class="nav_item" to="/" exact>
            <i class="iconfont icon-shouye"></i>首页
          </router-link>
        </div>
        <div class="workerListItem rippleArea">
          <router-link class="nav_item" to="/search">
            <i class="iconfont icon-sousuo3"></i>搜索
          </router-link>
        </div>
        <div class="workerListItem rippleArea hideExpand" @click="hideSecondMenu">
          <div class="nav_item">
            <i class="iconfont icon-24gl-play"></i>
            <span>直播</span>
            <svg viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg>
          </div>
        </div>
        <div class="secondMenu hide">
          <div class="workerListItem rippleArea">
            <router-link class="nav_item" to="/live/gd">
              <i class="iconfont icon-shouye"></i>广东台
            </router-link>
          </div>
          <div class="workerListItem rippleArea">
            <router-link class="nav_item" to="/live/sz">
              <i class="iconfont icon-shouye"></i>深圳台
            </router-link>
          </div>
          <div class="workerListItem rippleArea">
            <router-link class="nav_item" to="/live/gz">
              <i class="iconfont icon-shouye"></i>广州台
            </router-link>
          </div>
        </div>
        <div class="workerListItem rippleArea">
          <router-link class="nav_item" to="/tvColumn/index">
            <i class="iconfont icon-column"></i>栏目
          </router-link>
        </div>
        <div class="workerListItem rippleArea">
          <router-link class="nav_item" to="/play">
            <i class="iconfont icon-replay1"></i>回放
          </router-link>
        </div>
      </div>
    </div>
    <header class="nav">
      <div class="navListItem ">
        <div class="menuShow" @click="changeMenuHide('show')">
          <div class="rippleArea">
            <i class="iconfont icon-caidanzhankai"></i>
          </div>
        </div>
      </div>
      <!--      <div class="chooseTheme">-->
      <!--
       <div class="weatherInset">-->
      <!--          <input type="checkbox" id="theme" @click="chooseTheme" :checked="theme">-->
      <!--          <label for="theme">-->
      <!--            <img src="./assets/img/sun.png">-->
      <!--            <img src="./assets/img/moon.png">-->
      <!--          </label>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="infoShowArea">
        <router-view />
      </div>
    </header>
  </div>
</template>

<script>
// import router from './router'

export default {
  name: 'App',
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      // 这里能够跟踪路径的变化
      // console.log(document.body.clientWidth)
      if (document.body.clientWidth < 1110) {
        this.changeMenuHide('hide')
      }
      // 最后通过钩子继续页面的跳转
      next()
    })
    // const navListItem = document.querySelectorAll('.nav .navListItem')[0]
    // var scrollFunc = function (e) {
    //   e = e || window.event
    //   // 先判断浏览器IE，谷歌滑轮事件
    //   if (e.wheelDelta) {
    //     if (e.wheelDelta > 0) {
    //       navListItem.classList.remove('hideNavListItem')
    //     }
    //     if (e.wheelDelta < 0) {
    //       navListItem.classList.add('hideNavListItem')
    //     }
    //     // Firefox滑轮事件
    //   } else if (e.detail) {
    //     if (e.detail > 0) {
    //       console.log('滑轮向上滚动')
    //     }
    //     if (e.detail < 0) {
    //       console.log('滑轮向下滚动')
    //     }
    //   }
    // }
    //
    // if (document.addEventListener) {
    //   document.addEventListener('DOMMouseScroll', scrollFunc, false)
    // }
    // window.onmousewheel = document.onmousewheel = scrollFunc
    // 判断主题模式
    // const theme = localStorage.getItem('theme')
    // if (theme === 'light' || undefined) {
    //   localStorage.setItem('theme', 'light')
    //   this.$refs.appRef.classList.remove('dark')
    // } else {
    //   this.theme = true
    //   localStorage.setItem('theme', 'dark')
    //   this.$refs.appRef.classList.add('dark')
    // }
    const theme = window.localStorage.getItem('menuStatus')
    this.changeMenuHide(theme)
    this.timeId = setInterval(() => {
      this.dateClock = new Date()
    }, 1000)
    const btnList = document.querySelectorAll('.rippleArea')
    btnList.forEach(item => {
      item.addEventListener('click', (e) => {
        const offsetLeft = e.target.offsetParent.offsetLeft
        const offsetTop = e.target.offsetParent.offsetTop
        const x = e.clientX - offsetLeft
        const y = e.clientY - offsetTop
        const ripper = document.createElement('span')
        ripper.classList.add('ripple')
        ripper.style.left = x + 'px'
        ripper.style.top = y + 'px'
        // console.log(x, y)
        item.appendChild(ripper)
        setTimeout(() => {
          ripper.remove()
        }, 700)
      })
    })
  },
  data () {
    return {
      theme: false,
      dateClock: new Date()
    }
  },
  filters: {
    // 设置一个函数来进行过滤时间
    formaDate: function (value, type) {
      const padaDate = function (value) {
        return value < 10 ? '0' + value : value
      }
      const year = value.getFullYear()
      const month = padaDate(value.getMonth() + 1)
      const day = padaDate(value.getDate())
      const hours = padaDate(value.getHours())
      const minutes = padaDate(value.getMinutes())
      const seconds = padaDate(value.getSeconds())
      switch (type) {
        case 'time':
          return hours + '时' + minutes + '分' + seconds + '秒'
        case 'year':
          return year
        case 'month':
          return month
        case 'day':
          return day
        default:
          return year + '年' + month + '月' + day + '日' + hours + '时' + minutes + '分' + seconds + '秒'
      }
    }
  },
  methods: {
    chooseTheme () {
      const classLists = this.$refs.appRef.classList
      if (classLists.contains('dark')) {
        classLists.remove('dark')
        localStorage.setItem('theme', 'light')
      } else {
        classLists.add('dark')
        localStorage.setItem('theme', 'dark')
      }
    },
    hideSecondMenu (e) {
      e.currentTarget.nextElementSibling.classList.toggle('hide')
      e.currentTarget.classList.toggle('hideExpand')
    },
    changeMenuHide (status) {
      const classList = this.$refs.sideBarsRef.classList
      if (status === 'show') {
        this.$refs.shadeRef.style.visibility = 'visible'
        this.$refs.shadeRef.style.opacity = '1'
        classList.remove('hide')
        classList.add('show')
        window.localStorage.setItem('menuStatus', 'show')
      } else {
        this.$refs.shadeRef.style.visibility = 'hidden'
        this.$refs.shadeRef.style.opacity = '0'
        classList.add('hide')
        classList.remove('show')
        window.localStorage.setItem('menuStatus', 'hide')
      }
    }
  },
  beforeRouteEnter () {
    console.log(1)
  },
  beforeDestroy: function () {
    // 实例销毁前青出于定时器
    if (this.timeId) {
      clearInterval(this.timeId)
    }
  }
}
</script>

<style lang="less">

#app {
  background-color: var(--backgounrd-color);
  display: flex;
  height: 100vh;
  width: 100%;
  color: var(--color);

  svg {
    fill: var(--color);
  }
}

.sideBars {
  width: 280px;
  height: 100%;
  background-color: var(--dark-sideBar-background-color);
  overflow-y: overlay;
  overflow-x: hidden;
  z-index: 5;
  transition: all 0.225s;
  -webkit-box-shadow: 7px 0px 16px -12px rgba(13, 11, 13, 0.65);
  -moz-box-shadow: 7px 0px 16px -12px rgba(13, 11, 13, 0.65);
  box-shadow: 7px 0px 16px -12px rgba(13, 11, 13, 0.65);

  &.hide {
    margin-left: -280px;
  }

  .sideLogo {
    position: relative;
    display: flex;
    align-items: center;
    height: 64px;
    background-color: var(--light-sideBar-background-color);

    .logoIcon {
      position: absolute;
      width: 200px;
      left: 20px;
    }

    .menuShow {
      position: relative;
      margin-left: auto;
      margin-right: 10px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s;
      text-indent: 12px;

      .ripple {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        animation: showRipple .7s ease-out;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background-color: var(--hover-background-color);
      }
    }
  }

  // 时钟样式
  .timeComponentGroup {
    padding: 10px 14px 24px 14px;
    background-color: var(--light-sideBar-background-color);

    .timeComponent {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      border-radius: 20px;
      height: 200px;
      background-color: var(--clock-background-color);
      color: var(--light-color);

      .timeInfo {
        height: 40px;
        line-height: 40px;
        margin-left: 16px;
      }

      .dateInfo {
        margin-top: 10px;
        text-align: center;

        .dateYear {
          font-size: 18px;
          line-height: 40px;
        }

        .dateDay {
          height: 60px;
          line-height: 60px;
          font-size: 36px;
          font-weight: 700;
        }

        .dateMonth {
          font-size: 20px;
        }
      }
    }
  }

  // 选择栏样式
  .selectMenu {
    text-indent: 6px;
    padding: 28px 18px 18px 16px;
    cursor: default;

    .userListSub {
      text-indent: 16px;
      margin-bottom: 10px;

      span {
        font-size: 12px;
        font-weight: 600;
      }
    }

    .workerListItem {
      position: relative;
      margin-top: 6px;
      height: 40px;
      line-height: 40px;
      font-family: Poppins, Roboto, "Helvetica", Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border-radius: 5px;
      text-indent: 16px;
      overflow: hidden;
      transition: all 0.2s;

      .ripple {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        animation: showRipple .7s ease-out;
        transform: translate(-50%, -50%);
      }

      .nav_item {
        display: block;
        color: var(--light-color);
        width: 100%;
        height: 100%;
      }

      .iconfont {
        margin-right: 10px;
        vertical-align: -1px;
      }

      &:hover {
        background-color: var(--hover-background-color);
        color: var(--light-color);

        svg {
          fill: var(--light-color);
        }

        .nav_item {
          color: var(--light-color) !important;
        }
      }

      svg {
        position: absolute;
        right: 14px;
        top: 10px;
        width: 20px;
        transform: rotateZ(180deg);
      }

      &.hideExpand {
        svg {
          transform: rotateZ(360deg);
        }
      }
    }

    .secondMenu {
      transition: all .5s;
      overflow: hidden;
      height: 138px;

      .workerListItem {
        width: 100%;

        .nav_item {
          text-indent: 30px;
        }
      }

      &.hide {
        height: 0;
      }
    }
  }

  .router-link-active {
    background-color: var(--active-background-color);
    color: var(--light-color);

    svg {
      fill: var(--light-color);
    }

    .nav_item {
      color: var(--light-color) !important;
    }
  }

}

.nav {
  .navListItem.hideNavListItem {
    transform: translateY(-100%);
  }
}

.nav {
  display: flex;
  flex: 1;

  .navListItem {
    position: fixed;
    display: flex;
    align-items: center;
    background-color: var(--nav-background-color);
    width: 100%;
    height: 64px;
    line-height: 64px;
    z-index: 5;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);
    transition: translateY .5s;

    .icon {
      .logo {
        font-size: 40px;
      }
    }

    .menuShow {
      position: relative;
      width: 40px;
      height: 40px;
      left: 30px;
      line-height: 40px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s;
      text-indent: 12px;
      display: none;

      .ripple {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        animation: showRipple .7s ease-out;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background-color: var(--hover-background-color);
      }
    }
  }

  .infoShowArea {
    padding-top: 64px;
    flex: 1;
    //height: 100%;
    //overflow-y: auto;
    //height: calc(100% - 64px);
    overflow-y: scroll;
    scrollbar-color: #535353;
    scrollbar-width: thin;
  }

}

.hide ~ .nav .navListItem .menuShow {
  display: block;
}

@keyframes showRipple {
  0% {
    opacity: 0.4;
    width: 0;
    height: 0;
  }
  100% {
    opacity: 0;
    width: 600px;
    height: 600px;
  }
}

@media screen and (max-width: 1110px) {
  .sideBars {
    position: fixed;
    z-index: 20;
    transition: all 0.4s;

    &.hide {
      transform: translateX(-280px);
      visibility: hidden;
    }

    &.show {
      transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    }

  }

  .divBG {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    background-color: #9c9898;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
}

@media screen and (max-width: 580px) {
  .nav {
    .navListItem {
      height: 48px;
    }

    .infoShowArea {
      padding-top: 48px;
    }
  }
}

</style>
