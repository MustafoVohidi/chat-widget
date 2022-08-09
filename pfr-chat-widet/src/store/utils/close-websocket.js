import Vue from 'vue'

export default () => {
  Vue.prototype.$socket.close()
}
