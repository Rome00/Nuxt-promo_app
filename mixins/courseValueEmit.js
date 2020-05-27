export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitCourseValue(event, field) {
      const value = event.target.value

      if (field === 'category') {
        return this.emitCategory(value)
      }
      this.$emit('courseValueUpdated', { value, field })
    }
  }
}
