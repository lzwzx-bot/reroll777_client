<template>
  <div class="home_wrap mt44" style="overflow: hidden;">

    <van-nav-bar
        title="Rebate"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
    />


    <div class="bx_top">
      <div class="txt_tit">Receba recompensas todos os dias. Quanto mais você joga mais recompensas você ganha. </div>
      <div class="txt_01">
        <div class="next_pr">Progresso da próxima recompensa {{todayInfo.today_bet_amount}}/{{todayInfo.next_bet}}</div>
        <Progress
            :percentage="pct"
            :pivot-text="todayInfo.percent + '%'"
            pivot-color="#ce61ff"
                    color="linear-gradient(to right,#ce61ff,#ce61ff)"
        />
      </div>
      <div class="txt_02">
        <div class="txt_left">Recebido hoje</div>
        <div class="txt_right">R$ {{todayInfo.today_money}}</div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="bx_list">
      <ul>
        <li v-for="(item,index) in boxList" :key="index" @click="addBoxList(item.num,item.is_get,item.money,item.bet_condition,index)">
          <div class="bx_tp" >
            <img v-if="item.is_get == 0" class="" src="../../assets/images/betReward/1.png" alt="">
            <img v-if="item.is_get == 1" class="shadow_box" src="../../assets/images/betReward/3.png" alt="">
            <img v-if="item.is_get == 2" class="" src="../../assets/images/betReward/2.png" alt="">
            <p> {{item.bet_condition}} apostas</p>
          </div>
          <div class="bx_txt">R${{item.money}}</div>
        </li>

        <div class="clear"></div>
      </ul>
    </div>
    <div class="bx_top">
      <div class="sm_tit">Instruções Do Evento:</div>
      <div class="sm_con">
        1.Desenvolva amigos para abrir baús de tesouro. Se você completar diferentes números de amigos, poderá obter baús de tesouro correspondentes com uma quantidade máxima de 100000. Quanto mais você desenvolver, maior será a recompensa;
        2.Esta atividade é um presente adicional da plataforma e você pode desfrutar de outras recompensas de agentes e comissões ao mesmo tempo, ou seja, desfrutar diretamente de múltiplas alegrias;
        3.A recompensa é limitada à coleta manual no final doiOS、Android、H5、PC, e o expirado será distribuído automaticamente;
        4.O bônus (excluindo o principal) concedido por esta atividade requer 0 apostas mais eficazes para serem retiradas, e as apostas são plataformas de jogo ilimitadas;
        5.Este evento é limitado a operações normais realizadas pelo titular da conta. É proibido alugar, usar plug-ins externos, robôs, apostar em contas diferentes, brushing mútuo, arbitragem, interface, protocolo, exploração de vulnerabilidades, controle de grupo ou outros meios técnicos para participar. Caso contrário, as recompensas serão canceladas ou deduzidas, a conta será congelada ou até mesmo adicionada à lista negra;
        6.Para evitar diferenças no entendimento do texto, a plataforma manterá a interpretação final deste evento.
      </div>
    </div>


<!--    <ftNav :active="1"></ftNav>-->
  </div>
</template>

<script>
import Vue from 'vue';
import {NavBar,Progress } from 'vant';
import Fetch from '../../utils/fetch';
import ftNav from "../../components/footer_nav/footer_nav"
Vue.use(NavBar,Progress);
export default {
  name: "betReward",
  components: {
    ftNav,
    Progress
  },
  data() {
    return {
      info:{},
      boxList:[],
      todayInfo:{},
        pct:0,
    };
  },
  created() {
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch('/box/getLink').then((r) => {
        this.info = r.data;
      });
      Fetch('/box/getTodaybetInfo').then((r) => {
        this.todayInfo = r.data;
        this.pct = parseFloat(r.data.percent)
      });
      Fetch('/box/getTodaybetList').then((r) => {
        this.boxList = r.data;
      });
    },
    addBoxList(num,is_get,money,cdt,index){
      if(is_get != 1) return false;
      Fetch('/box/addTodaybetList',{bet_condition:cdt}).then((r) => {
         console.log(r);
         if(r.code == 1){
           this.$notify({
             title: "R$" + money,
             message: r.msg,
             type: 'success'
           });
           this.boxList[index].is_get = 2;
         }else{
           this.$notify.error({
             title: "R$" + money,
             message: r.msg,
           });
         }
      });
    },
    onClickLeft(){
      this.$router.push("/activity");
    },
    doCopy(val) {
      let _this = this;
      this.$copyText(String(val)).then(
          function (e) {
            _this.$toast({
              background: "#07c160",
              message: _this.$t("复制成功"),
            });
          },
          function (e) {
            // console.log(e);
          }
      );
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
.shadow_box{
  background: transparent;
  box-shadow: rgb(96, 94, 131)  0px 0.3rem 0.5rem 0.1rem;
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
  min-height: 80vh;
  //background-color: rgb(48, 48, 48);
  padding-bottom: 1.8rem;
}
.baoxiang_bg{
  background-color: #2e2e2e;
}
.bx_top{
  width: 95%;
  margin: .2rem auto 0 auto;
  color: #fff;
  padding: .3rem;
  border-radius: .2rem;
  background-color: @secondary-color;
  font-size: .3rem;
  box-sizing: border-box;
  .top_txt{
    width: 24%;
    float: left;
    line-height: .62rem;
  }

}
.bx_link{
  width: 70%;
  height: .62rem;
  border: 1px solid #293548;
  border-radius: .1rem;
  line-height: .62rem;
  color: #c7c7c7;
  float: left;
  font-size: .24rem;
  padding: 0 2%;
  b{
    float: left;
  }
  img{
    float: right;
    width: .35rem;
    margin-top: .08rem;
  }
}
.bx_lianxi{
  margin-top: .3rem;
  padding: .3rem 0 .2rem 0;
  line-height: .36rem;
  border-bottom: 1px solid #293548;
  border-top: 1px solid #293548;
}
.lx_con{
  margin: .2rem 0;
}
.lx_con ul{
  width: 50%;
  float: left;
  li{
    width: 30%;
    float: left;
    text-align: center;
    font-size: .24rem;
    color: #c7c7c7;
    img{
      width: .85rem;
    }
  }
}
.lx_con a{
  color: #c7c7c7;
}
.lx_txt{
  width: 16%;
  float:right;
  color: #feb705;
  img{
    width: .13rem;
    margin:.5rem 0 0 .2rem;
  }
}
.bx_two{
  margin-top: .2rem;
  font-size: .28rem;
  a{
    color: #feb705;
  }
}
.txt_tit{
  //text-align: center;
  line-height: .5rem;
  font-size: .4rem;
  color: #fee000;
  padding: 0.3rem;
  border-radius: 0.2rem;

}
.txt_01{
  width: 100%;
  margin:  0 auto;
  line-height: .62rem;
  text-align: center;
  font-size: .26rem;
}
.next_pr{
  margin: 0.2rem auto;
  color: #fff;
}
.txt_left{
  width: 50%;
  float: left;
}
.txt_right{
  width: 50%;
  color: #fff;
  float: right;
}
.txt_02{
  width: 100%;
  margin: .1rem auto 0 auto;
  line-height: .62rem;
  text-align: center;
  font-size: .26rem;
  margin-top: 0.2rem;
  background-color: #f8b600c6;

}
.bx_list{
  width: 95%;
  margin: .2rem auto 0 auto;
  color: #fff;
  padding: .8rem .3rem .3rem .3rem;
  border-radius: .2rem;
  background-color: @secondary-color;
  font-size: .3rem;
  box-sizing: border-box;
}
.bx_list li{
  width: 25%;
  float: left;
  text-align: center;
  margin-bottom: 0.5rem;
  .bx_tp img{
    width: 70%;
    left: 10%;
  }
  .bx_tp p{
    margin-top: -.48rem;
    color: #ffffff;
    font-size: .24rem;
  }
  .bx_txt{
    margin-top: .4rem;
    font-size: .28rem;
  }
}
.sm_tit{
  color: #fff;
  font-size: 。46rem;
  font-weight: bold;
}
.sm_con{
  color: #f5f5f5;
  font-size: .32rem;
  line-height: .52rem;
  margin-top: .2rem;
}
.clear{
  clear: both;
}
</style>
