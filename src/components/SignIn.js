import { useState } from "react"
import { useUserAuth } from "../contexts/UserContext"
import { useMediaQuery } from "react-responsive"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { signInUser } = useUserAuth()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    try {
      await signInUser(email, password)
    } catch {
      setError("Sikertelen bejelentkezés!")
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
    <div key={isTabletOrMobile ? "recipe-create-container-mobile"
      : "recipe-create-container"}
      className={isTabletOrMobile ? "recipe-create-container-mobile"
        : "recipe-create-container"}>
      <h1 className="recipe-create-title">Bejelentkezés</h1>
      <hr className={isTabletOrMobile ? "hr-mobile" : "hr"} />
      <form data-testid="recipe-form-submit" onSubmit={handleSubmit}
        className="recipe-form">
        <div key="input-row-name" className="input-row">
          <label>E-mail:</label>
          <input data-testid="recipe-name" style={{ marginTop: "10px" }}
            className={isTabletOrMobile ? "input-name-mobile"
              : "input-name"} type="text" id="name" name="name"
            value={email} onChange={(event) => {
              setEmail(event.target.value);
            }} />
        </div>
        <div key="input-row-name" className="input-row">
          <label>Jelszó:</label>
          <input data-testid="recipe-name" style={{ marginTop: "10px" }}
            className={isTabletOrMobile ? "input-name-mobile"
              : "input-name"} type="password" id="name" name="name"
            value={password} autoComplete="off" onChange={(event) => {
              setPassword(event.target.value);
            }} />
        </div>
        <button className={isTabletOrMobile ? "check-button-mobile"
          : "check-button"} type="submit">
          Küldés <FontAwesomeIcon icon={faCheckCircle} />
        </button>
        <p>{error}</p>
      </form>
    </div>
  )
}