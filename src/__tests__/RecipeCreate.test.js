import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RecipeCreate from '../components/RecipeCreate'
import { Context as ResponsiveContext } from 'react-responsive'

const mockedNavigator = jest.fn()

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => mockedNavigator,
}));

describe('<RecipeCreate/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Megjelenik az űrlap mobilon', async () => {
    render(
      <Router>
        <ResponsiveContext.Provider value={{ width: 300 }}>
          <RecipeCreate />
        </ResponsiveContext.Provider>
      </Router>
    )
  })

  it('Kitölthető az űrlap', async () => {
    const { getByTestId, findByTestId } = render(
      <Router>
        <RecipeCreate />
      </Router>
    )

    await fireEvent.change(getByTestId('recipe-name'), {
      target: { value: 'Rostélyos sült' }
    })
    await fireEvent.change(getByTestId('recipe-ingredient-name'), {
      target: { value: 'marha sült' }
    })
    await fireEvent.change(getByTestId('recipe-ingredient-quantity'), {
      target: { value: 1 }
    })
    await fireEvent.change(getByTestId('recipe-ingredient-type'), {
      target: { value: "meat" }
    })
    await fireEvent.change(getByTestId('recipe-step-content'), {
      target: { value: "Helyezzük a marhapörköltet a cserépbe." }
    })
    await fireEvent.change(getByTestId('recipe-step-timer'), {
      target: { value: 0 }
    })
    await fireEvent.change(getByTestId('recipe-imageURL'), {
      target: { value: "picVfzLZo.jpg" }
    })
    fireEvent.click(await findByTestId('recipe-ingredient-delete'))
    fireEvent.click(await findByTestId('recipe-step-delete'))
    fireEvent.click(await findByTestId('recipe-ingredient-add'))
    fireEvent.click(await findByTestId('recipe-step-add'))
    fireEvent.submit(await findByTestId('recipe-form-submit'))

    await waitFor(() => {
      //expect(mockedNavigator).toHaveBeenCalledWith('/receptek')
    })
  })
})