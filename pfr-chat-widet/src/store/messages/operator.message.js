import types from '@/store/types'
import getRegularMessage from './regular.message'

export default (state, text = '') => ({
  ...getRegularMessage(state, text),
  ...state[types.state.currentOperator],
})
