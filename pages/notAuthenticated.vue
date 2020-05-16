<template>
  <div class="container">
    <ErrorView
      :title="'Ooooops, you are not authenticated to visit this page, please login'"
      :status="'401'"
      :navigate-to-page="{ name: 'login' }"
      :navigate-to-text="'Navigate to Login Page'"
    />
  </div>
</template>

<script>
import ErrorView from '@/components/shared/Error'

export default {
  components: {
    ErrorView
  }
}
</script>

<style scoped></style>
