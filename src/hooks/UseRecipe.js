import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { firebase } from '../lib/Firebase'

export default function useRecipe(target) {
  const [recipe, setRecipe] = useState()
  const location = useLocation()

  useEffect(() => {
    async function getRecipeById(id) {
      const result = await firebase
        .firestore()
        .collection(target)
        .where('id', '==', id)
        .get()

      return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
      }))
    }

    async function getRecipeObjById(id) {
      const [recipe] = await getRecipeById(id)
      setRecipe(recipe || {})
    }

    if (location.state.id) {
      getRecipeObjById(location.state.id)
    }
  }, [location.state.id, target])

  return { recipe }
}