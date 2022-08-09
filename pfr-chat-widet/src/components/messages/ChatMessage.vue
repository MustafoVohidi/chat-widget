<template>
  <div
    :class="`mb-10 chat-message chat-message-${item.from}`"
  >
    <div class="chat-message-avatar"></div>
    <div class="chat-message-content">
      <div class="mb-5 chat-message-content-title">
        <span class="chat-message-content-title-name">
          {{
            item.name != 'Система'
              ? item.name + '&nbsp;'
              : ''
          }}
        </span>
        <span class="chat-message-content-title-time">{{
          time
        }}</span>
      </div>
      <div
        class="chat-message-content-body"
        v-html="unescapedMessage"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    unescapedMessage() {
      let item = this.item?.content?.replace(
        /\n/g,
        '<br />'
      )
      return item.replace(/<\/?[^>]+>/g, '')
    },
    svg() {
      return require(`!html-loader!../../assets/svg/${this.icon}.svg`)
    },
    time() {
      const date = new Date(this.item.timestamp)
      return `${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    },
  },
}
</script>
