import { defineStore } from 'pinia'
import { lStorage } from '@/utils'

export const useAppStore = defineStore('app', {
  state() {
    return {
      // 机器人
      weaveSettings: [
        {
          weaveNum: '0',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '1',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '2',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '3',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '4',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '5',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '6',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '7',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        },
        {
          weaveNum: '8',
          weaveType: 0,
          weaveFraquency: 0,
          weaveLncStayTim: 0,
          weaveRange: 0,
          weaveLeftRange: 0,
          weaveRightRange: 0,
          additionalStayTime: 0,
          weaveLeftStayTime: 0,
          weaveRightStayTime: 0,
          weaveCircleRadio: 0,
          weaveStationary: 0
        }
      ],
      cur_pont: {}, //机器人的当前点位
      script: '',
      showPy: false,
      cur_process_key: '默认',
      process_items: [
        {
          name: '默认',
          points: [
            // {
            //   id: '7b3b882be2ced06c79ad208f44126854',
            //   J1: 77.42837524414062,
            //   J2: -23.193334579467773,
            //   J3: -85.92440032958984,
            //   J4: -67.78760528564453,
            //   J5: 92.99285125732422,
            //   J6: -13.684178352355957,
            //   X: 58.09326171875,
            //   Y: -184.13320922851562,
            //   Z: 799.837158203125,
            //   RX: -86.8172607421875,
            //   RY: -13.8253755569458,
            //   RZ: -10.33570671081543,
            //   path: 'point',
            //   offset: '0',
            //   deugSpeed: 20,
            //   weaveSelect: '0',
            //   oprationMode: '0',
            //   roundingRule: '0',
            //   noWeldLength: 0,
            //   workLength: 0,
            // },
          ]
        }
      ]
    }
  },
  actions: {}
})
