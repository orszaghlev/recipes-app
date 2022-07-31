import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faCheckCircle } from
  '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import FirebaseContext from '../contexts/FirebaseContext'
import useRecipe from "../hooks/UseRecipe"
import Spinner from './Spinner'
import slugify from 'react-slugify'
import * as ROUTES from "../constants/Routes"

export default function RecipeEdit({ target }) {
  const { firebase } = useContext(FirebaseContext)
  const { recipe } = useRecipe(target)
  const [ingredients, setIngredients] = useState()
  const [steps, setSteps] = useState()
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  async function editRecipe(event) {
    event.preventDefault()
    const data = {
      id: recipe.id,
      name: event.target.elements.name.value,
      slug: slugify(event.target.elements.name.value),
      ingredients: ingredients,
      steps: steps,
      imageURL: event.target.elements.imageURL.value
    }
    await firebase.firestore().collection(target).doc(data.id).set(data)
    target === "recipes" ? navigate(ROUTES.RECIPE_LIST)
      : navigate(ROUTES.BACKLOG_LIST)
  }

  useEffect(() => {
    if (typeof recipe !== "undefined") {
      setIngredients(recipe.ingredients)
      setSteps(recipe.steps)
      document.title = `${recipe.name} szerkesztése`
    }
  }, [recipe])

  return (
    <>
      {typeof recipe === "undefined" && <Spinner />}
      {typeof recipe !== "undefined" && typeof ingredients !== "undefined"
        && typeof steps !== "undefined" &&
        <>
          <div key={isTabletOrMobile ? "recipe-create-container-mobile"
            : "recipe-create-container"}
            className={isTabletOrMobile ? "recipe-create-container-mobile"
              : "recipe-create-container"}>
            <h1 className="recipe-create-title">Recept szerkesztése:</h1>
            <hr className={isTabletOrMobile ? "hr-mobile" : "hr"} />
            <form data-testid="recipe-form-submit" onSubmit={editRecipe}
              className="recipe-form">
              <div key="input-row-name" className="input-row">
                <label>Név:</label>
                <input
                  data-testid="recipe-name"
                  style={{ marginTop: "10px" }}
                  className={isTabletOrMobile ? "input-name-mobile"
                    : "input-name"} type="text" id="name"
                  name="name" defaultValue={recipe.name} />
              </div>
              <div key="input-row-ingredients" className="input-row">
                <label>Hozzávalók:</label>
                {ingredients.map((ingredient, i) => (
                  <div key={"input-row-ingredient-" + i}
                    className="input-row-ingredient">
                    <input data-testid={"recipe-ingredient-name-" + i}
                      style={isTabletOrMobile ? { width: "70px" }
                        : { width: "200px" }}
                      placeholder="Név" defaultValue={ingredient.name}
                      className={isTabletOrMobile
                        ? "input-ingredient-mobile" : "input-ingredient"}
                      type="text" id={"ingredient-name-" + i}
                      name={"ingredient-name-" + i} onChange={(event) => {
                        event.persist()
                        setIngredients((prev) => {
                          const next = [...prev]
                          next[i].name = event.target.value
                          return next
                        })
                      }} />
                    <input
                      data-testid={"recipe-ingredient-quantity-" + i}
                      style={isTabletOrMobile ? { width: "50px" } :
                        { width: "100px" }}
                      placeholder="Mennyiség"
                      defaultValue={ingredient.quantity}
                      className={isTabletOrMobile ?
                        "input-ingredient-mobile" : "input-ingredient"}
                      type="text" id={"ingredient-quantity-" + i}
                      name={"ingredient-quantity-" + i}
                      onChange={(event) => {
                        event.persist()
                        setIngredients((prev) => {
                          const next = [...prev]
                          next[i].quantity = event.target.value
                          return next
                        })
                      }} />
                    <select
                      data-testid={"recipe-ingredient-type-" + i}
                      style={isTabletOrMobile ? { width: "50px" }
                        : { width: "100px" }}
                      placeholder="Típus" defaultValue={ingredient.type}
                      className={isTabletOrMobile ?
                        "input-ingredient-mobile"
                        : "input-ingredient"}
                      id={"ingredient-type-" + i}
                      name={"ingredient-type-" + i} onChange={(event) => {
                        event.persist()
                        setIngredients((prev) => {
                          const next = [...prev]
                          next[i].type = event.target.value
                          return next
                        })
                      }} >
                      <option value="type" default disabled>Típus</option>
                      <option value="meat">Hús</option>
                      <option value="drink">Ital</option>
                      <option value="dairy">Tejtermék</option>
                      <option value="fruit">Gyümölcs</option>
                      <option value="spice">Fűszer</option>
                      <option value="cooking">Egyéb</option>
                    </select>
                    <button data-testid={"recipe-ingredient-delete-" + i}
                      type="button" className={isTabletOrMobile ?
                        "trash-button-mobile" : "trash-button"}
                      onClick={() => {
                        setIngredients(prev => {
                          const next = prev.slice()
                          next.splice(i, 1)
                          return next
                        })
                      }}><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                ))}
                <button
                  data-testid="recipe-ingredient-add"
                  type="button" className={isTabletOrMobile
                    ? "plus-button-mobile" : "plus-button"}
                  onClick={() => {
                    setIngredients(prev => {
                      return [
                        ...prev, {
                          name: "",
                          quantity: "",
                          type: ""
                        }]
                    })
                  }}><FontAwesomeIcon icon={faPlus} /></button>
              </div>
              <div key="input-row-steps" className="input-row">
                <label>Előkészítés:</label>
                {steps.map((step, i) => (
                  <div key={"input-row-step-" + i}>
                    <input
                      data-testid={"recipe-step-content-" + i}
                      style={isTabletOrMobile ? { width: "105px" }
                        : { width: "350px" }}
                      placeholder={`${i + 1}. lépés`}
                      defaultValue={step.content}
                      className=
                      {isTabletOrMobile ? "input-ingredient-mobile"
                        : "input-ingredient"} type="text"
                      id={"steps-content-" + i}
                      name={"steps-content-" + i} onChange={(event) => {
                        event.persist()
                        setSteps((prev) => {
                          const next = [...prev]
                          next[i].content = event.target.value
                          return next
                        })
                      }} />
                    <input
                      data-testid={"recipe-step-timer-" + i}
                      style={isTabletOrMobile ? { width: "52.5px" }
                        : { width: "100px" }} placeholder="Idő"
                      defaultValue={step.timer}
                      className="input-ingredient"
                      type="number" id={"steps-timer-" + i}
                      name={"steps-timer-" + i} onChange={(event) => {
                        event.persist()
                        setSteps((prev) => {
                          const next = [...prev]
                          next[i].timer = event.target.value
                          return next
                        })
                      }} />
                    <button
                      data-testid={"recipe-step-delete-" + i}
                      className={isTabletOrMobile
                        ? "trash-button-mobile-two" : "trash-button"}
                      type="button" onClick={() => {
                        setSteps(prev => {
                          const next = prev.slice()
                          next.splice(i, 1)
                          return next
                        })
                      }}><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                ))
                }
                <button
                  data-testid="recipe-step-add"
                  className={isTabletOrMobile ? "plus-button-mobile"
                    : "plus-button"} type="button"
                  onClick={() => {
                    setSteps(prev => {
                      return [
                        ...prev, {
                          content: "",
                          timer: ""
                        }]
                    })
                  }}><FontAwesomeIcon icon={faPlus} /></button>
              </div>
              <div key="input-row-imageURL" className="input-row">
                <label>Kép:</label>
                <input
                  data-testid="recipe-imageURL"
                  style={{ marginTop: "10px" }}
                  className={isTabletOrMobile ? "input-name-mobile"
                    : "input-name"} type="text"
                  id="imageURL" name="imageURL"
                  defaultValue={recipe.imageURL} />
                <img className={isTabletOrMobile
                  ? "input-row-img-src-mobile" : "input-row-img-src"}
                  src={recipe.imageURL} alt={recipe.name}
                />
              </div>
              <button className={isTabletOrMobile ? "check-button-mobile"
                : "check-button"} type="submit">
                Küldés <FontAwesomeIcon icon={faCheckCircle} />
              </button>
            </form>
          </div>
        </>
      }
    </>
  )
}