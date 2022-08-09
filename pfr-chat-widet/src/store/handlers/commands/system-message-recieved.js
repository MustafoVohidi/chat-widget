import types from '@/store/types'

export default (state, message) => {
  const {
    chat_response: { messages },
  } = message

  if (!messages || !messages.length) {
    return
  }

  const buttons = messages
    .find(({ buttons }) => buttons?.length)
    ?.buttons.map(({ label, tag }) => ({
      text: label,
      value: tag,
    }))
  buttons && (state[types.state.answers] = buttons)

  state[types.state.messages] = [
    ...state[types.state.messages],
    ...messages
      .filter(message => !!message && !!message.content)
      .map(({ content }) => ({
        content,
        from: 'system',
        name: 'Система',
        timestamp: new Date().getTime(),
      })),
  ]
}
