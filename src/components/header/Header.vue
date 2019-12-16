<template>
  <div class="header">
    <div class="title">Bgain风控管理系统</div>
    <div class="user-info">
<!--      <div>侧边栏折叠</div>-->
<!--      <div>用户信息</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
.header{
  height: 64px;
  display: flex;
  /*background: rgba(0, 21, 41, 1);*/
  .title{
    width: 210PX;
    background: rgba(0, 40, 77, 1);
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    line-height: 64px;
  }
  .user-info{
    flex-grow: 1;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    text-align: center;
    line-height: 64px;
    /*border-bottom: 1px solid grey;*/
  }
}
</style>
