import { useEffect, useState, useContext } from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export default function useRecipes(target) {
  const [recipes, setRecipes] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    firebase.firestore().collection(target).orderBy("slug", "asc").get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }))
        setRecipes(allContent)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [firebase, target])

  return { recipes }
}