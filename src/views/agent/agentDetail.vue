<template>
    <div class="home_wrap">
        <van-nav-bar
        title="agentDetails"
        left-text=""
        left-arrow
        :fixed="true"
        @click-left="onClickLeft"
    />
        <div class="receive_bg">
            <ul>
                <li v-for="(item,idx) in boxTableList" :key="idx">
                    <div class="receive_mid">
                        <div class="receive_mid_item">
                            <div>{{item.num_id}}</div>
                            <p>Número de série do baú do tesouro</p>
                        </div>
                        <div class="receive_mid_item">
                            <div>{{item.condition}}</div>
                            <p>Número de pessoas</p>
                        </div>
                        <div class="receive_mid_item">
                            <div>{{item.money}}</div>
                            <p>Montante recebido</p>
                        </div>
                    </div>
                    <div class="receive_bt">
                        <div class="receive_bt_txt1">{{ formatDateTime(item.createtime) }}</div>
                        <!-- <div class="receive_bt_txt1">{{ new Date(item.createtime * 1000).toLocaleString() }}</div> -->
                        <div class="receive_bt_txt">Recebido</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    
</template>
  
  <script>
  import Vue from 'vue';
  import {NavBar} from 'vant';
  import Fetch from '../../utils/fetch';
  import ft from "../../components/ft"
  
  Vue.use(NavBar);
  export default {
    name: "agentDetail",
    components: {
      ft
    },
    data() {
      return {
        boxTableList:[],
      };
    },
   
    created() {
  
    },
    mounted() {
      this.start();
    },
    methods: {
      start() {
        Fetch('/box/getBoxTableList').then((r) => {
            this.boxTableList = r.data;
            console.log(this.boxTableList);
        }); 
      },
      onClickLeft(){
        this.$router.push("/");
      },
      formatDateTime(timestamp) {
                const dateObject = new Date(timestamp * 1000);
                const time = dateObject.toLocaleTimeString();
                const date = dateObject.toLocaleDateString();
                return `${time} ${date}`;
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
    .home_wrap {
    width: 100%;
    min-height: 100vh;
    //background-color: rgb(48, 48, 48);
    padding-top: 1.2rem;
    padding-bottom: 1.5rem;
}
    .receive_bg{

    }

    .receive_bg li{
        width: 95%;
        box-sizing: border-box;
        margin: .5rem auto .2rem auto;
        border-radius: .2rem;
        background: @secondary-color;
        color: #fff;
        padding: .3rem;
    }
    
    .receive_mid{
        display: flex;
        margin-top: .1rem;
    }
    .receive_mid_item{
        text-align: center;
        width: 100%;
        font-weight: 700;
        color: #feb705;
        p{
            color: #e3e3e3;
        }
    }
    .receive_bt{
        display: flex;
        margin-top: .2rem;
    }
    .receive_bt_txt{
        padding: .2rem;
        border-radius: 1rem 0 0 1rem;
        background: #feb705;
    }
    .receive_bt_txt1{
        padding-left: .2rem;
        flex-grow: 1;
        margin: auto;
    }
  </style>
  