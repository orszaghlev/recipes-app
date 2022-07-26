import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEye, faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../contexts/FirebaseContext'
import useRecipes from "../hooks/UseRecipes"
import Modal from 'react-modal'
import * as ROUTES from "../constants/Routes"

export default function RecipeList({ target, admin }) {
  const { firebase } = useContext(FirebaseContext)
  const { recipes } = useRecipes(target)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [currentRecipeName, setCurrentRecipeName] = useState("")
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '200px',
      width: '600px'
    },
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleModalClick(recipeName) {
    setCurrentRecipeName(recipeName)
    openModal()
  }

  async function deleteRecipe(id) {
    await firebase.firestore().collection(target).doc(id).delete()
    closeModal()
    window.location.reload()
  }

  async function handleMove(recipe) {
    const data = {
      id: recipe.id,
      name: recipe.name,
      slug: recipe.slug,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      imageURL: recipe.imageURL
    }
    await firebase.firestore().collection("recipes").doc(recipe.id).set(data)
    await firebase.firestore().collection("backlog").doc(recipe.id).delete()
    navigate(ROUTES.RECIPE_LIST)
  }

  useEffect(() => {
    document.title = target === "recipes" ? "Receptek" : "Várólista"
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
                  {target === "backlog" &&
                    <>
                      <button data-testid="recipe-move-button"
                        className="recipe-move-button"
                        onClick={handleMove(recipe)}>
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </>
                  }
                  <button data-testid="recipe-edit-button"
                    className="recipe-edit-button"
                    onClick={() =>
                      navigate(target === "recipes" ? `/recept-szerkesztes/${recipe.id}`
                        : `/varolista/recept-szerkesztes/${recipe.id}`,
                        { state: { id: recipe.id } })}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button data-testid="recipe-delete-button"
                    className="recipe-delete-button"
                    onClick={() => handleModalClick(recipe.name)}>
                    <FontAwesomeIcon icon={faRemove} />
                  </button>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Recept törlése"
                  >
                    <h2>Biztosan törölni szeretné a(z) "{currentRecipeName}" receptet?</h2>
                    <button className="delete-recipe-delete-button" data-testid="delete-recipe-delete-button"
                      onClick={() => deleteRecipe(recipe.id)}>Törlés</button>
                    <button className="delete-recipe-return-button" data-testid="delete-recipe-return-button"
                      onClick={closeModal}>Vissza</button>
                  </Modal>
                </>
              }
              <button data-testid="recipe-read-button"
                className="recipe-read-button"
                onClick={() => navigate(target === "recipes" ? `/recept/${recipe.id}`
                  : `/varolista/recept/${recipe.id}`,
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