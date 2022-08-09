import eventHandlers from './events'
import commandHandlers from './commands'

export default {
  commands: {
    closeByAgentAndSendQuality:
      commandHandlers.closeByAgentAndSendQuality,
    process_started: commandHandlers.processStarted,
    StartChat: commandHandlers.systemMessageRecieved,
    nextChat: commandHandlers.systemMessageRecieved,
    finishChat: commandHandlers.finishChat,
    messagefromoperator:
      commandHandlers.operatorMessageRecieved,
    OutOfService: commandHandlers.outOfService,
    arrivedfromagent: commandHandlers.conversationRejected,
    operatorConnecting: commandHandlers.operatorConnecting,
    sendQuality4Agent: commandHandlers.sendQualityForAgent,
    sendCommentExit: commandHandlers.sendCommentExit,
  },
  events: {
    RouteToAgent: eventHandlers.routeToAgentEventHadler,
    Pong: eventHandlers.pongEventHadler,
  },
}
