<template>
  <n-button type="info" round @click="handleChange">切换状态</n-button>
  <!-- <n-switch
    v-model="mode"
    checked-value="0"
    unchecked-value="1"
    :unchecked-value="1"
    @update:value="handleChange"
  >
    <template #checked> 自动 </template>
    <template #unchecked> 手动 </template>
  </n-switch> -->
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const mode = ref(0)
const handleChange = async () => {
  mode.value = mode.value === 0 ? 1 : 0
  let script = `
import Robot
import time
robot = Robot.RPC("192.168.58.2")
ret = robot.Mode(${mode.value}) 
time.sleep(1)
  `
  const res = await proxy.$common.run_code(script)
}
</script>
