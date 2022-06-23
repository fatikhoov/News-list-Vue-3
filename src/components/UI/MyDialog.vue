<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin'
export default {
  name: 'my-dialog',
  mixins: [toggleMixin],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    },
  },
}
</script>

<style scoped>
.dialog {
  left: 0;
  right: 0;
  bottom: 0;
  top: 0px;
  position: fixed;
  overflow-y: scroll;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5000;
}
.dialog__content {
  width: 375px;
  margin: auto;
  background: whitesmoke;
  border-radius: 5px;
  min-width: 100px;
  min-height: fit-content;
  display: flex;
  align-items: center;
  padding: 20px;
  z-index: 1000;
  flex-direction: column;
}
@media (max-width: 640px) {
  .dialog__content {
    width: 80vw;
    margin: auto;
    background: whitesmoke;
    border-radius: 5px;
    min-width: 100px;
    min-height: 200px;
    display: flex;
    align-items: center;
    padding: 20px;
    z-index: 1000;
    flex-direction: column;
  }
}
</style>
