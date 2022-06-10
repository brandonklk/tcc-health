import { IOptionsSelect } from 'components/Select/interfaces'
import { extensionFilesAccepted, fourMB } from 'constants/constantsApp'
import { Role } from 'roles/roles'
import { object, string, ref, number, mixed } from 'yup'

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
  avatar: mixed().test('test-size-files-user', 'size_file_incorrect', (imageUser: File) => {
    const image = imageUser
    let fileSizeAccepted = true

    if (image && Object.keys(image).length > 0) {
      fileSizeAccepted = image && image.size <= fourMB
    }

    return fileSizeAccepted
  }).test('test-extension-file-user', 'extension_file_incorrect', (imageUser: File) => {
    const image = imageUser
    let fileExtensionAccepted = true

    if (image && Object.keys(image).length > 0) {
      fileExtensionAccepted = image && Boolean(image.type) && extensionFilesAccepted.includes(image.type)
    }

    return fileExtensionAccepted
  }),
  confirmPassword: string()
    .trim()
    .required('required')
    .oneOf([ref('password'), null], 'password_not_equals'),
  phone: number().nullable().min(11, 'phone_digit_incorrect'),
  language: string(),
})