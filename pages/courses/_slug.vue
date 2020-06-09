<template>
  <div>
    <product-hero
      :title="course.title"
      :subtitle="course.subtitle"
      :author="course.author"
    >
      <product-hero-card
        :requirements="course.wsl"
        :price="course.price"
        :navigate-to="course.link"
        :discounted-price="course.discountedPrice"
        :image="course.image"
      />
    </product-hero>
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <div class="section">
            <div class="what-you-get">
              <div class="what-you-get-title">
                What you will learn
              </div>
              <ul class="what-you-get-items">
                <li
                  v-for="item in course.wsl"
                  :key="item.value"
                  class="what-you-get-item"
                >
                  <span>{{ item.value }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="section course-description p-t-none">
            <div class="course-description-title">Course Info</div>
            <div class="course-description-details">
              <div v-html="course.description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductHero from '@/components/ProductHero'
import ProductHeroCard from '@/components/ProductHeroCard'

export default {
  components: {
    ProductHero,
    ProductHeroCard
  },
  async fetch({ store, params }) {
    await store.dispatch('course/fetchCourseBySlug', params.slug)
  },
  computed: {
    course() {
      return this.$store.state.course.item
    }
  },
  head() {
    return {
      tite: this.course.title,
      meta: [
        {
          hid: 'description',
          name: 'descritpion',
          content: this.course.subtitle
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.what-you-get {
  background-color: #f9f9f9;
  border: 1px solid #dedfe0;
  padding: 10px 15px;
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-items {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 17px;
    width: 45%;
  }
}
.course-description {
  &-title {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-details {
    font-size: 18px;
    ul {
      list-style: disc;
      margin-left: 20px;
    }
    ol {
      padding: 0 1.5rem;
    }
    strong {
      font-size: 20px;
    }
    p {
      min-height: 30px;
    }
  }
}
</style>
