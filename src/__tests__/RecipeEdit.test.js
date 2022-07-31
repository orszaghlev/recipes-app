import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeEdit from '../components/RecipeEdit'
import useRecipe from "../hooks/UseRecipe"
import RecipeFixture from "../fixtures/RecipeFixture"
import FirebaseContext from '../contexts/FirebaseContext'
import { Context as ResponsiveContext } from 'react-responsive'

const mockedNavigator = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator
}))
jest.mock('../hooks/UseRecipe')

describe('<RecipeEdit/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Megjelenik a szerkesztő űrlap mobilon', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn().mockReturnThis(),
          set: jest.fn(() => Promise.resolve('Bejegyzés szerkesztve'))
        }))
      })),
      auth: jest.fn(() => ({
      }))
    }
    useRecipe.mockImplementation(() => ({ recipe: RecipeFixture }))

    render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <ResponsiveContext.Provider value={{ width: 300 }}>
            <RecipeEdit />
          </ResponsiveContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )
  })

  it('Nem kitölthető a szerkesztő űrlap', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn().mockReturnThis(),
          set: jest.fn(() => Promise.resolve('Bejegyzés szerkesztve'))
        }))
      })),
      auth: jest.fn(() => ({
      }))
    }
    useRecipe.mockImplementation(() => ({ recipe: undefined }))

    render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <RecipeEdit />
        </FirebaseContext.Provider>
      </Router>
    )
  })

  it('Kitölthető a szerkesztő űrlap', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn().mockReturnThis(),
          set: jest.fn(() => Promise.resolve('Bejegyzés szerkesztve'))
        }))
      })),
      auth: jest.fn(() => ({
      }))
    }
    useRecipe.mockImplementation(() => ({ recipe: RecipeFixture }))

    const { getByTestId, findByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <RecipeEdit target="recipes" />
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.change(getByTestId('recipe-name'), {
      target: { value: 'Rostélyos sült' }
    })
    await fireEvent.change(getByTestId('recipe-ingredient-name-1'), {
      target: { value: 'marha sült' }
    })
    await fireEvent.change(getByTestId('recipe-ingredient-quantity-1'), {
      target: { value: 1 }
    })
    await fireEvent.change(getByTestId('recipe-ingredient-type-1'), {
      target: { value: "meat" }
    })
    await fireEvent.change(getByTestId('recipe-step-content-1'), {
      target: { value: "Helyezzük a marhapörköltet a cserépbe." }
    })
    await fireEvent.change(getByTestId('recipe-step-timer-1'), {
      target: { value: 1 }
    })
    await fireEvent.change(getByTestId('recipe-imageURL'), {
      target: { value: "picVfzLZo.jpg" }
    })
    fireEvent.click(await findByTestId('recipe-ingredient-add'))
    fireEvent.click(await findByTestId('recipe-step-add'))
    fireEvent.click(await findByTestId('recipe-ingredient-delete-1'))
    fireEvent.click(await findByTestId('recipe-step-delete-1'))
    fireEvent.submit(await findByTestId('recipe-form-submit'))
  })

  it('Kitölthető a szerkesztő űrlap a várólistán', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn().mockReturnThis(),
          set: jest.fn(() => Promise.resolve('Bejegyzés szerkesztve'))
        }))
      })),
      auth: jest.fn(() => ({
      }))
    }
    useRecipe.mockImplementation(() => ({ recipe: RecipeFixture }))

    const { getByTestId, findByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <RecipeEdit target="backlog" />
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.change(getByTestId('recipe-name'), {
      target: { value: 'Rostélyos sült' }
    })
    fireEvent.submit(await findByTestId('recipe-form-submit'))
  })
})