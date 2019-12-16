<template>
  <div class="card">
    <p class="title">{{ title }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  border-bottom: 1px solid darkgray;
  background: #ffffff;
  padding-bottom: 30px;
  .title{
    margin: 0;
    height: 50px;
    line-height: 50px;
    color: #000000;
    font-size: 18px;
    font-weight: bolder;
    padding-left: 15px;
  }
  .content-container{
    /*padding: 20px 15px;*/
  }

}
</style>
