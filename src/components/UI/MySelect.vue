<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="" class="select_filter">Сортировать новости</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style scoped>
.select_filter {
  color: #626161;
  word-wrap: break-word;
  font-size: 14px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.arrow {
  cursor: pointer;
  width: 40px;
  height: 40px;
}
select {
  width: 100%;
  padding: 0px;
  height: 40px;
  border: 0px;
  border-bottom: 2px solid darkorchid;
  appearance: none;
  background: inherit;
  color: #626161;
}
select:active,
select:hover,
select:focus {
  outline: 0;
  outline-offset: 0;
  border: 0px;
  border-bottom: 2px solid seagreen;
}
</style>
