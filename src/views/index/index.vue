<template>
  <div class="home_wrap">
    <!-- 后台轮播图 -->

    <van-swipe :autoplay="3000" class="swiper-container">
      <van-swipe-item>
        <router-link :to="'#'">
          <img src="../../assets/images/banner/1.png" style="border-radius: 10px" />
        </router-link>
      </van-swipe-item>
      <van-swipe-item>
        <router-link :to="'#'">
          <img src="../../assets/images/banner/2.png" style="border-radius: 10px" />
        </router-link>
      </van-swipe-item>
      <van-swipe-item>
        <router-link :to="'#'">
          <img src="../../assets/images/banner/3.png" style="border-radius: 10px" />
        </router-link>
      </van-swipe-item>
      <van-swipe-item>
        <router-link :to="'#'">
          <img src="../../assets/images/banner/4.png" style="border-radius: 10px" />
        </router-link>
      </van-swipe-item>
    </van-swipe>
    <!-- Jackpot -->
    <div class="jackpot">
      <div class="jnumber">
        <countTo :start-val="startVal" :end-val="endVal" :duration="3000" :decimals="2" :decimal="','"
          :separator="'.'" />
      </div>
    </div>
    <!-- 滚动通知 -->
    <div class="notice_root">
      <img class="notice_icon" src="../../assets/images/index/notice.gif" />
      <div class="container">
        <van-notice-bar class="notice_content" background="none" :scrollable="notice_bar_scroll">
          <template #default>
            <div v-html="notice" />
          </template>
        </van-notice-bar>
      </div>
    </div>

    <!--      PC大屏幕加背景-->
    <div class="sand_bot">
      <div class="nav_box">
        <van-tabs v-model="nav_active" class="van-tabs__wrap--scrollable" :sticky="false" :swipeable="true"
          :swipe-threshold="2" line-width="1.5rem" :background="'transparent'" :color="'#ce61ff'" @change="tabChange">
          <van-tab>
            <template #title>
              <div class="nav_title">
                <img v-if="nav_active == 0" class="nav_img" src="../../assets/images/category/HOTa.png" />
                <img v-else class="nav_img" src="../../assets/images/category/HOT.png" />
                <span class="ppl">Popular</span>
              </div>
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="nav_title">
                <img v-if="nav_active == 1" class="nav_img" src="../../assets/images/category/PGa.png" />
                <img v-else class="nav_img" src="../../assets/images/category/PG.png" />
                <span class="ppl">PG</span>
              </div>
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="nav_title">
                <img v-if="nav_active == 2" class="nav_img" src="../../assets/images/category/PPa.png" />
                <img v-else class="nav_img" src="../../assets/images/category/PP.png" />
                <span class="ppl">PP</span>
              </div>
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="nav_title">
                <img v-if="nav_active == 3" class="nav_img" src="../../assets/images/category/TADAa.png" />
                <img v-else class="nav_img" src="../../assets/images/category/TADA.png" />
                <span class="ppl">TADA</span>
              </div>
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="nav_title">
                <img v-if="nav_active == 4" class="nav_img" src="../../assets/images/category/JDBa.png" />
                <img v-else class="nav_img" src="../../assets/images/category/JDB.png" />
                <span class="ppl">JDB</span>
              </div>
            </template>
          </van-tab>
          <van-tab>
            <template #title>
              <div class="nav_title">
                <img v-if="nav_active == 5" class="nav_img" src="../../assets/images/category/CPa.png" />
                <img v-else class="nav_img" src="../../assets/images/category/CP.png" />
                <span class="ppl">CP</span>
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 搜索 -->
      <!-- <div v-show="true" class="search-wrap" @click="$router.push('subGame')">
        <input v-model="keyword" class="input-keyword" type="text" :placeholder="$t('请输入游戏名称')" />
        <van-icon name="search" class="simg" />
      </div> -->

      <!-- 游戏列表 -->
      <div v-for="(game, idx) in all_game_list" :id="'game' + idx" :key="idx" class="new-list">
        <div v-for="(game_t, tidx) in game" :key="tidx">
          <div class="c-sm-des">
            <!-- <img :src="'../../assets/images/category/'+idx +'a.png'" class="sec-img" /> -->
            <img v-if="idx == 'PG'" src="../../assets/images/category/PGa.png" class="sec-img" />
            <img v-if="idx == 'JDB'" src="../../assets/images/category/JDBa.png" class="sec-img" />
            <img v-if="idx == 'TADA'" src="../../assets/images/category/TADAa.png" class="sec-img" />
            <img v-if="idx == 'PP'" src="../../assets/images/category/PPa.png" class="sec-img" />
            <img v-if="idx == 'CP'" src="../../assets/images/category/CPa.png" class="sec-img" />
            <!-- <span class="sec-title">{{ idx}}</span> -->
          </div>
          <div class="game-list">
            <div v-for="(item, index) in game_t" v-show="index < step_show" :key="index" class="game-item" @click="
              playGame(item.game_id, item.origin, item.id, item.is_works)
              ">
              <div v-lazy:background-image="item.img" class="innerbox" :class="idx + '_innerbox'">
                <img v-if="!item.is_works" src="../../assets/images/common/nowork.png" class="nowork" />
                <div v-if="item.origin != 'CP'" class="game_item_pg_name">
                  {{ item.game_name }}
                </div>
              </div>
              <!-- <div v-if="item.origin != 'CP'" class="game_item_name">
                {{ item.game_name }}
              </div> -->
            </div>
          </div>
          <div v-show="game_t.length > step_show" class="show_more" @click="showMore(idx)">
            <div>
              A exibir {{ step_show }} jogos entre {{ game_t.length }} Popular
              jogos
            </div>
            Mostre mais ⇊
          </div>
        </div>
      </div>
    </div>

    <!--弹窗公告1-->
    <div v-show="show_tc" class="popup" @click="show_tc = false">
      <div class="tc_content" @click.t.stop="a = 1">
        <img src="../../assets/images/logo/logo.png" class="tc_logo" />
        <div class="notice_html" v-html="alter_notice" />
        <img src="../../assets/images/common/close.png" class="close_notice" @click="closeNotice()" />
      </div>
    </div>
    <!--弹窗公告2-->
    <div v-show="show_tc2 && rechargeConfigList.length" class="popup" @click="closeRechargeTip()">
      <div class="tc_content2">
        <img src="../../assets/images/logo/logo.png" class="tc_logo" />
        <div class="tc_head">Bônus Extra De Depósito Inicial</div>
        <table id="tc-table">
          <tr style="color: #111" class="tc_bgw">
            <th>Primeira recarga</th>
            <th>Valor Da Recompensa</th>
          </tr>
          <tr v-for="(item, index) in rechargeConfigList" :key="index">
            <td>≥{{ item.min_money }}</td>
            <td>{{ item.gift_amount }}</td>
          </tr>
        </table>
        <div style="width: 90%; margin: 0.4rem auto">
          <div>
            <van-icon name="passed" color="rgb(4, 190, 2)" size="0.4rem" style="margin-right: 5px" />
            <span style="color: #fff">Não estou mais aparecendo hoje</span>
          </div>

          <div>
            <van-icon name="passed" color="rgb(4, 190, 2)" size="0.4rem" style="margin-right: 5px" />
            <span style="color: #fff">Ocultar permanentemente</span>
          </div>
          <div class="tcbtn" @click="$router.push('recharge')">Prosseguir</div>
          <div class="clear"></div>
        </div>

        <img src="../../assets/images/common/close.png" class="close_recharge_tc" @click="closeRechargeTip()" />
      </div>
    </div>

    <!-- 游戏盒子-->
    <div v-show="show_game_box" id="bigBox" class="game-box">
      <!--    <div class="game-box" id="bigBox" v-show="true">-->
      <!-- <iframe :src="game_url" frameborder="0" id="myiframe"></iframe> -->
      <div class="back_to_desk">
        <img src="../../assets/images/common/close.png" class="close_game_btn" @click="beforeCloseGame()" />
      </div>
    </div>

    <!-- <a
      :href="$store.state.config.download_url"
      target="_blank"
      class="download"
    >
      <img src="../../assets/images/index/download.png" width="100" />
    </a> -->
    <div id="indexbr_box">
      <a v-if="this.insLink" :href=insLink target="_blank">
        <img src="../../assets/images/index/ins.png" class="invitation" width="100" style="border-radius: 20px;"
          @click="$router.push('share')" />
      </a>
      <a v-if="this.rate" :href="getUrl()" class="telegram">
        <img src="../../assets/images/index/RedEnvelope.png" width="100" />
      </a>
      <a v-if="this.tglink" :href="tglink" target="_blank" class="telegram">
        <img src="../../assets/images/index/tg2.png" width="100" />
      </a>
      <img src="../../assets/images/index/bx.gif" class="invitation" width="100" @click="$router.push('share')" />
    </div>

    <!--    <img src="../images/na/ftr3.png" @click="goSupport()" class="service"  width="100">-->

    <ft />
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import { NoticeBar } from "vant";
import ft from "../../components/ft.vue";
import Axios from "axios";
import {
  Swipe,
  SwipeItem,
  Icon,
  Progress,
  Popover,
  Field,
  Tabs,
  Tab,
  Lazyload,
} from "vant";
import countTo from "vue-count-to";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon)
  .use(Progress)
  .use(Popover)
  .use(Field)
  .use(NoticeBar)
  .use(Tabs)
  .use(Tab)
  .use(Lazyload, {
    lazyComponent: true,
  });

export default {
  name: "Index",
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    ft,
    countTo,
  },
  data() {
    return {
      lang: this.$i18n.locale || "zh_cn",
      notice_bar_scroll: false,
      myBaners: [],
      nav_active: 0,
      show_kefu: true,
      msg_show: false,
      loading: false,
      icon: [],
      data: {
        item1: { show: true },
        item2: { show: true },
        item3: { show: true },
      },
      islogin: false,
      isapp: false,
      tglink: "",
      insLink: "",
      show_tc: false,
      show_tc2: true,
      tc_content: "",
      gameList: [],
      show_game_box: false,
      game_url: "",
      gameType: 0,
      username: null,
      all_game_list: {},
      all_game_list_bak: [],
      keyword: "",
      notice: "",
      alter_notice: "",
      head_image: "",
      level: 0,
      total_bet_amount: 0,
      sub_level_amount: 0,
      group_service: "",
      service: "",
      leftCount: 0,
      secondsUntilNextHour: 0,
      timeStr: "00:00:00",
      time_id: null,
      is_ban: 0,
      evtSource: null,
      category: "slots",
      banners: [],
      showcbl: false,
      avd_img: null,
      avd_url: null,
      startVal: 0,
      endVal: 0,
      step_show: 18,
      max_show_array: [18, 18, 18, 18],
      jtid: null,
      todayInfo: {},
      rechargeConfigList: [],
      userInfo: {},
      rate: null
    };
  },
  watch: {
    keyword: function (newn) { },
  },
  created() {
    this.$bus.$emit("send2ftnav", 0);

    //监听左侧菜单传来的事件
    this.$bus.$on("send2index", (idx) => {
      this.tabChange(idx);
    });

    //获取通知
    this.getNotice();
  },

  mounted() {
    this.$bus.$emit("send2headshow", false);
    this.getJackpot();
    //this.getBanner();
    this.getAlterNotice();
    this.getUserInfo();
    this.getGameList();
    //设置jackpot定时器
    clearInterval(this.jtid);
    this.jtid = setInterval(() => {
      this.startVal = this.endVal;
      this.endVal = this.endVal + Math.random() * 100;
    }, 10000);
  },
  destroyed() {
    this.$bus.$emit("send2headshow", true);
    clearInterval(this.time_id);
    clearInterval(this.jtid);
  },
  methods: {
    closeRechargeTip() {
      console.log(this.username);
      if (this.username) {
        //看一下今天有没有弹过了
        let today = new Date();
        if (localStorage.getItem("date_time") != today.getHours()) {
          localStorage.setItem("date_time", today.getHours());
        }
      }
      this.show_tc2 = false;
    },
    getUrl() {
      if (this.rate > 0) {
        return this.$router.resolve({ name: 'commission' }).href;
      } else {
        return this.$router.resolve({ name: 'share' }).href;
      }

    },
    beforeCloseGame() {
      Fetch("/box/getTodaybetInfo", {}, false, true).then((r) => {
        this.todayInfo = r.data;
        this.$confirm(
          `Você apostou ${r.data.today_bet_amount} e completou ${r.data.percent
          }%, restando ${100 - r.data.percent
          }% para reivindicar bônus de apostas adicionais.`,
          {
            confirmButtonText: "Continuar o jogo",
            cancelButtonText: "Deixe o jogo",
            // type: 'warning',
            showClose: false,
            center: true,
          }
        )
          .then((e) => {
            console.log("用户选择了继续游戏...", e);
          })
          .catch((e) => {
            console.log(e);
            document
              .getElementById("bigBox")
              .removeChild(document.getElementById("myiframe"));
            this.show_game_box = false;
            this.game_url = "";
            //重新获取用户的余额
            this.getUserInfo();
          });
      });
    },
    showMore(idx) {
      this.step_show += 18;
    },
    getJackpot() {
      Fetch("/index/getJackpotNumber").then((r) => {
        r.data.money = parseFloat(r.data.money);
        this.startVal = r.data.money - 500;
        this.endVal = r.data.money;
      });
      Fetch("/index/getLink").then((r) => {
        // console.log(r.data);
        this.tglink = r.data[1].value;
        if (r.data[2]) {
          this.insLink = r.data[2].value;
        }
        //console.log(this.tglink,+'123'+this.insLink);
      });
    },
    getBanner() {
      //获取后台轮播图
      // Fetch("/index/getBanner").then((response) => {
      //   this.banners = response.data;
      // });
    },
    tabChange(v) {
      this.nav_active = v;
      if (v == 0) this.category = "slots";
      if (v == 1) this.category = "PG";
      if (v == 2) this.category = "PP";
      if (v == 3) this.category = "TADA";
      if (v == 4) this.category = "JDB";
      if (v == 5) this.category = "CP";
      this.getGameList();
    },

    getAirdrop() {
      Fetch("/airdrop/getAirdrop", {}).then((res) => {
        //console.log(r);
        this.$toast({
          background: "#07c160",
          message: res.msg,
          duration: 5000,
        });
        if (res.code == 1) {
          setTimeout(() => {
            this.getUserInfo();
          }, 2500);
        }
      });
    },
    //获取空投时间和剩余的数量
    AirdropCount() {
      Fetch("/airdrop/getLeftTimeAndCount", {}, {}, false).then((res) => {
        //console.log(res);
        if (res.code == 1) {
          this.secondsUntilNextHour = res.data.secondsUntilNextHour;
          this.leftCount = res.data.leftCount;
          let seconds = this.secondsUntilNextHour;
          this.time_id = null;
          clearInterval(this.time_id);
          this.time_id = setInterval(() => {
            if (seconds <= 0) {
              clearInterval(this.time_id);
              this.AirdropCount();
              return;
            }
            let hours = Math.floor(seconds / 3600);
            let minutes = Math.floor((seconds % 3600) / 60);
            let remainingSeconds = seconds % 60;
            this.timeStr = `${String(hours).padStart(2, "0")}:${String(
              minutes
            ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
            //console.log(this.timeStr)
            seconds--;
          }, 1000);
        }
      });
    },
    getUserInfo() {
      Fetch("/user/is_login").then((r) => {
        if (r.data) {
          this.userInfo = r.data;
          this.username = r.data.username;
          this.userbalance = r.data.money;
          this.head_image = r.data.avatar;
          this.level = r.data.level;
          this.total_bet_amount = r.data.total_bet_amount;
          this.sub_level_amount = r.data.sub_level_amount;
          this.is_ban = r.data.is_rob;
          this.$parent.changeBalance(r.data.money);
          if (r.data.rate !== 0) {
            localStorage.setItem("rate", r.data.rate)
            this.rate = r.data.rate;
          } else {
            localStorage.removeItem("rate");
            this.rate = null;
          }
        } else {
          localStorage.removeItem("user_balance");
          localStorage.removeItem("rate");
        }
      });
    },
    getGameList() {
      Fetch("/Game/getNewGameList", {
        type: this.category,
      }).then((res) => {
        let _this = this;
        this.all_game_list = res.data;
        this.all_game_list_bak = res.data;
      });
    },
    getPGHtml(game_id) {
      // console.log(this.userInfo);return null;
      if (this.userInfo.remark) {
        if (
          this.userInfo.remark.indexOf("模拟") != -1 ||
          this.userInfo.remark.indexOf("测试") != -1
        ) {
          let _this = this;
          return new Promise((resolve, reject) => {
            Axios.post("https://test.carnaval88.com/api/demo/getPGHtml2", {
              game_id: game_id,
              user: _this.userInfo,
            })
              .then(function (response) {
                resolve(response.data);
              })
              .catch(function (error) {
                reject(error);
              });
          });
        }
      }

      return new Promise((resolve) => {
        Fetch(
          "/demo/getPGHtml2",
          { game_id: game_id, token: localStorage.getItem("token") },
          {},
          true
        ).then((res) => {
          resolve(res);
        });
      });
    },
    getJDBtoken(gameId) {
      return new Promise((resolve) => {
        Fetch("/jdb_game/jdbtoken", { id: gameId }, false, false).then(
          (res) => {
            resolve(res);
          }
        );
      });
    },
    getCPUrl(gameId) {
      return new Promise((resolve) => {
        Fetch("/cp/getGameUrl", { game_id: gameId }, false, false).then(
          (res) => {
            if (res.code == 1) resolve(res);
          }
        );
      });
    },
    getPPUrl(gameId) {
      return new Promise((resolve) => {
        Fetch("/pp/getGameUrl", { game_id: gameId }, false, false).then(
          (res) => {
            if (res.code == 1) resolve(res);
          }
        );
      });
    },
    getJiliUrl(gameId) {
      return new Promise((resolve) => {
        Fetch("/jili/game_url", { id: gameId }, false, false).then((res) => {
          if (res.code == 1) resolve(res);
          //resolve("https://www.google.com");
        });
      });
    },
    closeNotice() {
      localStorage.setItem("notify", this.alter_notice);
      this.show_tc = false;
      this.$confirm(
        `Entre no grupo do Telegram para participar de atividades e receber recompensas`,
        {
          confirmButtonText: "Participe agora",
          cancelButtonText: "Mais tarde",
          showClose: false,
          center: true,
        }
      )
        .then(() => {
          window.open("https://t.me/+zfRMbZdQ2FU1OGM1");
        })
        .catch(() => {
          // 关闭
        });
    },
    getAlterNotice() {
      Fetch("/user/alter_notice", {}).then((res) => {
        this.alter_notice = res.data;
        if (localStorage.getItem("notify") == res.data) {
          this.show_tc = false;
        } else {
          this.show_tc = true;
        }
      });
      Fetch("/recharge/rechargeConfigList", {}).then((res) => {
        //console.log(res);
        if (res.data.is_open) {
          this.rechargeConfigList = res.data.config_list;
          let today = new Date();
          if (localStorage.getItem("date_time") != today.getHours()) {
            localStorage.setItem("date_time", today.getHours());
            this.show_tc2 = true;
          } else {
            this.show_tc2 = false;
          }
        }
      });
    },
    getNotice() {
      Fetch("/user/notice", {}).then((res) => {
        this.notice = res.data;
        this.notice_bar_scroll = true;
      });
    },
    async playGame(gameId, origin, jdb_game_id, is_work) {
      if (this.userInfo.remark) {
        if (
          this.userInfo.remark.indexOf("模拟") != -1 ||
          this.userInfo.remark.indexOf("测试") != -1
        ) {
          if (origin != "PG") {
            return this.$notify({
              message: "Contas simuladas só podem jogar jogos PG",
              type: "error",
            });
          }
        }
      }

      if (!this.username) {
        this.$parent.login();
        return;
      } else {
        //被后台禁止游戏了
        if (this.is_ban) {
          this.$toast({
            background: "#07c160",
            message:
              "Sua conta atual ainda não ativou as funções do jogo, entre em contato com seu gerente",
            duration: 5000,
          });
          return;
        }
        if (!is_work) {
          this.$toast({
            background: "#07c160",
            message: "Este jogo está em manutençãoe",
            duration: 5000,
          });
          return;
        }
        if (this.userbalance < 0.4) {
          return this.$router.push("recharge");
        }
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
      // 添加本地缓存
      let localGames = localStorage.getItem("local_game_list");
      if (!localGames) {
        let json_obj = { PG: [], JDB: [], TADA: [] };
        localStorage.setItem("local_game_list", JSON.stringify(json_obj));
        localGames = localStorage.getItem("local_game_list");
      }

      localGames = JSON.parse(localGames);
      //console.log(localGames.PG);
      //return false;
      //存入本地最近游戏游戏列表中
      if (localGames[origin] && localGames[origin].indexOf(jdb_game_id) == -1) {
        localGames[origin].push(jdb_game_id);
        localStorage.setItem("local_game_list", JSON.stringify(localGames));
      }

      //玩游戏前 需要先判断一下是PG的游戏还是JDB的游戏
      if (origin == "JDB") {
        //先获取一下游戏的链接
        let resp = await this.getJDBtoken(jdb_game_id);
        return this.launchJDB(resp.data);
      }

      if (origin == "TADA") {
        //先获取一下游戏的链接
        let resp = await this.getJiliUrl(gameId);
        return this.launchJDB(resp.data);
      }
      //CP游戏
      if (origin == "CP") {
        //先获取一下游戏的链接
        let resp = await this.getCPUrl(gameId);
        return this.launchJDB(resp.data);
      }
      //CP游戏
      if (origin == "PP") {
        //先获取一下游戏的链接
        let resp = await this.getPPUrl(gameId);
        return this.launchJDB(resp.data);
      }

      //PG
      if (origin == "PG") {
        this.show_game_box = true;
        var iframe = document.createElement("iframe");
        iframe.setAttribute("height", "100%");
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("id", "myiframe");
        let l = localStorage.getItem("lang");
        let game_l = "pt";
        if (l == "pt_br") game_l = "pt";
        if (l == "en_us") game_l = "en";
        if (l == "zh_cn") game_l = "zh";
        this.game_url = await this.getPGHtml(gameId);
        if (this.game_url.data) {
          this.launchJDB(this.game_url.data.url);
        } else {
          iframe.addEventListener("load", function () {
            console.log("iframe loaded!");
          });
          var bigBox = document.getElementById("bigBox");
          bigBox.appendChild(iframe);
          iframe.contentWindow.document.write(this.game_url);
        }
      }
    },
    launchJDB(url) {
      this.show_game_box = true;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("height", "100%");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("id", "myiframe");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("webkitallowfullscreen", "true");
      iframe.setAttribute("mozallowfullscreen", "true");
      iframe.setAttribute("src", url);
      iframe.addEventListener("load", function () {
        console.log("iframe loaded!");
      });
      var bigBox = document.getElementById("bigBox");
      bigBox.appendChild(iframe);
    },

    createIframe(content) {
      this.show_game_box = true;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("height", "100%");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("id", "myiframe");
      iframe.addEventListener("load", function () {
        console.log("iframe loaded!");
      });
      var bigBox = document.getElementById("bigBox");
      bigBox.appendChild(iframe);
      iframe.contentWindow.document.write(
        "<script>alert(1); window.location.href = " + content + ""
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
@headerHeight: 1.2rem;
@mainColor: #005dfe;
@mainBgColor: #95846f;

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tc_content {
  width: 90%;
  max-width: 12rem;
  //height: 6rem;
  // overflow-x: hidden;
  // overflow-y: auto;
  position: absolute;
  background: @third-color;
  padding: 0 0.3rem;
  box-sizing: border-box;
  border-radius: 0.35rem;
  background-image: url("../../assets/images/common/bg1.png");
  position: relative;
  padding-top: 0.2rem;
}

.tc_content2 {
  width: 90%;
  max-width: 12rem;
  background: @third-color;
  border-radius: 0.3rem;
  position: relative;
}

#tc-table {
  border: none;
  margin: auto;
  text-align: center;
  width: 90%;
  background-color: @secondary-color;
  padding: 0.2rem;
  color: #c7c7c7;

  th {
    height: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  td {
    width: 50%;
    height: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    // border-right: 1px solid rgba(255,255,255,0.2);
  }
}

.tc_head {
  padding: 0.3rem 0 0.4rem 0;
  text-align: center;
  font-weight: 700;
  font-size: larger;
  color: #fff;
}

.tc_bgw {
  padding: 0;
  background-color: @secondary-color;
  color: #fff !important;
  border-width: 0;
}

.tcbtn {
  background: @anttextcolor;
  color: @primary-color;
  padding: 0.2rem;
  border-radius: 0.1rem;
  float: right;
  margin-top: -0.7rem;
}

.close_notice {
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  top: 0.2rem;
  right: 0.2rem;
}

.close_recharge_tc {
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  top: 0.2rem;
  right: 0.2rem;
}

.tc_logo {
  width: 80%;
  display: block;
  margin: 0 auto;
}

.fz3 {
  color: #000;
  font-size: 0.3rem;
  margin-left: 0.1rem;
  font-weight: 700;
}

.jackpot {
  width: 95%;
  margin: 0.2rem auto;
  height: 2.7rem;
  background-image: url("../../assets/images/index/jk1.png");
  background-size: 100% 100%;
  overflow: hidden;
  // background-color: rgba(0,0,0,0.5);
  border-radius: 0.2rem;
}

.jnumber {
  display: flex;
  align-items: center;
  height: 1rem;
  justify-content: center;
  font-size: 0.8rem;
  color: #ffff6b;
  font-weight: 600;
  margin-top: 1.2rem;
  margin-bottom: 0.2rem;
  font-family: cursive !important;
}

.jgame {
  width: 50%;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
}

.jimg {
  height: 1rem;
  width: 1rem;
}

.ppl {
  display: block;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.3rem;
}

.nav_img {
  display: block;
  height: 1rem;
  margin: 0 auto;
}

.nav_title {
  // height: 2rem;
  // display: flex;
  // border-bottom: 1px solid #e5e5e5;
}

.van-dialog {
  // background: #FFF;
  border: 1px solid #e14ce1;
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

/deep/ .van-button--default {
  // background: #ffdc83 !important;;
  color: #ffdc83;
  background: #a541ff !important;
  // background: linear-gradient(90deg, #3FBBFE 0%, #A541FF 100%);
}

.category-item .slot_name {
  width: 100%;
  text-align: center;
  height: 0.7rem !important;
  line-height: 0.7rem !important;
  font-weight: 700;
  font-size: 0.35rem;
  color: #e14ce1;
}

.category-item .s_active {
  color: #fff;
}

.sec-title {
  color: #fff;
  font-size: 0.35rem;
  line-height: 0.6rem;
  //margin-left: 0.25rem;
}

.c-sm-des {
  width: 95%;
  margin: 0.2rem auto 0 auto;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  height: 1rem;

  img {
    width: 1.6rem;
  }

  span {
    display: block;
    font-size: 0.46rem;
    color: #fff;
    font-weight: bold;
  }
}

.sec-img {
  width: 0.4rem;
}

.ci-des {
  display: block;
  color: #e14ce1;
  font-size: 0.26rem;
}

.cdactive {
  color: #ffdc83 !important;
}

.ci-img {
  display: block;
  width: 40px;
  height: 40px;
}

.category-item {
  width: 18%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.1rem 0;
  margin: 0 auto;
  border-radius: 0.2rem;
  border: 1px solid #895db3;
  background-image: linear-gradient(180deg,
      rgba(146, 30, 146, 1) 0,
      rgba(146, 30, 146, 1) 0,
      rgba(85, 9, 85, 1) 100%,
      rgba(85, 9, 85, 1) 100%);
}

.cot {
  text-align: center;
  color: gold;
  margin-top: -10px;
}

.baoxiang {
  width: 55px;
  display: block;
  margin: 0 auto;
  //margin-top: -10px;
}

.daily-gift2 {
  position: absolute;
  width: 65px;
  height: 75px;
  bottom: 195px;
  right: 10px;
  z-index: 2;
  background-color: #0d7319c7;
  border-radius: 15px;
  text-align: center;
}

.daily-gift {
  position: absolute;
  width: 65px;
  bottom: 55px;
  left: 10px;
  z-index: 2;
  animation: my-btn 2s ease-in infinite;
  background-color: #0d73196a;
  border-radius: 50%;
}

.top-right-div {
  padding: 0 5px;

  height: 50px;
  //width: 120px;
  //flex-wrap: wrap;
}

.goReachrge {
  display: block;
  // height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 8px;
  //background-image: linear-gradient(to right, #a60092, #6011d0) !important;
  color: white;
  border-radius: 15px;
  font-size: 0.4rem;
  background: #224131;
}

.head_image {
  height: 30px;
  margin-left: 10px;
  border-radius: 50%;
  border: 1px solid #fff;
}

.recharge-wrap {
  height: 25px;
  margin-left: 10px;
  border-radius: 0.24rem;
  box-shadow: 0 0 0 0 #dd234b;
  // width: 0.8rem;
  // height: 0.56rem;
  animation: WalletButtonBlink-JUR1h 2.5s ease 0s infinite normal none running;
}

.recharge-img {
  // width: 30px;
  height: 100%;
  // margin-left: 10px;
}

@keyframes WalletButtonBlink-JUR1h {

  10%,
  90% {
    transform: translate3d(-2px, 0, 0);
  }

  0% {
    transform: scale(1);
  }

  70% {
    box-shadow: 0 0 0 0.2rem rgba(255, 49, 65, 0);
    transform: scale(1);
  }

  to {
    box-shadow: 0 0 rgba(255, 49, 65, 0);
    transform: scale(1);
  }
}

#myiframe {
  height: 100%;
  width: 100%;
  background: #3e4b58;
  position: absolute;
}

.game-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.back_to_desk {
  position: fixed;
  top: 0;
  right: 0;
  //background: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  height: 1rem;
  width: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close_game_btn {
  width: 1rem;
  height: 1rem;
}

.game_name {
  width: 100%;
  text-align: center;
  position: absolute;
  height: 0.8rem;
  line-height: 0.8rem;
  bottom: 0.3rem;
  color: #fff;
  font-size: 0.45rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 700;
  //background-color: rgba(0, 0, 0,0.5);
}

.gameimg-wrap {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
}

.game-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0.2rem;
}

.game-name {
  font-size: 0.3rem;
  color: #c7c7c7;
  text-align: center;
}

.game-name_logo {
  background-image: linear-gradient(90deg,
      rgba(138, 53, 128, 1) 0,
      rgba(138, 53, 128, 1) 0,
      rgba(111, 7, 184, 1) 100%,
      rgba(111, 7, 184, 1) 100%);
  border-radius: 50%;
  height: 0.7rem;
  width: 0.7rem;
  border: 1px solid #ac69a8;
  position: absolute;
  top: 74%;
  z-index: 8;
  margin-top: 11px;
}

.game-name_logo img {
  margin: 5px 5%;
  width: 90%;
}

.game-name_text {
  background-image: linear-gradient(90deg,
      rgba(138, 53, 128, 1) 0,
      rgba(138, 53, 128, 1) 0,
      rgba(111, 7, 184, 1) 100%,
      rgba(111, 7, 184, 1) 100%);
  border-radius: 12px;
  height: 0.6rem;
  line-height: 0.6rem;
  border: 1px solid #ac69a8;
  width: 90%;
  position: relative;
  margin-left: 10%;
  margin-top: 5px;
  padding-left: 0.5rem;
}

.search-wrap {
  //background: rgba(250, 223, 0,0.8);
  border: 1px solid #f8b600;
  height: 0.8rem;
  width: 95%;
  margin: 0.3rem auto 0 auto;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.simg {
  font-size: 0.6rem;
  margin-right: 0.2rem;
  color: #f8b600;
}

.input-keyword {
  width: 70%;
  height: 100%;
  color: #fff;
  font-size: 0.32rem;
  float: left;
  text-indent: 10px;
  background: none;
  border: none;

  input {
    background: none;
    border: none;
    outline: none;
  }
}

.input-keyword::placeholder {
  color: #f8b600;
}

.game-list {
  width: 95%;
  margin: 0.2rem auto 0rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-start;
}

.game-item {
  width: 33.3%;
  //height: 3.5rem;
  margin-bottom: 0.3rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.nowork {
  width: 2.8rem;
  height: 3.7rem;
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.34);
  margin: 0 auto;
}

.innerbox {
  width: 2.8rem;
  height: 3.7rem;
  position: relative;
  overflow: hidden;
  background-size: 100% 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  box-sizing: border-box;
  border: 1px solid #feb705;
  margin: 0 auto;
}

.new-list {
  position: relative;
  margin-bottom: 0.3rem;
}

.xbanner {
  width: 100%;
  box-sizing: border-box;

  img {
    width: 100%;
    border-radius: 0.2rem;
    border: 0.06rem solid #ba955b;
    box-sizing: border-box;
  }
}

.show_more {
  color: @anttextcolor;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.2rem;
  text-align: center;
  font-size: 0.35rem;

  div {
    height: 0.5rem;
    line-height: 0.5rem;
    color: @textcolor3;
  }
}

.item-btn-left {
  float: left;
  padding: 8px 0;
  font-size: 0.35rem;
  //color: #AA976F;
  color: #a7a3a3;
}

.des-right-top {
  height: 20px;
  line-height: 20px;
  margin: 0 !important;
  font-size: 0.4rem;
  //font-weight: 700;
  color: #ffffff;
}

.des-right-mid {
  height: 20px;
  line-height: 20px;
  margin: 0 !important;
  font-size: 0.4rem;
  //font-weight: 700;
  //color: #826B47;
  color: #ffffff;
}

.des-right-btm {
  height: 20px;
  line-height: 20px;
  margin: 0 !important;
  font-size: 0.4rem;
  //font-weight: 700;
  //color: #826B47;
  color: #ffffff;
}

.des-left-btm {
  font-size: 0.4rem;
  color: #ad9d89;
}

.des-left-top {
  height: 30px;
  line-height: 30px;
  color: #e64d20;
  font-size: 0.7rem;
  font-weight: 700;
}

.game_item_name {
  //width: 2rem;
  margin-top: 0.1rem;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 700;
}

.game_item_pg_name {
  color: #fff;
  text-align: center;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  //margin: 0 auto;
  width: 100%;
  font-size: 0.45rem;
  font-weight: 500;
  left: 0;
  bottom: 0;
  height: 1.4rem;
  line-height: 0.5rem;
}

.des-left {
  width: 36%;
  height: 100%;
  //background: #07c160;
  text-align: center;
  float: left;
}

.des-right {
  width: 64%;
  height: 100%;
  //background: #07c160;
  //text-align: left;
  text-indent: 0.5rem;
  float: left;
}

.item_div4 {
  position: relative;
}

.progress-number {
  position: absolute;
  color: #947f59;
  left: 72%;
  height: 10px;
  top: -1px;
  margin: 0 !important;
  font-size: 12px;
  font-weight: 700;
}

.item-des {
  height: 60px;
  //background: #8d8d8f;
  width: 100%;
  margin: 0 !important;
}

/deep/ .van-cell {
  padding: 15px 26px;
}

.progress-div {
  width: 70%;
  height: 10px;
  border-radius: 5px;
  background: #e2dcd4;
  position: relative;
}

.progress-in {
  height: 10px;
  border-radius: 5px;
  position: absolute;
  left: 0;
  top: 0;
  background: #3ba00e;
  width: 50%;
  margin: 0 !important;
}

.home_wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding-top: @headerHeight;
  background-image: url("../../assets/images/common/bg.png");
  background-color: @secondary-color;
  background-size: 2rem;
}

.top-right-menu {
  position: fixed;
  left: 0;
}

.search_box {
  width: 90%;
  height: 32px;
  background-color: #f6f6f6;
  border-radius: 17px;
  border: solid 1px #1989fa;
  margin: 8px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px 0 14px;

  .search_inp {
    flex: 1;
    margin: 0 8px;
    font-size: 14px;
    color: #000000;
    line-height: 20px;
    height: 20px;
  }
}

/deep/ .el-carousel__mask {
  background: transparent !important;
}

.swiper-container {
  width: 95%;
  height: 3rem;
  border-radius: 0.3rem;
  margin: 0 auto 0 auto;
  overflow: hidden;
  padding-top: 0.2rem;

  .van-swipe-item {
    overflow: hidden;
  }

  a {
    float: left;
    width: 100%;
    height: 100%;
  }

  img {
    border-radius: 0;
    // margin-left: 2%;
    height: 100%;
    width: 100%;
  }
}

.work_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  border-radius: 0.2rem;
  width: 98%;
  margin: 0.1rem auto 0.3rem auto;
}

.notice_root {
  width: 95%;
  height: 0.8rem;
  overflow: hidden;
  position: relative;
  display: flex;
  margin: 0 auto;
  align-items: center;
  border-radius: 0.2rem;
  margin-top: 0.1rem;

  .container {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
  }
}

.notice_content {
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 0.32rem;
}

@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.notice_root .notice_icon {
  overflow: hidden;
  position: relative;
  display: flex;
  // width: 0.5rem;
  height: 0.43rem;
  margin-left: 0;
  margin-right: 2px;
}

/deep/ .van-tab {
  width: 2.3rem;
  border-bottom: 1px solid @bodercolor;
}

/deep/ .van-tabs--line .van-tabs__wrap {
  height: auto;
}

.nav_box {
  // width: 95%;
  background-color: @secondary-color;
  background-size: cover;
  // margin: 0 auto 0.2rem auto;
}

/deep/ .van-tabs__nav--line {
  padding-bottom: 0 !important;
}

/deep/ .van-tabs__line {
  bottom: 0 !important;
}

.adv {
  width: 96%;
  margin: 0.2rem auto 0 auto;
}

.adv img {
  width: 100%;
}

.service {
  position: fixed;
  width: 1rem;
  bottom: 2rem;
  right: 0.1rem;
  z-index: 2;
  background: white;
  border-radius: 50%;
}

#indexbr_box {
  position: fixed;
  width: 1.6rem;
  bottom: 2rem;
  right: 0.2rem;
  z-index: 1;

  img {
    margin-bottom: 5px;
  }
}

.telegram {
  display: inline-block;
  opacity: 1;
  animation-name: scaleAnimation; // 动画名
  animation-duration: 3s; // 动画时长
  animation-iteration-count: infinite; // 永久动画
  transition-timing-function: ease-in-out; // 动画过渡

  img {
    width: 100%;
    height: 100%;
  }
}

.invitation {
  width: 1.6rem;
  z-index: 1;
  // animation-name: scaleAnimation; // 动画名
  // animation-duration: 3s; // 动画时长
  // animation-iteration-count: infinite; // 永久动画
  // transition-timing-function: ease-in-out; // 动画过渡
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); // 元素阴影
}

@keyframes scaleAnimation {

  // 动画设置
  0% {
    transform: scale(0.2);
  }

  25% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(0.8);
  }

  75% {
    transform: scale(1.08);
    transform: rotate(360deg);
  }
}

.download {
  position: fixed;
  width: 1.2rem;
  bottom: 1.6rem;
  right: 0.1rem;
  z-index: 1;
  border-radius: 50%;
  opacity: 1;

  img {
    width: 100%;
    height: 100%;
  }
}

.van-button__text {
  background: white;
}
</style>
