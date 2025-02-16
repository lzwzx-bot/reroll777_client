import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import {Notify, Dialog} from 'vant'
import vueTouch from "vue-plugin-touch"
import touch from 'vue-directive-touch'
import VueI18n from 'vue-i18n'
import 'lib-flexible'
import 'vant/lib/index.css';
import VueClipboard from 'vue-clipboard2'
import vueEsign from 'vue-esign'
import VModal from 'vue-js-modal'
import {Popup} from 'vant';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/pt-br.js';

Vue.use(Popup);
Vue.use(Notify).use(Dialog).use(vueTouch).use(touch).use(VueI18n).use(VueClipboard).use(vueEsign).use(VModal);
Vue.use(ElementUI,{locale});


const i18n = new VueI18n({
    locale: localStorage.getItem("lang") || "pt_br",
    messages: {
        'pt_br': require('./assets/languages/pt_br.json'),
        'en_us': require('./assets/languages/en_US.json'),
        'zh_cn': require('./assets/languages/zh_cn.json'),
    }
});
Vue.config.productionTip = false;

window.vm = new Vue({
    beforeCreate() {
        // 尽量早地执行挂载全局事件总线对象的操作
        Vue.prototype.$bus = this;
    },
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');


