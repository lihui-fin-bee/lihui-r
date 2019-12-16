import Tooltip from '../components/tooltips/ToolTip.vue'

const mixin = {
  data() {
    return {
      msg: 'hello mixin'
    }
  },
  components: {
    Tooltip
  },
  created() {
    console.log('混入的钩子函数')
  },
  methods: {
    show() {
      console.log(this.msg)
    }
  }
}
export default mixin
