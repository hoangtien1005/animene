import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, Redirect } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { PATHS } from "../../../routes"
import clsx from "clsx"

import styles from "./styles.module.scss"

import Loading from "../../../components/Loading"
import Button from "../../../components/ui/Button"
import FormContainer from "../../../components/ui/FormContainer"
import Alert from "../../../components/ui/Alert"

import { checkEmail, checkPassword } from "../../../utils/utils"
import { selectAuth, Login } from "../../../features/auth/authSlice"
import { authActions } from "../../../features/auth/authSlice"

const Component = () => {
  const { Reset } = authActions

  const { loading, data, error } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <>
      {loading && <Loading />}
      {error && <Alert severity="error" message={error.message} />}
      {data && <Alert message="Login successfully, redirecting..." />}
      <FormContainer>
        <h1 className={styles.formTitle}>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {}
            const emailError = checkEmail(values.email)
            const passwordError = checkPassword(values.password)
            if (emailError) errors.email = emailError
            if (passwordError) errors.password = passwordError
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(Login(values)).then((res) => {
              console.log(res)
              if (res.error) {
                setTimeout(() => {
                  dispatch(Reset())
                  setSubmitting(false)
                }, 3000)
              } else if (res.payload) {
                setTimeout(() => {
                  setSubmitting(false)
                  history.push("/")
                }, 2000)
              }
            })
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" id="email" />
                <ErrorMessage
                  className="error-message"
                  name="email"
                  component="div"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" id="password" />
                <ErrorMessage
                  className="error-message"
                  name="password"
                  component="div"
                />
              </div>
              <Button
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </Button>
              <div className={styles.forgotPassword}>
                <Link to={PATHS.FORGOT_PASSWORD}>Forgot password?</Link>
              </div>
            </Form>
          )}
        </Formik>

        <div className={styles.otherOptionContainer}>
          Don't have an account?
          <Link to={PATHS.SIGNUP} className={styles.otherOption}>
            Sign up now
          </Link>
        </div>
      </FormContainer>
    </>
  )
}

export default Component
