import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import Grid from "@mui/material/Grid"

import styles from "./styles.module.scss"

import AnimeCardList from "../../../components/AnimeCardList"
import Filters from "../../../components/Filters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"

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

  console.log("home render")

  return (
    <>
      <div style={{ marginTop: "80px", width: "100%" }}></div>
      <Filters />
      {loading && <Loading />}
      {trendingNow && (
        <>
          <Grid item xs={12} className={styles.titleContainer}>
            <h4 className={styles.title}>TRENDING NOW</h4>
          </Grid>
          <AnimeCardList animes={trendingNow.media.slice(0, numberOfCards)} />
        </>
      )}
      {mostPopularThisSeason && (
        <>
          <Grid item xs={12} className={styles.titleContainer}>
            <h4 className={styles.title}>POPULAR THIS SEASON</h4>
          </Grid>
          <AnimeCardList
            animes={mostPopularThisSeason.media.slice(0, numberOfCards)}
          />
        </>
      )}
      {mostPopularNextSeason && (
        <>
          <Grid item xs={12} className={styles.titleContainer}>
            <h4 className={styles.title}>UPCOMING NEXT SEASON</h4>
          </Grid>
          <AnimeCardList
            animes={mostPopularNextSeason.media.slice(0, numberOfCards)}
          />
        </>
      )}
      {mostPopular && (
        <>
          <Grid item xs={12} className={styles.titleContainer}>
            <h4 className={styles.title}>ALL TIME POPULAR</h4>
          </Grid>
          <AnimeCardList animes={mostPopular.media.slice(0, numberOfCards)} />
        </>
      )}
      {topScore && (
        <>
          <Grid item xs={12} className={styles.titleContainer}>
            <h4 className={styles.title}>TOP 100 ANIMES</h4>
          </Grid>
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
