import types from '../../types'

export default (state, message) => {
  const {
    operator_session_id,
    operator_session_id2,
  } = message
  state[types.state.currentOperator] = {
    operator_session_id,
    operator_session_id2,
  }
  state[types.state.messages].push({
    content: 'Оператор выбран, ожидайте ответа',
    from: 'system',
    name: 'Система',
    timestamp: new Date().getTime(),
  })
}
