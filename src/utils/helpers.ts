// helper function

import path from 'path'

export function formatTimestamp(createdAt: string) {
  const now = new Date()
  const createdDate = new Date(createdAt)
  const diff = now.getTime() - createdDate.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) return `${minutes} minutes ago`
  if (hours < 24) return `${hours} hours ago`
  if (days < 1) return `1 days ago`

  return createdDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export function dangerHTML(html: string): string {
  const Div = document.createElement('div')
  Div.innerHTML = html
  return Div.textContent || Div.innerText || ''
}

export function getSearchCondition(searchWrd: string): number {
  const isCasNo = /^\d{1,7}-\d{1,2}-\d{1}$/.test(searchWrd) // CAS No 형식 확인
  return isCasNo ? 1 : 0 // 1: CAS No, 0: 국문명
}

export const getPhraseMapping = (): {
  phraseid: string
  phrasetext: string
}[] => {
  const phraseFilePath = path.resolve(
    __dirname,
    'C:/Users/phw72/Desktop/project/allchem/src/data/iuclid6_phrase_code.json',
  )
  const phraseMapping = require(phraseFilePath) // JSON 파일 로드
  return phraseMapping
}

export const getPhraseText = (
  code: string | undefined,
  phraseMapping: { phraseid: string; phrasetext: string }[],
): string => {
  if (!code) return 'Unknown'
  const match = phraseMapping.find(phrase => phrase.phraseid === code)
  return match ? match.phrasetext : `Unknown (${code})`
}
