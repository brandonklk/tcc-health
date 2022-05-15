import React from 'react'

import NumberFormat, { NumberFormatProps } from 'react-number-format'

const MaskField = (props: NumberFormatProps) => {
  return <NumberFormat {...props} />
}

export default MaskField
