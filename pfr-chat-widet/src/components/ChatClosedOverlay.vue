<template>
  <div class="overlay p-20">
    <app-icon-button
      id="chat-closed-overlay"
      color="#0095da"
      dark
      @click="$emit('click')"
    >
      Задать новый вопрос
    </app-icon-button>
  </div>
</template>
<script>
import AppIconButton from './core/AppIconButton'

export default {
  components: {
    AppIconButton,
  },
}
</script>
