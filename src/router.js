import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    //   mode: "history",
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }, 
    routes: [
        {
            path: "/",
            redirect: {
                name: "index"
            }
        },
        {
            path: "/index",
            name: "index",
            component: () => import(/* webpackChunkName: "home" */ "./views/index/index.vue")
        },
        {
            path: "/activity",
            name: "activity",
            component: () => import(/* webpackChunkName: "home" */ "./views//activity/activity.vue")
        },
        {
            path: "/person",
            name: "person",
            component: () => import(/* webpackChunkName: "home" */ "./views//person/person.vue")
        },
        {
            path: "/recharge",
            name: "recharge",
            component: () => import(/* webpackChunkName: "home" */ "./views//recharge/recharge.vue")
        },
        {
            path: "/setpasswd",
            name: "setpasswd",
            component: () => import(/* webpackChunkName: "home" */ "./views//withdraw/setpasswd.vue")
        },
        {
            path: "/withdraw",
            name: "withdraw",
            component: () => import(/* webpackChunkName: "home" */ "./views//withdraw/withdraw.vue")
        },
        {
            path: "/share",
            name: "share",
            component: () => import(/* webpackChunkName: "home" */ "./views//share/share.vue")
        },
        {
            path: "/support",
            name: "support",
            component: () => import(/* webpackChunkName: "home" */ "./views//support/support.vue")
        },
        {
            path: "/agent",
            name: "agent",
            component: () => import(/* webpackChunkName: "home" */ "./views//agent/agent.vue")
        },
        {
            path: "/agentData",
            name: "agentData",
            component: () => import(/* webpackChunkName: "home" */ "./views//agent/agentData.vue")
        },
        {
            path: "/agentDetail",
            name: "agentDetail",
            component: () => import(/* webpackChunkName: "home" */ "./views//agent/agentDetail.vue")
        },
        {
            path: "/betReward",
            name: "betReward",
            component: () => import(/* webpackChunkName: "home" */ "./views//betReward/betReward.vue")
        },
        {
            path: "/feedback",
            name: "feedback",
            component: () => import(/* webpackChunkName: "home" */ "./views//feedback/feedback.vue")
        },
        {
            path: "/gameRecord",
            name: "gameRecord",
            component: () => import(/* webpackChunkName: "home" */ "./views//game/gameRecord.vue")
        },
        {
            path: "/vip",
            name: "vip",
            component: () => import(/* webpackChunkName: "home" */ "./views//vip/vip.vue")
        },
        {
            path: "/withdrawRecord",
            name: "withdrawRecord",
            component: () => import(/* webpackChunkName: "home" */ "./views//withdraw/withdrawRecord.vue")
        },
        {
            path: "/rechargeRecord",
            name: "rechargeRecord",
            component: () => import(/* webpackChunkName: "home" */ "./views//recharge/rechargeRecord.vue")
        },
        {
            path: "/subGame",
            name: "subgGme",
            component: () => import(/* webpackChunkName: "home" */ "./views//game/subGame.vue")
        },{
            path: "/rechargeBonus",
            name: "rechargeBonus",
            component: () => import(/* webpackChunkName: "home" */ "./views//recharge/rechargeBonus.vue")
        },
        {
            path: "/promote",
            name: "promote",
            component: () => import(/* webpackChunkName: "home" */ "./views//teamList/promote.vue")
        },
        {
            path: "/teamList",
            name: "teamList",
            component: () => import(/* webpackChunkName: "home" */ "./views//teamList/teamList.vue")
        },
        {
            path: "/commission",
            name: "commission",
            component: () => import(/* webpackChunkName: "home" */ "./views/commission/commission.vue")
        },
        {
            path: '*', // 页面不存在的情况下会跳到404页面
            redirect: 'index',
            name: 'index',
            hidden: true
        }
    ]
});
