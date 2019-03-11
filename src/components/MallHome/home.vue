<template>
    <div id="home">
        <el-container>
            
            <el-aside>aside</el-aside>
            <el-main>
                <el-header>
                    <el-dropdown  menu-align='start'>
                        <img class="avator">
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="home">首页</el-dropdown-item>
                            <el-dropdown-item command="signout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
            </el-main>
            <el-footer>footer</el-footer>
        </el-container>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    name:"home",
    data(){
        return{

        }
    },
    computed:{
        ...mapState(["userName"])
    }
}
</script>
<style scoped>
    .header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
        width: 36px;
        height:36px;
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>

