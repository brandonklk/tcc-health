import i18n, { InterpolationOptions } from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    debug: true,
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
      format: (
        value?: any,
        format?: string,
        lng?: string,
        options?: InterpolationOptions & { [key: string]: any }
      ) => {
        console.log('value ', [value, format, lng, options])

        if (format === 'uppercase') return value.toUpperCase()
        if (format === 'lowercase') return value.toLowerCase()
        if (format === 'capitalize')
          return `${value.substr(0, 1).toUpperCase()}${value.substr(1)}`

        return value
      },
    },
    react: {},
  })

export default i18n
