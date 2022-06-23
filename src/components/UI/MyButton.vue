<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  border-radius: 5px;
  font-size: 14px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.btn:hover {
  background-color: seagreen;
  color: white;
  border: 1px solid seagreen;

  cursor: pointer;
}
</style>
