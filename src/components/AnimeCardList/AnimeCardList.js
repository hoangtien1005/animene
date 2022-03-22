import Grid from "@mui/material/Grid"
import Lazyload from "react-lazyload"
import CardSkeleton from "../ui/CardSkeleton"

import { CARD_TYPES } from "../../utils/constants"

import AnimeCard from "../AnimeCard"
import AnimeCardHorizontal from "../AnimeCardHorizontal"
import AnimeCardSquare from "../AnimeCardSquare"

const AnimeCardList = ({ animes, type }) => {
  if (type === CARD_TYPES.HORIZONTAL) {
    return (
      <>
        {animes.map((anime) => (
          <Grid item xs={12} key={anime.id}>
            <Lazyload
              key={type}
              height={200}
              offset={50}
              placeholder={<CardSkeleton type={type} />}
            >
              <AnimeCardHorizontal anime={anime} />
            </Lazyload>
          </Grid>
        ))}
      </>
    )
  }
  if (type === CARD_TYPES.SQUARE) {
    return (
      <>
        {animes.map((anime) => (
          <Grid item xs={12} md={6} key={anime.id}>
            <Lazyload
              key={type}
              height={200}
              offset={50}
              placeholder={<CardSkeleton type={type} />}
            >
              <AnimeCardSquare anime={anime} />
            </Lazyload>
          </Grid>
        ))}
      </>
    )
  }
  return (
    <>
      {animes.map((anime) => (
        <Grid item xs={4} sm={3} md={2.4} key={anime.id}>
          <Lazyload
            height={200}
            offset={50}
            placeholder={<CardSkeleton type={type} />}
          >
            <AnimeCard anime={anime} />
          </Lazyload>
        </Grid>
      ))}
    </>
  )
}
export default AnimeCardList
