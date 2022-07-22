import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faCheckCircle } from
  '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../lib/Firebase"
import { v4 as uuidv4 } from 'uuid'
import slugify from 'react-slugify'

export default function RecipeCreate() {
  const id = uuidv4()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([{
    name: "",
    quantity: "",
    type: ""
  }])
  const [steps, setSteps] = useState([{
    content: "",
    timer: ""
  }])
  const [imageURL, setImageURL] = useState("")
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  async function createRecipe(event) {
    event.preventDefault()
    await setDoc(doc(db, 'recipes', id), {
      id: id,
      name: name,
      slug: slugify(name),
      ingredients: ingredients,
      steps: steps,
      imageURL: imageURL
    })
    navigate("/receptek")
  }

  return (
    <div key={isTabletOrMobile ? "recipe-create-container-mobile"
      : "recipe-create-container"}
      className={isTabletOrMobile ? "recipe-create-container-mobile"
        : "recipe-create-container"}>
      <h1 className="recipe-create-title">Új recept:</h1>
      <hr className={isTabletOrMobile ? "hr-mobile" : "hr"} />
      <form data-testid="recipe-form-submit" onSubmit={createRecipe}
        className="recipe-form">
        <div key="input-row-name" className="input-row">
          <label>Név:</label>
          <input data-testid="recipe-name" style={{ marginTop: "10px" }}
            className={isTabletOrMobile ? "input-name-mobile"
              : "input-name"} type="text" id="name" name="name"
            value={name} onChange={(event) => {
              setName(event.target.value);
            }} />
        </div>
        <div key="input-row-ingredients" className="input-row">
          <label>Hozzávalók:</label>
          {ingredients.map((ingredient, i) => (
            <div key="input-row-ingredient"
              className="input-row-ingredient">
              <input data-testid="recipe-ingredient-name"
                style={isTabletOrMobile ? { width: "70px" }
                  : { width: "200px" }}
                placeholder="Név" value={ingredient.name}
                className={isTabletOrMobile ? "input-ingredient-mobile"
                  : "input-ingredient"}
                type="text"
                id={"ingredient-name-" + i} name={"ingredient-name-" + i}
                onChange={(event) => {
                  event.persist()
                  setIngredients((prev) => {
                    const next = [...prev]
                    next[i].name = event.target.value
                    return next
                  })
                }} />
              <input data-testid="recipe-ingredient-quantity"
                style={isTabletOrMobile ? { width: "50px" } :
                  { width: "100px" }}
                placeholder="Mennyiség" value={ingredient.quantity}
                className={isTabletOrMobile ? "input-ingredient-mobile"
                  : "input-ingredient"} type="text"
                id={"ingredient-quantity-" + i}
                name={"ingredient-quantity-" + i} onChange={(event) => {
                  event.persist()
                  setIngredients((prev) => {
                    const next = [...prev]
                    next[i].quantity = event.target.value
                    return next
                  })
                }} />
              <select data-testid="recipe-ingredient-type"
                style={isTabletOrMobile ? { width: "50px" }
                  : { width: "100px" }}
                placeholder="Típus" value={ingredient.type}
                className={isTabletOrMobile ? "input-ingredient-mobile"
                  : "input-ingredient"} id={"ingredient-type-" + i}
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
              <button data-testid="recipe-ingredient-delete"
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
          <button data-testid="recipe-ingredient-add"
            className={isTabletOrMobile ? "plus-button-mobile"
              : "plus-button"} type="button" onClick={() => {
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
            <div key={"input-row-step" + i}>
              <input
                data-testid="recipe-step-content"
                style={isTabletOrMobile ? { width: "105px" }
                  : { width: "350px" }} placeholder={`${i + 1}. lépés`}
                value={step.content} className=
                {isTabletOrMobile ? "input-ingredient-mobile"
                  : "input-ingredient"}
                type="text" id={"steps-content-" + i}
                name={"steps-content-" + i} onChange={(event) => {
                  event.persist()
                  setSteps((prev) => {
                    const next = [...prev]
                    next[i].content = event.target.value
                    return next
                  })
                }} />
              <input
                data-testid="recipe-step-timer"
                style={isTabletOrMobile ? { width: "52.5px" }
                  : { width: "100px" }}
                placeholder="Idő" value={step.timer}
                className="input-ingredient" type="number"
                id={"steps-timer-" + i} name={"steps-timer-" + i}
                onChange={(event) => {
                  event.persist()
                  setSteps((prev) => {
                    const next = [...prev]
                    next[i].timer = event.target.value
                    return next
                  })
                }} />
              <button
                data-testid="recipe-step-delete"
                className={isTabletOrMobile ? "trash-button-mobile-two"
                  : "trash-button"} type="button" onClick={() => {
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
              : "plus-button"} type="button" onClick={() => {
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
            data-testid="recipe-imageURL" style={{ marginTop: "10px" }}
            className={isTabletOrMobile ? "input-name-mobile"
              : "input-name"} type="text" id="imageURL"
            name="imageURL"
            value={imageURL} onChange={(event) => {
              setImageURL(event.target.value);
            }} />
        </div>
        <button className={isTabletOrMobile ? "check-button-mobile"
          : "check-button"} type="submit">
          Küldés <FontAwesomeIcon icon={faCheckCircle} />
        </button>
      </form>
    </div>
  )
}