<template>
    <div id="registerFrom">
        <div class="register_form">
            <el-form ref="userInfo" :model="userInfo" label-width="70px" :rules="rules">
                <el-form-item label="账号" prop="name">
                    <el-input size="small"  v-model="userInfo.name" placeholder="输入您想要注册的账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input size="small" minlength="6" type="password" v-model="userInfo.password" placeholder="输入密码(不得低于六位)"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="comfirmpassword">
                    <el-input size="small" minlength="6" type="password" v-model="userInfo.comfirmpassword" placeholder="输入确认密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="register_btn">
                <el-button type="primary" round @click.native="register">注册</el-button>
                <el-button type="success" round @click.native="cancenRegister">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"registerForm",
    data(){
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
            }else if(value.length<6){
                return cb(new Error("密码错误"))
            }else{
                cb()
            }
			
        };
        let comfirmpassword = (rule,value,cb)=>{
            if(!value){
                return cb(new Error('两次验证码不一致'))
            }else if(value !== this.userInfo.password){
                return cb(new Error('两次验证码不一致'))
            }else{
                cb()
            }
        };
        return{
           userInfo:{
				name:'',
                password:'',
                comfirmpassword:""
            },
            rules:{
				name:[{validator:checkUserName,trigger: 'blur'}],
                password:[{validator:checkPassWord,trigger: 'blur'}],
                comfirmpassword:[{validator:comfirmpassword,trigger: 'blur'}]
			}
        }
    },
    methods:{
        register(){

        },
        //取消注册像父组件传递
        cancenRegister(){
            this.$emit('sendCancelRegister','cancel')
        }
    }
}
</script>
<style scoped>
.register_form{
	width: 300px;
	margin: 50px auto 0px;
}
.register_btn{
	margin-top: 60px;
}
</style>
