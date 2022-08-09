export default (state, text) => ({
  Action: 'Typing',
  text,
  operator_session_id:
    state.currentOperator.operator_session_id,
})
