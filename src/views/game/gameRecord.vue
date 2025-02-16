<template>

  <div class="home_wrap">
    <van-nav-bar
      title="Recordes de Apostas"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="nav_box">
    <van-tabs v-model="active"  :swipeable="true"
              @change="changeTab()"
              :swipe-threshold="2" line-width="1.5rem"  background="transparent" :color="'#ce61ff'"

    >
      <van-tab title="PG"></van-tab>
      <van-tab title="PP"></van-tab>
      <van-tab title="JDB"></van-tab>
      <van-tab title="TADA"></van-tab>

    </van-tabs>
  </div>
    <div class="game">
      <table width="100%">
        <tbody>
          <tr class="g_top">
            <td>Jogo</td>
            <td>nome</td>
            <td>aposta</td>
            <td>tempo</td>
            <td>Valor ganho</td>
          </tr>


          <tr v-for="(item,index) in game_record" class="g_row2" v-show="index < max_show" :key="index">
            <td><img :src="item.img"/></td>
            <td>{{item.game_name}}</td>
            <td>{{item.bet_amount}}</td>
            <td class="huang">{{item.win_amount}}</td>
            <td>{{item.createtime}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="show_more" v-show="game_record.length > max_show" @click="max_show += max_show">
       Mostre mais ⇊
    </div>


  </div>
</template>

<script>
import Vue from 'vue';
import {NavBar,Tab, Tabs} from 'vant';
import Fetch from '../../utils/fetch';
Vue.use(NavBar, ).use(Tab).use(Tabs);




export default {
  name: "gameRecord",
  components: {},
  data() {
    return {
      lang: this.$i18n.locale || "zh_cn",
      show_icon_type: 'about',
      data: {},
      active:0,
      game_record:[],
      max_show:10,
    };
  },
  created() {

  },
  mounted() {
    this.getRecord("betRecord");
  },
  methods: {
    getRecord(game_type) {
      Fetch('/record/' + game_type).then((r) => {
        this.game_record = r.data;
      });
    },
    changeTab(){
      this.game_record = [];
      this.max_show = 10;
      let gameType = "betRecord";
      if(this.active == 0){
        gameType = "betRecord";
      }
      if(this.active == 1){
        gameType = "betPPRecord";
      }
      if(this.active == 2){
        gameType = "betJDBRecord";
      }
      if(this.active == 3){
        gameType = "betTadaRecord";
      }
      this.getRecord(gameType);
    },
    onClickLeft() {
      this.$router.push("/");
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
.nav_box {
  // width: 95%;
  background-color: @secondary-color;
  // margin: 0 auto 0.2rem auto;
}
/deep/ .van-tabs__wrap--scrollable {
  /* 自定义样式 */
  color: @anttextcolor;
  background: transparent;
  border-width: 1.5rem;
}

/deep/ .van-tabs__wrap--scrollable .van-tab {
  color: @textcolorf;
}

/deep/ .van-tabs__wrap--scrollable .van-tab--active {
  color: @anttextcolor;
}
/deep/ .van-tab {
  width: 2.3rem;
  border-bottom: 1px solid @bodercolor;
}
.show_more {
  color: #fff;
  width: 95%;
  margin: 0.3rem auto;
  border-radius: 0.2rem;
  text-align: center;
  font-size: 0.35rem;
}
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
  //background-color: rgb(48, 48, 48);
  padding-bottom: 1.8rem;
}

.game table {
  width: 95%;
  margin: 0 auto;
  text-align: center;
  //padding-top: 0.4rem;
  tr {
    border-radius: .2rem;
  }

  .g_top {
    border: 1px solid #e5e5e5;
    height: 1.3rem;
    color: #fff;
  }

  .g_row1 {
    height: 1.3rem;
    color: #fff;
  }

  .g_row2 {
    height: 1.3rem;
    color: #fff;
    background-color: @secondary-color;
    font-size: 0.31rem;
  }

  img {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
  }

  .huang {
    color: gold;
  }
}
</style>
