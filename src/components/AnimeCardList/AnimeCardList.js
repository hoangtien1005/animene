import Grid from "@mui/material/Grid"
import Lazyload from "react-lazyload"
import CardSkeleton from "../ui/CardSkeleton"

import { CARD_TYPES } from "../../utils/constants"

import AnimeCard from "../AnimeCard"
import AnimeCardHorizontal from "../AnimeCardHorizontal"
import AnimeCardSquare from "../AnimeCardSquare"

const AnimeCardList = ({ animes, type }) => {
  let Card
  let breakpoints
  if (type === CARD_TYPES.HORIZONTAL) {
    Card = AnimeCardHorizontal
    breakpoints = { xs: 12, sm: 12, md: 12 }
  } else if (type === CARD_TYPES.SQUARE) {
    Card = AnimeCardSquare
    breakpoints = { xs: 12, sm: 12, md: 6 }
  } else {
    Card = AnimeCard
    breakpoints = { xs: 4, sm: 3, md: 2.4 }
  }
  return (
    <>
      {animes.map((anime) => (
        <Grid
          item
          xs={breakpoints.xs}
          sm={breakpoints.sm}
          md={breakpoints.md}
          key={anime.id}
        >
          <Lazyload
            key={type}
            height={200}
            offset={50}
            placeholder={<CardSkeleton type={type} />}
          >
            <Card anime={anime} />
          </Lazyload>
        </Grid>
      ))}
    </>
  )
}
export default AnimeCardList
