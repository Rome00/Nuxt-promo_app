<template>
  <div class="container">
    <ErrorView
      :title="'Ooooops, you are not authorized to visit this page, please talk to administrator in order to get access rights'"
      :status="'401'"
      :navigate-to-page="{ name: 'index' }"
      :navigate-to-text="'Navigate to Home Page'"
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
