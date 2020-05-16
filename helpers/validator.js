import { helpers } from 'vuelidate/lib/validators'

export const supportedFileType = value => {
  if (!helpers.req(value)) return true
  const allowedType = ['jpg', 'png', 'jpeg']
  const extension = value.split('.').pop()
  return allowedType.includes(extension)
}
