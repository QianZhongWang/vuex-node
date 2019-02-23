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
					<el-form ref="userInfo" :model="userInfo" label-width="60px" :rules="rules">
						<el-form-item label="账号" prop="name">
							<el-input size="small"  v-model="userInfo.name" placeholder="输入您的账号"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input size="small"  type="password" v-model="userInfo.password" placeholder="输入您的密码"></el-input>
						</el-form-item>
					</el-form>
					<div class="captcha">
						<span class="captcha_title">验证码</span>
						<input type="text" class="captcha_input" v-model="captcha_pass" placeholder="请输入图形验证码">
						<div  @click="changeCaptcha"  class="captcha_img" v-html="captcha"></div>
					</div>
					<div class="tips">
						<i></i>
					</div>
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
import {mapActions,mapState, mapMutations} from "vuex"
import {reqCaptcha,reqLogin} from "../../api"
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
			captcha:"",
			captcha_pass:"",
			rules:{
				name:[{validator:checkUserName,trigger: 'blur'}],
				password:[{validator:checkPassWord,trigger: 'blur'}]
			}
		}
  	},
	components:{
		registerForm
	},
	mounted(){
		this.changeCaptcha()
		
	},
	computed:{
		// ...mapState(["token,userName"])
	},
	methods:{
		// ...mapActions(['Login']),
		...mapMutations(["recive_username","recive_token"]),
		//点击注册
		register(){
			setTimeout(()=>{
				this.title = "注册";
			},1000)
			this.isLogin = false
		},
		//点击取消
		cancelRegister(data){
			setTimeout(()=>{
				this.title = "登录";
			},1000)
			this.isLogin = true
		},
		//点击登录
		login(){
			if(this.userInfo.name&&this.userInfo.password&&this.captcha_pass){
				let parma = {
					userName:this.userInfo.name,
					passWord:this.userInfo.password,
					captcha:this.captcha_pass
				}
				reqLogin(parma).then(res=>{
					if(res.status == 0){
						console.log(res)
						this.recive_username(res.userName);
						this.recive_token(res.token)
						this.$router.push('/mallhome')
					}else{
						this.changeCaptcha()
						this.$message.error(res.msg)
					}
				}).catch(err=>{
					this.$message.error(err)
				})
			}else{
				this.$message.error('请填写完整的信息')
			}
		},
		//改变验证码
		changeCaptcha(){
			reqCaptcha().then(res=>{
				if(res.status == 0){
					this.captcha = res.msg;
				}else{
					this.$message.error('获取图形验证码失败')
				}
			}).catch(err=>{
				this.$message.error(err)
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warp{
	width: 100%;
	height: 100%;
	background: url("./images/bg.jpg") no-repeat;
	background-size: cover;
	position:absolute;;
}
.login_box{
	position: relative;
	top: 50%;
	margin: auto;
	z-index: 1000;
	width: 406px;
	height: 550px;
	margin-top: -300px;
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
.captcha{
	width: 100%;
	height: 40px;
}
.captcha_title{
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
}
.captcha_input{
	font-size: 14px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 150px;
}
.captcha_img{
	width: 80px;
	height: 38px;
	border:1px solid #dcdfe6;
	outline: 0;
	border-radius: 4px;
	float: right;
}
.login_btn{
	margin-top: 60px;
}
</style>
