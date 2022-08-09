import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'
import handleCamundaMessage from './handlers'
import { closeWebsocket } from '@/store/utils'
import {
  clearTimer,
  scrollMessages,
  sendMessage,
} from './utils'
import {
  getOperatorMessage,
  getRegularMessage,
  getRegisterMessage,
  getTypingMessage,
} from './messages'

Vue.use(Vuex)

const PING_TIMER = 10000

export default new Vuex.Store({
  state: {
    [types.state.answers]: [],
    [types.state.sendQualityForAgent]: false,
    [types.state.messages]: [
      {
        content: `Здравствуйте! Вас приветствует робот Единого контакт-центра в социальной сфере! Представьтесь, пожалуйста, чтобы задать вопрос в чате или позвоните нам по телефону: 8-800-6-000-000`,
        from: 'system',
        name: 'Система',
        timestamp: new Date().getTime(),
      },
    ],
    [types.state.opened]: false,
    [types.state.loading]: false,
    [types.state.user]: null,
    [types.state.options]: {},
    [types.state.currentOperator]: null,
    [types.state.pingTimer]: null,
    [types.state.sessionTimer]: 50,
    [types.state.sessionId]: null,
  },
  getters: {
    [types.getters.anonymouseUser]: ({ user }) => {
      return !user || !user.fio
    },
  },
  mutations: {
    [types.mutations.SET_LOADING](state, loading) {
      state.loading = loading
    },
    [types.mutations.SOCKET_ONOPEN](state) {
      state.opened = true
    },
    [types.mutations.SOCKET_ONMESSAGE](state, message) {
      handleCamundaMessage(state, message)
      scrollMessages()
    },
    [types.mutations.SOCKET_ONCLOSE](state) {
      state.opened = false
      state.currentOperator = null
      if (state.sendQualityForAgent === false) {
        state.answers = []
      }
      clearTimer(state)
    },
    [types.mutations.SET_USER](state, user) {
      state.user = user
      // state.messages = []
    },
    [types.mutations.INIT_OPTIONS](state, options) {
      state.options = options
    },
    [types.mutations.SET_PING_TIMER](state, timer) {
      state.pingTimer = timer
    },
    [types.mutations.SESSION_TIMER](state, value) {
      state.sessionTimer += value
      if (state.sessionTimer-- <= 0) {
        state.sessionTimer = 0
        if (state.opened == true) {
          closeWebsocket()
          state.opened = false
          state.currentOperator = null
          if (state.sendQualityForAgent === false) {
            state.answers = []
          }
          clearTimer(state)
        }
        state.user = null
      }

      if (state.sessionTimer > 50) {
        state.sessionTimer = 50
      }
    },
    [types.mutations.ADD_MESSAGES](state, ...messages) {
      state.messages = [...state.messages, ...messages]
      scrollMessages()
    },
    [types.mutations.CLEAR_ANSWERS](state) {
      state.sendQualityForAgent = false
      state.answers = []
    },
  },
  actions: {
    [types.actions.send]: function(
      { commit, state },
      content
    ) {
      commit(types.mutations.ADD_MESSAGES, {
        content,
        from: 'user',
        name: state.user.fio,
        timestamp: new Date().getTime(),
      })
      commit(types.mutations.SESSION_TIMER, 50)
      commit(types.mutations.CLEAR_ANSWERS)
      const message = state.currentOperator
        ? getOperatorMessage(state, content)
        : getRegularMessage(state, content)
      sendMessage(message)
    },
    [types.actions.sendQuality]: function(
      { commit, state },
      content
    ) {
      commit(types.mutations.ADD_MESSAGES, {
        content,
        from: 'user',
        name: 'Вы',
        timestamp: new Date().getTime(),
      })

      const message = state.currentOperator
        ? getOperatorMessage(state, content)
        : getRegularMessage(state, content)
      sendMessage(message)
    },
    [types.actions.sendTyping]: function({ state }, text) {
      const message = getTypingMessage(state, text)
      sendMessage(message)
    },
    async [types.actions.register](
      { state, commit },
      user
    ) {
      commit(types.mutations.SET_LOADING, true)
      return new Promise((resolve, reject) => {
        try {
          const message = getRegisterMessage(state, user)
          sendMessage(message)
          commit(types.mutations.SET_USER, user)
          commit(types.mutations.SET_LOADING, false)
          resolve(user)
        } catch (e) {
          reject(e)
        }
      })
    },
    async [types.actions.connect]({ commit, dispatch }) {
      commit(types.mutations.CLEAR_ANSWERS)
      commit(types.mutations.SET_LOADING, true)
      commit(types.mutations.SESSION_TIMER, 100)
      return new Promise((resolve, reject) => {
        Vue.prototype.$connect()
        const vm = new Vue()
        vm.$socket.onopen = () => {
          commit(types.mutations.SOCKET_ONOPEN, true)
          dispatch(types.actions.startPingTimer)
          commit(types.mutations.SET_LOADING, false)
          resolve()
        }
        vm.$socket.onerror = () => reject()
      })
    },
    [types.actions.startPingTimer]: function({ commit }) {
      commit(
        types.mutations.SET_PING_TIMER,
        setInterval(() => {
          commit(types.mutations.SESSION_TIMER, 0)
          sendMessage({
            action: 'ping',
          })
        }, PING_TIMER)
      )
    },
  },
  modules: {},
})
