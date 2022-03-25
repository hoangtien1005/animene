import { useDispatch, useSelector } from "react-redux"
import { useEffect, Fragment } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"

import styles from "./styles.module.scss"

import MediaCardList from "../../../components/MediaCardList"
import AnimeFilters from "../../../components/AnimeFilters"
import ResultNotFound from "../../../components/ResultNotFound"
import Loading from "../../../components/Loading"
import LoadingCardSkeleton from "../../../components/LoadingCardSkeleton"
import GridContainer from "../../../components/ui/GridContainer"
import { CARD_TYPES } from "../../../utils/constants"

import { selectHome, fetchHomeAnimes } from "../../../features/home/homeSlice"

const Home = () => {
  const { loading, data, error } = useSelector(selectHome)
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
        <AnimeFilters />
        {loading && (
          <>
            <Loading />
            <LoadingCardSkeleton />
          </>
        )}
      </GridContainer>
      {data &&
        Object.values(data).map((medias) => {
          if (medias.title.includes("TOP 100")) {
            return (
              <Fragment key={medias.title}>
                <div className={styles.titleContainer}>
                  <h4 className={styles.title}>{medias.title}</h4>
                </div>
                <MediaCardList
                  cardType={CARD_TYPES.HORIZONTAL}
                  medias={medias.media}
                />
              </Fragment>
            )
          }
          return (
            <Fragment key={medias.title}>
              <div className={styles.titleContainer} key={medias.title}>
                <h4 className={styles.title}>{medias.title}</h4>
              </div>
              <MediaCardList medias={medias.media.slice(0, numberOfCards)} />
            </Fragment>
          )
        })}
      {data && data.status_code === 404 && (
        <ResultNotFound message="No Results" />
      )}
      {error && <ResultNotFound message={error.message} />}
    </>
  )
}
export default Home
