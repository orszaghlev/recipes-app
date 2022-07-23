import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from "react-responsive"
import useRecipeFromBacklog from '../hooks/UseRecipeFromBacklog'
import Spinner from './Spinner'

export default function RecipeFromBacklog() {
  const { recipeFromBacklog } = useRecipeFromBacklog()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  return (
    <div className="single-recipe-container">
      {typeof recipeFromBacklog === "undefined" && <Spinner />}
      {typeof recipeFromBacklog !== "undefined" &&
        <>
          <div className="single-recipe-title-container">
            <h1 className="single-recipe-title">{recipeFromBacklog.name}</h1>
            <img className="recipe-image"
              src={recipeFromBacklog.imageURL} alt={recipeFromBacklog.name} />
          </div>
          {recipeFromBacklog.ingredients.length === 0 ? "" :
            <>
              <h2 className="ingredients-title">Hozzávalók:</h2>
              <div>
                <ul className="ingredients">
                  {recipeFromBacklog.ingredients.map((ingredient) => {
                    return (
                      <li key={ingredient.name} className={isTabletOrMobile
                        ? "ingredient-mobile" : "ingredient"}>
                        {ingredient.name} ({ingredient.quantity})
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          }
          {recipeFromBacklog.steps.length === 0 ? "" :
            <>
              <h2 className="steps-title">Elkészítés:</h2>
              <div>
                <ul className="steps">
                  {recipeFromBacklog.steps.map((step) => {
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
            </>
          }
        </>
      }
    </div>
  )
}