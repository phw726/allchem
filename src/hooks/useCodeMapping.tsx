import { TOXIC_PROPS_MAPPING } from '@/data/iuclid6/toxicPropsMapping'
import Iuclid6PhraseCode from '../data/iuclid6/iuclid6_phrase_code.json' assert { type: 'json' }
import { get } from 'lodash'

type PhraseEntry = {
  phraseid: string
  phrasetext: string
}

type IEffectLevel = {
  lowerValue?: string
  Value?: string
  upperValue?: string
  unit?: {
    code?: string
  }
}

type IExposureDuration = {
  value?: string
  unit?: {
    code?: string
  }
}

type PhraseCodeMap = {
  [key: string]: string
}

const mapJsonToObject = (jsonArray: PhraseEntry[]): PhraseCodeMap => {
  return jsonArray.reduce((acc, entry) => {
    acc[entry.phraseid] = entry.phrasetext
    return acc
  }, {} as PhraseCodeMap)
}

const Iuclid6PhraseCodeMap: PhraseCodeMap = mapJsonToObject(Iuclid6PhraseCode)

export const useCodeMapping = () => {
  const getCodeValue = (code: string): string => {
    return Iuclid6PhraseCodeMap[code] || code
  }

  return { getCodeValue }
}

export const parseBasicInfo = (basicInfoData: { data: any[] }[]) => {
  return basicInfoData.flatMap(({ data }) => {
    if (!Array.isArray(data)) return [] // 배열이 아니면 빈 배열 반환

    return data.flatMap(item => {
      const addDetail = (label: string, value: any) => {
        if (!value) return null

        const itemDetail: string[] = Array.isArray(value)
          ? value.filter(Boolean).map(String) // 문자열 배열로 변환
          : [String(value)]
        return { label, itemDetail }
      }

      const details = [
        addDetail('IUPAC Name', item.IupacName),
        addDetail('Inventory Entry', item.Inventory?.InventoryEntry),
        addDetail('CAS Number', item.Inventory?.CASNumber),
        addDetail(
          'Synonyms',
          item.Synonyms?.Synonyms?.map((syn: any) => syn.Name),
        ),
        addDetail(
          'Molecular Formula',
          item.MolecularStructuralInfo?.MolecularFormula,
        ),
        addDetail(
          'Molecular Weight Range',
          item.MolecularStructuralInfo?.MolecularWeightRange?.lowerValue,
        ),
        addDetail(
          'SMILES Notation',
          item.MolecularStructuralInfo?.SmilesNotation,
        ),
        addDetail('InChI', item.MolecularStructuralInfo?.InChl),
      ]

      return details.filter(Boolean) as {
        label: string
        itemDetail: string[]
      }[]
    })
  })
}

export const parsePhysicalCode = (
  data: any[],
  getCodeValue: (code: string) => string,
  endpointKey: string,
) => {
  return data.flatMap(item => {
    const results = item.ResultsAndDiscussion || {}
    return Object.entries(results).flatMap(([key, values]) => {
      if (!Array.isArray(values)) return []
      return values.map(value => {
        const { lowerValue, upperValue, Value, unit } = value[key] || {}
        const unitLabel = unit?.code ? getCodeValue(unit.code) : ''
        const detail = [
          Value !== undefined ? `${Value}` : null,
          upperValue !== undefined ? `${upperValue}` : null,
          lowerValue !== undefined ? `${lowerValue}` : null,
          lowerValue !== undefined && upperValue !== undefined
            ? ` - ${upperValue}`
            : null,
          unitLabel || null,
        ]
          .filter(Boolean) // null, undefined, 빈 문자열 제거
          .join(' ')
        return {
          label: endpointKey,
          itemDetail: detail,
        }
      })
    })
  })
}

// ToxicProps 데이터 파싱
export const parseToxicProps = (
  data: any[],
  getCodeValue: (code: string) => string,
  endpointKey: string,
) => {
  return data.map(item => {
    const testAnimals = item.MaterialsAndMethods?.TestAnimals || {}
    const routeOfAdministration =
      item.MaterialsAndMethods?.AdministrationExposure?.RouteOfAdministration ||
      {}
    const exposureDuration =
      item.MaterialsAndMethods?.AdministrationExposure
        ?.DurationOfTreatmentExposure || {}
    const typeOfInhalationExposure =
      item.MaterialsAndMethods?.AdministrationExposure
        ?.TypeOfInhalationExposure || {}
    const effectLevelsRaw = item.ResultsAndDiscussion?.EffectLevels || []
    const effectLevelsEff =
      item.ResultsAndDiscussion?.EffectLevels?.Efflevel || []

    const effectLevels = Array.isArray(effectLevelsRaw)
      ? effectLevelsRaw.concat(effectLevelsEff) // 둘 다 배열이면 합치기
      : effectLevelsEff

    // const effectLevels = item.ResultsAndDiscussion?.EffectLevels || []

    const animalDetails = (() => {
      const strain = getCodeValue(testAnimals.Strain?.code)
      const species = getCodeValue(testAnimals.Species?.code)
      const sex = getCodeValue(testAnimals.Sex?.code)

      if (strain && species && sex) {
        return `${strain}-${species}(${sex})`
      }
      return [strain, species, sex].filter(Boolean).join(' ')
    })()

    const exposure = (() => {
      const exposureRoute = getCodeValue(routeOfAdministration?.code)
      const exposureType = getCodeValue(typeOfInhalationExposure?.code)

      const durationValue =
        typeof exposureDuration === 'object'
          ? (exposureDuration?.value ??
            exposureDuration?.lowerValue ??
            exposureDuration?.upperValue)
          : exposureDuration

      return [exposureRoute, exposureType, durationValue]
        .filter(Boolean)
        .join(', ')
    })()

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
      : '' // `effectLevels`가 배열이 아닐 경우 빈 문자열 반환

    const effectLevelDetails = Array.isArray(effectLevels)
      ? effectLevels
          .map(({ EffectLevel }: { EffectLevel: IEffectLevel }) => {
            const { lowerValue, upperValue, Value, unit } = EffectLevel || {}
            const unitLabel = unit?.code ? getCodeValue(unit.code) : ''
            const formattedExposureDuration = exposureDurationDetails
              ? `(${exposureDurationDetails})`
              : ''

            return [
              Value !== undefined ? `${Value}` : null,
              upperValue !== undefined ? `${upperValue}` : null,
              lowerValue !== undefined ? `${lowerValue}` : null,
              lowerValue !== undefined && upperValue !== undefined
                ? ` - ${upperValue}`
                : null,
              unitLabel || null,
              formattedExposureDuration || null,
            ]
              .filter(Boolean)
              .join(' ')
          })
          .filter(Boolean) // 빈 항목 제거
          .join(', ')
      : ''

    const additionalDetails = TOXIC_PROPS_MAPPING.map(({ path, label }) => {
      const values = Array.isArray(path)
        ? path
            .map(p => get(item, p))
            .flat()
            .filter(Boolean)
        : get(item, path)

      return values?.length
        ? `${label}: ${values.map((v: { code?: string } | string) => (typeof v === 'object' && v?.code ? getCodeValue(v.code) : v)).join(', ')}`
        : null
    }).filter(Boolean)

    const details = [
      animalDetails,
      exposure,
      effectLevelDetails,
      ...additionalDetails,
    ]
      .filter(Boolean) // undefined 또는 null 제거
      .join(', ')

    // const details = [
    //   animalDetails || null,
    //   exposure || null,
    //   effectLevelDetails || null,
    // ]
    //   .filter(Boolean) // undefined 또는 null 제거
    //   .join(', ')

    return {
      label: endpointKey,
      itemDetail: details,
    }
  })
}

// const exposureDurationDetails = effectLevels
//   .map(({ ExposureDuration }: { ExposureDuration: IExposureDuration }) => {
//     if (!ExposureDuration) return '' // null 체크
//     const { unit, value } = ExposureDuration || {}
//     const unitLabel = unit?.code ? getCodeValue(unit.code) : ''

//     return [value !== undefined ? `${value}` : '', unitLabel || '']
//       .filter(Boolean)
//       .join(' ')
//   })
//   .filter(Boolean) // 빈 항목 제거
//   .join(', ')
