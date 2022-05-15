import { IOptionsSelect } from 'components/Select/interfaces'
import { Role } from 'roles/roles'

export const rolesNewUser: IOptionsSelect[] = [
  {
    keyOption: 1,
    labelOption: 'ADM',
    valueOption: Role.Admin,
  },
  {
    keyOption: 2,
    labelOption: 'Paciente',
    valueOption: Role.User,
  },
]
