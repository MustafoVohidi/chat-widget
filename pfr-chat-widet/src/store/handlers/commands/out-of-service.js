import types from '@/store/types'

export default (state, message) => {
  state[types.state.messages].push({
    content: message.Text,
    from: 'system',
    name: 'Система',
    timestamp: new Date().getTime(),
  })
}
