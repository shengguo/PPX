<template>
  <div class="w-full h-full" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="mx-auto bg-white max-w-900 h-full min-w-345 flex flex-col items-center bg-opacity-60" dark:bg-dark>
      <nav class="bg-white shadow dark:bg-gray-800 w-full">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-10">
            <div class="p-10 font-size-20 font-weight-bold text-left text-primary">智能小焊匠</div>
            <div @click="handleMenu(0)" :style="{ color: currentMenu === 0 ? '#608bd2' : '' }" class="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white ml-15">
              {{ tabs[0] }}
            </div>
            <div @click="handleMenu(1)" :style="{ color: currentMenu === 1 ? '#608bd2' : '' }" class="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white ml-15">
              {{ tabs[1] }}
            </div>
            <div @click="handleMenu(2)" :style="{ color: currentMenu === 2 ? '#608bd2' : '' }" class="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white ml-15">
              {{ tabs[2] }}
            </div>
            <div @click="handleMenu(3)" :style="{ color: currentMenu === 3 ? '#608bd2' : '' }" class="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white ml-15">
              {{ tabs[3] }}
            </div>
            <div @click="handleMenu(4)" :style="{ color: currentMenu === 4 ? '#608bd2' : '' }" class="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white ml-15">
              {{ tabs[4] }}
            </div>
          </div>
          <div class="flex items-center space-x-10">
            <changeMode />
            <changeProcess />
            <!-- <n-switch v-model:value="appStore.showPy" /> -->
            <div class="p-2 w-90 text-gray-600 text-[13px]">{{ time }}</div>
          </div>
        </div>
      </nav>
      <!-- 首页 -->
      <n-scrollbar class="p-10" trigger="none" v-if="currentMenu === 0" title="" size="huge">
        <!-- {{ tabs[0] }} -->

        <first></first>
      </n-scrollbar>
      <!-- 手动控制 -->
      <n-scrollbar class="p-10" trigger="none" v-else-if="currentMenu === 1" title="" size="huge">
        <!-- {{ tabs[1] }}  -->
        <control></control>
      </n-scrollbar>
      <!-- 参数设置 -->
      <n-scrollbar class="p-10" trigger="none" v-else-if="currentMenu === 2" title="" size="huge">
        <!-- {{ tabs[2] }} -->
        <settings></settings>
      </n-scrollbar>
      <!-- 更换焊丝 -->
      <n-scrollbar class="p-10" trigger="none" v-else-if="currentMenu === 3" title="" size="huge">
        <!-- {{ tabs[3] }} -->
        <changeWelding></changeWelding>
      </n-scrollbar>
      <!-- 报警信息 -->
      <n-scrollbar class="p-10" trigger="none" v-else="currentMenu === 4" title="" size="huge">
        <!-- {{ tabs[4] }} -->
        <information></information>
      </n-scrollbar>
    </div>
  </div>
  <n-drawer v-model:show="appStore.showPy" :width="502">
    <n-drawer-content title="执行Python脚本" closable>
      <div style="display: flex; justify-content: flex-start" class="mb-10">
        <n-button round type="primary" @click="handleRunPy"> 执行 </n-button>
      </div>
      <!-- <n-input v-model:value="pyCode" type="textarea" placeholder="" /> -->
      <VAceEditor v-model:value="pyCode" :lang="language" :theme="theme" :options="editorOptions" style="height: 300px; width: 100%" />

      <n-input v-model:value="result" placeholder="" />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import first from './line.vue'
import control from './control.vue'
import settings from './settings.vue'
import changeWelding from './change-welding.vue'
import information from './information.vue'

import { useMessage } from 'naive-ui'
import { VAceEditor } from 'vue3-ace-editor'
import changeMode from './change-mode.vue'
import changeProcess from './change-process.vue'
const tabs = ['首页', '手动控制', '参数设置', '更换焊丝', '报警信息']
import { useAppStore } from '@/store'
const appStore = useAppStore()
import { ref, getCurrentInstance, onMounted, onUnmounted, computed } from 'vue'
const { proxy } = getCurrentInstance()

const currentMenu = ref(0)
const handleMenu = (menu) => {
  currentMenu.value = menu
}

import bgImg from '@/assets/images/login_bg.webp'
const pyCode = ref(
  `
import Robot
robot = Robot.RPC("192.168.58.2")
ret = 1+1
  `
)
const result = ref('')
const handleRunPy = async (e) => {
  result.value = ''
  e.preventDefault()
  const res = await proxy.$common.run_code(pyCode.value)
  result.value = JSON.stringify(res.data)
}

const language = ref('python')
const theme = ref('github')
const editorOptions = ref({
  fontSize: '12px',
  showPrintMargin: false
})

const time = ref('')
// 更新当前时间
const updateTime = () => {
  time.value = proxy.$common.formatDateTime()
}
onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 1000) // 每秒更新一次时间

  // 清理定时器，防止内存泄漏
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>
