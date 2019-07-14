<template>
    <div>
        <!-- 封装面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                <!-- 插槽 -->
                <slot></slot>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
  // 定义一个name，相当于插槽的标签名
  //   要将原来的局部插槽删除
  name: 'my-bread'
}
</script>

<style lang="less" scoped>
</style>
