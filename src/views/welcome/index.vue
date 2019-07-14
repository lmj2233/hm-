<template>
<!-- 外面要套div块元素 -->
    <div class="pic">
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  // 进行测试 请求拦截器和响应拦截器
  // created () {
  //   this.$http.get('articles').then(res => console.log(res.data))
  // }
}
</script>

<style lang="less" scoped>
.pic{
    text-align: center;
}
// img{
//     // display: inline-block;
//     text-align: center;
//     // margin:0 auto;
//     // 图片居中显示
//     // position:absolute;
//     // left:50%;
//     // top:50%;
//     // transform: translate(-50%,-50%)
// }
</style>
