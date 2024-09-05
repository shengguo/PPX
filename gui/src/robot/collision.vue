<script setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const size = ref('small')
const rules = {
  inputValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 inputValue'
  }
}
const formRef = ref(null)
let oldValue = ref(null)
const model = ref({
  collision: 'standard',
  J1: '10.0',
  J2: '10.0',
  J3: '10.0',
  J4: '10.0',
  J5: '10.0',
  J6: '10.0',
  P1: 50,
  P2: 50,
  P3: 50,
  P4: 50,
  P5: 50,
  P6: 50
})

const collisionOptions = ref([
  {
    label: '标准等级',
    value: 'standard'
  },
  {
    label: '自定义百分比',
    value: 'percent'
  }
])
const valueOptions = ref([
  {
    label: '1（25N）',
    value: '1.0'
  },
  {
    label: '2（33N）',
    value: '2.0'
  },
  {
    label: '3（41N）',
    value: '3.0'
  },
  {
    label: '4（50N）',
    value: '4.0'
  },
  {
    label: '5（58N）',
    value: '5.0'
  },
  {
    label: '6（66N）',
    value: '6.0'
  },
  {
    label: '7（75N）',
    value: '7.0'
  },
  {
    label: '8（83N）',
    value: '8.0'
  },
  {
    label: '9（91N）',
    value: '9.0'
  },
  {
    label: '10（100N）',
    value: '10.0'
  }
])
const handleSave = async (e) => {
  let script = ``
  oldValue.value = JSON.stringify(model.value)
  e.preventDefault()
  if (model.value.collision === 'standard') {
    script = `
import Robot
robot = Robot.RPC("192.168.58.2")
level = [${model.value.J1},${model.value.J2},${model.value.J3},${model.value.J4},${model.value.J5},${model.value.J6}]
ret = robot.SetAnticollision(0,level,1)
  `
  } else {
    script = `
import Robot
robot = Robot.RPC("192.168.58.2")
level = [${model.value.P1},${model.value.P2},${model.value.P3},${model.value.P4},${model.value.P5},${model.value.P6}]
ret = robot.SetAnticollision(1,level,1)
  `
  }

  const res = await proxy.$common.run_code(script)
  if (res === 0) {
    $message.success('设置成功')
  } else {
    $message.error('设置失败，请重新下发指令')
  }
}
const handleReturn = async (e) => {
  model.value = JSON.parse(oldValue.value)
}
</script>
<template>
  <n-card title="碰撞等级" size="small">
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
      <n-form-item label="碰撞等级" path="collision">
        <n-select v-model:value="model.collision" placeholder="" :options="collisionOptions" />
      </n-form-item>
      <template v-if="model.collision === 'standard'">
        <n-form-item label="J1" path="J1">
          <n-select v-model:value="model.J1" placeholder="" :options="valueOptions" />
        </n-form-item>
        <n-form-item label="J2" path="J2">
          <n-select v-model:value="model.J2" placeholder="" :options="valueOptions" />
        </n-form-item>
        <n-form-item label="J3" path="J3">
          <n-select v-model:value="model.J3" placeholder="" :options="valueOptions" />
        </n-form-item>
        <n-form-item label="J4" path="J4">
          <n-select v-model:value="model.J4" placeholder="" :options="valueOptions" />
        </n-form-item>
        <n-form-item label="J5" path="J5">
          <n-select v-model:value="model.J5" placeholder="" :options="valueOptions" />
        </n-form-item>
        <n-form-item label="J6" path="J6">
          <n-select v-model:value="model.J6" placeholder="" :options="valueOptions" />
        </n-form-item>
      </template>
      <template v-else>
        <n-form-item label="J1" path="P1">
          <n-input v-model:value="model.P1" placeholder="" />
        </n-form-item>
        <n-form-item label="J2" path="P2">
          <n-input v-model:value="model.P2" placeholder="" />
        </n-form-item>
        <n-form-item label="J3" path="P3">
          <n-input v-model:value="model.P3" placeholder="" />
        </n-form-item>
        <n-form-item label="J4" path="P4">
          <n-input v-model:value="model.P4" placeholder="" />
        </n-form-item>
        <n-form-item label="J5" path="P5">
          <n-input v-model:value="model.P5" placeholder="" />
        </n-form-item>
        <n-form-item label="J6" path="P6">
          <n-input v-model:value="model.P6" placeholder="" />
        </n-form-item>
      </template>
    </n-form>
  </n-card>
</template>
