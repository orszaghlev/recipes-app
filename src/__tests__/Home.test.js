import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../components/Home'
import useRecipes from '../hooks/UseRecipes'
import RecipesFixture from '../fixtures/RecipesFixture'
import { Context as ResponsiveContext } from 'react-responsive'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))
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

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
  })
})