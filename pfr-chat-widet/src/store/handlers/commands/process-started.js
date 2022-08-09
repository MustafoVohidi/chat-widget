import { getRegisterMessage } from '@/store/messages'
import sendMessage from '@/store/utils/send-message'

// eslint-disable-next-line no-unused-vars
export default (state, { session_id }) => {
  const user = state.user
  state.sessionId = session_id
  if (user) {
    sendMessage(getRegisterMessage(state, user))
  }
}
