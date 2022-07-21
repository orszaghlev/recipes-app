import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../lib/Firebase'

export default function useRecipes() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'recipes'), orderBy('slug', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      setRecipes(querySnapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return { recipes }
}