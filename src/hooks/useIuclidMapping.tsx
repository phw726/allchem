import { getAdditionalDetails } from '@/data/iuclid6/ToxicData/getAdditionalDetail'
import { getAnimalDetails } from '@/data/iuclid6/ToxicData/getAnimalDetails'
import { getEffectLevelDetails } from '@/data/iuclid6/ToxicData/getEffectLevelDetail'
import { getExposureDetails } from '@/data/iuclid6/ToxicData/getExposureDetail'

export const parseToxicPropsNew = (
  data: any[],
  endpointKey: string,
): { label: string; itemDetail: string }[] => {
  return data.map(item => {
    const animalDetails = getAnimalDetails(
      item.MaterialsAndMethods?.TestAnimals,
    )
    const exposureDetails = getExposureDetails(
      item.MaterialsAndMethods?.AdministrationExposure,
    )

    const effectLevelsRaw = item.ResultsAndDiscussion?.EffectLevels || []
    const effectLevelsEff =
      item.ResultsAndDiscussion?.EffectLevels?.Efflevel || []

    const effectLevels = Array.isArray(effectLevelsRaw)
      ? effectLevelsRaw.concat(effectLevelsEff) // 둘 다 배열이면 합치기
      : effectLevelsEff

    const effectLevelDetails = getEffectLevelDetails(effectLevels)
    const additionalDetails = getAdditionalDetails(item)

    const details = [
      animalDetails,
      exposureDetails,
      effectLevelDetails,
      ...additionalDetails,
    ]
      .filter(Boolean) // undefined 또는 null 제거
      .join(', ')

    return {
      label: endpointKey,
      itemDetail: details,
    }
  })
}
