<template>
  <div>
    <!-- Hero Sectio -->
    <hero />
    <!-- Hero Sectio -->
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Courses</h1>
        <div v-for="course in cources" :key="course._id" class="columns">
          <div class="column is-one-quarter">
            <!-- CARD-ITEM -->
            <course-card :course="course" />
            <!-- CARD-ITEM-END -->
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h1 class="title">Featured Articles</h1>
        <div class="columns">
          <div class="column is-one-quarter">
            <!-- CARD-ITEM -->
            <blog-card />
            <!-- CARD-ITEM-END -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hero from '@/components/shared/Hero.vue'
import CourseCard from '@/components/CourseCard.vue'
import BlogCard from '@/components/BlogCard.vue'

export default {
  components: {
    Hero,
    BlogCard,
    CourseCard
  },
  async fetch({ store }) {
    await store.dispatch('course/fetchCourses')
  },
  computed: {
    ...mapGetters({
      cources: 'getCourses'
    })
  }
}
</script>

<style scoped lang="scss">
// card item
.card-image:hover {
  cursor: pointer;
  opacity: 0.9;
}
.price-box {
  text-align: right;
  .price {
    color: gray;
    font-size: 16px;
    text-decoration: line-through;
  }
  .disc-price {
    font-size: 21px;
    font-weight: bold;
  }
}
// card item end

// hero
.hero-body {
  position: relative;
}
.hero-img {
  opacity: 0.8;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.user-avatar {
  display: inline-block;
}
.is-black {
  background-color: black;
}
.title {
  font-weight: bold;
  font-size: 45px;
}
.subtitle {
  /*font-weight: bold;*/
  font-size: 25px;
}
.author-name {
  font-size: 20px;
  font-weight: bold;
}
// hero

// Home page
.links {
  padding-top: 15px;
}
</style>
