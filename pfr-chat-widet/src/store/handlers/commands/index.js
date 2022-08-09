import closeByAgentAndSendQuality from './close-by-agent-and-send-quality'
import operatorMessageRecieved from './operator-message-recieved'
import outOfService from './out-of-service'
import processStarted from './process-started'
import systemMessageRecieved from './system-message-recieved'
import finishChat from './finish-chat'
import conversationRejected from './conversation-rejected'
import operatorConnecting from './operator-connecting'
import sendQualityForAgent from './send-quality-for-agent'
import sendCommentExit from './send-comment-exit'

export default {
  closeByAgentAndSendQuality,
  conversationRejected,
  finishChat,
  operatorMessageRecieved,
  operatorConnecting,
  outOfService,
  processStarted,
  sendCommentExit,
  sendQualityForAgent,
  systemMessageRecieved,
}
