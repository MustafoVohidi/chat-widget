import types from '@/store/types'
import { closeWebsocket } from '@/store/utils'

// eslint-disable-next-line no-unused-vars
export default (state, message) => {
  state[types.state.messages].push({
    content: 'Спасибо за уделенное время',
    from: 'system',
    name: 'Система',
    timestamp: new Date().getTime(),
  })
  closeWebsocket()
}
