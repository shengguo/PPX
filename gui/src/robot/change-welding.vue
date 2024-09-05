<template>
  <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto" require-mark-placement="right-hanging" :size="size">
    <div class="flex items-center justify-center">
      <div>
        <n-form-item label="品牌" path="brand">
          <n-input v-model:value="model.brand" placeholder=""> </n-input>
        </n-form-item>

        <n-form-item label="剩余长度" path="remaining">
          <n-input v-model:value="model.remaining" placeholder="">
            <template #suffix> m </template>
          </n-input>
        </n-form-item>
        <n-form-item label="上次更换时间" path="lastTime">
          <n-date-picker class="w-full" v-model:value="model.lastTime" type="date" placeholder="" />
        </n-form-item>
      </div>
      <TheIcon class="ml-15 flex items-center justify-center" icon="material-symbols:arrow-circle-right-outline" :size="38" />
      <div>
        <n-form-item label="品牌" path="brandNew">
          <n-input v-model:value="model.brandNew" placeholder=""> </n-input>
        </n-form-item>
        <n-form-item label="焊丝长度" path="remainingNew">
          <n-input v-model:value="model.remainingNew" placeholder="">
            <template #suffix> m </template>
          </n-input>
        </n-form-item>

        <n-form-item label="更换时间" path="currentTime">
          <n-date-picker class="w-full" v-model:value="model.currentTime" type="date" placeholder="" />
        </n-form-item>
      </div>
    </div>

    <div class="flex">
      <div class="px-10">
        <n-data-table max-height="300" :columns="columns" :data="data" :pagination="false" :bordered="true" />
      </div>
      <n-flex vertical>
        <n-button round type="primary" @click="handleValidateButtonClick"> 更换焊丝 </n-button>
        <n-button round type="primary" @click="handleValidateButtonClick"> 修改剩余长度 </n-button>
      </n-flex>
    </div>
  </n-form>
</template>

<script setup>
const size = ref('small')
const handleValidateButtonClick = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      $message.success('验证成功')
    } else {
      console.log(errors)
      $message.error('验证失败')
    }
  })
}

const rules = {
  inputValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 inputValue'
  }
}
const formRef = ref(null)
const model = ref({
  brand: '',
  brandNew: '',
  remaining: 0,
  remainingNew: 0,
  lastTime: null,
  currentTime: null
})
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const columns = ref([
  {
    title: '序号',
    key: 'no',
    render: (row, index) => `${index + 1}`
  },
  {
    title: '换上日期',
    key: 'lastTime',
    render(row) {
      return proxy.$common.formatDate(row.lastTime)
    }
  },
  {
    title: '换下日期',
    key: 'currentTime',
    render(row) {
      return proxy.$common.formatDate(row.currentTime)
    }
  },
  {
    title: '品牌',
    key: 'brand'
  },
  {
    title: '焊接长度',
    key: 'welding'
  },
  {
    title: '剩余长度',
    key: 'remainingNew'
  }
])

const data = ref([
  {
    no: 4,
    lastTime: '2023-05-30 14:30:00',
    currentTime: '2023-06-09 09:15:30',
    brand: 'Brand A',
    welding: 220,
    remainingNew: 20
  },
  {
    no: 5,
    lastTime: '2023-06-09 09:15:30',
    currentTime: '2023-06-19 16:45:20',
    brand: 'Brand D',
    welding: 190,
    remainingNew: 35
  }
])
</script>
