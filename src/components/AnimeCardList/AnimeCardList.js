import Grid from "@mui/material/Grid"
import useMediaQuery from "@mui/material/useMediaQuery"
import Lazyload from "react-lazyload"

import { CARD_TYPES } from "../../utils/constants"

import AnimeCard from "../AnimeCard"
import AnimeCardHorizontal from "../AnimeCardHorizontal"
import AnimeCardSquare from "../AnimeCardSquare"
import GridContainer from "../ui/GridContainer"
import CardSkeleton from "../ui/CardSkeleton"

const AnimeCardList = ({ animes, type }) => {
  const isLarge = useMediaQuery("(min-width:1200px)")
  const isMedium = useMediaQuery("(min-width:950px)")
  const isSmall = useMediaQuery("(min-width:600px)")
  const spacing = isLarge ? 4.5 : isMedium ? 3 : isSmall ? 2 : 1.5
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
    <GridContainer spacing={spacing}>
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
    </GridContainer>
  )
}
export default AnimeCardList
