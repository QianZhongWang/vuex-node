<template>
  <div id="login">
      <div class="warp">
		  <div class="login_box shdow">
				<div class="logo_box">
					<img class="logo" src="./images/e9.png">
				</div>
				<div :class={login_title:isLogin,register_title:!isLogin}>
					<span :class={login_line:isLogin,register_line:!isLogin}></span>
						{{title}}
					<span :class={login_line:isLogin,register_line:!isLogin}></span>
				</div>
				<div class="login_form" v-show="isLogin">
					<el-form ref="userInfo" :model="userInfo" label-width="40px" :rules="rules">
						<el-form-item label="账号" prop="name">
							<el-input size="small"  v-model="userInfo.name" placeholder="输入您的账号"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input size="small"  type="password" v-model="userInfo.password" placeholder="输入您的密码"></el-input>
						</el-form-item>
					</el-form>
					<div class="login_btn">
						<el-button type="primary" round @click.native="register">注册</el-button>
						<el-button type="success" round @click.native="login">登录</el-button>
					</div>
				</div>
				<registerForm v-show="!isLogin" @sendCancelRegister="cancelRegister"></registerForm>
		  </div>
      </div>
  </div>
</template>

<script>
import registerForm from './registerForm.vue'
import { setTimeout } from 'timers';
export default {
	name: 'Login',
	data () {
		let checkUserName = (rule,value,cb)=>{
			if(!value){
				return cb(new Error('账号不能为空'))
			}else{
				cb()
			}
		};
		let checkPassWord = (rule,value,cb)=>{
			console.log(value)
			if(!value){
				return cb(new Error('密码不能为空'))
			}else{
				if(value.length<6){
					return cb(new Error("密码错误"))
				}else{
					cb()
				}
			}
		}
		return {
			title:"登录",
			isLogin:true,
			userInfo:{
				name:'',
				password:''
			},
			rules:{
				name:[{validator:checkUserName,trigger: 'blur'}],
				password:[{validator:checkPassWord,trigger: 'blur'}]
			}
		}
  	},
	components:{
		registerForm
	},
	methods:{
		register(){
			setTimeout(()=>{
				this.title = "注册";
			},1000)
			this.isLogin = false
		},
		cancelRegister(data){
			setTimeout(()=>{
				this.title = "登录";
			},1000)
			this.isLogin = true
		},
		login(){
			if(this.userInfo.name&&this.userInfo.password){
				let parma = {
					userName:this.userInfo.name,
					passWord:this.userInfo.password
				}
				this.$axios.post('/users/login',parma)
				.then((res)=>{
					if(res.data.status==0){
						this.$router.push('/mallhone')
					}else{
						this.$message.error(res.data.msg)
					}
				}).catch(function(err) {
					console.log(err)
				})
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warp{
	width: 1920px;
	height: 938px;
	background: url("./images/bg.jpg") no-repeat;
	background-size: 100%;
	position:absolute;;
}
.login_box{
	position: relative;
	top: 177px;
	left: 800px;
	z-index: 1000;
	width: 406px;
	height: 544px;
	text-align: center;
	background: #ffffff;
	border-radius: 5px;
	
}
.shdow{
	box-shadow: 0px 0px 20px rgb(22, 20, 20)
}
.logo_box{
	background: #bd8585;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}
.logo{
	position: relative;
	top: 20px;
	left: 10px;
}
.login_title{
	margin: 50px 0px 20px 0px;
	font-size: 20px;
	transition: all .5s ease-in-out;
}
.register_title{
	margin: 20px 0px 20px 0px;
	font-size: 20px;
	transition: all .5s ease-in-out;
}
.login_line{
	width: 150px;
    height: 1px;
	animation: loginLineWidth 1.5s;
    border-top: 1px solid #b68c8c;
    display: inline-block;
    margin: 0px 10px 5px 10px;
	transition: width .9s ease-in-out
}
.register_line{
	width: 150px;
    height: 1px;
	animation: registerLineWidth 2s;
    border-top: 1px solid #b68c8c;
    display: inline-block;
    margin: 0px 10px 5px 10px;
	transition: width .9s ease-in-out
}
@keyframes loginLineWidth {
	0% {width: 150px;}
	50%{width: 0px;}
	100% {width: 150px;}
}
@keyframes registerLineWidth {
	0% {width: 150px;}
	50%{width: 0px;}
	100% {width: 150px;}
}
.login_form{
	width: 300px;
	margin: 50px auto 0px;
}
.login_btn{
	margin-top: 60px;
}
</style>
