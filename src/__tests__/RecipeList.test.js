import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeList from '../components/RecipeList'
import useRecipes from '../hooks/UseRecipes'
import RecipesFixture from '../fixtures/RecipesFixture'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))
jest.mock('../hooks/UseRecipes')

describe('<RecipeList/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Megjelenik a receptek listája, törlünk', async () => {
    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <RecipeList />
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-delete-button'))

    await waitFor(() => {
      expect(window.location.reload).toHaveBeenCalledTimes(1)
    })
  })

  it('Megjelenik a receptek listája, szerkesztünk', async () => {
    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <RecipeList />
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-edit-button'))

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
  })

  it('Megjelenik a receptek listája, olvasunk', async () => {
    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <RecipeList />
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-read-button'))

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
  })
})