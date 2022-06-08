import { IOptionsSelect } from 'components/Select/interfaces'
import { Role } from 'roles/roles'
import { object, string, ref, number } from 'yup'

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

export const validationSchemaUser = object({
  email: string().email('invalid_email').trim().required('required'),
  password: string()
    .trim()
    .required('required')
    .max(15, 'password_digit_max_incorrect')
    .min(8, 'password_digit_min_incorrect'),
  name: string().trim().required('required'),
  confirmPassword: string()
    .trim()
    .required('required')
    .oneOf([ref('password'), null], 'password_not_equals'),
  phone: number().nullable().min(11, 'phone_digit_incorrect'),
  language: string(),
})