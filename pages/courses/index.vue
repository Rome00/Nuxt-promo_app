<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div
          v-for="course in courses"
          :key="course._id"
          class="column is-one-quarter"
        >
          <!-- CARD-ITEM -->
          <course-card :course="course" />
          <!-- CARD-ITEM-END -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CourseCard from '@/components/CourseCard'

export default {
  components: {
    CourseCard
  },
  async fetch({ store }) {
    await store.dispatch('course/fetchCourses')
  },
  computed: {
    ...mapState({
      courses: state => state.course.courses.items
    })
  }
}
</script>

<style lang="scss" scoped></style>
