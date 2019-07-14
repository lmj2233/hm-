<template>
    <el-container class="home-container">
    <el-aside class="my-aside" :width="isCollapse?'65px':'200px'">
        <div class="logo" :class="{close:isCollapse}"></div>
        <!-- 导航菜单 -->
         <el-menu
            :default-active="$route.path"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="border-right:none"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            >
        <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/picture">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/commit">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
        </el-menu-item>
        </el-menu>
    </el-aside>
     <el-container>
        <el-header class="home-header">
            <span class="el-icon-s-fold" @click="toggleMenu()"></span>
            <span class="text">江苏传智播客教育科技有限公司</span>
            <!-- 下拉菜单 -->
            <el-dropdown style="float:right">
                <span class="el-dropdown-link">
                    <img :src="avatar" alt="" width="30px">
                    <b>{{name}}</b>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <!-- <el-main> -->
            <!-- 二级路由渲染的内容区域 -->
            <router-view></router-view>
        <!-- </el-main> -->
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      // false ：展开 true：收起
      isCollapse: false,
      //   记录用户的name和img
      name: '',
      avatar: ''
    }
  },
  // 当组件创建好的时候，获取用户信息
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hm73-tt'))
    // console.log(user)
    this.name = user.name
    this.avatar = user.photo
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    // 跳转到个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      // 清空sessionStorage
      window.sessionStorage.removeItem('hm73-tt')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
    // 全屏容器
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    .my-aside{
        background: #002033;
    }
    .logo{
        // 设置背景图片要设置宽高
        width:100%;
        height: 60px;
        background: #002840 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
    }
    .close{
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size:30px auto;
    }

    .home-header{
        height:60px;
        line-height: 60px;
        border-bottom:2px solid #ddd;
    }
    .el-icon-s-fold{
        font-size:26px;
        vertical-align: middle;
        margin-right: 5px;
    }
    .text{
        vertical-align: middle;
    }
    img{
        vertical-align: middle;
        margin-right: 5px;
    }
}
</style>
