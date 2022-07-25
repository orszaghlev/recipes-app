import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import useRecipes from "../hooks/UseRecipes"
import * as ROUTES from '../constants/Routes'
import { useEffect } from 'react'

export default function Home() {
  const { recipes } = useRecipes('recipes')
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  useEffect(() => {
    document.title = "Recept App"
  })

  return (
    <div className={isTabletOrMobile ? "home-container-mobile"
      : "home-container"}>
      <h1 className="home-title">Üdv a Recept App-ban!</h1>
      <p>Jelenleg {recipes.length} recept érhető el</p>
      <button data-testid="go-to-recipes" className="home-button"
        onClick={() => navigate(ROUTES.RECIPE_LIST)}>
        Tovább <FontAwesomeIcon icon={faArrowCircleRight} />
      </button>
    </div>
  )
}