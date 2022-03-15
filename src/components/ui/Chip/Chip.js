import clsx from "clsx"
import { Link } from "react-router-dom"
import "./styles.scss"

const Chip = ({ children, className, ...props }) => {
  return (
    <Link {...props} className={clsx("chip", className)}>
      {children}
    </Link>
  )
}
export default Chip
