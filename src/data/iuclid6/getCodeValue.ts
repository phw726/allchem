import Iuclid6PhraseCode from './iuclid6_phrase_code.json' assert { type: 'json' }

type PhraseCodeMap = {
  [key: string]: string
}
type PhraseEntry = {
  phraseid: string
  phrasetext: string
}

const mapJsonToObject = (jsonArray: PhraseEntry[]): PhraseCodeMap => {
  return jsonArray.reduce((acc, entry) => {
    acc[entry.phraseid] = entry.phrasetext
    return acc
  }, {} as PhraseCodeMap)
}

const Iuclid6PhraseCodeMap: PhraseCodeMap = mapJsonToObject(Iuclid6PhraseCode)

export const getCodeValue = (code: string): string => {
  return Iuclid6PhraseCodeMap[code] || code
}
