<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    class="app-button"
  >
    <div :style="{ color: fontColor }">
      <slot></slot>
    </div>
    <app-icon
      :icon="icon"
      :color="fontColor"
      :size="size"
      v-if="icon"
    />
  </button>
</template>
<script>
import AppIcon from './AppIcon'

export default {
  name: 'app-icon-button',
  components: {
    AppIcon,
  },
  props: {
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: '#000',
    },
    size: {
      type: Number,
      default: 16,
    },
    dark: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    fontColor() {
      return this.disabled
        ? '#666'
        : this.dark
        ? '#fff'
        : '#000'
    },
  },
}
</script>
