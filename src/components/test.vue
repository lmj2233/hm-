<template>
    <div>
        <p>头部</p>
        <p class="content">
            <!-- 默认插槽 <slot></slot> -->
            <!-- 有后备内容的插槽 <slot>内容1</slot> -->
            <!-- 有名字的插槽 -->
            <slot name="con" :test="testNmae"></slot>
        </p>
        <p>底部
            <slot name="fot" :test2="test2"></slot>
        </p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      testNmae: '测试代码，好饿好饿我真的好饿',
      test2: 'eeee'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
