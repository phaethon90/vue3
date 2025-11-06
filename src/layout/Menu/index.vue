<template>
  <el-menu
    active-text-color="#ffd04b"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      :index="item.id"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        :index="'/' + it.path"
        v-for="it in item.children"
        :key="it.id"
        @click="savePath(it.path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ it.authName }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
import variables from '@/styles/variables.module.scss'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart']) //一级图标
const icon = ref('menu') //二级图标
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const menusList = ref([])
const initMenusList = async () => {
  try {
    menusList.value = await menuList()
  } catch {
    console.log('token已失效')
  }
}
initMenusList()

const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
</script>

<style lang="scss" scoped></style>
