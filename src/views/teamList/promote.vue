<template>
  <div class="home_wrap">
    <van-nav-bar
      title="Convidar"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs
      v-model="active"
      :sticky="true"
      :swipeable="true"
      :swipe-threshold="2"
      line-width="1.5rem"
      background="#1c1c1c"
      :color="'#feb705'"
      :title-inactive-color="'#fff'"
      :title-active-color="'#feb705'"
      @change="tabChange"
      class="hidden-sm-and-up"
    >
      <van-tab title="Tutorial de promoção"></van-tab>
      <van-tab title="Link de Convite"></van-tab>
      <van-tab title="Minha Comissão"></van-tab>
      <van-tab title="meu time"></van-tab>
      <van-tab title="Taxa de Bônus do Agente"></van-tab>
    </van-tabs>
    <!-- pc固定头部 -->
    <div
      style="
        width: 100%;
        height: 1.8rem;
        background-color: #1c1c1c;
        color: #fff;
        margin: 0.2rem 0;
        border-radius: 0.2rem;
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
      "
      class="hidden-xs-only"
    >
      <div>
        <img
          src="../../assets/images/promote/head_left.png"
          style="width: 1.6rem; padding-left: 0.2rem; margin-top: -30px"
          alt=""
        />
        <van-icon name="question" id="pcheadicon" />
      </div>
      <div style="font-size: 0.4rem">
        Minha identidade <b class="huang">{{ data.id || null }}</b>
        <img src="../../assets/images/agent/fx02.png" width="1rem" />
      </div>
      <div style="font-size: 0.4rem">
        <span>Coletável</span>
        <span class="huang" style="padding-left: 0.1rem">{{
          agent_info.commission_money || 0.0
        }}</span>
      </div>
      <div>
        <button
          disabled="disabled"
          type="button"
          class="ant-btn ant-btn-success"
        >
          <span>Receber</span></button
        ><button type="button" class="ant-btn ant-btn-primary" @click="active=2">
          <span>Histórico</span>
        </button>
      </div>
    </div>
    <div style="display: flex">
      <!-- pc左侧导航栏 -->
      <div id="prmtpc_left " class="hidden-xs-only">
        <div
          class="prmtpc_left_item"
          :class="active == 0 ? 'ac' : ' '"
          @click="gopaper(0)"
        >
          Tutorial de promoção
        </div>
        <div
          class="prmtpc_left_item"
          :class="active == 1 ? 'ac' : ' '"
          @click="gopaper(1)"
        >
          Link de Convite
        </div>
        <div
          class="prmtpc_left_item"
          :class="active == 2 ? 'ac' : ' '"
          @click="gopaper(2)"
        >
          Minha Comissão
        </div>
        <div
          class="prmtpc_left_item"
          :class="active == 3 ? 'ac' : ' '"
          @click="gopaper(3)"
        >
          meu time
        </div>
        <div
          class="prmtpc_left_item"
          :class="active == 4 ? 'ac' : ' '"
          @click="gopaper(4)"
        >
          Taxa de Bônus do Agente
        </div>
      </div>
      <div v-if="active == 0" class="promote_commonbg">
        <div id="promote_levelA">
          <div
            style="
              display: flex;
              align-items: center;
              margin: 0.4rem 1px;
              box-sizing: border-box;
            "
          >
            <div style="display: flex; position: relative">
              <img
                src="../../assets/images/promote/a1.png"
                class="promote_avt"
              />
              <span class="avt_tap">A</span>
            </div>
            <div style="padding-left: 0.4rem">
              <P>C3 é poderoso e desfruta <br />de <em>15</em> /10000</P>
            </div>
          </div>
          <div>
            <P>Desempenho total 3,31M, Bônus total do agente <em>270</em></P>
            <P>Desempenho de subordinado 180K, Contribuiu <em>270</em></P>
            <P>Outro desempenho 3,13M, Contribuir <em>0</em></P>
          </div>
        </div>
        <div class="promote_level_text">
          <div class="promote_level_text1">
            <div>Contribuição de B1 <em>180</em></div>
            <div>Outras contribuições de C1 e C2 <em>0</em></div>
          </div>
          <div class="promote_level_text1">
            <span>Contribuir para A: <em>60</em></span>
          </div>
          <div class="promote_level_text1">
            <div>Diretamente sob a contribuição B3 <em>30</em></div>
            <div>Outras contribuições de C3 <em>0</em></div>
          </div>
        </div>

        <div class="promote_levelB">
          <div class="promote_levelB_item">
            <div style="position: relative">
              <img
                src="../../assets/images/promote/b1.png"
                class="promote_avt"
              />
              <span class="avt_tap">B1</span>
            </div>
            <div class="agent-content">
              <p>O nível mais baixo é média, desfrute de <em>15</em>/10.000</p>
            </div>
            <div class="agent-describe"><span>Apostas válidas 120K</span></div>
          </div>
          <div class="promote_levelB_item">
            <div style="position: relative">
              <img
                src="../../assets/images/promote/b2.png"
                class="promote_avt"
              />
              <span class="avt_tap">B2</span>
            </div>
            <div class="agent-content">
              <p>B2 não tem subordinados, por isso não tem lucros</p>
            </div>
            <div class="agent-describe"><span>Apostas válidas 40K</span></div>
          </div>
          <div class="promote_levelB_item">
            <div style="position: relative">
              <img
                src="../../assets/images/promote/b1.png"
                class="promote_avt"
              />
              <span class="avt_tap">B3</span>
            </div>
            <div class="agent-content">
              <p>Muito bem subagente, ganhou <em>15</em>/10k</p>
            </div>
            <div class="agent-describe"><span>Apostas válidas 20K</span></div>
          </div>
        </div>
        <div>
          <div class="promote_level_text">
            <p>
              <span>Contribuir para A: <em>0</em></span
              ><span>Contribuir para B1: <em>150</em></span>
            </p>
            <p>
              <span>Contribuir para A: <em>0</em></span
              ><span>Contribuir para B1: <em>45</em></span>
            </p>
            <p>
              <span>Contribuir para A: <em>0</em></span
              ><span>Contribuir para B3: <em>4500</em></span>
            </p>
          </div>
        </div>
        <div class="promote_levelB">
          <div class="promote_levelB_item">
            <div style="position: relative">
              <img
                src="../../assets/images/promote/c1.png"
                class="promote_avt"
              />
              <span class="avt_tap">C1</span>
            </div>
            <div class="agent-content">
              <p>C1 não tem subordinados, por isso não tem lucros</p>
            </div>
            <div class="agent-describe"><span>Apostas válidas 100K</span></div>
          </div>
          <div class="promote_levelB_item">
            <div style="position: relative">
              <img
                src="../../assets/images/promote/c2.png"
                class="promote_avt"
              />
              <span class="avt_tap">C2</span>
            </div>
            <div class="agent-content">
              <p>C2 não tem subordinados, por isso não tem lucros</p>
            </div>
            <div class="agent-describe"><span>Apostas válidas 30K</span></div>
          </div>
          <div class="promote_levelB_item">
            <div style="position: relative">
              <img
                src="../../assets/images/promote/c1.png"
                class="promote_avt"
              />
              <span class="avt_tap">C3</span>
            </div>
            <div class="agent-content">
              <p>C3 não tem subordinados, por isso não tem lucros</p>
            </div>
            <div class="agent-describe"><span>Apostas válidas 3000K</span></div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div class="promote_detail">
          <div><strong>Por exemplo:</strong></div>
          <div>
            Neste website o bônus do agente é calculado por apostas. Por
            exemplo, se as apostas forem 10-200000, a taxa de bônus
            correspondente será 15/10000, e se as apostas forem superiores a
            3000000, o bônus de agente é 15/10000. A é o agente do website, ele
            recruta B1, B2 e B3 como seus agentes e B1 também recruta C1 e C2
            como seus agentes. B2 não tem agentes e B3 tem apenas um agente C3.
          </div>
          <div>
            Após alguns dias, as apostas válidas de B1 são 120000, as apostas
            válidas de B2 são 40000, e as apostas válidas de B3 são 20000. As
            apostas válidas de C1 são 100000, as apostas válidas de C2 são 30000
            e as apostas válidas de C3 são 3000000, portanto, o desempenho total
            de B1 é C1+C2=130000, e a taxa de bónus do agente é de 15/10000. B2
            não tem agentes; portanto, o desempenho de B2 é 0. O desempenho
            total de B3 é C3 - 3000000, por conseguinte, a taxa de bónus é de
            15/10000. O desempenho total da Equipes direta de A é
            180000+Subagente 3130000=3310000, pelo que a taxa de bónus é de
            15/10000.
          </div>
          <div>Por conseguinte, o bónus é calculado da seguinte forma:</div>
          <div>
            <strong>1. Equipes direta: </strong>refere-se aos membros do
            desenvolvimento vertical, que são coletivamente chamados de Equipes
            direta.
          </div>
          <div>
            <strong>(1) B1, B2, B3 contribuem para A: </strong
            >(120000+40000+20000) x 15/10000=<em>270</em>.
          </div>
          <div>
            <strong>(2) C1 e C2 contribuem para B1:</strong>(100000+30000) x
            15/10000=<em>195</em>.
          </div>
          <div>
            <strong>(3) C3 contribui para B3: </strong> 3 milhões x
            15/10000=<em>4500</em>.
          </div>
          <div>
            <strong>2. Outras Equipes:</strong> refere-se aos membros do
            desenvolvimento de subordinados, subordinados, etc., que são
            coletivamente chamados de outras Equipes; porque este sistema pode
            desenvolver subordinados indefinidamente, para melhor compreensão,
            este artigo apenas toma como exemplo uma estrutura de 2 níveis.
          </div>
          <div>
            <strong>(1) De C1 e C2: </strong>Visto que o desempenho total de B1
            é de 130000, tem apenas uma taxa de desconto de 15/10000, enquanto
            que o desempenho total de A é de 3,31 milhões, e tem uma taxa de
            desconto de 15/10000. Então a diferença de desconto entre A e B1 é
            de: 15-15=0/10000, esta diferença é a parte contribuída por C1 e C2
            para A, portanto
            <strong> C1 e C2 contribuem para A: </strong> (100000+30000) ×
            0/10000=<em>0</em>.
          </div>
          <div>
            <strong>(2) De C3: </strong>Visto que B3 tem um desempenho total de
            3 milhões e desfruta de uma taxa de desconto de 15/10000, enquanto A
            tem um desempenho total de 3,31 milhões e também desfruta de uma
            taxa de desconto de 15/10000, então a diferença entre o desconto de
            A e B3 é de: 15-15=0/10000. <strong>C3 contribui para A: </strong>3
            milhões x 0/10000=<em>0</em>.
          </div>
          <div><strong>3. Resumo:</strong></div>
          <div>
            (1)Devido ao poder de C3, todo o desempenho de A goza indiretamente
            da taxa de desconto mais alta.
          </div>
          <div>
            (2) B2 pode ser preguiçoso, e não tem vantagem se não houver
            desenvolvimento de subordinados.
          </div>
          <div>
            (3) Apesar de B3 se ter juntado relativamente tarde e pertencer aos
            subordinados de A, o seu subordinado C3 é poderoso, permitindo que
            B3 desfrute diretamente da mais alta taxa de desconto. Portanto,
            independentemente da posição de B3 quando este se junta, os seus
            benefícios nunca serão afetados, deixarão de sofrer as perdas de
            outros subordinados, e o seu desenvolvimento não será restringido.
          </div>
          <div>
            (4) Este é um modelo de agência absolutamente justo, e não
            prejudicará sempre quem se juntar mais tarde.
          </div>
        </div>
      </div>
      <div v-if="active == 1" class="promote_commonbg">
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
                <div class="lj_con_l">{{ info.link }}</div>
                <img src="../../assets/images/agent/fx02.png" alt="" />
              </div>
            </div>
            <ul class="meus_sj">
              <li>
                <img src="../../assets/images/agent/img_facebook.png" alt="" />
                <div>Facebook</div>
              </li>
              <li>
                <img src="../../assets/images/agent/img_tg.png" alt="" />
                <div>Telegram</div>
              </li>
              <li>
                <img src="../../assets/images/agent/img_wa.png" alt="" />
                <div>WhatsApp</div>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
        </div>
        <div class="meus_bg">
          <div class="caidan_tit">
            <div>Comissão</div>
            <div class="caidan_r" @click="active = 2">
              <span class="huang">Mais</span
              ><img src="../../assets/images/agent/caidanjt.png" />
            </div>
          </div>
          <div class="caidan_con">
            <li>
              <div>Comissão total</div>
              <span class="huang"> {{ agent_info.commission_money }}</span>
            </li>
            <li>
              <div>Comissão recebida</div>
              <span class="huang"> {{ agent_info.had_money }}</span>
            </li>
            <li>
              <div>Última Comissão</div>
              <span class="huang"> {{ agent_info.last_money || 0 }}</span>
            </li>
          </div>
        </div>

        <div class="meus_bg">
          <div class="caidan_tit">
            <div>Dados da equipe</div>
            <div class="caidan_r" @click="active = 3">
              <span class="huang">Mais</span
              ><img src="../../assets/images/agent/caidanjt.png" />
            </div>
          </div>

          <div class="caidan_con">
            <li>
              <div>Número total de equipes</div>
              <span class="huang"> {{ agent_info.sub_num || 0 }}</span>
            </li>
            <li>
              <div>Número total de pessoas recarregando</div>
              <span class="huang"> {{ agent_info.sub_recharge_num || 0 }}</span>
            </li>
            <li>
              <div>Valor total de recarga</div>
              <span class="huang"> {{ agent_info.sub_recharge_sum || 0 }}</span>
            </li>
            <li>
              <div>Total de apostas válidas</div>
              <span class="huang"> {{ agent_info.sub_bet_sum || 0 }}</span>
            </li>
          </div>
        </div>
      </div>
      <div v-if="active == 2" class="promote_commonbg">
        <div class="receive_bg">
          <div v-if="boxTableList.length == 0" class="none_wrap">
            <img
              class="noneimg"
              src="../../assets/images/promote/none.png"
              style="width: 3rem"
            />
            <p class="nonetext">Sem Registros</p>
          </div>
          <ul>
            <li v-for="(item, idx) in boxTableList" :key="idx">
              <div class="receive_mid">
                <div class="receive_mid_item">
                  <div>{{ item.num_id }}</div>
                  <p>Número de série do baú do tesouro</p>
                </div>
                <div class="receive_mid_item">
                  <div>{{ item.condition }}</div>
                  <p>Número de pessoas</p>
                </div>
                <div class="receive_mid_item">
                  <div>{{ item.money }}</div>
                  <p>Montante recebido</p>
                </div>
              </div>
              <div class="receive_bt">
                <div class="receive_bt_txt1">
                  {{ formatDateTime(item.createtime) }}
                </div>
                <!-- <div class="receive_bt_txt1">{{ new Date(item.createtime * 1000).toLocaleString() }}</div> -->
                <div class="receive_bt_txt">Recebido</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="active == 3" class="promote_commonbg">
        <div class="home_wrap">
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
              <li
                v-for="(item, idx) in users"
                :key="idx"
                v-show="idx < step_show"
              >
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
                Mostradas {{ step_show }} entradas, totalizando
                {{ users.length }}.
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
      </div>
      <div v-if="active == 4" class="promote_commonbg">
        <div style="display: flex; margin: 0.2rem auto">
          <div style="width: 20%" class="hidden-sm-and-up">
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #1c1c1c;
                color: #fff;
                border-radius: 0.2rem;
              "
            >
              <img
                src="../../assets/images/promote/91.png"
                style="width: 1rem; padding-top: 0.2rem"
                alt=""
              />
              <p>Slots</p>
            </div>
          </div>
          <div
            style="width: 100%; padding-left: 0.4rem; box-sizing: border-box"
          >
            <table id="tax_table">
              <tr>
                <th>Nível</th>
                <th>Desempenho</th>
                <th>Valor do desconto por 10.000</th>
              </tr>
              <tr>
                <td>1</td>
                <td>0+</td>
                <td>15</td>
              </tr>
              <tr style="background-color: #303030">
                <td>2</td>
                <td>5M+</td>
                <td>20</td>
              </tr>
              <tr>
                <td>3</td>
                <td>8M+</td>
                <td>30</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ftNav></ftNav>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, NavBar } from "vant";
import Fetch from "../../utils/fetch";
import ftNav from "../../components/footer_nav/footer_nav";
import Elementui from "element-ui";

Vue.use(Tab).use(Tabs).use(NavBar);

Vue.use(Elementui, {});
export default {
  name: "promote",
  components: {
    ftNav,
  },
  data() {
    return {
      data: {},
      active: 0,
      info: {},
      agent_info: {},
      boxTableList: [],
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
    // this.$bus.$emit("send2headshow", true);
    this.start();
    
  },
  beforeDestroy() {
    
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    gopaper(i) {
      this.tabChange(i);
    },
    tabChange(v) {
      this.active = v;
    },
    start() {
      Fetch("/box/getLink").then((r) => {
        this.info = r.data;
      });
      Fetch("/box/getUserSubInfo").then((r) => {
        this.agent_info = r.data;
      });
      Fetch("/box/getBoxTableList").then((r) => {
        this.boxTableList = r.data;
        //console.log(this.boxTableList);
      });
      Fetch("/user/getUserInfoAPi").then((r) => {
        //console.log(r);
        this.data = r.data;
      });
      this.getSubUsers(0);
    },

    doCopy(val) {
      let _this = this;
      this.$copyText(String(val)).then(function () {
        _this.$toast({
          background: "#07c160",
          message: _this.$t("复制成功"),
        });
      });
    },

    formatDateTime(timestamp) {
      const dateObject = new Date(timestamp * 1000);
      const time = dateObject.toLocaleTimeString();
      const date = dateObject.toLocaleDateString();
      return `${time} ${date}`;
    },
    //获取下级用户信息
    getSubUsers(lvl) {
      this.keyword = "";
      this.current_lvl = lvl;
      let url = "check_pid_info";
      if (lvl == 1) url = "check_ppid_info";
      if (lvl == 2) url = "check_pppid_info";
      Fetch("/user/" + url).then((r) => {
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
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  background: rgb(28, 28, 28);
}

/deep/ .van-nav-bar .van-icon {
  color: #fff;
}

/deep/ .van-nav-bar__title {
  color: #fff;
}
.promote_commonbg {
  width: 95%;
  margin: 0 auto;
  min-height: 100vh;
  padding-bottom: 60%;
  //flex-grow: 1;
}
#prmtpc_left {
  width: 12%;
}
.prmtpc_left_item {
  background-color: #1c1c1c;
  border-radius: 0.2rem;
  color: #fff;
  padding: 0.4rem;
  margin: 0.2rem;
}
.ac {
  background-color: #f8a900;
  color: #1c1c1c;
}
#pcheadicon {
  color: #f8a900;
  font-size: 0.6rem;
  position: absolute;
  top: 0;
}
.ant-btn {
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 0.1rem;
  color: #fff;
}
.ant-btn-success {
  background: #999999;
}

.ant-btn-primary {
  background: #f8a900;
}

.search-date {
  widows: 95%;
  margin: 0.2rem auto;
  display: flex;
}
.none_wrap {
  width: 95%;
  margin: 0.1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 60%;
}
.noneimg {
  margin-top: 3rem;
  width: 3rem;
}
.nonetext {
  color: #c7c7c7;
}
#tax_table {
  border: none;
  text-align: center;
  background: #1c1c1c;

  th {
    width: 20%;
    padding: 0.2rem;
    color: #fff;
    background-color: #303030;
  }
  td {
    padding: 0.2rem;
    color: #c7c7c7;
  }
}
.search-wrap {
  //background: rgba(250, 223, 0,0.8);
  border: 1px solid #f8b600;
  height: 0.8rem;
  width: 45%;
  margin-left: 0.1rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.simg {
  font-size: 0.4rem;
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

em {
  color: #f8b600;
}

.avt_tap {
  z-index: 2;
  position: absolute;
  bottom: -0.1rem;
  right: -0.1rem;
  background-color: #f8a900;
  color: #fff;
  border-radius: 50%;
  width: 0.4rem;
  text-align: center;
}

.home_wrap {
  //width: 100%;
  min-height: 100vh;
  padding-bottom: 60%;
}

.promote_avt {
  width: 1.2rem;
}

#promote_levelA {
  //width: 95%;
  margin: 0.2rem auto;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1c1c1c;
  color: #fff;
  //border: 1px solid #c7c7c7;
}

.promote_levelB {
  //width: 95%;
  margin: 0.1rem auto;
  display: flex;
  justify-content: space-between;
}

.promote_levelB_item {
  width: 31.5%;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.1rem 0.01rem;
  box-sizing: border-box;
  text-align: center;
  background-color: #1c1c1c;
  color: #fff;
  //border: 1px solid #c7c7c7;
}

.promote_level_text {
  width: 95%;
  margin: 0 auto;
  display: flex;
  position: relative;
  justify-content: space-between;
  text-align: center;
  color: #fff;

  p,
  .promote_level_text1 {
    width: 31.5%;
  }
}

.agent-content {
}

.agent-describe {
  border-top: 1px solid #494949;
  height: 0.8rem;
  line-height: 0.8rem;
}

.promote_detail {
  box-sizing: border-box;
  //width: 95%;
  margin: 0.1rem auto;
  background-color: #1c1c1c;
  color: #fff;
  padding: 0.2rem;
  font-size: 0.36rem;

  strong {
    font-size: 0.4rem;
  }
}
// 分割第二页样式
.meus_bg {
  border-radius: 0.2rem;
  margin: 0.2rem auto 0rem auto;
  background-color: #1c1c1c;
}
.meus_tb {
  width: 12%;
  float: left;
  margin-left: 6%;
  img {
    width: 100%;
  }
}

.meus_txt {
  width: 30%;
  float: left;
  margin: 0.2rem 0 0 0.3rem;
  color: #777777;
  line-height: 0.46rem;
  p {
    color: #bebbbb;
  }
}
.caidan_r {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 30%;
    margin-left: 0.2rem;
    margin-top: -0.05rem;
  }
}
.meus_tit {
  line-height: 1rem;
  color: #fff;
  padding-left: 0.2rem;
  border-bottom: 1px solid #777;
}
.meus_fx {
  width: 95%;
  margin: 0.2rem auto;
  padding-bottom: 0.4rem;
  .fx_ewm {
    width: 24%;
    float: left;
    img {
      width: 100%;
      border: 0.16rem solid #fff;
      border-radius: 0.2rem 0.2rem 0 0;
    }
    p {
      display: block;
      text-align: center;
      font-size: 0.28rem;
      padding: 0.05rem 0;
      border-radius: 0 0 0.2rem 0.2rem;
      background-color: #005dfe;
    }
  }
}

.fx_lianjie {
  width: 100%;

  .lj_tit {
    margin: 0.2rem 0;
    color: #fff;
  }
  .lj_con {
    padding: 0.3rem;
    color: #f5f5f5;
    border-radius: 0.2rem;
    border: 1px solid #777;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 0.5rem;
    }
  }
}
.meus_sj {
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;
}
.meus_sj li {
  text-align: center;
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  img {
    width: 1rem;
  }
  div {
    color: #fff;
    text-align: center;
    font-size: 0.24rem;
    line-height: 0.46rem;
    width: 100%;
  }
}
.caidan_tit {
  line-height: 1rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 0.2rem;
  border-bottom: 1px solid #777;
}
.caidan_con {
  justify-content: space-between;
  position: relative;
  li {
    line-height: 1rem;
    color: #c7c7c7;
    display: flex;
    padding-left: 0.2rem;
    border-bottom: 1px solid #777;
    p {
      float: left;
      display: inline;
    }

    span {
      display: flex;
      position: absolute;
      right: 0.4rem;
    }
  }
}
.caidan_con li:last-child {
  border-bottom: 0px;
}

.huang {
  color: #f8b600;
}
.hong {
  color: #ff0000;
}
.clear {
  clear: both;
}
// 分割第三页样式

.receive_bg li {
  //width: 95%;
  box-sizing: border-box;
  margin: 0.2rem auto 0 auto;
  border-radius: 0.2rem;
  background: #1c1c1c;
  color: #fff;
  padding: 0.3rem;
}

.receive_mid {
  display: flex;
  margin-top: 0.1rem;
}
.receive_mid_item {
  text-align: center;
  width: 100%;
  font-weight: 700;
  color: #feb705;
  p {
    color: #e3e3e3;
  }
}
.receive_bt {
  display: flex;
  margin-top: 0.2rem;
}
.receive_bt_txt {
  padding: 0.2rem;
  border-radius: 1rem 0 0 1rem;
  background: #feb705;
}
.receive_bt_txt1 {
  padding-left: 0.2rem;
  flex-grow: 1;
  margin: auto;
}
//t团队分页样式
.popdate {
  width: 30%;
}
.total_data_area {
  position: fixed;
  bottom: 7%;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: #1c1c1c;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.1rem 0;
  font-size: 0.31rem;
  border-top: 2px solid #777;
}

.data_item {
  width: 50%;
  color: #fac944;
  box-sizing: border-box;
  text-indent: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #777;
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
.search-date {
  width: 95%;
  margin: 0.2rem auto;
}
.search-wrap {
  //background: rgba(250, 223, 0,0.8);
  border: 1px solid #f8b600;
  height: 0.8rem;
  width: 100%;
  margin: 0.1rem auto;
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

.txt_center {
  text-align: center;
}

.table_wrap {
  //width: 100%;
  margin: 0.2rem auto;
  border-radius: 0.1rem;
}

.sort_btn {
  //width: 95%;
  margin: 0.2rem auto 0.2rem auto;
  // background-color: #234631;
  border-radius: 0.2rem;
  padding: 0.1rem 0;
  display: flex;
  justify-content: space-between;
  button {
    width: 30%;
    background-color: #1c1c1c;
    padding: 0.2rem 0;
    color: #fff;
    border-radius: 0.2rem;
    border: 1px solid #f8b600;
  }
  .active {
    //background-color: transparent!important;
    border: none !important;
    border-radius: 0.2rem;
    color: #000;
    background-color: #f8b600;
    // background-image: url("../../assets/images/teamlist/btn.png");
    // background-size: 100% 100%;
  }
}

.table_wrap li {
  //width: 95%;
  box-sizing: border-box;
  margin: 0.2rem auto 0.2rem auto;
  border-radius: 0.2rem;
  background: #1c1c1c;
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