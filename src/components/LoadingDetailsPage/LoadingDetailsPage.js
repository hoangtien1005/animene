import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"

import styles from "./styles.module.scss"
import LoadingGif from "../../assets/img/loading.gif"

export default function Loading() {
  return (
    <Box sx={{ width: "100%" }} className={styles.loading}>
      <img src={LoadingGif} alt="loading" />
    </Box>
  )
}
