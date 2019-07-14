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
                    <el-select v-model="reqParams.channel_id" placeholder="请选择">
                        <el-option
                        v-for="item in channelOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
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
            <!-- <my-test>
                <template slot="con" slot-scope="scope"> 1{{scope.test }}</template>
                <template  v-slot:fot="scope">2{{ scope.test2}}</template>
            </my-test> -->
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
        //   status是状态值 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
        status: null,
        channel_id: null,
        // 记录开始和结束时间
        beginDate: null,
        endDate: null
      },
      //   默认频道栏目数据
      channelOptions: [{ name: 'JAVA', id: 1 }],
      //   日期选择器默认选中的数据
      dateValues: []
    }
  }
}
</script>

<style lang="less" scoped>
.article-container{
    .header-card{
        margin-bottom: 20px;
    }
}
</style>
