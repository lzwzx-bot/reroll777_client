<template>
    <div class="home_wrap">
        <van-nav-bar title="Bônus Extra De Depósito Inicial" left-text="" left-arrow :fixed="true"
            @click-left="onClickLeft" />

        <div class="bonus-wrap">
            <div>Não existem prémios a receber neste momento</div>
            <table>
                <tr class="tb-bgl">
                    <th>Primeira recarga</th>
                    <th>Valor Da Recompensa</th>
                </tr>
                <tr v-for="(item, index) in rechargeConfigList" :key="index" :class="index % 2 == 1 ? 'tb-bgl' : ''">
                    <td>≥{{ item.min_money }}</td>
                    <td>{{ item.gift_amount }}</td>
                </tr>
            </table>
        </div>
        <div class="bonus_bottom">
            <div ><span>Instruções Do Evento:</span>
                <div>1.Exclusivo para a primeira recarga da conta, com apenas uma chance. Quanto mais você recarrega,
                    mais recompensas recebe, sendo a maior recompensa de 3777;<br>2.Depósito sem limite. Recompensas
                    previstas para serem atualizadas em 10 minutos. Por favor, aguarde a distribuição da
                    recompensa;<br>3.As recompensas recebidas só podem ser resgatadas após Hoje00:00:00. O resgate só
                    pode ser feito manualmente no APP/iOS、APP/Android、PC/Windows.<br>4.As recompensas recebidas
                    expirarão 1 dias após o término de cada ciclo. As recompensas expiradas serão canceladas
                    automaticamente;<br>5.O bônus (principal+bônus) dado por esta atividade exige que1 façam de apostar
                    válidos, e a apostas é uma plataforma de jogo ilimitada;<br>6.Este evento é limitado a operações
                    normais realizadas pelo titular da conta. É proibido alugar, usar plug-ins externos, robôs, apostar
                    em contas diferentes, brushing mútuo, arbitragem, interface, protocolo, exploração de
                    vulnerabilidades, controle de grupo ou outros meios técnicos para participar. Caso contrário, as
                    recompensas serão canceladas ou deduzidas, a conta será congelada ou até mesmo adicionada à lista
                    negra;<br>7.A fim de evitar diferenças na compreensão do texto, a plataforma manterá a interpretação
                    final deste evento.<br></div>
            </div>
        </div>

        <ftNav></ftNav>
    </div>
</template>
<script>
import Fetch from '../../utils/fetch';

import Vue from 'vue';
import ftNav from "../../components/footer_nav/footer_nav"
import { NavBar } from 'vant';


Vue.use(NavBar);
export default {
    name: "rechargeBonus",
    components: {
        ftNav
    },
    data() {
        return {
            rechargeConfigList: [],
        }
    },
    created() {
        this.$bus.$emit('send2ftnav', 1);
        //this.active_list();
        Fetch("/recharge/rechargeConfigList", {}).then((res) => {
            //console.log(res);
            if (res.data.is_open) {
                this.rechargeConfigList = res.data.config_list;
            }
        });
    },
    beforeDestroy() {
    },
    mounted() {

    },
    methods: {
        onClickLeft() {
            this.$router.push("/activity");
        }


    }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/variables.less";
/deep/ .van-nav-bar {
    background: @secondary-color;
}

/deep/ .van-nav-bar .van-icon {
    color: @textcolorf;
}

/deep/ .van-nav-bar__title {
    color: @textcolorf;
}

.home_wrap {
    width: 100%;
    min-height: 100vh;
    //background-color: rgba(0, 0, 0,0.5);
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

.bonus-wrap {
    width: 95%;
    margin: 0 auto;
    font-size: 0.36rem;
    div {
        width: 100%;
        color: @textcolorf;
        padding: 0.4rem 0.2rem;
        box-sizing: border-box;
        text-align: center;
        background-color:@secondary-color;
    }

    table {
        padding: 0.4rem 0.2rem;
        text-align: center;
        margin-top: 0.3rem;
        color: @textcolorf;
        width: 100%;
        background-color: @secondary-color;
    }

    th {
        width: 50%;
        padding: 0.2rem;
    }

    td {
        padding: 0.2rem;
    }
}

.tb-bgl {
    background-color: @third-color;
}
.bonus_bottom{
    width: 95%;
    margin: 0.3rem auto;
    padding: 0.4rem;
    box-sizing: border-box;
    background-color: @secondary-color;
    font-size: 0.36rem;
    span{
        color: @textcolorf;
        
        font-weight: 700;
    }
    div{
        color: @textcolorf;
    }
}

</style>