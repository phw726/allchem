// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from 'firebase/app'
import 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// export let app: FirebaseApp

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export default app

export const db = getFirestore(app)

// try {
//   app = getApp('app')
// } catch (e) {
//   app = initializeApp(firebaseConfig, 'app')
// }

// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig)
// // const analytics = getAnalytics(app);

// export const db = getFirestore(app)
// export default firebase
