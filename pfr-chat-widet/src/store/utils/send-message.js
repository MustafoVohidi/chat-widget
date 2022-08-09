import Vue from 'vue'

export default message => {
  Vue.prototype.$socket.send(JSON.stringify(message))
}
