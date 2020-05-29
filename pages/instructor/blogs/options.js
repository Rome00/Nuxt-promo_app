/* ----------------- Commands ----------------- */
export const commands = {
  DELETE_BLOG: 'DELETE_BLOG',
  EDIT_BLOG: 'EDIT_BLOG'
}

const createOptions = (name, command) => ({ name, command })

/**
 * Options
 Published Blogs
 */
const DELETE_BLOG = createOptions('Delete Blog', commands.DELETE_BLOG)
const EDIT_BLOG = createOptions('Edit Blog', commands.EDIT_BLOG)

/**
 * Options
 Published Blogs
 */
const DELETE_DRAFT = createOptions('Delete Draft', commands.DELETE_BLOG)
const EDIT_DRAFT = createOptions('Edit Dradt', commands.EDIT_BLOG)

export const createPublishedOptions = () => [EDIT_BLOG, DELETE_BLOG]
export const createDraftsOptions = () => [EDIT_DRAFT, DELETE_DRAFT]
