import types from '@/store/types'

export default (state, message) => {
  const {
    operator_session_id,
    operator_session_id2,
    operator_fio,
    text,
  } = message
  state[types.state.currentOperator] = {
    operator_session_id,
    operator_session_id2,
  }
  state[types.state.loading] = false
  state[types.state.messages].push({
    content: text,
    from: 'operator',
    name: operator_fio,
    timestamp: new Date().getTime(),
  })
}
