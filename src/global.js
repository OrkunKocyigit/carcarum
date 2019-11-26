import getString from './translate'

export default function * stageNameGenerator (startIndex, endIndex, language) {
  if (startIndex !== undefined && startIndex >= 0 && endIndex !== undefined && endIndex >= startIndex && language !== undefined) {
    for (let i = startIndex; i <= endIndex; i++) {
      yield getString('stages', language, i)
    }
  }
}
