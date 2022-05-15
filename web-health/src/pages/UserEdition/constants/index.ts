import { IOptionsSelect } from 'components/Select/interfaces'
import { object, string, ref, number } from 'yup'

export const optionsSelect: IOptionsSelect[] = [
  {
    keyOption: 1,
    valueOption: 'pt',
    labelOption: 'pt',
  },
  {
    keyOption: 2,
    valueOption: 'en',
    labelOption: 'en',
  },
]

export const validationSchemaUser = object({
  email: string().email('invalid_email').trim().required('required'),
  password: string()
    .trim()
    .required('required')
    .max(15, 'phone_digit_incorrect_2')
    .min(8, 'phone_digit_incorrect_3'),
  name: string().trim().required('required'),
  confirmPassword: string()
    .trim()
    .required('required')
    .oneOf([ref('password'), null], 'password_not_equals'),
  phone: number().nullable().min(11, 'phone_digit_incorrect'),
  language: string(),
})

export const validationSchemaUserEdit = object({
  email: string().email('invalid_email').trim().required('required'),
  password: string(),
  name: string().trim().required('required'),
  confirmPassword: string()
    .trim()
    .oneOf([ref('password'), null], 'password_not_equals'),
  phone: number().nullable().min(11, 'phone_digit_incorrect'),
  language: string(),
})
