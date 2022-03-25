import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"

import clsx from "clsx"

import styles from "./styles.module.scss"

import Button from "../../../components/ui/Button"
import FormContainer from "../../../components/ui/FormContainer"

import { checkEmail, checkPassword } from "../../../utils/utils"

const Login = () => (
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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
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
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Form>
      )}
    </Formik>

    <div className={styles.otherOptionContainer}>
      Don't have an account?
      <Link to="/signup" className={styles.otherOption}>
        Sign up now
      </Link>
    </div>
  </FormContainer>
)

export default Login
