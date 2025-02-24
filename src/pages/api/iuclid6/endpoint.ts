export const IUCLID_ENDPOINT = {
  physicalProps: [
    'AdditionalPhysicoChemical',
    'AdsorptionDesorption',
    'AgedSorption',
    'AgglomerationAggregation',
    'AspectRatioShape',
    'AutoFlammability',
    'BoilingPoint',
    'CatalyticActivity',
    'CorrosiveToMetals',
    'CrystallinePhase',
    'CrystalliteGrainSize',
    'DegreeOfDissolutionAndDilutionStability',
    'Density',
    'DissociationConstant',
    'Dustiness',
    'ElectrochemicalTestPassivation',
    'Explosiveness',
    'Flammability',
    'FlashPoint',
    'GasesUnderPressure',
    'Granulometry',
    'HenrysLawConstant',
    'MeltFlowIndex',
    'Melting',
    'Partition',
    'Ph',
    'PhotocatalyticActivity',
    'Phototransformation',
    'PhototransformationInAir',
    'PhotoTransformationInSoil',
    'PhysicalChemicalCompatibility',
    'Porosity',
    'PourDensity',
    'RadicalFormationPotential',
    'SpecificSurfaceArea',
    'StabilityOrganic',
    'StabilityThermal',
    'StorageStability',
    'SurfaceChemistry',
    'SurfaceTension',
    'Vapour',
    'Viscosity',
    'WaterSolubility',
    'ZetaPotential',
  ],
  toxicProps: [
    'AcuteToxicityDermal',
    'AcuteToxicityInhalation',
    'AcuteToxicityOral',
    'AcuteToxicityOtherRoutes',
    'AdditionalEcotoxicologicalInformation',
    'AdditionalInfoOnResiduesInFood',
    'AdditionalInformationOnEnvironmentalFateAndBehaviour',
    'AdditionalToxicologicalInformation',
    'AnalyticalMethods',
    'BasicToxicokinetics',
    'BioaccumulationAquaticSediment',
    'BioaccumulationTerrestrial',
    'BiodegradationIinWaterAndSedimentSimulationTests',
    'BiodegradationInSoil',
    'BiodegradationInWaterAndSedimentSimulationTests',
    'BiodegradationInWaterScreeningTests',
    'BiologicalEffectsMonitoring',
    'BiotransformationAndKinetics',
    'Carcinogenicity',
    'CellCultureStudy',
    'DermalAbsorption',
    'DevelopmentalToxicityTeratogenicity',
    'DirectObservationsClinicalCases',
    'DispStabilityNanomaterials',
    'DistributionModelling',
    'EffectivenessAgainstTargetOrganisms',
    'EfficacyData',
    'EmissionsFromPreservativeTreatedWood',
    'EndocrineDisrupterMammalianScreening',
    'EndocrineDisrupterScreeningInVitro',
    'EndocrineDisrupterTestingInAqua',
    'EpidemiologicalData',
    'ExpectedExposureAndProposedAcceptableResidues',
    'ExposureRelatedObservationsOther',
    'ExpressionInAFreshwaterEnvironment',
    'ExpressionInATerrestrialEnvironment',
    'EyeIrritation',
    'FieldStudies',
    'GeneralInformation',
    'GeneticToxicityVitro',
    'GeneticToxicityVivo',
    'GenomicCharacterisationMicroorganism',
    'HealthSurveillanceData',
    'Hydrolysis',
    'Immunotoxicity',
    'LongTermToxicityToAquaInv',
    'LongTermToxToFish',
    'MagnitudeResidInProcessedComm',
    'MagnitudeResidInProcessedCommNew',
    'MetabolismInCrops',
    'MetabolismInLivestock',
    'MetabolismInRotationalCrops',
    'MigrationOfResidues',
    'MigrationOfSubstance',
    'ModeOfDegradationInActualUse',
    'MonitoringData',
    'NatureResiduesInProcessedCommod',
    'Neurotoxicity',
    'OrganicPeroxide',
    'OtherDistributionData',
    'OxidationReduction',
    'OxidisingProperties',
    'PhototoxicityVitro',
    'RepeatedDoseToxicityDermal',
    'RepeatedDoseToxicityInhalation',
    'RepeatedDoseToxicityOral',
    'RepeatedDoseToxicityOther',
    'ResiduesInLivestock',
    'ResiduesInRotationalCrops',
    'ResiduesInRotationalCropsNew',
    'ResiduesProcessedCommodities',
    'RespiratorySensitisation',
    'SedimentToxicity',
    'SelfReactiveSubstances',
    'SensitisationData',
    'ShortTermToxicityToAquaInv',
    'ShortTermToxicityToFish',
    'SkinIrritationCorrosion',
    'SkinSensitisation',
    'SolubilityOrganic',
    'SpecificInvestigations',
    'StabilityOfResiduesInStoredCommod',
    'TechnicalCharacteristics',
    'ToxicEffectsLivestock',
    'ToxicityReproduction',
    'ToxicityReproductionOther',
    'ToxicityToAquaticAlgae',
    'ToxicityToAquaticPlant',
    'ToxicityToBees',
    'ToxicityToBirds',
    'ToxicityToMicroorganisms',
    'ToxicityToOtherAboveGroundOrganisms',
    'ToxicityToOtherAqua',
    'ToxicityToSoilArthropods',
    'ToxicityToSoilMacroorganismsExceptArthropods',
    'ToxicityToSoilMicroorganisms',
    'ToxicityToTerrestrialArthropods',
    'ToxicityToTerrestrialArthropodsOtherThanBees',
    'ToxicityToTerrestrialPlants',
    'TransportViaAir',
  ],
}

export const ENDPOINT_STUDY_RECORDS = {
  ACUTE_TOXICITY_ORAL: 'ENDPOINT_STUDY_RECORD.AcuteToxicityOral',
  ACUTE_TOXICITY_DERMAL: 'ENDPOINT_STUDY_RECORD.AcuteToxicityDermal',
  ACUTE_TOXICITY_INHALATION: 'ENDPOINT_STUDY_RECORD.AcuteToxicityInhalation',
  ACUTE_TOXICITY_OTHER_ROUTES: 'ENDPOINT_STUDY_RECORD.AcuteToxicityOtherRoutes',
  ADDITIONAL_ECOTOXICOLOGICAL_INFO:
    'ENDPOINT_STUDY_RECORD.AdditionalEcotoxicologicalInformation',
  ADDITIONAL_INFO_ON_RESIDUES_IN_FOOD:
    'ENDPOINT_STUDY_RECORD.AdditionalInfoOnResiduesInFood',
  ADDITIONAL_INFO_ON_ENVIRONMENTAL_FATE:
    'ENDPOINT_STUDY_RECORD.AdditionalInformationOnEnvironmentalFateAndBehaviour',
  ADDITIONAL_PHYSICO_CHEMICAL:
    'ENDPOINT_STUDY_RECORD.AdditionalPhysicoChemical',
  ADDITIONAL_TOXICOLOGICAL_INFO:
    'ENDPOINT_STUDY_RECORD.AdditionalToxicologicalInformation',
  ADSORPTION_DESORPTION: 'ENDPOINT_STUDY_RECORD.AdsorptionDesorption',
  AGED_SORPTION: 'ENDPOINT_STUDY_RECORD.AgedSorption',
  AGGLOMERATION_AGGREGATION: 'ENDPOINT_STUDY_RECORD.AgglomerationAggregation',
  ANALYTICAL_METHODS: 'ENDPOINT_STUDY_RECORD.AnalyticalMethods',
  ASPECT_RATIO_SHAPE: 'ENDPOINT_STUDY_RECORD.AspectRatioShape',
  AUTO_FLAMMABILITY: 'ENDPOINT_STUDY_RECORD.AutoFlammability',
  BASIC_TOXICOKINETICS: 'ENDPOINT_STUDY_RECORD.BasicToxicokinetics',
  BIOACCUMULATION_AQUATIC_SEDIMENT:
    'ENDPOINT_STUDY_RECORD.BioaccumulationAquaticSediment',
  BIOACCUMULATION_TERRESTRIAL:
    'ENDPOINT_STUDY_RECORD.BioaccumulationTerrestrial',
  BIODEGRADATION_IN_WATER:
    'ENDPOINT_STUDY_RECORD.BiodegradationInWaterScreeningTests',
  BIODEGRADATION_IN_SOIL: 'ENDPOINT_STUDY_RECORD.BiodegradationInSoil',
  BIODEGRADATION_SIMULATION:
    'ENDPOINT_STUDY_RECORD.BiodegradationIinWaterAndSedimentSimulationTests',
  BIOLOGICAL_EFFECTS_MONITORING:
    'ENDPOINT_STUDY_RECORD.BiologicalEffectsMonitoring',
  BIO_TRANSFORMATION_KINETICS:
    'ENDPOINT_STUDY_RECORD.BiotransformationAndKinetics',
  BOILING_POINT: 'ENDPOINT_STUDY_RECORD.BoilingPoint',
  CARCINOGENICITY: 'ENDPOINT_STUDY_RECORD.Carcinogenicity',
  CATALYTIC_ACTIVITY: 'ENDPOINT_STUDY_RECORD.CatalyticActivity',
  CELL_CULTURE_STUDY: 'ENDPOINT_STUDY_RECORD.CellCultureStudy',
  CORROSIVE_TO_METALS: 'ENDPOINT_STUDY_RECORD.CorrosiveToMetals',
  CRYSTALLINE_PHASE: 'ENDPOINT_STUDY_RECORD.CrystallinePhase',
  CRYSTALLITE_GRAIN_SIZE: 'ENDPOINT_STUDY_RECORD.CrystalliteGrainSize',
  DEGREE_OF_DISSOLUTION:
    'ENDPOINT_STUDY_RECORD.DegreeOfDissolutionAndDilutionStability',
  DENSITY: 'ENDPOINT_STUDY_RECORD.Density',
  DERMAL_ABSORPTION: 'ENDPOINT_STUDY_RECORD.DermalAbsorption',
  DEVELOPMENTAL_TOXICITY:
    'ENDPOINT_STUDY_RECORD.DevelopmentalToxicityTeratogenicity',
  DIRECT_OBSERVATIONS: 'ENDPOINT_STUDY_RECORD.DirectObservationsClinicalCases',
  DISPERSION_STABILITY: 'ENDPOINT_STUDY_RECORD.DispStabilityNanomaterials',
  DISSOCIATION_CONSTANT: 'ENDPOINT_STUDY_RECORD.DissociationConstant',
  DISTRIBUTION_MODELLING: 'ENDPOINT_STUDY_RECORD.DistributionModelling',
  DUSTINESS: 'ENDPOINT_STUDY_RECORD.Dustiness',
  EFFECTIVENESS_AGAINST_TARGET:
    'ENDPOINT_STUDY_RECORD.EffectivenessAgainstTargetOrganisms',
  EFFICACY_DATA: 'ENDPOINT_STUDY_RECORD.EfficacyData',
  ELECTROCHEMICAL_PASSIVATION:
    'ENDPOINT_STUDY_RECORD.ElectrochemicalTestPassivation',
  EMISSIONS_FROM_WOOD:
    'ENDPOINT_STUDY_RECORD.EmissionsFromPreservativeTreatedWood',
  ENDOCRINE_DISRUPTER:
    'ENDPOINT_STUDY_RECORD.EndocrineDisrupterMammalianScreening',
  EYE_IRRITATION: 'ENDPOINT_STUDY_RECORD.EyeIrritation',
  FLAMMABILITY: 'ENDPOINT_STUDY_RECORD.Flammability',
  FLASH_POINT: 'ENDPOINT_STUDY_RECORD.FlashPoint',
  GASES_UNDER_PRESSURE: 'ENDPOINT_STUDY_RECORD.GasesUnderPressure',
  GENETIC_TOXICITY_IN_VITRO: 'ENDPOINT_STUDY_RECORD.GeneticToxicityVitro',
  GENETIC_TOXICITY_IN_VIVO: 'ENDPOINT_STUDY_RECORD.GeneticToxicityVivo',
  GRANULOMETRY: 'ENDPOINT_STUDY_RECORD.Granulometry',
  HEALTH_SURVEILLANCE: 'ENDPOINT_STUDY_RECORD.HealthSurveillanceData',
  HENRYS_LAW_CONSTANT: 'ENDPOINT_STUDY_RECORD.HenrysLawConstant',
  HYDROLYSIS: 'ENDPOINT_STUDY_RECORD.Hydrolysis',
  IMMUNOTOXICITY: 'ENDPOINT_STUDY_RECORD.Immunotoxicity',
  LONG_TERM_TOXICITY_TO_FISH: 'ENDPOINT_STUDY_RECORD.LongTermToxToFish',
  LONG_TERM_TOXICITY_TO_INV: 'ENDPOINT_STUDY_RECORD.LongTermToxicityToAquaInv',
  MELTING_POINT: 'ENDPOINT_STUDY_RECORD.Melting',
  METABOLISM_IN_CROPS: 'ENDPOINT_STUDY_RECORD.MetabolismInCrops',
  METABOLISM_IN_LIVESTOCK: 'ENDPOINT_STUDY_RECORD.MetabolismInLivestock',
  MIGRATION_OF_SUBSTANCE: 'ENDPOINT_STUDY_RECORD.MigrationOfSubstance',
  NEUROTOXICITY: 'ENDPOINT_STUDY_RECORD.Neurotoxicity',
  ORGANIC_PEROXIDE: 'ENDPOINT_STUDY_RECORD.OrganicPeroxide',
  OXIDISING_PROPERTIES: 'ENDPOINT_STUDY_RECORD.OxidisingProperties',
  PARTITION: 'ENDPOINT_STUDY_RECORD.Partition',
  PH: 'ENDPOINT_STUDY_RECORD.Ph',
  PHOTO_CATALYTIC_ACTIVITY: 'ENDPOINT_STUDY_RECORD.PhotocatalyticActivity',
  PHOTO_TOXICITY_VITRO: 'ENDPOINT_STUDY_RECORD.PhototoxicityVitro',
  PHOTO_TRANSFORMATION: 'ENDPOINT_STUDY_RECORD.Phototransformation',
  SKIN_IRRITATION: 'ENDPOINT_STUDY_RECORD.SkinIrritationCorrosion',
  SKIN_SENSITISATION: 'ENDPOINT_STUDY_RECORD.SkinSensitisation',
  VISCOSITY: 'ENDPOINT_STUDY_RECORD.Viscosity',
  WATER_SOLUBILITY: 'ENDPOINT_STUDY_RECORD.WaterSolubility',
}

// 외관
// 성상
// 색상
// 냄새
// 냄새역치
// pH
// 녹는점/어는점
// 초기 끓는점과 끓는점 범위
// 인화점
// 증발속도
// 인화성(고체, 기체)
// 폭발 상한/하한
// 증기압
// 용해도
// 증기밀도
// 비중
// n-옥탄올/물분배계수
// 자연발화온도
// 분해온도
// 점도
// 분자량
// 건강 유해성 정보
// 급성독성
// 경구
// 경피
// 흡입
// 만성독성성
// 피부부식성 또는 자극성
// 심한 눈손상 또는 자극성
// 호흡기과민성
// 피부과민성
// 발암성
// 생식세포변이원성
// 생식독성
// 특정 표적장기 독성 (1회 노출)
// 특정 표적장기 독성 (반복 노출)
// 흡인유해성
// 기타 유해성 영향
