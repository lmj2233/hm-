<template>
    <div>
        <el-select :value="value" placeholder="请选择" @change="fn">
            <el-option   v-for="item in channelOptions"  :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getCannels()
  },
  methods: {
    fn (value) {
      this.$emit('input', value)
    },
    async getCannels () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
