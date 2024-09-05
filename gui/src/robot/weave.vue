<template>
  <div class="border rounded-lg" v-for="item in appStore.weaveSettings" :key="item.weaveNum">
    <!-- {{ item.weaveNum }} -->
    <weaveItem v-show="item.weaveNum === curId + ''" :model-value="item" />
  </div>
  <n-button class="btnStyle" round type="primary" @click="handlePre"> 上一页 </n-button>
  {{ curId }}
  <n-button class="btnStyle" round type="primary" @click="handleNext"> 下一页 </n-button>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import weaveItem from './weave-item.vue'
import { useAppStore } from '@/store'
const curId = ref(0)
const appStore = useAppStore()
const handlePre = () => {
  if (curId.value > 0) {
    curId.value -= 1
  }
}
const handleNext = () => {
  if (curId.value < appStore.weaveSettings.length - 1) {
    curId.value += 1
  }
}
</script>
