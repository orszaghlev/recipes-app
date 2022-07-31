import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEye, faPen, faCheck }
  from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import { useMediaQuery } from "react-responsive"
import FirebaseContext from '../contexts/FirebaseContext'
import useRecipes from "../hooks/UseRecipes"
import Modal from 'react-modal'
import Spinner from "./Spinner"
import * as ROUTES from "../constants/Routes"

export default function RecipeList({ target, admin }) {
  const { firebase } = useContext(FirebaseContext)
  const { recipes } = useRecipes(target)
  const navigate = useNavigate()
  const [isOpenForDelete, setIsOpenForDelete] = useState(false)
  const [isOpenForMove, setIsOpenForMove] = useState(false)
  const [currentRecipe, setCurrentRecipe] = useState({})
  const isTabletOrMobile = useMediaQuery({ maxWidth: 500 })
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: isTabletOrMobile ? '250px' : '500px',
    },
  }

  function openModalForDelete() {
    setIsOpenForDelete(true)
  }

  function openModalForMove() {
    setIsOpenForMove(true)
  }

  function closeModalForDelete() {
    setIsOpenForDelete(false)
  }

  function closeModalForMove() {
    setIsOpenForMove(false)
  }

  function handleModalClickForDelete(recipe) {
    setCurrentRecipe(recipe)
    openModalForDelete()
  }

  function handleModalClickForMove(recipe) {
    setCurrentRecipe(recipe)
    openModalForMove()
  }

  async function deleteRecipe(id) {
    await firebase.firestore().collection(target).doc(id).delete()
    closeModalForDelete()
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
    await firebase.firestore().collection("recipes").doc(recipe.id)
      .set(data)
    await firebase.firestore().collection("backlog").doc(recipe.id)
      .delete()
    closeModalForMove()
    navigate(ROUTES.HOME)
  }

  useEffect(() => {
    document.title = target === "recipes" ? "Receptek" : "Várólista"
  })

  return (
    <>
      {recipes.length === 0 && <Spinner />}
      {recipes.length !== 0 && <h2 style={{
        display: "flex", justifyContent: "center", fontSize: "32px"
      }}>{document.title}</h2>}
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
                          onClick={() => handleModalClickForMove(recipe)}>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <Modal
                          isOpen={isOpenForMove}
                          onRequestClose={closeModalForMove}
                          style={customStyles}
                          ariaHideApp={false}
                          contentLabel="Recept publikálása"
                        >
                          <h2>Biztosan publikálni szeretné a(z)
                            "{currentRecipe.name}" receptet?</h2>
                          <button className="move-recipe-move-button"
                            data-testid="move-recipe-move-button"
                            onClick={() => handleMove(currentRecipe)}>
                            Publikálás</button>
                          <button className="move-recipe-return-button"
                            data-testid="move-recipe-return-button"
                            onClick={closeModalForMove}>Vissza</button>
                        </Modal>
                      </>
                    }
                    <button data-testid="recipe-edit-button"
                      className="recipe-edit-button"
                      onClick={() =>
                        navigate(target === "recipes"
                          ? `/recept-szerkesztes/${recipe.id}`
                          : `/varolista/recept-szerkesztes/${recipe.id}`,
                          { state: { id: recipe.id } })}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button data-testid="recipe-delete-button"
                      className="recipe-delete-button"
                      onClick={() => handleModalClickForDelete(recipe)}>
                      <FontAwesomeIcon icon={faRemove} />
                    </button>
                    <Modal
                      isOpen={isOpenForDelete}
                      onRequestClose={closeModalForDelete}
                      style={customStyles}
                      ariaHideApp={false}
                      contentLabel="Recept törlése"
                    >
                      <h2>Biztosan törölni szeretné a(z)
                        "{currentRecipe.name}" receptet?</h2>
                      <button className="delete-recipe-delete-button"
                        data-testid="delete-recipe-delete-button"
                        onClick={() => deleteRecipe(currentRecipe.id)}>
                        Törlés</button>
                      <button className="delete-recipe-return-button"
                        data-testid="delete-recipe-return-button"
                        onClick={closeModalForDelete}>Vissza</button>
                    </Modal>
                  </>
                }
                <button data-testid="recipe-read-button"
                  className="recipe-read-button"
                  onClick={() => navigate(target === "recipes"
                    ? `/recept/${recipe.id}`
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
    </>
  )
}