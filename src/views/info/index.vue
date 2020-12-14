<template>
  <NavBar
    :title="title"
    :pathName="pathName"
  ></NavBar>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      title: '个人资料',
      pathName: '/home/question' // 1.可以传路径，可以传name  //如果不传的话，就返回上一页

    }
  },
  created () {
    console.log('thcc')
    // console.log(this.$route)
    console.log(this.$router)
  },
  methods: {},
  beforeRouteEnter (to, from, next) {
    // console.log('to.....')
    // console.log(to)
    // console.log('from....')
    // console.log(from)
    next()
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  }

}
</script>

<style lang="less" scoped>

</style>
