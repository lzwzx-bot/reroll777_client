<template>
  <div class="user_wrap">
    <div class="top_header">
      <div class="user_detail">
        <div class="user_header">
          <!-- <div class="viptb"><img src="../../assets/images/person/img_vip.png" /></div> -->
          <img src="../../assets/images/person/avt.png" alt="" />
        </div>
        <div class="user_right">
          <div class="user_name">
            <div class="user_vip">
              <span>{{ data.id }}</span>
              <img
                @click="doCopy(data.id)"
                src="../../assets/images/person/copy.png"
                alt=""
              />
            </div>
            <div class="user_nickname">
              <span>{{ data.nickname }}</span>
              <!-- <img @click="$router.push('/edit')" src="../../assets/images/person/edit2.png"
                  style="width:0.4rem;margin-left:10px" alt=""> -->
            </div>
            <div class="user_yue">
              <img src="../../assets/images/person/a04.png" />
              <span>{{ data.money }}</span
              ><img
                src="../../assets/images/person/a03.png"
                @click="getUserInfoPerson()"
              />
            </div>
          </div>
        </div>
        <div class="user_xx">
          <img src="../../assets/images/person/a01.png" />
          <div>Mensagens</div>
          <img src="../../assets/images/person/a09.png" />
        </div>
        <div class="clear"></div>
        <div class="qianbao">
          <ul>
            <li>
              <a href="#">
                <img src="../../assets/images/person/a05.png" />
                <div>Carteira central</div>
              </a>
            </li>
            <div class="line"></div>
            <li @click="$router.push('/withdraw')">
              <a>
                <img src="../../assets/images/person/a06.png" />
                <div>Saque</div>
              </a>
            </li>
            <div class="line"></div>
            <li @click="$router.push('/recharge')">
              <a href="#">
                <img src="../../assets/images/person/a07.png" />
                <div>Depósito</div>
              </a>
            </li>
            <div class="line"></div>
            <li @click="$router.push('/agentData')">
              <a href="#">
                <img src="../../assets/images/person/a081.png" />
                <div>Meus Indicados</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="xx_wrap">
      <div class="xinxi" @click="$router.push('vip')">
        <div class="vi_wrap">
          <van-icon name="vip-card-o" class="vip_icon" />
        </div>
        <div class="xinxi_txt">
          <div>
            Para o proximo nivel
            <span>VIP{{ vip.vip_info.next_level || 0 }}</span> Aposta valida
            ainda necessaria
          </div>
          <div class="jine">{{ vip.vip_info.need_bet }}</div>
          <div class="jindu">
            <div>Aposta necessaria</div>
            <div class="myp">
              <Progress
                :percentage="pct"
                :pivot-text="pct + '%'"
                pivot-color="#ce61ff"
                color="linear-gradient(to right,#ce61ff, #ce61ff)"
              />
            </div>
          </div>
        </div>

        <div class="clear"></div>
      </div>
      <div class="user_yw">
        <div class="re" @click="$router.push('withdrawRecord')">
          <img src="../../assets/images/person/a011.png" alt="" />
          <p>Lista De Retirada</p>
        </div>
        <div class="re" @click="$router.push('rechargeRecord')">
          <img src="../../assets/images/person/a12.png" alt="" />
          <p>Lista De Depósito</p>
        </div>
        <div @click="$router.push('/gameRecord')">
          <img src="../../assets/images/person/a13.png" alt="" />
          <p>Ordem</p>
        </div>
        <div @click="$router.push('/agentData')" style="position: relative">
          <img src="../../assets/images/person/a14.png" alt="" />
          <p>{{ $t("我的团队") }}</p>
        </div>
      </div>
    </div>
    <div class="user_uu">
      <!-- <div @click="$router.push('/agent')" style="position: relative">
        <img src="../../assets/images/person/a16.png" alt="" />
        <p>Convidar</p>
        <img src="../../assets/images/person/jiantou.png" alt="" class="jiantou" />
      </div> -->
      <!--      <div @click="$router.push('/moneybag')">-->
      <!--        <img src="../../assets/images/person/a17.png" alt="" />-->
      <!--        <p>{{ $t('充值记录') }}</p>-->
      <!--        <img src="../../assets/images/person/jiantou.png" alt="" class="jiantou" />-->
      <!--      </div>-->
      <!--      <div @click="$router.push('/cashlist')">-->
      <!--        <img src="../../assets/images/person/a18.png" alt="" />-->
      <!--        <p>Informações pessoais</p>-->
      <!--        <img src="../../assets/images/person/jiantou.png" alt="" class="jiantou" />-->
      <!--      </div>-->
      <!-- <div @click="$router.push('/share')">
        <img src="../../assets/images/person/a19.png" alt="" />
        <p>Centro de Segurança</p>
        <img
          src="../../assets/images/person/jiantou.png"
          alt=""
          class="jiantou"
        />
      </div> -->
      <!--      <div @click="$router.push('/cashlist')">-->
      <!--        <img src="../../assets/images/person/a20.png" alt="" />-->
      <!--        <p>Música</p>-->
      <!--        <img src="../../assets/images/person/jiantou.png" alt="" class="jiantou" />-->
      <!--      </div> -->

      <div @click="$router.push('/share')">
        <img src="../../assets/images/person/a24.png" style="height: 22px; width: 22px;padding-left: 3px;"  alt="" />
        <p>Convidar</p>
        <img
          src="../../assets/images/person/jiantou.png"
          alt=""
          class="jiantou"
        />
      </div>
      <div @click="$router.push('/betreward')">
        <img src="../../assets/images/person/a25.png" alt="" />
        <p>Bônus de apostas</p>
        <img
          src="../../assets/images/person/jiantou.png"
          alt=""
          class="jiantou"
        />
      </div>
      <div @click="$router.push('/support')">
        <img src="../../assets/images/person/a21.png" alt="" />
        <p>FAQ</p>
        <img src="../../assets/images/person/jiantou.png" alt="" class="jiantou" />
      </div>
      <div @click="$router.push('/feedback')">
        <img src="../../assets/images/person/a22.png" alt="" />
        <p>Bônus de Sugestão</p>
        <img src="../../assets/images/person/jiantou.png" alt="" class="jiantou" />
      </div>
      <div @click="logout()">
        <img src="../../assets/images/person/a23.png" alt="" />
        <p>Sair</p>
        <img src="../../assets/images/person/jiantou.png" alt="" class="jiantou" />
      </div>
    </div>
    <ftNav :active="4"></ftNav>
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import { Icon, Cell, CellGroup, Progress } from "vant";
import ftNav from "../../components/footer_nav/footer_nav";

Vue.use(Cell).use(CellGroup).use(Icon).use(Progress);

export default {
  name: "person",
  components: {
    ftNav,
    Progress,
  },
  data() {
    return {
      pct: 0,
      data: {},
      eye: 1,
      vip: {
        vip_info: { next_level: 0 },
        vip_list: [],
      },
    };
  },
  created() {
    this.$bus.$emit("send2ftnav", 4);
  },
  mounted() {
    this.start();
  },
  methods: {
    formatNumberToTwoDecimalPlaces(input) {
      // 检查输入是否是数字
      if (typeof input !== "number") {
        return "0.00";
      }

      // 使用 toFixed 方法保留两位小数并将其转换为字符串
      return input.toFixed(2);
    },
    to2(num) {
      try {
        return Math.ceil(num * 100) / 100;
      } catch (error) {
        return Math.ceil(num * 100) / 100;
      }
    },
    start() {
      this.getUserInfoPerson();
      Fetch("/user/vip_config_list").then((r) => {
        this.vip = r.data;
      });
    },
    getUserInfoPerson() {
      this.data.money = 0.0;
      Fetch("/user/getUserInfoAPi").then((r) => {
        this.data = r.data;
      });
    },
    goService() {
      let u = navigator.userAgent;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
      if (isIOS) {
        window.location.href = this.data.service;
      } else {
        window.open(this.data.service);
      }
    },
    logout() {
      Fetch("/user/logout").then((r) => {
        //console.log(r);
        if (r.code == 1) {
          this.$router.push("/");
          localStorage.removeItem("token");
          localStorage.removeItem("user_balance");
        }
      });
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
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
.myteam-bg {
  width: 100%;
  // height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
.tips {
  font-size: 0.34rem;
  color: gold;
  width: 95%;
  margin: 1px auto 15px;
  text-align: center;
  align-items: center;
  font-weight: 700;
  margin-top: 10px;
  background: #0d7319;
  height: 20px;
  padding: 5px;
}

.funcs {
  width: 95%;
  display: flex;
  margin: 1px auto 10px;
  justify-content: space-between;
}

.raw {
  width: 95%;
  display: flex;
  margin: 1px auto 5px;
  justify-content: space-between;
}

.raw .re {
  width: 48%;
  display: flex;
  justify-content: space-around;
  padding: 25px 10px;
  align-content: center;
  align-items: center;
  height: 1.8rem;
  color: #fff;
  background: #0d7319;
  box-sizing: border-box;
  font-size: 0.4rem;
  font-weight: 700;
}

.raw .re img {
  width: 35px;
}

.van-cell::after {
  border: 1px solid #344064;
}

.van-cell {
  background: rgb(43, 56, 100);
  color: white;
}

.user_wrap {
  // background: url(../images/vip/sbg.png);
  //margin-top: 1.2rem;
  padding-bottom: 1.2rem;
  min-height: 100vh;
}

.set_go {
  width: 38px;
  height: 38px;
  position: absolute;
  top: 11px;
  right: 60px;
  background: url("../../assets/images/person/sign.png") no-repeat center center;
  background-size: 75% 75%;
}

.setting-btn {
  width: 38px;
  height: 38px;
  position: absolute;
  top: 11px;
  right: 14px;
  background: url("../../assets/images/person/setting.png") no-repeat center
    center;
  background-size: 60% 60%;
}

.user_nickname {
  height: 30px;
  line-height: 30px;
  font-size: 0.35rem;
  color: #ffffff;
}

.user_vip {
  font-size: 0.35rem;
  color: #ffffff;
}
.user_vip span {
  padding-top: -30px;
}
.user_vip img {
  width: 0.4rem;
  margin-left: 0.1rem;
}
.top_header {
  position: relative;
  width: 100%;
  //background: cornflowerblue;
  background-size: 100% 100%;
}

//.user_detail::before {
//  content: '';
//  position: absolute;
//  left: 0;
//  right: 0;
//  top: 0;
//  bottom: 0;
//  opacity: .3;
//}

.user_detail {
  width: 100%;
  margin: 0 auto 10px auto;
  padding: 0.3rem 0.3rem 0.6rem 0.3rem;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  background-image: linear-gradient(to right, @primary-color, @anttextcolor);

  .user_header {
    width: 2rem;
    height: 2rem;
    float: left;
    position: relative;
    overflow: hidden;
    align-items: center;
    border-radius: 0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
    .viptb {
      position: absolute;
      background-color: #24b299;
      bottom: 0;
      right: 0;
      padding: 0.05rem 0.2rem 0 0.2rem;
      img {
        width: 0.5rem;
        height: auto;
      }
    }
  }
}

.user_right {
  width: 55%;
  float: left;
  margin-left: 1%;
}
.user_name {
  margin-left: 3px;
  margin-top: 3px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #ffffff;
}
.user_yue span {
  font-size: 0.65rem;
  float: left;
  border-left: 1px solid #ffffff;
  padding: 0 0.2rem;
}
.user_yue img {
  width: 0.6rem;
  float: left;
  margin-right: 0.2rem;
}
.user_xx {
  width: 22%;
  float: left;
  color: #fff;
  line-height: 0.4rem;
  text-align: center;
  img {
    width: 0.6rem;
  }
}
.qianbao {
  width: 100%;
  margin: 0.2rem 0 0.4rem 0;
}
.qianbao li {
  width: 24.7%;
  float: left;
  text-align: center;
  line-height: 0.42rem;
  font-size: 0.3rem;
  img {
    width: 0.8rem;
  }
  a {
    color: #fff;
  }
}
.qianbao .line {
  height: 0.8rem;
  margin-top: 0.2rem;
  width: 1px;
  background-color: #fff;
  float: left;
}
.asset-wrap {
  width: 95%;
  margin: 3px auto 10px;
  border-radius: 6px;
  z-index: 999;
  background-size: cover;
  padding: 8px 15px;
  box-sizing: border-box !important;
  background: #274b39;
}

.asset-top {
  // height: 75px;
  width: 100%;
  //background: #8d8d8f;
  display: flex;
}

.asset-btm {
  height: 65px;
  width: 98%;
  margin: 0 auto;
  margin-bottom: 0;
  // background: #198325;
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
}

.btm-item {
  width: 49.33%;
  float: left;
}
.btm-line {
  width: 1px;
  float: left;
  height: 0.8rem;
  margin-top: 0.3rem;
  background: #4e7462;
}
.item-money {
  text-align: center;
  height: 30px;
  line-height: 40px;
  font-weight: 700;
  font-size: 0.5rem;
  color: #fafd6e;
  font-size: 0.5rem;
}

.item-des {
  text-align: center;
  height: 15px;
  line-height: 15px;
  font-size: 0.3rem;
  color: #88b19f;
  margin-top: 10px;
  font-family: "PingFang-SC-Medium";
}

.asset-top-left {
  width: 65%;
}

.asset-top-right {
  width: 35%;
  display: flex;
  align-items: center;
  position: relative;

  .jiantou {
    display: flex;
    position: absolute;
    right: 20px;
  }

  img {
    width: 20px;
    height: 20px;
    display: inline;
    margin-top: 1px;
    margin-right: 10px;
  }
}

.total-asset {
  height: 20px;
  line-height: 20px;
  color: #88b19f;
  font-size: 0.3rem;
  font-weight: 700;
}

.total-number {
  height: 40px;
  line-height: 30px;
  color: #88b19f;
  font-weight: 700;
  font-size: 0.65rem;
  // background-image: -webkit-linear-gradient(bottom, #FFB000, #FBE057);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}

.recharge-btn {
  width: 100%;
  height: 30px;
  background: #fafd6e;
  border-radius: 5px;
  color: #36654d;
  font-size: 0.38rem;
}

.user_uu {
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  padding: 3px 0 10px 0;
  margin-bottom: 15px;
  font-size: 13px;
  position: relative;
  background: @secondary-color;

  .jiantou {
    display: flex;
    position: absolute;
    right: 2%;
  }

  div {
    width: 95%;
    height: 1.2rem;
    margin: 0 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid @bodercolor;
  }

  p {
    color: #e3e3e3;
    margin-top: 3px;
    //margin-right: 18px;
    display: inline;
    margin-bottom: 0;
  }

  img {
    width: 24px;
    height: 24px;
    display: inline;
    margin-top: 1px;
    margin-right: 10px;
  }
}

.user_yw {
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 95%;
  margin: 0 auto;
  border-radius: 0 0 5px 5px;
  padding: 10px 0;
  margin-bottom: 10px;

  div {
    width: 31.8%;
    padding: 0 3px;
    //background: rgb(43, 56, 100);
    //height: 2rem;
    // background: #0d7319;
  }

  p {
    color: #e3e3e3;
    margin-top: 8px;
    font-size: 0.35rem;
  }

  img {
    width: 1rem;
  }
}
.xinxi {
  width: 95%;
  margin: 0 auto;
  color: #e3e3e3;
  border-radius: 5px 5px 0 0;
  padding: 0.4rem 0.3rem;
  box-sizing: border-box;
}
.xinxi_tx {
  width: 14%;
  float: left;
}
.xinxi_tx img {
  width: 100%;
}
.xinxi_txt {
  width: 76%;
  box-sizing: border-box;
  float: left;
  margin-left: 2%;
  font-size: 0.24rem;
  color: #ffbd8b;
  line-height: 0.4rem;
}
.xinxi_txt span {
  color: #f9c200;
  font-weight: bold;
  font-size: 0.28rem;
}
.jine {
  font-size: 0.3rem;
  color: #e3e3e3;
  font-weight: bold;
}

.xinxi_jt {
  width: 6%;
  float: left;
  margin-left: 2%;
}
.xinxi_jt img {
  width: 20px;
}
.clear {
  clear: both;
}
.list {
  width: 96%;
  margin-left: 2%;
  margin-top: 10px;
  border-radius: 5px;
  background: rgb(43, 56, 100);

  img {
    vertical-align: middle;
    width: 22px;
    height: 20px;
    margin-right: 10px;
  }
}
.xx_wrap {
  background-color: @secondary-color;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.2rem;
}
.xinxi {
  width: 100%;
  height: 2.2rem;
  margin: 0 auto;

  border-radius: 5px 5px 0 0;
  padding: 0.4rem 0.3rem;
  box-sizing: border-box;
  display: flex;
}
.vip_icon {
  font-size: 1.2rem;
  color: @anttextcolor;
}
.xinxi_txt {
  width: 76%;
  float: left;
  margin-left: 2%;
  font-size: 0.26rem;
  color: #f1f1f1;
  line-height: 0.4rem;
}

.jine {
  font-size: 0.3rem;
  color: gold;
  font-weight: bold;
}

.xinxi_jt {
  width: 6%;
  float: left;
  margin-left: 2%;
  position: relative;
}
.xinxi_jt img {
  width: 20px;
}
.clear {
  clear: both;
}
.myp {
  margin-top: 0.24rem;
}
.list {
  width: 96%;
  margin-left: 2%;
  margin-top: 10px;
  border-radius: 5px;
  background: rgb(43, 56, 100);

  img {
    vertical-align: middle;
    width: 22px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>
