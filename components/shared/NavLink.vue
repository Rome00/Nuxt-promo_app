<template>
  <nuxt-link :to="route" :class="{ 'is-active is-primary': isActive }">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  computed: {
    isActive() {
      return this.route.name === this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.is-active {
  border-bottom: 3px solid #00d1b2;
  outline: none;
  font-weight: bold;
  :focus {
    outline: none;
  }
}
</style>
