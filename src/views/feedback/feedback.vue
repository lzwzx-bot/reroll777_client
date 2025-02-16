<template>

  <div class="home_wrap" >

    <van-nav-bar
        title="Bônus de Sugestão"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
    />


    <div class="conus_con">
      <div class="con_txt1">Conteúdo do comentário <span>(Relate os problemas e farei melhorias)</span></div>
      <textarea v-model="content" placeholder="Qualquer feedback seu é muito importante para nós. Opiniões adotadas resultam em diferentes recompensas em dinheiro dependendo do grau de importância. Convidamos você a comentar!"></textarea>
      <div class="contxt2">{{content.length}}/200</div>
<!--      <div class="con_txt1">Anexo<span>(Mais fácil de adotar)</span></div>-->
<!--      <div class="con_sc">-->
<!--        <a href="#">-->
<!--          <div class="jia">+</div>-->
<!--          <p>É suportado o envio de imagens e vídeos (tamanho não superior a 50MB)</p>-->
<!--        </a>-->
<!--      </div>-->
      <div class="con_txt2">
        Regras para recompensas
        <p>Estabelecemos uma grande recompensa para recolher sugestões que permitam otimizar o sistema e o seu funcionamento, a fim de lhe proporcionar uma melhor experiência! Caso sejam adotadas, serão concedidas recompensas.</p>
      </div>
    </div>
    <div class="bon_an"><input name="" @click="showToast" type="button" value="Submeter comentário" /></div>




  </div>
</template>

<script>
import Vue from 'vue';
import {NavBar,Progress } from 'vant';
import Fetch from '../../utils/fetch';
Vue.use(NavBar,Progress);
export default {
  name: "feedback",
  components: {

  },
  data() {
    return {
      lang:this.$i18n.locale||"zh_cn",
      content:"",
    };
  },
  created() {
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      // Fetch('/index/about').then((r) => {
      //   this.data = r.data;
      // });
    },
    onClickLeft(){
      this.$router.push("/");
    },
    showToast(){
      if(this.content.length > 0){
         this.$notify.success({
           title:"Obrigado",
           message:"A equipe tratará seu feedback em tempo hábil"
         });
         setInterval(()=>{

         },1000);
      }
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
    position: relative;
}
.conus_top{
  width: 95%;
  margin: 0 auto;
  display: flex;
  text-align: center;
  .criar{
    width: 2rem;
    background-color: #ecac27;
    line-height: .7rem;
    margin-right: .2rem;
    border-radius: .35rem;
  }
  .meu{
    width: 2rem;
    background-color: #c26928;
    line-height: .7rem;
    margin-right: .2rem;
    color: #e3e3e3;
    border-radius: .35rem;
    border: 1px solid #6f6f6f;
  }
}
.conus_con{
  width: 95%;
  margin: 0 auto;

  .con_txt1{
    line-height: .9rem;
    font-size: .3rem;
    color: #fff;
    span{
      color: #c7c7c7;
    }
  }
  textarea{
    width: 100%;
    font-size: .28rem;
    border: 1px solid #e5e5e5;
    border-radius: .1rem;
    background-color: @secondary-color;
    height: 3rem;
    padding: .2rem;
    line-height: .48rem;
    box-sizing: border-box;
    color: #fff;
  }
  textarea::-webkit-input-placeholder {
    color: @textcolor3;
  }
  .contxt2{
    color: #fff;
    text-align: right;
    font-size: .28rem;
    margin: .2rem 0;
  }
  .con_sc{
    display: block;
    .jia{
      width: 1.8rem;
      height: 1.8rem;
      line-height: 1.5rem;
      text-align: center;
      font-size: 1rem;
      color: #434343;
      background-color: #1c1c1c;
      font-weight: lighter;
      border: 1px solid #434343;
    }
    a{
      color: #777777;
      font-size: .28rem;
      line-height: .48rem;
    }
    p{
      margin: .1rem 0;
    }
  }
  .con_txt2{
    margin-top: .5rem;
    font-size: .3rem;
    color: #fff;
    p{
      color: #c7c7c7;
      line-height: .46rem;
      margin-top: .15rem;
    }
  }
}
.bon_an{
  width: 100%;
  padding: .35rem 2.5%;
  box-sizing: border-box;
  bottom: 0;
  height: 1.6rem;
  
  input{
    width: 100%;
    height: .9rem;
    line-height: .9rem;
    border-radius: .2rem;
    background: @anttextcolor;
    color:@primary-color;
    border: none;
  }

}
</style>