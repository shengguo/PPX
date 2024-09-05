<template>
  <n-card title="执行Lua脚本" size="small">
    <div style="display: flex; justify-content: flex-start" class="mb-10">
      <n-button round type="primary" @click="handleRun"> 执行 </n-button>
    </div>
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="200"
      require-mark-placement="right-hanging"
      :size="size"
      :style="{
        maxWidth: '640px'
      }"
    >
      <n-form-item label="Lua脚本名" path="luaName">
        <n-input class="w-100" v-model:value="model.luaName" placeholder=""></n-input>
      </n-form-item>
    </n-form>
  </n-card>
</template>
<script setup>
const size = ref('small')
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const handleRun = async (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      let script = `
import Robot
robot = Robot.RPC("192.168.58.2")
ret = robot.Mode(0)   #机器人切入自动运行模式
time.sleep(1)
ret = robot.ProgramLoad('/fruser/${model.value.luaName}.lua')   #加载脚本
ret = robot.ProgramRun()
      `
      const res = await proxy.$common.run_code(script)
    }
  })
}
const rules = {
  luaName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入脚本名'
  }
}

const formRef = ref(null)
const model = ref({
  luaName: ''
})
</script>
