<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Target your Students</p>
    </header>
    <div class="card-content card-section">
      <form>
        <multi-input
          label="What will students learn"
          :lines="course.wsl"
          @addOnClicked="addLine('wsl')"
          @removeOnClicked="removeLine($event, 'wsl')"
          @updateValue="updateLine($event, 'wsl')"
        />
        <multi-input
          label="what are the requirement"
          :lines="course.requirements"
          class="is-mt-2"
          @updateValue="updateLine($event, 'requirements')"
          @addOnClicked="addLine('requirements')"
          @removeOnClicked="removeLine($event, 'requirements')"
        />
      </form>
    </div>
  </div>
</template>

<script>
import MultiInput from '@/components/form/MultiLineInput'

export default {
  components: {
    MultiInput
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    addLine(field) {
      this.$store.commit('instructor/courses/ADD_LINE', field)
    },
    removeLine(index, field) {
      this.$store.commit('instructor/courses/REMOVE_LINE', { field, index })
    },
    updateLine({ value, index }, field) {
      this.$store.dispatch('instructor/courses/updateLine', {
        field,
        value,
        index
      })
    }
  }
}
</script>
