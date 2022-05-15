import React from 'react'
import { Tooltip as RBTooltip } from 'react-bootstrap'

import { IPropsTooltip } from 'interfaces/components/Tooltip'

const Tooltip = (props: IPropsTooltip) => {
  const { children, ...rest } = props

  return <RBTooltip {...rest}>{children}</RBTooltip>
}

export default Tooltip
