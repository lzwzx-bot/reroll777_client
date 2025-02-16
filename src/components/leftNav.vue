<template>
  <div class="bgwrap" @click="$parent.show_left_nav = false">
    <div class="left_nav" @click.stop="a = 1">
      <!--游戏类型-->
      <div class="game_type">
        <div
          class="game_item"
          :class="active_menu == 0 ? 'active' : ''"
          @click="goMenu(0)"
        >
          <img v-if="active_menu==0" class="game_img" src="../assets/images/category/HOTa.png" >
          <img v-else class="game_img" src="../assets/images/category/HOT.png" />
          <div class="game_name">Popular</div>
        </div>
        <div
          class="game_item"
          :class="active_menu == 1 ? 'active' : ''"
          @click="goMenu(1)"
        >
        <img v-if="active_menu==1" class="game_img" src="../assets/images/category/PGa.png" >
          <img v-else class="game_img" src="../assets/images/category/PG.png" />
          <div class="game_name">PG</div>
        </div>
        <div
          class="game_item"
          :class="active_menu == 2 ? 'active' : ''"
          @click="goMenu(2)"
        >
          <img v-if="active_menu==2" class="game_img" src="../assets/images/category/PPa.png" >
          <img v-else class="game_img" src="../assets/images/category/PP.png" />
          <div class="game_name">PP</div>
        </div>
        <div
          class="game_item"
          :class="active_menu == 3 ? 'active' : ''"
          @click="goMenu(3)"
        >
          <img v-if="active_menu==3" class="game_img" src="../assets/images/category/TADAa.png" >
          <img v-else class="game_img" src="../assets/images/category/TADA.png" />
          <div class="game_name">TADA</div>
        </div>
        <div
          class="game_item"
          :class="active_menu == 4 ? 'active' : ''"
          @click="goMenu(4)"
        >
        <img v-if="active_menu==4" class="game_img" src="../assets/images/category/JDBa.png" >
          <img v-else class="game_img" src="../assets/images/category/JDB.png" />
          <div class="game_name">JDB</div>
        </div>
        <div
          class="game_item"
          :class="active_menu == 5 ? 'active' : ''"
          @click="goMenu(5)"
        >
        <img v-if="active_menu==5" class="game_img" src="../assets/images/category/CPa.png" >
          <img v-else class="game_img" src="../assets/images/category/CP.png" />
          <div class="game_name">CP</div>
        </div>
        <!--        <div class="game_item">-->
        <!--          <img src="../assets/images/common/10.png" class="game_img" alt="">-->
        <!--          <div class="game_name">Popular</div>-->
        <!--        </div>-->
      </div>

      <!-- MP3播放器-->
      <div class="mp3_player">
        <audio-player
          ref="audioPlayer"
          :audio-list="audioList.map((elm) => elm.url)"
          :before-play="handleBeforePlay"
          :show-progress-bar="false"
          :show-playback-rate="false"
          theme-color="#fff0bb"
        />
        <div class="music_name">
          {{ currentAudioName || audioList[0].name }}
        </div>
      </div>

      <div class="game_record" @click="$router.push('gameRecord')">
        <div class="grsvg">
            <img src="../assets/images/leftNav/record.png" alt="">
        </div>
        <div class="grt">Recordes de Apostas</div>
      </div>

      <div class="active_record">
        <div class="active_item acbg1" @click="$router.push('person');$parent.show_left_nav=false;">
          Perfil
        </div>
        <div class="active_item acbg7" @click="$router.push('share');$parent.show_left_nav=false;">
          Convidar
        </div>
        <div class="active_item acbg2" @click="$router.push('betReward');$parent.show_left_nav=false;">
          Rebate
        </div>
        <div class="active_item acbg3" @click="$router.push('recharge');$parent.show_left_nav=false;">
          Depósito
        </div>
        <div class="active_item acbg4" @click="$router.push('withdraw');$parent.show_left_nav=false;">
          Saque
        </div>
        <div class="active_item acbg5" @click="$router.push('agentData');$parent.show_left_nav=false;">
          Meus Indicados
        </div>
        <div class="active_item acbg6" @click="$router.push('vip');$parent.show_left_nav=false;">VIP</div>
      </div>

      <div class="other_list">
        <!-- <a
          href="https://download.10000xbet.com/"
          target="_blank"
          class="other_item"
        >
          <div class="icon-wrap"><van-icon name="down" /></div>
          <div class="other_text">Baixar App</div>
        </a> -->
        <div class="other_item" @click="goSupport">
          <div class="icon-wrap"><van-icon name="service-o" /></div>
          <div class="other_text">Suporte</div>
        </div>
        <div class="other_item" @click="goSupport">
          <div class="icon-wrap"><van-icon name="question-o" /></div>
          <div class="other_text">FAQ</div>
        </div>
        <div class="other_item" @click="logout()">
          <div class="icon-wrap">
            <van-icon name="stop-circle-o" />
          </div>
          <div class="other_text">Sair</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Fetch from "../utils/fetch";
import AudioPlayer from "@liripeng/vue-audio-player";

import { Icon, Cell, CellGroup, Collapse, CollapseItem } from "vant";

Vue.use(Cell).use(CellGroup).use(Icon).use(Collapse).use(CollapseItem);

export default {
  name: "User",
  components: {
    AudioPlayer,
  },
  data() {
    return {
      activeNames: ["1","2"],

      currentAudioName: "",
      active_menu: 0,
      audioList: [
        // {
        //     name: 'Despacito',
        //     url: 'https://lx-sycdn.kuwo.cn/b5979ae8092fc177a15a4cef6bf8d180/65b1400f/resource/n3/17/14/4121472792.mp3'
        // },
        {
          name: "You Spin Me Round",
          url: "https://company-fj.s3.ap-east-1.amazonaws.com/siteadmin%2Fupload%2Fmusic%2FYou+Spin+Me+Round.mp3",
        },
        {
          name: "Yesterday",
          url: "https://company-fj.s3.ap-east-1.amazonaws.com/siteadmin%2Fupload%2Fmusic%2FYesterday.mp3",
        },
        {
          name: "See You Again",
          url: "https://company-fj.s3.ap-east-1.amazonaws.com/siteadmin%2Fupload%2Fmusic%2FWiz+Khalifa+-107.+See+You+Again+ft.+Charlie+Puth+%5BOfficial+Video%5D+Furious+7+Soundtrack.mp3",
        },
        {
          name: "Without You",
          url: "https://company-fj.s3.ap-east-1.amazonaws.com/siteadmin%2Fupload%2Fmusic%2FWithout+You.mp3",
        },
        {
          name: "Live It Up",
          url: "https://company-fj.s3.ap-east-1.amazonaws.com/siteadmin%2Fupload%2Fmusic%2FWill+Smith-9.Live+It+Up.mp3",
        },
        {
          name: "Waiting for Love",
          url: "https://company-fj.s3.ap-east-1.amazonaws.com/siteadmin%2Fupload%2Fmusic%2FWaiting+for+Love.mp3",
        },
        {
          name: "Wait Wait Wait",
          url: "https://company-fj.s3.ap-east-1.amazonaws.com/siteadmin%2Fupload%2Fmusic%2FWait+Wait+Wait.mp3",
        },
      ],
    };
  },
  created() {},
  mounted() {

  },
  methods: {
    goMenu(idx) {
      // this.$parent
      this.active_menu = idx;
      if (this.$router.currentRoute.name != "index") {
        this.$router.push({
          path: "index",
          params: {
            nav: idx,
          },
        });
      } else {
        this.$bus.$emit("send2index", idx);
      }
    },
    onOpen(event) {
      Toast(`展开: ${event.detail}`);
    },
    onClose(event) {
      Toast(`关闭: ${event.detail}`);
    },
    // 播放前做的事
    handleBeforePlay(next) {
      // 这里可以做一些事情...
      this.currentAudioName =
        this.audioList[this.$refs.audioPlayer.currentPlayIndex].name;

      next(); // 开始播放
    },

    goSupport() {
      this.$notify.success({
        title: "atendimento ao Cliente",
        message: "Equipe ao seu serviço 24 horas por dia, 7 dias por semana",
      });
      this.$router.push("support");
    },
    logout() {
      Fetch("/user/logout").then((r) => {
        //console.log(r);
        if (r.code == 1) {
          localStorage.removeItem('user_balance');
          this.$router.go(0);
          localStorage.removeItem("token");
          
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import  "../assets/css/variables.less";
.other_item {
  width: 80%;
  display: flex;
  margin-bottom: 0.3rem;
}
.icon-wrap {
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5em;
  background: @textcolor3;
  border-radius: 50%;
  text-align: center;
  font-weight: 700;
  color: #111;
  font-size: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.other_text {
  height: 0.5rem;
  line-height: 0.5rem;
  text-indent: 0.2rem;
  color:#f5f5f5;
  font-size: 0.28rem;
}
.mp3_player {
  width: 94%;
  background: @third-color;
  margin: 0 auto 0.1rem auto;
  //overflow: hidden;
  border-radius: 0.2rem;
  padding: 0.2rem 0.1rem;
  box-sizing: border-box;
}
.music_name {
  text-align: center;
  color: @textcolorf;
  font-weight: bold;
  //margin-top: 0.2rem;
}
.game_record {
  width: 94%;
  background: @third-color;
  margin: 0 auto 0.2rem auto;
  //overflow: hidden;
  border-radius: 0.2rem;
  padding: 0.2rem 0.4rem;
  box-sizing: border-box;
  color: @textcolorf;
  
  display: flex;
  justify-content: flex-start;
}
.other_list {
  width: 94%;
  //background: #303030;
  margin: 0 auto 0.2rem auto;
  //overflow: hidden;
  border-radius: 0.2rem;
  padding: 0.2rem 0.1rem;
  box-sizing: border-box;
  color: @textcolorf;
}
.active_record {
  width: 94%;
  background: @third-color;
  margin: 0 auto 0.2rem auto;
  border-radius: 0.2rem;
  padding: 0.1rem 0.05rem;
  box-sizing: border-box;
  color: @textcolorf;
  display: flex;
  flex-wrap: wrap;
}
.active_item {
  width: 48%;
  margin: 0 2% 0.2rem 0%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 0.2rem;
  height: 1.1rem;
  color: @textcolorf;
  font-size: 0.2rem;
  text-indent: 0.1rem;
  line-height: 0.5rem;
}
.acbg1 {
  background-image: url("../assets/images/index/bg01.png");
}
.acbg2 {
  background-image: url("../assets/images/index/bg02.png");
}
.acbg3 {
  background-image: url("../assets/images/index/bg03.png");
}
.acbg4 {
  background-image: url("../assets/images/index/bg04.png");
}
.acbg5 {
  background-image: url("../assets/images/index/bg05.png");
}
.acbg6 {
  background-image: url("../assets/images/index/bg06.png");
}
.acbg7 {
  background-image: url("../assets/images/index/bg08.png");
}
.grsvg {
  display: flex;
}
.grsvg img {
  height: 0.7rem;
}
.grt {
  width: 60%;
  text-align: center;
  padding-left: .2rem;
  font-weight: 700;
}

.left_nav {
  width: 4rem;
  height: 100%;
  background: @secondary-color;
  margin-top: 1.2rem;
  border-top: 2px solid gold;
}

.bgwrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 4;
  overflow: hidden;
}

.game_type {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0.35rem;
}

.game_item.active {
  color:#fff;
  background-color: @primary-color;
}

.game_item {
  width: 42%;
  margin: 0 2% 0.2rem 5%;
  border-radius: 0.2rem;
  padding: 0.15rem 0;
  color:#fff;
  background-color: @third-color;

}

.game_img {
  width: 1rem;
  //height: 0.4rem;
  display: block;
  margin: 0 auto;
}

.game_name {
  text-align: center;
  font-size: 0.22rem;
  //margin-top: 0.1rem;
}
</style>