<template>

  <div class="home_wrap">
    <van-nav-bar
        title="Senha de Saque"
        left-text=""
        left-arrow
        @click-left="onClickLeft"

    />


    <div class="top_tips">Você é a primeira retirada, você precisa definir a senha de retirada primeiro</div>


    <div class="sec_tips">Definir Senha de Saque</div>

    <div class="th_tips">
      <span>Nova Senha de Saque</span>
      <van-icon name="lock" class="lock_icon"/>
    </div>

    <div class="fst_pw">
      <input-password v-model="password" @changeItem="pswChange"></input-password>
    </div>

    <div class="th_tips">
      <span>Nova Senha de Saque</span>
      <van-icon name="lock" class="lock_icon"/>
    </div>

    <div class="fst_pw">
      <input-password v-model="password2" @changeItem="pswChange2"></input-password>
    </div>


    <div class="lst_tips">
      Você é a primeira retirada, você precisa definir a senha de retirada primeiro
    </div>

    <div class="sum_wrap">
      <button class="sum_btn" @click="setPd()">Confirmar</button>
    </div>


  </div>

</template>

<script>
import Vue from 'vue';
import {NavBar} from 'vant';
import InputPassword from "../../components/password"
import Fetch from "@/utils/fetch";

Vue.use(NavBar);
export default {
  name: "setpasswd",
  components: {
    InputPassword: InputPassword
  },
  data() {
    return {
      password: '',
      password2: '',
    };
  },
  created() {

  },
  methods: {
    pswChange(password) {
      console.log(password);

    },
    pswChange2(password) {
      console.log(password)
    },
    onClickLeft() {
      this.$router.push("/");
    },
    setPd() {
      if (this.password.length != 6 || this.password2.length != 6) {
        return this.$notify.error({
          message: "A senha requer 6 dígitos",
        })
      }
      if (this.password != this.password2) {
        return this.$notify.error({
          message: "As duas senhas são inconsistentes",
        })
      }

      Fetch("/Withdrow/setWithdrawPassword", {pay_password: this.password}).then((res) => {

        if (res.code == 1) {
          this.$notify({
            type: "success",
            message: "Senha definida com sucesso"
          })

          setTimeout(() => {
            this.$router.push("withdraw");
          }, 2000)
        } else {
          this.$notify.error({
            message: res.msg,
          })
        }

      });
    }
  }

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
.sum_btn {

  width: 92%;
  border-radius: .2rem;
  font-size: 0.35rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: @anttextcolor;
    color:@primary-color;
  border: none;
}

.sum_wrap {
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: rgb(28, 28, 28);
}

.fst_pw {
  width: 94%;
  margin: 0.2rem auto 0.2rem auto;
}

.home_wrap {
  width: 100%;
  height: 100vh;
  //background: #13235a;
  position: relative;
}



.top_tips {
  width: 90%;
  margin: 0.5rem auto;
  text-align: center;
  color: #009c37;
  color: #fee000;
  line-height: 0.5rem;
}

.lst_tips {
  width: 94%;
  margin: 0.5rem auto;
  color: #fee000;
  line-height: 0.5rem;
}

.sec_tips {
  width: 94%;
  margin: 0 auto;
  color: #fff;
  font-size: 0.38rem;
}

.th_tips {
  width: 94%;
  margin: 0.5rem auto 0 auto;
  color: #fff;
  font-size: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lock_icon {
  font-size: 0.45rem;
  color: #fff;
}
</style>

