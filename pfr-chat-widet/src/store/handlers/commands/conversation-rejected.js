import types from '@/store/types'

// eslint-disable-next-line no-unused-vars
export default (state, message) => {
  state[types.state.currentOperator] = null
  state[types.state.messages].push({
    content: 'Не удалось соединиться с оператором',
    name: 'Система',
    from: 'system',
    timestamp: new Date().getTime(),
  })
}
