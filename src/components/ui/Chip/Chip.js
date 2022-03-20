import clsx from "clsx"
import { Link } from "react-router-dom"
import "./styles.scss"

const Chip = ({ children, className, ...props }) => {
  const linkTo = `anime-list?genres=${children
    .toLowerCase()
    .split(" ")
    .join("+")}`

  return (
    <Link {...props} to={linkTo} className={clsx("chip", className)}>
      {children}
    </Link>
  )
}
export default Chip
