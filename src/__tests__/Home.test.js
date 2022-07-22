import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../components/Home'
import useRecipes from '../hooks/UseRecipes'
import RecipesFixture from '../fixtures/RecipesFixture'
import { Context as ResponsiveContext } from 'react-responsive'

jest.mock('../hooks/UseRecipes')

describe('<Home/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Megjelenik a kezdőlap mobilon', async () => {
    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    render(
      <Router>
        <ResponsiveContext.Provider value={{ width: 300 }}>
          <Home />
        </ResponsiveContext.Provider>
      </Router>
    )
  })

  it('Továbblépünk a receptek listájára', async () => {
    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <Home />
      </Router>
    )

    await fireEvent.click(getByTestId('go-to-recipes'))
  })
})