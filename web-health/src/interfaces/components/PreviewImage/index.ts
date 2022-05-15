import { ImageProps } from 'react-bootstrap'

export interface IPreviewImage extends ImageProps {
  file: string | Blob
}
