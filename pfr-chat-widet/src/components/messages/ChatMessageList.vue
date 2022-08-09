<template>
  <div
    class="messages p-14-12"
    id="messages-container"
    v-bind:class="{
      blur: sendQualityForAgent || sessionTimer < 0,
    }"
  >
    <template v-for="(item, i) in items">
      <system-message
        :item="item"
        v-if="!item.name"
        :key="i"
      />
      <chat-message v-else :item="item" :key="i" />
    </template>
    <send-quality-list
      :items="answers"
      v-if="sendQualityForAgent"
      @click="onSubmit"
    />
    <session-end v-if="sessionTimer <= 0" />
  </div>
</template>
<script>
import ChatMessage from '@/components/messages/ChatMessage'
import SystemMessage from '@/components/messages/SystemMessage'
import SendQualityList from '@/components/messages/SendQualityList'
import SessionEnd from '@/components/messages/SessionEnd'
import { mapActions, mapState } from 'vuex'
import types from '@/store/types'

export default {
  components: {
    ChatMessage,
    SystemMessage,
    SendQualityList,
    SessionEnd,
  },
  computed: {
    ...mapState([
      types.state.answers,
      types.state.sendQualityForAgent,
      types.state.sessionTimer,
    ]),
  },
  methods: {
    ...mapActions([
      types.actions.sendQuality,
      types.actions.sendTyping,
    ]),
    onSubmit: async function(text) {
      this.sendQuality(
        (text + '').replace(/\r?\n|\r/g, ' ').trim()
      )
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
