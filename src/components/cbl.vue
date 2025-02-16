<template>
  <el-row class="cbl">
    <el-col :span="24">
      <!-- 上半部分菜单 -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo custom-menu top-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#5D075D"
        text-color="#E14CE1"
        active-text-color="#ffd04b"
      >
        <div class="half-width-items">
          <el-menu-item index="1" class="half-width" @click="category = 'hot'">
            <img src="../views/images/home/hot.png" class="menu-item-image">
            <span>Popular</span>
          </el-menu-item>
		  <el-menu-item index="2" class="half-width" @click="category = 'PG'">
		    <img src="../views/images/home/pg.png" class="menu-item-image">
		    <span>PG Slots</span>
		  </el-menu-item>
		  <el-menu-item index="3" class="half-width" @click="category = 'JDB'">
		    <img src="../views/images/home/jdb.png" class="menu-item-image">
		    <span>JDB Slots</span>
		  </el-menu-item>
		  <el-menu-item index="4" class="half-width" @click="category = 'TADA'">
		    <img src="../views/images/home/tada.png" class="menu-item-image">
		    <span>TADA</span>
		  </el-menu-item>
		  <el-menu-item index="5" class="half-width" @click="category = 'SPRIBE'">
		    <img src="../views/images/home/spribe.png" class="menu-item-image">
		    <span>SPRIBE</span>
		  </el-menu-item>
		  
          <!-- ...其他上半部分菜单项，保持类似结构 -->
        </div>
		<el-menu-item index="6">
		  <i class="el-icon-menu"></i>
		  <span>Baixar App</span>
		</el-menu-item>
		<el-menu-item index="7">
		  <i class="el-icon-menu"></i>
		  <span>Suporte</span>
		</el-menu-item>
		<el-menu-item index="8">
		  <i class="el-icon-menu"></i>
		  <span>FAQ</span>
		</el-menu-item>
      </el-menu>
	
    
      </el-menu>
    </el-col>
  </el-row>
  
</template>

<style>
.cbl {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}
.custom-menu {
  margin-top: 40px;
  height: 900px;
  width: 40%;
}
 .half-width-items {
	margin-top: 50px;
	display: flex;
   flex-wrap: wrap;
   height: 220px;
}


 .el-menu-item.half-width {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.half-width{
	height: 30px;
}
.top-menu .el-menu-item.half-width i {

  margin-bottom: 8px; /* Adjust icon spacing */
}
.bottom-menu .el-menu-item {
  width: 100%;
}
</style>

<script>
import Vue from "vue";
import Fetch from "../utils/fetch.js";
import ft from "../components/ft.vue";
export default {
	
  name: "cbl",
  data() {
  	return{
		category: "hot",
		all_game_list: [],
	}
  },
  watch:{
	  category:function (newn, old) {
		  console.log("category:"+old+"变成了"+newn);
	      this.max_show = 6;
	      this.gameList = [];
	      this.getGameList();
	      
	  },
  },
  mounted(){
	  this.getGameList();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
	getGameList() {
	    Fetch("/Game/getGameList", {
	        type: this.category,
	    }).then((res) => {
			console.log(this.all_game_list);
	        this.all_game_list = res.data;
	    });
	},
  }
}
</script>
