<template>
  <n-card title="手动设置" size="small">
    <div style="display: flex; justify-content: flex-start" class="mb-10">
      <n-button round type="primary" @click="handleSave"> 保存 </n-button>
      <n-button class="ml-10" round type="primary" @click="handleReturn"> 退回 </n-button>
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
      <n-form-item label="速度" path="speed">
        <n-input v-model:value="model.speed" placeholder="">
          <template #suffix> % </template>
        </n-input>
      </n-form-item>
      <n-form-item label="加速度" path="acceleration">
        <n-input v-model:value="model.acceleration" placeholder="">
          <template #suffix> °/s^2 </template>
        </n-input>
      </n-form-item>

      <n-form-item label="J1" path="J1">
        <n-button circle @click="model.J1--">
          <template #icon>
            <TheIcon icon="material-symbols:check-indeterminate-small" :size="15" />
          </template>
        </n-button>
        <n-slider class="ml-10" v-model:value="model.J1" :step="1" />
        <n-button class="ml-10" circle @click="model.J1++">
          <template #icon>
            <TheIcon icon="material-symbols:add" :size="15" />
          </template>
        </n-button>
        <n-input class="ml-10" v-model:value="model.J1" placeholder="" />
      </n-form-item>
      <n-form-item label="J2" path="J2">
        <n-button circle @click="model.J2--">
          <template #icon>
            <TheIcon icon="material-symbols:check-indeterminate-small" :size="15" />
          </template>
        </n-button>
        <n-slider class="ml-10" v-model:value="model.J2" :step="1" />
        <n-button class="ml-10" circle @click="model.J2++">
          <template #icon> <TheIcon icon="material-symbols:add" :size="15" /> </template>
        </n-button>
        <n-input class="ml-10" v-model:value="model.J2" placeholder="" />
      </n-form-item>
      <n-form-item label="J3" path="J3">
        <n-button circle @click="model.J3--">
          <template #icon>
            <TheIcon icon="material-symbols:check-indeterminate-small" :size="15" />
          </template>
        </n-button>
        <n-slider class="ml-10" v-model:value="model.J3" :step="1" />
        <n-button class="ml-10" circle @click="model.J3++">
          <template #icon> <TheIcon icon="material-symbols:add" :size="15" /> </template>
        </n-button>
        <n-input class="ml-10" v-model:value="model.J3" placeholder="" />
      </n-form-item>
      <n-form-item label="J4" path="J4">
        <n-button circle @click="model.J4--">
          <template #icon>
            <TheIcon icon="material-symbols:check-indeterminate-small" :size="15" />
          </template>
        </n-button>
        <n-slider class="ml-10" v-model:value="model.J4" :step="1" />
        <n-button class="ml-10" circle @click="model.J4++">
          <template #icon> <TheIcon icon="material-symbols:add" :size="15" /> </template>
        </n-button>
        <n-input class="ml-10" v-model:value="model.J4" placeholder="" />
      </n-form-item>
      <n-form-item label="J5" path="J5">
        <n-button circle @click="model.J5--">
          <template #icon>
            <TheIcon icon="material-symbols:check-indeterminate-small" :size="15" />
          </template>
        </n-button>
        <n-slider class="ml-10" v-model:value="model.J5" :step="1" />
        <n-button class="ml-10" circle @click="model.J5++">
          <template #icon> <TheIcon icon="material-symbols:add" :size="15" /> </template>
        </n-button>
        <n-input class="ml-10" v-model:value="model.J5" placeholder="" />
      </n-form-item>
      <n-form-item label="J6" path="J6">
        <n-button circle @click="model.J6--">
          <template #icon>
            <TheIcon icon="material-symbols:check-indeterminate-small" :size="15" />
          </template>
        </n-button>
        <n-slider class="ml-10" v-model:value="model.J6" :step="1" />
        <n-button class="ml-10" circle @click="model.J6++">
          <template #icon> <TheIcon icon="material-symbols:add" :size="15" /> </template>
        </n-button>
        <n-input class="ml-10" v-model:value="model.J6" placeholder="" />
      </n-form-item>
    </n-form>
  </n-card>
  <runLua></runLua>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import runLua from './run-lua.vue'
const size = ref('small')
const { proxy } = getCurrentInstance()
const model = ref({})

const handleReturn = async (e) => {
  e.preventDefault()
}
onMounted(async () => {
  const res = await proxy.$common.get_robot_info()
  console.log(JSON.stringify(res))
  model.value.J1 = res.data.J1
  model.value.J2 = res.data.J2
  model.value.J3 = res.data.J3
  model.value.J4 = res.data.J4
  model.value.J5 = res.data.J5
  model.value.J6 = res.data.J6
})
const handleSave = async (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    console.log(errors)
    if (!errors) {
      let script = `
import Robot
import time
robot = Robot.RPC("192.168.58.2")
ret = robot.Mode(0)   #机器人切入自动运行模式
time.sleep(1)
tool = 1 #工具坐标系编号
user = 0 # 
desc_pos1 = [${model.value.J1}, ${model.value.J2}, ${model.value.J3}, ${model.value.J4}, ${model.value.J5}, ${model.value.J6}]
ret = robot.MoveJ(desc_pos1, tool, user, vel=30)
      `
      const res = await proxy.$common.run_code(script)
    }
  })
}

const rules = {
  // speed: {
  //   required: true,
  //   trigger: ['blur', 'input'],
  //   message: '请输入速度',
  // },
}
const formRef = ref(null)
</script>
