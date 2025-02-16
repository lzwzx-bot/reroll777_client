<template>
  <!--  这是充值页面   -->
  <div class="home_wrap">


    <div class="base-header">
      <div :class="is_active ? 'big_tit is-active' : 'big_tit'" @click="show_game_box = false">{{ $t('充值') }}</div>
      <div class="big_tit" @click="$router.push('withdraw')">{{ $t('提现') }}</div>
    </div>


    <form class="form">
      <div class="tips_wrap">
        <p class="recharge_amount_p">{{ $t("充值金额") }}</p>
        <div class="flex_center">
          <div>{{ $t("钱符") }}</div>
          <input v-model.trim="data.money" type="number" step="10" class="inp" :placeholder="$t('充值金额')"
            @input="changeAmount" />
        </div>

      </div>

      <div class="recharge_wrap" style="overflow: hidden;">
        <div :class="i == data.money ? 'chose_money fast-money' : 'fast-money'" v-for="(i, k) in recharge_list"
          @click="chmoney(i)" :key="k">
          {{ $t("钱符") }}{{ i }}
          <van-icon v-if="i == data.money" name="success" color="rgb(255,255,255)" size="0.4rem"
            style="position: absolute;bottom: 0;right: 0;border-radius: 20%;background-color:#33c481 ;" />
          <span class="recharge_bonus" v-if="rate > 0">+{{ rate }}%</span>
        </div>
      </div>

    </form>

    <div class="sbtn" @click="submit">
      {{ $t("支付") }}
    </div>


    <div class="game-box" id="bigBox" v-show="show_game_box">
      <!-- <iframe :src="game_url" frameborder="0" id="myiframe"></iframe> -->
    </div>

    <ft></ft>
    <ftNav :active="2"></ftNav>
  </div>
</template>

<script>
import Vue from "vue";
import { CountDown, Checkbox, RadioGroup, Icon, Radio } from "vant";
import Fetch from "../../utils/fetch";
import ftNav from "../../components/footer_nav/footer_nav"

import ft from "../../components/ft.vue"

Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(CountDown).use(Checkbox).use(Icon);

export default {
  name: "recharge",
  data() {
    return {
      time: 0,
      eye: 1,
      balance: 0.0,
      data: {
        choose: "",
        channel: "",
        money: 20,
        id: "",
        reason: "there is no need to fill",
      },
      recharge_list: [],
      payment: [],
      payment_index: 0,
      config: {},
      actualAmount: "",
      bonus: 0,
      show_game_box: false,
      is_active: true,
      min_money: 0,
      rechargeConfigList: [],
      is_open: false,
      rate: 0,
    };
  },
  created() {
    this.$bus.$emit('send2ftnav', 2);
  },
  components: {
    ftNav,
    ft,
  },
  mounted() {
    this.recharge_list = [20, 30, 50, 100, 300, 500, 1000, 3000, 5000];

    // if (localStorage.getItem("recharge_money")) {
    //     this.data.money = localStorage.getItem("recharge_money");
    // }
    console.log(this.$route.name)
    if (this.$route.name == "invest") {
      this.is_active = true;
    }
    Fetch("/Recharge/rechargeConfigList").then(res => {

      this.is_open = res.data.is_open;
      this.rate = res.data.gift_rate;
      if (res.data.is_open) {
        this.rechargeConfigList = res.data.config_list
      }
    })




  },
  methods: {
    back() {
      if (this.show_game_box) {
        document
          .getElementById("bigBox")
          .removeChild(document.getElementById("myiframe"));
        this.show_game_box = false;
      } else {
        this.$router.go(-1)
      }
    },
    getBonus(recharge_amount) {
      let bns = 0;
      for (let i = 0; i < this.rechargeConfigList.length; i++) {
        if (recharge_amount >= this.rechargeConfigList[i]['min_money'] && recharge_amount <= this.rechargeConfigList[i]['max_money']) {
          bns = this.rechargeConfigList[i]['gift_amount'];
          break;
        }
      }
      return bns;
    },
    getBID(recharge_amount) {
      let bid = 0;
      for (let i = 0; i < this.rechargeConfigList.length; i++) {
        if (recharge_amount >= this.rechargeConfigList[i]['min_money'] && recharge_amount <= this.rechargeConfigList[i]['max_money']) {
          bid = this.rechargeConfigList[i]['id'];
          break;
        }
      }
      return bid;
    },
    ki(v) {
      return Math.round(v);
    },
    chmoney(i) {
      this.data.money = i;
      return false;
    },
    checkLimit() {
      const key = "invest_button";
      const ttl = 60;
      let now = Date.parse(new Date()) / 1000;
      let val = localStorage.getItem(key);
      if (!val) {
        val = JSON.stringify({
          ttl: now + ttl,
        });
        localStorage.setItem(key, val);
        return true;
      } else {
        val = JSON.parse(val);
        if (val["ttl"] > now) {
          return false;
        } else {
          val = JSON.stringify({
            ttl: now + ttl,
          });
          localStorage.setItem(key, val);
          return true;
        }
      }
    },

    submit() {
      if (!this.data.money || this.data.money < 10) {
        this.$toast(this.$t("最低充值金额为R$") + 10);
        return false;
      }

      //got the money
      localStorage.setItem("recharge_money", this.data.money);

      //pass go recharge
      this.$toast.loading({ mask: true, duration: 0 });
      // if(this.data.money >= 20){
      //     this.payment_index = 1;
      // }else{
      //     this.payment_index = 0;
      // }
      this.payment_index = this.getBID(this.data.money);
      //console.log(this.payment_index);return;
      Fetch(
        "/recharge/addRecharge",
        {
          money: this.data.money,
          active_id: this.payment_index,
        },
        null,
        false
      )
        .then((r) => {
          if (r.code == 1) {
            //console.log(r);
            if (r.data.payUrl.indexOf("http") != -1) {
              if (this.loadUrl(r.data.payUrl)) this.$router.push("/");
              //window.location.href = r.data.payUrl;

            }
            //ok go the page
            this.$toast.clear();
            //this.$toast(this.$t("充值成功,请等待审核"));
          } else {

            this.$toast.clear();
            this.$toast(this.$t("系统繁忙,请稍后再尝试"));
          }
        })
        .catch((er) => {
          //recharge failed by upstream channel
          this.$toast.clear();
          this.$toast({
            message: this.$t("系统繁忙,请稍后再尝试"),
            duration: 5000,
          });
        });
    },
    loadUrl(url) {
      this.show_game_box = true;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("height", "100%");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("scrolling", "yes");
      iframe.setAttribute("id", "myiframe");
      iframe.setAttribute("src", url);
      iframe.addEventListener("load", function () {
        console.log("iframe loaded!");
      });
      iframe.addEventListener('error', function () {
        let u = navigator.userAgent;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
        if (isIOS) {
          window.location.href = url;
        } else {
          window.open(url);
        }
      });
      var bigBox = document.getElementById("bigBox");
      bigBox.appendChild(iframe);
    },
    changeAmount() {
      var num = 2;
      if (this.payment.type) {
        if (this.payment.type == 1) {
          if (this.payment.rate > 10000) {
            num = 8;
          } else if (this.payment.rate > 1000) {
            num = 6;
          } else if (this.payment.rate > 10) {
            num = 4;
          }
          this.actualAmount =
            "≈" +
            (this.data.money / this.payment.rate).toFixed(num) +
            this.payment.mark;
        } else {
          this.actualAmount =
            "≈" +
            this.payment.mark +
            (this.data.money / this.payment.rate).toFixed(num);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";

.myteam-bg {
  width: 100%;
  height: 3.0rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.ades {
  width: 95%;
  margin: 15px auto;
  font-size: 0.37rem;
  color: rgba(255, 255, 255, 0.737);
  line-height: 24px;
  text-indent: 10px;
  color: goldenrod;
}

.base-header {
  position: relative;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  margin: 0 auto 0.2rem auto;
  border-radius: .2rem;
  overflow: hidden;
  border: thin solid @anttextcolor;
  box-sizing: border-box;
  padding: 5px 5px;
}

.big_tit {
  font-size: 0.35rem;
  text-align: center;
  width: 49%;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #fff;
  border-radius: .1rem;
}

.is-active {
  background: @anttextcolor;
  color: @primary-color;
}

.telegram {
  position: absolute;
  width: 1.3rem;
  bottom: 100px;
  right: 20px;
  z-index: 1;
}

.back_left {
  background-size: 14px 20px;
  background-position: center;
  width: 15%;
}


.game-box {
  position: fixed;
  top: 1.2rem;
  bottom: 55px;
  left: 0;
  right: 0;
  background: white;
  z-index: 999;
  overflow: scroll;
}

.flex_center {
  padding: 4px 5px;
  color: #fff;
  justify-content: flex-start;
  border: thin solid #f5f5f5;
  //background-color: #1e1e1e;
  border-radius: .2rem;
  margin-bottom: 0.3rem;
  position: relative;
  font-size: 0.4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 700;
}

.tree {
  position: absolute;
  height: 0.85rem;
  right: 0;
  bottom: 0;
  font-weight: 700;
}

.flex_center>div {
  font-weight: 700;
  text-align: center;
  margin-left: 5px;
  margin-right: 3px;
}

.inp {
  width: 86%;
  height: 0.6rem;
  font-size: 0.4rem;
  color: gold;
  font-weight: 700;
}

.chose_money {
  border: 1px solid @anttextcolor !important;
  color: @anttextcolor;
}

.fast-money {
  width: 30%;
  text-align: center;
  margin-bottom: 0.2rem;
  border-radius: 6px;
  float: left;
  //color: #fff;
  font-size: 0.32rem;
  display: flex;
  padding: 0.35rem 0.26rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  border: thin solid #e5e5e5;
  position: relative;
}

.recharge_bonus {
  position: absolute;
  font-weight: 700;
  top: 5px;
  right: 5px;
  color: gold;
}






.mactive_b {
  font-size: 0.3rem;
  color: #9703aa;
}

.ml66 {
  font-size: 0.3rem;
  color: gold;
}

.ml5 {
  margin-left: 5%;
}

.top_right {
  position: absolute;
  font-size: 13px;
  line-height: 18px;
  color: #ffffff;
  top: 36px;
  right: 14px;
}

.recharge_fs {
  margin-top: 10px;
  background: #0e411488;
  border-radius: 6px;
  padding: 0 16px;

  .tit {
    background-image: linear-gradient(to bottom, #FFFFFF, #97EBA7);
    color: transparent;
    //-webkit-background-clip: text;
  }
}

.recharge_box {
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  margin-top: 12px;
  padding: 16px 11px;


}

.home_wrap {
  width: 100%;
  min-height: 80vh;
  padding-top: 0.2rem;
  //background-color: rgba(0,0,0,0.5);
  //color: #fff;
}

.form {
  width: 92%;
  margin-left: 4%;
  margin-top: 8px;

  .recharge_wrap {
    width: 100%;
    padding: 0;
    color: #fff;
    border-radius: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .tit {
    // height: 40px;
    border-bottom: 1px solid #FF79FF;
    font-size: 16px;
    //color: #fff;
    font-weight: bold;
    line-height: 54px;
    padding-bottom: 1px;
    margin-bottom: 3px;
  }

  .item {
    height: 45px;
    width: 100%;
    //border-bottom: 1px solid #ECECEC;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    &:last-child {
      border-bottom: none;
    }

    .check {
      position: absolute;
      width: 16px;
      height: 16px;
      right: 0px;
      background-size: 100% 100%;

      &.checked {
        background-size: 100% 100%;
      }
    }

    .re_icon {
      width: 20px;
      height: 20px;
      margin-left: 11px;

      img {
        width: 28px;
        height: 20px;
      }
    }

    .re_name {
      font-size: 16px;
      line-height: 22px;
      color: #ffffff;
      margin-left: 3px;
    }
  }
}

.tip {
  width: 100%;
  margin-top: 8px;
  border-radius: 5px;
  padding: 8px;
  color: #e5e5e5;
  line-height: 24px;
  font-size: 0.3rem;
  background: #000;
}

.sbtn {
  margin: .1rem auto 0 auto;
  width: 92%;
  border-radius: .2rem;
  font-size: 0.35rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: @anttextcolor;
  color: @primary-color;
  margin-bottom: 2rem;
  //border: thin solid #031638;
}

.recharge_amount_p {
  font-size: 0.32rem;
  color: #fff;
  margin: 0.3rem auto;
}
</style>
