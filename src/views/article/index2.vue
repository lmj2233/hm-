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
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 结果容器 -->
        <el-card  class="body-card">
            <div slot="header" class="clearfix" >
                根据筛选条件共查询到
                <b>0</b> 条结果：
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
                <el-table-column  label="发布时间"></el-table-column>
                <el-table-column  label="操作" ></el-table-column>
            </el-table>
            <!-- 分页 -->
            <div>
                <el-pagination class="cardpage" background layout="prev, pager, next" :total="1000"></el-pagination>
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
        beginDate: null,
        endDate: null,
        Authorization: null
        // total: ''
      },
      //   默认频道栏目数据
      //   channelOptions: [],
      //   日期选择器默认选中的数据
      dateValues: [],
      // 文章管理列表内容
      articles: []
    }
  },
  //   组件创建好的时候
  created () {
    // this.getChannels()
    this.getArticles()
  },
  methods: {
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
