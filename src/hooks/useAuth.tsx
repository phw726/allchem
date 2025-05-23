import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from 'react'
import app from '../../firebase'

// Context 타입 정의

interface AuthProps {
  children: ReactNode
}

const AuthContext = createContext({
  user: null as User | null,
})

// Context Provider 정의
export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })

    // Cleanup: 컴포넌트가 언마운트될 때 구독 취소
    return () => unsubscribe()
  }, [auth])

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}
