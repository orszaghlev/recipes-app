import { createContext, useContext, useEffect, useState } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../lib/Firebase"

const userAuthContext = createContext()

export function UserContext({ children }) {
  const [user, setUser] = useState({})

  function signInUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signOutUser() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <userAuthContext.Provider value={{ user, signInUser, signOutUser }}>
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}