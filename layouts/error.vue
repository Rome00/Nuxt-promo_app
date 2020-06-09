<template>
  <div class="container">
    <ErrorView
      title="page you are trying to access doesn't exist :("
      status="404"
      :navigate-to-page="{ name: 'index' }"
      :navigate-to-text="'Navigate back to Home Page'"
    />
  </div>
</template>

<script>
import ErrorView from '@/components/shared/Error'

export default {
  components: {
    ErrorView
  },
  head: {
    title: 'Error 404 page not found | Romeo Khazalia'
  }
}
</script>

<style scoped></style>
