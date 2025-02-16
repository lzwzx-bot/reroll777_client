
const config = {
	state: {
        site_name:"REROLL777",
        download_url:"https://download.WynnXwin.com/",
        ssid:"",
        error:localStorage.getItem('error')||null,
        kefu_link: '',
        userPhone:"",//用户的手机号码
        TelegramGroup:"https://t.me/+zfRMbZdQ2FU1OGM1",
	},
	mutations: {
		setConfig (state,data) {
            //console.log(data)
            state.ssid = data.data.ssid;
            state.error = data.data.error
            state.kefu_link = data.data.kefu_link
        }
    },
}

export default config
