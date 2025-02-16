<template>
    <div class="home_wrap">
        <van-nav-bar title="Commission" left-text="" left-arrow @click-left="onClickLeft" />
        <div class="commission_top">
            <div class="user">
                <div>
                    <span>Uid: </span>
                    <span class="white">{{ info.uid }}</span>
                </div>
                <div>
                    <span>Equilíbrio: </span>
                    <span class="gold">{{ info.balance }}</span>
                </div>
            </div>
            <div class="user">
                <div>
                    <span>Nome De Usuário: </span>
                    <span class="white">{{ info.username }}</span>
                </div>
                <!-- <div>
                    <span>Valor Acumulado Recebido: </span>
                    <span class="gold">{{ rechargeInfo.ed_money }}</span>
                </div> -->
                <div>
                    <span>Taxa De Comissão: </span>
                    <span class="gold">{{ info.rate }}%</span>
                </div>
            </div>
            <!-- <div class="user">

            </div> -->
        </div>
        <div class="commission_top">
            <div class="user">
                <div>
                    <span>Valor Total De Recarga: </span>
                    <span class="gold">{{ rechargeInfo.recharge_money }}</span>
                </div>
                <div>
                    <span>Bônus Total: </span>
                    <span class="gold">{{ rechargeInfo.total_money }}</span>
                </div>
            </div>
            <div class="user">
                <div>
                    <span>Valor Recebido: </span>
                    <span class="gold">{{ rechargeInfo.ed_money }}</span>
                </div>
                <div>
                    <span>Valor Não Reivindicado: </span>
                    <span class="gold">{{ rechargeInfo.pre_money }}</span>
                </div>
            </div>
            <van-button plain type="primary" @click="receber" size="large">Receber</van-button>
        </div>
        <div class="commission_List">
            <table id="tc-table">
                <tr style="color: #111" class="tc_bgw">
                    <th>UID</th>
                    <th>Nome De Usuário</th>
                    <th>Quantia</th>
                    <th>Tempo</th>
                </tr>
                <tr v-for="(item, index) in tableList" v-show="index < step_show && tableList.length > 0" :key="index">
                    <td>{{ item.source_uid }}</td>
                    <td>{{ item.nickname }}</td>
                    <td>{{ item.commission }}</td>
                    <td>{{ item.createtime }}</td>
                </tr>
                <div style="position: absolute; left: 36%;bottom: 58%;" v-show="tableList.length == 0">Ainda não há
                    dados</div>
            </table>

            <div v-show="tableList.length > step_show" class="show_more" @click="showMore(tableList.length)">
                <div>
                    Mostrando {{ step_show }} de {{ tableList.length }} registros de recarga
                </div>
                Mostre mais ⇊
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { NavBar, Button } from 'vant';
import Fetch from '../../utils/fetch';
import ftNav from "../../components/footer_nav/footer_nav"
Vue.use(NavBar).use(Button);
export default {
    name: "commission",
    components: {
        ftNav
    },
    data() {
        return {
            tableList: [],
            step_show: 10,
            info: {},
            rechargeInfo: {}
        };
    },
    created() {
    },
    mounted() {
        this.getList();
    },
    methods: {
        onClickLeft() {
            this.$router.push("/activity");
        },
        showMore(idx) {
            this.step_show += 10;
        },
        receber() {
            console.log("领取佣金，刷新页面");
            Fetch("/box/allReceive").then((r) => {
                if (r.code == 1) {
                    this.getList();
                } else {
                    this.$toast({
                        background: "#07c160",
                        message: r.msg,
                        duration: 5000,
                    });
                }
            });
        },
        getList() {
            Fetch("/box/commissionlist").then((r) => {
                if (r.data) {
                    this.tableList = r.data.list;
                    this.info = r.data.userinfo;
                    this.rechargeInfo = r.data.recharge
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/variables.less";

/deep/ .van-nav-bar {
    background: @primary-color;
}

/deep/ .van-nav-bar .van-icon {
    color: #fff;
}

/deep/ .van-nav-bar__title {
    color: #fff;
}

/deep/ .van-button--plain.van-button--primary {
    background-color: @third-color;
    border: none;
    color: #fff;
    font-size: .32rem;
    height: 1rem;
    border-radius: .2rem;
}

.home_wrap {
    width: 100%;
    min-height: 80vh;
    //background-color: #1A45B1;
    padding-bottom: 1.8rem;

    .commission_List {
        width: 95%;
        margin: 0.2rem auto 0 auto;
        color: #fff;
        padding: 0.3rem;
        border-radius: 0.2rem;
        background-color: @primary-color;
        font-size: 0.3rem;
        box-sizing: border-box;
        min-height: 3rem;
    }

    .commission_top {
        width: 95%;
        margin: 0.2rem auto 0 auto;
        color: #fff;
        padding: 0.3rem;
        border-radius: 0.2rem;
        background-color: @primary-color;
        font-size: 0.3rem;
        box-sizing: border-box;

        .user {
            display: flex;
            justify-content: space-between;
            font-size: .32rem;
            margin-bottom: .3rem;
            color: #fff;
            // overflow: hidden;


            .white {
                color: #ffffff;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // white-space: nowrap;
            }

            .gold {
                color: #ebc96f;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .user:last-child {
            margin-bottom: 0;
        }
    }

    #tc-table {
        border: none;
        margin: auto;
        text-align: center;
        table-layout: fixed;
        width: 100%;
        background-color: @primary-color;
        // padding: 0.2rem;
        color: #c7c7c7;

        th {
            height: 0.8rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        td {
            width: 50%;
            height: 0.8rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            // border-right: 1px solid rgba(255,255,255,0.2);
        }
    }

    // .tc_bgw th {
    //     width: auto;
    //     /* 自适应列宽 */
    // }

    .tc_head {
        padding: 0.3rem 0 0.4rem 0;
        text-align: center;
        font-weight: 700;
        font-size: larger;
        color: #fff;
    }

    .tc_bgw {
        padding: 0;
        background-color: @primary-color;
        color: #fff !important;
        border-width: 0;
    }

    .tcbtn {
        background: @anttextcolor;
        color: @primary-color;
        padding: 0.2rem;
        border-radius: 0.1rem;
        float: right;
        margin-top: -0.7rem;
    }

    .show_more {
        color: @textcolor3;
        width: 95%;
        margin: 0 auto;
        border-radius: 0.2rem;
        text-align: center;
        font-size: 0.35rem;

        div {
            height: 0.5rem;
            line-height: 0.5rem;
            color: #fff;
        }
    }
}
</style>