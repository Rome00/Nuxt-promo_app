export const supportedFileType = (value) => {
  const allowedType = ['jpg', 'png', 'jpeg']
  const extension = value.split('.').pop()
  return allowedType.includes(extension)
}
