import { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../lib/Firebase'
import { useLocation } from 'react-router-dom'

export default function useRecipe() {
  const [recipe, setRecipe] = useState()
  const location = useLocation()

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "recipes", location.state.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setRecipe(docSnap.data())
      }
    }
    getData()
  }, [location.state.id])

  return { recipe }
}