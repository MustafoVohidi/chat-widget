export default (
  state,
  clientInfo = {
    fio: '',
  }
) => ({
  action: 'change channel chat_bot',
  channel_type: 'channel chat_bot',
  clientInfo,
  Timestamp: new Date().getTime(),
  skill:
    (state.options.skillsRoute &&
      state.options.skillsRoute[clientInfo.fio]) ||
    'UniversalFirstLineChat',
})
