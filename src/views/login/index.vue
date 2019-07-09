<template>
  <div class="login-container">
    <el-card class="login-box">
        <!--  图片logo -->
      <img src="../../assets/images/logo_index.png" alt="">
      <!-- from表单 -->
      <el-form>
          <el-form-item>
              <el-input placeholder="请输入手机号"></el-input>
          </el-form-item>
        <el-form-item>
            <el-input placeholder="请输入验证码" style="width:65%"></el-input>
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
    return {
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
