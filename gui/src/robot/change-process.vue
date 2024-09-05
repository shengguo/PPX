<template>
  <div class="w-120 flex">
    <n-select v-model:value="appStore.cur_process_key" :options="options" @update:value="handleUpdateValue" />
    <n-popover trigger="click" ref="popover">
      <template #trigger>
        <n-button circled> + </n-button>
      </template>
      <template #header>
        <n-text strong depth="1"> 请输入工艺包名称 </n-text>
      </template>
      <div class="flex">
        <n-input v-model:value="proceeName" autofocus placeholder="" :maxlength="20" />
        <n-button circle type="primary" @click="handleNew($event)"> 好 </n-button>
      </div>
    </n-popover>
  </div>

  <!-- <div class="w-120 flex border-red border-solid p-5 rounded-5">
    
  </div> -->
</template>
<script setup>
const cur_process_item = computed({
  get: () => {
    let item = appStore.process_items.find((item) => item.name === appStore.cur_process_key)
    return item || appStore.process_items[0]
  },
  set: (value) => {
    const index = appStore.process_items.findIndex((item) => item.name === appStore.cur_process_key)
    if (index !== -1) {
      appStore.process_items[index] = value
    }
  }
})
const proceeName = ref('')
const popover = ref(null)
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { useAppStore } from '@/store'
import { computed } from 'vue'
const appStore = useAppStore()
const options = computed(() => {
  let options = appStore.process_items.map((item) => ({ label: item.name, value: item.name }))
  return options
})
const handleUpdateValue = (value, option) => {
  console.log(value)
  // appStore.cur_process_key = value
}
const handleNew = () => {
  if (proceeName.value === '') {
    $message.warning('请输入正确的工艺包名')
    return
  }
  let pinaItem = appStore.process_items.find((item) => item.name === proceeName.value)
  if (pinaItem) {
    $message.warning('请输入正确的工艺包名')
    return
  }
  popover.value.setShow(false) //关闭弹窗
  let item = { name: proceeName.value, points: [] }
  appStore.cur_process_key = proceeName.value
  appStore.process_items.push(item)
  proceeName.value = ''
}
</script>
