<template>
  <div class="app-textarea">
    <textarea
      class="p-20"
      :rows="rows"
      :placeholder="placeholder"
      v-model="value"
      @keyup.enter="onSubmit"
      ref="textarea"
      :disabled="disabled"
      @input="onInput"
      v-bind:style="{ height: height }"
    />
    <div
      class="app-textarea-actions"
      :class="{ disabled, 'd-none': icnone }"
    >
      <div
        :class="`icon icon-${icon} icon-pointer`"
        @click="onSubmit"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    icnone: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    rows: {
      type: String,
      default: '1',
    },
  },
  data: () => ({
    value: '',
    height: '38px',
  }),
  methods: {
    onInput(event) {
      if (
        event.target.scrollHeight > 40 &&
        this.value.length > 35
      ) {
        console.log(`${event.target.scrollHeight}px`)
        this.height = `${event.target.scrollHeight}px`
      } else {
        this.height = '38px'
      }
      this.$emit('input', this.value)
    },

    onSubmit() {
      this.height = '38px'
      if (this.disabled) {
        return
      }
      if (this.value.trim()) {
        this.$emit('submit', this.value)
      }
      this.value = ''
    },
  },
}
</script>
