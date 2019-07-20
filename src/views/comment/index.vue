<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                {{scope.row.comment_status?'正常':'关闭'}}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="success" @click="changeStatus(scope.row)" size="mini" v-if="!scope.row.comment_status">打开评论</el-button>
                <el-button type="danger" @click="changeStatus(scope.row)" size="mini" v-else>关闭评论</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="perpe"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论列表
      comments: [],
      // 评论列表参数
      reqParams: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      // 评论总数
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    //   改变评论的状态
    changeStatus (row) {
      console.log(row)
      const text1 = '确认要打开评论吗？'
      const text2 = '关闭评论后该用户将无法继续评论，确定还要关闭评论吗？'
      this.$confirm(row.comment_status ? text2 : text1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, {
          allow_comment: !row.comment_status
        })
        this.$message.success('操作成功')
        // 更新视图
        row.comment_status = data.allow_comment
      }).catch(() => {})
    },
    //   分页切换
    perpe (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    //   评论列表
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    //   console.log(this.comments)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
