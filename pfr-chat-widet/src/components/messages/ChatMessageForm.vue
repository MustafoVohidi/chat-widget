<template>
  <div>
    <ready-answer-list
      :items="answers"
      @click="onSubmit"
      v-if="answers.length && !sendQualityForAgent"
    />
    <app-textarea
      placeholder="Введите сообщение"
      icon="send"
      @input="onInput"
      @submit="onSubmit"
      ref="message"
      :disabled="disabled"
      v-autogrow
    />
  </div>
</template>
<script>
import AppTextarea from '@/components/core/AppTextarea'
import ReadyAnswerList from '@/components/messages/ReadyAnswerList'
import { mapActions, mapState } from 'vuex'
import types from '@/store/types'

export default {
  components: {
    AppTextarea,
    ReadyAnswerList,
  },
  computed: {
    ...mapState([
      types.state.answers,
      types.state.opened,
      types.state.loading,
      types.state.currentOperator,
      types.state.sendQualityForAgent,
    ]),
    disabled() {
      const hasReadyAnswers = !!this.answers.length
      const isConnectClosed = !this.opened
      return (
        isConnectClosed || this.loading || hasReadyAnswers
      )
    },
  },
  methods: {
    ...mapActions([
      types.actions.send,
      types.actions.sendTyping,
    ]),
    onInput(text) {
      this.currentOperator && this.sendTyping(text)
    },
    async onSubmit(text) {
      if (!this.opened) {
        return
      }
      this.send(text.replace(/\r?\n|\r/g, ' ').trim())
    },
  },
  mounted() {
    this.$nextTick(() =>
      this.$refs.message.$refs.textarea.focus()
    )
  },
}
</script>
