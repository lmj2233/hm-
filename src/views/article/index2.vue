<template>
    <div class="article-container">
        <!-- 筛选容器 -->
        <el-card class="header-card">
            <div slot="header" class="clearfix" >
                <!-- 面包屑导航 -->
                <my-bread>内容管理</my-bread>
            </div>
            <!-- 筛选容器内容 -->
            <el-form  :model="reqParams" size="small" label-width="80px">
                <el-form-item label="状态：">
                    <el-radio-group v-model="reqParams.status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道：">
                    <my-channel v-model="reqParams.channel_id"></my-channel>
                </el-form-item>
                <el-form-item label="时间：">
                    <div class="block">
                        <el-date-picker
                        v-model="dateValues"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        @change="changeDate"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="check()">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 结果容器 -->
        <el-card  class="body-card">
            <div slot="header" class="clearfix" >
                根据筛选条件共查询到
                <b>{{total}}</b> 条结果：
            </div>
            <!-- 表格 -->
             <el-table :data="articles" style="width: 100%">
                <el-table-column  label="封面" >
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.cover.images[0]" >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column  label="标题" prop="title"></el-table-column>
                <el-table-column  label="状态" prop="status">
                    <template slot-scope="scope">
                        <el-tag  v-if="scope.row.status===0" type="info">草稿</el-tag>
                        <el-tag v-if="scope.row.status===1">待审核</el-tag>
                        <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
                        <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
                        <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  label="发布时间" prop="pubdate"></el-table-column>
                <el-table-column  label="操作" >
                    <template slot-scope="scope">
                    <el-button class="el-icon-edit" type="primary" circle plain @click="edit(scope.row.id)"></el-button>
                    <el-button class="el-icon-delete" type="danger" circle plain @click="del(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div>
                <el-pagination
                    class="cardpage"
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="reqParams.per_page"
                    :current-page="reqParams.page"
                    @current-change="changePage"
                    ></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
// 导入test.vue 插槽
// import MyTest from '@/components/test.vue'
// 导入面包屑插槽 my-bread
// import MyBread from '@/components/my-bread.vue'

export default {
//   components: {
//     // MyTest
//     MyBread
//   },
  data () {
    return {
      // 提交给后台的数据，null和''的区别，null是不会发送该字段的
      reqParams: {
        page: 1,
        per_page: 10,
        //   status是状态值 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
        status: null,
        channel_id: null,
        // 记录开始和结束时间
        begin_pubdate: null,
        end_pubdate: null,
        Authorization: null,
        valueDate: ''
      },
      //   默认频道栏目数据
      //   channelOptions: [],
      //   日期选择器默认选中的数据
      dateValues: [],
      // 文章管理列表内容
      articles: [],
      total: 0
    }
  },
  //   组件创建好的时候
  created () {
    // this.getChannels()
    this.getArticles()
  },
  methods: {
    //   分页管理
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    //   删除
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('articles/' + id)
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //   编辑
    edit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    //   更新时间选择器
    // 这里的参数必须和后端一样，因为要向后端发送数据，所以要获取到该事件必须参数一样
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    //   筛选
    check () {
      this.getArticles()
    },
    //   获取频道列表
    // async getChannels () {
    //   // 多个解构赋值 {data :{data :{channel:[id: ,name: ]}}}
    // //   解构三层
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    //   console.log(this.channelOptions)
    // },
    // 获取文章列表
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.article-container{
    .header-card{
        margin-bottom: 20px;
    }
    .cardpage{
        text-align: center;
    }
}
</style>
