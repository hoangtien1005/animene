import clsx from "clsx"
import "./styles.scss"

const Button = ({ children, className, ...props }) => {
  let Component = "button"
  if (props.href) Component = "a"
  return (
    <Component className={clsx("btn", className)} {...props}>
      {children}
    </Component>
  )
}
export default Button
