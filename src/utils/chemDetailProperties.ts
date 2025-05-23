export const BASIC_INFO_PROPS = [
  { ordrIdx: 1052, label: '물질명', key: 'compoundName' },
  { ordrIdx: 1054, label: '이명(관용명)', key: 'aliasName' },
  { ordrIdx: 1056, label: 'CAS 번호', key: 'casNumber' },
  { ordrIdx: 1058, label: '함유량(%)', key: 'contentPercentage' },
]

export const PHYSICAL_PROPS = [
  { ordrIdx: 1164, label: '외관', key: 'appearance' },
  { ordrIdx: 1166, label: '성상', key: 'state' },
  { ordrIdx: 1168, label: '색상', key: 'color' },
  { ordrIdx: 1170, label: '냄새', key: 'odor' },
  { ordrIdx: 1172, label: '냄새역치', key: 'odorThreshold' },
  { ordrIdx: 1174, label: 'pH', key: 'ph' },
  { ordrIdx: 1176, label: '녹는점/어는점', key: 'meltingPointFreezingPoint' },
  {
    ordrIdx: 1178,
    label: '초기 끓는점과 끓는점 범위',
    key: 'boilingPointRange',
  },
  { ordrIdx: 1180, label: '인화점', key: 'flashPoint' },
  { ordrIdx: 1182, label: '증발속도', key: 'evaporationRate' },
  { ordrIdx: 1184, label: '인화성(고체, 기체)', key: 'flammability' },
  { ordrIdx: 1186, label: '폭발 상한/하한', key: 'explosiveLimits' },
  { ordrIdx: 1188, label: '증기압', key: 'vaporPressure' },
  { ordrIdx: 1190, label: '용해도', key: 'solubility' },
  { ordrIdx: 1192, label: '증기밀도', key: 'vaporDensity' },
  { ordrIdx: 1194, label: '비중', key: 'specificGravity' },
  {
    ordrIdx: 1196,
    label: 'n-옥탄올/물분배계수',
    key: 'octanolWaterPartitionCoeff',
  },
  { ordrIdx: 1198, label: '자연발화온도', key: 'autoIgnitionTemp' },
  { ordrIdx: 1200, label: '분해온도', key: 'decompositionTemp' },
  { ordrIdx: 1202, label: '점도', key: 'viscosity' },
  { ordrIdx: 1204, label: '분자량', key: 'molecularWeight' },
]

export const TOXIC_PROPS = [
  {
    ordrIdx: 1220,
    label: '가능성이 높은 노출 경로',
    key: 'likelyExposureRoutes',
  },
  { ordrIdx: 1230, label: '건강 유해성 정보', key: 'healthHazardInfo' },
  { ordrIdx: 1232, label: '급성독성', key: 'acuteToxicity' },
  { ordrIdx: 1234, label: '경구', key: 'oralToxicity' },
  { ordrIdx: 1236, label: '경피', key: 'dermalToxicity' },
  { ordrIdx: 1238, label: '흡입', key: 'inhalationToxicity' },
  {
    ordrIdx: 1240,
    label: '피부부식성 또는 자극성',
    key: 'skinCorrosionIrritation',
  },
  {
    ordrIdx: 1242,
    label: '심한 눈손상 또는 자극성',
    key: 'eyeDamageIrritation',
  },
  { ordrIdx: 1244, label: '호흡기과민성', key: 'respiratorySensitization' },
  { ordrIdx: 1246, label: '피부과민성', key: 'skinSensitization' },
  { ordrIdx: 1248, label: '발암성', key: 'carcinogenicity' },
  { ordrIdx: 1250, label: '산업안전보건법', key: 'industrialSafetyHealthLaw' },
  { ordrIdx: 1251, label: '고용노동부고시', key: 'laborMinistryNotice' },
  { ordrIdx: 1252, label: 'IARC', key: 'iarc' },
  { ordrIdx: 1253, label: 'OSHA', key: 'osha' },
  { ordrIdx: 1254, label: 'ACGIH', key: 'acgih' },
  { ordrIdx: 1255, label: 'NTP', key: 'ntp' },
  { ordrIdx: 1256, label: 'EU CLP', key: 'euClp' },
  { ordrIdx: 1260, label: '생식세포변이원성', key: 'germCellMutagenicity' },
  { ordrIdx: 1262, label: '생식독성', key: 'reproductiveToxicity' },
  {
    ordrIdx: 1264,
    label: '특정 표적장기 독성 (1회 노출)',
    key: 'targetOrganToxicitySingle',
  },
  {
    ordrIdx: 1266,
    label: '특정 표적장기 독성 (반복 노출)',
    key: 'targetOrganToxicityRepeat',
  },
  { ordrIdx: 1268, label: '흡인유해성', key: 'aspirationHazard' },
  { ordrIdx: 1270, label: '기타 유해성 영향', key: 'otherHazards' },
]
