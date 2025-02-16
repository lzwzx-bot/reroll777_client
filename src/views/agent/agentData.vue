<template>

  <div class="home_wrap" >
    <van-nav-bar
        title="Meus Indicados"
        left-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />

<!--    <div class="meus_bg">-->
<!--      <div class="meus_tb"><img src="../../assets/images/agent/img_tpdl.png" alt=""></div>-->
<!--      <div class="meus_wh">?</div>-->
<!--      <div class="meus_txt">-->
<!--        ID do membro-->
<!--        <p>23397902</p>-->
<!--      </div>-->
<!--      <div class="meus_an">-->
<!--        <div class="an01">Reg de <br/>Coletas</div>-->
<!--        <div class="an02">Receber</div>-->
<!--        <div class="an03"> 0,00</div>-->
<!--      </div>-->
<!--      <div class="clear"></div>-->
<!--    </div>-->



    <div class="meus_bg">
      <div class="meus_tit">Informações da promoção</div>
      <div class="meus_fx">
<!--        <div class="fx_ewm">-->
<!--          <img src="../../assets/images/agent/xiazai.png" alt="">-->
<!--          <p>Clique Para<br/>Salvar</p>-->
<!--        </div>-->
        <div class="fx_lianjie">
          <div class="lj_tit">Link exclusivo</div>
          <div class="lj_con" @click="doCopy(info.link)">
            <div class="lj_con_l">{{info.link}}</div>
            <img src="../../assets/images/agent/fx02.png" alt="" >
          </div>
        </div>
        <ul class="meus_sj">
          <li>
            <img src="../../assets/images/agent/img_facebook.png" alt="">
            <div>Facebook</div>
          </li>
          <li>
            <img src="../../assets/images/agent/img_tg.png" alt="">
            <div>Telegram</div>
          </li>
          <li>
            <img src="../../assets/images/agent/img_wa.png" alt="">
            <div>WhatsApp</div>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
    </div>
    <div class="meus_bg">
      <div class="caidan_tit">
        <div>Comissão</div>
        <div class="caidan_r" @click="$router.push('/agentDetail')">
          <span class="huang">Mais</span><img src="../../assets/images/agent/caidanjt.png" />
        </div>
      </div>
      <div class="caidan_con">
        <li>
          <div>Comissão total</div><span class="huang"> {{agent_info.commission_money}}</span>
        </li>
        <li>
          <div>Comissão recebida</div><span class="huang"> {{agent_info.had_money}}</span>
        </li>
        <li>
          <div>Última Comissão</div><span class="huang"> {{agent_info.last_money||0}}</span>
        </li>
      </div>
    </div>


    <div class="meus_bg">

      <div class="caidan_tit">
        <div>Dados da equipe</div>
        <div class="caidan_r">
          <span class="huang">Mais</span><img src="../../assets/images/agent/caidanjt.png"/>
        </div>
      </div>

      <div class="caidan_con">
        <li>
          <div>Número total de equipes</div><span class="huang">  {{agent_info.sub_num||0}}</span>
        </li>
        <li>
          <div>Número total de pessoas recarregando</div><span class="huang"> {{agent_info.sub_recharge_num||0}}</span>
        </li>
        <li>
          <div>Valor total de recarga</div><span class="huang"> {{agent_info.sub_recharge_sum||0}}</span>
        </li>
        <li>
          <div>Total de apostas válidas</div><span class="huang"> {{agent_info.sub_bet_sum||0}}</span>
        </li>
      </div>

    </div>



    <ft></ft>
  </div>
</template>

<script>
import Vue from 'vue';
import {NavBar} from 'vant';
import Fetch from '../../utils/fetch';
import ft from "../../components/ft"

Vue.use(NavBar);
export default {
  name: "agentData",
  components: {
    ft
  },
  data() {
    return {

      info:{},
      agent_info:{},

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
      Fetch('/box/getUserSubInfo').then((r) => {
        this.agent_info = r.data;
      });
    },
    onClickLeft(){
      this.$router.push("/");
    },
    doCopy(val) {
      let _this = this;
      this.$copyText(String(val)).then(
          function () {
            _this.$toast({
              background: "#07c160",
              message: _this.$t("复制成功"),
            });
          }
      );
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
  //background-color: rgb(48, 48, 48);
  padding-top: 1.5rem;
}
.meus_bg{
  width: 95%;
  border-radius: .2rem;
  margin: 0 auto .2rem auto;
  background-color: @secondary-color;
}
.meus_tb{
  width: 12%;
  float: left;
  margin-left: 6%;
  img{
    width: 100%;
  }
}

.meus_txt{
  width: 30%;
  float: left;
  margin: .2rem 0 0 .3rem;
  color: #777777;
  line-height: .46rem;
  p{
    color: #bebbbb;
  }
}
.caidan_r{
  display: flex;
  justify-content: center;
  align-items: center;
  
  img{
    height: 30%;
    margin-left: 0.2rem;
    margin-top: -0.05rem;
  }
}
.meus_an{
  width: 18%;
  float: right;
  font-size: .3rem;
  margin: .3rem .2rem 0 0;
  .an01{
    text-align: center;
    border-radius: .2rem;
    padding: .08rem 0;
    background-color: #005DFE;
  }
  .an02{
    text-align: center;
    border-radius: .2rem;
    padding: .16rem 0;
    color: #fff;
    margin-top: .1rem;
    background-color: #999999;
  }
  .an03{
    color: #005DFE;
    text-align: right;
    font-size: .46rem;
    margin: .1rem 0 .4rem 0;
  }
}
.meus_tit{
  line-height: 1rem;
  color: #fff;
  padding-left: .2rem;
  border-bottom: 1px solid @bodercolor;
}
.meus_fx{
  width: 95%;
  margin: .2rem auto;
  padding-bottom: .4rem;
  .fx_ewm{
    width: 24%;
    float: left;
    img{
      width: 100%;
      border: .16rem solid #fff;
      border-radius: .2rem .2rem 0 0;
    }
    p{
      display: block;
      text-align: center;
      font-size: .28rem;
      padding: .05rem 0;
      border-radius:  0 0 .2rem .2rem;
      background-color: #005DFE;
    }
  }
}

.fx_lianjie{
  width: 100%;

  .lj_tit{
    margin: .2rem 0;
    color: #fff;
  }
  .lj_con{
    padding: 0.3rem;
    color: #f5f5f5;
    border-radius: .2rem;
    border: 1px solid @bodercolor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 0.5rem;
    }
  }
}
.meus_sj{
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;
}
.meus_sj li{
  text-align: center;
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  img{
    width: 1rem;

  }
  div{
    color: #fff;
    text-align: center;
    font-size: .24rem;
    line-height: .46rem;
    width: 100%;
  }
}
.caidan_tit{
  line-height: 1rem;
  color: #fff;
  display:flex;
  justify-content: space-between;
  position: relative;
  padding:0  0.2rem;
  border-bottom: 1px solid @bodercolor;

}
.caidan_con{
  justify-content: space-between;
  position: relative;
  li{
    line-height: 1rem;
    color: @textcolor3;
    display:flex;
    padding-left: 0.2rem;
    border-bottom: 1px solid @bodercolor;
    p{
      float: left;
      display: inline;

    }

    span{
      display: flex;
      position: absolute;
      right: .4rem;
    }
  }
}
.caidan_con li:last-child{
  border-bottom: 0px;
}

.huang{
  color:  @anttextcolor;
}
.hong{
  color: #ff0000;
}
.clear{
  clear: both;
}
</style>
