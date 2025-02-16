<template>
    <div class="userinfo-wrap">

    </div>
</template>

<script>
import Fetch from "@/utils/fetch";

export default {
    name: "userInfo",
    data() {
        return {
            phone: null,
            money: null,
            VIPname: null,
        }
    },
    props: ['username', 'level','total_bet_amount','sub_level_amount'],
    created() {

    },
 
    mounted() {
       // console.log(this.username)
    },
    methods: {
        showMsg() {
            this.$toast({
                background: "#07c160",
                message: "Obrigado pelo seu feedback. Recomendamos que você entre em contato com o atendimento ao cliente e eles anotarão seu comentário.",
                duration: 8000,
                className: "mytoast"
            });
            return;
        },
        logout() {
            Fetch('/user/logout').then((r) => {
                if (r.code == 1) {
                    localStorage.removeItem('token');
                    window.location.href = "/";
                }
            });
        },
        to100(v){
            return (v*100).toFixed(2);
        }
    }
}
</script>

<style scoped lang="less">
.userinfo-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9;
}

.section_1 {
	
    background-image: linear-gradient(to top right, #4D037A, #5D075D);
	margin: 15.06vw 0 0 auto;
    border: 1px solid rgba(1, 40, 21, 0.259);
    border-radius: 10px;
	margin-top: 40px;
	width: 80%;
	height: 200vw;
}

.box_3 {
    width: 81.74vw;
    height: auto;
    padding-bottom: 20px;
    margin: 4.4vw 0 0 2.93vw;
}

.box_4 {
    position: relative;
    width: 74.67vw;
    height: 13.87vw;
    margin: 4.4vw 0 0 0;
}



.label_1 {
    height: 4.8vw;
    margin-left: 5vw;
}

.text-group_1 {
    width: 7.34vw;
    height: 2.8vw;
    overflow-wrap: break-word;
    color: #fff;
    font-size: 3.46vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 3.47vw;
    margin-top: 0.94vw;
}

.image-text_1 {
    width: 47.34vw;
    height: 4.8vw;
    margin: 0;
	margin-top: 33px;
	margin-left: 55px;
}

.image-text_2 {
    width: 18vw;
    height: 7vw;
	border-radius: 16px 0 0 16px;
	line-height: 8vw;
    margin: 0;
	margin-top: 10px;
	padding-left: 3vw;
	background-image: linear-gradient(to right, #50B5FE, #9B65FF);

}

.text-group_2 {
    height: 3.8vw;
    overflow-wrap: break-word;
    font-size: 3.3vw;
    font-family: PingFang-SC-Medium;
    text-align: left;
    white-space: nowrap;
    margin-top: 1.7vw;
}

.label_2 {
	margin-top: 1.6vw;
	margin-right: 2vw;
    height: 3.8vw;
}

.image-text_3 {
    position: absolute;
    left: 0;
    top: 0;
    width: 40vw;
    height: 13.87vw;
}

.image_1 {
    width: 13.87vw;
    height: 13.87vw;
    border: .05rem solid #fff;
    border-radius: 50%;
}

.text-group_3 {
    text-shadow: 2px 3px 0px white;
    width: 23.47vw;
    height: 3.47vw;
    overflow-wrap: break-word;
    // color: rgba(7, 63, 34, 1);
    color: #FFF;
    font-size: 4.53vw;
    font-family: PingFang-SC-Bold;
    font-weight: 700;
    text-align: left;
    white-space: nowrap;
    line-height: 4.54vw;
    margin-top: 2vw;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.box_5 {
    // width: 65.34vw;
	width: 98%;
    padding: 3px;
	
    height: 5vw;
    margin: 0 ;
	margin-top:10px ;
}

.text_1 {
    width: 50%;
    float: left;
    height: 3.07vw;
    overflow-wrap: break-word;
    color: white;
    font-size: 3.2vw;
    font-family: PingFang-SC-Medium;
    text-align: left;
    white-space: nowrap;
}

.text-wrapper_1 {
    width: 45%;
    height: 3.07vw;
    float: right;
    overflow-wrap: break-word;
    font-size: 0;
    font-family: PingFang-SC-Medium;
    text-align: right;
    white-space: nowrap;
    line-height: 3.2vw;
}

.text_2 {
    width: 5.34vw;
    height: 3.07vw;
    overflow-wrap: break-word;
    color: rgba(255,255,255,1);
    font-size: 3.2vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 3.2vw;
}

.text_3 {
    width: 5.34vw;
    height: 3.07vw;
    overflow-wrap: break-word;
    color: #4AB7FF;
    font-size: 3.2vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 3.2vw;
}

.box_6 {
    width: 74.67vw;
    height: 2.4vw;
}

.box_7 {
    background-color: white;
    border-radius: 3px;
    height: 3px;
    margin-top: 2vw;
    width: 63vw;
}

.box_8 {
    box-shadow: 0px 2px 24px 0px rgba(157, 106, 68, 0.3);
    background-color: #4AB7FF;
    border-radius: 3px;
    height: 3px;
}

.text_4 {
    width: 6.14vw;
    height: 2.4vw;
    overflow-wrap: break-word;
    color: #4AB7FF;
    font-size: 2.93vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 2.94vw;
    margin-top: 3px;
	padding-left: 8px;
}

.box_9 {
    width: 65.07vw;
    height: 3.47vw;
    margin: 3.46vw 0 0 4vw;
}

.text_5 {

    width: 36.47vw;
    height: 3.2vw;
    overflow-wrap: break-word;
    color: gold;
    font-size: 3.2vw;
    font-family: PingFang-SC-Medium;
    font-weight: 700;
    text-align: left;
    white-space: nowrap;
    line-height: 3.2vw;

}

.text-wrapper_2 {
    width: 5.34vw;
    height: 3.07vw;
    overflow-wrap: break-word;
    font-size: 0;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 3.2vw;
}

.text_6 {
    width: 5.34vw;
    height: 3.07vw;
    overflow-wrap: break-word;
    color: rgba(19, 40, 22, 1);
    font-size: 3.2vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 3.2vw;
}

.text_7 {
    width: 5.34vw;
    height: 3.07vw;
    overflow-wrap: break-word;
    color: rgba(251, 222, 82, 1);
    font-size: 3.2vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 3.2vw;
}

.box_10 {
    width: 74.67vw;
    height: 2.4vw;
    margin: 0.8vw 0 3.73vw 3.73vw;
}

.box_11 {
    background-color: rgba(19, 40, 22, 0.3);
    border-radius: 3px;
    height: 1.07vw;
    margin-top: 0.8vw;
    width: 66.67vw;
}

.box_12 {
    box-shadow: 0px 2px 24px 0px rgba(157, 106, 68, 0.3);
    background-color: rgba(251, 222, 82, 1);
    border-radius: 3px;
    width: 36.54vw;
    height: 1.07vw;
}

.text_8 {
    width: 6.27vw;
    height: 2.4vw;
    overflow-wrap: break-word;
    color: rgba(251, 222, 82, 1);
    font-size: 2.93vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 2.94vw;
}

.box_13 {
    width: 45vw;
    height: 13.34vw;
    // margin: 1.86vw 0 0 2.66vw;
	margin: 0 0 2vw 0;
	
}

.group_2 {
    background-color: #660F66;
    border-radius: .2rem;
    width: 80%;
    height: 13.34vw;
    align-items: center;
	margin: 1vw 2vw;
}

.image-text_4 {
    width: 24.67vw;
    height: 7.87vw;
    // margin: 2.93vw 0 0 3.73vw;
    margin-left: 3vw;
    align-items: center;
}

.image_2 {
    width: 8.4vw;
}

.text-group_4 {

    overflow-wrap: break-word;
    color: #FFF;
    font-size: .28rem;
    font-family: PingFang-SC-Medium;
    text-align: left;
    white-space: nowrap;
    margin-left: 2vw;

}

.group_3 {
    background-color: rgba(41, 117, 55, 1);
    border-radius: 16px;
    width: 40vw;
    height: 13.34vw;
}

.image-text_5 {
    width: 21.34vw;
    height: 5.47vw;
    margin: 4.13vw 0 0 3.46vw;
}

.image_3 {
    width: 7.2vw;
    height: 5.47vw;
}

.text-group_5 {
    width: 11.47vw;
    height: 2.94vw;
    overflow-wrap: break-word;
    color: rgba(252, 217, 73, 1);
    font-size: 3.73vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 6.14vw;
    margin-top: 1.34vw;
}

.box_14 {
    width: 82.14vw;
    height: 13.34vw;
    margin: 2.4vw 0 0 2.66vw;
}

.group_4 {
    background-color: rgba(41, 117, 55, 1);
    border-radius: 16px;
    width: 40vw;
    height: 13.34vw;
}

.label_3 {
    width: 6.4vw;
    height: 6.27vw;
    margin: 3.73vw 0 0 4vw;
}

.text_9 {
    width: 13.74vw;
    height: 2.94vw;
    overflow-wrap: break-word;
    color: rgba(252, 217, 73, 1);
    font-size: 3.73vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 6.14vw;
    margin: 5.46vw 12.93vw 0 2.93vw;
}

.group_5 {
    background-color: rgba(41, 117, 55, 1);
    border-radius: 16px;
    width: 40vw;
    height: 13.34vw;
}

.label_4 {
    width: 5.87vw;
    height: 6.54vw;
    margin: 3.6vw 0 0 4.13vw;
}

.text_10 {
    width: 12.27vw;
    height: 2.94vw;
    overflow-wrap: break-word;
    color: rgba(252, 217, 73, 1);
    font-size: 3.73vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 6.14vw;
    margin: 5.46vw 14.4vw 0 3.33vw;
}

.box_15 {
    width: 82.14vw;
    height: 13.34vw;
    margin: 2.53vw 0 0 2.66vw;
}

.group_6 {
    background-color: rgba(41, 117, 55, 1);
    border-radius: 16px;
    width: 40vw;
    height: 13.34vw;
}

.label_5 {
    width: 6vw;
    height: 6.4vw;
    margin: 4vw 0 0 4.26vw;
}

.text_11 {
    width: 11.47vw;
    height: 2.94vw;
    overflow-wrap: break-word;
    color: rgba(252, 217, 73, 1);
    font-size: 3.73vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 6.14vw;
    margin: 5.46vw 15.2vw 0 3.06vw;
}

.group_7 {
    background-color: rgba(41, 117, 55, 1);
    border-radius: 16px;
    width: 40vw;
    height: 13.34vw;
}

.image-text_6 {
    width: 30.8vw;
    height: 6.4vw;
    margin: 4.13vw 0 0 3.46vw;
}

.image_4 {
    width: 7.2vw;
    height: 6.4vw;
}

.text-group_6 {
    width: 20.94vw;
    height: 3.6vw;
    overflow-wrap: break-word;
    color: rgba(252, 217, 73, 1);
    font-size: 3.73vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 6.14vw;
    margin-top: 1.34vw;
}

.box_16 {
    width: 82.14vw;
    height: 13.34vw;
    margin: 2.4vw 0 0 2.66vw;
}

.box_17 {
    background-color: rgba(41, 117, 55, 1);
    border-radius: 16px;
    width: 40vw;
    height: 13.34vw;
}

.label_6 {
    width: 6.14vw;
    height: 6.54vw;
    margin: 3.6vw 0 0 4.13vw;
}

.text_12 {
    width: 13.2vw;
    height: 3.6vw;
    overflow-wrap: break-word;
    color: rgba(252, 217, 73, 1);
    font-size: 3.73vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 6.14vw;
    margin: 5.33vw 13.46vw 0 3.06vw;
}

.box_18 {
    background-color: rgba(41, 117, 55, 1);
    border-radius: 16px;
    width: 40vw;
    height: 13.34vw;
}

.label_7 {
    width: 6.14vw;
    height: 6.54vw;
    margin: 3.6vw 0 0 4vw;
}

.text_13 {
    width: 6.67vw;
    height: 2.94vw;
    overflow-wrap: break-word;
    color: rgba(252, 217, 73, 1);
    font-size: 3.73vw;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 6.14vw;
    margin: 5.33vw 20vw 0 3.2vw;
}

.text_14 {
    position: absolute;
    left: 55%;
    bottom: 18vw;
    color: rgba(255, 255, 255, 1);
    font-size: 3.46vw;
    font-family: PingFang-SC-Medium;
}

body * {
    box-sizing: border-box;
    flex-shrink: 0;
}

body {
    font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
        Arial, PingFang SC-Light, Microsoft YaHei;
}

input {
    background-color: transparent;
    border: 0;
}

button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    background-color: transparent;
}

button:active {
    opacity: 0.6;
}

.van-nav-bar__left:active,
.van-nav-bar__right:active {
    opacity: 1;
}

[class*='van-']::after {
    border-bottom: 0;
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.flex-row {
    display: flex;
    flex-direction: row;
}

.justify-start {
    display: flex;
    justify-content: flex-start;
}

.justify-center {
    display: flex;
    justify-content: center;
}

.justify-end {
    display: flex;
    justify-content: flex-end;
}

.justify-evenly {
    display: flex;
    justify-content: space-evenly;
}

.justify-around {
    display: flex;
    justify-content: space-around;
}

.justify-between {
    display: flex;
    justify-content: space-between;
}

.align-start {
    display: flex;
    align-items: flex-start;
}

.align-center {
    display: flex;
    align-items: center;
}

.align-end {
    display: flex;
    align-items: flex-end;
}
</style>