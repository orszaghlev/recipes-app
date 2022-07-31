import { render, fireEvent, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeList from '../components/RecipeList'
import useRecipes from '../hooks/UseRecipes'
import RecipesFixture from '../fixtures/RecipesFixture'
import FirebaseContext from '../contexts/FirebaseContext'
import AdminContext from "../contexts/AdminContext"
import { Context as ResponsiveContext } from 'react-responsive'

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

  it('Üres a lista', async () => {
    const firebase = {}
    const admin = {
      uid: process.env.REACT_APP_FIREBASE_ADMIN_UID,
      displayName: 'admin'
    }

    useRecipes.mockImplementation(() => ({ recipes: [] }))

    render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <AdminContext.Provider value={admin}>
            <ResponsiveContext.Provider value={{ width: 300 }}>
              <RecipeList target="backlog" admin={admin} />
            </ResponsiveContext.Provider>
          </AdminContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )
  })

  it('Megjelenik a várólista, publikálunk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            set: jest.fn(() => Promise.resolve('Recept publikálva'))
          }))
        }))
      }))
    }
    const admin = {
      uid: process.env.REACT_APP_FIREBASE_ADMIN_UID,
      displayName: 'admin'
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId, findByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <AdminContext.Provider value={admin}>
            <RecipeList target="backlog" admin={admin} />
          </AdminContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )

    await act(async () => {
      fireEvent.click(getByTestId('recipe-move-button'))
      //fireEvent.click(await findByTestId('move-recipe-move-button'))
    })
  })

  it('Megjelenik a várólista, mégsem publikálunk', async () => {
    const firebase = {}
    const admin = {
      uid: process.env.REACT_APP_FIREBASE_ADMIN_UID,
      displayName: 'admin'
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId, findByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <AdminContext.Provider value={admin}>
            <RecipeList target="backlog" admin={admin} />
          </AdminContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )

    await act(async () => {
      fireEvent.click(getByTestId('recipe-move-button'))
      //fireEvent.click(await findByTestId('move-recipe-return-button'))
    })
  })

  it('Megjelenik a várólista, törlünk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          doc: jest.fn(() => ({
            delete: jest.fn(() => Promise.resolve('Recept törölve'))
          }))
        }))
      }))
    }
    const admin = {
      uid: process.env.REACT_APP_FIREBASE_ADMIN_UID,
      displayName: 'admin'
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId, findByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <AdminContext.Provider value={admin}>
            <RecipeList target="backlog" admin={admin} />
          </AdminContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )

    await act(async () => {
      fireEvent.click(getByTestId('recipe-delete-button'))
      //fireEvent.click(await findByTestId('delete-recipe-delete-button'))
    })
  })

  it('Megjelenik a receptek listája, mégsem törlünk', async () => {
    const firebase = {}
    const admin = {
      uid: process.env.REACT_APP_FIREBASE_ADMIN_UID,
      displayName: 'admin'
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId, findByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <AdminContext.Provider value={admin}>
            <RecipeList target="recipes" admin={admin} />
          </AdminContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )

    await act(async () => {
      fireEvent.click(getByTestId('recipe-delete-button'))
      //fireEvent.click(await findByTestId('delete-recipe-return-button'))
    })
  })

  it('Megjelenik a várólista, szerkesztünk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
      }))
    }
    const admin = {
      uid: process.env.REACT_APP_FIREBASE_ADMIN_UID,
      displayName: 'admin'
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <AdminContext.Provider value={admin}>
            <RecipeList target="backlog" admin={admin} />
          </AdminContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-edit-button'))
  })

  it('Megjelenik a receptek listája, szerkesztünk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
      }))
    }
    const admin = {
      uid: process.env.REACT_APP_FIREBASE_ADMIN_UID,
      displayName: 'admin'
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <AdminContext.Provider value={admin}>
            <RecipeList target="recipes" admin={admin} />
          </AdminContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-edit-button'))
  })

  it('Megjelenik a várólista, olvasunk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
      }))
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <RecipeList target="backlog" />
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-read-button'))
  })

  it('Megjelenik a receptek listája, olvasunk', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
      }))
    }

    useRecipes.mockImplementation(() => ({ recipes: RecipesFixture }))

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={firebase}>
          <RecipeList target="recipes" />
        </FirebaseContext.Provider>
      </Router>
    )

    await fireEvent.click(getByTestId('recipe-read-button'))
  })
})