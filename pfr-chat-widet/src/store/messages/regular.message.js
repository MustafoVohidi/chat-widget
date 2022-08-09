export default (state, text = '') => ({
  action: 'chatSendTextFromClient',
  text,
  Timestamp: new Date().getTime(),
  skill:
    (state.options.skillsRoute &&
      state.options.skillsRoute[state.user.fio]) ||
    'UniversalFirstLineChat',
})
