import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'

import { IPreviewImage } from 'interfaces/components/PreviewImage'

import avatarDefault from '../../asserts/avatar.png'

const PreviewImage = (props: IPreviewImage) => {
  const { file, ...otherProps } = props

  const [preview, setPreview] = useState<string | undefined>(avatarDefault)

  useEffect(() => {
    if (file) {
      if (typeof file === 'object') {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setPreview(reader.result as string)
        }
      } else {
        setPreview(file)
      }
    }
  }, [file])

  return <Image height={115} width={115} src={preview} {...otherProps} />
}

export default PreviewImage
