import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from 'react'
import { app } from '../../firebase'

// Context 타입 정의
interface AuthContextType {
  user: User | null
}

interface AuthProps {
  children: ReactNode
}

// Context 생성 시 기본 값
const AuthContext = createContext<AuthContextType | undefined>(undefined)

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

export default AuthContext
