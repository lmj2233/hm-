<template>
    <div>
        <el-card>
            <div slot="header">
                <my-bread>发布文章</my-bread>
            </div>
            <el-form ref="form" :model="publishForm" label-width="80px">
                <el-form-item  label="标题：">
                    <el-input v-model="publishForm.title" style="width:400px" ></el-input>
                </el-form-item>
                <el-form-item  label="内容：">
                    富文本编辑器
                </el-form-item>
                <el-form-item  label="封面：">
                    <el-radio-group v-model="radio">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <div class="img-btn">
                        <img src="../../assets/images/default.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="频道：">
                    <my-channel v-model="channel_id"></my-channel>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">发表</el-button>
                    <el-button>存入草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      publishForm: {
        title: ''
      },
      // 封面默认单图
      radio: 1,
      channel_id: null
    }
  }
}
</script>

<style lang="less" scoped>
.img-btn{
    img{
    width: 150px;
    height:150px;
    border:1px dashed #ddd
    }
}
</style>
