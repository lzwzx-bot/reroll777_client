<template>
  <div id="app" v-touch:right="onSwipeLeft">
    <!-- 头部 -->
    <HeaderTop />

    <!-- 左侧导航 -->
    <leftNav
      v-show="show_left_nav"
      class="top-right-menu"
      @ListenChild="tabChange"
    />

    <!-- 视图窗口 -->
    <router-view id="vier_port" />

    <!-- 登录弹窗 -->
    <div v-show="is_show_wrap" class="login-wrap" @click="is_show_wrap = false">
      <div v-show="is_show_login" class="login-form" @click.stop="a = 1">
        <img src="./assets/images/logo/logo.png" class="lr_logo" alt="" />

        <div class="lg-title">Entrar</div>

        <div class="item mt">
          <span class="icon">
            <van-icon name="user" class="ricon" />
          </span>
          <input
            v-model.trim="data.username"
            type="text"
            class="inp"
            :placeholder="'Nome de Usuário'"
          />
        </div>

        <div class="item mt">
          <span class="icon">
            <van-icon name="lock" class="ricon" />
          </span>
          <input
            v-model.trim="data.password"
            type="password"
            class="inp"
            :placeholder="'Senha'"
          />
        </div>

        <div class="remeber">
          <div class="rem-left">
            <van-icon
              name="passed"
              color="rgb(4, 190, 2)"
              size="0.4rem"
              style="margin-right: 5px"
            />
            <span>Lembrar Senha</span>
          </div>
          <div class="rem-right">Esqueceu a Senha?</div>
        </div>

        <div class="lg-btn" @click="submit_login()">Entrar</div>

        <div class="rg-btn" @click.stop="register()">
          {{ $t("还没账号?") }}
          <span class="signup">Registra uma Conta</span>
        </div>
        <img
          src="./assets/images/common/close.png"
          class="close_btn"
          alt=""
          @click="closeWindow()"
        />
      </div>

      <!-- 注册 -->
      <div v-show="is_show_register" class="login-form" @click.stop="a = 1">
        <img src="./assets/images/logo/logo.png" class="lr_logo" alt="" />

        <div class="lg-title">Registro</div>

        <div class="item mt">
          <span class="icon">
            <van-icon name="user" class="ricon" />
          </span>
          <input
            v-model.trim="register_data.mobile"
            type="text"
            class="inp"
            :placeholder="'Nome de Usuário'"
          />
        </div>

        <div class="item mt">
          <span class="icon">
            <van-icon name="lock" class="ricon" />
          </span>
          <input
            v-model.trim="register_data.password"
            type="password"
            class="inp"
            :placeholder="$t('请设置登录密码')"
          />
        </div>

        <div class="item mt">
          <span class="icon">
            <van-icon name="lock" class="ricon" />
          </span>
          <input
            v-model.trim="register_data.spassword"
            type="password"
            class="inp"
            :placeholder="$t('重复登录密码')"
          />
        </div>

        <div class="item mt">
          <span class="icon">
            <i class="ricon el-icon-postcard" />
          </span>
          <input
            v-model.trim="register_data.real_name"
            type="text"
            class="inp"
            :placeholder="'Nome completo'"
          />
        </div>

        <div class="remeber2">
          <van-icon
            name="passed"
            color="rgb(4, 190, 2)"
            size="0.4rem"
            style="margin-right: 5px"
          />
          <span>Eu tenho mais de 18 anos</span>
        </div>

        <div class="now-btn" @click="submit_reigster">Registro</div>

        <div class="rg-btn" @click.stop="login()">
          {{ $t("已有账号?") }}
          <span class="signup"> {{ $t("立即登录") }}</span>
        </div>

        <img
          src="./assets/images/common/close.png"
          class="close_btn"
          alt=""
          @click="closeWindow()"
        />
      </div>
    </div>

    <!-- 底部导航 -->

    <FtNav />
  </div>
</template>

<script>
import Vue from "vue";
import { Notify } from "vant";
import { Icon, Popover } from "vant";
import router from "./router";
import Fetch from "./utils/fetch";
import FtNav from "./components/footer_nav/footer_nav.vue";
import leftNav from "./components/leftNav.vue";
import HeaderTop from "./components/header.vue";

Vue.use(Notify).use(Icon).use(Popover);
export default {
  name: "App",
  components: {
    FtNav,
    leftNav,
    HeaderTop,
  },
  data() {
    return {
      user_balance: localStorage.getItem('user_balance')||0,
      is_show_wrap: false,
      is_show_login: false,
      is_show_register: false,
      sync_timer: null,
      showUserinfo: false,
      showUser: false,
      show_left_nav: false,
      app: {},
      data: {
        username: "",
        password: "",
      },
      register_data: {
        password: "",
        spassword: "",
        mobile: "",
        invitation_code: localStorage.getItem("code") || null,
        sms: "",
        real_name: "",
      },
    };
  },
  watch:{
        'user_balance':function(newv){
          localStorage.setItem('user_balance',newv);
        },
        'show_left_nav':function(){
          if(document.documentElement.clientWidth > 900){
            this.show_left_nav = true;
          }
        }

  },
  updated() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  mounted() {
    let _this = this;
    if (document.documentElement.clientWidth > 900) {
      _this.show_left_nav = true;
    }
    window.onresize = function () {
      //console.log("宽度", document.documentElement.clientWidth);
      // console.log("高度", document.documentElement.clientHeight);
      if (document.documentElement.clientWidth > 900) {
        _this.show_left_nav = true;
      }
    };
  },
  created() {
    let _this = this;
    router.beforeEach((to, from, next) => {
      let token = localStorage.getItem("token");
      if (!token) {
        _this.login();
        return false;
      }
      return next();
    });
    let param = this.getUrlParams();
    console.log(param['id']);
    if (param["id"]) {
      if (param["id"].length == 6) {
        this.register_data.invitation_code = param["id"];
      } else {
        let idx = param["id"].indexOf("#");
        let invi_code = param["id"].substring(0, idx);
        this.register_data.invitation_code = invi_code;
      }
      localStorage.setItem("code", this.register_data.invitation_code);
      //console.log(localStorage.getItem("code"))
    }
  },
  methods: {
    getUrlParams() {
      let url = window.location.href;
      if (url.indexOf("?") == -1) return {};
      // 通过 ? 分割获取后面的参数字符串
      let urlStr = url.split("?")[1];
      // 创建空对象存储参数
      let obj = {};
      // 再通过 & 将每一个参数单独分割出来
      let paramsArr = urlStr.split("&");
      for (let i = 0, len = paramsArr.length; i < len; i++) {
        // 再通过 = 将每一个参数分割为 key:value 的形式
        let arr = paramsArr[i].split("=");
        obj[arr[0]] = arr[1];
      }
      return obj;
    },
    submit_reigster() {
      this.register_data.invitation_code = localStorage.getItem("code")
        ? localStorage.getItem("code")
        : null;
      if (!this.register_data.mobile) {
        this.$notify.warning({
          title: this.$store.state.config.site_name,
          message: this.$t("手机号码不能为空"),
        });
        return false;
      }
      if (
        !this.register_data.password ||
        this.register_data.password.length < 6
      ) {
        this.$notify.warning({
          title: this.$store.state.config.site_name,
          message: this.$t("密码长度为6-18位"),
        });
        return false;
      }
      if (this.register_data.password != this.register_data.spassword) {
        this.$notify.warning({
          title: this.$store.state.config.site_name,
          message: this.$t("两次密码不一致"),
        });
        return false;
      }
      this.register_data["url"] = window.location.href;
      this.register_data.mobile = this.register_data.mobile.replace(
        new RegExp("[+]", "gm"),
        ""
      );
      Fetch("/user/register", this.register_data)
        .then((res) => {
          //console.log(res);
          if (res.code == 1) {
            //注册成功
            this.$notify.success({
              title: this.$store.state.config.site_name,
              message: this.$t("注册成功"),
            });
            localStorage.setItem("login_username", this.register_data.mobile);
            setTimeout(() => {
              this.login();
            }, 3000);
          } else {
            this.$notify.warning({
              title: this.$store.state.config.site_name,
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          this.$notify.warning({
            title: this.$store.state.config.site_name,
            message: this.$t("系统繁忙,请稍后再尝试"),
          });
          return false;
        });
    },
    submit_login() {
      if (!this.data.username) {
        this.$notify.warning({
          title: this.$store.state.config.site_name,
          message: this.$t("请输入正确的手机号码"),
        });
        return;
      }
      if (!this.data.password) {
        this.$notify.warning({
          title: this.$store.state.config.site_name,
          message: this.$t("密码为6-18位"),
        });
        return;
      }
      this.data.username = this.data.username.replace(
        new RegExp("[+]", "gm"),
        ""
      );
      Fetch("/user/login", {
        account: this.data.username,
        password: this.data.password,
      }).then((res) => {
        //登录失败
        if (res.code == 0) {
          this.$notify.warning({
            title: this.$store.state.config.site_name,
            message: res.msg,
          });
        } else {
          if (res.data.userinfo.token) {
            localStorage.setItem("token", res.data.userinfo.token);
            localStorage.setItem('user_balance',res.data.userinfo.money);
          }
          this.$notify.success({
            title: this.$store.state.config.site_name,
            message: this.$t("登录成功"),
          });
          //保存账户密码
          localStorage.setItem("login_username", this.data.username);
          localStorage.setItem("login_password", this.data.password);
          //跳转到首页
          setTimeout(() => {
            window.location.href = "/";
          }, 400);
        }
      });
    },
    login() {
      this.data.username = localStorage.getItem("login_username")
        ? localStorage.getItem("login_username")
        : "";
      this.is_show_wrap = true;
      this.is_show_login = true;
      this.is_show_register = false;
      return;
    },
    register() {
      this.is_show_wrap = true;
      this.is_show_login = false;
      this.is_show_register = true;
      return;
    },
    closeWindow() {
      this.is_show_wrap = false;
      this.is_show_login = false;
      this.is_show_register = false;
    },
    tabChange(v) {
      // console.log(v);
      this.nav_active = v;
      if (v == 0) {
        this.getGameList();
      }

      if (v == 1) {
        this.all_game_list = [];
        let allGames = [];
        this.all_game_list_bak.forEach((item) => {
          item.game_list.forEach((game) => {
            if (game.origin == "PG") {
              allGames.push(game);
            }
          });
        });
        this.all_game_list.push({
          origin: "PG Slots",
          game_list: allGames,
        });
      }
      if (v == 2) {
        this.all_game_list = [];
        let allGames = [];
        this.all_game_list_bak.forEach((item) => {
          item.game_list.forEach((game) => {
            if (game.origin == "TADA") {
              allGames.push(game);
            }
          });
        });
        this.all_game_list.push({
          origin: "TADA Slots",
          game_list: allGames,
        });
      }
      if (v == 3) {
        let localGames = localStorage.getItem("local_game_list");
        if (!localGames) {
          let json_obj = { PG: [], JDB: [], TADA: [] };
          localStorage.setItem("local_game_list", JSON.stringify(json_obj));
          localGames = localStorage.getItem("local_game_list");
        }
        Fetch("/Game/getGameById", JSON.parse(localGames)).then((res) => {
          let _this = this;
          this.all_game_list = res.data;
          this.all_game_list_bak = res.data;
          this.max_show_array = [];
          res.data.forEach(() => {
            _this.max_show_array.push(6);
          });
        });
      }
    },

    changeBalance(val) {
      this.user_balance = val;
    },
    onSwipeLeft(even, start, end) {
      //console.log(window.location.href);

      if (window.location.href.indexOf("signature")) {
        return false;
      }
      if (end["X"] - start["X"] > 60) {
        this.$router.go(-1);
      }
    },
    bigNumeber(str) {
      var str = str.toString();
      var strs = str.split(".");
      var s1 = strs[0] || 0;
      var s2 = strs[1] || "00";
      return `<span class="bigNum">${s1}</span><span>.</span><span>${s2}</span>`;
    },
   
  },
};
</script>
<style lang="less">
@import "./assets/css/login&register.less";
@import "./assets/css/phone.css";
@import "./assets/css/pad.css";
@import "./assets/css/pc.less";
@import "./assets/css/default.less";
@import  "./assets/css/variables.less";

@headerHeight: 1.2rem;

html,
body {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB,
    Microsoft Yahei, sans-serif !important;
  user-select: none !important;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0;
  height: 0;
}

body {
  margin: 0;
}

#app {
  min-height: 100%;
  height: auto;
  width: 100%;
  overflow-x: hidden;
  background-image: url("./assets/images/common/bg.png");
  background-color: @third-color;
}

.el-message-box__header {
  background-image: url("./assets/images/logo/logo.png");
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
}
</style>
