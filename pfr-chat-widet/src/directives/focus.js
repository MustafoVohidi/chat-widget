import Vue from 'vue'
Vue.directive('focus', {
  inserted: function(el) {
    Vue.nextTick(function() {
      el.focus()
    })
  },
})
