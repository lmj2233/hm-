<template>
    <div   v-loading="loading">
        <el-card>
            <div slot="header">
                <my-bread>素材管理</my-bread>
            </div>
            <div class="img-btn">
                <el-radio-group v-model="reqParams.collect" size="small" @change="check()">
                    <el-radio-button label="false">全部</el-radio-button>
                    <el-radio-button label="true">收藏</el-radio-button>
                </el-radio-group>
                <el-button type="success" style="float:right" size="small" @click="dialogVisible = true">添加素材</el-button>
            </div>
            <ul class="img-list">
                <li v-for="item in images" :key="item.id">
                    <img :src="item.url" alt="">
                    <!-- v-if收藏时，没有收藏和删除的标准 -->
                    <div class="icon-btn" v-if="!reqParams.collect">
                        <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="collectImage(item)"></span>
                        <span class="el-icon-delete" @click="del(item.id)"></span>
                    </div>
                </li>
            </ul>
            <el-pagination
                v-if="total>reqParams.per_page"
                background
                layout="prev, pager, next"
                :page-size="reqParams.per_page"
                :current-page="reqParams.page"
                @current-change="changePage"
                :total="total"
                >
            </el-pagination>
            <!-- 添加素材对话框 -->
            <el-dialog
                title="添加素材"
                :visible.sync="dialogVisible"
                width="30%">
                <!-- name 上传的图片的名称(参数名)是image -->
                <el-upload
                    class="avatar-uploader"
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="handleAvatarSuccess"
                    name="image"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片素材列表
      images: [],
      total: 0,
      //   是否显示对话框
      dialogVisible: false,
      //   预览地址
      imageUrl: null,
      //   设置请求头，请求地址action要携带，组件提供的headers来设置
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm73-tt')).token
      },
      //   加载页面数据
      loading: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    //   删除功能
    del (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 删除
        await this.$http.delete('user/images/' + id)
        // 删除成功提示
        this.$message.success('删除成功')
        // 更新列表
        this.getImages()
      }).catch(() => {})
    },
    //   收藏功能
    async collectImage (item) {
      // 在请求加载之前开启加载效果
      this.laoding = true
      // 发送收藏请求
      const { data: { data } } = await this.$http.put('user/images/' + item.id, { collect: !item.is_collected })
      //   收藏成功提示
      this.$message.success('操作成功')
      //   修改样式 ,两种都可以
      //   item.is_collected = !item.is_collected
      item.is_collected = data.collect
      //   结束的时候关闭加载效果
      this.loading = false
    },
    //  上传成功时进行的操作，预览图片
    handleAvatarSuccess (res) {
      console.log(res)
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      //   1.5秒后自动关闭对话框
      window.setTimeout(() => {
        //   关闭对话框
        this.dialogVisible = false
        // 更新列表
        this.getImages()
        // 清空已经上传的素材
        this.imageUrl = null
      }, 1500)
    },
    //   分页功能
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    //   切换全部和收藏
    check () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取图片素材
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      console.log(data)
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.img-btn{
    overflow: hidden;
    margin-bottom:20px;
}
.img-list{
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    margin-bottom: 20px;
    li{
    width:150px;
    height:150px;
    position: relative;
    float: left;
    margin-right: 50px;
    margin-bottom: 20px;
    img{
        width:100%;
        height:100%;
        display: block;
        border:1px dashed #ddd
    }
    .icon-btn{
        width:100%;
        height:30px;
        line-height: 30px;
        position: absolute;
        left:0;
        bottom:0;
        background: rgba(0,0,0,.5);
        text-align: center;
        color: #ddd;
        span{
            margin:0 20px;
            &.red{
                color:red;
            }
        }
    }
}
}

</style>
