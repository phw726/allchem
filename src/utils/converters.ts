// import {
//   DocumentData,
//   FieldValue,
//   FirestoreDataConverter,
//   QueryDocumentSnapshot,
//   WithFieldValue,
// } from '@firebase/firestore'

// // export const genericConverter = <
// //   T extends { postId: string | FieldValue },
// // >(): FirestoreDataConverter<T> => ({
// //   toFirestore(data: T): DocumentData {
// //     return { ...data }
// //   },
// //   fromFirestore(snapshot: QueryDocumentSnapshot): T {
// //     return { ...snapshot.data(), postId: snapshot.id } as T
// //   },
// // })
// export const genericConverter = () => ({
//   toFirestore(data: WithFieldValue<T>): DocumentData {
//     return { ...data } // 직렬화된 데이터 반환
//   },
//   fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T {
//     return { ...snapshot.data(), postId: snapshot.id } as T // Firestore ID를 postId에 매핑
//   },
// })
