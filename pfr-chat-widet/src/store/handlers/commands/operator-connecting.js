import types from '@/store/types'

// eslint-disable-next-line no-unused-vars
export default (state, message) => {
  state[types.state.loading] = true
  state[types.state.messages].push({
    content: 'Идет поиск свободного оператора...',
    from: 'system',
    name: 'Система',
    timestamp: new Date().getTime(),
  })
}
