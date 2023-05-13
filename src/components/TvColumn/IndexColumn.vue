<template>
  <div>
    <div class="tvColumnContainer">
      <div class="columnContainer" v-show="show">
        <router-link tag="div" to="/tvColumn/index/gd" class="columnBox gdColumn">
          <div class="imgBox"><img
            src="https://picsum.photos/720/480?random=1"
            alt=""></div>
          <div class="title"><span>广东 - 荔枝网</span></div>
        </router-link>
        <router-link tag="div" to="/tvColumn/index/sz" class="columnBox szColumn">
          <div class="imgBox"><img
            src="https://picsum.photos/720/480?random=2"
            alt=""></div>
          <div class="title"><span>深圳 - 壹深圳</span></div>
        </router-link>
        <router-link tag="div" to="/tvColumn/index/gz" class="columnBox gzColumn">
          <div class="imgBox"><img
            src="https://picsum.photos/720/480?random=3"
            alt=""></div>
          <div class="title"><span>广州 - 花城咖</span></div>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexColumn',
  data () {
    return {
      show: true,
      goTvColumn: ''
    }
  },
  methods: {
    leave (el, done) {
      const sequence = [0, 1, 2] // 顺序
      sequence.splice(sequence.indexOf(this.goTvColumn), 1)
      sequence.unshift(this.goTvColumn)
      console.log(sequence)
      sequence.forEach((item, index) => {
        setTimeout(() => {
          el.children[item].classList.add('leaveCon')
        }, index * 200)
      })
      setTimeout(() => {
        done()
      }, 1600)
    }
  }
  // beforeRouteLeave (to, from, next) {
  //   // const fullPath = to
  //   // console.log(fullPath)
  //   // const listNumber = {
  //   //   gd: 0,
  //   //   sz: 1,
  //   //   gz: 2
  //   // }
  //   // this.goTvColumn = listNumber[fullPath[2]]
  //   // this.show = false
  //   // fullPath[1] !== 'tvColumn' ? next() : setTimeout(() => {
  //   //   next()
  //   // }, 1200)
  //   next()
  // }
}
</script>

<style lang='less' scoped>

.columnContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  padding-bottom: 60px;
  overflow: hidden;

  .columnBox {
    width: 300px;
    height: 500px;
    margin: 20px 20px 0;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
    background-color: var(--clock-background-color);
    border: 1px solid rgba(0, 0, 0, 0);
    transition: all .5s;
    animation: initShow 0.6s cubic-bezier(.07, .35, .17, 1.1);
    animation-fill-mode: forwards;

    &:nth-child(1) {
      animation-delay: 0.1s;
      z-index: 1;
    }

    &:nth-child(2) {
      animation-delay: 0.2s;
      z-index: 2;
    }

    &:nth-child(3) {
      animation-delay: 0.3s;
      z-index: 3;
    }

    .imgBox {
      width: 100%;
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        transition: all 1s cubic-bezier(.08, .3, .47, .59);
      }
    }

    .title {
      text-align: center;
      font-size: 26px;
      margin: 90px 0;
      color: var(--light-color);
    }

    &:hover {
      border: 1px solid var(--color);

      .imgBox {
        img {
          transform: scale(1.03);
        }
      }
    }
  }
}

.leaveCon {
  animation: leave 0.4s cubic-bezier(.08, .3, .47, .59) !important;
}

@keyframes leave {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    //opacity: 0.8;
    transform: translateY(-4%);
  }
  100% {
    opacity: 0;
    transform: translateY(25%);
  }
}

@media screen and (max-width: 1110px) {
  .columnContainer {
    margin-top: 10px;
    padding-bottom: 60px;

    .columnBox {
      margin: 20px 40px 0;
    }
  }
}

</style>
