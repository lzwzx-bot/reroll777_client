<template>
  <div class="home_wrap">

    <van-nav-bar
        title="Convidar"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
    />

    <div class="bx_top">
      <div class="top_txt">Link exclusivo</div>
      <div class="bx_link" @click="doCopy(info.link)">
        <b>{{info.link}}</b>
        <img class="" src="../../assets/images/share/copy_h.png" alt="">
      </div>
      <div class="clear"></div>
      <div class="bx_lianxi">
        Partilha rápida
        <div class="lx_con">
          <ul>
            <li><a href="#"><img class="" src="../../assets/images/share/img_facebook.png" alt=""><p>Facebook</p></a></li>
            <li><a href="#"><img class="" src="../../assets/images/share/img_tg.png" alt=""><p>Telegram</p></a></li>
            <li><a href="#"><img class="" src="../../assets/images/share/img_wa.png" alt=""><p>WhatsApp</p></a></li>
          </ul>
          <div class="lx_txt"><span>Mais</span><img class="" src="../../assets/images/share/a15.png" alt=""></div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="bx_two" @click="$router.push('teamList')">
        Pessoas de nível inferior eficazes <b>{{info.good_num}}</b> pessoas <a > Detalhes </a></div>
    </div>
    <div class="bx_top">
      <div class="txt_tit">Qual é o número de jogadores efetivamente promovidos? (cumprir todas as condições indicadas abaixo)</div>
      <div class="txt_01">
        <div class="txt_left">O subordinado acumulou recargas</div>
        <div class="txt_right">{{info.good_recharge}} Ou o acima mencionado</div>
        <div class="clear"></div>
      </div>
      <div class="txt_02">
        <div class="txt_left">O subordinado acumulou apostas</div>
        <div class="txt_right">{{info.good_bet}} Ou o acima mencionado</div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="bx_list">
      <ul>
        <li v-for="(item,index) in boxList" :key="index" @click="addBoxList(item.num,item.is_get,item.money,index)">
          <div class="bx_tp" >
            <img v-if="item.is_get == 0" class="" src="../../assets/images/betReward/1.png" alt="">
            <img v-if="item.is_get == 1"  src="../../assets/images/betReward/3.png" alt="" class="shadow_box">
            <img v-if="item.is_get == 2" class="" src="../../assets/images/betReward/2.png" alt="">
            <p> {{item.condition}} pessoas</p>
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


    <ftNav></ftNav>
  </div>
</template>

<script>
import Vue from 'vue';
import {NavBar} from 'vant';
import Fetch from '../../utils/fetch';
import ftNav from "../../components/footer_nav/footer_nav"
Vue.use(NavBar);
export default {
  name: "share",
  components: {
    ftNav
  },
  data() {
    return {
      info:{},
      boxList:[],
      isFetching: false
    };
  },
  created() {
  },
  mounted() {

    this.$bus.$emit('send2ftnav', 1);
    this.start();
  },
  methods: {
    start() {
      Fetch('/box/getLink').then((r) => {
        this.info = r.data;
      });
      Fetch('/box/getBoxList').then((r) => {
        this.boxList = r.data;
      });
    },
    addBoxList(num,is_get,money,index){
      if(is_get != 1 || this.isFetching) return false;

      this.isFetching = true;

      Fetch('/box/addBoxList',{num:num}).then((r) => {
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
         
         this.isFetching = false;

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
  //background-color: #1A45B1;
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
  background-color:  @secondary-color;
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
  border: 1px solid #e5e5e5;
  border-radius: .1rem;
  line-height: .62rem;
  color: #f5f5f5;
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
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
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
    color: #f5f5f5;
    img{
      width: .85rem;
    }
  }
}
.lx_con a{
  color: #f5f5f5;
}
.lx_txt{
  width: 16%;
  float:right;
  color: #f8b600;
  img{
    width: .13rem;
    margin:.5rem 0 0 .2rem;
  }
}
.bx_two{
  margin-top: .2rem;
  font-size: .28rem;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  b{
    color: #f8b600;
    margin: 0 0.1rem;
  }
  a{
    display: inline-block;
    height: 0.8rem;
    line-height: 0.8rem;
    background: @anttextcolor;
    color:@primary-color;
    font-weight: 700;
    margin-left: 0.1rem;
    padding: 0 0.1rem;
    border-radius: 0.2rem;
  }
}
.txt_tit{
  text-align: center;
  line-height: .36rem;
  font-size: .28rem;
}
.txt_01{
  width: 100%;
  margin: .1rem auto 0 auto;
  background-color: #f8b600c6;
  line-height: .62rem;
  text-align: center;
  font-size: .26rem;
}
.txt_left{
  width: 50%;
  float: left;
  color: #656565;
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
}
.bx_list{
  width: 95%;
  margin: 0 auto 0 auto;
  color: #fff;
  padding: .2rem .3rem .3rem .3rem;
  border-radius: .2rem;
   background-color:  rgba(0, 0, 0, 0.2);
  font-size: .3rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
}
.shadow_box{
  background: transparent;
  box-shadow: #765400  0px 0.3rem 0.5rem 0.1rem;
}
.bx_list li{
  width: 25%;
  float: left;
  text-align: center;
  margin-bottom: 0.5rem;
  .bx_tp img{
    width: 1.5rem;
    left: 10%;
  }
  .bx_tp p{
    margin-top: -.48rem;
    color: gold;
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
