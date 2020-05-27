<template>
  <div class="full-page-takeover-header">
    <div class="full-page-takeover-header-logo">
      <nuxt-link to="/" class="full-page-takeover-header-logo-title">
        Promo Yourself
      </nuxt-link>
    </div>
    <div class="full-page-takeover-header-divider"></div>
    <div class="full-page-takeover-header-text"></div>
    <div class="user-box">
      <figure class="image is-48x48 is-mr-0-half">
        <img class="is-rounded" :src="user.avatar" />
      </figure>
      <div class="is-mr-0-half is-mb-0-half">Welcome {{ user.username }}!</div>
    </div>
    <slot name="actionMenu"></slot>
    <div v-if="exitLink" class="full-page-takeover-header-button">
      <nuxt-link
        :to="exitLink"
        class="button is-danger is-medium is-inverted is-outlined"
      >
        Exit
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    exitLink: {
      required: false,
      type: String,
      default: null
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/authUser'] || {}
    }
  }
}
</script>
<style scoped>
.user-box {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-right: 10px;
  font-size: 17px;
  font-weight: bold;
}
.full-page-takeover-header-logo-title {
  font-weight: bold;
  color: #cac8c8;
}
</style>
