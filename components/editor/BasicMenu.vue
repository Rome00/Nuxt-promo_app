<template>
  <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click="commands.bullet_list"
      >
        <icon name="list-ul" size="medium" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click="commands.ordered_list"
      >
        <icon name="list-ol" size="medium" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.blockquote() }"
        @click="commands.blockquote"
      >
        <icon name="quote-right" size="medium" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.code_block() }"
        @click="commands.code_block"
      >
        <icon name="file-code" size="medium" />
      </button>
      <button class="menubar__button" @click="commands.horizontal_rule">
        <icon name="ruler-horizontal" size="medium" />
      </button>
      <button class="menubar__button" @click="commands.undo">
        <icon name="undo-alt" size="medium" />
      </button>
      <button class="menubar__button" @click="commands.redo">
        <icon name="redo" size="medium" />
      </button>
      <slot name="saveButton"></slot>
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
