<template>
  <div class="manage-page">
    <Header title="Some very nice course name" exit-link="/instructor/courses">
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <button
            class="button is-primary is-inverted is-medium is-outlined"
            :disabled="!canUpdateCourse"
            @click="updateCourse"
          >
            Save
          </button>
        </div>
        <div class="full-page-takeover-header-button">
          <Modal
            open-title="Favorite"
            open-btn-class="button is-primary is-inverted is-medium is-outlined"
            title="Make Course Hero"
            @opened="applyCourseValues"
            @submitted="createCourseHero"
          >
            <div>
              <form>
                <div class="field">
                  <label class="label">Hero title</label>
                  <span class="label-info">Suggested 64 Characters</span>
                  <div class="control">
                    <input
                      v-model="courseHero.title"
                      class="input is-medium"
                      type="text"
                      placeholder="Amazing course discount"
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Hero subtitle</label>
                  <span class="label-info">Suggested 128 Characters</span>
                  <input
                    v-model="courseHero.subtitle"
                    class="input is-medium"
                    type="text"
                    placeholder="Get all of the course for 9.99$"
                  />
                </div>
                <div class="field">
                  <label class="label">Course image</label>
                  <span class="label-info">
                    Image in format 3 by 1 (720 x 240)
                  </span>
                  <input
                    v-model="courseHero.image"
                    class="input is-medium"
                    type="text"
                    placeholder="Some image in format 3 by 1 (720 x 240)"
                  />
                  <figure class="image is-3by1">
                    <img :src="courseHero.image" />
                  </figure>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="course-manage">
      <div class="container">
        <div class="columns">
          <div class="column is-3 p-lg">
            <!-- <aside class="menu is-hidden-mobile"> -->
            <aside class="menu">
              <p class="menu-label">
                Course Editing
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display TargetStudents -->
                  <a
                    :class="activeClassComponent(0)"
                    @click.prevent="navSteps(0)"
                  >
                    Target Your Students
                  </a>
                </li>
                <li>
                  <!-- display LandingPage -->
                  <a
                    :class="activeClassComponent(1)"
                    @click.prevent="navSteps(1)"
                  >
                    Course Landing Page
                  </a>
                </li>
              </ul>
              <p class="menu-label">
                Course Management
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display Price -->
                  <a
                    :class="activeClassComponent(2)"
                    @click.prevent="navSteps(2)"
                  >
                    Price
                  </a>
                </li>
                <li>
                  <!-- display Status -->
                  <a
                    :class="activeClassComponent(3)"
                    @click.prevent="navSteps(3)"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <component
              :is="active"
              :course="course"
              @courseValueUpdated="handelCourseUpdate"
            />
            <!-- <target-students />
            <landing-page />
            <price />
            <status /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/shared/Header'
import LandingPage from '@/components/instructor/LandingPage'
import TargetStudents from '@/components/instructor/TargetStudents'
import Status from '@/components/instructor/Status'
import Price from '@/components/instructor/Price'
import MultiMixin from '@/mixins/MultiComponent'
import Modal from '@/components/shared/Modal'

export default {
  layout: 'instructor',
  components: { Header, LandingPage, TargetStudents, Status, Price, Modal },
  mixins: [MultiMixin],
  async fetch({ store, params }) {
    await store.dispatch('instructor/courses/fetchCourseById', params.id)
    await store.dispatch('instructor/categories/fetchCategories')
  },
  data() {
    return {
      steps: ['TargetStudents', 'LandingPage', 'Price', 'Status'],
      courseHero: {}
    }
  },
  computed: {
    ...mapState({
      course: state => state.instructor.courses.item,
      canUpdateCourse: state => state.instructor.courses.canUpdateCourse
    })
  },
  methods: {
    handelCourseUpdate({ value, field }) {
      this.$store.dispatch('instructor/courses/updateCourseValue', {
        value,
        field
      })
    },
    updateCourse() {
      this.$store
        .dispatch('instructor/courses/updateCourse')
        .then(_ => {
          this.$toasted.success('Course has been successfully updated!', {
            duration: 3000
          })
        })
        .catch(_ => {
          this.$toasted.error('course cannot be updated', { duration: 3000 })
        })
    },
    applyCourseValues() {
      this.$set(this.courseHero, 'title', this.course.title)
      this.$set(this.courseHero, 'subtitle', this.course.subtitle)
      this.$set(this.courseHero, 'image', this.course.image)
    },
    createCourseHero({ closeModal }) {
      const heroData = { ...this.courseHero }
      heroData.product = { ...this.course }
      this.$store.dispatch('courseHero/createHero', heroData).then(() => {
        closeModal()
        this.$toasted.success('Course Hero was created!', { duration: 3000 })
      })
    }
  }
}
</script>

<style lang="scss">
.manage-page {
  .label-info {
    font-size: 13px;
    color: gray;
    font-style: italic;
  }
  .course-manage {
    padding-top: 40px;
    .menu {
      padding-top: 30px;
      &-label {
        font-size: 20px;
        color: black;
      }
      &-list {
        > li {
          font-size: 18px;
          margin-top: 10px;
          > a {
            &.is-active {
              border-left: 3px solid #58529f;
              background-color: transparent;
              color: inherit;
            }
          }
        }
      }
    }
    .card {
      &-section {
        padding: 40px;
      }
      &-header {
        &-title {
          padding: 0;
          color: #8f99a3;
          font-weight: 400;
          font-size: 25px;
        }
      }
    }
  }
}
</style>
