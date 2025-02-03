import { get } from 'lodash'
import { TOXIC_PROPS_MAPPING } from '../toxicPropsMapping'
import { getCodeValue } from '../getCodeValue'

// export const getAdditionalDetails = (item: any): string[] => {
//   return TOXIC_PROPS_MAPPING.map(({ path, label }) => {
//     const values = Array.isArray(path)
//       ? path
//           .map(p => get(item, p))
//           .flat()
//           .filter(Boolean)
//       : get(item, path)

//     return values?.length
//       ? `${label}: ${values
//           .map((v: { code?: string } | string) =>
//             typeof v === 'object' && v?.code ? getCodeValue(v.code) : v,
//           )
//           .join(', ')}`
//       : null
//   }).filter(Boolean) as string[]
// // }

// export const getAdditionalDetails = (item: any): string[] => {
//   return TOXIC_PROPS_MAPPING.flatMap(({ path, label, key }) => {
//     let values = get(item, path)
//     if (values === undefined || values === null) return []

//     // ✅ 배열 처리 (flat 적용 + key 기반 변환 추가)
//     if (Array.isArray(values)) {
//       values = values
//         .flatMap(obj => {
//           if (typeof obj === 'object' && obj !== null) {
//             if (key) {
//               return Array.isArray(key)
//                 ? key
//                     .flatMap(k =>
//                       k && obj[k] !== undefined
//                         ? typeof obj[k] === 'object' && obj[k]?.code
//                           ? getCodeValue(obj[k].code) // 🔹 코드 변환
//                           : typeof obj[k] === 'object' && 'lowerValue' in obj[k]
//                             ? `Score: ${obj[k].lowerValue}`
//                             : typeof obj[k] === 'object'
//                               ? `${Object.values(obj[k]).join(' ')}`
//                               : obj[k]
//                         : null,
//                     )
//                     .filter(Boolean)
//                     .join(' - ')
//                 : key && obj[key] !== undefined
//                   ? typeof obj[key] === 'object' && obj[key]?.code
//                     ? getCodeValue(obj[key].code)
//                     : typeof obj[key] === 'object' && 'lowerValue' in obj[key]
//                       ? `Score: ${obj[key].lowerValue}`
//                       : typeof obj[key] === 'object'
//                         ? `${Object.values(obj[key]).join(' ')}`
//                         : obj[key]
//                   : null
//             }
//             return Object.values(obj).join(', ')
//           }
//           return obj
//         })
//         .filter(Boolean)
//         .join(', ')
//     }

//     // ✅ 단일 객체 처리 (이전 두 번째 로직 보완)
//     else if (typeof values === 'object' && values !== null) {
//       values = key
//         ? Array.isArray(key)
//           ? key
//               .map(k =>
//                 k && values[k] !== undefined
//                   ? typeof values[k] === 'object' && values[k]?.code
//                     ? getCodeValue(values[k].code)
//                     : typeof values[k] === 'object' && 'lowerValue' in values[k]
//                       ? `Score: ${values[k].lowerValue}`
//                       : typeof values[k] === 'object'
//                         ? `${Object.values(values[k]).join(' ')}`
//                         : values[k]
//                   : null,
//               )
//               .filter(Boolean)
//               .join(' - ')
//           : key && values[key] !== undefined
//             ? typeof values[key] === 'object' && values[key]?.code
//               ? getCodeValue(values[key].code)
//               : typeof values[key] === 'object' && 'lowerValue' in values[key]
//                 ? `Score: ${values[key].lowerValue}`
//                 : typeof values[key] === 'object'
//                   ? `${Object.values(values[key]).join(' ')}`
//                   : values[key]
//             : Object.values(values).join(', ')
//         : Object.values(values).join(', ')
//     }

//     // 🚨 ✅ `label: ` 부분 삭제하여 SkinIrritationCorrosion 안 나오게 처리
//     return values && values !== '{}' ? [`${values}`] : []
//   }).filter(Boolean)
// }

export const getAdditionalDetails = (item: any): string[] => {
  return TOXIC_PROPS_MAPPING.flatMap(({ path, label, key }) => {
    let values = get(item, path)

    if (!values) return []

    // ✅ 배열 데이터 처리 추가
    if (Array.isArray(values)) {
      values = values
        .flatMap(obj => {
          if (typeof obj === 'object' && obj !== null) {
            if (key) {
              return Array.isArray(key)
                ? key
                    .map(k =>
                      k && obj[k] !== undefined
                        ? typeof obj[k] === 'object' && 'code' in obj[k]
                          ? getCodeValue(obj[k].code)
                          : typeof obj[k] === 'object'
                            ? `${k} ${Object.values(obj[k]).join(' ')}`
                            : obj[k]
                        : null,
                    )
                    .filter(Boolean)
                    .join(' - ')
                : key && obj[key] !== undefined
                  ? typeof obj[key] === 'object' && 'code' in obj[key]
                    ? getCodeValue(obj[key].code)
                    : typeof obj[key] === 'object'
                      ? `${key} ${Object.values(obj[key]).join(' ')}`
                      : obj[key]
                  : null
            }
            return Object.values(obj).join(', ')
          }
          return obj
        })
        .filter(Boolean)
        .join(', ')
    }

    // ✅ 단일 객체 처리
    else if (typeof values === 'object' && values !== null) {
      values = key
        ? Array.isArray(key)
          ? key
              .map(k =>
                k && values[k] !== undefined
                  ? typeof values[k] === 'object' && 'code' in values[k]
                    ? getCodeValue(values[k].code)
                    : typeof values[k] === 'object'
                      ? `${k} ${Object.values(values[k]).join(' ')}`
                      : values[k]
                  : null,
              )
              .filter(Boolean)
              .join(' - ')
          : key && values[key] !== undefined
            ? typeof values[key] === 'object' && 'code' in values[key]
              ? getCodeValue(values[key].code)
              : typeof values[key] === 'object'
                ? `${key} ${Object.values(values[key]).join(' ')}`
                : values[key]
            : Object.values(values).join(', ')
        : Object.values(values).join(', ')
    }

    return values && values !== '{}' ? [`${values}`] : []
  }).filter(Boolean)
}

// export const getAdditionalDetails = (item: any): string[] => {
//   return TOXIC_PROPS_MAPPING.flatMap(({ path, label, key }) => {
//     let values = get(item, path)
//     if (values === undefined || values === null) return []

//     // ✅ 배열 처리
//     if (Array.isArray(values)) {
//       values = values
//         .map(obj => {
//           if (typeof obj === 'object' && obj !== null) {
//             if (key) {
//               return Array.isArray(key)
//                 ? key
//                     .map(k =>
//                       k && obj[k] !== undefined
//                         ? typeof obj[k] === 'object' && obj[k]?.code
//                           ? getCodeValue(obj[k].code)
//                           : typeof obj[k] === 'object' && 'lowerValue' in obj[k]
//                             ? `Score: ${obj[k].lowerValue}` // ✅ Score 값을 올바르게 출력
//                             : typeof obj[k] === 'object'
//                               ? `${Object.values(obj[k]).join(' ')}`
//                               : obj[k]
//                         : null,
//                     )
//                     .filter(Boolean)
//                     .join(' - ')
//                 : key && obj[key] !== undefined
//                   ? typeof obj[key] === 'object' && obj[key]?.code
//                     ? getCodeValue(obj[key].code)
//                     : typeof obj[key] === 'object' && 'lowerValue' in obj[key]
//                       ? `Score: ${obj[key].lowerValue}` // ✅ Score 값 추가
//                       : typeof obj[key] === 'object'
//                         ? `${Object.values(obj[key]).join(' ')}`
//                         : obj[key]
//                   : null
//             }
//             return Object.values(obj).join(', ')
//           }
//           return obj
//         })
//         .filter(Boolean)
//         .join(', ')
//     }

//     // ✅ 단일 객체 처리
//     else if (typeof values === 'object' && values !== null) {
//       values = key
//         ? Array.isArray(key)
//           ? key
//               .map(k =>
//                 k && values[k] !== undefined
//                   ? typeof values[k] === 'object' && values[k]?.code
//                     ? getCodeValue(values[k].code)
//                     : typeof values[k] === 'object' && 'lowerValue' in values[k]
//                       ? `Score: ${values[k].lowerValue}`
//                       : typeof values[k] === 'object'
//                         ? `${Object.values(values[k]).join(' ')}`
//                         : values[k]
//                   : null,
//               )
//               .filter(Boolean)
//               .join(' - ')
//           : key && values[key] !== undefined
//             ? typeof values[key] === 'object' && values[key]?.code
//               ? getCodeValue(values[key].code)
//               : typeof values[key] === 'object' && 'lowerValue' in values[key]
//                 ? `Score: ${values[key].lowerValue}`
//                 : typeof values[key] === 'object'
//                   ? `${Object.values(values[key]).join(' ')}`
//                   : values[key]
//             : Object.values(values).join(', ')
//         : Object.values(values).join(', ')
//     }

//     // ✅ "SkinIrritationCorrosion"을 출력에서 제거
//     if (label === 'SkinIrritationCorrosion') {
//       return values && values !== '{}' ? [`${values}`] : []
//     }

//     return values && values !== '{}' ? [`${label}: ${values}`] : []
//   }).filter(Boolean)
// }

// export const getAdditionalDetails = (item: any) => {
//   return TOXIC_PROPS_MAPPING.map(({ path, label, key }) => {
//     let values = get(item, path)
//     if (values === undefined || values === null) return null

//     if (Array.isArray(values)) {
//       values = values
//         .map(obj => {
//           if (typeof obj === 'object' && obj !== null) {
//             if (key) {
//               return Array.isArray(key)
//                 ? key
//                     .map(k =>
//                       k && obj[k] !== undefined
//                         ? typeof obj[k] === 'object' && obj[k]?.code
//                           ? getCodeValue(obj[k].code)
//                           : typeof obj[k] === 'object'
//                             ? `${k} ${Object.values(obj[k]).join(' ')}`
//                             : obj[k]
//                         : null,
//                     )
//                     .filter(Boolean)
//                     .join(' - ')
//                 : key && obj[key] !== undefined
//                   ? typeof obj[key] === 'object' && obj[key]?.code
//                     ? getCodeValue(obj[key].code)
//                     : typeof obj[key] === 'object'
//                       ? `${key} ${Object.values(obj[key]).join(' ')}`
//                       : obj[key]
//                   : null
//             }
//             return JSON.stringify(obj)
//           }
//           return obj
//         })
//         .filter(Boolean)
//         .join(', ')
//     } else if (typeof values === 'object' && values !== null) {
//       values = key
//         ? Array.isArray(key)
//           ? key
//               .map(k =>
//                 k && values[k] !== undefined
//                   ? typeof values[k] === 'object' && values[k]?.code
//                     ? getCodeValue(values[k].code)
//                     : typeof values[k] === 'object'
//                       ? `${k} ${Object.values(values[k]).join(' ')}`
//                       : values[k]
//                   : null,
//               )
//               .filter(Boolean)
//               .join(' - ')
//           : key && values[key] !== undefined
//             ? typeof values[key] === 'object' && values[key]?.code
//               ? getCodeValue(values[key].code)
//               : typeof values[key] === 'object'
//                 ? `${key} ${Object.values(values[key]).join(' ')}`
//                 : values[key]
//             : JSON.stringify(values)
//         : JSON.stringify(values)
//     }

//     return values && values !== '{}' ? [values] : []
//   }).filter(Boolean)
// }
