import { isNil, isEmpty } from "ramda"

export const fileExtensionIsValid = (fileObject, acceptedExtensions) => {
  if (
    isNil(fileObject) ||
    isNil(acceptedExtensions) ||
    isEmpty(acceptedExtensions) ||
    !fileObject.name.includes(".")
  ) {
    return false
  }

  const extension = fileObject.name
    .split(".")
    .pop()
    .toLowerCase()

  return acceptedExtensions.indexOf(extension) > -1
}
