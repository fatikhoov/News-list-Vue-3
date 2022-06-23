<template>
  <textarea
    :value="modelValue"
    @input="updateInput"
    class="myTextarea"
  ></textarea>
</template>

<script>
export default {
  name: 'my-textarea',
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

<style>
.myTextarea {
  margin: 10px 0;
  border: 0px;
  background: transparent;
  border-bottom: 2px solid darkorchid;
}

.myTextarea:active,
.myTextarea:hover,
.myTextarea:focus {
  outline: 0;
  outline-offset: 0;
  border-bottom: 2px solid seagreen;
}
</style>
