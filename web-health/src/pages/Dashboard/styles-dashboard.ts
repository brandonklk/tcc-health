import styled from 'styled-components'

import { Container, Card } from 'react-bootstrap'

import { colors } from 'constants/colors'

interface IColor {
  bgColor: string
}

export const ContainerDashboard = styled(Container)`
  background-color: #ffffff;
`
export const NameUser = styled.h2`
  font-weight: bolder;
  color: #616162;
`
export const CardFastAccess = styled(Card)<IColor>`
  border-radius: 1.25rem;
  background-color: ${props => (props.bgColor ? props.bgColor : colors.white)};
`
export const ContainerTitleFastAccess = styled.div`
  display: flex;
  justify-content: center;
`

export const TitleCardFastAccess = styled.h6`
  color: ${colors.white};
`

export const ContainerIcon = styled.div`
  display: flex;
  justify-content: center;
`

export const ContainerDashboards = styled.div``

export const ContainerTitleCardDashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TitleCardDashbord = styled.h5``
