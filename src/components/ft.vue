<template>
  <div class="ftbg">


    <div class="wrappp">

      <div class="ft_nav">
        <div class="nav_head">Cassino</div>
        <a href="#" class="nav_item">Eventos</a>
        <a href="#" class="nav_item">Rebate</a>
        <a href="#" class="nav_item">Bônus</a>
        <a href="#" class="nav_item">VIP</a>
        <a href="#" class="nav_item">Convidar</a>
      </div>
      <div class="ft_nav">
        <div class="nav_head">Jogos</div>
        <a href="#" class="nav_item">Slots</a>
        <a href="#" class="nav_item">Blockchain</a>
      </div>
      <div class="ft_nav">
        <div class="nav_head">Suporte</div>
        <a href="#" class="nav_item">Suporte online</a>
        <a href="#" class="nav_item">Central de Ajuda</a>
        <a href="#" class="nav_item">Bônus de Sugestão</a>
      </div>

    </div>

    <div class="scwrap">

        <div class="logos">
          <img src="../assets/images/footer/facebook.png" class="other_logo" alt="">
          <img src="../assets/images/footer/tg.png" class="other_logo" alt="">
          <img src="../assets/images/footer/wa.png" class="other_logo" alt="">
          <img src="../assets/images/footer/18plus.png" class="other_logo" alt="">
        </div>

        <div class="description">
           {{$store.state.config.site_name}} Group é a empresa de operação de cassino online mais famosa do mundo e oferece entretenimento emocionante e divertido com dealers ao vivo incluindo cidade, jogos de mesa, eletrônicos, pesca, loteria, esportes, etc. Group é autorizado e regulamentado pelo Governo de Curaçao e opera de acordo com a licença (Núm. Antillephone) emitida para 8048/JAZ. Group passou por todas as auditorias em conformidade e está legalmente autorizado a operar todos os jogos de oportunidade e apostas.
        </div>

    </div>

    <div class="thwrap">

      <div class="logoss">
        <img src="../assets/images/footer/1.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/2.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/3.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/4.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/5.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/6.png" class="other_logo2" alt="">
      </div>
      <div class="logoss">
        <img src="../assets/images/footer/7.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/8.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/9.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/10.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/11.png" class="other_logo2" alt="">
      </div>

      <div class="logoss">
        <img src="../assets/images/footer/12.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/13.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/14.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/15.png" class="other_logo2" alt="">
      </div>

      <div class="logoss">

        <img src="../assets/images/footer/16.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/17.png" class="other_logo2" alt="">
        <img src="../assets/images/footer/18.png" class="other_logo2" alt="">
      </div>



    </div>



    <div class="cr">
      <div class="text-wrapper_4" style="color: #fff;font-size: 0.3rem;">
        <span>
           &nbsp;&#64;Direitos autorais
        </span>
        <span id="lightname" > {{$store.state.config.site_name}}&nbsp;&nbsp;</span>
        <span>&nbsp;2002-2024</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import "../assets/css/variables.less";

#lightname{
  color: @anttextcolor;
}
.ftbg {
  background-color: @primary-color;
  padding-bottom: 2.5rem;
}

.wrappp {
  width: 92%;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  border-bottom: 0.04rem solid  @bodercolor;
}
.scwrap{
  width: 92%;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: 0.05rem solid @bodercolor;
}
.thwrap{
  width: 92%;
  margin: 0 auto;
  padding: 10px 0;
}
.logos{
  width: 50%;
  margin: 0.3rem auto;
  display: flex;
  justify-content: space-around;
}

.other_logo{
  width: 1rem;
  height: 1rem;
}
.logoss{
  width: 100%;
  margin: 0.3rem auto;
  display: flex;
  justify-content: center;
}
.other_logo2{
  width: 1.3rem;
  height: 0.6rem;
  margin: 0 0.1rem;
  //color: #777777;
}
.description{
  color: @textcolor3;
  font-size: 0.25rem;
  line-height: 0.25rem;
  margin-bottom: 0.3rem;
}
.ft_nav {
  width: 33%;
  text-align: left;
  box-sizing: border-box;
  padding: 0.5rem 0.3rem 0.5rem 0.2rem;
}

.nav_head {
  height: 1rem;
  line-height: 1rem;
  color: #fff;
}
.nav_item{
  display: block;
  height: 0.5rem;
  color:  @textcolor3;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.cr {
  padding-bottom: 25px;
  text-align: center;
  color: #e14ce1;
  margin-top: 0.8rem;
}


.footer-logos {
  background-image: linear-gradient(
      90deg,
      rgba(138, 53, 128, 1) 0,
      rgba(138, 53, 128, 1) 0,
      rgba(111, 7, 184, 1) 100%,
      rgba(111, 7, 184, 1) 100%
  );
  display: flex;
  width: 92%;
  margin: .5rem auto;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: .3rem;
  padding: .3rem;
}

.footer-logos img {
  width: 23%;
}

.footer-imgs img {
  width: 30px;
}

</style>