<template>
  <div class="login-container">
    <el-card class="login-box">
        <!--  图片logo -->
      <img src="../../assets/images/logo_index.png" alt="">
      <!-- from表单 -->
      <el-form :rules="loginRules" status-icon :model="loginForm"  ref="loginForm">
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
            <el-button type="primary" @click="login" style="width:100%">登 录</el-button>
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
        mobile: '18438626320',
        code: '246810'
      },
      // 单个表单元素校验规则
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' } // change内容改变的时候
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
    login () {
      // 整体表单验证 $refs validate
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
      //       .then((res) => {
      //         // console.log(res.data)
      //         // 存储sessionStorage
      //         window.sessionStorage.setItem('hm73-tt', JSON.stringify(res.data.data))
      //         // 登录成功，跳转到首页
      //         this.$router.push('/')
      //       })
      //       .catch(() => {
      //         // 弹出提示 $message
      //         this.$message.error('用户名或验证码错误')
      //       })
      //   }
      // })

      // await 与 async结合使用
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // try{ 业务逻辑，要处理的内容 }  catch{ 业务逻辑错误的时候调用catch，进行错误处理 }
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('hm73-tt', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('用户名或密码错误')
          }
        }
      })
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
