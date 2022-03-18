import clsx from "clsx"
import { Link } from "react-router-dom"
import "./styles.scss"

const Chip = ({ children, className, ...props }) => {
  return (
    <span {...props} className={clsx("chip", className)}>
      {children}
    </span>
  )
}
export default Chip
