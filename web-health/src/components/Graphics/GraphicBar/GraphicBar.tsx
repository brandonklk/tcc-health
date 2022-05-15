import React from 'react'

import { BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { IGraphicBar } from '../interfaces'

const GraphicBar = <T,>(props: IGraphicBar<T>) => {
  const { valuesGraphic, children, dataKeyX, dataKeyY } = props
  return (
    <ResponsiveContainer width="100%" height={210}>
      <BarChart width={716} data={valuesGraphic}>
        <XAxis dataKey={dataKeyX} />
        <YAxis dataKey={dataKeyY} />
        <Tooltip />
        {children}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default GraphicBar
