<template>
  <div class="p-20 ready-answers">
    <app-icon-button
      v-for="(item, i) in items"
      :key="i"
      color="#0095da"
      dark
      @click="$emit('click', item.text)"
    >
      {{ item.text }}
    </app-icon-button>
  </div>
</template>
<script>
import AppIconButton from '../core/AppIconButton.vue'
export default {
  components: {
    AppIconButton,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
