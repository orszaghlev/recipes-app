import { useEffect, useState } from 'react'
import { query, collection, where, onSnapshot } from "firebase/firestore"
import { db } from '../lib/Firebase'
import { useLocation } from 'react-router-dom'

export default function useRecipe() {
  const [recipe, setRecipe] = useState()
  const location = useLocation()

  useEffect(() => {
    const q = query(collection(db, 'recipes'), where('slug', '==', location.state.slug))
    onSnapshot(q, (querySnapshot) => {
      setRecipe(querySnapshot.docs[0])
    })
  }, [location.state.slug])

  return { recipe }
}