<template>
  <div :class="hiddenClass">
    <header>
      <div class="menu_btn" @click="showLeftNav">
        <van-icon v-show="!$parent.show_left_nav" name="ascending" class="menu_icon" />
        <van-icon v-show="$parent.show_left_nav" name="descending" class="menu_icon" />
      </div>
      <div class="top_title">
        <img src="../assets/images/logo/logo.png" class="logo" @click="$router.push('/')">
      </div>
      <div id="pc_time" class="hidden-xs-only">
        <span>{{ formattedTime }}(UTC-03:00)</span>

      </div>
      <div v-show="!$parent.user_balance" class="login-register">
        <div class="login-btn" @click="$parent.login()">
          Entrar
        </div>
        <div class="register-btn" @click="$parent.register()">
          Registro
        </div>
      </div>
      <div v-show="$parent.user_balance" class="user-balance">

        <div class="user_info hidden-xs-only" style="display: flex;">
          <img src="../assets/images/person/avt.png" id="hd_avt">
          <div style="margin: auto 0.2rem;">
            <div style="margin-bottom: .06rem;" @click="doCopy(data.id)">
              <span>{{ data.id }}</span>
              <img src="../assets/images/person/copy.png" style="width: 0.24rem;">
            </div>
            <div>{{ data.nickname }}</div>
          </div>
        </div>
        <div class="bnumber">
          <div class="top_balance">
            <img class="jinbi" src="../assets/images/common/a04.png">
            <div class="balance">
              {{ data.money }}
            </div>
          
            <img  class="refresh_btn" src="../assets/images/person/a03.png" @click="getUserInfoPerson()" />
          </div>

          <van-popover v-model="show_popover" theme="light" trigger="click" :actions="actions" placement="left-start"
            @select="fundosAction">
            <template #reference>
              <div class="fund_btn">
                Fundos&nbsp;|&nbsp;<i class="el-icon-caret-bottom fz3" />
              </div>
            </template>
          </van-popover>


          <van-icon name="search" class="simg" @click="$router.push('subgame')"/>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Fetch from '../utils/fetch';
export default {
  name: "Header",
  data() {
    return {
      shouldHide: true,
      data: {},
      show_left_nav: false,
      show_popover: false,
      actions: [
        { text: "Depósito", icon: "add-o" },
        { text: "Saque", icon: "idcard" },
      ],
      currentDate: new Date(),
      interval: null
    }
  },
  computed: {
    hiddenClass() {
      return {
        //true是隐藏 false是不隐藏
        'hidden-xs-only': this.shouldHide
      }
    },
    formattedTime() {
      return this.formatDate(this.currentDate)
    }
  },
  created() {
    this.$bus.$on('send2headshow', (bool) => {
      this.shouldHide = bool;
    })
    this.startTimer();
    this.getUserInfoPerson();
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
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
    getUserInfoPerson(){
      Fetch('/user/getUserInfoAPi2').then((r) => {
      //console.log(r);
      this.data.money = 0.00;
      this.data = r.data;
    });
    },
    startTimer() {
      this.interval = setInterval(() => {
        this.currentDate = new Date()
      }, 1000)
    },
    stopTimer() {
      clearInterval(this.interval)
    },
    formatDate(date) {
      let brazilianDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000) - (180 * 60000));
      return brazilianDate.toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' }) + ' ' +
        brazilianDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    },
    showLeftNav() {
      this.$parent.show_left_nav = !this.$parent.show_left_nav;
    },
    fundosAction(act) {
      if (act.text === "Depósito") {
        this.$router.push("recharge");
      }
      if (act.text === "Saque") {
        this.$router.push("withdraw");
      }
    },
  }
}
</script>

<style scoped lang="less">
@import  "../assets/css/variables.less";
@headerHeight: 1.2rem;


header {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  top: 0;
  padding: 0 1%;
  height: @headerHeight;
  background-color: @primary-color;
  //background-image: url("../assets/images/common/top_bg.jpg");
  padding-right: 10px;
  z-index: 5;
}

.menu_btn {
  float: left;
  width: 0.66rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu_icon {
  font-size: 0.6rem !important;
  color: @textcolor1;
}

#pc_time {
  color: @textcolor1;
  display: flex;
  width: 5rem;
  flex-direction: column;
  font-size: 0.32rem;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 100%;
  font-weight: 700;

  span {
    display: block;
    height: 50%;
    display: flex;
    align-items: center;
  }
}

.top_title {
  //text-align: center;
  // font-size: 24px;
  display: flex;
  height: 100%;
  float: left;
  align-items: center;
  justify-items: center;
  //margin-left: 0.1rem;

}

.logo {
  width: 3.8rem;
  height: 1rem;
}

.login-register {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.login-btn {
  padding: 0.15rem 0.3rem;
  color: @primary-color;
  display: flex;
  align-items: center;
  border-radius: 0.15rem;
  background-color: @anttextcolor;
  font-size: 0.23rem;
  margin-right: 0.5rem;
  border: 1px solid @anttextcolor;
}

.register-btn {
  padding: 0.15rem 0.3rem;
  color: @anttextcolor;
  //background-color: @mainColor;
  border: 1px solid @anttextcolor;
  display: flex;
  align-items: center;
  border-radius: 0.15rem;
  margin-right: 0.2rem;
  font-size: 0.23rem;
}

.fund_btn {
  padding: 0.15rem 0.25rem;
  color: @primary-color;
  border: 1px solid  @anttextcolor;
  display: flex;
  align-items: center;
  border-radius: 0.15rem;
  margin-right: 0.2rem;
  font-size: 0.26rem;
  margin-left: 0.21rem;
  background:  @anttextcolor;
}
.simg {
  font-size: 0.5rem;
  margin-right: 0.1rem;
  color: @anttextcolor;
}
.top_balance{
  // height: 1rem;
  margin-top:1px;
  padding: 0.1rem 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gold;
  border-radius: 0.2rem;
}
.refresh_btn{
  width: 0.4rem;
  height:0.4rem;
  margin-left: 0.1rem;
}
.jinbi {
  height: 0.32rem;
  margin-top: -0.05rem;
  margin-right: 0.1rem;
  margin-left: 0.1rem;
}

.user_info {
  color: @textcolor1;
  padding-right: .4rem;
  width: 3rem;
  font-size: 0.34rem;
}

#hd_avt {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
}

.bnumber {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.balance {
  color: #ecc15c;
  font-size: 0.32rem;
  font-weight: 700;
}

.user-balance {
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  top: 0;
}
</style>