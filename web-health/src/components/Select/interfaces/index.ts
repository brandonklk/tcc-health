import { ChangeEventHandler, Key } from 'react'

export interface IOptionsSelect {
  keyOption: Key
  valueOption: string | number | readonly string[] | undefined
  labelOption: string
}

export interface ISelect {
  onChangeSelect: ChangeEventHandler<HTMLSelectElement> | undefined
  valueSelected: string | number | readonly string[] | undefined
  optionDefault?: boolean
  options: IOptionsSelect[]
  nameInput: string
  labelInput: string
}
