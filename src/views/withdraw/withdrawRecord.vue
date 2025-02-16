<template>
  <div class="home_wrap">

    <van-nav-bar
        title="Lista De Retirada"
        left-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
    <div class="detail_box">
      <div class="item" v-for="item in data" :key="item">
        <div class="de_wrap">
          <p class="tit">{{ item[lang] }}</p>
          <p v-if="item.remark" class="time">
            {{ item.remark }}
          </p>
          <p class="time">{{ item.time }}</p>
        </div>
        <div class="price" :class="item.type == '1' ? '' : 'del'" v-html="
          item.type == '1'
            ? $t('utils.moneyMark') + item.money
            : '-' + $t('utils.moneyMark') + item.money
        "></div>
      </div>
    </div>

    <div v-for="(item, k) in re_list" :key="k" class="recharge-one">

      <div class="order-status">
        <div class="order"  @click="doCopy(item.order_no)">
          {{ $t("订单号") }} {{ item.order_no }}
          <img  src="../../assets/images/share/copy_h.png" alt="">
        </div>
        <div v-if="item.status == 0" class="unpay1">
          <b>{{ $t("审核中") }}</b>
        </div>
        <div v-if="item.status == 1" class="unpay1">
          <b>{{ $t("已打款") }}</b>
        </div>
        <div v-if="item.status == 2" class="unpay1">
          <b>{{ $t("拒绝") }}</b>
        </div>
        <div v-if="item.status == 3" class="unpay1">
          <b>{{ $t("失败") }}</b>
        </div>
        <div v-if="item.status == 4" class="unpay1">
          <b>{{ $t("打款中") }}</b>
        </div>
      </div>

      <div class="money3">
        <div class="m-1">
          <div class="mmm">{{ item.money }}</div>
          <div class="mdec">{{ $t("提现金额") }}</div>
        </div>
        <div class="m-1">
          <div class="mmm">{{ item.fee }}</div>
          <div class="mdec">{{ $t("手续费") }}</div>
        </div>
        <div class="m-1">
          <div class="mmm">{{ item.real_money }}</div>
          <div class="mdec">{{ $t("到账金额") }}</div>
        </div>
      </div>

      <div class="is_active">
        <div> {{ $t("备注") }} <b style="color:#F3FF38">{{ item.remark ? item.remark : $t("审核中") }}</b> </div>
        <!-- <div> {{ $t("打码要求") }}:{{ item.typing_amount }}</div> -->
      </div>

      <div class="ct-time2" v-show="show_more">
        <div>Conta</div>
        <div style="float: right;color: #fc661e">{{ item.cpf }}</div>
      </div>
      <div class="ct-time2" v-show="show_more">
        <div>Número de telefone</div>
        <div style="float: right;color: #fc661e">{{ item.phone_number }}</div>
      </div>

      <!-- <div class="ct-time">{{ $t("创建时间") }}:  {{ item.time }}</div> -->
      <div class="ct-time">
        <div> {{ item.time }}</div>
        <div class="showmore" @click="show_more = !show_more">{{ $t("查看详情") }} ⇊</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import { DropdownMenu, DropdownItem,NavBar } from "vant";

import { Empty } from "vant";

Vue.use(Empty);
Vue.use(DropdownMenu).use(DropdownItem).use(NavBar);

export default {
  name: "withdrawRecord",
  data() {
    return {
      lang: this.$i18n.locale || "zh_cn",
      data: [],
      list: {},
      account: 0,
      option: [],
      listShow: false,
      funds: 0,
      mymoney: 0,
      userName: "",
      re_list: [],
      show_more:false
    };
  },
  components: {

  },
  created() {
  },
  mounted() {
    Fetch("/Withdrow/withdrawList").then((r) => {
      //console.log(r);
      this.re_list = r.data;

    });
  },
  methods: {
    chooseType(val) {
      if (val == 0) {
        Fetch("/user/funds").then((r) => {
          this.data = r.data.list;
          this.showError(r.data.list.length);
        });
      } else {
        Fetch("/user/funds", {
          reason_id: val,
        }).then((r) => {
          this.data = r.data.list;
          this.showError(r.data.list.length);
        });
      }
    },
    showError(len) {
      len == 0 ? (this.listShow = true) : (this.listShow = false);
    },
    onClickLeft(){
      this.$router.push("/");
    },
    doCopy(val) {
      let _this = this;
      this.$copyText(String(val)).then(
          function (e) {
            _this.$toast({
              background: "#07c160",
              message: _this.$t("复制成功"),
            });
          },

      );
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
.home_wrap {
  width: 100%;
  min-height: 100vh;
  //background-color: rgb(48, 48, 48);
  padding-bottom: 1.8rem;
  padding-top: 1.5rem;
}
.tpng {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.bpng {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.myteam-bg {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.showmore {
  height: 30px;
  line-height: 30px;
  cursor: pointer;

}

.ct-time2 {
  padding: 0.2rem 15px;
  font-size: 0.34rem;
  display: flex;
  justify-content: space-between;

}

.ct-time {
  padding: 3px 15px;
  font-size: 0.34rem;
  display: flex;
  justify-content: space-between;
  align-items: center;


}

.is_active {
  padding: 15px 15px;
  font-size: 0.34rem;
  line-height: 16px;
  // display: flex;
  justify-content: space-between;
}

.mdec {
  margin-top: 10px;
  width: 100%;
  color: #fff;
}

.mmm {
  width: 100%;
  font-weight: 700;
  color: gold;
}

.m-1 {
  width: 33.33%;
  padding: 0;
  text-align: center;
}

.m-1:nth-child(1) {
  border-right: 1px solid #e5e5e5;
}

.m-1:nth-child(2) {
  border-right: 1px solid #e5e5e5;
}

.money3 {
  width: 95%;
  margin: 0 auto;
  padding: 10px 10px;
  display: flex;
  justify-content: space-around;
  color: #fff;
  border-bottom: thin solid #e5e5e5;
}

.order {
  font-size: 0.3rem;
  img{
    position: absolute;
    top: 0;
    left: 55%;
    width: .35rem;
    margin-top: 0.6rem;
  }
}

.status {
  // width: 60px;
  padding: 0 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  //background: linear-gradient(to right, rgb(166, 0, 146), rgb(97, 17, 207));
}

.unpay,
.unpay1,
.unpay2,
.unpay3,
.unpay4 {
  // width: 60px;
  padding: 0 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  color: #fc661e;
  //background:  linear-gradient(90deg, #3FBBFE 0%, #A541FF 100%);
}



.order-status {
  width: 100%;
  box-sizing: border-box;
  padding: 15px 0 8px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: thin solid #e5e5e5;

}

.recharge-one {
  width: 90%;
  margin: 0 auto 0.3rem auto;
  border-radius: 8px;
  color: #fff;
  overflow: hidden;
  position: relative;
  background: @secondary-color;
  padding: 0 0;
  font-size: 0.3rem;
}

.basic_wrap {
  margin-top: 0;
  padding-top: 1.8rem;
  position: relative;
}

/deep/ .base-header {
  background: transparent;
}
</style>
