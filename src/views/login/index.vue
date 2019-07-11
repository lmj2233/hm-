<template>
  <div class="login-container">
    <el-card class="login-box">
        <!--  图片logo -->
      <img src="../../assets/images/logo_index.png" alt="">
      <!-- from表单 -->
      <el-form :rules="loginRules" :model="loginForm">
          <el-form-item prop="mobile">
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
        <el-form-item prop="code">
            <el-input placeholder="请输入验证码"  v-model="loginForm.code" style="width:65%"></el-input>
            <el-button type="primary" plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="checked"></el-checkbox>
             我已阅读并同意
             <el-link type="primary" :underline="false">用户协议</el-link>
             和
             <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width:100%">登 录</el-button>
        </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义规则，校验手机号码格式是否正确
    // 先定义好函数，再在methods中或者 loginRules 中使用
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码为6位数字', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    onSubmit () {

    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  top: 0;
  left: 0;
  .login-box{
      width: 450px;
      height: 350px;
    //   居中
      position: absolute;
      left:50%;
      top: 50%;
      transform:translate(-50%,-50%);
        img{
            display:block;
            width: 200px;
            // position:absolute;
            // left: 50%;
            // transform:translate(-50%);
            margin:10px auto 30px;
        }
         .el-form{
            //  margin-top: 80px;
             .el-checkbox{
                 margin-right:5px;
             }

        }
  }
}
</style>
