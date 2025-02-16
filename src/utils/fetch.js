import axios from 'axios'
import qs from "qs"
import {
	Toast
} from 'vant'
import router from '@/router'
import api from "../interface/index"
//import {Notify} from 'vant'
import {
	Dialog
} from 'vant';

let loadingCount = 0;

export const showLoading = () => {
	if (loadingCount <= 0) {
		Toast.loading({
			// mask: true,
			//icon:'../views/images/ld.gif',
			duration: 20000
		})
	}
	loadingCount++
}

export const hideLoading = () => {
	loadingCount--;
	if (loadingCount <= 0) {
		Toast.clear()
		loadingCount = 0
	}
};

let ssid = localStorage.getItem('ssid');

export default async (url, data, opt, isLoad = true) => {
	if (isLoad) {
		showLoading();
	}
	url = api.commonUrl + "/api" + url;
	const set = {
		method: 'post',
		...opt
	};
	
	var token = localStorage.getItem('token');
	var language = localStorage.getItem("lang")||"pt_br";
	//console.log(language);
	//设置请求头
	const header = {
		headers:{
			"token": token
		}
	};
	return (set.method === 'post' ? axios.post(url, {
		...data,
		language
	},header) : axios.get(url + '?' + qs.stringify({
		...data,
	}),header)).then(r => {
		
		if (isLoad) {
			hideLoading();
		}
		if (r.status === 200) {
			return r.data;
		}
		
		
		throw {
			msg: 'inter error pls try again'
		};

	}).then(r => {
		
		return r
	}).catch(r => {
		
		if (isLoad) {
			hideLoading();
		}
		console.log(r);

		if(String(r).indexOf("Request failed with status code 401") != -1){
			//说明用户需要登录了
			localStorage.removeItem('token');
			// router.push('index');
			vm.$children[0].login();

		}

		console.log("请求出错了....")
		throw '';
	})
}
