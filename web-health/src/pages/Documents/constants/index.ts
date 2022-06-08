import { IOptionsSelect } from 'components/Select/interfaces'
import { ETypeProcedures } from 'interfaces/pages/Documents'

export const typeProcedures: IOptionsSelect[] = [
  {
    keyOption: 1,
    labelOption: 'Vacinas',
    valueOption: ETypeProcedures.VACCINES,
  },
  {
    keyOption: 2,
    labelOption: 'Exames',
    valueOption: ETypeProcedures.EXAMS,
  },
  {
    keyOption: 3,
    labelOption: 'Receitas',
    valueOption: ETypeProcedures.PRESCRIPTION,
  },
  {
    keyOption: 4,
    labelOption: 'Cirurgias',
    valueOption: ETypeProcedures.SURGERY,
  },
  {
    keyOption: 5,
    labelOption: 'Remedios continuos',
    valueOption: ETypeProcedures.CONTINUOUS_REMEDY,
  },
  {
    keyOption: 6,
    labelOption: 'Fisioterapia',
    valueOption: ETypeProcedures.PHYSIOTHERAPY,
  },
  {
    keyOption: 7,
    labelOption: 'Psicologia',
    valueOption: ETypeProcedures.PSYCHOLOGY,
  }
]
