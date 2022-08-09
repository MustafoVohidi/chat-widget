import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vueCustomElement from 'vue-custom-element'
import VueNativeSock from 'vue-native-websocket'
import './directives'
import shadowCss from '!!raw-loader!sass-loader!./assets/styles/index.scss'
const VueInputMask = require('vue-inputmask').default
export const CUSTOM_ELEMENT_NAME = 'widget-chat'

Vue.config.productionTip = false
Vue.use(vueCustomElement)
Vue.use(VueInputMask)
App.store = store

Vue.customElement(CUSTOM_ELEMENT_NAME, App, {
  props: ['options'],
  shadow: true,
  shadowCss,
  beforeCreateVueInstance(RootComponentDefinition) {
    const { options } = RootComponentDefinition.propsData
    const wsUrl =
      options?.ws ||
      `${process.env.VUE_APP_CAMUNDA_WEBSOCKET_PROTOCOL}://${process.env.VUE_APP_CAMUNDA_WEBSOCKET_URL}`

    Vue.use(VueNativeSock, wsUrl, {
      store: store,
      format: 'json',
      connectManually: true,
    })
    return RootComponentDefinition
  },
})
