import SignIn from "./SignIn"
import Backlog from "./Backlog"
import { useUserAuth } from "../contexts/UserContext"

export default function Admin() {
  const { user } = useUserAuth()

  return (
    <>
      {user === {} && <SignIn />}
      {user !== {} && <Backlog />}
    </>
  )
}