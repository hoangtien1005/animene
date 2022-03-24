import Grid from "@mui/material/Grid"
import Lazyload from "react-lazyload"
import InfiniteScroll from "react-infinite-scroll-component"

import { CARD_TYPES } from "../../utils/constants"

import styles from "./styles.module.scss"
import DefaultCard from "../cards/DefaultCard"
import MediaCardHorizontal from "../cards/MediaCardHorizontal"
import MediaCardSquare from "../cards/MediaCardSquare"
import LoadingCardSkeleton from "../LoadingCardSkeleton"
import GridContainer from "../ui/GridContainer"
import CardSkeleton from "../ui/CardSkeleton"

const InfiniteCardList = ({ animes, type, fetchMoreData, allLoaded }) => {
  let Card
  let breakpoints
  if (type === CARD_TYPES.HORIZONTAL) {
    Card = MediaCardHorizontal
    breakpoints = { xs: 12, sm: 12, md: 12 }
  } else if (type === CARD_TYPES.SQUARE) {
    Card = MediaCardSquare
    breakpoints = { xs: 12, sm: 12, md: 6 }
  } else {
    Card = DefaultCard
    breakpoints = { xs: 4, sm: 3, md: 2.4 }
  }

  return (
    <InfiniteScroll
      className={styles.infiniteScrollContainer}
      dataLength={animes.length}
      next={fetchMoreData}
      hasMore={!allLoaded}
      scrollThreshold="600px"
      loader={
        <GridContainer>
          <div style={{ marginTop: "28px", width: "100%" }}></div>
          <LoadingCardSkeleton type={type} />
        </GridContainer>
      }
    >
      {animes.map((anime) => (
        <Grid
          className={styles.infiniteScrollItem}
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
    </InfiniteScroll>
  )
}
export default InfiniteCardList
