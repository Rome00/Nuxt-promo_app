<template>
  <div class="course-create-wrapper">
    <div class="course-create-headerText">
      Please choose title of your Course.
    </div>
    <h2 class="course-create-subtitle">
      No worries, you can change title later.
    </h2>
    <form class="course-create-form" @submit.prevent>
      <div class="course-create-form-group">
        <div class="field course-create-form-field control has-icons-right">
          <input
            v-model="form.title"
            :maxLength="50"
            type="text"
            placeholder="e.g. Amazing Course in Flutter!"
            class="input is-large"
            @input="emitformTitle"
            @blur="$v.form.title.$touch()"
          />
          <span class="icon is-small is-right">{{ valCounter }}</span>
          <div v-if="$v.form.title.$error" class="form-error">
            <span v-if="!$v.form.title.required" class="help is-danger">
              Title is required
            </span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        title: ''
      },
      maxLength: 50
    }
  },
  validations: {
    form: {
      title: {
        required
      }
    }
  },
  computed: {
    isValid() {
      return !this.$v.$invalid
    },
    valCounter() {
      return this.maxLength - this.form.title.length
    }
  },
  methods: {
    emitformTitle() {
      this.$emit('formStep', { data: this.form, isValid: this.isValid })
    }
  }
}
</script>

<style lang="scss" scoped></style>
