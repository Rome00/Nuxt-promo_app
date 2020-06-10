<template>
  <div class="main-content">
    <section>
      <div class="container">
        <h1 class="title">All Courses</h1>
        <div class="columns is-multiline">
          <div
            v-for="course in courses"
            :key="course._id"
            class="column is-one-quarter"
          >
            <!-- CARD-ITEM -->
            <v-popover offset="16" trigger="hover" placement="right-start">
              <course-card :course="course" />
              <tool-tip
                slot="popover"
                :title="course.title"
                :subtitle="course.category.name"
                :description="course.subtitle"
                :wsl="course.wsl"
              />
            </v-popover>
            <!-- CARD-ITEM-END -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CourseCard from '@/components/CourseCard'
import ToolTip from '@/components/ToolTip.vue'

export default {
  components: {
    CourseCard,
    ToolTip
  },
  async fetch({ store }) {
    await store.dispatch('course/fetchCourses')
  },
  computed: {
    ...mapState({
      courses: state => state.course.courses.items
    })
  },
  head: {
    title: 'Read Amazing blogs | Romeo Khazalia'
  }
}
</script>

<style lang="scss" scoped>
/* main content */
.main-content {
  padding: 4rem 0 2rem 0;
  min-height: 800px;
}
.main-content .container {
  padding: 0 2rem 2rem 2rem;
}
</style>
