import { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../lib/Firebase'
import { useLocation } from 'react-router-dom'

export default function useRecipeFromBacklog() {
  const [recipeFromBacklog, setRecipeFromBacklog] = useState()
  const location = useLocation()

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "backlog", location.state.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setRecipeFromBacklog(docSnap.data())
      }
    }
    getData()
  }, [location.state.id])

  return { recipeFromBacklog }
}