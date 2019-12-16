<template>
  <el-input id="emojiInput" ref="myInput" v-model="currentValue" :name="computedValue" :placeholder="placeholder" @focus="selectEmoji" />
</template>

<script>
import { Input } from 'element-ui'

export default {
  name: 'MyInput',
  components: {
    'el-input': Input
  },
  props: {
    placeholder: {
      type: String
    },
    inputValue: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentValue: ''
    }
  },
  computed: {
    computedValue() {
      this.currentValue = this.inputValue
      return this.inputValue
    }
  },
  watch: {
    // inputValue() {
    //   this.currentValue = this.inputValue;
    // },
    currentValue(val) {
      const lastIndex = val.length - 1
      this.selectEmoji(lastIndex)
      if (val === '') {
        this.currentValue = val
      }
      if (val !== '') {
        if (val.indexOf('%') < 0) {
          this.currentValue = `${val}%`
        } else if (val.indexOf('%') !== lastIndex) {
          this.currentValue = val.replace('%', '')
        } else if (val.indexOf('%') === lastIndex) {
          if (val.length - 1 < lastIndex) {
            this.currentValue = val.splice(0, lastIndex - 1)
          }
        }
      }
      setTimeout(this.$emit('newValue', {
        newValue: this.currentValue, name: this.name, type: this.type, index: this.index
      }), 10)
      // this.$emit('newValue', {
      //   newValue: this.currentValue, name: this.name, type: this.type, index: this.index,
      // });
    }
  },
  methods: {
    selectEmoji(index) {
      if (typeof index === 'number') {
        const elInput = this.$refs.myInput.$refs.input
        if (elInput.selectionEnd === index) {
          setTimeout(() => {
            elInput.setSelectionRange(index, index)
          }, 10)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-input{
    margin: 0;
  }
</style>
