<template>
  <div class="home_wrap">
    <van-nav-bar
      title="Membro da equipe"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="table_wrap">
      <div class="sort_btn">
        <button
          :class="current_lvl == 0 ? 'active' : ''"
          @click="getSubUsers(0)"
        >
          Nível A
        </button>
        <button
          :class="current_lvl == 1 ? ' active' : ''"
          @click="getSubUsers(1)"
        >
          Nível B
        </button>
        <button
          :class="current_lvl == 2 ? ' active' : ''"
          @click="getSubUsers(2)"
        >
          Nível C
        </button>
      </div>
      <div v-show="true" class="search-wrap">
        <input
          v-model="keyword"
          class="input-keyword"
          type="text"
          placeholder="Digite o ID do usuário para pesquisar."
        />
        <van-icon name="search" class="simg" />
      </div>

      <ul>
        <li v-for="(item, idx) in users" :key="idx" v-show="idx < step_show">
          <div class="team_item">
            <div class="team_item_left" @click="doCopy(item.id)">
              {{ item.id }}
              <img src="../../assets/images/share/copy_h.png" alt="" />
            </div>
            <div>
              Aposta
              <span style="padding-left: 0.2rem">{{
                item.total_bet_amount
              }}</span>
            </div>
          </div>

          <div class="team_item">
            <div class="team_item_left">{{ item.createtime }}</div>
            <div>
              Depósito
              <span style="padding-left: 0.2rem">{{
                item.total_recharge_amount
              }}</span>
            </div>
          </div>

          <img
            v-show="item.is_good"
            src="../../assets/images/teamlist/good.png"
            class="is_good_img"
          />
        </li>
      </ul>
      <div
        v-show="users.length > step_show"
        class="show_more"
        @click="step_show = step_show + 10"
      >
        <div>
          Mostradas {{ step_show }} entradas, totalizando {{ users.length }}.
        </div>
        <b>Mostre mais ⇊</b>
      </div>
      <div v-show="users.length <= step_show" class="show_more">
        Todos os dados mostrados
      </div>
    </div>

    <!-- 统计数据展示区域 -->
    <div class="total_data_area" v-show="!keyword.length">
      <div class="data_item">
        Total de pessoas: <b>{{ num }}</b>
      </div>
      <div class="data_item">
        Valor total da aposta: <b>{{ total_bet_money }}</b>
      </div>
      <div class="data_item">
        Número de depositantes: <b>{{ first_recharge_num }}</b>
      </div>
      <div class="data_item">
        Valor total de recarga: <b>{{ total_recharge_money }}</b>
      </div>
      <div class="data_item">
        Jogador qualificado: <b>{{ good_num }}</b>
      </div>
      <div class="data_item">
        Recarga média: <b>{{ average_recharge }}</b>
      </div>
    </div>

    <ftNav></ftNav>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
import Fetch from "../../utils/fetch";
import ftNav from "../../components/footer_nav/footer_nav";
import Elementui from "element-ui";

Vue.use(NavBar);

Vue.use(Elementui,{});
export default {
  name: "teamList",
  components: {
    ftNav,
  },
  data() {
    return {
      start_date:[],
      current_lvl: 0,
      keyword: "",
      num: 0,
      good_num: 0,
      total_recharge_money: 0,
      average_recharge: 0,
      total_bet_money: 0,
      first_recharge_num: 0,
      users: [
        {
          id: 7013290,
          is_good: 0,
          is_recharge: 0,
          level: 0,
          money: "0.00",
          total_bet_amount: "0.00",
          total_recharge_amount: "0.00",
        },
      ],
      users_bak: [],
      step_show: 10,
    };
  },
  watch: {
    // 'start_date':function (n,o){
    //   //console.log(this.start_date);
    //   if(!this.start_date) return;
    //   Fetch("/user/check_pid_info" + "?start_date="+this.start_date[0]+"&end_date="+this.start_date[1]).then(r=>{
    //     this.average_recharge = r.data.total.average_recharge;
    //     this.first_recharge_num = r.data.total.first_recharge_num;
    //     this.num = r.data.total.num;
    //     this.good_num = r.data.total.good_num;
    //     this.total_recharge_money = r.data.total.total_recharge_money;
    //     this.total_bet_money = r.data.total.total_bet_money;
    //     this.users = r.data.users;
    //     this.users_bak = r.data.users;
    //   })
    // },
    keyword: function (newn) {
      if (newn == "") {
        this.users = this.users_bak;
        return;
      }
      this.users = [];
      this.users_bak.forEach((user) => {
        let user_id_string = String(user.id);
        let keyword_string = String(newn);
        if (user_id_string.search(keyword_string) != -1) {
          this.users.push(user);
        }
      });
    },
  },
  mounted() {
    this.$bus.$emit("send2ftnav", 2);
    this.getSubUsers(0);
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    //获取下级用户信息
    getSubUsers(lvl) {
      this.keyword = "";
      this.current_lvl = lvl;
      let url = "check_pid_info";
      if (lvl == 1) url = "check_ppid_info";
      if (lvl == 2) url = "check_pppid_info";
      if(this.start_date[0] ==undefined || this.start_date[1] ==undefined){
        this.start_date[0]=null;
        this.start_date[1]=null;
      }
      Fetch("/user/" + url+ "?start_date="+this.start_date[0]+"&end_date="+this.start_date[1]).then((r) => {
        this.average_recharge = r.data.total.average_recharge;
        this.first_recharge_num = r.data.total.first_recharge_num;
        this.num = r.data.total.num;
        this.good_num = r.data.total.good_num;
        this.total_recharge_money = r.data.total.total_recharge_money;
        this.total_bet_money = r.data.total.total_bet_money;
        this.users = r.data.users;
        this.users_bak = r.data.users;
      });
    },
    doCopy(val) {
      let _this = this;
      this.$copyText(String(val)).then(function (e) {
        _this.$toast({
          background: "#07c160",
          message: _this.$t("复制成功"),
        });
      });
    },
    changeDate(){
      console.log(this.start_date[0]);
      console.log(this.start_date[1]);
      this.getSubUsers(this.current_lvl);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
@totalDataAreaHeight: 3rem;
.popdate{
  width: 30%;
}
.total_data_area {
  position: fixed;
  bottom: 7%;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: @secondary-color;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.1rem 0;
  font-size: 0.31rem;
  border-top: 2px solid @bodercolor;
}

.data_item {
  width: 50%;
  color: @textcolor1;
  box-sizing: border-box;
  text-indent: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid @bodercolor;
  height: 1.2rem;
  line-height: 1.2rem;
  padding: 0 0.2rem;
  font-size: 0.28rem;
  b {
    color: #fff;
  }
}

.show_more {
  color: #fff;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.2rem;
  text-align: center;
  font-size: 0.35rem;

  div {
    height: 0.5rem;
    line-height: 0.5rem;
    color: #777;
  }
}
.search-date{
  width: 95%;
  margin: 0.2rem auto;
}
.search-wrap {
  //background: rgba(250, 223, 0,0.8);
  border: 1px solid @anttextcolor;
  height: 0.8rem;
  width: 95%;
  margin: 0.1rem auto;
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

.txt_center {
  text-align: center;
}

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
  padding-bottom: 60%;
}

.table_wrap {
  width: 100%;
  margin: 0.2rem auto;
  border-radius: 0.1rem;
}

.sort_btn {
  width: 95%;
  margin: 0.2rem auto 0.2rem auto;
  // background-color: #234631;
  border-radius: 0.2rem;
  padding: 0.1rem 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 30%;
    background-color: @secondary-color;
    padding: 0.2rem 0;
    color: #fff;
    border-radius: 0.2rem;
    border: 1px solid @bodercolor;
  }
  .active {
    //background-color: transparent!important;
    border: none !important;
    border-radius: 0.2rem;
    background: @anttextcolor;
    color:@primary-color;
    // background-image: url("../../assets/images/teamlist/btn.png");
    // background-size: 100% 100%;
  }
}

.table_wrap li {
  width: 95%;
  box-sizing: border-box;
  margin: 0.2rem auto 0.2rem auto;
  border-radius: 0.2rem;
  background: @secondary-color;
  color: #fff;
  padding: 0.3rem;
  position: relative;
}
.is_good_img {
  height: 1rem;
  position: absolute;
  right: 0.2rem;
  top: 50%;
  margin-top: -0.5rem;
}

.team_item {
  display: flex;
  margin: 0.1rem 0;
}

.team_item_left {
  width: 50%;

  img {
    width: 0.35rem;
  }
}
</style>