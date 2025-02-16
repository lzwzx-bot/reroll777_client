<template>

  <div class="home_wrap">

    <van-nav-bar
        title="Suporte"
        left-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
    <div class="kefuym">
      <ul>
        <li v-for="(item,idx) in support_list" :key="idx">
          <div class="kefuym_tx"><img :src="item.image" alt=""></div>
          <div class="kefuym_txt">
            <h2>{{item.name}}</h2>
            <div v-html="item.content"></div>
            <a :href="item.url" target="_blank">Contate agora</a>
          </div>
          <div class="clear"></div>
        </li>
      </ul>
    </div>

    <ft />
    <ftNav :active="3"></ftNav>
  </div>
</template>

<script>
import Vue from 'vue';
import {NavBar} from 'vant';
import Fetch from '../../utils/fetch';
import ftNav from "../../components/footer_nav/footer_nav"
import Ft from '../../components/ft.vue';

Vue.use(NavBar);
export default {
  name: "support",
  components: {
    ftNav,
    Ft
  },
  data() {
    return {
      support_list: [],
    };
  },
  created() {
      this.$bus.$emit('send2ftnav', 3);
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch('/index/getCostservice').then((r) => {
        this.support_list = r.data;
      });
    },
    onClickLeft(){
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
/deep/ .van-nav-bar {
  background: @secondary-color;
}

/deep/ .van-nav-bar .van-icon {
  color: #fff;
}

/deep/ .van-nav-bar__title {
  color: #fff;
}

.home_wrap {
  width: 100%;
  min-height: 100vh;
  //background-color: rgba(0, 0, 0,0.5);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.kefuym {

}

.kefuym li {
  width: 95%;
  box-sizing: border-box;
  margin: 0 auto .2rem auto;
  border-radius: .2rem;
  background-color: @secondary-color;
  padding: .3rem;

  .kefuym_tx {
    width: 13%;
    float: left;

    img {
      width: 100%;
      border-radius: 50%;
      margin-top: .1rem;
    }
  }

  .kefuym_txt {
    width: 84%;
    float: right;

    h2 {
      color: #fff;
      font-size: .38rem;
      font-weight: normal;
      margin: .1rem 0;
    }

    p {
      color: #777;
      font-size: .3rem;
      line-height: .36rem;
    }

    a {
      display: block;
      border: 1px solid @anttextcolor;
      width: 2.4rem;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      color: @anttextcolor;
      border-radius: .2rem;
      margin-top: .2rem;
    }
  }
}

.clear {
  clear: both;
}
</style>
