import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import clsx from "clsx"
import "./styles.scss"

const Component = ({ children, className, type, ...props }) => {
  if (type === "asc") {
  }
  if (type === "asc") {
  }

  return (
    <Stack>
      <Skeleton variant="rectangular" height={240} />
      <Skeleton variant="text" />
    </Stack>
  )
}
export default Component
