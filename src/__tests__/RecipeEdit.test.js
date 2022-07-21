import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeEdit from '../components/RecipeEdit'
import useRecipe from "../hooks/UseRecipe"
import RecipeFixture from "../fixtures/RecipeFixture"
import { Context as ResponsiveContext } from 'react-responsive'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))
jest.mock('../hooks/UseRecipe')

describe('<RecipeEdit/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Megjelenik a szerkesztő űrlap mobilon', async () => {
    useRecipe.mockImplementation(() => ({ recipe: RecipeFixture }))

    render(
      <Router>
        <ResponsiveContext.Provider value={{ width: 300 }}>
          <RecipeEdit />
        </ResponsiveContext.Provider>
      </Router>
    )
  })

  it('Nem kitölthető a szerkesztő űrlap', async () => {
    useRecipe.mockImplementation(() => ({ recipe: undefined }))

    render(
      <Router>
        <RecipeEdit />
      </Router>
    )
  })

  it('Kitölthető a szerkesztő űrlap', async () => {
    useRecipe.mockImplementation(() => ({ recipe: RecipeFixture }))

    const { getByTestId, findByTestId } = render(
      <Router>
        <RecipeEdit />
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
      target: { value: 0 }
    })
    await fireEvent.change(getByTestId('recipe-img-url'), {
      target: { value: "" }
    })
    fireEvent.click(await findByTestId('recipe-ingredient-add'))
    fireEvent.click(await findByTestId('recipe-step-add'))
    fireEvent.click(await findByTestId('recipe-ingredient-delete-1'))
    fireEvent.click(await findByTestId('recipe-step-delete-1'))
    fireEvent.submit(await findByTestId('recipe-form-submit'))

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
  })
})