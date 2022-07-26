import { useState, useContext, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import FirebaseContext from "../contexts/FirebaseContext"
import * as ROUTES from "../constants/Routes"

export default function SignIn() {
  const { firebase } = useContext(FirebaseContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  async function handleSubmit(event) {
    event.preventDefault()
    await firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate(ROUTES.BACKLOG_LIST)
      })
      .catch(() => {
        setEmail('')
        setPassword('')
        setError("Sikertelen bejelentkezés!")
        setTimeout(() => {
          setError("")
        }, 5000)
      })
  }

  useEffect(() => {
    document.title = "Bejelentkezés"
  })

  return (
    <div key={isTabletOrMobile ? "recipe-create-container-mobile"
      : "recipe-create-container"}
      className={isTabletOrMobile ? "recipe-create-container-mobile"
        : "recipe-create-container"}>
      <h1 className="recipe-create-title">Bejelentkezés</h1>
      <hr className={isTabletOrMobile ? "hr-mobile" : "hr"} />
      <form data-testid="login" onSubmit={handleSubmit}
        className="recipe-form">
        <div key="input-email" className="input-row">
          <label>E-mail:</label>
          <input data-testid="input-email" style={{ marginTop: "10px" }}
            className={isTabletOrMobile ? "input-email-mobile"
              : "input-email"} type="text" id="name" name="name"
            value={email} onChange={(event) => {
              setEmail(event.target.value)
            }} />
        </div>
        <div key="input-password" className="input-row">
          <label>Jelszó:</label>
          <input data-testid="input-password"
            style={{ marginTop: "10px" }} className={isTabletOrMobile
              ? "input-password-mobile" : "input-password"}
            type="password" id="name" name="name" value={password}
            autoComplete="off" onChange={(event) => {
              setPassword(event.target.value)
            }} />
        </div>
        <button className={isTabletOrMobile ? "check-button-mobile"
          : "check-button"} type="submit">
          Küldés <FontAwesomeIcon icon={faCheckCircle} />
        </button>
        <p className="error" data-testid="error">{error}</p>
      </form>
    </div>
  )
}