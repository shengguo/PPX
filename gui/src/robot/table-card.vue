<template>
  <div class="text-[12px] m-0 p-0">
    Joints {{ formatNumber(modelValue.J1) }}, {{ formatNumber(modelValue.J2) }},
    {{ formatNumber(modelValue.J3) }}, {{ formatNumber(modelValue.J4) }},
    {{ formatNumber(modelValue.J5) }}, {{ formatNumber(modelValue.J6) }}
  </div>
  <div class="text-[12px] m-0 p-0">
    TCP {{ formatNumber(modelValue.X) }}, {{ formatNumber(modelValue.Y) }},
    {{ formatNumber(modelValue.Z) }}, {{ formatNumber(modelValue.RX) }},
    {{ formatNumber(modelValue.RY) }}, {{ formatNumber(modelValue.RZ) }}
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
})

const formatNumber = (val) => {
  return Math.round((val + Number.EPSILON) * 1000) / 1000
}
</script>
