<template>
  <div class="withdraw_wrap">
    <!-- <div class="base-header">
      <div class="big_tit" @click="$router.push('recharge')">{{ $t('充值') }}</div>
      <div :class="is_active ? 'big_tit is-active' : 'big_tit'">{{ $t('提现') }}</div>
    </div> -->
    <div class="ablewd">
      <div class="left-ab">
        <div class="desc-ab">{{ $t("可提现金额") }}</div>
        <div class="desc-num">{{ $t("钱符") }} {{ able_money }}</div>
      </div>
      <div class="right-ab" v-if="need_bet > 0">
        <div class="desc-ab">Ainda precisa apostar</div>
        <div class="desc-num">{{ $t("钱符") }} {{ need_bet }}</div>
      </div>
    </div>

    <div class="enther">
      <div class="endes">
        {{ $t("请输入您的数量") }} ({{ $t("最低") }}{{ min_withdraw_amount }})
      </div>
      <input
        type="text"
        class="amount-input"
        :placeholder="$t('请输入提现数量')"
        v-model="money"
      />
      <!-- <div class="fee">{{ $t("提现手续费") }}: {{ withdraw_rate }}%</div> -->
    </div>

    <div class="enther">
      <p class="endes">Nome</p>
      <input
        type="text"
        class="amount-input"
        v-model="real_name"
        :placeholder="'Introduza o nome'"
      />
    </div>

    <div class="enther">
      <p class="endes">{{ $t("电话号码") }}</p>
      <input
        v-if="!is_withdraled"
        type="text"
        class="amount-input"
        v-model="phone_number"
        :placeholder="$t('请输入电话号码')"
      />
      <input
        v-if="is_withdraled"
        type="text"
        class="amount-input cantc"
        v-model="phone_number"
        readonly
      />
    </div>

    <div class="enther">
      <label for="country" class="endes"
        >Tipo de PIX (CPF / CNPJ / PHONE / EMAIL)</label
      >
      <select
        id="country"
        name="country"
        class="amount-input selectpix"
        v-model="chave_pix"
      >
        <option value="PIX_CPF" :selected="chave_pix == 'PIX_CPF'">
          PIX-CPF
        </option>
        <option value="PIX_CNPJ" :selected="chave_pix == 'PIX_CNPJ'">
          PIX-CNPJ
        </option>
        <option value="PIX_PHONE" :selected="chave_pix == 'PIX_PHONE'">
          PIX-PHONE
        </option>
        <option value="PIX_EMAIL" :selected="chave_pix == 'PIX_EMAIL'">
          PIX-EMAIL
        </option>
      </select>
    </div>

    <!-- <div class="enther">
      <p class="endes">Tipo de PIX</p>
      <input type="text"  class="amount-input" :placeholder="$t('Input Pix(CPF)')"
             v-model="chave_pix" readonly/>
    </div> -->

    <div class="enther">
      <p class="endes" v-show="chave_pix == 'PIX_CPF'">PIX_CPF</p>
      <p class="endes" v-show="chave_pix == 'PIX_CNPJ'">PIX_CNPJ</p>
      <p class="endes" v-show="chave_pix == 'PIX_PHONE'">PIX_PHONE</p>
      <p class="endes" v-show="chave_pix == 'PIX_EMAIL'">PIX_EMAIL</p>
      <input
        type="text"
        v-if="!is_withdraled"
        class="amount-input"
        placeholder="Por favor insira o número da sua conta PIX"
        v-model="cpf"
      />
      <input
        type="text"
        v-if="is_withdraled"
        class="amount-input cantc"
        readonly
        v-model="cpf"
      />
    </div>

    <div class="sbtn" @click="submit">
      {{ $t("提现") }}
    </div>

    <pay-layer
      ref="payLayer"
      v-model="show_pay"
      @inputEnd="handleInputEnd"
      @close="handleClose"
      @forgetPassword="handleForget"
    />

    <ft></ft>
    <ftNav :active="2"></ftNav>
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import ft from "../../components/ft.vue";
import ftNav from "../../components/footer_nav/footer_nav";
import payLayer from "vue-pay-layer";

Vue.use(payLayer);
export default {
  name: "cost",
  data() {
    return {
      able_money: 0, //可以提现金额
      money: null,
      phone_number: "",
      chave_pix: "PIX_CPF",
      real_name: "",
      cpf: "Loading...",
      min_withdraw_amount: null,
      withdraw_rate: null,
      is_active: true,
      is_withdraled: false,
      pay_password: "",
      show_pay: false,
      need_bet: 0,
    };
  },
  components: {
    ft,
    ftNav,
  },
  created() {},
  watch: {
    chave_pix: function (n, old) {
      console.log(n, old);
      if (n == "PIX_PHONE") {
        this.cpf = "+55";
      }
    },
  },
  mounted() {
    //验证一下有没有设置支付密码
    Fetch("/Withdrow/hasWithdrawPassword").then((res) => {
      console.log(res);
      if (res.data.is_set == 0) {
        this.$router.push("setpasswd");
      } else {
        this.getWdAble();
      }
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //获取可以提现的金额
    getWdAble() {
      Fetch("/Withdrow/getWithdrawInfo").then((res) => {
        this.able_money = res.data.can_withdraw_amount;
        this.min_withdraw_amount = res.data.min_withdraw_amount;
        this.chave_pix = res.data.chave_pix ? res.data.chave_pix : "PIX_CPF";
        this.withdraw_rate = res.data.withdraw_rate;
        this.real_name = res.data.real_name;
        this.phone_number = res.data.phone_number;
        this.need_bet = res.data.need_bet;
        setTimeout(() => {
          this.cpf = res.data.cpf;
        }, 500);
      });
    },
    handleInputEnd(pay_password) {
      Fetch("/Withdrow/addWithdraw", {
        money: this.money,
        phone_number: this.phone_number,
        chave_pix: this.chave_pix,
        cpf: this.cpf,
        email: this.email,
        real_name: this.real_name,
        pay_password: pay_password,
      }).then((res) => {
        if (res.code == 1) {
          this.$notify({
            title: "R$" + this.money,
            message: this.$t("提现成功"),
            type: "success",
          });
          setTimeout(() => {
            this.$router.push("/");
          });
        } else {
          setTimeout(() => {
            this.$notify.error({
              message: res.msg,
            });
            this.$refs.payLayer.fail("");
          }, 2000);
        }
      });
    },
    handleClose() {
      this.show_pay = false;
    },
    handleForget() {
      this.$notify.info({
        title: "Redefinir senha de saque",
        message:
          "Entre em contato com o atendimento ao cliente da plataforma para resolver o problema de redefinição da senha de saque.",
        duration: 5000,
      });
    },

    //提现
    submit() {
      if (this.need_bet > 0) {
        this.$notify({
          title: "Aviso gentil",
          message:
            "Você ainda precisa apostar R$" +
            this.need_bet +
            " para poder sacar",
        });
        return false;
      }
      //没有可提现的金额
      if (this.able_money <= 0) {
        this.$toast({
          background: "#a244aa",
          message: this.$t("当前可提现金额为0"),
          duration: 3000,
        });
        return false;
      }
      //提现金额验证
      let amount_reg = /^[1-9][0-9]*([.][0-9]{1,2})?$/;
      if (!amount_reg.test(this.money)) {
        this.$toast({
          background: "#a244aa",
          message: this.$t("提现金额不正确"),
          duration: 3000,
        });
        return false;
      }
      //提现金额 大于可提现金额
      if (Number(this.money) > Number(this.able_money)) {
        this.$toast({
          background: "#a244aa",
          message: this.$t("提现金额大于可提现金额"),
          duration: 3000,
        });
        return false;
      }

      if (Number(this.money) < Number(this.min_withdraw_amount)) {
        this.$toast({
          background: "#a244aa",
          message: this.$t("提现金额小于最低提现金额"),
          duration: 3000,
        });
        return false;
      }

      //验证电话号码
      if (this.chave_pix != "PIX_PHONE") {
        let phone_reg = /^\d{9,}$/;
        if (!phone_reg.test(this.phone_number)) {
          this.$toast({
            background: "#a244aa",
            message: this.$t("手机号码不正确"),
            duration: 3000,
          });
          return false;
        }
      }
      // 验证邮箱
      // if (this.chave_pix === "PIX_EMAIL") {
      //   let email_reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //   if (!email_reg.test(this.email)) {
      //     this.$toast({
      //       background: "#a244aa",
      //       message: "O endereço de e-mail está incorreto",
      //       duration: 3000,
      //     });
      //     return false;
      //   }
      // }

      //验证CPF
      if (this.cpf.length < 9 || this.chave_pix.length > 11) {
        this.$toast({
          background: "#a244aa",
          message: this.$t("CPF不正确"),
          duration: 3000,
        });
        return false;
      }

      //终于通过验证了
      this.show_pay = true;
    },
  },
};
</script>


<style lang="less" scoped>
@import "../../assets/css/variables.less";
.myteam-bg {
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.cantc {
  background-color: rgb(22, 22, 19) !important;
  font-weight: 700;
}

.base-header {
  position: relative;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  margin: 0 auto 0.2rem auto;
  border-radius: 0.2rem;
  overflow: hidden;
  z-index: 1;
  border: thin solid #0f69e8;
  box-sizing: border-box;
  padding: 5px 5px;
}

.big_tit {
  font-size: 0.35rem;
  text-align: center;
  width: 49%;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #ffffff;
  border-radius: 0.1rem;
}

.is-active {
  color: #ffffff;
  background-image: linear-gradient(
    90deg,
    rgba(3, 38, 96, 0.84) 0,
    rgba(3, 38, 96, 0.84) 0,
    rgb(27, 64, 119) 100%,
    rgb(27, 64, 119) 100%
  );
}

.fee {
  color: #fff;
  margin-top: 0.2rem;
}

.amount-input {
  height: 0.8rem;
  width: 100%;
  background-color: @secondary-color;
  //border: thin solid #293548;
  border: none;
  margin-top: 10px;
  font-size: 14px;
  color: white;
  text-indent: 10px;
  border-radius: 5px;
  //background: transparent;
  font-weight: 700;
  //box-sizing: border-box;
}
.selectpix {
  color: #e5c616 !important;
  background-color: @secondary-color !important; /* 设置下拉选择框的背景颜色 */
}

.amount-input::placeholder {
  font-size: 0.33rem;
  color: @textcolor3;
}

.enther {
  width: 92%;
  margin: 15px auto 10px auto;
  box-sizing: border-box;
}

.endes {
  color: #fff;
  font-size: 0.32rem;
  margin: 0;
}

.desc-num {
  margin-left: 0.1rem;
  color: gold;
  font-size: 0.35rem;
  font-weight: 700;
}

.desc-ab {
  text-align: left;
  box-sizing: border-box;
}

.left-ab {
  width: 100%;
  height: 30px;
  color: #fff;
  display: flex;
  align-items: center;
}
.right-ab {
  width: 100%;
  height: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ablewd {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.free-count {
  color: #989da6;
}

.basic_btn {
  background: #fff;
  margin: 15px auto 0;
  background-size: 100%;
  color: #132816;
  font-weight: 700;
}

.withdraw_wrap {
  width: 100%;
  min-height: 80vh;
  padding-top: 0.2rem;
  //background-color: rgba(0,0,0,0.5);
}

.sbtn {
  margin: 0.1rem auto 0 auto;
  width: 92%;
  border-radius: 0.2rem;
  font-size: 0.35rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: @anttextcolor;
  color: @primary-color;
}
</style>
