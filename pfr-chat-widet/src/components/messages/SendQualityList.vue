<template>
  <div class="send-quality-list">
    <div id="send-quality-thanks">Спасибо</div>
    <div id="send-quality">
      Оцените качество обслуживания
    </div>
    <div>
      <app-star-button
        v-for="(item, i) in items"
        :icon="
          stars >= i
            ? 'fav-selected-star'
            : 'fav-empty-star'
        "
        size="24"
        :key="i"
        color="#0095da"
        dark
        @click="starUpdate ? (stars = i) : ''"
      />
    </div>
    <div>
      <AppIconButton
        @click="
          $emit(
            'click',
            comment
              ? 'Оценка: ' +
                  (stars + 1) +
                  '. Комментарий: ' +
                  commentText
              : stars + 1
          ),
            (starUpdate = false),
            (hideComment = true)
        "
        v-if="starUpdate"
        >Поставить оценку
      </AppIconButton>
    </div>
    <template v-if="!hideComment">
      <app-textarea
        placeholder="Введите сообщение"
        @input="onInput"
        :icnone="true"
        ref="message"
        v-if="starUpdate"
        v-autogrow
      />
      <div class="send-quality-comment" v-if="!starUpdate">
        {{ commentText }}
      </div>
    </template>
  </div>
</template>
<script>
import AppStarButton from '../core/AppStarButton.vue'
import AppIconButton from '@/components/core/AppIconButton'
import AppTextarea from '@/components/core/AppTextarea'
import { mapActions } from 'vuex'
import types from '@/store/types'

export default {
  data: function() {
    return {
      stars: 0,
      starUpdate: true,
      comment: false,
      commentText: '',
      hideComment: false,
    }
  },
  created() {
    this.stars = 0
    this.starUpdate = true
    this.comment = false
    this.hideComment = false
  },
  methods: {
    ...mapActions([
      types.actions.send,
      types.actions.sendTyping,
    ]),
    onInput(text) {
      this.commentText = text

      if (this.commentText.length > 0) {
        this.comment = true
      } else {
        this.comment = false
      }

      this.currentOperator && this.sendTyping(text)
    },
  },
  components: {
    AppStarButton,
    AppIconButton,
    AppTextarea,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
