<template>
  <div class="checkbox-wrap">
    <input type="checkbox" checked disabled>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    label: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  input{
    margin-top: 2px;
  }

  .label {
    width: 70px;
    margin-left: 10px;
  }
}
</style>
