<template>
  <div id="footer" class="hidden-sm-and-up">
    <router-link to="/" class="footer_item" :class="active == 0? 'active' :''">
      <div class="icon_wrap">
         <img v-if="active == 0" src="../../assets/images/footer_nav/nav01_h.png" class="fimg">
         <img v-else src="../../assets/images/footer_nav/nav01.png" class="fimg">
      </div>
      <p class="footer_info">Inicio</p>
    </router-link>
    <router-link to="/activity" class="footer_item" :class="active == 1? 'active' :''">
      <div class="icon_wrap">
        <img v-if="active == 1" src="../../assets/images/footer_nav/nav02_h.png" class="fimg">
         <img v-else src="../../assets/images/footer_nav/nav02.png" class="fimg">
      </div>
      <p class="footer_info">Promoção</p>
    </router-link>
    <router-link to="/recharge" class="footer_item" :class="active == 2? 'active' :''">
      <div class="icon_wrap">
        <img v-if="active == 2" src="../../assets/images/footer_nav/nav03_h.png" class="fimg">
         <img v-else src="../../assets/images/footer_nav/nav03.png" class="fimg">
      </div>
      <p class="footer_info">Fundos</p>
    </router-link>
    <router-link to="/support" class="footer_item" :class="active == 3? 'active' :''">
      <div class="icon_wrap">
        <img v-if="active == 3" src="../../assets/images/footer_nav/nav04_h.png" class="fimg">
         <img v-else src="../../assets/images/footer_nav/nav04.png" class="fimg">
      </div>
      <p class="footer_info">Suporte</p>
    </router-link>
    <router-link to="/person" class="footer_item" :class="active == 4? 'active' :''">
      <div class="icon_wrap">
        <img v-if="active == 4" src="../../assets/images/footer_nav/nav05_h.png" class="fimg">
         <img v-else src="../../assets/images/footer_nav/nav05.png" class="fimg">
      </div>
      <p class="footer_info">Perfil</p>
    </router-link>
  </div>
</template>
<script>
export default {


  data() {
    return {
        active:0,
    };
  },
  created() {
    // console.log(this.active)
      this.$bus.$on('send2ftnav',(idx)=>{
          this.active = idx;
      })
  },

};
</script>
<style lang="less" scoped>
@import  "../../assets/css/variables.less";
#footer {
  position: fixed;
  height: 1.6rem;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: @primary-color;
  z-index: 3;
  //background-image: url("../../assets/images/footer/bg.jpg");
}

.footer_item {
  display: flex;
  width: 25%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.3rem 0;
}

.icon_wrap {
  width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.nav_01{
  background-image: url(../../assets/images/index/nav01.png);
}
.nav_02{
  background-image: url(../../assets/images/index/nav02.png);
}
.nav_03{
  background-image: url(../../assets/images/index/nav03.png);
}
.nav_04{
  background-image: url(../../assets/images/index/nav04.png);
}
.nav_05{
  background-image: url(../../assets/images/index/nav05.png);
}
.ft_icon {
  font-size: 0.667rem;
  color: #8f6ae9;
}

.footer_info {
  color: @textcolorf;
  margin-top: 0.1rem;
}
.active .nav_01{
  background-image: url(../../assets/images/index/nav01_h.png);
}
.active .nav_02{
  background-image: url(../../assets/images/index/nav02_h.png);
}
.active .nav_03{
  background-image: url(../../assets/images/index/nav03_h.png);
}
.active .nav_04{
  background-image: url(../../assets/images/index/nav04_h.png);
}
.active .nav_05{
  background-image: url(../../assets/images/index/nav05_h.png);
}
.active .ft_icon{
  font-size: 0.8rem;
  color: #c74cf9
}
.active .footer_info{
  color: @anttextcolor;
}
.fimg{
  width: 1.1rem;
}
</style>