<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>
<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style scoped>
.input {
  margin: 10px 0;
  height: 30px;
  border: 0px;
  background: transparent;
  border-bottom: 2px solid darkorchid;
}
.input:active,
.input:hover,
.input:focus {
  outline: 0;
  outline-offset: 0;
  border-bottom: 2px solid seagreen;
}
</style>
