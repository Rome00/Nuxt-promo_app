<template>
  <div class="editor editor-squished">
    <basic-menu :editor="editor" />
    <bubble-menu :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Heading,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History,
  Blockquote,
  HorizontalRule
} from 'tiptap-extensions'
import BasicMenu from '@/components/editor/BasicMenu'
import BubbleMenu from '~/components/editor/BubbleMenu'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    BasicMenu
  },
  data() {
    return {
      editor: null
    }
  },
  // This is called only on client (in browser)
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ]
    })
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  }
}
</script>
