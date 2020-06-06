<template>
  <div class="editor editor-squished card">
    <course-menu :editor="editor" />
    <editor-content class="editor__content card-content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Bold,
  Italic,
  History,
  OrderedList,
  BulletList,
  ListItem
} from 'tiptap-extensions'
import courseMenu from '@/components/editor/courseMenu'

export default {
  components: {
    EditorContent,
    courseMenu
  },

  props: {
    initContent: {
      type: String,
      required: true
    }
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
        new Bold(),
        new Italic(),
        new History(),
        new OrderedList(),
        new BulletList(),
        new ListItem()
      ],
      onUpdate: () => {
        this.emitUpdate()
      }
    })
    this.initContent && this.editor.setContent(this.initContent)
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  },
  methods: {
    emitUpdate() {
      const content = this.editor.getHTML()
      this.$emit('editorContent', content)
    }
  }
}
</script>

<style scoped lang="scss">
.editor {
  position: relative;
  * {
    :focus {
      outline: none;
    }
  }
  &.editor-squished {
    max-width: initial;
    margin: 0 auto 5rem auto;
  }
}
</style>
