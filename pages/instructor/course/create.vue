<template>
  <div class="full-page-takeover-window">
    <div class="full-page-takeover-page">
      <Header :title="`Step 1 of 2`" exit-link="/instructor/courses" />
      <div class="full-page-takeover-header-bottom-progress">
        <div
          :style="{ width: progressBar }"
          class="full-page-takeover-header-bottom-progress-highlight"
        ></div>
      </div>
      <div class="course-create full-page-takeover-container">
        <div class="container">
          <!-- STEP 1 of FORM  -->
          <component :is="active" ref="activeComponent" @formStep="fillData" />
          <!--  <course-create-1 v-if="activeStep === 1" />
         
          <course-create-2 v-if="activeStep === 2" /> -->
          <!-- STEP 2 END -->
        </div>
        <div class="full-page-footer-row">
          <div class="container">
            <div class="full-page-footer-col">
              <div v-if="!firstStep">
                <a class="button is-large" @click.prevent="_prevStep">
                  Previous
                </a>
              </div>
              <div v-else class="empty-container"></div>
            </div>
            <div class="full-page-footer-col">
              <div>
                <button
                  v-if="!lastStep"
                  class="button is-large float-right"
                  :disabled="!proceed"
                  @click.prevent="_nextStep"
                >
                  Continue
                </button>
                <button
                  v-else
                  :disabled="!proceed"
                  class="button is-success is-large float-right"
                  @click="createCourse"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/shared/Header'
import CourseCreate1 from '@/components/instructor/CourseCreateStep1'
import CourseCreate2 from '@/components/instructor/CourseCreateStep2'
import MultiMixin from '@/mixins/MultiComponent'

export default {
  components: { Header, CourseCreate1, CourseCreate2 },
  mixins: [MultiMixin],
  async fetch({ store }) {
    await store.dispatch('instructor/categories/fetchCategories')
  },
  data() {
    return {
      steps: ['CourseCreate1', 'CourseCreate2'],
      proceed: false,
      form: {
        title: '',
        category: ''
      }
    }
  },
  methods: {
    _nextStep() {
      this.nextStep()
      this.$nextTick(() => (this.proceed = this.$refs.activeComponent.isValid))
    },
    _prevStep() {
      this.prevStep()
      this.activeStep--
    },
    fillData({ data, isValid }) {
      this.form = { ...this.form, ...data }
      this.proceed = isValid
    },
    createCourse() {
      this.$store
        .dispatch('instructor/courses/createCourse', this.form)
        .then(() => {
          this.$router.push({ name: 'instructor-courses' })
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  }
}
</script>

<style lang="scss">
.float-right {
  float: right;
}
.empty-container {
  width: 1px;
  height: 1px;
}
.course-create {
  &-wrapper {
    margin-top: 60px;
    text-align: center;
  }
  &-headerText {
    font-weight: 500;
    line-height: 1.1;
    margin-top: 21px;
    margin-bottom: 10.5px;
    font-size: 36px;
    font-weight: 300;
  }
  &-subtitle {
    font-size: 24px;
    font-weight: 300;
    margin-top: 21px;
    margin-bottom: 10.5px;
  }
  &-form {
    margin-top: 60px;
    &-group {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-field {
      min-width: 552px;
    }
    .select {
      width: 100%;
      > select {
        width: 100%;
      }
    }
  }
}
</style>
