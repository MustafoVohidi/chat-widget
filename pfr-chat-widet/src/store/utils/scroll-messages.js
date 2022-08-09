import { CUSTOM_ELEMENT_NAME } from '../../main'

export default () => {
  const [{ shadowRoot }] = document.getElementsByTagName(
    CUSTOM_ELEMENT_NAME
  )
  const container = shadowRoot.querySelector(
    '#messages-container'
  )
  container &&
    process.nextTick(
      () => (container.scrollTop = container.scrollHeight)
    )
}
