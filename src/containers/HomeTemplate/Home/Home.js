import { useDispatch, useSelector } from "react-redux"
import { useEffect, Fragment } from "react"

import Grid from "@mui/material/Grid"

import styles from "./styles.module.scss"

import AnimeCardList from "../../../components/AnimeCardList"
import Filters from "../../../components/Filters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"

import { selectHome, fetchHomeAnimes } from "../../../features/home/homeSlice"

const Home = () => {
  const { loading, data, error } = useSelector(selectHome)

  let trending, topThisSeason, upcoming, topAnimes

  if (data) [trending, topThisSeason, upcoming, topAnimes] = data

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

      {trending &&
        topThisSeason &&
        upcoming &&
        [trending, topThisSeason, upcoming].map((animes) => (
          <Fragment key={animes.title}>
            <Grid item xs={12} className={styles.titleContainer}>
              <h4 className={styles.title}>{animes.title.toUpperCase()}</h4>
            </Grid>
            <AnimeCardList animes={animes.data} />
          </Fragment>
        ))}

      {topAnimes && (
        <>
          <Grid item xs={12} className={styles.titleContainer}>
            <h4 className={styles.title}>{topAnimes.title.toUpperCase()}</h4>
          </Grid>
          <AnimeCardList type="horizontal" animes={topAnimes.data} />
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
