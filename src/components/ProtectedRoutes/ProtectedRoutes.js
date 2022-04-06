import styles from "./styles.module.scss"
import { Route, Redirect } from "react-router-dom"
import { ALLOWS } from "../../routes"
import useAuth from "../../hooks/useAuth"

const ProtectedRoutes = ({ children, allow, ...rest }) => {
  const auth = useAuth()

  // routes that are allowed for everyone
  if (allow === ALLOWS.ALL) {
    return <Route {...rest} render={() => children} />
  }

  // routes that are allowed for user only
  if (allow === ALLOWS.USER) {
    return (
      <Route
        {...rest}
        render={() => (auth?.user ? children : <Redirect to="/login" />)}
      />
    )
  }

  // routes that are allowed for none user only
  if (allow === ALLOWS.NONE_USER) {
    return (
      <Route
        {...rest}
        render={() => (auth?.user ? <Redirect to="/" /> : children)}
      />
    )
  }
}
export default ProtectedRoutes
