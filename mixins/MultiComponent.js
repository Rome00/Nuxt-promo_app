export default {
  data() {
    return {
      activeStep: 0,
      steps: []
    }
  },
  computed: {
    stepLength() {
      return this.steps.length
    },
    firstStep() {
      return this.activeStep === 0
    },
    lastStep() {
      return this.stepLength === this.activeStep + 1
    },
    progressBar() {
      return `${(100 / this.stepLength) * this.activeStep}%`
    },
    active() {
      return this.steps[this.activeStep]
    }
  },
  methods: {
    nextStep() {
      this.activeStep++
    },
    prevStep() {
      this.activeStep--
    },
    navSteps(data) {
      this.activeStep = data
    },
    activeClassComponent(step) {
      return this.activeStep === step ? 'is-active' : ''
    }
  }
}
