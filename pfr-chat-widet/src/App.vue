<template>
  <div id="app" :class="theme">
    <chat-box class="chat-box" :phone="options.phone">
    </chat-box>
  </div>
</template>

<script>
import ChatBox from './components/ChatBox'
import types from '@/store/types'

export default {
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    theme() {
      return 'theme-' + (this.options.theme || 'default')
    },
  },
  mounted() {
    this.$store.commit(
      types.mutations.INIT_OPTIONS,
      this.options
    )
  },
  components: {
    ChatBox,
  },
}
</script>
