<template>
  <div class="imgae-container">
    <div class="img-btn" @click="openDialog()">
      <img :src="value || defaultImage" />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- tab切换 -->
      <el-tabs v-model="activeName" type="card">
        <!-- 素材库 -->
        <el-tab-pane label="素材库" name="image" v-loading="loading">
          <!-- 单选框 -->
          <div>
            <el-radio-group v-model="reqParams.collect" size="small" @change="check()">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
            class="image-item"
            :class="{selected:selectedImageURL===item.url}"
            v-for="item in images"
            :key="item.id"
            @click="selected(item.url)"
          >
            <img :src="item.url"  />
          </div>
          <!-- 分页列表 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="perpe"
          ></el-pagination>
        </el-tab-pane>

        <!-- 上传图片 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// webpack不能打包本地资源，所以默认图片不能被打包到webpack中,要导入才能使用
import defaultImage from '../assets/images/default.png'
export default {
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      // 默认图片
      // value: defaultImage,
      defaultImage,
      // 对话框默认关闭
      dialogVisible: false,
      // tab标签默认选中素材库
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      //   上传图片预览路径
      imageUrl: null,
      // 图片列表
      images: [],
      total: 0,
      // 选中图片的地址
      selectedImageURL: null,
      // 请求头
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm73-tt')).token
      },
      // 加载中...
      loading: false
    }
  },
  methods: {
    // 确认上传
    confirmImage () {
      if (this.activeName === 'image') {
        // 选中素材图片
        // 如果没有选中，进行提示
        if (!this.selectedImageURL) return this.$message.info('请选择要上传的素材图片')
        // this.value = this.selectedImageURL

        // 子组件向父组件传递数据,通过父组件改变数据
        this.$emit('input', this.selectedImageURL)
      } else {
        // 选中上传图片
        if (!this.imageUrl) return this.$message.info('请选择要上传的图片')
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      // 关闭对话框
      this.dialogVisible = false
    },
    // 上传图片
    handleAvatarSuccess (res) {
      // 显示图片预览
      this.imageUrl = res.data.url
      console.log(1)
    },
    // 选中图片后，样式发生改变
    selected (url) {
      // 遍历列表，如果url一样就加类名，如果url不一致就不加
      // :class={selected:判断条件} url是不是一样，再添加类名
      this.selectedImageURL = url
    },
    // 素材分页功能
    perpe (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换全部和收藏
    check () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      // 把上一次的数据清空
      this.selectedImageURL = null
      this.imageUrl = null
      this.getImages()
    },
    // 获取素材列表
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.imgae-container{
  display: inline-block;
  margin-right: 20px;
}
// 图片列表样式
.image-item {
  width: 150px;
  height: 120px;
  // 转为行内块，在一行显示
  display: inline-block;
  border: 1px dashed #ddd;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  &.selected {
    &::before {
      // 给img盒子添加一个一样大小的背景颜色和覆盖一张图片
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 60px 60px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  img {
    width: 100%;
    height: 100%;
    // 图片等比例缩放
    object-fit: contain;
  }
}
.img-btn {
  img {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
  }
}
</style>
