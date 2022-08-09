<template>
  <div class="mb-10 system-message">
    {{ item.content }}
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
