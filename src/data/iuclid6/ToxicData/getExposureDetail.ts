import { getCodeValue } from '../getCodeValue'

export const getExposureDetails = (administrationExposure: any): string => {
  const exposureRoute = getCodeValue(
    administrationExposure?.RouteOfAdministration?.code,
  )
  const exposureType = getCodeValue(
    administrationExposure?.TypeOfInhalationExposure?.code,
  )

  const exposureDuration = administrationExposure?.DurationOfTreatmentExposure
  const durationValue =
    typeof exposureDuration === 'object'
      ? (exposureDuration?.value ??
        exposureDuration?.lowerValue ??
        exposureDuration?.upperValue)
      : exposureDuration

  return [exposureRoute, exposureType, durationValue].filter(Boolean).join(', ')
}
