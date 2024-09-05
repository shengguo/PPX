<template>
  <n-data-table :columns="columns" :data="data" :pagination="false" :bordered="true" />
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { NButton, useMessage } from 'naive-ui'

const columns = ref([
  {
    title: '序号',
    key: 'no',
    render: (row, index) => `${index + 1}`,
  },
  {
    title: '日期',
    key: 'date',
  },
  {
    title: '时间',
    key: 'time',
  },
  {
    title: '报警值',
    key: 'value',
  },
  {
    title: '报警描述',
    key: 'description',
  },
  {
    title: '报警等级',
    key: 'level',
  },
])

const data = ref([
  { no: 1, date: '2024-08-18', time: '4:18', value: '70', description: '温度过高', level: '警告' },
  { no: 3, date: '2024-08-18', time: '4:18', value: '70', description: '温度过高1', level: '警告1' },
])
</script>
