<template>
  <div
    v-html="svg"
    @click="$emit('click')"
    class="app-icon"
  ></div>
</template>
<script>
export default {
  name: 'app-icon',
  props: {
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 24,
    },
  },
  computed: {
    svg() {
      return require(`!html-loader!../../assets/svg/${this.icon}.svg`)
    },
  },
  mounted() {
    this.updateSvg()
  },
  updated() {
    this.updateSvg()
  },
  methods: {
    updateSvg() {
      if (this.$el.firstElementChild.nodeName === 'svg') {
        const svgElement = this.$el.firstElementChild
        if (this.color) {
          svgElement.setAttribute('fill', this.color)
        }
        svgElement.setAttribute('width', this.size)
        svgElement.setAttribute('height', this.size)
      }
    },
  },
  watch: {
    color() {
      this.updateSvg()
    },
    size() {
      this.updateSvg()
    },
    icon() {
      this.updateSvg()
    },
  },
}
</script>
