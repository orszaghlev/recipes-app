import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import useRecipes from "../hooks/UseRecipes"
import * as ROUTES from '../constants/Routes'

export default function Home() {
  const { recipes } = useRecipes()
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  return (
    <div className={isTabletOrMobile ? "home-container-mobile"
      : "home-container"}>
      <h1 className="home-title">Üdv a recept appban</h1>
      <p>Jelenleg {recipes.length} recept érhető el</p>
      <button data-testid="go-to-recipes" className="home-button"
        onClick={() => navigate(ROUTES.RECIPE_LIST)}>
        Tovább <FontAwesomeIcon icon={faArrowCircleRight} />
      </button>
    </div>
  )
}