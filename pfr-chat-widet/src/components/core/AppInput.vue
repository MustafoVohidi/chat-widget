<template>
  <div class="app-input">
    <label v-if="icon">
      <app-icon
        :icon="icon"
        :color="color"
        :size="24"
      ></app-icon>
    </label>
    <input
      ref="input"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @keydown.enter="$emit('submit')"
      v-mask="mask"
      :disabled="!!disabled"
      :type="type"
    />
  </div>
</template>
<script>
import AppIcon from './AppIcon'

export default {
  components: {
    AppIcon,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    mask: {
      type: String,
      default: '',
    },
  },
  computed: {
    color() {
      return this.disabled ? '#888' : '#0095da'
    },
  },
}
</script>
