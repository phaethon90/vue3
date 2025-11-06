<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
}
const icon = computed(() => {
  return store.getters.siderType ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px; //右边距
  box-sizing: border-box;
  cursor: pointer; //指到图标时鼠标指针变为小手图案
}
</style>
