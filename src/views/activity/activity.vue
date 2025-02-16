<template>
  <div class="basic_wrap">
    <div class="nav_box">
    <van-tabs v-model="active" class="van-tabs__wrap--scrollable" :sticky="true" :swipeable="true"
              :swipe-threshold="2" line-width="1.5rem" background="transparent" :color="'#ce61ff'"
              @change="tabChange"
    >
      <van-tab title="Eventos"></van-tab>
      <van-tab title="Convidar" ></van-tab>
      <van-tab title="VIP" ></van-tab>
      <van-tab title="Rebate" ></van-tab>
      
      
    </van-tabs>
  </div>
    <div class="aitwrap">
      <!-- <div class="aitem_l">
        <div class="l_one">
          <img src="../../assets/images/active/02.png" alt="">
          <div>Misto</div>
        </div>
        <div class="l_two">Coletar Tudo</div>
        <div class="l_three">Reg de<br/>Coletas</div>
      </div> -->
      <div class="aitem_r">
        <div class="aitem" @click="$router.push('share')">
          <img src="../../assets/images/banner/4.png" style="width:100%;" alt="">
        </div>
        <div class="aitem" @click="$router.push('vip')">
          <img src="../../assets/images/banner/3.png" style="width:100%;;" alt="">
        </div>
        <div class="aitem" @click="$router.push('betReward')">
          <img src="../../assets/images/banner/1.png" style="width:100%;" alt="">
        </div>
        <div class="aitem" @click="$router.push('rechargeBonus')">
          <img src="../../assets/images/banner/2.png" style="width:100%;" alt="">
        </div>
      </div>
    </div>


    <ftNav ></ftNav>
  </div>
</template>
<script>
import Fetch from '../../utils/fetch';

import Vue from 'vue';
import ftNav from "../../components/footer_nav/footer_nav"
import {Tab, Tabs, Progress, Empty, Dialog, Field} from 'vant';


Vue.use(Tab).use(Tabs).use(Progress).use(Empty).use(Dialog).use(Field);
export default {
  name: "activity",
  components: {
    ftNav
  },
  data() {
    return {
      is_open: false,
      bonus: 0.00,
      activeItem: [],
      group_service: null,
      active: 0,
    }
  },
  created() {
    this.$bus.$emit('send2ftnav', 1);
    
    //this.active_list();
  },
  beforeDestroy(){
    
  },
  mounted() {
    
  },
  methods: {


    tabChange(v){
      this.active=v;
      if(v==1){
        this.$router.push('share');
      }
      if(v==2){
        this.$router.push('vip');
      }
      if(v==3){
        this.$router.push('betReward');
      }
    }
  }
}
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

.btimg {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.aitwrap {
  width: 100%;
  overflow: hidden;
  position: relative;
  max-height: 100vh;
  //height: 100%;
}

.myteam-bg {
  width: 100%;
  height: 3.0rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.aitem_l {
  width: 22%;
  float: left;
  padding: 0.5rem 0 0 2%;
}

.l_one {
  display: block;
  padding: 0.1rem 0;
  background-color: #f9b818;
  color: #000000;
  text-align: center;
  border-radius: .2rem;
  width: 80%;
  margin:0 auto;
}

.l_one img {
  width: .55rem;
  margin-bottom: .1rem;
}

.l_two {
  display: block;
  padding: 0.2rem 0;
  background-color: #999999;
  color: #fff;
  text-align: center;
  border-radius: .1rem;
  font-size: .24rem;
  width: 80%;
  margin:0.2rem auto;
}

.l_three {

  display: block;
  padding: 0.2rem 0;
  background-color: #f9b818;
  color: #000000;
  text-align: center;
  border-radius: .1rem;
  font-size: .24rem;
  width: 80%;
  margin:0.2rem auto;
}

.aitem_r {
  width: 100%;
  height: calc(100vh - 2.3rem);
  float: right;
  overflow-y: scroll;
  overflow-x: hidden;
}

.details {
  text-align: center;
  margin-top: 10px;
  color: #82a504;
  font-size: 16px;
  font-weight: 600;

}

.box-wrap {
  position: relative;
}

.bonus {
  text-align: center;
  font-size: 0.8rem;
  color: gold;
  position: absolute;
  bottom: 10px;
  width: 100%;
  font-weight: 700;
  // left: 41%;
}

.box {
  width: 60%;
  height: auto;
  display: block;
  margin: 20% auto 18px;
}

.open-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  //background-color: rgba(0, 0, 0, 0.5);
  background: #0e4114;
  z-index: 3;
}

.ades {
  margin-top: 10px;
  font-size: 0.37rem;
  color: rgba(255, 255, 255, 0.737);
  line-height: 20px;
  text-indent: 10px;
}

.aname {
  font-size: 0.33rem;
  line-height: 18px;
  color: #88b19f;
}

.aitem {
  width: 100%;
  // height: 3rem;
  position: relative;
  padding-bottom: 0.2rem;
  background-color: @secondary-color;
  box-sizing: border-box;
  padding: .15rem;
  margin-bottom: .2rem;
  border-radius: .2rem;
 
}


.basic_wrap {
  //background-color: #303030;
  min-height: 100vh;
  width: 100%;


}

.daily-gift {
  position: absolute;
  width: 2rem;
  bottom: 55px;
  left: 10px;
  z-index: 2;
  animation: my-btn 0.9s ease-in infinite;
}

.telegram {
  position: absolute;
  width: 1.3rem;
  bottom: 66px;
  right: 20px;
  z-index: 2;
  // background: white;
  // border-radius: 80%;
  // overflow: hidden;
  // animation: my-btn 0.9s ease-in infinite;

}


@keyframes my-btn {
  0% {
    transform: translateX(0 rpx);
    transform: scale(.8);
  }

  50% {
    transform: translateX(20 rpx);
    transform: scale(1);
  }

  100% {
    transform: translateX(0 rpx);
    transform: scale(.8);
  }
}
</style>
