import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEye, faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useEffect, useContext } from 'react'
import FirebaseContext from '../contexts/FirebaseContext'
import useRecipes from "../hooks/UseRecipes"

export default function RecipeList({ target, admin }) {
  const { firebase } = useContext(FirebaseContext)
  const { recipes } = useRecipes(target)
  const navigate = useNavigate()

  async function deleteRecipe(id) {
    await firebase.firestore().collection(target).doc(id).delete()
  }

  useEffect(() => {
    document.title = "Receptek"
  })

  return (
    <div key="recipes-container" className="recipes-container">
      {recipes.map((recipe) => {
        return (
          <div key="recipes-container" className="recipe-container">
            <img className="recipe-image"
              src={recipe.imageURL} alt={recipe.name} />
            <h3 className="recipe-name">{recipe.name}</h3>
            <div key="button-container" className="button-container">
              {admin &&
                <>
                  <button data-testid="recipe-edit-button"
                    className="recipe-edit-button"
                    onClick={() =>
                      navigate(`/recept-szerkesztes/${recipe.id}`,
                        { state: { id: recipe.id } })}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button data-testid="recipe-delete-button"
                    className="recipe-delete-button"
                    onClick={() => deleteRecipe(recipe.id)}>
                    <FontAwesomeIcon icon={faRemove} />
                  </button>
                </>
              }
              <button data-testid="recipe-read-button"
                className="recipe-read-button"
                onClick={() => navigate(target === "recipes" ? `/recept/${recipe.id}` : `/varolista/recept/${recipe.id}`,
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