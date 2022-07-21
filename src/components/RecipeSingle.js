import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from "react-responsive"
import useRecipe from "../hooks/UseRecipe"

export default function RecipeSingle() {
  const { recipe } = useRecipe()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  return (
    <div className="single-recipe-container">
      {typeof recipe !== "undefined"}
      <div className="single-recipe-title-container">
        <h1 className="single-recipe-title">{recipe.name}</h1>
        <img className="recipe-image"
          src={recipe.imageURL} alt={recipe.name} />
      </div>
      <h2 className="ingredients-title">Hozzávalók: </h2>
      <div>
        <ul className="ingredients">
          {recipe.ingredients.map((ingredient) => {
            return (
              <li key={ingredient.name} className={isTabletOrMobile
                ? "ingredient-mobile" : "ingredient"}>
                {ingredient.name} ({ingredient.quantity})
              </li>
            )
          })}
        </ul>
      </div>
      <h2 className="steps-title">Elkészítés: </h2>
      <div>
        <ul className="steps">
          {recipe.steps.map((step) => {
            return (
              <li key={step.content} className={isTabletOrMobile
                ? "step-mobile" : "step"}>
                {step.content} ({!isTabletOrMobile
                  && <FontAwesomeIcon className="clock"
                    icon={faClock} />}{step.timer} perc)
              </li>
            )
          })}
        </ul>
      </div>
      {recipe === {} && <p>ASD</p>}
    </div>
  )
}