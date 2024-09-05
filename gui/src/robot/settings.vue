<template>
  <n-tabs
    :key="type + placement"
    :type="type"
    animated
    :placement="placement"
    :style="placement === 'left' || placement === 'right' ? { height: '240px' } : undefined"
  >
    <n-tab-pane name="oasis" tab="碰撞等级设置">
      <collision />
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="恒力设置"> <steadyForce /></n-tab-pane>
    <n-tab-pane name="jay chou" tab="摆动设置"> <weave /> </n-tab-pane>
  </n-tabs>
</template>
<script setup>
const placement = ref('left')
const type = ref('card')
import collision from './collision.vue'
import steadyForce from './steady-force.vue'
import weave from './weave.vue'
</script>
