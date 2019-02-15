## 项目目标：

实现一个登陆功能

##前端

[√] 基础的页面样式
[√] 账号名输入框：正常 | 错误
[√] 密码输入框：正常 | 错误
* 登陆按钮：默认 | 登录中
* 登陆成功后，正常页面


## 后台功能（）

* cookie，用于识别当前是否已登陆；
* 退出登陆功能；
* 路由跳转（已登陆时，自动跳转到登陆后页面）；
* 登陆超时（已登陆，但超时，自动变为未登陆）；
* 登陆时的各种提示信息；
* 后端服务；
	* 验证账号密码是否匹配；
	* 验证码功能；
	* 防止注入；
	* 正确/错误时的提示； 
* 登陆用数据库；
	* 用户id； 
	* 账号；
	* 密码（不能存明文）；
	* 上一次登陆时间；
	* 上一次登陆ip；
	* 曾经的密码；
	* 密保问题；
* 登陆正确的提示信息（成功后提示成功，等待1s后跳转）；
* 登陆错误的提示信息；
* 验证码；
* 注册功能：
	* 账号；
	* 密码；
	* 重复密码；
	* 防机器注册功能；
	* 防账号 | 密码重复；
	* 密保问题；
* 登陆失败后自动发送提示邮件；
* 防多点登陆；