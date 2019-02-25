<template>
  <div id="registerFrom">
    <div class="register_form">
      <el-form ref="userInfo" :model="userInfo" label-width="70px" :rules="rules">
        <el-form-item label="账号" prop="name">
          <input type="text" v-model="userInfo.name" placeholder="请输入您想要注册的用户名"  @input="isRightUserName(userInfo.name)" class="input_name" :class="{right:isRight,error:isErr}">
          <div class="el_from_item_error" v-show="isErr">{{errTips}}</div>
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
import {reqregister} from "../../api"
export default {
    name: "registerForm",
    data() {
        let checkPassWord = (rule, value, cb) => {
            if (!value) {
                return cb(new Error("密码不能为空"));
            } else if (value.length < 6) {
                return cb(new Error("密码长度不得低于六位"));
            } else {
                cb();
            }
        };
        let comfirmpassword = (rule, value, cb) => {
            if (!value) {
                return cb(new Error("两次密码码不一致"));
                this.isRightPwd = false
            } else if (value !== this.userInfo.password) {
                return cb(new Error("两次密码码不一致"));
                this.isRightPwd = false;
            } else {
                cb();
                this.isRightPwd = true;
            }
        };
        return {
            userInfo: {
                name:"",
                password: "",
                comfirmpassword: ""
            },
            timer:"",
            cancel:null,
            isRight:null,
            isErr:null,
            errTips:null,
            isRightPwd:false,
            rules: {
                password: [{ validator: checkPassWord, trigger: "blur" }],
                comfirmpassword: [{ validator: comfirmpassword, trigger: "blur" }]
            }
        };
    },

    methods: {
        //使用setTimeout减少请求
        isRightUserName(val){
            if(this.timer){
               clearTimeout(this.timer)
            }
            if(val){
                this.timer = setTimeout(() => {
                    this.remoteSearch(val)
                }, 300);
            }else{
                this.isRight = false;
                this.errTips = '账户名不能为空'
                this.isErr = true;

            }
        },
        //远程搜索方法
        remoteSearch(val){
            //当存在下一次请求则取消上一次请求
            if(this.cancel){
                this.cancel()
            }
            //定义一个cancelToken 它是axios的一个属性，且是一个构造函数
            let CancelToken = this.$axios.CancelToken;

            //使用axios的get方法获取请求结果，在请求是传入cancelToken参数
            this.$axios.get('/apis/users/isRightUserName',{params:{userName:val},CancelToken:new CancelToken((c)=>{
                this.cancel = c;
            })})
            .then((res)=>{
                if(res.data.status==0){
                    this.isErr = false;
                    this.isRight = true
                }else{
                    this.isRight = false;
                    this.errTips = "该账户已存在"
                    this.isErr=true
                }
            }).catch(err=>{
                console.log(err)
            })

        },
        //注册
        register() {
            if(this.isRight&&this.isRightPwd){
                let param = {
                    userName:this.userInfo.name,
                    passWord:this.userInfo.password
                }
                
                reqregister(param).then(res=>{
                    if(res.status == 0){
                        this.cancenRegister()
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$message.error('用户名或密码不合法')
            }
        },
        //取消注册像父组件传递
        cancenRegister() {
            this.$emit("sendCancelRegister", "cancel");
        }
    }
};
</script>

<style scoped>
.register_form {
  width: 300px;
  margin: 50px auto 0px;
}
.input_name{
    color: #ccc;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.right{
    border-color: #67c23a;
}
.error{
   border-color: #f56c6c;
}
.el_from_item_error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
.register_btn {
  margin-top: 60px;
}
</style>
