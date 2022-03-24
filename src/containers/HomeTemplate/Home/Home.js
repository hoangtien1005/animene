import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import Grid from "@mui/material/Grid"

import styles from "./styles.module.scss"

import AnimeCardList from "../../../components/AnimeCardList"
import Filters from "../../../components/Filters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"
import LoadingCardSkeleton from "../../../components/LoadingCardSkeleton"
import GridContainer from "../../../components/ui/GridContainer"
import { CARD_TYPES } from "../../../utils/constants"

import { selectHome, fetchHomeAnimes } from "../../../features/home/homeSlice"

const Home = () => {
  const { loading, data, error } = useSelector(selectHome)

  let trendingNow,
    mostPopularThisSeason,
    mostPopularNextSeason,
    mostPopular,
    topScore

  if (data) {
    trendingNow = data.trendingNow
    mostPopularThisSeason = data.mostPopularThisSeason
    mostPopularNextSeason = data.mostPopularNextSeason
    mostPopular = data.mostPopular
    topScore = data.topScore
  }

  const isMedium = useMediaQuery("(min-width:900px)")
  const numberOfCards = isMedium ? 5 : 6

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHomeAnimes())
    window.scrollTo(0, 0)
  }, [dispatch])

  return (
    <>
      <div style={{ marginTop: "80px", width: "100%" }}></div>
      <GridContainer>
        <Filters />
        {loading && (
          <>
            <Loading />
            <LoadingCardSkeleton />
          </>
        )}
      </GridContainer>
      {trendingNow && (
        <>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>TRENDING NOW</h4>
          </div>
          <AnimeCardList animes={trendingNow.media.slice(0, numberOfCards)} />
        </>
      )}
      {mostPopularThisSeason && (
        <>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>POPULAR THIS SEASON</h4>
          </div>
          <AnimeCardList
            animes={mostPopularThisSeason.media.slice(0, numberOfCards)}
          />
        </>
      )}
      {mostPopularNextSeason && (
        <>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>UPCOMING NEXT SEASON</h4>
          </div>
          <AnimeCardList
            animes={mostPopularNextSeason.media.slice(0, numberOfCards)}
          />
        </>
      )}
      {mostPopular && (
        <>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>ALL TIME POPULAR</h4>
          </div>
          <AnimeCardList animes={mostPopular.media.slice(0, numberOfCards)} />
        </>
      )}
      {topScore && (
        <>
          <div className={styles.titleContainer}>
            <h4 className={styles.title}>TOP 100 ANIMES</h4>
          </div>
          <AnimeCardList type={CARD_TYPES.HORIZONTAL} animes={topScore.media} />
        </>
      )}
      {data && data.status_code === 404 && (
        <AnimeNotFound message="No Results" />
      )}
      {error && <AnimeNotFound message={error.message} />}
    </>
  )
}
export default Home
