<template>
  <!-- {{ appStore.process_items }} -->
  <n-grid x-gap="5" :cols="4">
    <n-gi>
      <n-form-item label="今日计划" path="todayPlan">
        <n-input v-model:value="model.todayPlan" placeholder="">
          <template #suffix> 件 </template>
        </n-input>
      </n-form-item>
    </n-gi>
    <n-gi>
      <n-form-item label="今日产量" path="todayOutput">
        <n-input v-model:value="model.todayOutput" placeholder="">
          <template #suffix> 件 </template>
        </n-input>
      </n-form-item>
    </n-gi>
    <n-gi>
      <n-form-item label="焊接长度" path="weldLength">
        <n-input v-model:value="model.weldLength" placeholder="">
          <template #suffix> M </template>
        </n-input>
      </n-form-item>
    </n-gi>
    <n-gi>
      <n-form-item label="焊丝剩余" path="remaining">
        <n-input v-model:value="model.remaining" placeholder="">
          <template #suffix> M </template>
        </n-input>
      </n-form-item>
    </n-gi>
  </n-grid>
  <div class="flex">
    <n-flex vertical>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'point')"> 起点 </n-button>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'line')"> 直线 </n-button>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'arc1')"> 圆弧点1 </n-button>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'arc2')"> 圆弧点2 </n-button>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'welding')"> 段焊 </n-button>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'safe')"> 安全点 </n-button>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'delete')"> 删除 </n-button>
      <n-button class="btnStyle" round type="primary" @click="handleClick($event, 'reposition')"> 重定位 </n-button>
    </n-flex>
    <div class="px-10">
      <n-data-table max-height="300" min-height="300" :columns="columns" :data="cur_process_item.points" :pagination="false" :bordered="true" :row-key="rowKey" :checked-row-keys="checkedRowKeysRef" @update:checked-row-keys="handleCheck" :row-props="goDetail" />

      <n-flex class="mt-10">
        <n-button class="btnStyle" round type="primary" @click="handleRunTest($event)"> 模拟 </n-button>
        <n-button class="btnStyle" round type="primary" @click="handleRun($event)"> 开始 </n-button>
        <n-button class="btnStyle" round type="primary" @click="handlePauseResume($event)"> 暂停 </n-button>
        <n-button class="btnStyle" round type="primary" @click="handleStop($event)"> 取消 </n-button>
        <!-- <n-button class="w-110" round type="primary" @click="handleSave($event)">
          保存工艺包
        </n-button>
        <n-button class="w-110" round type="primary" @click="handleTest1($event)"> test </n-button> -->
        <n-button class="btnStyle" round type="primary" @click="handleTest1($event)"> test </n-button>
      </n-flex>
    </div>
  </div>

  <n-drawer v-model:show="showRight" :width="502">
    <n-drawer-content title="编辑" closable>
      <div style="display: flex; justify-content: flex-start" class="mb-10">
        <n-button round type="primary" @click="handleUpdate($event)"> 保存 </n-button>
      </div>
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" label-width="auto" require-mark-placement="right-hanging" :size="size">
        <div class="mt-10">
          <n-form-item label="是否偏移" path="offset">
            <n-select v-model:value="model.offset" placeholder="" :options="offsetOptions"> </n-select>
          </n-form-item>

          <n-form-item label="调试速度" path="deugSpeed">
            <n-input v-model:value="model.deugSpeed" placeholder="">
              <template #suffix> % </template>
            </n-input>
          </n-form-item>

          <n-form-item label="摆动选择" path="weaveSelect">
            <n-select v-model:value="model.weaveSelect" placeholder="" :options="weaveOptions"> </n-select>
          </n-form-item>

          <n-form-item label="功能模式" path="oprationMode">
            <n-select v-model:value="model.oprationMode" placeholder="" :options="oprationModeOptions"> </n-select>
          </n-form-item>

          <n-form-item label="取整规则" path="roundingRule">
            <n-select v-model:value="model.roundingRule" placeholder="" :options="roundingRuleOptions"> </n-select>
          </n-form-item>

          <n-form-item label="执行长度" path="weldLength">
            <n-input v-model:value="model.weldLength" placeholder="">
              <template #suffix> mm </template>
            </n-input>
          </n-form-item>
          <n-form-item label="非执行长度" path="noWeldLength">
            <n-input v-model:value="model.noWeldLength" placeholder="">
              <template #suffix> mm </template>
            </n-input>
          </n-form-item>
        </div>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
const isStart = ref(false)
const cur_process_item = computed({
  get: () => appStore.process_items.find((item) => item.name === appStore.cur_process_key),
  set: (value) => {
    const index = appStore.process_items.findIndex((item) => item.name === appStore.cur_process_key)
    if (index !== -1) {
      appStore.process_items[index] = value
    }
  }
})
function goDetail(row) {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      let rowId = row.id
      let item = checkedRowKeysRef.value.find((id) => id === rowId)
      if (item) {
        checkedRowKeysRef.value = checkedRowKeysRef.value.filter((id) => id !== row.id)
      } else {
        checkedRowKeysRef.value.push(rowId)
      }
    }
  }
}

import { useAppStore } from '@/store'
import tableCard from './table-card.vue'
const appStore = useAppStore()
const size = ref('small')
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkedRowKeysRef = ref([])
const rowKey = (row) => row.id
const handleCheck = (rowKeys) => {
  checkedRowKeysRef.value = rowKeys
}

const handleClick = async (e, type) => {
  e.preventDefault()
  // 校验
  if (type === 'delete') {
    let arr = cur_process_item.value.points
    cur_process_item.value.points = arr.filter((item) => !checkedRowKeysRef.value.includes(item.id))
    return
  }
  if (type === 'reposition') {
    // 检测一下是否有选中行
    if (checkedRowKeysRef.value.length === 0) {
      $message.warning('未选择任何行')
    }
    if (checkedRowKeysRef.value.length > 1) {
      $message.warning('只能选择一行')
    }
  }
  if (type === 'safe') {
    // 安全点
    //检查上一个点必须是直线，圆弧1，圆弧2，段焊
    let arr = cur_process_item.value.points
    let checks = ['line', 'arc2', 'welding']
    if (arr.length === 0 || checks.includes(arr[arr.length - 1].path)) {
      $message.warning('安全点的上一个点必须是直线、圆弧2或者段焊')
      return
    }
  }
  //取信息
  const res = await proxy.$common.get_robot_info()
  //记录当前点
  appStore.cur_pont = res.data
  //重新定位更新数据
  if (type === 'reposition') {
    let arr = cur_process_item.value.points
    let row = arr.find((item) => item.id === checkedRowKeysRef.value[0])
    if (row) {
      row.J1 = res.data.J1
      row.J2 = res.data.J2
      row.J3 = res.data.J3
      row.J4 = res.data.J4
      row.J5 = res.data.J5
      row.J6 = res.data.J6
      row.X = res.data.X
      row.Y = res.data.Y
      row.Z = res.data.Z
      row.RX = res.data.RX
      row.RY = res.data.RY
      row.RZ = res.data.RZ
    }
    return
  }

  //存入组列表
  let arr = cur_process_item.value.points
  arr.push({
    id: proxy.$common.uuid(),
    J1: res.data.J1,
    J2: res.data.J2,
    J3: res.data.J3,
    J4: res.data.J4,
    J5: res.data.J5,
    J6: res.data.J6,
    X: res.data.X,
    Y: res.data.Y,
    Z: res.data.Z,
    RX: res.data.RX,
    RY: res.data.RY,
    RZ: res.data.RZ,
    path: type,

    //默认值
    offset: '0',
    deugSpeed: 20,
    weaveSelect: '0',
    oprationMode: '0',
    roundingRule: '0',
    noWeldLength: 0,
    weldLength: 0
  })
}
const handlePauseResume = async (e) => {
  e.preventDefault()
  let script = ``
  if (isStart.value === true) {
    script = `
import Robot
robot = Robot.RPC("192.168.58.2")
robot.ProgramPause()
  `
  } else {
    script = `
import Robot
robot = Robot.RPC("192.168.58.2")
robot.ProgramResume()
  `
  }
  const res = await proxy.$common.run_code(script)
}
const handleStop = async (e) => {
  e.preventDefault()
  let script = `
import Robot
robot = Robot.RPC("192.168.58.2")
ret = robot.ProgramStop()
  `
  const res = await proxy.$common.run_code(script)
}
const handleRunTest = async (e) => {
  e.preventDefault()
  isStart.value = true
  //组织脚本
  let script = `
import Robot
import time
robot = Robot.RPC("192.168.58.2")
ret = robot.Mode(0)   #机器人切入自动运行模式
time.sleep(1)
  `
  let arr = cur_process_item.value.points
  if (arr.length === 0) {
    $message.warning('没有数据，请检查')
  }
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    switch (item.path) {
      case 'point':
        script += `
tool = 1 #工具坐标系编号
user = 0 #工件坐标系编号
desc_pos1 = [${item.J1}, ${item.J2}, ${item.J3}, ${item.J4}, ${item.J5}, ${item.J6}]
ret = robot.MoveJ(desc_pos1, tool, user, vel=${item.deugSpeed})
      `
        break
      case 'line':
        script += `
tool = 1 #工具坐标系编号
user = 0 #工件坐标系编号
desc_pos1 = [${item.X}, ${item.Y}, ${item.Z}, ${item.RX}, ${item.RY}, ${item.RZ}]
      `
        if (item.weaveSelect === '1') {
          //摆动
          script += `
ret = robot.WeaveStart(0)
ret = robot.MoveL(desc_pos1, tool, user, vel=${item.deugSpeed}, acc=100)
ret = robot.WeaveEnd(0)
      `
        } else {
          script += `
ret = robot.MoveL(desc_pos1, tool, user, vel=${item.deugSpeed}, acc=100)
      `
        }

        break
      case 'arc1':
        let arr = cur_process_item.value.points
        if (i + 1 >= arr.length) {
          continue
        }
        let arc2 = arr[i + 1]
        if (arc2.type !== 'arc2') {
          continue
        }
        script += `
desc_posc1 = [${item.X}, ${item.Y}, ${item.Z}, ${item.RX}, ${item.RY}, ${item.RZ}]
desc_posc2 = [${arc2.X}, ${arc2.Y}, ${arc2.Z}, ${arc2.RX}, ${arc2.RY}, ${arc2.RZ}]
tool = 1#工具坐标系编号
user = 0 #工件坐标系编号
ret = robot.MoveC(desc_posc1, tool, user, desc_posc2, tool, user)  #笛卡尔空间圆弧运动
`
        break
      case 'arc2':
        break
      case 'welding':
        //找到上一个点, 段焊结束
        if (i > 0) {
          let arr = cur_process_item.value.points
          const prevPoint = arr[i - 1]
          const startJ = `[${prevPoint.J1}, ${prevPoint.J2}, ${prevPoint.J3}, ${prevPoint.J4}, ${prevPoint.J5}, ${prevPoint.J6}]`
          const endJ = `[${item.J1}, ${item.J2}, ${item.J3}, ${item.J4}, ${item.J5}, ${item.J6}]`
          const startXYZ = `[${prevPoint.X}, ${prevPoint.Y}, ${prevPoint.Z}, ${prevPoint.RX}, ${prevPoint.RY}, ${prevPoint.RZ}]`
          const endXYZ = `[${item.X}, ${item.Y}, ${item.Z}, ${item.RX}, ${item.RY}, ${item.RZ}]`
          script += getWeldingCode(startJ, endJ, startXYZ, endXYZ)
        }
        break
    }
  }
  // console.log(script)
  // console.log('结果：' + JSON.stringify(res))
  const res = await proxy.$common.run_code(script)
  console.log('结果：' + JSON.stringify(res))
}
const handleTest1 = () => {
  let arr = cur_process_item.value.points
  arr.push({
    id: proxy.$common.uuid(),
    J1: 77,
    J2: -23,
    J3: -85,
    J4: -67,
    J5: 92,
    J6: -13,
    X: 58.09326171875,
    Y: -184.13320922851562,
    Z: 799.837158203125,
    RX: -86.8172607421875,
    RY: -13.8253755569458,
    RZ: -10.33570671081543,
    path: 'point',
    offset: '0',
    deugSpeed: 20,
    weaveSelect: '0',
    oprationMode: '0',
    roundingRule: '0',
    noWeldLength: 0,
    weldLength: 0
  })
}

const getWeldingCode = (startJ, endJ, startXYZ, endXYZ) => {
  //焊接IO类型(0-控制箱IO；1-扩展IO) arcNum 焊机配置文件编号
  let weldIOType = 0
  let arcNum = 0 //焊机配置文件编号
  let weaveNum = 0 //摆焊参数配置编号
  return `
weldTimeout=5000
start_desc=${startXYZ}
end_desc=${endXYZ}
start_joint=${startJ}
end_joint=${endJ}
weldLength =${model.value.weldLength}
noweldLength =${model.value.noWeldLength}
ret = robot.SegmentWeldStart(start_desc, end_desc, start_joint, end_joint, weldLength, noweldLength, ${weldIOType}, ${arcNum}, weldTimeout, False, ${weaveNum}, tool=1, user=0)
print("SegmentWeldStart", ret)
  `
}
const offsetOptions = [
  { label: '不偏移', value: '0' },
  { label: '偏移', value: '1' }
]
const weaveOptions = [
  { label: '不执行摆动', value: '0' },
  { label: '执行摆动', value: '1' }
]
const oprationModeOptions = [
  { label: '第一段不执行', value: '0' },
  { label: '第一段执行', value: '1' }
]
const roundingRuleOptions = [
  { label: '取整', value: '1' },
  { label: '不取整', value: '0' }
]
const rules = {
  inputValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入 inputValue'
  }
}
const formRef = ref(null)
const model = ref({
  todayPlan: 0,
  todayOutput: 0,

  remaining: 0,
  offset: '0',
  deugSpeed: 0,
  weaveSelect: '0',
  oprationMode: '0',
  roundingRule: '0',
  noWeldLength: 10,
  weldLength: 10 //这两个不能都为0
})
import { defineComponent, h, render, computed } from 'vue'
import { NButton, NSelect } from 'naive-ui'

let optionsPath = [
  { label: '起点', value: 'point' },
  { label: '直线', value: 'line' },
  { label: '圆弧点1', value: 'arc1' },
  { label: '圆弧点2', value: 'arc2' },
  { label: '段焊', value: 'welding' },
  { label: '安全点', value: 'safe' }
]

const columns = ref([
  {
    type: 'selection'
  },
  {
    title: '位号',
    key: 'no',
    render: (row, index) => `${index + 1}`,
    ellipsis: true,
    width: 60
  },
  {
    title: '点位',
    key: 'J1',
    render(row) {
      return h(tableCard, {
        modelValue: row
      })
    }
  },
  {
    title: '路径',
    key: 'path',
    width: 80,
    render(row) {
      return proxy.$common.getOptionLable(optionsPath, row.path)
    },
    ellipsis: true
  },
  {
    title: '操作',
    key: 'actions',
    width: 110,
    render(row) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            gap: '8px'
          }
        },
        [
          h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              onClick: () => handleEdit(row)
            },
            { default: () => '编辑' }
          ),
          h(
            NButton,
            {
              type: 'info',
              size: 'small',
              onClick: () => handleMove(row)
            },
            { default: () => '移动' }
          )
        ]
      )
    }
  }
])
let showRight = ref(false)

const handleMove = async (row) => {
  let script = `
import Robot
import time
robot = Robot.RPC("192.168.58.2")
ret = robot.Mode(0)   #机器人切入自动运行模式
time.sleep(1)
tool = 1 #工具坐标系编号
user = 0 #
desc_pos1 = [${row.J1}, ${row.J2}, ${row.J3}, ${row.J4}, ${row.J5}, ${row.J6}]
ret = robot.MoveJ(desc_pos1, tool, user, vel=30)
      `
  const res = await proxy.$common.run_code(script)
}
const handleEdit = (row) => {
  showRight.value = true
  model.value.id = row.id //记录id
  model.value.offset = row.offset
  model.value.deugSpeed = row.deugSpeed
  model.value.weaveSelect = row.weaveSelect
  model.value.oprationMode = row.oprationMode
  model.value.roundingRule = row.roundingRule
  model.value.weldLength = row.weldLength
  model.value.noWeldLength = row.noWeldLength
}
const handleUpdate = async (e) => {
  e.preventDefault()
  let arr = cur_process_item.value.points
  const row = arr.find((item) => item.id === model.value.id)
  if (row) {
    row.offset = model.value.offset
    row.deugSpeed = model.value.deugSpeed
    row.weaveSelect = model.value.weaveSelect
    row.oprationMode = model.value.oprationMode
    row.roundingRule = model.value.roundingRule
    row.weldLength = model.value.weldLength
    row.noWeldLength = model.value.noWeldLength
  }
  showRight.value = false
}

//保存工艺包
const handleSave = async (e) => {
  e.preventDefault()
  let plan = cur_process_item
  let name = plan.name
  await $dialog.confirm({
    title: '提示',
    type: 'warning',
    content: '当前工艺包已存在，是否覆盖？',
    async confirm() {
      //找到process_items的具体数据，替换掉
      let index = appStore.process_items.findIndex((item) => item.name === name)
      appStore.process_items[index] = plan
      $message.success('更新完成')
    }
  })
}
</script>
<style lang="scss" scoped>
.btnStyle {
  width: 22.5rem;
}
</style>
