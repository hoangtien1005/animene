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

const InfiniteCardList = ({ data, cardType, fetchMoreData, allLoaded }) => {
  let Card
  let breakpoints
  if (cardType === CARD_TYPES.HORIZONTAL) {
    Card = MediaCardHorizontal
    breakpoints = { xs: 12, sm: 12, md: 12 }
  } else if (cardType === CARD_TYPES.SQUARE) {
    Card = MediaCardSquare
    breakpoints = { xs: 12, sm: 12, md: 6 }
  } else {
    Card = DefaultCard
    breakpoints = { xs: 4, sm: 3, md: 2.4 }
  }

  return (
    <InfiniteScroll
      className={styles.infiniteScrollContainer}
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={!allLoaded}
      scrollThreshold="600px"
      loader={
        <GridContainer>
          <div style={{ marginTop: "28px", width: "100%" }}></div>
          <LoadingCardSkeleton type={cardType} />
        </GridContainer>
      }
    >
      {data.map((dataItem) => (
        <Grid
          className={styles.infiniteScrollItem}
          item
          xs={breakpoints.xs}
          sm={breakpoints.sm}
          md={breakpoints.md}
          key={dataItem.id}
        >
          <Lazyload
            key={cardType}
            height={200}
            offset={50}
            placeholder={<CardSkeleton type={cardType} />}
          >
            <Card data={dataItem} />
          </Lazyload>
        </Grid>
      ))}
    </InfiniteScroll>
  )
}
export default InfiniteCardList
