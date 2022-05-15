import { IOptionsSelect } from 'components/Select/interfaces'
import { ETypeProcedures } from 'interfaces/pages/Documents'

export const typeProcedures: IOptionsSelect[] = [
  {
    keyOption: 0,
    labelOption: 'Vacinas',
    valueOption: ETypeProcedures.VACCINES,
  },
  {
    keyOption: 1,
    labelOption: 'Exames',
    valueOption: ETypeProcedures.EXAMS,
  },
  {
    keyOption: 2,
    labelOption: 'Receitas',
    valueOption: ETypeProcedures.PRESCRIPTION,
  },
  {
    keyOption: 3,
    labelOption: 'Cirurgias',
    valueOption: ETypeProcedures.SURGERY,
  },
  {
    keyOption: 4,
    labelOption: 'Remedios continuos',
    valueOption: ETypeProcedures.CONTINUOUS_REMEDY,
  },
]
