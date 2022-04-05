import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { PATHS } from "../../../routes"
import clsx from "clsx"

import styles from "./styles.module.scss"

import { authActions } from "../../../features/auth/authSlice"

const Component = () => {
  const dispatch = useDispatch()
  dispatch(authActions.Logout())
  return <Redirect to="/" />
}

export default Component
