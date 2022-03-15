import Grid from "@mui/material/Grid"

import styles from "./styles.module.scss"
import Filter from "../Filter"

const Filters = ({}) => {
  const temp = [1, 2, 3, 4, 5]

  return (
    <>
      {temp.map((x) => (
        <Grid item xs={4} sm={3} md={2.4} key={x}>
          <Filter key={x} />
        </Grid>
      ))}
    </>
  )
}
export default Filters
