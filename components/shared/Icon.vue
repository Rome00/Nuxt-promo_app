<template>
  <i class="icon fas" :class="[`fa-${name}`, `icon-size-${size}`]"></i>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'null'
    },
    size: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  &-size {
    &-small {
      font-size: 15px;
    }
    &-normal {
      font-size: 18px;
    }
    &-large {
      font-size: 21px;
    }
  }
}
</style>
