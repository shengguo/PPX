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
    message: '请输入 inputValue',
  },
}
const formRef = ref(null)
const model = ref({
  force: '1',
})

const valueOptions = ref([
  {
    label: '1（25N）',
    value: '1',
    disabled: false,
  },
])
</script>
<template>
  <n-card title="恒力设置" size="small">
    <div style="display: flex; justify-content: flex-start" class="mb-10">
      <n-button round type="primary" @click="handleValidateButtonClick"> 保存 </n-button>
      <n-button class="ml-10" round type="primary" @click="handleValidateButtonClick">
        退回
      </n-button>
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
        maxWidth: '640px',
      }"
    >
      <n-form-item label="恒力设置" path="force">
        <n-select v-model:value="model.force" placeholder="" :options="valueOptions" />
      </n-form-item>
    </n-form>
  </n-card>
</template>
