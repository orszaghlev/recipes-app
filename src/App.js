import './App.css'
import { BrowserRouter as Router, Routes, Route, Link }
  from "react-router-dom"
import { UserContext } from "./contexts/UserContext"
import Home from "./components/Home"
import RecipeCreate from "./components/RecipeCreate"
import RecipeEdit from "./components/RecipeEdit"
import RecipeList from "./components/RecipeList"
import RecipeSingle from "./components/RecipeSingle"
import Admin from "./components/Admin"
import RecipeFromBacklog from './components/RecipeFromBacklog'
import RecipeEditFromBacklog from './components/RecipeEditFromBacklog'
import * as ROUTES from './constants/Routes'

function App() {
  const logo = require("./data/images/logo.png")

  return (
    <Router>
      <div>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">
                <button className="link">
                  <img className="logo" src={logo} alt="Logo" />
                </button>
              </Link>
            </li>
            <li>
              <Link to="/receptek">
                <button className="link">Receptek</button>
              </Link>
            </li>
            <li>
              <Link to="/uj-recept">
                <button className="link">Új recept</button>
              </Link>
            </li>
          </ul>
        </nav>
        <UserContext>
          <Routes>
            <Route path={ROUTES.RECIPE_CREATE} element={<RecipeCreate />} />
            <Route path={ROUTES.RECIPE_EDIT} element={<RecipeEdit />} />
            <Route path={ROUTES.RECIPE_SINGLE} element={<RecipeSingle />} />
            <Route path={ROUTES.RECIPE_LIST} element={<RecipeList />} />
            <Route path={ROUTES.BACKLOG} element={<Admin />} />
            <Route path={ROUTES.RECIPE_FROM_BACKLOG} element={<RecipeFromBacklog />} />
            <Route path={ROUTES.RECIPE_EDIT_FROM_BACKLOG} element={<RecipeEditFromBacklog />} />
            <Route path={ROUTES.HOME} element={<Home />} />
          </Routes>
        </UserContext>
      </div>
    </Router>
  )
}

export default App