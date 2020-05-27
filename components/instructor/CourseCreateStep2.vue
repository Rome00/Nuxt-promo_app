<template>
  <div class="course-create-wrapper">
    <div class="course-create-headerText">
      What category best fits the knowledge you'll share?
    </div>
    <h2 class="course-create-subtitle">
      If you're not sure about the right category, you can change it later.
    </h2>
    <form class="course-create-form" @submit.prevent>
      <div class="course-create-form-group">
        <div class="course-create-form-field">
          <div class="select is-large">
            <select
              v-model="form.category"
              @change="emitCategory"
              @blur="$v.form.category.$touch()"
            >
              <option disabled value="">Select Category</option>
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
            <div v-if="$v.form.category.$dirty && !isValid" class="form-error">
              <span class="help is-danger has-text-left">
                Category is required
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        category: ''
      }
    }
  },
  validations: {
    form: {
      category: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({ categories: 'instructor/categories/getCategories' }),
    isValid() {
      return !this.$v.$invalid
    }
  },
  methods: {
    emitCategory() {
      this.$emit('formStep', { data: this.form, isValid: this.isValid })
    }
  }
}
</script>

<style lang="scss" scoped></style>
