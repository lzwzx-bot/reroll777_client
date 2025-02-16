<template>
  <div class="home_wrap">
    <van-nav-bar
      title="Pesquisar jogos"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 搜索 -->
    <div v-show="true" class="search-wrap">
      <input
        v-model="keyword"
        class="input-keyword"
        type="text"
        :placeholder="$t('请输入游戏名称')"
      />
      <van-icon name="search" class="simg" />
    </div>
    <div >
      <!-- <div id="game-left-bg" style="width: 24%">
        <div
          class="game-left-item"
          @click="changeLeftNav(0)"
          :class="nav_active == 0 ? 'nav_ac' : ''"
        >
          <img
            v-if="nav_active == 0"
            class="nav_img"
            src="../../assets/images/category/HOTa.png"
          />
          <img
            v-else
            class="nav_img"
            src="../../assets/images/category/HOT.png"
          />
          <span class="ppl">Popular</span>
        </div>
        <div
          class="game-left-item"
          @click="changeLeftNav(1)"
          :class="nav_active == 1 ? 'nav_ac' : ''"
        >
          <img
            v-if="nav_active == 1"
            class="nav_img"
            src="../../assets/images/category/PGa.png"
          />
          <img
            v-else
            class="nav_img"
            src="../../assets/images/category/PG.png"
          />
          <span class="ppl">PG Slots</span>
        </div>
        <div
          class="game-left-item"
          @click="changeLeftNav(2)"
          :class="nav_active == 2 ? 'nav_ac' : ''"
        >
          <img
            v-if="nav_active == 2"
            class="nav_img"
            src="../../assets/images/category/PPa.png"
          />
          <img
            v-else
            class="nav_img"
            src="../../assets/images/category/PP.png"
          />
          <span class="ppl">PP GAME</span>
        </div>
        <div
          class="game-left-item"
          @click="changeLeftNav(3)"
          :class="nav_active == 3 ? 'nav_ac' : ''"
        >
          <img
            v-if="nav_active == 3"
            class="nav_img"
            src="../../assets/images/category/TADAa.png"
          />
          <img
            v-else
            class="nav_img"
            src="../../assets/images/category/TADA.png"
          />
          <span class="ppl">TADA</span>
        </div>
        <div
          class="game-left-item"
          @click="changeLeftNav(4)"
          :class="nav_active == 4 ? 'nav_ac' : ''"
        >
          <img
            v-if="nav_active == 4"
            class="nav_img"
            src="../../assets/images/category/JDBa.png"
          />
          <img
            v-else
            class="nav_img"
            src="../../assets/images/category/JDB.png"
          />
          <span class="ppl">JDB</span>
        </div>
        <div
          class="game-left-item"
          @click="changeLeftNav(5)"
          :class="nav_active == 5 ? 'nav_ac' : ''"
        >
          <img
            v-if="nav_active == 5"
            class="nav_img"
            src="../../assets/images/category/CPa.png"
          />
          <img
            v-else
            class="nav_img"
            src="../../assets/images/category/CP.png"
          />
          <span class="ppl">CP</span>
        </div>
      </div> -->
      <div id="game-right-bg" >
        <div
          v-for="(game, idx) in all_game_list"
          :id="'game' + idx"
          :key="idx"
          class="new-list"
        >
          <div v-for="(game_t, tidx) in game" :key="tidx">
            <div class="c-sm-des">
              <img
                src="../../assets/images/common/title_left.png"
                class="sec-img"
              />
              <span class="sec-title">{{ idx + " " + tidx }}</span>
              <img
                src="../../assets/images/common/title_right.png"
                class="sec-img"
              />
            </div>
            <div class="game-list">
              <div
                v-for="(item, index) in game_t"
                v-show="index < step_show"
                :key="index"
                class="subgame-item"
                @click="
                  playGame(item.game_id, item.origin, item.id, item.is_works)
                "
              >
                <img
                  v-if="!item.is_works"
                  src="../../assets/images/common/nowork.png"
                  class="nowork"
                />
                <div v-lazy:background-image="item.img" class="innerbox" :class="idx + '_innerbox'">
                <div v-if="item.origin != 'CP'"  class="subgame_item_pg_name">
                  {{ item.game_name }}
                </div></div>
                
              </div>
              <div
                v-show="game_t.length > step_show"
                class="show_more"
                @click="showMore(idx)"
              >
                <div>
                  A exibir {{ step_show }} jogos entre
                  {{ game_t.length }} Popular jogos
                </div>
                Mostre mais ⇊
              </div>
            </div>
          </div>
        </div>
        <!-- 分页栏 -->
        <!-- <div
          id="geme-page"
          style="
            position: fixed;
            bottom: 8%;
            left: 20%;
            right: 0;
            display: flex;
          "
        >
          <van-pagination
            v-model="currentPage"
            :page-count="pagecount"
            :total-items="all_game_list.length"
            :items-per-page="perPage"
            @change="PageChange"
            force-ellipses
          />
        </div> -->
      </div>
    </div>
    <div v-show="show_game_box" id="bigBox" class="game-box">
      <!--    <div class="game-box" id="bigBox" v-show="true">-->
      <!-- <iframe :src="game_url" frameborder="0" id="myiframe"></iframe> -->
      <div class="back_to_desk">
        <img
          src="../../assets/images/common/close.png"
          class="close_game_btn"
          @click="beforeCloseGame()"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import { NavBar, Lazyload, Pagination } from "vant";
import Fetch from "../../utils/fetch";
Vue.use(NavBar).use(Pagination).use(Lazyload, {
  lazyComponent: true,
});

export default {
  name: "subGame",
  components: {},
  data() {
    return {
      lang: this.$i18n.locale || "zh_cn",
      keyword: "",
      gamestile: "Slots",
      all_game_list: [],
      all_game_list_bak: [],
      page_game_list: [],
      nav_active: 0,
      perPage: 30,
      step_show: 28,
      max_show_array: [6, 6, 6, 6],
      currentPage: 1,
      category: "slots",
      show_game_box: false,
      is_ban: 0,
      username: null,
      i: 0,
      pagecount: 8,
    };
  },
  watch: {
    pagecount: function (newn, oldn) {
      console.log(newn, oldn);
    },

    keyword: function (newn) {
      if (newn == "") {
        this.all_game_list = this.all_game_list_bak;
        return;
      }
      this.all_game_list = { GAMES: { Resultados: [] } };
      let allGames = [];
      for (var k in this.all_game_list_bak) {
        //console.log(k);
        for (var t in this.all_game_list_bak[k]) {
          //console.log(t);
          this.all_game_list_bak[k][t].forEach((item) => {
            //console.log(item);
            if (item.game_name.toLowerCase().search(newn.toLowerCase()) != -1) {
              allGames.push(item);
            }
          });
        }
      }
      this.all_game_list = { GAMES: { Resultados: allGames } };
    },
  },
  created() {
    this.getGameList();
    this.getUserInfo();
  },
  mounted() {},
  methods: {
    PageChange() {
      console.log(1);
      this.all_game_list = [];
      let allGames = [];
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      if (this.nav_active == 0) {
        allGames = this.all_game_list_bak[0].game_list.concat(
          this.all_game_list_bak[1].game_list
        );
        //this.pagecount = Math.ceil(allGames.length / this.perPage);
      } else if (this.nav_active == 1) {
        allGames = this.all_game_list_bak[0].game_list;
      } else if (this.nav_active == 2) {
        allGames = this.all_game_list_bak[1].game_list;
      }
      const gameKeys = Object.keys(allGames);
      let res = [];
      for (let i = startIndex; i < endIndex && i < gameKeys.length; i++) {
        const key = gameKeys[i];
        const value = allGames[key];
        res.push(value);
      }
      this.all_game_list.push({
        origin: "Slots",
        game_list: res,
      });
      console.log(this.all_game_list);
    },
    beforeCloseGame() {
      Fetch("/box/getTodaybetInfo", {}, false, true).then((r) => {
        this.todayInfo = r.data;
        this.$confirm(
          `Você apostou ${r.data.today_bet_amount} e completou ${
            r.data.percent
          }%, restando ${
            100 - r.data.percent
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
      this.step_show += 28;
    },

    getGameList() {
      Fetch("/Game/getNewGameList", {
        type: this.category,
      }).then((res) => {
        this.all_game_list = res.data;
        this.all_game_list_bak = res.data;
      });
    },
    changeLeftNav(idx) {
      this.tabChange(idx);
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
    getUserInfo() {
      Fetch("/user/is_login").then((r) => {
        if (r.data) {
          this.userInfo = r.data;
          this.username = r.data.username;
          this.userbalance = r.data.money;
          this.is_ban = r.data.is_rob;
        } else {
        }
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
        if (is_work == 0) {
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
    getPGHtml(game_id) {
      // console.log(this.userInfo);return null;
      if (this.userInfo.remark) {
        if (
          this.userInfo.remark.indexOf("模拟") != -1 ||
          this.userInfo.remark.indexOf("测试") != -1
        ) {
          let _this = this;
          return new Promise((resolve, reject) => {
            Axios.post("https://test.carnaval88.com/api/demo/getPGHtml", {
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
        Fetch('/cp/getGameUrl', {game_id: gameId}, false, false).then(res => {
          if (res.code == 1) resolve(res);
        })
      })
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
    onClickLeft() {
      this.$router.push("/");
    },
  },
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

// .home_wrap{
//   background-color: #1c1c1c;
// }
.search-wrap {
  //background: rgba(250, 223, 0,0.8);
  border: 1px solid @anttextcolor;
  height: 0.8rem;
  width: 95%;
  margin: 0.3rem auto 0.1rem auto;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.simg {
  font-size: 0.6rem;
  margin-right: 0.2rem;
  color: @anttextcolor;
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
  color: @anttextcolor;
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
.game-left-item {
  width: 78%;
  color: #c7c7c7;
  background: #303030;
  border-radius: 0.2rem;
  // border-radius: 48%;
  margin: 0.2rem 0 0.4rem 0.1rem;
  padding: 0.02rem 0;
  text-align: center;
}

.nav_ac {
  color: #000;
  background-color: #f8b600;
}

.nav_img {
  display: block;
  width: 1.2rem;
  margin: 0 auto;
}

.game-list {
  width: 95%;
  margin: 0.2rem auto 0rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-start;
}

.subgame-item {
  width: 33.3%;
  margin-bottom: 0.3rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.new-list {
  position: relative;
  margin-bottom: 0.3rem;
}

.nowork{
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
.subgame_item_pg_name {
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
  height: 1.1rem;
  line-height: 0.5rem;
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

.c-sm-des {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border-radius: 4px;
  height: 0.8rem;

  img {
    width: 1.8rem;
  }
}
.sec-title {
  color: #fff;
  font-size: 0.35rem;
  line-height: 0.6rem;
  //margin-left: 0.25rem;
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
</style>
