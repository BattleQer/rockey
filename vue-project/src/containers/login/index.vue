<template>
    <el-form ref="AccountFrom" :model="formData" :rules="rules" label-position="left" label-width="0px" class="login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
            <el-input v-model="formData.username" type="text" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input v-model="formData.pwd" type="password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checked">
            <el-checkbox v-model="formData.checked" checked class="remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleLogin('AccountFrom')">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                formData: {
                    username: 'admin',
                    pwd: '123456',
                    checked: true
                },
                logining: false,

                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur', validator: validatePass},
                        //{ validator: validaePass }
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur', validator: validatePass2 },
                        //{ validator: validaePass2 }
                    ]
                }
            };
        },
        computed: {
            count: ()=> {
                debugger;
                this.$store.state
            }
        },
        mounted() {
            console.log(Config.host);
            console.log(axios);
            this.$store.dispatch('test','123');
        },
        methods: {
            handleLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.$router.push('home');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import "~styles-var";
    .login-container
        margin-lr-auto()
        default-border()
        default-border-radius()
        margin-top 150px;
        padding 25px;
        width 500px;
        .title
            margin 0px auto 40px auto;
            text-align center;
            color #505458;

        .remember
            margin-bottom 35px;
</style>