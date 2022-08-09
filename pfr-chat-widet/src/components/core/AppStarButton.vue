<template>
  <app-icon
    @click="$emit('click')"
    :icon="icon"
    :color="fontColor"
    v-if="icon"
  />
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
      type: String,
      default: '16',
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
