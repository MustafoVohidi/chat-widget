import Vue from 'vue'

Vue.directive('autogrow', {
  bind: function(el) {
    const initialHeight = 58

    el.addEventListener('keyup', value => {
      const [textarea] = value.path
      textarea.style.height = `${textarea.scrollHeight}px`

      if (value.code === 'Enter') {
        textarea.style.height = `${initialHeight}px`
        value.preventDefault()
      }
    })
  },
})
