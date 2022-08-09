import types from '@/store/types'

export default (state, message) => {
  const { Text } = message
  state[types.state.answers] = [
    {
      value: '1',
      text: '1',
    },
    {
      value: '2',
      text: '2',
    },
    {
      value: '3',
      text: '3',
    },
    {
      value: '4',
      text: '4',
    },
    {
      value: '5',
      text: '5',
    },
  ]
  state[types.state.sendQualityForAgent] = true
  state[types.state.messages].push({
    content: Text,
    from: 'system',
    name: 'Система',
    timestamp: new Date().getTime(),
  })
}
