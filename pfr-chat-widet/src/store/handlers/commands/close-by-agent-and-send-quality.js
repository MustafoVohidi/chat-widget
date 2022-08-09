import types from '@/store/types'

export default (state, message) => {
  const { Text } = message
  state[types.state.currentOperator] = null
  state[types.state.answers] = [
    {
      value: 'Да',
      text: 'Да',
    },
    {
      value: 'Нет',
      text: 'Нет',
    },
  ]
  state[types.state.messages].push({
    content: Text,
    from: 'system',
    name: 'Система',
    timestamp: new Date().getTime(),
  })
}
