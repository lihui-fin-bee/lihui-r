import Vue from 'vue'
import AFTableColumn from 'af-table-column'
import { TableColumn, Loading } from 'element-ui'

Vue.use(TableColumn)
Vue.use(Loading)
Vue.use(AFTableColumn)

export default {
  data() {
    return {
      pageLoading: null
    }
  },
  methods: {
    openLoading() {
      this.pageLoading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  }
}
