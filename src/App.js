import './App.css'
import { BrowserRouter as Router, Routes, Route, Link }
  from "react-router-dom"
import Home from "./components/Home"
import RecipeCreate from "./components/RecipeCreate"
import RecipeEdit from "./components/RecipeEdit"
import RecipeList from "./components/RecipeList"
import RecipeSingle from "./components/RecipeSingle"

function App() {
  const logo = require("./images/logo.png")

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
        <Routes>
          <Route path="/uj-recept" element={<RecipeCreate />} />
          <Route path="/recept-szerkesztes/:id"
            element={<RecipeEdit />} />
          <Route path="/recept/:id" element={<RecipeSingle />} />
          <Route path="/receptek" element={<RecipeList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App