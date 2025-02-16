<template>

  <div class="home_wrap" >
    <van-nav-bar
        title="Convidar"
        left-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
    <div class="vonvidar_tp"><img src="../../assets/images/agent/convidar01.jpg" alt=""></div>
    <div class="vonvidar">
      <div class="onvidar_tit">Por exemplo:</div>
      <div class="onvidar_con">
        <p>Neste website o bônus do agente é calculado por apostas. Por exemplo, se as apostas forem 10-200000, a taxa de bônus correspondente será 15/10000, e se as apostas forem superiores a 3000000, o bônus de agente é 50/10000. A é o agente do website, ele recruta B1, B2 e B3 como seus agentes e B1 também recruta C1 e C2 como seus agentes. B2 não tem agentes e B3 tem apenas um agente C3.</p>
        <p>Após alguns dias, as apostas válidas de B1 são 120000, as apostas válidas de B2 são 40000, e as apostas válidas de B3 são 20000. As apostas válidas de C1 são 100000, as apostas válidas de C2 são 30000 e as apostas válidas de C3 são 3000000, portanto, o desempenho total de B1 é C1+C2=130000, e a taxa de bónus do agente é de 15/10000. B2 não tem agentes; portanto, o desempenho de B2 é 0. O desempenho total de B3 é C3 - 3000000, por conseguinte, a taxa de bónus é de 50/10000. O desempenho total da Equipes direta de A é 180000+Subagente 3130000=3310000, pelo que a taxa de bónus é de 50/10000.</p>

      </div>

    </div>

    <ft></ft>
  </div>
</template>

<script>
import Vue from 'vue';
import {NavBar} from 'vant';
import ft from "../../components/ft"
import Fetch from '../../utils/fetch';

Vue.use(NavBar);
export default {
  name: "agent",
  components: {
    ft
  },
  data() {
    return {
      lang:this.$i18n.locale||"zh_cn",
      show_icon_type: 'about',
      data: {},
    };
  },
  created() {
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      // Fetch('/index/about').then((r) => {
      //   this.data = r.data;
      // });
    },
    onClickLeft(){
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background: rgb(21, 29, 41);
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
  background-color: #fff;
  padding-top: 1.5rem;
}
.vonvidar_tp{
  width: 95%;
  margin: 0 auto;
  img{
    width: 100%;
    border-radius: .2rem;
    border: 1px solid #293548;
  }
}
.vonvidar{
  width: 95%;
  box-sizing: border-box;
  margin: .2rem auto 0 auto;
  border-radius: .2rem;
  padding: .3rem;
  color: #333;
  line-height: .52rem;
  background-color: #f7f7f7;
}
</style>
