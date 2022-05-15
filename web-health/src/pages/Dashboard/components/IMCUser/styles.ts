import styled, { css } from 'styled-components'
import { IProgressIcm } from './interfaces'

export const LabelImc = styled.div``

export const FieldImc = styled.div`
  font-size: 2rem;
`

export const ProgressImc = styled.div<IProgressIcm>`
  height: 1rem;
  background-color: ${props =>
    props.bgColorProcess ? props.bgColorProcess : '#b8cedb'};
  ${props =>
    props.isProgressRight &&
    css`
      border-radius: 0 10px 10px 0;
    `}

  ${props =>
    props.isProgressLeft &&
    css`
      border-radius: 10px 0 0 10px;
    `}
`

export const StatusImc = styled.span``
