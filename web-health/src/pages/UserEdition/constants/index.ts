import { IOptionsSelect } from 'components/Select/interfaces'
import { extensionFilesAccepted, fourMB } from 'constants/constantsApp'
import { object, string, ref, number, mixed } from 'yup'

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

export const validationSchemaUserEdit = object({
  email: string().email('invalid_email').trim().required('required'),
  password: string(),
  name: string().trim().required('required'),
  avatar: mixed().test('test-size-files-user', 'size_file_incorrect', (imageUser: FileList) => {
    const [image] = imageUser
    let fileSizeAccepted = true

    if (image && Object.keys(image).length > 0) {
      fileSizeAccepted = image && image.size <= fourMB
    }

    return fileSizeAccepted
  }).test('test-extension-file-user', 'extension_file_incorrect', (imageUser: FileList) => {
    const [image] = imageUser
    let fileExtensionAccepted = true

    if (image && Object.keys(image).length > 0) {
      fileExtensionAccepted = image && Boolean(image.type) && extensionFilesAccepted.includes(image.type)
    }

    return fileExtensionAccepted
  }),
  confirmPassword: string()
    .trim()
    .oneOf([ref('password'), null], 'password_not_equals'),
  phone: number().nullable().min(11, 'phone_digit_incorrect'),
  language: string(),
})
