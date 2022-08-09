<template>
  <div class="send-quality-list backdrop-blur">
    <div id="session-end">
      Время сессии истекло,<br />
      задайте новый вопрос.
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
