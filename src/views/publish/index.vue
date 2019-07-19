<template>
    <div>
        <el-card>
            <div slot="header">
                <my-bread>{{!articleID?'发布文章':'修改文章'}}</my-bread>
            </div>
            <el-form ref="form" :model="publishForm" label-width="100px">
                <el-form-item  label="标题：">
                    <el-input v-model="publishForm.title" style="width:400px" ></el-input>
                </el-form-item>
                <el-form-item  label="内容：">
                    <quill-editor v-model="publishForm.content" :options="editorOption"></quill-editor>
                </el-form-item>
                <el-form-item  label="封面：">
                    <el-radio-group v-model="publishForm.cover.type" @change="changed" >
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                    <!-- 封装组件插件 -->
                    <!-- 默认选中单图 -->
                    <div v-if="publishForm.cover.type===1">
                      <my-image v-model="publishForm.cover.images[0]"></my-image>
                    </div>
                    <div v-if="publishForm.cover.type===3">
                      <my-image v-model="publishForm.cover.images[0]"></my-image>
                      <my-image v-model="publishForm.cover.images[1]"></my-image>
                      <my-image v-model="publishForm.cover.images[2]"></my-image>
                    </div>
                </el-form-item>
                <el-form-item label="频道：">
                    <my-channel v-model="channel_id"></my-channel>
                </el-form-item>
                <!-- 发布 -->
                <el-form-item v-if="!articleID">
                    <el-button type="primary" @click="publish(false)">发表</el-button>
                    <el-button @click="publish(true)">存入草稿</el-button>
                </el-form-item>
                <!-- 修改 -->
                <el-form-item v-else>
                    <el-button type="success" @click="edit(false)">修改</el-button>
                    <el-button @click="edit(true)">修改存入草稿</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
// 导入 富文本编辑器的样式，并注册为局部组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  // 注册为组件
  components: {
    quillEditor
  },
  data () {
    return {
      // 富文本编辑器
      editorOption: {
        // 内容区域为空
        placeholder: '',
        modules: {
          toolbar: [['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      },
      publishForm: {
        title: '',
        // 富文本编辑器内容
        content: '',
        // 父组件给子组件传递数据，父组件接收道德数据
        cover: {
          images: [],
          // 默认单图
          type: 1
        }
      },
      channel_id: null,
      // 指定文章的id
      articleID: null
    }
  },
  created () {
    // 组件初始化的时候获取要修改文章的id，在地址栏中获取
    this.articleID = this.$route.query.id
    // 渲染页面
    this.articleID && this.getArticle(this.articleID)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route () {
      console.log(this.articleID)
      this.articleID = this.$route.query.id
      this.publishForm = {
        title: '',
        // 富文本编辑器内容
        content: '',
        // 父组件给子组件传递数据，父组件接收道德数据
        cover: {
          images: [],
          // 默认单图
          type: 1
        }
      }
    }
  },
  methods: {
    // 获取指定文章
    async getArticle (id) {
      const { data: { data } } = await this.$http.get('articles/' + id)
      this.publishForm = data
    },
    // 修改文章
    async edit (draft) {
      // articles/id ? draft=false/true
      await this.$http.put(`articles/${this.articleID}?draft=${draft}`, this.publishForm)
      console.log(1)
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    // 发布文章和存入草稿
    async publish (draft) {
      // ...省略校验
      // draft  发布 false  草稿 true
      // 将来数据要地址栏？后传参的方式
      // this.$http({data:请全体,params:query数据地址栏数据})
      await this.$http.post('articles?draft=' + draft, this.publishForm)
      console.log(1)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 重置封面图片，清空之前选中的封面图片
    changed () {
      // console.log(1)
      this.publishForm.cover.images = []
    }
  }
}
</script>

<style lang="less" scoped>

</style>
