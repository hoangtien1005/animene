import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, useCallback, Fragment, memo } from "react"
import { useLocation } from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery"
import styles from "./styles.module.scss"

import MediaCardList from "../../../components/MediaCardList"
import InfiniteCardList from "../../../components/InfiniteCardList"
import MangaFilters from "../../../components/MangaFilters"
import SubFilters from "../../../components/SubFilters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"
import LoadingCardSkeleton from "../../../components/LoadingCardSkeleton"
import GridContainer from "../../../components/ui/GridContainer"
import { CARD_TYPES } from "../../../utils/constants"

import {
  selectMangaList,
  fetchHomeMangas,
  fetchAllMangas,
  fetchMoreMangas
} from "../../../features/mangaList/mangaListSlice"

const MangaList = () => {
  const location = useLocation()
  const [cardType, setCardType] = useState(
    localStorage.getItem("cardType") || CARD_TYPES.DEFAULT
  )
  const { loading, data, error, page, allLoaded, isDefault } =
    useSelector(selectMangaList)
  const isMedium = useMediaQuery("(min-width:900px)")
  const numberOfCards = isMedium ? 5 : 6

  console.log("loading", loading)
  console.log("data", data)

  const dispatch = useDispatch()

  useEffect(() => {
    location.search === "" && dispatch(fetchHomeMangas())
    location.search !== "" &&
      dispatch(fetchAllMangas({ searchString: location.search }))
    window.scrollTo(0, 0)
  }, [dispatch, location.search])

  const handleViewChange = useCallback((option) => {
    setCardType(option)
    localStorage.setItem("cardType", option)
  }, [])

  const fetchMoreData = useCallback(() => {
    dispatch(fetchMoreMangas({ searchString: location.search, page: page }))
  }, [dispatch, location.search, page])

  return (
    <>
      {isDefault && (
        <>
          <div style={{ marginTop: "80px", width: "100%" }}></div>
          <GridContainer>
            <MangaFilters />
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
                  <MediaCardList
                    medias={medias.media?.slice(0, numberOfCards)}
                  />
                </Fragment>
              )
            })}
          {data && data.status_code === 404 && (
            <AnimeNotFound message="No Results" />
          )}
          {error && <AnimeNotFound message={error.message} />}
        </>
      )}
      {!isDefault && (
        <>
          <div style={{ marginTop: "80px", width: "100%" }}></div>
          <GridContainer>
            <MangaFilters />
            <SubFilters
              cardType={cardType}
              handleViewChange={handleViewChange}
            />
            {loading && (
              <>
                <Loading />
                <LoadingCardSkeleton type={cardType} />
              </>
            )}
          </GridContainer>
          <div style={{ marginTop: "28px", width: "100%" }}></div>
          {data && data.length > 0 && (
            <>
              <InfiniteCardList
                data={data}
                allLoaded={allLoaded}
                cardType={cardType}
                fetchMoreData={fetchMoreData}
              />
            </>
          )}
          {data && data.length === 0 && <AnimeNotFound message="No Results" />}
          {error && <AnimeNotFound message={error.message} />}
        </>
      )}
    </>
  )
}
export default MangaList
