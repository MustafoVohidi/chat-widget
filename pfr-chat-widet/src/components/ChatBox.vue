<template>
  <div>
    <transition name="slide-down" mode="out-in">
      <chat-card
        v-if="showMessages"
        class="chat-box-card"
        @close="activator = false"
      />
    </transition>
    <div class="chat-box-activator">
      <a
        :href="`tel:${phone}`"
        :class="[
          'chat-box-activator-call',
          { hidden: showMessages },
        ]"
        v-if="phone"
      ></a>
      <div
        @click="onInviteClick"
        :class="[
          'pointer chat-box-activator-chat',
          { active: showMessages },
          {
            bgRed:
              sessionTimer >= 0 &&
              !showMessages &&
              user &&
              !sendQualityForAgent,
          },
        ]"
      ></div>
    </div>
  </div>
</template>
<script>
import ChatCard from './ChatCard'
import types from '@/store/types'
import { mapState } from 'vuex'

export default {
  props: {
    phone: {
      type: String,
      default: null,
    },
  },
  components: {
    ChatCard,
  },
  data: () => ({
    activator: false,
  }),
  computed: {
    ...mapState([
      types.state.options,
      types.state.sessionTimer,
      types.state.sendQualityForAgent,
      types.state.user,
    ]),
    showMessages() {
      return this.activator
    },
  },
  methods: {
    onInviteClick() {
      this.activator = !this.activator
    },
  },
}
</script>
