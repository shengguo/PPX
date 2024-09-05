<template>
  <div class="bg-light-50">
    <n-form
      class="border-gray-200 border-solid p-5 m-5"
      ref="formRef"
      :model="modelValue"
      :rules="rules"
      label-placement="left"
      label-width="200"
      require-mark-placement="right-hanging"
      :size="size"
      :style="{
        maxWidth: '640px'
      }"
    >
      <div class="vbar-before">
        序号{{ modelValue.weaveNum }}
        <n-button round type="primary" @click="handleSave(modelValue)"> 保存 </n-button>
      </div>

      <n-form-item label="摆动类型" path="weaveType">
        <n-select v-model:value="modelValue.weaveType" placeholder="" :options="typeOptions" />
      </n-form-item>

      <n-form-item label="摆动等待时间" path="weaveLncStayTim">
        <n-select v-model:value="modelValue.weaveLncStayTim" placeholder="" :options="waitOptions"> </n-select>
      </n-form-item>
      <n-form-item label="摆动位置等待" path="weaveStationary">
        <n-select v-model:value="modelValue.weaveStationary" placeholder="" :options="weaveOptions"> </n-select>
      </n-form-item>

      <n-form-item label="摆动频率" path="weaveFraquency">
        <n-input v-model:value="modelValue.weaveFraquency" placeholder="">
          <template #suffix> Hz </template>
        </n-input>
      </n-form-item>
      <n-form-item label="摆动幅度" path="weaveRange">
        <n-input v-model:value="modelValue.weaveRange" placeholder="">
          <template #suffix> mm </template>
        </n-input>
      </n-form-item>
      <n-form-item label="摆动左停留时间" path="weaveLeftStayTime">
        <n-input v-model:value="modelValue.weaveLeftStayTime" placeholder="">
          <template #suffix> ms </template>
        </n-input>
      </n-form-item>
      <n-form-item label="摆动右停留时间" path="weaveRightStayTime">
        <n-input v-model:value="modelValue.weaveRightStayTime" placeholder="">
          <template #suffix> ms </template>
        </n-input>
      </n-form-item>
    </n-form>
  </div>
</template>
<script setup>
import { useAppStore } from '@/store'
const appStore = useAppStore()
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
//0-平面三角波摆动；1-垂直L型三角波摆动；2-顺时针圆形摆动；3-逆时针圆形摆动；4-平面正弦波摆动；5-垂直L型正弦波摆动；6-垂直三角波摆动；7-垂直正弦波摆动
const typeOptions = ref([
  {
    label: '平面三角波摆动',
    value: 0
  },
  {
    label: '垂直L型三角波摆动',
    value: 1
  },
  {
    label: '顺时针圆形摆动',
    value: 2
  },
  {
    label: '逆时针圆形摆动',
    value: 3
  },
  {
    label: '平面正弦波摆动',
    value: 4
  },
  {
    label: '垂直L型正弦波摆动',
    value: 5
  },
  {
    label: '垂直三角波摆动',
    value: 6
  },
  {
    label: '垂直正弦波摆动',
    value: 7
  }
])
//等待模式 0-周期不包含等待时间；1-周期包含等待时间必选参数
const waitOptions = ref([
  {
    label: '不包含',
    value: 0
  },
  {
    label: '包含',
    value: 1
  }
])
// 摆动位置等待，0-等待时间内位置继续移动；1-等待时间内位置静止
const weaveOptions = ref([
  {
    label: '等待时间内位置继续移动',
    value: 0
  },
  {
    label: '等待时间内位置静止',
    value: 1
  }
])
defineProps({
  modelValue: {
    type: Object,
    default: {
      weaveNum: 0,
      weaveType: 0,
      weaveFraquency: 0,
      weaveLncStayTim: 0,
      weaveRange: 0,
      weaveLeftStayTime: 0,
      weaveRightStayTime: 0,
      weaveCircleRadio: 0,
      weaveStationary: 0
    }
  }
})

const handleSave = async (model) => {
  //找到store中的值，将这些信息替换掉
  let id = model.weaveNum
  let data = appStore.weaveSettings.find((item) => item.weaveNum == id)
  if (data) {
    data = model
    $message.success('更新完成')
  } else {
    $message.warning('请刷新后重试')
  }
}
</script>
<style lang="scss" scoped>
.vbar-before {
  color: #464c5b;
  font-weight: 700;
}
.vbar-before:before {
  content: '';
  display: inline-block;
  left: 0;
  width: 2px;
  height: 14px;
  background-color: red;
  margin-right: 5px;
  vertical-align: -2px;
}
</style>
