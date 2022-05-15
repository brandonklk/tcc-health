import { ReactNode } from 'react'

interface IGraphic<T> {
  valuesGraphic: T[]
  children: ReactNode
  dataKeyX?: string
  dataKeyY?: string
}

export interface IGraphicBar<T> extends IGraphic<T> {}
