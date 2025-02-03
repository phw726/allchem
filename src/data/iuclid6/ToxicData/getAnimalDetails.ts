import { getCodeValue } from '../getCodeValue'

export const getAnimalDetails = (testAnimals: any): string => {
  const strain = getCodeValue(testAnimals?.Strain?.code)
  const species = getCodeValue(testAnimals?.Species?.code)
  const sex = getCodeValue(testAnimals?.Sex?.code)

  if (strain && species && sex) {
    return `${strain}-${species}(${sex})`
  }
  return [strain, species, sex].filter(Boolean).join(', ')
}
