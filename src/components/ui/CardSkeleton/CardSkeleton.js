import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import "./styles.scss"

const Component = ({ children, className, type, ...props }) => {
  if (type === "horizontal") {
    return (
      <Stack className="card-horizontal" direction="row" alignItems="center">
        <Stack direction="row" alignItems="center" style={{ width: "50%" }}>
          <Skeleton variant="rectangular" height={60} width={48} />
          <Skeleton
            style={{ marginLeft: "8px" }}
            variant="text"
            width="40%"
            height={28}
          />
        </Stack>
        <Skeleton variant="text" width="30%" height={20} />
      </Stack>
    )
  }

  return (
    <Stack>
      <Skeleton variant="rectangular" height={240} />
      <Skeleton variant="text" />
    </Stack>
  )
}
export default Component
