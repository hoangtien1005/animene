import { Link, useHistory } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"

import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"

import styles from "./styles.module.scss"

import Loading from "../../../components/Loading"
import Button from "../../../components/ui/Button"
import FormContainer from "../../../components/ui/FormContainer"
import Alert from "../../../components/ui/Alert"

import { checkEmail, checkPassword } from "../../../utils/utils"
import { selectAuth, ResetPassword } from "../../../features/auth/authSlice"
import { authActions } from "../../../features/auth/authSlice"

const Component = () => {
  const { Reset } = authActions

  const { loading, data, error, success } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <>
      {loading && <Loading />}
      {error && <Alert severity="error" message={error.message} />}
      {success && (
        <Alert message="Reset password successfully, redirecting..." />
      )}
      <FormContainer>
        <h1 className={styles.formTitle}>Reset Password</h1>
        <Formik
          initialValues={{ email: "", newPassword: "" }}
          validate={(values) => {
            const errors = {}
            const emailError = checkEmail(values.email)
            if (emailError) errors.email = emailError
            const newPasswordError = checkPassword(values.newPassword)
            if (newPasswordError) errors.newPassword = newPasswordError
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(ResetPassword(values)).then((res) => {
              console.log(res)
              if (res.error) {
                setTimeout(() => {
                  dispatch(Reset())
                  setSubmitting(false)
                }, 3000)
              } else if (res.payload) {
                setTimeout(() => {
                  setSubmitting(false)
                  history.push("/login")
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
                <label htmlFor="newPassword">New Password</label>
                <Field type="password" name="newPassword" id="newPassword" />
                <ErrorMessage
                  className="error-message"
                  name="newPassword"
                  component="div"
                />
              </div>
              <Button
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>

        <div className={styles.otherOptionContainer}>
          Got any problems?
          <a
            href="mailto:nguyenhoangtien100501@gmail.com"
            className={styles.otherOption}
          >
            Contact us
          </a>
        </div>
      </FormContainer>
    </>
  )
}

export default Component
