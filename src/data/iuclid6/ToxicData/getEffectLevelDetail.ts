// import { getCodeValue } from '../getCodeValue'

// type IEffectLevel = {
//   lowerValue?: string
//   Value?: string
//   upperValue?: string
//   unit?: {
//     code?: string
//   }
// }

// export const getEffectLevelDetails = (effectLevels: any[]): string => {
//   if (!Array.isArray(effectLevels)) return ''

//   return effectLevels
//     .map(({ EffectLevel }: { EffectLevel: IEffectLevel }) => {
//       if (!EffectLevel) return null
//       const { lowerValue, upperValue, Value, unit } = EffectLevel
//       const unitLabel = unit?.code ? getCodeValue(unit.code) : ''

//       return [
//         Value !== undefined ? `${Value}` : null,
//         lowerValue !== undefined ? `${lowerValue}` : null,
//         upperValue !== undefined ? `${upperValue}` : null,
//         lowerValue !== undefined && upperValue !== undefined
//           ? ` - ${upperValue}`
//           : null,
//         unitLabel || null,
//       ]
//         .filter(Boolean)
//         .join(' ')
//     })
//     .filter(Boolean)
//     .join(', ')
// }
import { getCodeValue } from '../getCodeValue'

type IEffectLevel = {
  lowerValue?: string
  Value?: string
  upperValue?: string
  unit?: { code?: string }
}

type IExposureDuration = {
  value?: string
  lowerValue?: string
  upperValue?: string
  unit?: { code?: string }
}

export const getEffectLevelDetails = (
  effectLevels: any[],
  exposureLevels?: any[],
): string => {
  if (!Array.isArray(effectLevels)) return ''

  const exposureDurationDetails = Array.isArray(effectLevels)
    ? effectLevels
        .map(
          ({ ExposureDuration }: { ExposureDuration: IExposureDuration }) => {
            if (!ExposureDuration) return '' // 값이 없으면 빈 문자열 반환
            const { unit, value } = ExposureDuration || {}
            const unitLabel = unit?.code ? getCodeValue(unit.code) : ''

            return [value !== undefined ? `${value}` : '', unitLabel || '']
              .filter(Boolean)
              .join(' ')
          },
        )
        .filter(Boolean) // 빈 값 제거
        .join(', ')
    : '' // `effectLevels`가 배열이 아닐 경우 빈 문자열 반

  return effectLevels
    .map(({ EffectLevel }: { EffectLevel: IEffectLevel }) => {
      if (!EffectLevel) return null
      const { lowerValue, upperValue, Value, unit } = EffectLevel
      const unitLabel = unit?.code ? getCodeValue(unit.code) : ''

      const formattedExposureDuration = exposureDurationDetails
        ? `(${exposureDurationDetails})`
        : ''

      return [
        Value !== undefined ? `${Value}` : null,
        lowerValue !== undefined ? `${lowerValue}` : null,
        upperValue !== undefined ? `${upperValue}` : null,
        lowerValue !== undefined && upperValue !== undefined
          ? ` - ${upperValue}`
          : null,
        unitLabel || null,
        formattedExposureDuration || null, // ✅ 추가
      ]
        .filter(Boolean)
        .join(' ')
    })
    .filter(Boolean)
    .join(', ')
}
