<template>
  <div v-show="isShow" class="tooltip-container">
    <span>nihao</span>
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showToolTips() {
      this.isShow = true
    }
  }
}
</script>

<style scoped>
  .tooltip-container{
    height: 100px;
    width: 100px;
    background-color: red;
  }
</style>
