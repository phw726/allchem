import { isArray } from 'lodash'

export const TOXIC_PROPS_MAPPING = [
  {
    path: [
      'MaterialsAndMethods.ObjectiveOfStudyPick',
      'MaterialsAndMethods.AdministrationExposure.RouteOfAdministration',
      'ResultsAndDiscussion.MetaboliteCharacterisationStudies.MetabolitesIdentified',
    ],
    label: 'BasicToxicokinetics',
    key: 'MetabolitesIdentified',
  },
  {
    path: [
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.CriticalEffectsObserved',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.System',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.Organ',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.TreatmentRelated',
    ],
    label: 'Carcinogenicity',
  },
  {
    path: ['MaterialsAndMethods.AdministrationExposure'],
    key: ['TypeOfCoverage', 'DurationOfExposure'],
    label: 'DermalAbsorption',
  },
  {
    path: [
      'ResultsAndDiscussion.ResultsMaternalAnimals.EffectLevelsMaternalAnimals.Efflevel.Endpoint',
      'ResultsAndDiscussion.ResultsMaternalAnimals.EffectLevelsMaternalAnimals.Efflevel.EffectLevel.lowerQualifier',
      'ResultsAndDiscussion.ResultsMaternalAnimals.EffectLevelsMaternalAnimals.Efflevel.EffectLevel.lowerValue',
      'ResultsAndDiscussion.ResultsMaternalAnimals.EffectLevelsMaternalAnimals.Efflevel.EffectLevel.unit',
    ],
    label: 'DevelopmentalToxicityTeratogenicity',
  },
  {
    path: [
      'ResultsAndDiscussion.InVitro.ResultsOfExVivoInVitroStudy.IrritationParameter',
      'ResultsAndDiscussion.InVitro.ResultsOfExVivoInVitroStudy.RemarksOnResult',
      'ResultsAndDiscussion.InVivo.IrritationCorrosionResults.Parameter',
    ],
    label: 'EyeIrritation',
  },
  {
    path: [
      'ResultsAndDiscussion.TestRs.Genotoxicity',
      'ResultsAndDiscussion.TestRs.Toxicity',
      'ResultsAndDiscussion.TestRs.VehContrValid',
      'ResultsAndDiscussion.TestRs.NegContrValid',
      'ResultsAndDiscussion.TestRs.PosContrValid',
    ],
    label: 'GeneticToxicityVivo',
  },
  {
    path: [
      'ResultsAndDiscussion.ResultsOfExaminations.EndocrineFindings',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.CriticalEffectsObserved',
    ],
    label: 'Immunotoxicity',
  },
  {
    path: [
      'ResultsAndDiscussion.EffectLevels.Efflevel.Endpoint',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.lowerValue',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.unit',
    ],
    label: 'Neurotoxicity',
  },
  {
    path: [
      'ResultsAndDiscussion.EffectLevels.Efflevel.Endpoint',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.lowerValue',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.unit',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.CriticalEffectsObserved',
    ],
    label: 'RepeatedDoseToxicityDermal',
  },
  {
    path: [
      'ResultsAndDiscussion.EffectLevels.Efflevel.Endpoint',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.lowerValue',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.unit',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.CriticalEffectsObserved',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.LowestEffectiveDoseConc.value',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.LowestEffectiveDoseConc.unit',
    ],
    label: 'RepeatedDoseToxicityInhalation',
  },
  {
    path: [
      'ResultsAndDiscussion.EffectLevels.Efflevel.Endpoint',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.lowerValue',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.unit',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.CriticalEffectsObserved',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.LowestEffectiveDoseConc.value',
      'ResultsAndDiscussion.TargetSystemOrganToxicity.TargetSystemOrganToxicity.LowestEffectiveDoseConc.unit',
    ],
    label: 'RepeatedDoseToxicityOral',
  },
  {
    path: ['ApplicantSummaryAndConclusion.InterpretationOfResults'],
    label: 'RespiratorySensitisation',
  },
  {
    path: 'ResultsAndDiscussion.InVivo.Results',
    label: 'SkinIrritationCorrosion',
    key: ['Parameter', 'TimePoint', 'Score', 'Reversibility'],
  },
  {
    path: [
      'ResultsAndDiscussion.ResultsOfExaminationsParentalGeneration.EffectLevelsP0.Efflevel.Basis',
      'ResultsAndDiscussion.ReproductiveToxicity.ReproductiveToxicity',
    ],
    label: 'ToxicityReproduction',
    key: 'ReproductiveEffectsObserved',
  },
  {
    path: [
      'ResultsAndDiscussion.EffectLevels.Efflevel.Endpoint',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.lowerValue',
      'ResultsAndDiscussion.EffectLevels.Efflevel.EffectLevel.unit',
    ],
    label: 'ToxicityReproductionOther',
  },
]

// { path: '', label: '' },
