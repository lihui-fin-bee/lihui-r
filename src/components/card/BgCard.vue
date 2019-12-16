<template>
  <div class="BgCard">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BgCard'
}
</script>

<style lang="scss" scoped>
.BgCard {
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  background: #f0f2f5;
}
</style>
