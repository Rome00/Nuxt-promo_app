<template>
  <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bold() }"
        @click.prevent="commands.bold()"
      >
        <icon name="bold" size="small" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.italic() }"
        @click.prevent="commands.italic()"
      >
        <icon name="italic" size="small" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click.prevent="commands.bullet_list"
      >
        <icon name="list-ul" size="small" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click.prevent="commands.ordered_list"
      >
        <icon name="list-ol" size="small" />
      </button>
    </div>
  </editor-menu-bar>
</template>
<script>
import { EditorMenuBar } from 'tiptap'
import Icon from '~/components/shared/Icon'
export default {
  components: { EditorMenuBar, Icon },
  props: {
    editor: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.menubar {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
