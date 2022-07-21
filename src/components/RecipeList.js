import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEye, faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from '../lib/Firebase'
import useRecipes from "../hooks/UseRecipes"

export default function RecipeList() {
  const { recipes } = useRecipes()
  const navigate = useNavigate()

  async function deleteRecipe(id) {
    const recipeDocRef = doc(db, 'recipes', id)
    try {
      await deleteDoc(recipeDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div key="recipes-container" className="recipes-container">
      {recipes.map((recipe) => {
        return (
          <div key="recipes-container" className="recipe-container">
            <img className="recipe-image"
              src={recipe.imageURL} alt={recipe.name} />
            <h3 className="recipe-name">{recipe.name}</h3>
            <div key="button-container" className="button-container">
              <button data-testid="recipe-edit-button"
                className="recipe-edit-button"
                onClick={() =>
                  navigate(`/recept-szerkesztes/${recipe.slug}`,
                    { state: { slug: recipe.slug } })}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button data-testid="recipe-delete-button"
                className="recipe-delete-button"
                onClick={() => deleteRecipe(recipe.id)}>
                <FontAwesomeIcon icon={faRemove} />
              </button>
              <button data-testid="recipe-read-button"
                className="recipe-read-button"
                onClick={() => navigate(`/recept/${recipe.slug}`,
                  { state: { slug: recipe.slug } })}>
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