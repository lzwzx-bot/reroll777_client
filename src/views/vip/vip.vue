<template>
  <div class="home_wrap">


    <van-nav-bar
        title="VIP"
        left-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />

    <div class="vip_top">
      <div class="top_l">
        <div class="jiao">Nível Atual</div>
        <div class="vip_xx">
          <div class="vip_tb">
            <div class="cv">VIP{{vip.vip_info.level}}</div>
          </div>
          <div class="vip_txt">
            <div>Para o próximo nível <span>VIP{{vip.vip_info.next_level}}</span></div>
            <div>Aposta válida ainda é necessária </div>
            <div class="vip_je"> {{vip.vip_info.need_bet}}</div>
          </div>
        </div>
      </div>
      <div class="top_r">
        <div class="an_hui">Goletar<br/>Tudo</div>
        <div class="an_huang">Reg de<br/>Coletas</div>
      </div>

    </div>
    <div class="vip_con">
      <table width="100%">
        <tbody>
        <tr class="g_top">
          <td>Nível</td>
          <td class="top_apo">Aposta necessária</td>
          <td>Bônus</td>
          <td>Reivindicar Bônus</td>
        </tr>


        <tr v-for="(item,index) in vip.vip_list" :key="index" class="g_row0" :class="item.is_achieved?'active':''">
          <td>VIP{{item.level}}</td>
          <td>{{item.bet_amount}}</td>
          <td class="huang">R${{item.level_reward}}</td>
          <td >
            <button v-if="item.is_get == 1" @click="getVipMoney(item.bet_amount)" class="get_money">Receber</button>
            <button v-if="item.is_get == 0"  class="descomprometido">descomprometido</button>
            <button v-if="item.is_get == 2"  class="descomprometido">Recebido</button>
          </td>
        </tr>


        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {NavBar} from 'vant';
import Fetch from '../../utils/fetch';
Vue.use(NavBar);
export default {
  name: "vip",
  data() {
    return {
      next_level:0,
      vip: {
        vip_info:{next_level:0},
        vip_list:[],
      },
    };
  },
  components:{

  },
  created() {

  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch('/user/vip_config_list').then((r) => {
        this.vip = r.data;
        this.next_level = r.data.vip_info.next_level;
      });
    },
    getVipMoney(bet_amount){
      Fetch('/user/addVipBetReward',{bet_amount}).then((r) => {
        if(r.code == 1){
          this.$notify.success({
            title:r.msg
          });
          setTimeout(()=>{
            this.$router.go(0)
          },1000)
        }else{
          this.$notify.error({
            title:r.msg
          });
        }
      });
    },
    onClickLeft(){
      this.$router.push("/activity");
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
.cv{
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.5rem;
  margin-top: -0.5rem;
  //background: #fc661e;
  border-radius: 50%;
  color: #fff;
}
.get_money
{
  background-color: #fc661e;
  border:none;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
}
.descomprometido{
  border:none;
  padding: 0.1rem 0.2rem;
  border-radius: 0.1rem;
  background: none;
}

.home_wrap {
  width: 100%;
  min-height: 100vh;
  //background-color: rgb(48, 48, 48);
  padding-top: 1.5rem;
  padding-bottom:1.5rem ;
}
.vip_top{
  width: 95%;
  display: flex;
  border-radius: .2rem;
  margin: .2rem auto 0 auto;
  background-color: @secondary-color;
  .top_l{
    width: 80%;
    .jiao{
      width: 1.4rem;
      height: .4rem;
      line-height: .4rem;
      font-size: .24rem;
      text-align: center;
      border-radius: .05rem .05rem .05rem 0;
      background: @anttextcolor;
    color:@primary-color;
    }
    .vip_xx{
      display: flex; 
      color: #fff;
      margin: .2rem;
      .vip_tb{
        position: relative;
        width: 1.2rem;
        img{
          width: 100%;
        }
      }
      .vip_txt{
        margin-left: 2%;
        p{
          line-height: .38rem;
        }
        span{
          color: #fee000;
          font-style: italic;
        }
        .vip_je{
          color: #fff;
          font-size: .35rem;
        }
      }
    }
  }
  .top_r{
    width: 17%;
    font-size: .28rem;
    text-align: center;
    margin: .2rem .2rem 0 0;
    .an_hui{
      width: 100%;
      color: #fff;
      background-color: #999;
      height: .7rem;
      border-radius: .14rem;
      padding-top: .1rem;
    }
    .an_huang{
      width: 100%;
      background: @anttextcolor;
    color:@primary-color;
      height: .7rem;
      border-radius: .14rem;
      padding-top: .06rem;
      margin-top: .2rem;
    }
  }
}
.vip_con table{
  width: 95%;
  margin: .6rem auto 0 auto;
  text-align: center;
  th{
    border-radius: .2rem;
  }
  .g_top{
    //border: 1px solid #293548;
    color: #fff;
    .top_apo{
      display: flex;
      text-align: center;
      justify-content: center;
      a{
        display: block;
        width: .3rem;
        height: .3rem;
        line-height: .3rem;
        border-radius: 50%;
        color: rgb(14,19,27);
        margin: .5rem 0 0 .1rem;
        background-color: #cdb48f;
      }
    }
  }

  .g_row0{
    height: 1.3rem;
    color: #fff;
    border: 1px solid #cdb48f;
    background-color:@secondary-color;

    // td{
    //   border-top: 1px solid #1e1e1e;
    // }
  }
  .active{
    background-color: @primary-color !important;
  }
  .g_row1{
    height: 1.3rem;
    color: #e3e3e3;
    .jindu{
      width: 80%;
      margin: .1rem auto 0 auto;
      height: .36rem;
      line-height: .36rem;
      font-size: .28rem;
      border-radius: .2rem;
      background-color: #777777;
    }
  }
  .g_row2{
    height: 1.3rem;
    color: #e3e3e3;
    background-color: rgb(14,19,27);
  }
  img{
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
  }
  .huang{
    color: #e5c616;
  }
}

</style>