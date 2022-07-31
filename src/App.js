import './App.css'
import { BrowserRouter as Router, Route, Routes, Link, Outlet, Navigate }
  from "react-router-dom"
import Home from "./components/Home"
import RecipeCreate from "./components/RecipeCreate"
import RecipeEdit from "./components/RecipeEdit"
import RecipeList from "./components/RecipeList"
import RecipeSingle from "./components/RecipeSingle"
import SignIn from './components/SignIn'
import * as ROUTES from './constants/Routes'
import useAuthListener from './hooks/UseAuthListener'
import AdminContext from './contexts/AdminContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { firebase } from "./lib/Firebase"

function App() {
  const { admin } = useAuthListener()
  const logo = require("./data/images/logo.png")
  const ProtectedRoute = ({ admin, redirectPath = ROUTES.SIGN_IN }) => {
    if (!admin) {
      return <Navigate to={redirectPath} replace />
    }

    return <Outlet />
  }

  function signOut() {
    firebase.auth().signOut()
  }

  return (
    <AdminContext.Provider value={{ admin }}>
      <Router>
        <div>
          <nav className="navigation">
            <ul>
              <li>
                <Link to={ROUTES.HOME}>
                  <button className="link">
                    <img className="logo" src={logo} alt="Logo" />
                  </button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RECIPE_LIST}>
                  <button className="link">Receptek</button>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RECIPE_CREATE}>
                  <button className="link">Új recept</button>
                </Link>
              </li>
            </ul>
            <ul>
              {admin &&
                <>
                  <li>
                    <Link to={ROUTES.BACKLOG_LIST}>
                      <button className="link">Várólista</button>
                    </Link>
                  </li>
                  <li>
                    <FontAwesomeIcon onClick={signOut}
                      style={{ color: "white" }} icon={faSignOut} />
                  </li>
                </>
              }
              {!admin &&
                <>
                  <li>
                    <Link to={ROUTES.BACKLOG_LIST}>
                      <FontAwesomeIcon
                        style={{ color: "white" }} icon={faSignIn} />
                    </Link>
                  </li>
                </>
              }
            </ul>
          </nav>
          <Routes>
            <Route path={ROUTES.RECIPE_CREATE} element={<RecipeCreate />} />
            <Route element={<ProtectedRoute admin={admin} />}>
              <Route path={ROUTES.RECIPE_EDIT}
                element={<RecipeEdit target="recipes" />} />
              <Route path={ROUTES.BACKLOG_EDIT}
                element={<RecipeEdit target="backlog" />} />
              <Route path={ROUTES.BACKLOG_SINGLE}
                element={<RecipeSingle target="backlog" />} />
              <Route path={ROUTES.BACKLOG_LIST}
                element={<RecipeList target="backlog" admin={admin} />} />
            </Route>
            <Route path={ROUTES.RECIPE_SINGLE}
              element={<RecipeSingle target="recipes" />} />
            <Route path={ROUTES.RECIPE_LIST}
              element={<RecipeList target="recipes" admin={admin} />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </AdminContext.Provider>
  )
}

export default App