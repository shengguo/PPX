import dayjs from 'dayjs'
import { useStorage } from '@vueuse/core'

const common = {}
common.$get = (url, params) => {
  return request.get(url, { params })
}
common.$post = (url, data, config) => {
  return request.post(url, data, config)
}

common.$delete = (url, params) => {
  return request.delete(url, { params })
}
common.getOptionLable = (optionsType, value) => {
  const option = optionsType.find((opt) => opt.value === value)
  return option ? option.label : value
}
common.formatDate = (date = undefined, format = 'YYYY-MM-DD') => {
  return common.formatDateTime(date, format)
}

common.formatDateTime = (time = undefined, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format)
}
common.uuid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4()
}
//机器人-调用python代码的部分
common.run_code = (script) => {
  console.log(script)
  return request.post('/base/run_code', { script: script }, { noNeedToken: true })
}
//机器人-获取机器人信息
common.get_robot_info = () => {
  let script = `
import Robot
robot = Robot.RPC("192.168.58.2")
ret = {
    "program_state": robot.robot_state_pkg.program_state,
    "robot_mode": robot.robot_state_pkg.robot_mode,
    "robot_state": robot.robot_state_pkg.robot_state,
    "collisionState": robot.robot_state_pkg.collisionState,
    "J1": robot.robot_state_pkg.jt_cur_pos[0],
    "J2": robot.robot_state_pkg.jt_cur_pos[1],
    "J3": robot.robot_state_pkg.jt_cur_pos[2],
    "J4": robot.robot_state_pkg.jt_cur_pos[3],
    "J5": robot.robot_state_pkg.jt_cur_pos[4],
    "J6": robot.robot_state_pkg.jt_cur_pos[5],

    "X": robot.robot_state_pkg.tl_cur_pos[0],
    "Y": robot.robot_state_pkg.tl_cur_pos[1],
    "Z": robot.robot_state_pkg.tl_cur_pos[2],
    "RX": robot.robot_state_pkg.tl_cur_pos[3],
    "RY": robot.robot_state_pkg.tl_cur_pos[4],
    "RZ": robot.robot_state_pkg.tl_cur_pos[5],
    # "actual_qd1": robot.robot_state_pkg.jt_cur_pos[0],
    "speed": robot.robot_state_pkg.jt_cur_pos[0],
    "actual_qd2": robot.robot_state_pkg.jt_cur_pos[1],
    "actual_qd3": robot.robot_state_pkg.jt_cur_pos[2],
    "actual_qd4": robot.robot_state_pkg.jt_cur_pos[3],
    "actual_qd5": robot.robot_state_pkg.jt_cur_pos[4],
    "actual_qd6": robot.robot_state_pkg.jt_cur_pos[5],
    # "actual_qdd1": robot.robot_state_pkg.actual_qdd[0],
    "acceleration": robot.robot_state_pkg.actual_qdd[0],
    "actual_qdd2": robot.robot_state_pkg.actual_qdd[1],
    "actual_qdd3": robot.robot_state_pkg.actual_qdd[2],

    "actual_qdd4": robot.robot_state_pkg.actual_qdd[3],
    "actual_qdd5": robot.robot_state_pkg.actual_qdd[4],
    "actual_qdd6": robot.robot_state_pkg.actual_qdd[5],
}
  `
  return common.run_code(script)
}
common.setLocalValue = (key, value) => {
  let state = useStorage(key, value)
  state.value = value
}
common.getLocalValue = (key) => {
  const state = useStorage(key)
  return state.value
}
common.clearLocalValue = (key) => {
  const msgData = useStorage(key)
  msgData.value = null
}

export default common

/**
 * @desc  函数节流
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle(fn, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args)
      }, wait)
    }
  }
}
