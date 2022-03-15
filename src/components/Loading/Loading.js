import styles from "./styles.module.scss"
import Box from "@mui/material/Box"
import * as React from "react"
import LinearProgress from "@mui/material/LinearProgress"

export default function Loading() {
  console.log("Loading")
  return (
    <Box sx={{ width: "100%" }} className={styles.loading}>
      <LinearProgress color="inherit" />
    </Box>
  )
}
