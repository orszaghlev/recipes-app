import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeSingle from '../components/RecipeSingle'
import useRecipe from '../hooks/UseRecipe'
import RecipeFixture from '../fixtures/RecipeFixture'
import { Context as ResponsiveContext } from 'react-responsive'
import RecipeWithNoIngredientsAndStepsFixture
  from '../fixtures/RecipeWithNoIngredientsAndStepsFixture'

jest.mock('../hooks/UseRecipe')

describe('<RecipeSingle/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Megjelenik a recept mobilon', async () => {
    useRecipe.mockImplementation(() => ({ recipe: RecipeFixture }))

    render(
      <Router>
        <ResponsiveContext.Provider value={{ width: 300 }}>
          <RecipeSingle />
        </ResponsiveContext.Provider>
      </Router>
    )
  })

  it('Megjelenik a recept asztali eszközön', async () => {
    useRecipe.mockImplementation(() => ({ recipe: RecipeFixture }))

    render(
      <Router>
        <RecipeSingle />
      </Router>
    )
  })

  it('Nem jelenik meg a recept', async () => {
    useRecipe.mockImplementation(() => ({ recipe: undefined }))

    render(
      <Router>
        <RecipeSingle />
      </Router>
    )
  })

  it('Nem jelennek meg a hozzávalók és az elkészítés lépései',
    async () => {
      useRecipe.mockImplementation(() => ({
        recipe:
          RecipeWithNoIngredientsAndStepsFixture
      }))

      render(
        <Router>
          <RecipeSingle />
        </Router>
      )
    })
})