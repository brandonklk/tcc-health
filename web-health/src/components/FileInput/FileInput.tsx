import React, { InputHTMLAttributes, Ref } from 'react'
import { InputFile } from './styles'

const FileInput = (
  props: InputHTMLAttributes<HTMLInputElement> & { ref: Ref<HTMLInputElement> }
) => {
  return <InputFile {...props} type="file" />
}

export default FileInput
