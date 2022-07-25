import { useState, useEffect, useContext } from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export default function useAuthListener() {
  const [admin, setAdmin] = useState(JSON.parse(
    localStorage.getItem('authAdmin')))
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authAdmin) => {
      if (authAdmin) {
        localStorage.setItem('authAdmin', JSON.stringify(authAdmin))
        setAdmin(authAdmin)
      } else {
        localStorage.removeItem('authAdmin')
        setAdmin(null)
      }
    })

    return () => listener()
  }, [firebase])

  return { admin }
}