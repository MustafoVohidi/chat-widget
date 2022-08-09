<template>
  <div class="user-form p-20">
    <div
      v-show="fioErred"
      v-if="fioErredEn"
      class="form-tooltip"
    >
      Недопустимый символ
    </div>
    <div v-show="fioErred" v-else class="form-tooltip">
      Введите имя кириллицей
    </div>
    <app-input
      v-model="user.fio"
      placeholder="Имя"
      v-bind:icon="
        notValid
          ? 'person'
          : fioErred
          ? 'erred'
          : 'not-erred'
      "
      v-bind:class="
        notValid ? '' : fioErred ? 'erred' : 'not-erred'
      "
      ref="username"
      @submit="onSubmit"
      :disabled="loading"
    />
    <app-input
      v-model="user.phone"
      placeholder="Номер телефона"
      v-bind:icon="
        notValid
          ? 'phone'
          : phoneErred
          ? 'erred'
          : 'not-erred'
      "
      v-bind:class="
        notValid ? '' : phoneErred ? 'erred' : 'not-erred'
      "
      mask="+9 (999) 999 99 99"
      type="tel"
      :disabled="loading"
      @submit="onSubmit"
    />
    <div v-show="phoneErred" class="form-tooltip">
      Номер должен содержать 11 цифр
    </div>
    <input type="hidden" v-model="user.source" />
    <app-icon-button
      id="continue-button"
      class="user-form-submit"
      color="#0095da"
      @click="onSubmit"
      :disabled="
        notValid || notValidName || notValidPhone || loading
      "
    >
      Продолжить
    </app-icon-button>
  </div>
</template>
<script>
import AppInput from '@/components/core/AppInput'
import AppIconButton from '@/components/core/AppIconButton'
import types from '@/store/types'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    AppIconButton,
    AppInput,
  },
  data: function() {
    return {
      fioErred: false,
      fioErredEn: false,
      phoneErred: false,
      user: {
        fio: '',
        phone: '',
        source: location.host,
      },
    }
  },
  computed: {
    ...mapState([types.state.loading]),
    notValid() {
      return (
        !this.user.fio ||
        this.user.fio.length == 0 ||
        !this.user.phone ||
        this.user.phone.length == 0
      )
    },
    notValidName() {
      let re = /^[А-яЁё ]*$/i
      return !re.test(this.user.fio)
    },
    notValidNameEn() {
      let re = /^[А-яЁёA-z ]+$/i
      return !re.test(this.user.fio)
    },
    notValidPhone() {
      let re = /^\+?[0-9]{11}$/i
      let phone = this.user.phone.replaceAll(/[() ]+/g, '')
      return !re.test(phone)
    },
  },
  async mounted() {
    this.$nextTick(() =>
      this.$refs.username.$refs.input.focus()
    )
  },
  methods: {
    ...mapActions([types.actions.register]),
    onSubmit() {
      if (this.notValidName) {
        this.fioErred = true
      }
      if (this.notValidNameEn) {
        this.fioErredEn = true
      }
      if (this.notValidPhone) {
        this.phoneErred = true
      }
      if (this.notValidName || this.notValidPhone) {
        return false
      }

      this.user.phone = this.user.phone.replaceAll(
        /[() ]+/g,
        ''
      )
      this.register(this.user)
    },
  },
  watch: {
    notValidName: {
      deep: true,
      handler: function(newVal) {
        this.fioErred = newVal
      },
    },
    notValidNameEn: {
      deep: true,
      handler: function(newVal) {
        this.fioErredEn = newVal
      },
    },
    notValidPhone: {
      deep: true,
      handler: function(newVal) {
        this.phoneErred = newVal
      },
    },
  },
}
</script>
