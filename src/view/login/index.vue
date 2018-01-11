<template>
    <div class="login-container">
        <BGThree></BGThree>
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="rules" ref="loginForm"
                 label-position="left">
            <div class="title-container">
                <img class="titleImg" :src="logoImg">
                <h2 class="title" v-html="title"></h2>
            </div>
            <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                          placeholder="请输入账号"/>
            </el-form-item>

            <el-form-item prop="password">
                <el-input name="password" type="password" v-model="loginForm.password" autoComplete="on"
                          placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item prop="smscode">
                <el-input name="smscode" type="number" v-model="loginForm.smscode" autoComplete="on"
                          placeholder="请输入验证码"/>
                <el-button v-if="!smsData.show" type="primary" class="smsBtn">
                    <span>
                       (<span v-html="smsData.count"></span>
                        S)后重新发送
                    </span>
                </el-button>
                <el-button v-loading="smsData.loading" element-loading-spinner="el-icon-loading" v-if="smsData.show"
                           type="primary" class="smsBtn"
                           @click.native="getSMS">
                    <span>发送验证码</span>
                </el-button>
            </el-form-item>

            <el-button type="primary" v-loading="loginForm.loading" element-loading-spinner="el-icon-loading"
                       class="loginBtn" @click.native.prevent="login('loginForm')">登录
            </el-button>

        </el-form>
    </div>
</template>

<script>
    import BGThree from '@/components/Three/line'
    const TIME_COUNT = 60;
    export default {
        name : 'login', components : { BGThree }, data() {
            return {
                title : "junyiStyle-admin-master", logoImg : "/static/img/logo.png", nextPath : "/dashboard", smsData : {
                    show : true, count : '', timer : null, loading : false
                }, loginForm : {
                    username : '', password : '', smscode : '', loading : false
                }, rules : {
                    username : [{ required : true, message : '请输入登录账户', trigger : 'blur' },],
                    password : [{ required : true, message : '请输入登录密码', trigger : 'blur' },],
                    smscode : [{ required : true, message : '请输入短信验证码', trigger : 'blur' },]
                }
            }
        }, methods : {
            /**
             * 获取短信验证码
             */
            getSMS(){
                var _this = this;
                this.$refs['loginForm'].validateField( 'username', (valid) =>{
                    if( !valid ){
                        this.smsData.loading = true;
                        this.$store.dispatch( "GetMobileToGetSMSCode", _this.loginForm ).then( function(result){
                            _this.smsData.loading = false;
                            _this.countDown();
                        } ).catch( function(error){
                            _this.smsData.loading = false;
                        } );
                    }else{
                        return false;
                    }
                } );
            }, /**
             * 验证码倒计时
             */
            countDown(){
                if( !this.smsData.timer ){
                    this.smsData.count = TIME_COUNT;
                    this.smsData.show = false;
                    this.smsData.timer = setInterval( () =>{
                        if( this.smsData.count > 0 && this.smsData.count <= TIME_COUNT ){
                            this.smsData.count--;
                        }else{
                            this.smsData.show = true;
                            clearInterval( this.smsData.timer );
                            this.smsData.timer = null;
                        }
                    }, 1000 )
                }
            }, /**
             * 登录
             * @param formName
             */
            login(formName){
                var _this = this;
                _this.$refs[formName].validate( (valid) =>{
                    if( valid ){
                        _this.loginForm.loading = true;
                        this.$store.dispatch( "LoginSystemByUsername", _this.loginForm ).then( function(result){
                            _this.$router.push( { path : _this.nextPath } )
                        } ).catch( function(error){
                            _this.loginForm.loading = false;
                        } );
                    }else{
                        return false;
                    }
                } );
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .login-form {
        position: absolute;
        width: 25vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        .title-container {
            display: flex;
            flex-direction: column;
            .titleImg {
                height: 40px;
                margin: 0 auto;
            }
            .title {
                color: #35A03F;
                text-align: center;
            }
        }
        .el-form-item {
            display: flex;
            flex-direction: row;
            .el-form-item__content {
                display: flex;
                flex: 1;
            }
            .el-input {
                display: inline-block;
            }
            .smsBtn {
                margin-left: 20px;
            }
        }
        .loginBtn {
            width: 100%;
            margin-bottom: 30px;
        }
        .el-loading-spinner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            margin: 0;
        }
    }
</style>



