import types from '@/store/types'

export default state => {
  clearInterval(state[types.state.pingTimer])
  state[types.state.pingTimer] = null
}
