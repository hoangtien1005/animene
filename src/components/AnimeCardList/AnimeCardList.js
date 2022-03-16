import Grid from "@mui/material/Grid"
import Lazyload from "react-lazyload"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import styles from "./styles.module.scss"

import AnimeCard from "../AnimeCard"

const AnimeCardList = ({ animes }) => {
  return (
    <>
      {animes.map((anime) => (
        <Grid item xs={4} sm={3} md={2.4} key={anime.id}>
          <Lazyload
            placeholder={
              <Stack>
                <Skeleton variant="rectangular" height={240} />
                <Skeleton variant="text" />
              </Stack>
            }
          >
            <AnimeCard anime={anime} />
          </Lazyload>
        </Grid>
      ))}
    </>
  )
}
export default AnimeCardList
