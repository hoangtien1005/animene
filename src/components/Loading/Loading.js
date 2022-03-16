import Box from "@mui/material/Box"
import LinearProgress from "@mui/material/LinearProgress"

import styles from "./styles.module.scss"
import Grid from "@mui/material/Grid"
import CardSkeleton from "../ui/CardSkeleton"

export default function Loading() {
  console.log("Loading")
  const dummy = new Array(10).fill(0)
  return (
    <>
      <Box sx={{ width: "100%" }} className={styles.loading}>
        <LinearProgress color="inherit" />
      </Box>
      {dummy.map((_, idx) => (
        <Grid item xs={4} sm={3} md={2.4} key={idx}>
          <CardSkeleton />
        </Grid>
      ))}
    </>
  )
}
