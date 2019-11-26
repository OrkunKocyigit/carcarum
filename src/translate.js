const Strings = require('./assets/strings')

export default function getString (key, language, index) {
  let message = 'Unknown Message'
  if (Strings.hasOwnProperty(key)) {
    let value = Strings[key]
    if (Array.isArray(value)) {
      if (index === undefined || index < 0) {
        value = undefined
      } else {
        value = value[index]
      }
    }
    if (value && value.hasOwnProperty(language)) {
      message = value[language]
    }
  }
  return message
}
