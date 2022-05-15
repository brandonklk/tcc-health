import React, { memo } from 'react'

import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { ISelect } from './interfaces'

import { OptionSelect } from './styles'

const Select = (props: ISelect) => {
  const { t } = useTranslation()

  const {
    onChangeSelect,
    valueSelected,
    options,
    optionDefault = false,
    nameInput,
    labelInput,
  } = props

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t(labelInput)}</Form.Label>
      <Form.Select
        name={nameInput}
        value={valueSelected}
        onChange={onChangeSelect}
      >
        {optionDefault && (
          <OptionSelect value={undefined}>{t('select_is_empty')}</OptionSelect>
        )}
        {options &&
          options.length &&
          options.map(({ labelOption, valueOption, keyOption }) => (
            <OptionSelect key={keyOption} value={valueOption}>
              {t(`${labelOption}`)}
            </OptionSelect>
          ))}
      </Form.Select>
    </Form.Group>
  )
}

export default memo(Select)
