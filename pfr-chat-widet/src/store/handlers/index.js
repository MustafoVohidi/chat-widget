import handlersMap from './handlers-map'

export default (state, message) => {
  const { Command, Event } = message

  Command &&
    handlersMap.commands[Command] &&
    handlersMap.commands[Command](state, message)

  Event &&
    handlersMap.events[Event] &&
    handlersMap.events[Event](state, message)
}
