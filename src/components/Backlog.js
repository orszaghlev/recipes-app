import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEye, faCheck, faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { doc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from '../lib/Firebase'
import useBacklog from "../hooks/UseBacklog"
import * as ROUTES from "../constants/Routes"
import { useUserAuth } from "../contexts/UserContext"

export default function Backlog() {
  const { user } = useUserAuth()
  const { backlog } = useBacklog()
  const navigate = useNavigate()

  async function deleteRecipeFromBacklog(id) {
    const recipeDocRef = doc(db, 'backlog', id)
    await deleteDoc(recipeDocRef)
  }

  async function moveRecipeFromBacklog(recipe) {
    await deleteRecipeFromBacklog(recipe.id)
    await setDoc(doc(db, 'backlog', recipe.id), {
      id: recipe.id,
      name: recipe.name,
      slug: recipe.slug,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      imageURL: recipe.imageURL
    })
  }

  return (
    <div key="recipes-container" className="recipes-container">
      {user !== {} && backlog.map((recipe) => {
        return (
          <div key="recipes-container" className="recipe-container">
            <img className="recipe-image"
              src={recipe.imageURL} alt={recipe.name} />
            <h3 className="recipe-name">{recipe.name}</h3>
            <div key="button-container" className="button-container">
              <button data-testid="recipe-move-button"
                className="recipe-move-button"
                onClick={moveRecipeFromBacklog(recipe)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button data-testid="recipe-edit-button"
                className="recipe-edit-button"
                onClick={() =>
                  navigate(ROUTES.RECIPE_EDIT_FROM_BACKLOG + `/${recipe.id}`,
                    { state: { id: recipe.id } })}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button data-testid="recipe-delete-button"
                className="recipe-delete-button"
                onClick={() => deleteRecipeFromBacklog(recipe.id)}>
                <FontAwesomeIcon icon={faRemove} />
              </button>
              <button data-testid="recipe-read-button"
                className="recipe-read-button"
                onClick={() => navigate(ROUTES.RECIPE_FROM_BACKLOG + `/${recipe.id}`,
                  { state: { id: recipe.id } })}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}