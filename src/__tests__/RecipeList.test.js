import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeList from '../components/RecipeList'
import useRecipes from '../hooks/UseRecipes'
import RecipesFixture from '../fixtures/RecipesFixture'
import FirebaseContext from '../contexts/FirebaseContext'

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
    const firebase = {
      firestore: jest.fn(() => ({
      }))
    };

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <RecipeList />
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-delete-button'))
  })

  it('Megjelenik a receptek listája, szerkesztünk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
      }))
    };

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <RecipeList />
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-edit-button'))

    await waitFor(() => {
      //expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
  })

  it('Megjelenik a receptek listája, olvasunk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
      }))
    };

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <RecipeList />
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-read-button'))

    await waitFor(() => {
      //expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
  })
})