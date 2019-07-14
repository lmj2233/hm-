<template>
    <div>
        <p>头部</p>
        <p class="content">
            <!-- 默认插槽 <slot></slot> -->
            <!-- 有后备内容的插槽 <slot>内容1</slot> -->
            <!-- 有名字的插槽 -->
            <slot name="con"></slot>
        </p>
        <p>底部
            <slot name="fot"></slot>
        </p>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
</style>
