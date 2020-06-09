<template>
  <div class="card card-tooltip">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <!-- TODO: Course Title -->
          <p class="title is-4">{{ title }}</p>
          <!-- TODO: Course Subtitle -->
          <p class="subtitle is-6">
            <i>{{ subtitle }}</i>
          </p>
        </div>
      </div>

      <!-- TODO: Course Description -->
      <div class="content">
        {{ description }}
      </div>
      <div class="content">
        <ul class="wsl-list">
          <!-- TODO: Iterate wsl -->
          <li v-for="item in wsl" :key="item.value" class="wsl-item">
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    wsl: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.card-tooltip {
  max-width: 350px;
  .title {
    font-size: 18px;
  }
  .wsl-list {
    margin-left: 13px;
    .wsl-item {
      font-size: 13px;
    }
  }
}
</style>
