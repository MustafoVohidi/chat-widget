<template>
  <div :class="{ maximized }" :id="`sid-${sessionId}`">
    <div class="chat-box-card-header">
      <div style="flex-grow: 1;">
        <div class="chat-box-card-header-title">
          <a href="tel:88006000000 ">{{ header.title }}</a>
        </div>
        <div class="chat-box-card-header-subtitle mt-5">
          {{ header.text }}
        </div>
      </div>
      <div
        class="chat-box-card-header-download icon pointer icon-download"
        @click="download"
        title="Скачать историю"
      ></div>
      <div
        class="sm-hidden chat-box-card-header-resize icon pointer icon-resize"
        @click="toggleSize"
        title="Изменить размер окна"
      ></div>
      <div
        class="chat-box-card-header-close  icon pointer icon-close"
        @click="$emit('close')"
        title="Закрыть окно"
      ></div>
    </div>
    <div class="chat-box-card-body">
      <chat-message-list
        :items="messages"
      ></chat-message-list>
      <template
        v-if="!anonymouseUser && !sendQualityForAgent"
      >
        <chat-message-form />
      </template>
      <template v-if="anonymouseUser && sessionTimer > 0">
        <user-form />
      </template>
      <template
        v-if="
          (!anonymouseUser && !opened) ||
            (!anonymouseUser && sendQualityForAgent) ||
            sessionTimer <= 0
        "
      >
        <chat-closed-overlay @click="reconnect" />
      </template>
    </div>
  </div>
</template>
<script>
import ChatMessageList from '@/components/messages/ChatMessageList'
import ChatMessageForm from '@/components/messages/ChatMessageForm'
import ChatClosedOverlay from '@/components/ChatClosedOverlay'
import UserForm from './user/UserForm'
import types from '@/store/types'
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex'
import { scrollMessages } from '@/store/utils'

export default {
  components: {
    ChatClosedOverlay,
    ChatMessageList,
    ChatMessageForm,
    UserForm,
  },
  computed: {
    ...mapState([
      types.state.messages,
      types.state.opened,
      types.state.user,
      types.state.options,
      types.state.sessionId,
      types.state.sendQualityForAgent,
      types.state.sessionTimer,
    ]),
    ...mapGetters([types.getters.anonymouseUser]),
    header() {
      return (
        (this.options && this.options.header) || {
          title: 'Центр консультирования ПФР',
          text: 'Задайте свой вопрос',
        }
      )
    },
    toggleSizeIcon() {
      return this.maximized ? 'minimize' : 'fullscreen'
    },
  },
  data: () => ({
    maximized: false,
  }),
  async created() {
    this.opened || (await this.reconnect())
  },
  mounted() {
    scrollMessages()
  },
  methods: {
    ...mapActions([types.actions.connect]),
    ...mapMutations({
      addMessages: types.mutations.ADD_MESSAGES,
    }),
    async reconnect() {
      try {
        await this.connect()
      } catch (e) {
        this.addMessages({
          content: `Не удалось установить соединение.`,
        })
      }
    },
    toggleSize() {
      this.maximized = !this.maximized
    },
    download() {
      const element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' +
          encodeURIComponent(
            this.messages
              .map(
                ({ timestamp, name, content }) =>
                  `${new Date(
                    timestamp
                  ).toLocaleTimeString()} ${name} <br>${content}<br><br>`
              )
              .join('\n')
          )
      )
      element.setAttribute('download', 'history.html')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
  },
}
</script>
