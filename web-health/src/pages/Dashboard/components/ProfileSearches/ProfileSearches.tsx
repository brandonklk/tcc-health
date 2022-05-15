import React from 'react'
import { Bar } from 'recharts'

import GraphicBar from 'components/Graphics/GraphicBar'
import { colors } from 'constants/colors'

const ProfileSearches = () => {
  const data = [
    {
      monthVisit: 'Jan./22',
      visits: 4000,
    },
    {
      monthVisit: 'Fev./22',
      visits: 3000,
    },
    {
      monthVisit: 'Mar./22',
      visits: 2000,
    },
    {
      monthVisit: 'Abr./22',
      visits: 2780,
    },
    {
      monthVisit: 'Mai./22',
      visits: 1890,
    },
    {
      monthVisit: 'Jun./22',
      visits: 2390,
    },
  ]

  return (
    <GraphicBar valuesGraphic={data} dataKeyX="monthVisit">
      <Bar dataKey="visits" fill={colors.blue.darkBlue} />
    </GraphicBar>
  )
}

export default ProfileSearches
