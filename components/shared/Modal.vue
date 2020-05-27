<template>
  <div>
    <div v-if="showButton" @click="openModal">
      <slot name="submitBtn">
        <button :class="openBtnClass">{{ openTitle }}</button>
      </slot>
    </div>
    <div class="modal" :class="{ 'is-active': isOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ title }}</p>
          <button
            class="delete"
            aria-label="close"
            @click="isOpen = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <slot></slot>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            :disabled="isDisabled"
            class="button is-success"
            @click="emitAction"
          >
            {{ actionTitle }}
          </button>
          <button class="button" @click="isOpen = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    openTitle: {
      type: String,
      default: 'Open'
    },
    title: {
      type: String,
      default: 'Hey There'
    },
    actionTitle: {
      type: String,
      default: 'Commit'
    },
    openBtnClass: {
      type: String,
      default: 'button'
    },
    showButton: {
      type: Boolean,
      default: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    emitAction() {
      this.$emit('submitted', { closeModal: this.closeCallback })
    },
    closeCallback() {
      this.isOpen = false
    },
    openModal() {
      this.isOpen = true
      this.$emit('opened')
    }
  }
}
</script>
<style scoped lang="scss">
.modal-card-body {
  color: black;
}
.modal {
  z-index: 9999;
}
</style>
